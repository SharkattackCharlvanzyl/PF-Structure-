import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const FROM = { email: "charl@property-finder.co.za", name: "Property Finder" };
const ADMIN_EMAIL = "charl@property-finder.co.za";

// ── Branded HTML wrapper ──────────────────────────────────────────────
function wrap(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#141c2b;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#141c2b;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td align="center" style="padding:0 0 30px 0;">
    <h1 style="margin:0;font-size:28px;font-weight:400;letter-spacing:2px;">
      <span style="color:#c4a47c;">Property</span><span style="color:#e8dfc8;">Finder</span>
    </h1>
    <div style="width:60px;height:2px;background-color:#c4a47c;margin:10px auto 0;"></div>
  </td></tr>
  <tr><td style="background-color:#1a2535;border:1px solid #2a3548;border-radius:8px;padding:40px 30px;">
    ${content}
  </td></tr>
  <tr><td align="center" style="padding:30px 0 0 0;">
    <p style="margin:0;font-size:12px;color:#6b7a8d;line-height:1.6;">
      &copy; ${new Date().getFullYear()} PropertyFinder. All rights reserved.<br>
      South Africa&rsquo;s Premium Property Platform
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// ── Helpers ────────────────────────────────────────────────────────────
function heading(text: string) {
  return `<h2 style="margin:0 0 20px 0;font-size:22px;font-weight:400;color:#c4a47c;text-align:center;">${text}</h2>`;
}
function para(text: string) {
  return `<p style="margin:0 0 20px 0;font-size:15px;color:#e8dfc8;line-height:1.6;">${text}</p>`;
}
function row(label: string, value: string, gold = false) {
  return `<tr><td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
    <span style="font-size:13px;color:#6b7a8d;">${label}</span><br>
    <span style="font-size:15px;color:${gold ? "#c4a47c" : "#e8dfc8"};${gold ? "font-weight:bold;" : ""}">${value}</span>
  </td></tr>`;
}
function table(rows: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px 0;">${rows}</table>`;
}
function button(url: string, label: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <a href="${url}" style="display:inline-block;background-color:#c4a47c;color:#141c2b;text-decoration:none;padding:14px 35px;border-radius:6px;font-size:15px;font-weight:bold;letter-spacing:0.5px;">${label}</a>
  </td></tr></table>`;
}

// ── Interfaces ─────────────────────────────────────────────────────────
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface AgreementData {
  to: string;
  fullName: string;
  referenceId: string;
  agreementType: string;
  propertyAddress: string;
  askingPrice?: string;
  commissionRate?: string;
}

interface ValuationData {
  to: string;
  fullName: string;
  referenceId: string;
  propertyType: string;
  address: string;
  bedrooms?: string;
  bathrooms?: string;
  size?: string;
}

interface PaymentData {
  to: string;
  fullName: string;
  transactionId: string;
  plan: string;
  amount: string;
  billing?: string;
}

interface ContactData {
  from: string;
  name: string;
  phone?: string;
  subject: string;
  message: string;
}

// ── 1. Agreement confirmation → client ─────────────────────────────────
export async function sendAgreementConfirmation(data: AgreementData): Promise<EmailResult> {
  const html = wrap(
    heading("Agreement Submitted Successfully") +
    para(`Dear ${data.fullName},`) +
    para("Your agreement has been received and is currently under review. Below are the details of your submission.") +
    table(
      row("Reference Number", data.referenceId, true) +
      row("Agreement Type", data.agreementType) +
      row("Property Address", data.propertyAddress) +
      (data.askingPrice ? row("Asking Price", data.askingPrice) : "") +
      (data.commissionRate ? row("Commission Rate", data.commissionRate) : "") +
      row("Submitted By", data.fullName)
    ) +
    button("https://property-finder.co.za/dashboard", "View Dashboard")
  );

  try {
    const [res] = await sgMail.send({ to: data.to, from: FROM, subject: `Agreement Confirmation - ${data.referenceId}`, html });
    return { success: true, messageId: res?.headers?.["x-message-id"] || "sent" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendAgreementConfirmation failed:", msg);
    return { success: false, error: msg };
  }
}

// ── 2. Agreement internal copy → admin ─────────────────────────────────
export async function sendAgreementInternalCopy(data: AgreementData): Promise<EmailResult> {
  const html = wrap(
    heading("New Agreement Submission") +
    para("A new agreement has been submitted on PropertyFinder.") +
    table(
      row("Reference", data.referenceId, true) +
      row("Client Name", data.fullName) +
      row("Client Email", data.to) +
      row("Agreement Type", data.agreementType) +
      row("Property Address", data.propertyAddress) +
      (data.askingPrice ? row("Asking Price", data.askingPrice) : "") +
      (data.commissionRate ? row("Commission", data.commissionRate) : "")
    ) +
    button("https://property-finder.co.za/dashboard", "Open Dashboard")
  );

  try {
    const [res] = await sgMail.send({ to: ADMIN_EMAIL, from: FROM, subject: `[Admin] New Agreement - ${data.referenceId}`, html });
    return { success: true, messageId: res?.headers?.["x-message-id"] || "sent" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendAgreementInternalCopy failed:", msg);
    return { success: false, error: msg };
  }
}

// ── 3. Valuation confirmation → client ─────────────────────────────────
export async function sendValuationConfirmation(data: ValuationData): Promise<EmailResult> {
  const html = wrap(
    heading("Valuation Request Received") +
    para(`Dear ${data.fullName},`) +
    para("Thank you for requesting a property valuation. Our team will review the details and get back to you within 48 hours.") +
    table(
      row("Reference", data.referenceId, true) +
      row("Property Type", data.propertyType) +
      row("Address", data.address) +
      (data.bedrooms ? row("Bedrooms", data.bedrooms) : "") +
      (data.bathrooms ? row("Bathrooms", data.bathrooms) : "") +
      (data.size ? row("Size", data.size + " m²") : "")
    ) +
    button("https://property-finder.co.za/dashboard", "Track Your Valuation")
  );

  try {
    const [res] = await sgMail.send({ to: data.to, from: FROM, subject: `Valuation Request - ${data.referenceId}`, html });
    return { success: true, messageId: res?.headers?.["x-message-id"] || "sent" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendValuationConfirmation failed:", msg);
    return { success: false, error: msg };
  }
}

// ── 4. Payment receipt → client ────────────────────────────────────────
export async function sendPaymentReceipt(data: PaymentData): Promise<EmailResult> {
  const html = wrap(
    heading("Payment Receipt") +
    para(`Dear ${data.fullName},`) +
    para("Thank you for your payment. Your transaction has been processed successfully.") +
    table(
      row("Transaction ID", data.transactionId, true) +
      row("Plan", data.plan) +
      (data.billing ? row("Billing Cycle", data.billing) : "") +
      row("Amount Paid", data.amount, true) +
      row("Paid By", data.fullName)
    ) +
    button("https://property-finder.co.za/dashboard", "View Dashboard")
  );

  try {
    const [res] = await sgMail.send({ to: data.to, from: FROM, subject: `Payment Receipt - ${data.transactionId}`, html });
    return { success: true, messageId: res?.headers?.["x-message-id"] || "sent" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendPaymentReceipt failed:", msg);
    return { success: false, error: msg };
  }
}

// ── 5. Contact message → admin ─────────────────────────────────────────
export async function sendContactMessage(data: ContactData): Promise<EmailResult> {
  const html = wrap(
    heading("New Contact Message") +
    table(
      row("From", data.name) +
      row("Email", data.from) +
      (data.phone ? row("Phone", data.phone) : "") +
      row("Subject", data.subject)
    ) +
    para(data.message.replace(/\n/g, "<br>"))
  );

  try {
    const [res] = await sgMail.send({
      to: ADMIN_EMAIL,
      from: FROM,
      replyTo: { email: data.from, name: data.name },
      subject: `[Contact] ${data.subject}`,
      html,
    });
    return { success: true, messageId: res?.headers?.["x-message-id"] || "sent" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendContactMessage failed:", msg);
    return { success: false, error: msg };
  }
}

// ── 6. Test email ──────────────────────────────────────────────────────
export async function sendTestEmail(to: string): Promise<EmailResult> {
  const html = wrap(
    heading("Email Integration Test") +
    para("This is a test email from your PropertyFinder Next.js application.") +
    para("If you are reading this, SendGrid email delivery is working correctly.") +
    table(
      row("Status", "Connected", true) +
      row("Sent At", new Date().toISOString()) +
      row("Recipient", to)
    ) +
    button("https://property-finder.co.za", "Visit PropertyFinder")
  );

  try {
    const [res] = await sgMail.send({ to, from: FROM, subject: "PropertyFinder - Email Test", html });
    return { success: true, messageId: res?.headers?.["x-message-id"] || "sent" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[email] sendTestEmail failed:", msg);
    return { success: false, error: msg };
  }
}
