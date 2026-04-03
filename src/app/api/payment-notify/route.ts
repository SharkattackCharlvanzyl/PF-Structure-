import { NextRequest, NextResponse } from "next/server";

const VALID_STATUSES = ["completed", "pending", "failed", "cancelled"];
const VALID_METHODS = ["credit_card", "eft", "debit_order", "payfast", "stripe"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referenceId, amount, status, method, plan, signature } = body;

    // Validate required fields
    const missing: string[] = [];
    if (!referenceId) missing.push("referenceId");
    if (amount === undefined || amount === null) missing.push("amount");
    if (!status) missing.push("status");

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    // Validate status
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    // PayFast IPN-style signature verification (placeholder)
    if (signature) {
      const expectedSignature = "VALID_SIGNATURE_PLACEHOLDER";
      if (signature !== expectedSignature) {
        console.warn(`[payment-notify] Signature mismatch for ${referenceId}`);
        // In production: return 403. For demo we log and continue.
      }
    }

    // Generate transaction ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const transactionId = `PF-TXN-${timestamp}-${random}`;

    const now = new Date().toISOString();

    return NextResponse.json({
      success: true,
      transactionId,
      referenceId,
      payment: {
        amount,
        currency: "ZAR",
        status,
        method: method || "unknown",
        plan: plan || null,
        verified: status === "completed",
      },
      timestamps: {
        processed: now,
        notifiedAt: now,
      },
      message: status === "completed"
        ? "Payment verified and processed successfully."
        : `Payment recorded with status: ${status}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
