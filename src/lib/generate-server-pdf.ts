import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from "pdf-lib";
import fs from "fs";
import path from "path";

const NAVY = rgb(20 / 255, 28 / 255, 43 / 255);
const GOLD = rgb(196 / 255, 164 / 255, 124 / 255);
const CREAM = rgb(232 / 255, 223 / 255, 200 / 255);
const DARK_BLUE = rgb(26 / 255, 37 / 255, 53 / 255);
const GRAY = rgb(107 / 255, 122 / 255, 141 / 255);

// ── Agreement Titles ─────────────────��───────────────────────────────
const TITLES: Record<string, string> = {
  agency: "Mandate to Sell — Sole Agency Agreement",
  private: "Mandate to Rent — Rental Management Agreement",
  enterprise: "Offer to Rent — Lease Agreement",
  seller: "Mandate for Business Sale — Business Broker Agreement",
  auction: "Mandate to Auction — Auction Agency Agreement",
  buyer: "Offer to Purchase — Purchase Agreement",
};

// ── Mandate Details (Section 4) per type ─────────────────────────────
function getMandateDetails(data: ServerAgreementData): [string, string][] {
  const startDate = new Date().toLocaleDateString("en-ZA");
  const endDate90 = new Date(Date.now() + 90 * 86400000).toLocaleDateString("en-ZA");
  const endDate60 = new Date(Date.now() + 60 * 86400000).toLocaleDateString("en-ZA");

  switch (data.agreementType) {
    case "agency":
      return [
        ["Asking Price", data.askingPrice || "As per market valuation"],
        ["Commission Rate", data.commissionRate || "5% + VAT"],
        ["Mandate Period Start", startDate],
        ["Mandate Period End", endDate90],
        ["Mandate Duration", "90 days"],
        ["Mandate Type", "Sole and Exclusive Mandate"],
        ["Marketing Permissions", "Online platforms, print media, show days, social media, signboard"],
        ["Minimum Viewing Notice", "24 hours"],
      ];
    case "private":
      return [
        ["Monthly Rental Amount", data.askingPrice || "As per market assessment"],
        ["Commission", data.commissionRate || "First month's rent + VAT"],
        ["Mandate Period Start", startDate],
        ["Mandate Period End", endDate60],
        ["Mandate Duration", "60 days"],
        ["Deposit Required", "Equivalent to two months' rental"],
        ["Tenant Screening", "Full credit check, employment verification, and references"],
        ["Lease Type", "Standard residential lease per Rental Housing Act"],
      ];
    case "auction":
      return [
        ["Reserve Price", data.askingPrice || "To be confirmed prior to auction"],
        ["Commission on Hammer Price", data.commissionRate || "5% + VAT"],
        ["Auction Date", "To be confirmed — within 60 days of mandate"],
        ["Mandate Period", startDate + " to " + endDate90],
        ["Buyer's Commission", "0% (borne by seller)"],
        ["Auction Type", "Public auction without reserve (subject to reserve price)"],
        ["Deposit on Fall of Hammer", "10% of hammer price, payable immediately"],
        ["Registration Fee", "R250.00 per bidder registration"],
      ];
    case "buyer":
      return [
        ["Purchase Price Offered", data.askingPrice || "As stated in offer"],
        ["Deposit Amount", "10% of purchase price"],
        ["Bond Amount Required", "90% of purchase price"],
        ["Bond Approval Period", "30 calendar days from acceptance"],
        ["Occupation Date", "Date of registration of transfer"],
        ["Transfer Period", "Within 90 days of fulfilment of conditions"],
        ["Voetstoots", "Yes — property purchased as is"],
        ["Offer Validity", "72 hours from date of signature"],
      ];
    case "enterprise":
      return [
        ["Monthly Rental", data.askingPrice || "As per lease agreement"],
        ["Lease Period", "12 months"],
        ["Deposit", "Two months' rental, payable prior to occupation"],
        ["Move-in Date", "To be confirmed upon signing of lease"],
        ["Rental Escalation", "8% per annum on anniversary of lease"],
        ["Permitted Use", "Residential / Commercial (as applicable)"],
        ["Maintenance Responsibility", "Tenant — internal; Landlord — structural"],
        ["Notice Period for Renewal", "60 days prior to expiry"],
      ];
    case "seller":
      return [
        ["Business Type", "As described in property address field"],
        ["Asking Price", data.askingPrice || "As per business valuation"],
        ["Commission", data.commissionRate || "10% of sale price + VAT"],
        ["Mandate Period Start", startDate],
        ["Mandate Period End", endDate90],
        ["Mandate Duration", "90 days"],
        ["Confidentiality", "Strict NDA required from all prospective buyers"],
        ["Restraint of Trade", "2 years within 50km radius post-sale"],
      ];
    default:
      return [
        ["Price", data.askingPrice || "—"],
        ["Commission", data.commissionRate || "—"],
      ];
  }
}

