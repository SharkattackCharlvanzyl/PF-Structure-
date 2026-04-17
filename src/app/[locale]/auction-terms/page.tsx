import { redirect } from "next/navigation";

export default function AuctionTermsPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/auction-bidding-terms`);
}
