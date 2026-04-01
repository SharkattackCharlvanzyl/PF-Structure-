import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: verify payment with payment gateway, update order status
  const { referenceId, amount, status } = body;

  return NextResponse.json({
    success: true,
    referenceId,
    paymentStatus: status || "completed",
  });
}
