import type { ReactNode } from "react";

interface StaticHtmlPageProps {
  styles: string;
  bodyHtml: string;
}

export default function StaticHtmlPage({ styles, bodyHtml }: StaticHtmlPageProps) {
  return (
    <>
      {styles ? <style dangerouslySetInnerHTML={{ __html: styles }} /> : null}
      <div className="min-h-screen bg-navy text-cream">
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </>
  );
}
