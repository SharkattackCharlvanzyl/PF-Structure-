import { notFound } from "next/navigation";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import { getAllHtmlRoutes, getFileNameForRoute, loadHtmlPage } from "@/lib/html-pages";

export function generateStaticParams() {
  return getAllHtmlRoutes();
}

export function generateMetadata({ params }: { params: { locale: string; slug: string[] } }) {
  const fileName = getFileNameForRoute(params.slug);
  if (!fileName) {
    return {};
  }

  const pageData = loadHtmlPage(fileName);
  return {
    title: pageData.title ?? "Propworths",
  };
}

export default function HtmlFallbackPage({ params }: { params: { locale: string; slug: string[] } }) {
  const fileName = getFileNameForRoute(params.slug);
  if (!fileName) {
    return notFound();
  }

  const pageData = loadHtmlPage(fileName);
  return <StaticHtmlPage styles={pageData.styles} bodyHtml={pageData.bodyHtml} />;
}
