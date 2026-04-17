import { ListingAgreement } from "@/components/ListingAgreementTemplate";

export const metadata = {
  title: "Agency Listing Agreement — Propworths",
  description: "Agency listing agreement for 11–2,000 listings at $3.00 per listing per month. Full platform features and 185-country exposure.",
};

export default function AgencyAgreementPage() {
  return <ListingAgreement tier="Agency" rate="$3.00" bracket="11–2,000 listings" />;
}
