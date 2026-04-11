import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <div className="border-t border-white/10 mt-auto" style={{ background: "#0f172a" }}>
      <div className="grid sm:grid-cols-3 gap-6 px-4 md:px-8 py-8 max-w-5xl mx-auto">
        {/* Brand */}
        <div>
          <div className="text-sm font-semibold text-white mb-2">ИНФО-БЕЗОПАСНОСТЬ.РФ</div>
          <p className="leading-relaxed mb-3 text-[#ffffff] text-xs">Инженерная защита сетевой инфраструктуры. 
Без маркетинга — только технические решения.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs text-amber-400">Все системы работают</span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-mono text-[10px] text-white/25 tracking-widest mb-3">РАЗДЕЛЫ</div>
          <div className="space-y-2">
            {[
              { label: "Личная безопасность", href: "/personal-security" },
              { label: "Безопасность для бизнеса", href: "/business" },
              { label: "Технологии", href: "/capabilities" },
              { label: "Связаться", href: "/contact" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="block text-xs hover:text-white/70 transition-colors text-amber-400">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <div className="font-mono text-[10px] text-white/25 tracking-widest mb-3">КОНТАКТЫ</div>
          <div className="space-y-2.5">
            <a href="https://t.me/secureinfosupport" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs hover:text-white/80 transition-colors text-amber-400">
              <Icon name="Send" size={12} />
              @secureinfosupport
            </a>
            <div className="flex items-center gap-2 text-xs text-white/35">
              <Icon name="Clock" size={12} />
              Круглосуточно, 24/7
            </div>
            <div className="flex items-center gap-2 text-xs text-white/35">
              <Icon name="MessageSquare" size={12} />
              Ответ до 24 часов
            </div>
            <div className="flex items-center gap-2 text-xs text-white/35">
              <Icon name="Lock" size={12} />
              NDA до начала работ
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 py-4 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-5xl mx-auto">
        <span className="font-mono text-[11px] text-[#ffffff]">© 2025 инфо-безопасность.рф · Все права защищены</span>
        <span className="font-mono text-[11px] text-white/15">v2.4.1</span>
      </div>
    </div>
  );
}