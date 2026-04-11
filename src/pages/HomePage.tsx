import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import VpnBanner from "@/components/VpnBanner";

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

const BLOCKED_SERVICES = ["YouTube", "WhatsApp", "Instagram", "Facebook", "Discord"];

function CheckBanner() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(true);
  const service = BLOCKED_SERVICES[tick % BLOCKED_SERVICES.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTick((t) => t + 1);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={() => navigate("/check")}
      className="w-full text-left group border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-500/50 transition-all duration-300 p-4 relative overflow-hidden"
    >
      {/* Animated top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Pulse indicator */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 border border-rose-500/40 flex items-center justify-center">
              <Icon name="Globe" size={18} className="text-rose-400" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[10px] text-rose-400/70 tracking-widest">ОБНАРУЖЕНЫ ОГРАНИЧЕНИЯ</span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-white leading-snug">
              Проверьте, доступен ли{" "}
              <span
                className="text-rose-400 inline-block transition-all duration-300"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-6px)" }}
              >{service}</span>{" "}
              в вашей сети
            </div>
            <div className="text-xs text-white/35 mt-0.5">
              Бесплатный тест · 12 сервисов · реальные запросы из браузера
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline font-mono text-xs text-white/40 group-hover:text-white/70 transition-colors">
            Начать тест
          </span>
          <div className="w-8 h-8 border border-white/15 group-hover:border-white/30 flex items-center justify-center transition-colors">
            <Icon name="ArrowRight" size={14} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black flex flex-col">
    <VpnBanner />
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto w-full">
      {/* Hero block */}
      <div className="mb-8 border border-white/10 bg-slate-800 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-widest">СИСТЕМА АКТИВНА</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold leading-tight mb-3 text-amber-400">
          Защита цифрового<br />
          <span className="text-amber-400">пространства</span>
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-lg leading-relaxed mb-3">
          Комплексные решения для личной и корпоративной кибербезопасности
        </p>
        <p className="text-sm sm:text-base mb-6 font-extrabold text-amber-400">Наш PVN работает всегда и везде — Гарантия</p>

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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/10 mb-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center py-3 px-2 border-white/10 ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < 2 ? "border-b sm:border-b-0" : ""} sm:border-r last:border-r-0`}>
              <span className="font-mono text-sm font-bold text-white">{s.value}</span>
              <span className="text-xs text-white/30 mt-0.5 text-center">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Check banner — встроен в hero */}
        <CheckBanner />
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
            <div className="text-base font-semibold text-amber-400 mb-2">{section.title}</div>
            <p className="text-sm leading-relaxed mb-2 text-[#ffffff]">{section.desc}</p>
            {section.price && (
              <p className="text-sm font-bold mb-4 text-amber-400">{section.price}</p>
            )}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {section.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-0.5 text-amber-400" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>
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
            <div className="text-base font-semibold text-amber-400 mb-2">{section.title}</div>
            <p className="text-sm leading-relaxed mb-4 text-[#ffffff]">{section.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {section.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-0.5 text-amber-400" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

    </div>{/* end inner container */}

    </div>
  );
}