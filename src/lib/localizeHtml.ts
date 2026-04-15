export const htmlRouteMap: Record<string, string> = {
  "auctions.html": "/auctions",
  "auction-how-to-bid.html": "/auctions/how-to-bid",
  "auction-faq.html": "/auctions/faq",
  "auction-process-timeline.html": "/auctions/process-timeline",
  "auction-registration-form.html": "/auctions/register",
  "auction-bidding-terms.html": "/auctions/bidding-terms",
  "auction-terms.html": "/auctions/terms",
  "auction-commission-breakdown.html": "/auctions/commission-breakdown",
  "auction-seller-agreement.html": "/auctions/seller-agreement",
  "auctions-live-preview.html": "/auctions/live-preview",
  "commission-fees.html": "/commission-fees",
  "anti-fraud.html": "/anti-fraud",
  "privacy-policy.html": "/privacy-policy",
  "dispute-resolution.html": "/dispute-resolution",
  "terms-of-use.html": "/terms-of-use",
  "buy.html": "/buy",
  "rent.html": "/rent",
  "business.html": "/business",
  "list-property.html": "/list-property",
  "countries.html": "/countries",
  "how-it-works.html": "/how-it-works",
  "valuation.html": "/valuate",
  "payment-terms.html": "/payment-terms",
  "commission-fees.html": "/commission-fees",
  "payment-system.html": "/payment-system",
  "privacy-policy.html": "/privacy-policy",
};

export function localizeHtmlLinks(html: string, locale: string) {
  return html.replace(/href=("|')(.*?\.html)(\1)/g, (_match, quote, href) => {
    const normalized = href.replace(/^\.\//, "");
    const mapped = htmlRouteMap[normalized] ?? `/${normalized.replace(/\.html$/, "")}`;
    return `href=${quote}/${locale}${mapped}${quote}`;
  });
}