// ── Terms & Conditions (Section 5) per type ──────────────────────────
function getTerms(type: string): string[] {
  const common = [
    "AGENCY AUTHORITY",
    "The Principal hereby grants Propworths (Pty) Ltd authority to act on the Principal's behalf in all matters relating to this agreement, including but not limited to marketing, negotiations, and facilitation of the transaction described herein. The Agent shall exercise due diligence and act in the best interest of the Principal at all times.",
    "COMMISSION AND FEES",
    "Commission shall be calculated as specified in the Mandate Details section above and shall become due and payable upon successful conclusion of the transaction. Commission is payable irrespective of whether the transaction was introduced directly by the Agent or by any other party during the mandate period. All commission amounts are exclusive of Value Added Tax (VAT) at the prevailing rate unless otherwise stated.",
    "CANCELLATION AND TERMINATION",
    "Either party may cancel this agreement by providing 30 (thirty) calendar days' written notice to the other party, delivered by email or registered mail. In the event of cancellation, any transaction introduced or negotiated during the mandate period shall still attract commission as specified. The Agent reserves the right to claim reasonable marketing costs incurred prior to cancellation.",
    "WARRANTIES AND REPRESENTATIONS",
    "The Principal warrants that: (a) all information provided to the Agent is true, complete, and accurate; (b) the Principal has the legal authority to enter into this agreement; (c) the property/business described herein is free from undisclosed encumbrances, liens, or legal disputes; (d) the Principal shall disclose any known material defects or issues that may affect the value or desirability of the property/business.",
  ];

  const specific: Record<string, string[]> = {
    agency: [
      "SOLE MANDATE PROVISIONS",
      "During the mandate period, the Principal shall not instruct any other agent or person to market or sell the property. Should the Principal sell the property privately during the mandate period, the Agent shall be entitled to the full agreed commission. The Agent undertakes to use best endeavours to market the property through all available channels.",
      "MARKETING AND VIEWINGS",
      "The Agent is authorised to: (a) list the property on Propworths and affiliated platforms; (b) erect a 'For Sale' signboard on the property; (c) conduct show days and private viewings with reasonable notice; (d) distribute marketing materials including photographs and floor plans; (e) share property information with qualified prospective purchasers.",
    ],
    private: [
      "TENANT SELECTION AND MANAGEMENT",
      "The Agent shall conduct comprehensive tenant screening including credit checks, employment verification, previous landlord references, and affordability assessment. The Agent shall present all qualifying applicants to the Landlord for final approval. The Landlord retains the right to accept or reject any applicant, provided such decision is not based on unfairly discriminatory grounds as per the Rental Housing Act 50 of 1999.",
      "RENTAL MANAGEMENT",
      "The Agent shall manage the collection of monthly rentals and deposits, conduct property inspections, facilitate maintenance requests, and ensure compliance with all applicable rental legislation. The deposit shall be held in a trust account as required by the Rental Housing Act and shall accrue interest for the benefit of the tenant.",
    ],
    auction: [
      "AUCTION CONDITIONS",
      "The property shall be sold by public auction subject to conditions of sale which shall be read aloud prior to commencement of bidding. The Seller acknowledges that once the reserve price is met and the hammer falls, the sale is binding on both parties. The Auctioneer reserves the right to withdraw the property from auction at any time prior to the fall of the hammer.",
      "REGISTRATION AND DEPOSITS",
      "All bidders must register prior to the auction and provide proof of identity and proof of funds or pre-approved bond facility. A deposit as specified in the Mandate Details shall be payable immediately upon the fall of the hammer by bank-guaranteed cheque or electronic transfer. Failure to pay the deposit shall render the sale null and void at the Auctioneer's discretion.",
    ],
    buyer: [
      "OFFER CONDITIONS",
      "This offer is subject to the following suspensive conditions: (a) the Purchaser obtaining bond approval for the required amount within the specified period; (b) the property being substantially in the same condition as at the date of inspection; (c) the Seller providing a valid rates clearance certificate. Should any suspensive condition not be fulfilled within the stipulated period, either party may cancel this agreement upon written notice.",
      "TRANSFER AND OCCUPATION",
      "Transfer shall be attended to by the Seller's nominated conveyancer. The Purchaser shall be responsible for transfer duty, conveyancing fees, and bond registration costs. Occupation shall be given on the date of registration of transfer unless otherwise agreed in writing. From date of occupation, all risk in and to the property shall pass to the Purchaser.",
    ],
    enterprise: [
      "LEASE CONDITIONS",
      "The lease shall commence on the move-in date specified and shall endure for the lease period stated. The Tenant shall pay the monthly rental in advance by the 1st of each calendar month via electronic funds transfer. Late payment shall attract interest at the prime lending rate plus 2% per annum, calculated daily. The Tenant shall not sub-let or cede the premises or any portion thereof without the prior written consent of the Landlord.",
      "PROPERTY CONDITION AND MAINTENANCE",
      "The Tenant acknowledges having inspected the property and accepts it in its current condition. The Tenant shall maintain the interior in good order and repair, and shall be responsible for all minor maintenance up to R1,000 per item. The Landlord shall be responsible for structural maintenance, roofing, plumbing, and electrical infrastructure. The Tenant shall report all maintenance issues within 48 hours of discovery.",
    ],
    seller: [
      "BUSINESS SALE PROVISIONS",
      "The Agent shall market the business on a strictly confidential basis. All prospective purchasers shall be required to sign a non-disclosure agreement before receiving any financial or operational information. The Seller shall provide the Agent with: (a) three years of audited financial statements; (b) a complete asset register; (c) all material contracts and agreements; (d) staff details and employment contracts. The Agent shall verify all material information to the extent reasonably possible.",
      "RESTRAINT OF TRADE AND GOODWILL",
      "Upon successful sale, the Seller shall be bound by a restraint of trade for a period of 2 (two) years within a 50 (fifty) kilometre radius of the business premises. The Seller shall not directly or indirectly compete with the business sold or solicit any employees or customers of the business during the restraint period. The purchase price shall be deemed to include an allocation for goodwill as agreed between the parties.",
    ],
  };

  return [
    ...common,
    ...(specific[type] || []),
    "EAAB COMPLIANCE",
    "This agreement is entered into in compliance with the Estate Agency Affairs Act 112 of 1976 (as amended) and the regulations of the Estate Agency Affairs Board (EAAB). Propworths (Pty) Ltd is a registered estate agency (FFC 2024/001234). All trust monies are held in a registered trust account as required by the EAAB. The Agent is bound by the EAAB Code of Conduct for Estate Agents.",
    "GOVERNING LAW AND DISPUTE RESOLUTION",
    "This agreement shall be governed by and construed in accordance with the laws of the Republic of South Africa, including the Consumer Protection Act 68 of 2008, the Protection of Personal Information Act 4 of 2013, and the Electronic Communications and Transactions Act 25 of 2002. Any dispute arising from this agreement shall first be referred to mediation. Should mediation fail within 30 days, the dispute shall be referred to arbitration in accordance with the Arbitration Act 42 of 1965. The arbitration shall take place in Cape Town before a single arbitrator agreed upon by both parties.",
    "PERSONAL INFORMATION",
    "The parties acknowledge that personal information collected in terms of this agreement shall be processed in accordance with the Protection of Personal Information Act (POPIA). The Agent shall take all reasonable steps to protect the personal information of the Principal and any third parties. Personal information shall only be used for the purposes of this agreement and shall not be disclosed to unauthorised third parties.",
  ];
}

