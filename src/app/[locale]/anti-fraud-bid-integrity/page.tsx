import { redirect } from "next/navigation";

export default function AntiFraudBidIntegrityPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/anti-fraud`);
}
