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
    <div className="min-h-screen bg-cyber-blue flex flex-col">
      {/* Top bar */}
      <header className="h-12 border-b border-cyber-green/10 flex items-center justify-between px-4 bg-[#070b14] shrink-0 z-30 sticky top-0">
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.poehali.dev/projects/233dcfd3-64d0-41d4-9ea3-846a99343f89/files/6929daf7-a918-4780-aef1-d60f6b6b02c6.jpg"
            alt="ИНФО-БЕЗОПАСНОСТЬ.РФ"
            className="w-7 h-7 object-cover border border-white/20"
          />
          <span className="font-mono text-xs text-cyber-green tracking-widest font-semibold">ИНФО-БЕЗОПАСНОСТЬ.РФ</span>
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
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] tracking-wider transition-all ${
                  active
                    ? "text-cyber-green bg-cyber-green/10 border border-cyber-green/30"
                    : "text-cyber-green/40 hover:text-cyber-green/70 border border-transparent"
                }`}
              >
                <Icon name={item.icon} size={12} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-cyber-green/50 hover:text-cyber-green"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-12 bg-[#070b14]/98 z-20 flex flex-col p-4 gap-2">
          {NAV_ITEMS.map((item) => {
            const active = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 font-mono text-sm tracking-wider border transition-all ${
                  active
                    ? "text-cyber-green bg-cyber-green/10 border-cyber-green/30"
                    : "text-cyber-green/40 border-cyber-green/10"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      )}

      {/* Page content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}