export interface ServerAgreementData {
  referenceId: string;
  agreementType: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  propertyAddress: string;
  askingPrice: string;
  commissionRate: string;
  signatureDataUrl?: string;
  ip?: string;
}

// ── PDF Helper: draw section heading ──────────────��──────────────────
function drawSectionHeading(
  page: PDFPage, y: number, text: string,
  fonts: { bold: PDFFont }, contentW: number, margin: number
): number {
  page.drawRectangle({ x: margin, y: y - 20, width: contentW, height: 25, color: DARK_BLUE });
  page.drawText(text, { x: margin + 10, y: y - 14, size: 11, font: fonts.bold, color: GOLD });
  return y - 50;
}

// ── PDF Helper: draw label-value row ─────────────────────────────────
function drawRow(
  page: PDFPage, y: number, label: string, value: string,
  fonts: { regular: PDFFont; bold: PDFFont }, margin: number
): number {
  page.drawText(label + ":", { x: margin + 10, y, size: 9, font: fonts.regular, color: GRAY });
  // Word-wrap value if too long
  const maxW = 280;
  const words = value.split(" ");
  let line = "";
  let firstLine = true;
  for (const word of words) {
    const test = line + (line ? " " : "") + word;
    if (fonts.bold.widthOfTextAtSize(test, 10) > maxW && line) {
      page.drawText(line, { x: margin + 160, y, size: 10, font: fonts.bold, color: NAVY });
      y -= 14;
      line = word;
      firstLine = false;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, { x: margin + 160, y, size: 10, font: firstLine ? fonts.bold : fonts.bold, color: NAVY });
  }
  return y - 22;
}

