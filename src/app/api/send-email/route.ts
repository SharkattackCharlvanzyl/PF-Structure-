import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TEMPLATES = [
  "welcome",
  "agreement-confirmation",
  "payment-receipt",
  "enquiry-notification",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, template, data } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!to) missing.push("to");
    if (!subject) missing.push("subject");
    if (!template) missing.push("template");

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(to)) {
      return NextResponse.json(
        { success: false, error: "Invalid recipient email format" },
        { status: 400 }
      );
    }

    // Validate template type
    if (!VALID_TEMPLATES.includes(template)) {
      return NextResponse.json(
        { success: false, error: `Invalid template. Must be one of: ${VALID_TEMPLATES.join(", ")}` },
        { status: 400 }
      );
    }

    // Simulate email queuing (no actual sending)
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const messageId = `PF-MSG-${timestamp}-${random}`;

    return NextResponse.json({
      success: true,
      messageId,
      status: "queued",
      email: {
        to,
        subject,
        template,
        data: data || {},
      },
      message: `Email queued for delivery to ${to}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
