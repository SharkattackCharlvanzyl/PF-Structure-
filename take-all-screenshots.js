const puppeteer = require("puppeteer");
const path = require("path");

const BASE = "http://localhost:3000";
const OUT = path.join(__dirname, "screenshots");

// Agreement types mapped to the app's internal names
const AGREEMENT_TYPES = [
  { label: "mandate-sale", value: "agency" },
  { label: "mandate-rental", value: "private" },
  { label: "mandate-auction", value: "auction" },
  { label: "offer-purchase", value: "buyer" },
  { label: "offer-rental", value: "enterprise" },
  { label: "mandate-business", value: "seller" },
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function screenshot(page, name) {
  const file = path.join(OUT, name + ".png");
  await sleep(400);
  await page.screenshot({ path: file, fullPage: true });
  console.log("OK  " + name);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // ═══════════════════════════════════════════════════
  // MAIN PAGES (22)
  // ═══════════════════════════════════════════════════
  const mainPages = [
    { name: "01-home", path: "/" },
    { name: "02-buy", path: "/buy" },
    { name: "03-buy-detail", path: "/buy/oceanview-villa-cape-town" },
    { name: "04-rent", path: "/rent" },
    { name: "05-rent-detail", path: "/rent/modern-apartment-sandton" },
    { name: "06-auctions", path: "/auctions" },
    { name: "07-auction-detail", path: "/auctions/luxury-estate-franschhoek" },
    { name: "08-business", path: "/business" },
    { name: "09-business-detail", path: "/business/tech-startup-johannesburg" },
    { name: "10-pricing", path: "/pricing" },
    { name: "11-checkout", path: "/checkout" },
    { name: "12-payment-success", path: "/payment-success" },
    { name: "13-advertise", path: "/advertise" },
    { name: "14-how-it-works", path: "/how-it-works" },
    { name: "15-countries", path: "/countries" },
    { name: "16-dashboard", path: "/dashboard" },
    { name: "17-login", path: "/login" },
    { name: "18-calculators", path: "/calculators" },
  ];

  for (const p of mainPages) {
    try {
      await page.goto(BASE + p.path, { waitUntil: "networkidle2", timeout: 15000 });
      await screenshot(page, p.name);
    } catch (err) {
      console.log("ERR " + p.name + ": " + err.message.slice(0, 60));
      try { await screenshot(page, p.name); } catch {}
    }
  }

  // ═══════════════════════════════════════════════════
  // LIST PROPERTY - 5 steps + success (6 views)
  // ═══════════════════════════════════════════════════
  try {
    await page.goto(BASE + "/list-property", { waitUntil: "networkidle2", timeout: 15000 });
    await screenshot(page, "19-list-property-step0-type");

    // Step 0: fill type fields
    await page.click('button:has-text("Sale")').catch(() => {});
    // Click first listing type button, then property type
    const step0Buttons = await page.$$(".pf-card button");
    if (step0Buttons.length >= 1) await step0Buttons[0].click();
    await sleep(200);
    if (step0Buttons.length >= 3) await step0Buttons[2].click();
    await sleep(200);
    // Fill title
    const inputs0 = await page.$$("input[type='text'], textarea");
    if (inputs0.length >= 1) await inputs0[0].type("Test Property Listing", { delay: 10 });
    if (inputs0.length >= 2) await inputs0[1].type("A beautiful test property", { delay: 10 });
    // Click Next
    const nextBtns = await page.$$("button.btn-gold");
    for (const btn of nextBtns) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Next")) { await btn.click(); break; }
    }
    await sleep(500);
    await screenshot(page, "20-list-property-step1-location");

    // Step 1: fill location
    const inputs1 = await page.$$("input");
    for (let i = 0; i < inputs1.length && i < 5; i++) {
      const vals = ["123 Test Street", "Cape Town", "Western Cape", "8001", "South Africa"];
      await inputs1[i].type(vals[i] || "", { delay: 10 });
    }
    const next1 = await page.$$("button.btn-gold");
    for (const btn of next1) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Next")) { await btn.click(); break; }
    }
    await sleep(500);
    await screenshot(page, "21-list-property-step2-details");

    // Step 2: fill price
    const inputs2 = await page.$$("input");
    for (const inp of inputs2) {
      const ph = await inp.evaluate((el) => el.placeholder || el.type);
      if (ph.includes("rice") || ph === "number") {
        await inp.type("2500000", { delay: 10 });
        break;
      }
    }
    // Try to click next
    const next2 = await page.$$("button.btn-gold");
    for (const btn of next2) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Next")) { await btn.click(); break; }
    }
    await sleep(500);
    await screenshot(page, "22-list-property-step3-photos");

    // Step 3: skip photos, just screenshot
    // Try next (may need at least 1 photo)
    const next3 = await page.$$("button.btn-gold");
    for (const btn of next3) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Next") || text && text.includes("Review")) { await btn.click(); break; }
    }
    await sleep(500);
    await screenshot(page, "23-list-property-step4-review");
  } catch (err) {
    console.log("ERR list-property steps: " + err.message.slice(0, 80));
  }

  // ═══════════════════════════════════════════════════
  // VALUATE - 3 steps + success (4 views)
  // ═══════════════════════════════════════════════════
  try {
    await page.goto(BASE + "/valuate", { waitUntil: "networkidle2", timeout: 15000 });
    await screenshot(page, "24-valuate-step1-type-location");

    // Select property type and fill address
    const typeButtons = await page.$$("button");
    for (const btn of typeButtons) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("House")) { await btn.click(); break; }
    }
    await sleep(200);
    const addrInput = await page.$("input[type='text']");
    if (addrInput) await addrInput.type("45 Beach Road, Camps Bay", { delay: 10 });
    // Click Next
    const vNext1 = await page.$$("button.btn-gold");
    for (const btn of vNext1) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Next")) { await btn.click(); break; }
    }
    await sleep(500);
    await screenshot(page, "25-valuate-step2-details");

    // Fill some details
    const detInputs = await page.$$("input");
    if (detInputs.length >= 1) await detInputs[0].type("4", { delay: 10 });
    if (detInputs.length >= 2) await detInputs[1].type("3", { delay: 10 });
    if (detInputs.length >= 3) await detInputs[2].type("350", { delay: 10 });
    // Select condition
    const condSelect = await page.$("select");
    if (condSelect) await condSelect.select("excellent");
    // Click Next
    const vNext2 = await page.$$("button.btn-gold");
    for (const btn of vNext2) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Next")) { await btn.click(); break; }
    }
    await sleep(500);
    await screenshot(page, "26-valuate-step3-contact");

    // Fill contact and submit
    const contactInputs = await page.$$("input, textarea");
    const contactVals = ["Test User", "test@example.com", "+27821234567", "Test notes"];
    for (let i = 0; i < contactInputs.length && i < contactVals.length; i++) {
      await contactInputs[i].type(contactVals[i], { delay: 10 });
    }
    await screenshot(page, "27-valuate-step3-filled");

    // Submit
    const submitBtn = await page.$$("button.btn-gold");
    for (const btn of submitBtn) {
      const text = await btn.evaluate((el) => el.textContent);
      if (text && text.includes("Valuation")) { await btn.click(); break; }
    }
    await sleep(3000);
    await screenshot(page, "28-valuate-success");
  } catch (err) {
    console.log("ERR valuate steps: " + err.message.slice(0, 80));
  }

  // ═══════════════════════════════════════════════════
  // AGREEMENT - 6 types × 4 steps each (24 views)
  // ═══════════════════════════════════════════════════
  let agrNum = 29;

  // First screenshot the agreement type selection page
  await page.goto(BASE + "/agreement", { waitUntil: "networkidle2", timeout: 15000 });
  await screenshot(page, agrNum + "-agreement-type-selection");
  agrNum++;

  for (const agr of AGREEMENT_TYPES) {
    try {
      // Navigate fresh each time
      await page.goto(BASE + "/agreement", { waitUntil: "networkidle2", timeout: 15000 });

      // Step 0: Click the agreement type button
      const typeButtons = await page.$$("button");
      let clicked = false;
      for (const btn of typeButtons) {
        const text = await btn.evaluate((el) => el.textContent || "");
        // Match by type name in the button
        const typeNames = {
          agency: "Agency",
          private: "Private",
          auction: "Auction",
          buyer: "Buyer",
          enterprise: "Enterprise",
          seller: "Seller",
        };
        if (text.includes(typeNames[agr.value])) {
          await btn.click();
          clicked = true;
          break;
        }
      }
      if (!clicked) {
        console.log("SKIP " + agr.label + " - button not found");
        continue;
      }
      await sleep(500);

      // Step 1: Form
      await screenshot(page, agrNum + "-agreement-" + agr.label + "-step1-form");
      agrNum++;

      // Fill form fields
      const formInputs = await page.$$("input");
      const formVals = [
        "John Smith",
        "john@example.com",
        "+27821234567",
        "9001015800085",
        "123 Main Street, Cape Town",
        "R2,500,000",
        "5%",
      ];
      for (let i = 0; i < formInputs.length && i < formVals.length; i++) {
        await formInputs[i].click({ clickCount: 3 });
        await formInputs[i].type(formVals[i], { delay: 5 });
      }
      await screenshot(page, agrNum + "-agreement-" + agr.label + "-step1-filled");
      agrNum++;

      // Click "Proceed to Sign"
      const proceedBtns = await page.$$("button");
      for (const btn of proceedBtns) {
        const text = await btn.evaluate((el) => el.textContent || "");
        if (text.includes("Proceed") || text.includes("Sign")) {
          await btn.click();
          break;
        }
      }
      await sleep(500);

      // Step 2: Signature
      await screenshot(page, agrNum + "-agreement-" + agr.label + "-step2-signature");
      agrNum++;

      // Draw a signature on the canvas
      const canvas = await page.$("canvas");
      if (canvas) {
        const box = await canvas.boundingBox();
        if (box) {
          await page.mouse.move(box.x + 50, box.y + 50);
          await page.mouse.down();
          await page.mouse.move(box.x + 200, box.y + 80, { steps: 10 });
          await page.mouse.move(box.x + 300, box.y + 40, { steps: 10 });
          await page.mouse.move(box.x + 400, box.y + 100, { steps: 10 });
          await page.mouse.up();
        }
      }
      await screenshot(page, agrNum + "-agreement-" + agr.label + "-step2-signed");
      agrNum++;
    } catch (err) {
      console.log("ERR agreement-" + agr.label + ": " + err.message.slice(0, 80));
      agrNum++;
    }
  }

  await browser.close();
  console.log("\nDone! Total screenshots in:", OUT);
})();
