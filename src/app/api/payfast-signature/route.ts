import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Build the parameter string from ordered fields (excluding signature)
    const orderedKeys = [
      "merchant_id",
      "merchant_key",
      "return_url",
      "cancel_url",
      "notify_url",
      "name_first",
      "name_last",
      "email_address",
      "m_payment_id",
      "amount",
      "item_name",
      "item_description",
    ];

    const params: string[] = [];
    for (const key of orderedKeys) {
      const value = body[key];
      if (value !== undefined && value !== null && value !== "") {
        params.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value).trim())}`
        );
      }
    }

    const paramString = params.join("&");
    const signature = crypto.createHash("md5").update(paramString).digest("hex");

    return NextResponse.json({ signature });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
