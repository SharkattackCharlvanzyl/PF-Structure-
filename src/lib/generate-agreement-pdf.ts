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
  listerSignature: string;
}

const titleMap: Record<string, string> = {
  agency: "Agency Agreement",
  private: "Private Sale Agreement",
  enterprise: "Enterprise Agreement",
  seller: "Seller's Agreement",
  auction: "Auction Agreement",
  buyer: "Buyer's Agreement",
};

function getClausesForType(type: string): string[] {
  switch (type) {
    case "agency":
      return [
        "1. EXCLUSIVE LISTING PERIOD: The Agent is hereby granted an exclusive mandate to market and sell the Property for a period of ninety (90) days from the date of this agreement. During this period, the Seller shall not appoint any other agent or sell the Property independently without the Agent's written consent.",
        "2. MARKETING OBLIGATIONS: The Agent undertakes to actively market the Property through all reasonable channels, including but not limited to the PropertyFinder platform, social media, print media, show days, and direct buyer engagement. A marketing plan shall be provided within seven (7) days of signing.",
        "3. COMMISSION ON SALE: Upon successful sale of the Property, the Seller agrees to pay the Agent a commission as specified in this agreement, calculated on the gross selling price. Commission is due and payable upon registration of transfer in the Deeds Office.",
        "4. PROPERTY VALUATION: The Agent shall provide a comparative market analysis (CMA) within fourteen (14) days of mandate acceptance. The asking price may be adjusted by mutual written agreement based on market conditions and buyer feedback.",
        "5. REPORTING & COMMUNICATION: The Agent shall provide the Seller with written progress reports at least fortnightly, detailing all marketing activities, buyer enquiries, viewings conducted, and offers received. All offers must be presented to the Seller in writing.",
        "6. TERMINATION: Either party may terminate this agreement by providing thirty (30) days written notice. If the Property is sold to a buyer introduced by the Agent within ninety (90) days after termination, the commission shall remain payable.",
      ];
    case "private":
      return [
        "1. SELLER'S DISCLOSURE OBLIGATIONS: The Seller warrants that all information provided regarding the Property is true, accurate, and complete. The Seller shall disclose all known material defects, encumbrances, and any matters that may affect the value or desirability of the Property.",
        "2. NO AGENT INVOLVEMENT: This agreement confirms that no estate agent is involved in this transaction. Both parties acknowledge that they are acting independently and without professional real estate representation. Each party is responsible for their own due diligence.",
        "3. DIRECT SALE TERMS: The purchase price and all terms of the sale shall be negotiated directly between the Seller and the Buyer. The sale is subject to the Buyer obtaining satisfactory finance within thirty (30) days of acceptance, unless the Buyer is a cash purchaser.",
        "4. PROPERTY CONDITION: The Property is sold voetstoots (as is) in its present condition, subject to the provisions of the Consumer Protection Act 68 of 2008. The Seller shall make the Property available for inspection prior to the conclusion of this agreement.",
        "5. TRANSFER & COSTS: The Buyer shall be responsible for transfer costs, bond registration costs, and any applicable transfer duty. The Seller shall appoint the transferring attorney, and transfer shall be effected within ninety (90) days of fulfilment of all conditions.",
        "6. COMPLIANCE CERTIFICATES: The Seller shall, at the Seller's cost, obtain all legally required compliance certificates including electrical, gas, plumbing, beetle, and electric fence certificates prior to transfer.",
      ];
    case "enterprise":
      return [
        "1. PORTFOLIO LISTING: The Enterprise Client agrees to list a portfolio of properties on the PropertyFinder platform as detailed in the attached schedule. All listed properties shall comply with the platform's listing requirements and standards.",
        "2. BULK COMMISSION RATES: In consideration of the volume of properties listed, the Enterprise Client shall benefit from a reduced commission rate as set out in this agreement. The commission structure applies to all properties within the portfolio for the duration of this agreement.",
        "3. DEDICATED ACCOUNT MANAGER: PropertyFinder shall assign a dedicated account manager to the Enterprise Client. The account manager shall serve as the primary point of contact for all listing management, marketing coordination, and performance reporting.",
        "4. PERFORMANCE METRICS: PropertyFinder shall provide monthly analytics reports including total views, enquiries, click-through rates, and lead conversion metrics for each property in the portfolio. Quarterly strategy reviews shall be conducted.",
        "5. DATA PROTECTION: Both parties agree to comply with the Protection of Personal Information Act (POPIA). All personal data collected through property enquiries shall be handled in accordance with the agreed data processing addendum attached hereto.",
        "6. SERVICE LEVEL AGREEMENT: PropertyFinder commits to a 99.5% platform uptime, 24-hour listing turnaround time, and response to support queries within 4 business hours. Failure to meet these SLAs entitles the Enterprise Client to service credits.",
      ];
    case "seller":
      return [
        "1. AGENT DUTIES: The Agent appointed under this agreement shall act with due skill, care, and diligence in marketing and selling the Property. The Agent shall at all times act in the best interests of the Seller and in accordance with the Estate Agency Affairs Act.",
        "2. FIDUCIARY OBLIGATIONS: The Agent acknowledges a fiduciary duty to the Seller and shall not place their personal interests above those of the Seller. All offers and relevant information shall be communicated to the Seller promptly and without alteration.",
        "3. TERMINATION NOTICE PERIOD: This agreement may be terminated by either party upon giving sixty (60) days written notice. The notice shall be delivered by registered mail or email to the addresses specified in this agreement.",
        "4. LISTING PRICE & STRATEGY: The Seller and Agent shall agree upon an initial listing price based on a comparative market analysis. The Agent shall recommend pricing adjustments based on market response, comparable sales, and buyer feedback.",
        "5. VIEWING ARRANGEMENTS: The Agent shall coordinate all property viewings with the Seller's prior consent. The Seller shall make the Property available for viewings at reasonable times. The Agent shall accompany all viewings unless otherwise agreed.",
        "6. OFFER PRESENTATION: All written offers received shall be presented to the Seller within twenty-four (24) hours. The Agent shall provide professional advice on each offer but the decision to accept, reject, or counter any offer rests solely with the Seller.",
      ];
    case "auction":
      return [
        "1. RESERVE PRICE: The Seller shall set a reserve price below which the Property shall not be sold. The reserve price shall be communicated to the auctioneer in writing prior to the auction and shall remain confidential. The reserve may be adjusted before bidding commences.",
        "2. AUCTION TERMS & CONDITIONS: The auction shall be conducted in accordance with the attached Terms and Conditions of Sale. All prospective bidders must register prior to the auction and provide proof of identity and financial capability.",
        "3. BUYER'S PREMIUM: The successful bidder shall pay a buyer's premium of the percentage specified in the auction conditions, calculated on the hammer price. The buyer's premium is payable in addition to the hammer price and forms part of the total purchase price.",
        "4. HAMMER PRICE BINDING: The fall of the auctioneer's hammer constitutes a binding contract of sale between the Seller and the highest bidder, provided the reserve price has been met. No conditions may be attached to any bid.",
        "5. DEPOSIT REQUIREMENTS: The successful bidder shall pay a deposit as specified in the auction conditions immediately upon the fall of the hammer. The deposit shall be held in trust by the auctioneer's attorneys pending registration of transfer.",
        "6. AUCTION MARKETING: The auctioneer shall market the auction through the PropertyFinder platform, print media, digital advertising, and direct buyer contact for a minimum of twenty-one (21) days prior to the auction date.",
      ];
    case "buyer":
      return [
        "1. PRE-APPROVAL REQUIREMENT: The Buyer warrants that they have obtained mortgage pre-approval from a registered financial institution, or that they are a cash purchaser with sufficient funds. Proof of pre-approval or proof of funds shall be provided within seven (7) days of signing this agreement.",
        "2. OFFER VALIDITY PERIOD: Any offer to purchase made by the Buyer shall remain valid for a period of seventy-two (72) hours from the date of submission, unless otherwise specified. The Seller may accept, reject, or counter the offer within this period.",
        "3. COOLING-OFF PERIOD: In accordance with the Consumer Protection Act 68 of 2008, the Buyer shall have a cooling-off period of five (5) business days from the date of signing any offer to purchase. Should the Buyer exercise this right, a penalty not exceeding the prescribed amount may be levied.",
        "4. DEPOSIT TERMS: Upon acceptance of the offer, the Buyer shall pay a deposit as agreed in the offer to purchase. The deposit shall be held in trust by the transferring attorneys and shall be applied towards the purchase price on registration of transfer.",
        "5. PROPERTY INSPECTION: The Buyer shall have the right to conduct a professional property inspection at their own cost prior to or within seven (7) days of acceptance of the offer. Any material defects discovered may be addressed through negotiation between the parties.",
        "6. BOND APPROVAL: The Buyer shall apply for a mortgage bond within seven (7) days of acceptance of the offer and shall use best endeavours to obtain bond approval within thirty (30) days. Failure to obtain bond approval within forty-five (45) days shall entitle either party to cancel the agreement.",
      ];
    default:
      return [
        "1. This agreement is entered into between the parties named herein and is subject to the laws of the Republic of South Africa.",
        "2. Both parties agree to act in good faith and in accordance with the terms and conditions set out in this document.",
        "3. Any disputes arising from this agreement shall be resolved through mediation before legal proceedings are instituted.",
        "4. This agreement constitutes the entire agreement between the parties and supersedes all prior negotiations and agreements.",
        "5. Neither party may assign or transfer their rights under this agreement without the prior written consent of the other party.",
        "6. This agreement shall be governed by and construed in accordance with the laws of the Republic of South Africa.",
      ];
  }
}

