import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { to, subject, template } = body;

  // TODO: integrate with nodemailer or email service
  // const transporter = nodemailer.createTransport({...});

  return NextResponse.json({
    success: true,
    message: `Email queued for ${to}`,
  });
}
