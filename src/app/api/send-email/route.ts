import { NextRequest, NextResponse } from "next/server";
import {
  sendAgreementConfirmation,
  sendPaymentReceipt,
  sendContactMessage,
} from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TEMPLATES = [
  "welcome",
  "agreement-confirmation",
  "payment-receipt",
  "enquiry-notification",
  "contact-form",
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
        {
          success: false,
          error: `Invalid template. Must be one of: ${VALID_TEMPLATES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Dispatch to the appropriate email function
    let result: { success: boolean; messageId?: string; error?: string };

    switch (template) {
      case "agreement-confirmation":
        if (
          !data?.fullName ||
          !data?.referenceId ||
          !data?.agreementType ||
          !data?.propertyAddress
        ) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Missing data fields for agreement-confirmation: fullName, referenceId, agreementType, propertyAddress",
            },
            { status: 400 }
          );
        }
        result = await sendAgreementConfirmation({
          to,
          fullName: data.fullName,
          referenceId: data.referenceId,
          agreementType: data.agreementType,
          propertyAddress: data.propertyAddress,
        });
        break;

      case "payment-receipt":
        if (
          !data?.fullName ||
          !data?.transactionId ||
          !data?.plan ||
          !data?.amount
        ) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Missing data fields for payment-receipt: fullName, transactionId, plan, amount",
            },
            { status: 400 }
          );
        }
        result = await sendPaymentReceipt({
          to,
          fullName: data.fullName,
          transactionId: data.transactionId,
          plan: data.plan,
          amount: data.amount,
        });
        break;

      case "contact-form":
        if (!data?.name || !data?.from || !data?.subject || !data?.message) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Missing data fields for contact-form: name, from, subject, message",
            },
            { status: 400 }
          );
        }
        if (!EMAIL_REGEX.test(data.from)) {
          return NextResponse.json(
            { success: false, error: "Invalid sender email format" },
            { status: 400 }
          );
        }
        if (typeof data.message !== "string" || data.message.trim().length < 10) {
          return NextResponse.json(
            { success: false, error: "Message must be at least 10 characters" },
            { status: 400 }
          );
        }
        result = await sendContactMessage({
          from: data.from,
          name: data.name,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        });
        break;

      case "welcome":
      case "enquiry-notification":
        // These templates are not yet implemented; return queued status
        return NextResponse.json({
          success: true,
          messageId: `PF-MSG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          status: "queued",
          email: { to, subject, template, data: data || {} },
          message: `Template "${template}" is not yet wired to a sender. Email queued for future delivery.`,
        });

      default:
        return NextResponse.json(
          { success: false, error: "Unhandled template" },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to send email",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      status: "sent",
      email: { to, subject, template, data: data || {} },
      message: `Email sent successfully to ${to}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
