import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, propertyAddress, agreementType, phone, idNumber, askingPrice, commissionRate } = body;

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
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceId = `PF-AGR-${timestamp}-${random}`;

    const now = new Date().toISOString();

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
        expiresAt: new Date(timestamp + 365 * 24 * 60 * 60 * 1000).toISOString(),
      },
      message: "Agreement submitted successfully. Awaiting review.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
