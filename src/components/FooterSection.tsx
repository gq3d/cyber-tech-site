import Icon from "@/components/ui/icon";

export default function FooterSection() {
  return (
    <footer className="relative bg-[#040710] border-t border-cyber-green border-opacity-10 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border border-cyber-green flex items-center justify-center">
                <div className="w-3 h-3 bg-cyber-green" />
              </div>
              <span className="font-mono text-sm text-cyber-green tracking-widest uppercase">NetGuard</span>
            </div>
            <p className="font-mono text-xs text-cyber-green opacity-40 leading-relaxed max-w-xs">
              Инженерная защита сетевой инфраструктуры. Без маркетинга — только технические решения.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green status-active" />
              <span className="font-mono text-xs text-cyber-green opacity-40">Все системы работают нормально</span>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs text-cyber-green opacity-30 tracking-widest mb-4">НАВИГАЦИЯ</div>
            <div className="space-y-2">
              {["О компании", "Услуги", "Возможности", "Как работает", "Заявка"].map((item) => (
                <div key={item}>
                  <a href="#" className="font-mono text-xs text-cyber-green opacity-50 hover:opacity-100 transition-opacity">
                    {item}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs text-cyber-green opacity-30 tracking-widest mb-4">КОНТАКТЫ</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={12} className="text-cyber-green opacity-40" />
                <span className="font-mono text-xs text-cyber-green opacity-50">security@netguard.io</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MessageSquare" size={12} className="text-cyber-green opacity-40" />
                <span className="font-mono text-xs text-cyber-green opacity-50">@netguard_sec</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={12} className="text-cyber-green opacity-40" />
                <span className="font-mono text-xs text-cyber-green opacity-50">Пн–Пт 9:00–20:00 МСК</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-green border-opacity-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-cyber-green opacity-25">
            © 2025 NetGuard · Все права защищены
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
