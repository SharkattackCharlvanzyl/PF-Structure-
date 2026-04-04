import { NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/email";

export async function GET() {
  const result = await sendTestEmail("charl@property-finder.co.za");
  return NextResponse.json(result);
}
