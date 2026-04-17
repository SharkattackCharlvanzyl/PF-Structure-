import { ListingAgreement } from "@/components/ListingAgreementTemplate";

export const metadata = {
  title: "Private Listing Agreement — Propworths",
  description: "Private listing agreement for 1–10 listings at $7.50 per listing per month. Full platform features and 185-country exposure.",
};

export default function PrivateAgreementPage() {
  return <ListingAgreement tier="Private" rate="$7.50" bracket="1–10 listings" />;
}