// ── PDF Helper: word-wrap text block ───────────────────────��─────────
function drawWrappedText(
  page: PDFPage, y: number, text: string,
  font: PDFFont, size: number, color: typeof NAVY,
  maxW: number, margin: number, lineH: number
): number {
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = line + (line ? " " : "") + word;
    if (font.widthOfTextAtSize(test, size) > maxW) {
      page.drawText(line, { x: margin + 10, y, size, font, color });
      y -= lineH;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, { x: margin + 10, y, size, font, color });
    y -= lineH;
  }
  return y;
}

// ── Footer on every page ─────────────────────────────────────────────
function addFooter(page: PDFPage, num: number, total: number, ref: string, fonts: { regular: PDFFont }) {
  const W = 595.28;
  const M = 50;
  // Separator line
  page.drawRectangle({ x: M, y: 38, width: W - M * 2, height: 0.5, color: GOLD });
  // Left: brand
  page.drawText("Propworths  |  propworths.com", { x: M, y: 25, size: 7.5, font: fonts.regular, color: GOLD });
  // Center: page
  const pageText = `Page ${num} of ${total}`;
  const pw = fonts.regular.widthOfTextAtSize(pageText, 7.5);
  page.drawText(pageText, { x: (W - pw) / 2, y: 25, size: 7.5, font: fonts.regular, color: GRAY });
  // Right: reference
  const rw = fonts.regular.widthOfTextAtSize(ref, 7.5);
  page.drawText(ref, { x: W - M - rw, y: 25, size: 7.5, font: fonts.regular, color: GRAY });
}

