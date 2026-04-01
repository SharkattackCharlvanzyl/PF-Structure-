import jsPDF from "jspdf";

export interface AgreementData {
  type: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  propertyAddress: string;
  askingPrice: string;
  commissionRate: string;
  date: string;
  listerSignature: string; // base64 data URL
  pfSignature?: string;
}

const NAVY = [20, 28, 43] as const;
const GOLD = [196, 164, 124] as const;
const CREAM = [232, 223, 200] as const;
const WHITE = [255, 255, 255] as const;

export function generateAgreementPDF(data: AgreementData): jsPDF {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper functions
  const addText = (text: string, x: number, yPos: number, opts?: { fontSize?: number; color?: readonly number[]; font?: string; align?: string; maxWidth?: number }) => {
    doc.setFontSize(opts?.fontSize || 10);
    doc.setTextColor(...(opts?.color || NAVY) as [number, number, number]);
    if (opts?.font === "bold") doc.setFont("helvetica", "bold");
    else doc.setFont("helvetica", "normal");
    const align = (opts?.align || "left") as "left" | "center" | "right";
    if (opts?.maxWidth) {
      doc.text(text, x, yPos, { maxWidth: opts.maxWidth, align });
    } else {
      doc.text(text, x, yPos, { align });
    }
  };

  const addLine = (yPos: number) => {
    doc.setDrawColor(...GOLD as [number, number, number]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  // --- Header ---
  doc.setFillColor(...NAVY as [number, number, number]);
  doc.rect(0, 0, pageWidth, 45, "F");

  addText("PropertyFinder", pageWidth / 2, 18, { fontSize: 22, color: GOLD, font: "bold", align: "center" });
  addText("www.propertyfinder.com", pageWidth / 2, 26, { fontSize: 9, color: CREAM, align: "center" });

  const titleMap: Record<string, string> = {
    agency: "Agency Listing Agreement",
    enterprise: "Enterprise Listing Agreement",
    private: "Private Seller Listing Agreement",
    seller: "Seller Agent Agreement",
    auction: "Auction Seller Agreement",
  };
  const title = titleMap[data.type] || "Listing Agreement";
  addText(title, pageWidth / 2, 36, { fontSize: 14, color: WHITE, font: "bold", align: "center" });

  y = 55;

  // --- Reference & Date ---
  doc.setFillColor(245, 242, 235);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, "F");
  addText(`Agreement Reference: ${data.reference}`, margin + 4, y + 6, { fontSize: 10, font: "bold" });
  addText(`Date: ${data.date}`, pageWidth - margin - 4, y + 6, { fontSize: 10, align: "right" });
  y += 22;

  // --- Parties Section ---
  addText("PARTIES TO THIS AGREEMENT", margin, y, { fontSize: 12, color: GOLD, font: "bold" });
  y += 4;
  addLine(y);
  y += 8;

  addText("The Lister (hereinafter referred to as the \"Lister\"):", margin, y, { fontSize: 10, font: "bold" });
  y += 8;

  const fields = [
    ["Full Name", data.fullName],
    ["Email Address", data.email],
    ["Phone Number", data.phone],
    ["ID / Passport Number", data.idNumber],
  ];

  for (const [label, value] of fields) {
    addText(`${label}:`, margin + 4, y, { fontSize: 9, color: [100, 100, 100] as any });
    addText(value, margin + 50, y, { fontSize: 10, font: "bold" });
    y += 7;
  }

  y += 4;
  addText("AND", pageWidth / 2, y, { fontSize: 10, font: "bold", align: "center" });
  y += 8;
  addText("PropertyFinder (Pty) Ltd (hereinafter referred to as the \"Agent\")", margin, y, { fontSize: 10, font: "bold" });
  y += 12;

  // --- Property Details ---
  addText("PROPERTY DETAILS", margin, y, { fontSize: 12, color: GOLD, font: "bold" });
  y += 4;
  addLine(y);
  y += 8;

  const propFields = [
    ["Property Address", data.propertyAddress],
    ["Asking Price", data.askingPrice],
    ["Commission Rate", data.commissionRate],
  ];

  for (const [label, value] of propFields) {
    addText(`${label}:`, margin + 4, y, { fontSize: 9, color: [100, 100, 100] as any });
    addText(value, margin + 50, y, { fontSize: 10, font: "bold" });
    y += 7;
  }

  y += 8;

  // --- Terms & Conditions ---
  addText("TERMS & CONDITIONS", margin, y, { fontSize: 12, color: GOLD, font: "bold" });
  y += 4;
  addLine(y);
  y += 8;

  const clauses = [
    "1. The Lister hereby authorises PropertyFinder to market the above property on the PropertyFinder platform and any affiliated channels for the purpose of finding a suitable buyer or tenant.",
    "2. This agreement is binding upon signature by both parties and shall remain in force for a period of twelve (12) months from the date of signing, unless terminated earlier by mutual written consent.",
    "3. Commission is payable upon successful transfer of the property at the agreed rate stated above. Commission becomes due and payable upon registration of transfer in the Deeds Office.",
    "4. The Lister warrants that they are the lawful owner of the property or have been duly authorised to act on behalf of the owner.",
    "5. PropertyFinder shall use reasonable endeavours to market the property professionally and to procure a buyer or tenant at the best possible price.",
    "6. This agreement shall be governed by and construed in accordance with the laws of the Republic of South Africa.",
  ];

  for (const clause of clauses) {
    const lines = doc.splitTextToSize(clause, contentWidth - 8);
    if (y + lines.length * 5 > 260) {
      doc.addPage();
      y = 20;
    }
    addText(clause, margin + 4, y, { fontSize: 9, maxWidth: contentWidth - 8 });
    y += lines.length * 5 + 3;
  }

  y += 6;

  // --- Signatures ---
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  addText("SIGNATURES", margin, y, { fontSize: 12, color: GOLD, font: "bold" });
  y += 4;
  addLine(y);
  y += 10;

  // Lister signature
  addText("Lister Signature:", margin, y, { fontSize: 9, color: [100, 100, 100] as any });
  y += 4;
  if (data.listerSignature) {
    try {
      doc.addImage(data.listerSignature, "PNG", margin, y, 60, 25);
    } catch (e) {
      // fallback if image fails
    }
  }
  y += 28;
  addLine(y);
  y += 5;
  addText(data.fullName, margin, y, { fontSize: 10, font: "bold" });
  addText(data.date, margin + 80, y, { fontSize: 10 });

  y += 15;

  // PF signature
  addText("PropertyFinder Representative:", margin, y, { fontSize: 9, color: [100, 100, 100] as any });
  y += 4;
  if (data.pfSignature) {
    try {
      doc.addImage(data.pfSignature, "PNG", margin, y, 60, 25);
    } catch (e) {
      // fallback
    }
  }
  y += 28;
  addLine(y);
  y += 5;
  addText("PropertyFinder (Pty) Ltd", margin, y, { fontSize: 10, font: "bold" });
  addText(data.date, margin + 80, y, { fontSize: 10 });

  // --- Footer ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...NAVY as [number, number, number]);
    doc.rect(0, 282, pageWidth, 15, "F");
    doc.setFontSize(7);
    doc.setTextColor(...CREAM as [number, number, number]);
    doc.text("PropertyFinder (Pty) Ltd | www.propertyfinder.com | info@propertyfinder.com", pageWidth / 2, 289, { align: "center" });
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, 289, { align: "right" });
  }

  return doc;
}
