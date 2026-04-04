import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const referenceId = formData.get("referenceId") as string;
    const pdf = formData.get("pdf") as File;

    if (!referenceId || !pdf) {
      return NextResponse.json(
        { success: false, error: "Missing referenceId or pdf" },
        { status: 400 }
      );
    }

    // Validate referenceId format to prevent path traversal
    if (!/^PF-AGR-[A-Z0-9]{6}$/.test(referenceId)) {
      return NextResponse.json(
        { success: false, error: "Invalid referenceId format" },
        { status: 400 }
      );
    }

    // Create agreements directory in public folder
    const agreementsDir = path.join(process.cwd(), "public", "agreements");
    fs.mkdirSync(agreementsDir, { recursive: true });

    // Convert the File/Blob to a Buffer and write to disk
    const arrayBuffer = await pdf.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(agreementsDir, `${referenceId}.pdf`);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/agreements/${referenceId}.pdf`,
    });
  } catch (err) {
    console.error("[save-agreement-pdf] Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save PDF" },
      { status: 500 }
    );
  }
}
