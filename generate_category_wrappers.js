const fs = require('fs');
const path = require('path');

const mappings = [
  { dir: 'src/app/[locale]/auctions/commercial', file: 'auctions-commercial.html' },
  { dir: 'src/app/[locale]/auctions/farm', file: 'auctions-farm.html' },
  { dir: 'src/app/[locale]/auctions/industrial', file: 'auctions-industrial.html' },
  { dir: 'src/app/[locale]/auctions/live-preview', file: 'auctions-live-preview.html' },
  { dir: 'src/app/[locale]/auctions/residential', file: 'auctions-residential.html' },
  { dir: 'src/app/[locale]/auctions/terms', file: 'auction-terms.html' },
  { dir: 'src/app/[locale]/auctions/registration-form', file: 'auction-registration-form.html' },
  { dir: 'src/app/[locale]/auctions/seller-agreement', file: 'auction-seller-agreement.html' },
  { dir: 'src/app/[locale]/auctions/commission-breakdown', file: 'auction-commission-breakdown.html' },
  { dir: 'src/app/[locale]/auctions/process-timeline', file: 'auction-process-timeline.html' },
  { dir: 'src/app/[locale]/auctions/faq', file: 'auction-faq.html' },
  { dir: 'src/app/[locale]/auctions/bidding-terms', file: 'auction-bidding-terms.html' },

  { dir: 'src/app/[locale]/business/agriculture', file: 'business-agriculture.html' },
  { dir: 'src/app/[locale]/business/automotive', file: 'business-automotive.html' },
  { dir: 'src/app/[locale]/business/franchise', file: 'business-franchise.html' },
  { dir: 'src/app/[locale]/business/healthcare', file: 'business-healthcare.html' },
  { dir: 'src/app/[locale]/business/hospitality', file: 'business-hospitality.html' },
  { dir: 'src/app/[locale]/business/manufacturing', file: 'business-manufacturing.html' },
  { dir: 'src/app/[locale]/business/restaurants', file: 'business-restaurants.html' },
  { dir: 'src/app/[locale]/business/retail', file: 'business-retail.html' },
  { dir: 'src/app/[locale]/business/tech', file: 'business-tech.html' },

  { dir: 'src/app/[locale]/buy/commercial', file: 'buy-commercial.html' },
  { dir: 'src/app/[locale]/buy/developments', file: 'buy-developments.html' },
  { dir: 'src/app/[locale]/buy/farm', file: 'buy-farm.html' },
  { dir: 'src/app/[locale]/buy/industrial', file: 'buy-industrial.html' },
  { dir: 'src/app/[locale]/buy/residential', file: 'buy-residential.html' },

  { dir: 'src/app/[locale]/rent/commercial', file: 'rent-commercial.html' },
  { dir: 'src/app/[locale]/rent/farm', file: 'rent-farm.html' },
  { dir: 'src/app/[locale]/rent/industrial', file: 'rent-industrial.html' },
  { dir: 'src/app/[locale]/rent/residential', file: 'rent-residential.html' },
  { dir: 'src/app/[locale]/rent/short-stay', file: 'rent-short-stay.html' },
];

for (const mapping of mappings) {
  const dirPath = path.join(process.cwd(), mapping.dir);
  fs.mkdirSync(dirPath, { recursive: true });
  const pageFile = path.join(dirPath, 'page.tsx');
  if (fs.existsSync(pageFile)) {
    continue;
  }
  const content = `import StaticHtmlPage from "@/components/StaticHtmlPage";
import { loadHtmlPage } from "@/lib/html-pages";

const pageData = loadHtmlPage("${mapping.file}");

export const metadata = {
  title: pageData.title ?? "PropertyFinder",
};

export default function Page() {
  return <StaticHtmlPage styles={pageData.styles} bodyHtml={pageData.bodyHtml} />;
}
`;
  fs.writeFileSync(pageFile, content, 'utf8');
  console.log('Created', pageFile);
}
