import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const FEATURES = [
  {
    icon: "EyeOff",
    title: "Отсутствие цифрового следа",
    desc: "Ваши действия в сети не оставляют следов: ни у провайдера, ни у рекламных сетей, ни у государственных систем слежения. История посещений, поведенческие паттерны и идентификаторы не фиксируются и не хранятся.",
    color: "text-violet-400",
    border: "border-violet-400/20",
    bg: "from-violet-500/5",
  },
  {
    icon: "Lock",
    title: "Шифрование трафика",
    desc: "Весь входящий и исходящий трафик шифруется на вашем устройстве до выхода в сеть. Провайдер видит только зашифрованный поток — содержимое, адреса назначения и объём данных скрыты.",
    color: "text-cyber-green",
    border: "border-cyber-green/20",
    bg: "from-cyber-green/5",
  },
  {
    icon: "Globe",
    title: "Полная анонимность",
    desc: "Ваш реальный IP-адрес никогда не виден ресурсам, которые вы посещаете. Трафик проходит через изолированные узлы с ротацией адресов — корреляция сессий исключена.",
    color: "text-sky-400",
    border: "border-sky-400/20",
    bg: "from-sky-500/5",
  },
  {
    icon: "Unlock",
    title: "Доступ к любым ресурсам",
    desc: "Никаких географических блокировок и ограничений. Любые сайты, сервисы и мессенджеры — Telegram, Signal, WhatsApp, а также платформы с региональными ограничениями — работают без препятствий.",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "from-amber-500/5",
  },
];

const PLANS = [
  {
    id: "solo",
    icon: "User",
    badge: "SOLO",
    title: "Личный",
    subtitle: "1 устройство",
    color: "border-cyber-green/40",
    accent: "text-cyber-green",
    bg: "from-cyber-green/5",
    highlight: false,
    price: "990 ₽",
    period: "/ месяц",
    features: [
      "1 устройство (любая ОС)",
      "Шифрование всего трафика",
      "Смена IP по запросу",
      "Анонимный DNS",
      "Блокировка трекеров",
      "Приложение для macOS / Windows / iOS / Android",
    ],
  },
  {
    id: "privacy",
    icon: "ShieldCheck",
    badge: "PRIVACY",
    title: "Приватность",
    subtitle: "3 устройства",
    color: "border-violet-400/50",
    accent: "text-violet-400",
    bg: "from-violet-500/8",
    highlight: true,
    price: "1 990 ₽",
    period: "/ месяц",
    features: [
      "3 устройства одновременно",
      "Шифрование трафика E2E",
      "Автоматическая ротация IP",
      "Анонимный DNS + DoH/DoT",
      "Обфускация трафика (обход DPI)",
      "Доступ к заблокированным ресурсам",
      "Приоритетная поддержка",
    ],
  },
  {
    id: "ghost",
    icon: "Ghost",
    badge: "GHOST",
    title: "Невидимка",
    subtitle: "5 устройств + роутер",
    color: "border-rose-400/40",
    accent: "text-rose-400",
    bg: "from-rose-500/5",
    highlight: false,
    price: "3 490 ₽",
    period: "/ месяц",
    features: [
      "5 устройств + установка на роутер",
      "Максимальное шифрование (AES-256 + ChaCha20)",
      "Уникальный IP на каждое устройство",
      "Полная маскировка трафика под HTTPS",
      "Защита от анализа трафика (DPI)",
      "Работа через Tor-сеть (по запросу)",
      "Защита DNS от утечек",
      "Личный менеджер",
    ],
  },
];

export default function PersonalSecurityPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-cyber-blue px-4 md:px-8 py-8 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-mono text-xs text-cyber-green/40 hover:text-cyber-green/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={14} />
        Назад
      </button>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-widest text-cyber-green/40 border border-cyber-green/20 px-2 py-0.5">
            PERSONAL SECURITY
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-sans font-semibold text-white mb-3 leading-tight">
          Личная цифровая{" "}
          <span className="text-cyber-green">безопасность</span>
        </h1>
        <p className="font-mono text-xs text-cyber-green/40 max-w-xl leading-relaxed">
          Полный контроль над вашим цифровым присутствием. Ни один внешний наблюдатель не получит информацию о вашей активности в сети.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid sm:grid-cols-2 gap-3 mb-12">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`border ${f.border} bg-gradient-to-br ${f.bg} to-transparent p-5`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${f.color}`}>
                <Icon name={f.icon} size={18} />
              </div>
              <div>
                <div className={`font-mono text-xs font-semibold mb-1.5 ${f.color}`}>
                  {f.title}
                </div>
                <p className="font-mono text-[11px] text-cyber-green/40 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-lg font-semibold text-white">
          Выберите тариф
        </h2>
        <span className="font-mono text-[10px] text-cyber-green/30">
          Подключение за 24 часа
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setActivePlan(activePlan === plan.id ? null : plan.id)}
            className={`relative flex flex-col border cursor-pointer transition-all duration-200 bg-gradient-to-b ${plan.bg} to-transparent ${
              plan.highlight ? "ring-1 ring-violet-400/30" : ""
            } ${
              activePlan === plan.id
                ? plan.color
                : "border-cyber-green/10 hover:border-cyber-green/25"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-px left-0 right-0 h-0.5 bg-violet-400/60" />
            )}
            {plan.highlight && (
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] bg-violet-400/20 text-violet-400 border border-violet-400/30 px-1.5 py-0.5">
                  POPULAR
                </span>
              </div>
            )}

            <div className="p-5 border-b border-cyber-green/10">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 border flex items-center justify-center ${plan.color} bg-opacity-10`} style={{borderColor: "currentColor", opacity: 0.6}}>
                  <Icon name={plan.icon} size={13} className={plan.accent} />
                </div>
                <span className={`font-mono text-[10px] tracking-widest ${plan.accent} opacity-60`}>
                  {plan.badge}
                </span>
              </div>
              <div className={`font-sans text-base font-semibold ${plan.accent} mb-0.5`}>
                {plan.title}
              </div>
              <div className="font-mono text-[11px] text-cyber-green/30 mb-4">
                {plan.subtitle}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-sans text-xl font-bold text-white">{plan.price}</span>
                <span className="font-mono text-[11px] text-cyber-green/30">{plan.period}</span>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-2 flex-1">
              {plan.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2">
                  <Icon name="Check" size={11} className={`mt-0.5 shrink-0 ${plan.accent}`} />
                  <span className="font-mono text-[11px] text-cyber-green/50 leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            <div className="p-5 pt-0">
              <button
                className={`w-full py-2.5 font-mono text-xs tracking-wider border transition-all ${
                  activePlan === plan.id
                    ? `${plan.accent} border-current bg-current/10`
                    : "text-cyber-green/40 border-cyber-green/15 hover:border-cyber-green/40 hover:text-cyber-green/70"
                }`}
              >
                {activePlan === plan.id ? "Выбрано — связаться" : "Выбрать"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA note */}
      <div className="border border-cyber-green/10 bg-cyber-green/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-white mb-1">Не знаете, какой тариф выбрать?</div>
          <div className="font-mono text-[11px] text-cyber-green/40">
            Расскажите о своей ситуации — подберём оптимальное решение
          </div>
        </div>
        <button
          onClick={() => navigate("/contact")}
          className="shrink-0 flex items-center gap-2 border border-cyber-green/30 text-cyber-green font-mono text-xs px-4 py-2 hover:bg-cyber-green/10 transition-all"
        >
          <Icon name="MessageSquare" size={13} />
          Написать нам
        </button>
      </div>
    </div>
  );
}
