import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { path: "/", label: "Главная", icon: "LayoutDashboard", exact: true },
  { path: "/personal-security", label: "Личная безопасность", icon: "ShieldCheck" },
  { path: "/business", label: "Бизнес", icon: "Briefcase" },
  { path: "/capabilities", label: "Технологии", icon: "Cpu" },
  { path: "/contact", label: "Контакт", icon: "MessageSquare" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-slate-900 shrink-0 z-30 sticky top-0">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <rect width="32" height="32" fill="#000000"/>
            <text
              x="16"
              y="23"
              fontFamily="Arial, sans-serif"
              fontSize="16"
              fontWeight="bold"
              fill="#ffffff"
              textAnchor="middle"
              letterSpacing="1"
            >ИБ</text>
          </svg>
          <span className="font-sans text-sm text-white font-semibold tracking-wide hidden sm:inline">
            ИНФО-БЕЗОПАСНОСТЬ.РФ
          </span>
          <span className="font-sans text-sm text-white font-semibold tracking-wide sm:hidden">
            ИНФО-БЕЗ.РФ
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-all ${
                  active
                    ? "text-white bg-white/10 border border-white/20"
                    : "text-white/40 hover:text-white/70 border border-transparent"
                }`}
              >
                <Icon name={item.icon} size={14} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 -mr-2 text-white/50 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-slate-900 z-20 flex flex-col overflow-y-auto">
          <nav className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 text-base border transition-all ${
                    active
                      ? "text-white bg-white/10 border-white/25"
                      : "text-white/50 border-white/10 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}

      {/* Page content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Floating Telegram button */}
      <a
        href="https://t.me/secureinfosupport"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-3 shadow-lg hover:bg-white/90 transition-all"
        style={{ bottom: "5.5rem" }}
      >
        <Icon name="Send" size={15} />
        <span className="hidden sm:inline">Telegram</span>
      </a>
    </div>
  );
}