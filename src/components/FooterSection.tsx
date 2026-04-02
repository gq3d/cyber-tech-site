import Icon from "@/components/ui/icon";

export default function FooterSection() {
  return (
    <footer className="relative bg-slate-900 border-t border-cyber-green border-opacity-10 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border border-cyber-green flex items-center justify-center">
                <div className="w-3 h-3 bg-cyber-green" />
              </div>
              <span className="font-mono text-sm text-cyber-green tracking-widest uppercase">инфо-безопасность.рф</span>
            </div>
            <p className="font-mono text-xs text-cyber-green opacity-40 leading-relaxed max-w-xs mb-5">
              Инженерная защита сетевой инфраструктуры. Без маркетинга — только технические решения.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green status-active" />
              <span className="font-mono text-xs text-cyber-green opacity-40">Все системы работают нормально</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-xs text-cyber-green opacity-30 tracking-widest mb-4">РАЗДЕЛЫ</div>
            <div className="space-y-2.5">
              {[
                { label: "Главная", href: "/" },
                { label: "Личная безопасность", href: "/personal-security" },
                { label: "Бизнес", href: "/business" },
                { label: "Технологии", href: "/capabilities" },
                { label: "Контакт", href: "/contact" },
              ].map((item) => (
                <div key={item.label}>
                  <a href={item.href} className="font-mono text-xs text-cyber-green opacity-45 hover:opacity-90 transition-opacity">
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-mono text-xs text-cyber-green opacity-30 tracking-widest mb-4">КОНТАКТЫ</div>
            <div className="space-y-4">
              <a
                href="https://t.me/secureinfosupport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 group"
              >
                <Icon name="Send" size={13} className="text-cyber-green opacity-40 mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-0.5">Telegram</div>
                  <div className="font-mono text-xs text-cyber-green opacity-60 group-hover:opacity-100 transition-opacity">@secureinfosupport</div>
                </div>
              </a>
              <div className="flex items-start gap-2.5">
                <Icon name="Clock" size={13} className="text-cyber-green opacity-40 mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-0.5">Режим работы</div>
                  <div className="font-mono text-xs text-cyber-green opacity-60">Круглосуточно, 24/7</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Icon name="MessageSquare" size={13} className="text-cyber-green opacity-40 mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-0.5">Время ответа</div>
                  <div className="font-mono text-xs text-cyber-green opacity-60">До 24 часов</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Icon name="Lock" size={13} className="text-cyber-green opacity-40 mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-0.5">Конфиденциальность</div>
                  <div className="font-mono text-xs text-cyber-green opacity-60">NDA до начала работ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-green border-opacity-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-cyber-green opacity-25">
            © 2025 инфо-безопасность.рф · Все права защищены
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-cyber-green opacity-25 hover:opacity-50 transition-opacity">Политика конфиденциальности</a>
            <a href="#" className="font-mono text-xs text-cyber-green opacity-25 hover:opacity-50 transition-opacity">Условия использования</a>
          </div>
          <span className="font-mono text-xs text-cyber-green opacity-15">
            sys.version: 4.2.1-stable
          </span>
        </div>
      </div>
    </footer>
  );
}
