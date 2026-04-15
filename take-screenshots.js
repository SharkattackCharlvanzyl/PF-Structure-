const puppeteer = require("puppeteer");
const path = require("path");

const BASE = "http://localhost:3000";
const OUT = path.join(__dirname, "screenshots");

const pages = [
  { name: "01-home", path: "/" },
  { name: "02-buy", path: "/buy" },
  { name: "03-rent", path: "/rent" },
  { name: "04-auctions", path: "/auctions" },
  { name: "05-business", path: "/business" },
  { name: "06-valuate", path: "/valuate" },
  { name: "07-agreement", path: "/agreement" },
  { name: "08-pricing", path: "/pricing" },
  { name: "09-advertise", path: "/advertise" },
  { name: "10-how-it-works", path: "/how-it-works" },
  { name: "11-countries", path: "/countries" },
  { name: "12-checkout", path: "/checkout" },
  { name: "13-payment-success", path: "/payment-success" },
  { name: "14-list-property", path: "/list-property" },
  { name: "15-dashboard", path: "/dashboard" },
  { name: "16-login", path: "/login" },
  { name: "17-calculators", path: "/calculators" },
  { name: "18-buy-detail", path: "/buy/oceanview-villa-cape-town" },
  { name: "19-rent-detail", path: "/rent/modern-apartment-sandton" },
  { name: "20-auction-detail", path: "/auctions/luxury-estate-franschhoek" },
  { name: "21-business-detail", path: "/business/tech-startup-johannesburg" },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const p of pages) {
    const url = BASE + p.path;
    const file = path.join(OUT, p.name + ".png");
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });
      // Wait a bit for any animations
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: file, fullPage: true });
      console.log(`OK  ${p.name} -> ${p.path}`);
    } catch (err) {
      console.log(`ERR ${p.name} -> ${p.path}: ${err.message.slice(0, 80)}`);
      // Still try to screenshot whatever loaded
      try { await page.screenshot({ path: file, fullPage: true }); } catch {}
    }
  }

  await browser.close();
  console.log("\nDone! Screenshots saved to:", OUT);
})();