// ═══════════════════���═══════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════
export async function generateServerPDF(data: ServerAgreementData): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  const W = 595.28;
  const H = 841.89;
  const M = 50;
  const CW = W - M * 2;
  const BOTTOM = 55; // min y before needing new page
  const fonts = { regular, bold };

  const dateStr = new Date().toLocaleDateString("en-ZA", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
  const title = TITLES[data.agreementType] || "Agreement";

  function newPage(): { page: PDFPage; y: number } {
    const p = doc.addPage([W, H]);
    return { page: p, y: H - M };
  }

  function needPage(y: number, need: number, pg: PDFPage): { page: PDFPage; y: number } {
    if (y - need < BOTTOM) {
      return newPage();
    }
    return { page: pg, y };
  }

  // ════════���══════════════════════════════════════���══════════════════
  // SECTION 1: HEADER
  // ══════════════════════════════════════════���═══════════════════════
  let { page, y } = newPage();

  // Navy header bar
  page.drawRectangle({ x: 0, y: H - 130, width: W, height: 130, color: NAVY });
  page.drawText("Property", { x: M, y: H - 50, size: 28, font: bold, color: GOLD });
  page.drawText("Finder", { x: M + 138, y: H - 50, size: 28, font: bold, color: CREAM });
  page.drawRectangle({ x: M, y: H - 65, width: 80, height: 2, color: GOLD });
  page.drawText(title, { x: M, y: H - 90, size: 14, font: bold, color: CREAM });
  page.drawText("South Africa's Premium Property Platform", { x: M, y: H - 108, size: 9, font: regular, color: GOLD });
  page.drawText(`Reference: ${data.referenceId}`, { x: W - M - 180, y: H - 80, size: 9, font: regular, color: CREAM });
  page.drawText(`Date: ${dateStr}`, { x: W - M - 180, y: H - 93, size: 9, font: regular, color: CREAM });
  page.drawText(`Status: Pending Payment`, { x: W - M - 180, y: H - 106, size: 9, font: regular, color: GOLD });

  y = H - 160;

  // ═════════════════════════════════════════════════════════════════���
  // SECTION 2: PARTY DETAILS
  // ═════════════════════════════════════════════════════════════════��
  y = drawSectionHeading(page, y, "SECTION 1 — PARTY DETAILS", fonts, CW, M);

  const partyRows: [string, string][] = [
    ["Full Legal Name", data.fullName],
    ["ID / Passport Number", data.idNumber || "Not provided"],
    ["Email Address", data.email],
    ["Contact Number", data.phone || "Not provided"],
  ];
  for (const [l, v] of partyRows) y = drawRow(page, y, l, v, fonts, M);

  y -= 10;

  // Agent details
  page.drawText("Agent / Agency:", { x: M + 10, y, size: 9, font: bold, color: GOLD }); y -= 18;
  const agentRows: [string, string][] = [
    ["Agency Name", "Propworths (Pty) Ltd"],
    ["Principal Agent", "Charl van Zyl"],
    ["EAAB Registration", "FFC 2024/001234"],
    ["Contact Email", "charl@propworths.com"],
    ["Office Telephone", "+27 21 555 0100"],
    ["Physical Address", "V&A Waterfront, Cape Town, 8001"],
  ];
  for (const [l, v] of agentRows) y = drawRow(page, y, l, v, fonts, M);

  y -= 15;

  // ════════════════════════════════════���═════════════════════════════
  // SECTION 3: PROPERTY DETAILS
  // ══════════════════════════════════���═════════════════════════════��═
  ({ page, y } = needPage(y, 140, page));
  y = drawSectionHeading(page, y, "SECTION 2 — PROPERTY DETAILS", fonts, CW, M);

  const propRows: [string, string][] = [
    ["Full Property Address", data.propertyAddress],
    ["Property Type", "Residential (as described)"],
    ["Erf / Stand Number", "As per title deed"],
    ["Size", "As per title deed survey"],
    ["Zoning", "Residential / Commercial (as applicable)"],
  ];
  for (const [l, v] of propRows) y = drawRow(page, y, l, v, fonts, M);

  y -= 15;

  // ══════════════════════════════════════════════════════════════════
  // SECTION 4: MANDATE DETAILS (type-specific)
  // ══════════════════════════════════════════════════════════════════
  ({ page, y } = needPage(y, 200, page));
  y = drawSectionHeading(page, y, "SECTION 3 — MANDATE / OFFER DETAILS", fonts, CW, M);

  const mandateRows = getMandateDetails(data);
  for (const [l, v] of mandateRows) {
    ({ page, y } = needPage(y, 25, page));
    y = drawRow(page, y, l, v, fonts, M);
  }

  y -= 15;

  // ══════════════════════════════════════════════════════════════════
  // SECTION 5: TERMS AND CONDITIONS
  // ══════════════════════════════════════════════════════════════════
  ({ page, y } = needPage(y, 100, page));
  y = drawSectionHeading(page, y, "SECTION 4 — TERMS AND CONDITIONS", fonts, CW, M);

  const terms = getTerms(data.agreementType);
  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    // Check if this is a sub-heading (ALL CAPS) or body text
    const isHeading = t === t.toUpperCase() && t.length < 80;

    ({ page, y } = needPage(y, isHeading ? 40 : 60, page));

    if (isHeading) {
      y -= 5;
      page.drawText(t, { x: M + 10, y, size: 9.5, font: bold, color: NAVY });
      y -= 16;
    } else {
      y = drawWrappedText(page, y, t, serif, 9.5, NAVY, CW - 20, M, 13);
      y -= 8;
    }
  }

  y -= 10;

  // ═════════════════════════════════════════���════════════════════════
  // SECTION 6: SIGNATURES
  // ═════════════════════════════════════════════���════════════════════
  ({ page, y } = needPage(y, 280, page));
  y = drawSectionHeading(page, y, "SECTION 5 — SIGNATURES", fonts, CW, M);

  // Declaration
  y = drawWrappedText(
    page, y,
    "Both parties hereby declare that they have read, understood, and agree to be bound by all the terms and conditions contained in this agreement. Both parties confirm that they have the legal authority and capacity to enter into this agreement.",
    serifItalic, 9, GRAY, CW - 20, M, 13
  );
  y -= 20;

  // ── Client signature ──
  page.drawText("THE PRINCIPAL / CLIENT:", { x: M + 10, y, size: 9, font: bold, color: NAVY });
  y -= 20;

  if (data.signatureDataUrl) {
    try {
      const sigBase64 = data.signatureDataUrl.replace(/^data:image\/png;base64,/, "");
      const sigBytes = Buffer.from(sigBase64, "base64");
      const sigImage = await doc.embedPng(sigBytes);
      const dims = sigImage.scale(0.35);
      const sw = Math.min(dims.width, 220);
      const sh = Math.min(dims.height, 70);
      page.drawImage(sigImage, { x: M + 10, y: y - sh, width: sw, height: sh });
      y -= sh + 5;
    } catch {
      page.drawText("[Digital signature on file]", { x: M + 10, y, size: 9, font: serifItalic, color: GRAY });
      y -= 15;
    }
  } else {
    page.drawRectangle({
      x: M + 10, y: y - 45, width: 220, height: 45,
      color: rgb(0.97, 0.97, 0.97), borderColor: GRAY, borderWidth: 0.5,
    });
    y -= 50;
  }

  // Client signature line
  page.drawRectangle({ x: M + 10, y, width: 220, height: 0.5, color: NAVY });
  y -= 14;
  page.drawText("Signature", { x: M + 10, y, size: 8, font: regular, color: GRAY });
  y -= 18;
  page.drawText(`Full Name: ${data.fullName}`, { x: M + 10, y, size: 9, font: bold, color: NAVY });
  y -= 14;
  page.drawText(`Date Signed: ${dateStr}`, { x: M + 10, y, size: 9, font: regular, color: NAVY });
  y -= 14;
  page.drawText(`IP Address: ${data.ip || "Recorded on server"}`, { x: M + 10, y, size: 8, font: regular, color: GRAY });

  y -= 30;

  // ── Agent signature ──
  ({ page, y } = needPage(y, 120, page));
  page.drawText("THE AGENT:", { x: M + 10, y, size: 9, font: bold, color: NAVY });
  y -= 20;

  // Blank signature box for agent
  page.drawRectangle({
    x: M + 10, y: y - 45, width: 220, height: 45,
    color: rgb(0.97, 0.97, 0.97), borderColor: GRAY, borderWidth: 0.5,
  });
  y -= 50;

  page.drawRectangle({ x: M + 10, y, width: 220, height: 0.5, color: NAVY });
  y -= 14;
  page.drawText("Signature", { x: M + 10, y, size: 8, font: regular, color: GRAY });
  y -= 18;
  page.drawText("Full Name: Charl van Zyl", { x: M + 10, y, size: 9, font: bold, color: NAVY });
  y -= 14;
  page.drawText("Designation: Principal Agent", { x: M + 10, y, size: 9, font: regular, color: NAVY });
  y -= 14;
  page.drawText("EAAB Registration: FFC 2024/001234", { x: M + 10, y, size: 9, font: regular, color: NAVY });
  y -= 14;
  page.drawText("Date: ____________________", { x: M + 10, y, size: 9, font: regular, color: NAVY });

  // ══════════════════════════���═══════════════════════════════════════
  // SECTION 7: FOOTERS ON EVERY PAGE
  // ═══════════════════════════════════════════════════════════════��══
  const allPages = doc.getPages();
  for (let i = 0; i < allPages.length; i++) {
    addFooter(allPages[i], i + 1, allPages.length, data.referenceId, { regular });
  }

  // Save
  const pdfBytes = await doc.save();
  const buffer = Buffer.from(pdfBytes);
  const pubDir = path.join(process.cwd(), "public", "agreements");
  fs.mkdirSync(pubDir, { recursive: true });
  fs.writeFileSync(path.join(pubDir, `${data.referenceId}.pdf`), buffer);

  return buffer;
}
