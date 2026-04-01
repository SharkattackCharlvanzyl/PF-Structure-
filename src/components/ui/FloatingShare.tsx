"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const shareLinks = [
  { key: "whatsapp", icon: "💬", getUrl: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}` },
  { key: "facebook", icon: "📘", getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { key: "linkedin", icon: "💼", getUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { key: "twitter", icon: "🐦", getUrl: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}` },
  { key: "telegram", icon: "✈️", getUrl: (url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}` },
  { key: "email", icon: "📧", getUrl: (url: string) => `mailto:?body=${encodeURIComponent(url)}` },
];

export default function FloatingShare() {
  const t = useTranslations("share");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gold text-navy-dark flex items-center justify-center shadow-lg hover:bg-gold-dark transition-all hover:scale-110"
        title={t("title")}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {/* Share Panel */}
      {open && (
        <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-navy-light border-2 border-gold/20 rounded-2xl p-4 shadow-2xl min-w-[180px]">
          <p className="text-gold font-semibold text-sm mb-3">{t("title")}</p>
          <div className="space-y-2">
            {shareLinks.map((link) => (
              <a
                key={link.key}
                href={link.getUrl(currentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gold/10 text-cream/70 hover:text-cream transition-colors text-sm"
              >
                <span>{link.icon}</span>
                {t(link.key)}
              </a>
            ))}
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gold/10 text-cream/70 hover:text-cream transition-colors text-sm w-full"
            >
              <span>🔗</span>
              {copied ? t("copied") : t("copyLink")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
