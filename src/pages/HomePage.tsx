import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  {
    path: "/personal-security",
    icon: "ShieldCheck",
    badge: "PERSONAL",
    title: "Личная цифровая безопасность",
    desc: "Анонимность, шифрование трафика, отсутствие цифрового следа и доступ к любым ресурсам.",
    price: "Тарифы от 555 ₽/мес",
    commercial: true,
    tags: ["Без цифрового следа", "Шифрование E2E", "Анонимность", "Свободный доступ"],
    cta: "Выбрать тариф →",
  },
  {
    path: "/business",
    icon: "Building2",
    badge: "BUSINESS",
    title: "Безопасность для бизнеса",
    desc: "Защита корпоративной инфраструктуры, сегментация сети, мониторинг и управление доступом",
    price: "Тарифы от 12 900 ₽/мес",
    commercial: true,
    tags: ["Малый офис", "Корпорация", "Zero Trust", "SIEM"],
    cta: "Смотреть тарифы →",
  },
  {
    path: "/capabilities",
    icon: "Cpu",
    badge: "TECH",
    title: "Технологии и возможности",
    desc: "Технические детали: протоколы, архитектура, алгоритмы шифрования и схемы работы",
    price: "",
    commercial: false,
    tags: ["WireGuard", "AES-256", "eBPF", "Noise Protocol"],
    cta: null,
  },
  {
    path: "/contact",
    icon: "MessageSquare",
    badge: "CONTACT",
    title: "Связаться с нами",
    desc: "Консультация, подбор решения, подключение. Отвечаем в течение нескольких часов",
    price: "",
    commercial: false,
    tags: ["Консультация", "Быстрый ответ", "Без обязательств"],
    cta: null,
  },
];

const STATS = [
  { value: "99.97%", label: "Uptime" },
  { value: "<2ms", label: "Задержка" },
  { value: "AES-256", label: "Шифрование" },
  { value: "24/7", label: "Поддержка" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black flex flex-col">
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto w-full">
      {/* Hero block */}
      <div className="mb-8 border border-white/10 bg-slate-800 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-widest">СИСТЕМА АКТИВНА</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white leading-tight mb-3">
          Защита цифрового<br />
          <span className="text-white/60">пространства</span>
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-lg leading-relaxed mb-3">
          Комплексные решения для личной и корпоративной кибербезопасности
        </p>
        <p className="text-sm sm:text-base text-white mb-6 font-extrabold">Наш PVN работает всегда и везде — Гарантия</p>

        {/* Payment & connection info */}
        <div className="border border-white/10 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/45">
            <span className="flex items-center gap-1.5 text-lg font-extrabold text-amber-400"><Icon name="CreditCard" size={12} className="shrink-0" /> Любой способ оплаты</span>
            <span className="flex items-center gap-1.5 font-extrabold text-[#ffffff]"><Icon name="Zap" size={12} className="shrink-0" /> Подключение за 15–30 минут</span>
            <span className="flex items-center gap-1.5 font-extrabold text-[#ffffff]"><Icon name="MessageCircle" size={12} className="shrink-0" /> Установка через менеджера</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href="https://t.me/secureinfosupport" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-white border border-white/25 px-3 py-1.5 hover:bg-white/10 transition-all whitespace-nowrap">
              <Icon name="Send" size={11} />
              Telegram
            </a>
            <button onClick={() => navigate("/personal-security")}
              className="flex items-center gap-1.5 text-xs font-medium text-white/60 border border-white/15 px-3 py-1.5 hover:bg-white/5 hover:text-white transition-all whitespace-nowrap">
              Начать →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/10">
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center py-3 px-2 border-white/10 ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < 2 ? "border-b sm:border-b-0" : ""} sm:border-r last:border-r-0`}>
              <span className="font-mono text-sm font-bold text-white">{s.value}</span>
              <span className="text-xs text-white/30 mt-0.5 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation cards */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {/* Commercial cards */}
        {SECTIONS.filter(s => s.commercial).map((section) => (
          <button
            key={section.path}
            onClick={() => navigate(section.path)}
            style={{ border: "1px solid rgba(255,255,255,0.35)" }}
            className="relative text-left p-6 transition-all duration-300 group overflow-hidden hover:opacity-90 bg-slate-900"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
            <div className="flex items-start justify-between mb-5">
              <div className="w-9 h-9 flex items-center justify-center text-white" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                <Icon name={section.icon} size={16} />
              </div>
              <Icon name="ArrowRight" size={14} className="mt-1 text-white opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-0.5" />
            </div>
            <div className="text-base font-semibold text-white mb-2">{section.title}</div>
            <p className="text-sm text-white/55 leading-relaxed mb-2">{section.desc}</p>
            {section.price && (
              <p className="text-sm font-bold text-white mb-4">{section.price}</p>
            )}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {section.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-0.5 text-white/60" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
                  {tag}
                </span>
              ))}
            </div>
            {section.cta && (
              <div className="font-mono text-xs font-bold tracking-wider text-white/60 group-hover:text-white transition-colors duration-300">
                {section.cta}
              </div>
            )}
          </button>
        ))}
        {/* Non-commercial cards */}
        {SECTIONS.filter(s => !s.commercial).map((section) => (
          <button
            key={section.path}
            onClick={() => navigate(section.path)}
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            className="relative text-left p-6 transition-all duration-300 group overflow-hidden hover:opacity-80 bg-slate-900"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-9 h-9 flex items-center justify-center text-white/50" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <Icon name={section.icon} size={16} />
              </div>
              <Icon name="ArrowRight" size={14} className="mt-1 text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <div className="text-base font-semibold text-white mb-2">{section.title}</div>
            <p className="text-sm text-white/40 leading-relaxed mb-4">{section.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {section.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-0.5 text-white/25" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

    </div>{/* end inner container */}

      {/* Footer */}
      <div className="border-t border-white/10 mt-auto" style={{ background: "#0f172a" }}>
        <div className="grid sm:grid-cols-3 gap-6 px-4 md:px-8 py-8 max-w-5xl mx-auto">
          {/* Brand */}
          <div>
            <div className="text-sm font-semibold text-white mb-2">ИНФО-БЕЗОПАСНОСТЬ.РФ</div>
            <p className="text-xs text-white/35 leading-relaxed mb-3">
              Инженерная защита сетевой инфраструктуры. Без маркетинга — только технические решения.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs text-white/30">Все системы работают</span>
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
                <a key={item.label} href={item.href} className="block text-xs text-white/35 hover:text-white/70 transition-colors">
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
                className="flex items-center gap-2 text-xs text-white/45 hover:text-white/80 transition-colors">
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
          <span className="font-mono text-[11px] text-white/20">© 2025 инфо-безопасность.рф · Все права защищены</span>
          <span className="font-mono text-[11px] text-white/15">v2.4.1</span>
        </div>
      </div>
    </div>
  );
}