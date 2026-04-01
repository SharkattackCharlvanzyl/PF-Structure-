"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function LoginPage() {
  const t = useTranslations("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-10">{t("subtitle")}</p>

      <div className="pf-card">
        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gold/20 text-cream hover:bg-navy-light transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t("google")}
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gold/20 text-cream hover:bg-navy-light transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t("facebook")}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gold/20" />
          <span className="text-cream/40 text-sm">{t("or")}</span>
          <div className="flex-1 h-px bg-gold/20" />
        </div>

        {/* Email Login Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-cream/60 text-sm mb-1.5">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream placeholder-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
              placeholder={t("emailPlaceholder")}
            />
          </div>
          <div>
            <label className="block text-cream/60 text-sm mb-1.5">{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream placeholder-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
              placeholder={t("passwordPlaceholder")}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-cream/50 cursor-pointer">
              <input type="checkbox" className="rounded border-gold/30" />
              {t("rememberMe")}
            </label>
            <a href="#" className="text-gold hover:text-gold/80 transition-colors">
              {t("forgotPassword")}
            </a>
          </div>
          <button type="submit" className="btn-gold w-full py-3">
            {t("signIn")}
          </button>
        </form>

        <p className="text-center text-cream/40 text-sm mt-6">
          {t("noAccount")}{" "}
          <a href="#" className="text-gold hover:text-gold/80 transition-colors">
            {t("signUp")}
          </a>
        </p>
      </div>
    </div>
  );
}
