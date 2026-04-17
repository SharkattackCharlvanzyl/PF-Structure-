import { ListingAgreement } from "@/components/ListingAgreementTemplate";

export const metadata = {
  title: "Enterprise Listing Agreement — Propworths",
  description: "Enterprise listing agreement for 2,000+ listings at $2.00 per listing per month. Full platform features, auto-sync, and 185-country exposure.",
};

export default function EnterpriseAgreementPage() {
  return <ListingAgreement tier="Enterprise" rate="$2.00" bracket="2,000+ listings" />;
}
