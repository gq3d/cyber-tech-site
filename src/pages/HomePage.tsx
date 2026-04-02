import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  {
    path: "/personal-security",
    icon: "ShieldCheck",
    badge: "PERSONAL",
    title: "Личная цифровая безопасность",
    desc: "Анонимность, шифрование трафика, отсутствие цифрового следа и доступ к любым ресурсам. Тарифы от 555 ₽/мес",
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
    <div className="min-h-full bg-black px-4 md:px-8 py-8 max-w-5xl mx-auto">
      {/* Hero block */}
      <div className="mb-8 border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-widest">СИСТЕМА АКТИВНА</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white leading-tight mb-3">
          Защита цифрового<br />
          <span className="text-white/60">пространства</span>
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-lg leading-relaxed mb-6">
          Комплексные решения для личной и корпоративной кибербезопасности — от шифрования трафика до защиты корпоративной инфраструктуры
        </p>

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
        {SECTIONS.map((section) => (
          <button
            key={section.path}
            onClick={() => navigate(section.path)}
            className={`relative text-left p-6 transition-all duration-300 group overflow-hidden
              ${section.commercial
                ? "border border-cyber-green/40 bg-cyber-green/[0.04] hover:border-cyber-green hover:bg-cyber-green/[0.07] hover:shadow-[0_0_28px_-6px_rgba(0,255,136,0.2)]"
                : "border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
              }`}
          >
            {/* Accent top line for commercial */}
            {section.commercial && (
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green/60 to-transparent" />
            )}

            <div className="flex items-start justify-between mb-5">
              <div className={`w-9 h-9 flex items-center justify-center border transition-all duration-300
                ${section.commercial
                  ? "border-cyber-green/40 text-cyber-green group-hover:border-cyber-green group-hover:bg-cyber-green/10"
                  : "border-white/15 text-white/50 group-hover:border-white/30"
                }`}>
                <Icon name={section.icon} size={16} />
              </div>
              <Icon
                name="ArrowRight"
                size={14}
                className={`mt-1 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5
                  ${section.commercial ? "text-cyber-green" : "text-white/40"}`}
              />
            </div>

            <div className={`text-base font-semibold mb-2 ${section.commercial ? "text-white" : "text-white/80"}`}>
              {section.title}
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-4">
              {section.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {section.tags.map((tag) => (
                <span
                  key={tag}
                  className={`font-mono text-[10px] border px-2 py-0.5 transition-colors duration-300
                    ${section.commercial
                      ? "border-cyber-green/25 text-cyber-green/50 group-hover:border-cyber-green/40 group-hover:text-cyber-green/70"
                      : "border-white/12 text-white/30"
                    }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {section.cta && (
              <div className={`font-mono text-xs font-bold tracking-wider mt-auto ${section.commercial ? "text-cyber-green/70 group-hover:text-cyber-green" : "text-white/30"} transition-colors duration-300`}>
                {section.cta}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom status */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="text-sm text-white/30">Все системы работают</span>
        </div>
        <span className="font-mono text-xs text-white/20">v2.4.1</span>
      </div>
    </div>
  );
}