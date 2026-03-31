import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  {
    path: "/personal-security",
    icon: "ShieldCheck",
    badge: "PERSONAL",
    title: "Личная цифровая безопасность",
    desc: "Анонимность, шифрование трафика, отсутствие цифрового следа и доступ к любым ресурсам",
    color: "text-cyber-green",
    border: "border-cyber-green/20",
    bg: "from-cyber-green/5",
    hover: "hover:border-cyber-green/50",
    tags: ["Без цифрового следа", "Шифрование E2E", "Анонимность", "Свободный доступ"],
  },
  {
    path: "/business",
    icon: "Building2",
    badge: "BUSINESS",
    title: "Безопасность для бизнеса",
    desc: "Защита корпоративной инфраструктуры, сегментация сети, мониторинг и управление доступом",
    color: "text-sky-400",
    border: "border-sky-400/20",
    bg: "from-sky-500/5",
    hover: "hover:border-sky-400/50",
    tags: ["Малый офис", "Корпорация", "Zero Trust", "SIEM"],
  },
  {
    path: "/capabilities",
    icon: "Cpu",
    badge: "TECH",
    title: "Технологии и возможности",
    desc: "Технические детали: протоколы, архитектура, алгоритмы шифрования и схемы работы",
    color: "text-violet-400",
    border: "border-violet-400/20",
    bg: "from-violet-500/5",
    hover: "hover:border-violet-400/50",
    tags: ["WireGuard", "AES-256", "eBPF", "Noise Protocol"],
  },
  {
    path: "/contact",
    icon: "MessageSquare",
    badge: "CONTACT",
    title: "Связаться с нами",
    desc: "Консультация, подбор решения, подключение. Отвечаем в течение нескольких часов",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "from-amber-500/5",
    hover: "hover:border-amber-400/50",
    tags: ["Консультация", "Быстрый ответ", "Без обязательств"],
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
    <div className="min-h-full bg-cyber-blue px-4 md:px-8 py-8 max-w-5xl mx-auto">
      {/* Hero block */}
      <div className="mb-10 border border-cyber-green/10 bg-gradient-to-br from-cyber-green/[0.03] to-transparent p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-cyber-green/50 tracking-widest">СИСТЕМА АКТИВНА</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-semibold text-white leading-tight mb-2">
              Защита{" "}
              <span className="text-cyber-green">цифрового пространства</span>
            </h1>
            <p className="font-mono text-xs text-cyber-green/40 max-w-lg leading-relaxed">
              Комплексные решения для личной и корпоративной кибербезопасности — от шифрования трафика до защиты корпоративной инфраструктуры
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-0 border border-cyber-green/10">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center py-3 px-2 ${i < 3 ? "border-r border-cyber-green/10" : ""}`}
            >
              <span className="font-mono text-sm md:text-base font-bold text-cyber-green">{s.value}</span>
              <span className="font-mono text-[9px] text-cyber-green/30 mt-0.5 text-center">{s.label}</span>
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
            className={`text-left border ${section.border} ${section.hover} bg-gradient-to-br ${section.bg} to-transparent p-5 transition-all duration-200 group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 border flex items-center justify-center ${section.border}`}>
                  <Icon name={section.icon} size={15} className={section.color} />
                </div>
                <span className={`font-mono text-[10px] tracking-widest ${section.color} opacity-50`}>
                  {section.badge}
                </span>
              </div>
              <Icon
                name="ArrowRight"
                size={14}
                className={`${section.color} opacity-0 group-hover:opacity-60 transition-opacity mt-1`}
              />
            </div>

            <div className={`font-sans text-sm font-semibold mb-2 ${section.color}`}>
              {section.title}
            </div>
            <p className="font-mono text-[11px] text-cyber-green/40 leading-relaxed mb-4">
              {section.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {section.tags.map((tag) => (
                <span
                  key={tag}
                  className={`font-mono text-[9px] border px-1.5 py-0.5 ${section.border} ${section.color} opacity-50`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom status */}
      <div className="flex items-center justify-between border-t border-cyber-green/10 pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-cyber-green rounded-full" />
            <span className="font-mono text-[10px] text-cyber-green/30">Все системы работают</span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-cyber-green/20">v2.4.1</span>
      </div>
    </div>
  );
}