export function generateAgreementPDF(data: AgreementData): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper: add page if needed
  const checkPage = (needed: number) => {
    if (y + needed > 270) {
      doc.addPage();
      y = 20;
    }
  };

  // Header bar
  doc.setFillColor(20, 28, 43); // navy-dark
  doc.rect(0, 0, pageWidth, 40, "F");

  // Gold accent line
  doc.setFillColor(212, 175, 55); // gold
  doc.rect(0, 40, pageWidth, 2, "F");

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(212, 175, 55);
  const title = titleMap[data.type] || "Property Agreement";
  doc.text(title, pageWidth / 2, 22, { align: "center" });

  // Subtitle
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("PropertyFinder South Africa", pageWidth / 2, 30, { align: "center" });

  // Reference and date line
  doc.setFontSize(8);
  doc.text(`Ref: ${data.reference}  |  Date: ${data.date}`, pageWidth / 2, 36, { align: "center" });

  y = 50;

  // Party details section
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, y, contentWidth, 52, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 28, 43);
  doc.text("PARTY DETAILS", margin + 5, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);

  const details = [
    ["Full Name:", data.fullName],
    ["Email:", data.email],
    ["Phone:", data.phone || "N/A"],
    ["ID Number:", data.idNumber || "N/A"],
    ["Property Address:", data.propertyAddress],
    ["Asking Price:", data.askingPrice || "N/A"],
    ["Commission Rate:", data.commissionRate || "N/A"],
  ];

  let detailY = y + 15;
  for (const [label, value] of details) {
    doc.setFont("helvetica", "bold");
    doc.text(label, margin + 5, detailY);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 45, detailY);
    detailY += 5;
  }

  y += 58;

  // Terms & Conditions
  checkPage(15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 28, 43);
  doc.text("TERMS AND CONDITIONS", margin, y);

  doc.setFillColor(212, 175, 55);
  doc.rect(margin, y + 2, 40, 0.5, "F");
  y += 10;

  // Get type-specific clauses
  const clauses = getClausesForType(data.type);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  for (const clause of clauses) {
    const lines = doc.splitTextToSize(clause, contentWidth - 5);
    checkPage(lines.length * 4 + 6);
    doc.text(lines, margin + 2, y);
    y += lines.length * 4 + 4;
  }

  // Signature section
  checkPage(50);
  y += 5;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, contentWidth, 45, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 28, 43);
  doc.text("SIGNATURE", margin + 5, y + 8);

  // Add signature image
  if (data.listerSignature && data.listerSignature.startsWith("data:image")) {
    try {
      doc.addImage(data.listerSignature, "PNG", margin + 5, y + 12, 60, 20);
    } catch {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("[Signature on file]", margin + 5, y + 22);
    }
  }

  // Signature line
  doc.setDrawColor(180, 180, 180);
  doc.line(margin + 5, y + 35, margin + 80, y + 35);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(data.fullName, margin + 5, y + 40);
  doc.text(data.date, margin + 90, y + 40);

  // Footer
  const footerY = 285;
  doc.setFillColor(20, 28, 43);
  doc.rect(0, footerY - 5, pageWidth, 20, "F");
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "This document was generated by PropertyFinder South Africa. For queries contact support@propertyfinder.org.za",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );
  doc.text(
    `Reference: ${data.reference} | Generated: ${data.date}`,
    pageWidth / 2,
    footerY + 4,
    { align: "center" }
  );

  return doc;
}
