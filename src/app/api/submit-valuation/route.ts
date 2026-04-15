import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendValuationConfirmation } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateReferenceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PF-VAL-${code}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      address,
      propertyType,
      bedrooms,
      bathrooms,
      size,
      condition,
      notes,
    } = body;

    const missing: string[] = [];
    if (!fullName) missing.push("fullName");
    if (!email) missing.push("email");
    if (!address) missing.push("address");
    if (!propertyType) missing.push("propertyType");

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const referenceId = generateReferenceId();
    const now = new Date().toISOString();

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const valuation = {
      referenceId,
      status: "pending",
      propertyType,
      address,
      fullName,
      email,
      phone: phone || null,
      bedrooms: bedrooms || null,
      bathrooms: bathrooms || null,
      size: size || null,
      condition: condition || null,
      notes: notes || null,
      createdAt: now,
      ip,
    };

    const dir = path.join(process.cwd(), "data", "valuations");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, `${referenceId}.json`),
      JSON.stringify(valuation, null, 2),
      "utf-8"
    );

    const emailResult = await sendValuationConfirmation({
      to: email,
      fullName,
      referenceId,
      propertyType,
      address,
      bedrooms: bedrooms || undefined,
      bathrooms: bathrooms || undefined,
      size: size || undefined,
    });

    if (!emailResult.success) {
      console.warn(`[submit-valuation] Email failed for ${referenceId}: ${emailResult.error}`);
    }

    return NextResponse.json({
      success: true,
      referenceId,
      status: "pending",
      emailSent: emailResult.success,
      message: "Valuation request submitted. We will contact you within 48 hours.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
