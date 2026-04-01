import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: validate body, store agreement, generate PDF
  const referenceId = `PF-${Date.now()}`;

  return NextResponse.json({
    success: true,
    referenceId,
    message: "Agreement submitted successfully",
  });
}
