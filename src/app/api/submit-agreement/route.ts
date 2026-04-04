import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendAgreementConfirmation, sendAgreementInternalCopy } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateReferenceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PF-AGR-${code}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      propertyAddress,
      agreementType,
      phone,
      idNumber,
      askingPrice,
      commissionRate,
    } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!fullName) missing.push("fullName");
    if (!email) missing.push("email");
    if (!propertyAddress) missing.push("propertyAddress");
    if (!agreementType) missing.push("agreementType");

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate reference ID
    const referenceId = generateReferenceId();
    const now = new Date().toISOString();

    // Get client IP from headers
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Build agreement record
    const agreement = {
      referenceId,
      status: "pending",
      agreementType,
      fullName,
      email,
      propertyAddress,
      phone: phone || null,
      idNumber: idNumber || null,
      askingPrice: askingPrice || null,
      commissionRate: commissionRate || null,
      createdAt: now,
      ip,
    };

    // Save to JSON file
    const agreementsDir = path.join(process.cwd(), "data", "agreements");
    fs.mkdirSync(agreementsDir, { recursive: true });
    const filePath = path.join(agreementsDir, `${referenceId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(agreement, null, 2), "utf-8");

    // Send confirmation email to client (don't fail the request if email fails)
    const emailData = {
      to: email,
      fullName,
      referenceId,
      agreementType,
      propertyAddress,
      askingPrice: askingPrice || undefined,
      commissionRate: commissionRate || undefined,
    };

    const emailResult = await sendAgreementConfirmation(emailData);

    if (!emailResult.success) {
      console.warn(
        `[submit-agreement] Client email failed for ${referenceId}: ${emailResult.error}`
      );
    }

    // Send internal copy to admin
    const internalResult = await sendAgreementInternalCopy(emailData);

    if (!internalResult.success) {
      console.warn(
        `[submit-agreement] Internal email failed for ${referenceId}: ${internalResult.error}`
      );
    }

    return NextResponse.json({
      success: true,
      referenceId,
      status: "pending",
      agreement: {
        type: agreementType,
        fullName,
        email,
        propertyAddress,
        phone: phone || null,
        idNumber: idNumber || null,
        askingPrice: askingPrice || null,
        commissionRate: commissionRate || null,
      },
      timestamps: {
        submitted: now,
        expiresAt: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      emailSent: emailResult.success,
      adminNotified: internalResult.success,
      message: "Agreement submitted successfully. Awaiting review.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
