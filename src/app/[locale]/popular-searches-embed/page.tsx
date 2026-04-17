import { redirect } from "next/navigation";

export default function PopularSearchesEmbedPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/popular-searches`);
}
