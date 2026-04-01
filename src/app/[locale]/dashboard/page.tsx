import { useTranslations } from "next-intl";

const stats = [
  { key: "listings", icon: "🏠" },
  { key: "views", icon: "👁️" },
  { key: "enquiries", icon: "📩" },
  { key: "saved", icon: "❤️" },
];

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl text-gold font-bold">
            {t("title")}
          </h1>
          <p className="text-cream/50 mt-1">{t("welcome")}</p>
        </div>
        <button className="btn-gold">{t("addListing")}</button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.key} className="pf-card text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-gold">{t(`stats.${stat.key}.value`)}</p>
            <p className="text-cream/40 text-sm">{t(`stats.${stat.key}.label`)}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 pf-card">
          <h2 className="font-display text-xl text-cream font-semibold mb-6">
            {t("recentActivity.title")}
          </h2>
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-navy-light/50 border border-gold/10"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-lg">
                  {["📩", "👁️", "❤️"][i]}
                </div>
                <div className="flex-1">
                  <p className="text-cream text-sm">{t(`recentActivity.items.${i}.text`)}</p>
                  <p className="text-cream/30 text-xs">{t(`recentActivity.items.${i}.time`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pf-card">
          <h2 className="font-display text-xl text-cream font-semibold mb-6">
            {t("quickActions.title")}
          </h2>
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-3 rounded-lg border border-gold/20 text-cream/70 hover:border-gold/40 hover:text-cream transition-all text-sm"
              >
                {t(`quickActions.items.${i}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
