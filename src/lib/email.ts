import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "property-finder.co.za",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@property-finder.co.za",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

function brandedWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#141c2b;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#141c2b;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:0 0 30px 0;">
              <h1 style="margin:0;font-size:28px;font-weight:400;letter-spacing:2px;">
                <span style="color:#c4a47c;">Property</span><span style="color:#e8dfc8;">Finder</span>
              </h1>
              <div style="width:60px;height:2px;background-color:#c4a47c;margin:10px auto 0;"></div>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color:#1a2538;border:1px solid #2a3548;border-radius:8px;padding:40px 30px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:30px 0 0 0;">
              <p style="margin:0;font-size:12px;color:#6b7a8d;line-height:1.6;">
                &copy; ${new Date().getFullYear()} PropertyFinder. All rights reserved.<br>
                South Africa's Premium Property Platform
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

interface AgreementEmailData {
  to: string;
  fullName: string;
  referenceId: string;
  agreementType: string;
  propertyAddress: string;
}

interface PaymentEmailData {
  to: string;
  fullName: string;
  transactionId: string;
  plan: string;
  amount: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendAgreementConfirmation(
  data: AgreementEmailData
): Promise<EmailResult> {
  const content = `
    <h2 style="margin:0 0 20px 0;font-size:22px;font-weight:400;color:#c4a47c;text-align:center;">
      Agreement Submitted Successfully
    </h2>
    <p style="margin:0 0 25px 0;font-size:15px;color:#e8dfc8;line-height:1.6;">
      Dear ${data.fullName},
    </p>
    <p style="margin:0 0 25px 0;font-size:15px;color:#e8dfc8;line-height:1.6;">
      Your agreement has been received and is currently under review. Below are the details of your submission.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px 0;">
      <tr>
        <td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
          <span style="font-size:13px;color:#6b7a8d;">Reference Number</span><br>
          <span style="font-size:15px;color:#c4a47c;font-weight:bold;">${data.referenceId}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
          <span style="font-size:13px;color:#6b7a8d;">Agreement Type</span><br>
          <span style="font-size:15px;color:#e8dfc8;">${data.agreementType}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
          <span style="font-size:13px;color:#6b7a8d;">Property Address</span><br>
          <span style="font-size:15px;color:#e8dfc8;">${data.propertyAddress}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 15px;">
          <span style="font-size:13px;color:#6b7a8d;">Submitted By</span><br>
          <span style="font-size:15px;color:#e8dfc8;">${data.fullName}</span>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="https://property-finder.co.za/dashboard"
             style="display:inline-block;background-color:#c4a47c;color:#141c2b;text-decoration:none;padding:14px 35px;border-radius:6px;font-size:15px;font-weight:bold;letter-spacing:0.5px;">
            View Dashboard
          </a>
        </td>
      </tr>
    </table>`;

  const html = brandedWrapper(content);

  try {
    const info = await transporter.sendMail({
      from: '"PropertyFinder" <noreply@property-finder.co.za>',
      to: data.to,
      subject: `Agreement Confirmation - ${data.referenceId}`,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] Failed to send agreement confirmation:", message);
    return { success: false, error: message };
  }
}

export async function sendPaymentReceipt(
  data: PaymentEmailData
): Promise<EmailResult> {
  const content = `
    <h2 style="margin:0 0 20px 0;font-size:22px;font-weight:400;color:#c4a47c;text-align:center;">
      Payment Receipt
    </h2>
    <p style="margin:0 0 25px 0;font-size:15px;color:#e8dfc8;line-height:1.6;">
      Dear ${data.fullName},
    </p>
    <p style="margin:0 0 25px 0;font-size:15px;color:#e8dfc8;line-height:1.6;">
      Thank you for your payment. Your transaction has been processed successfully.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px 0;">
      <tr>
        <td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
          <span style="font-size:13px;color:#6b7a8d;">Transaction ID</span><br>
          <span style="font-size:15px;color:#c4a47c;font-weight:bold;">${data.transactionId}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
          <span style="font-size:13px;color:#6b7a8d;">Plan</span><br>
          <span style="font-size:15px;color:#e8dfc8;">${data.plan}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 15px;border-bottom:1px solid #2a3548;">
          <span style="font-size:13px;color:#6b7a8d;">Amount Paid</span><br>
          <span style="font-size:15px;color:#c4a47c;font-weight:bold;">${data.amount}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 15px;">
          <span style="font-size:13px;color:#6b7a8d;">Paid By</span><br>
          <span style="font-size:15px;color:#e8dfc8;">${data.fullName}</span>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="https://property-finder.co.za/dashboard"
             style="display:inline-block;background-color:#c4a47c;color:#141c2b;text-decoration:none;padding:14px 35px;border-radius:6px;font-size:15px;font-weight:bold;letter-spacing:0.5px;">
            View Dashboard
          </a>
        </td>
      </tr>
    </table>`;

  const html = brandedWrapper(content);

  try {
    const info = await transporter.sendMail({
      from: '"PropertyFinder" <noreply@property-finder.co.za>',
      to: data.to,
      subject: `Payment Receipt - ${data.transactionId}`,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] Failed to send payment receipt:", message);
    return { success: false, error: message };
  }
}
