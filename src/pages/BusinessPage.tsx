import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PLANS = [
  {
    id: "smb",
    icon: "Building",
    badge: "SMB",
    title: "Малый офис",
    subtitle: "До 3 рабочих мест",
    price: "12 900 ₽",
    period: "/ месяц",
    features: [
      "Изолированная рабочая сеть",
      "Шифрование всего трафика",
      "Контроль доступа к ресурсам",
      "Гостевая Wi-Fi зона",
      "Удалённая настройка за 1 день",
      "Отчёт о сетевой активности",
    ],
  },
  {
    id: "business",
    icon: "Briefcase",
    badge: "BUSINESS",
    title: "Офис",
    subtitle: "От 3 до 15 рабочих мест",
    price: "от 29 000 ₽",
    period: "/ месяц",
    highlight: true,
    features: [
      "Микросегментация по отделам",
      "Интеграция с Active Directory",
      "Мониторинг трафика real-time",
      "DLP: контроль утечки данных",
      "Обнаружение вторжений (IDS)",
      "Журнал всех сетевых событий",
      "Выделенный менеджер",
      "SLA 99.9%, реакция < 1 ч",
    ],
  },
  {
    id: "enterprise",
    icon: "Globe",
    badge: "ENTERPRISE",
    title: "Корпорация",
    subtitle: "Несколько офисов / ЦОД",
    price: "Индивидуально",
    period: "",
    features: [
      "Шифрованные каналы между офисами",
      "Zero Trust Network Access",
      "SD-WAN с контролем качества",
      "Мультиоблачная сегментация",
      "SIEM-интеграция и форензика",
      "Автовосстановление каналов",
      "Аудит и сертификация",
      "24/7 NOC, индивидуальный SLA",
    ],
  },
];

const FEATURES = [
  {
    icon: "Layers",
    title: "Сегментация сети",
    desc: "Изоляция отделов, серверов и IoT-устройств. Компрометация одного узла не распространяется на остальную сеть.",
  },
  {
    icon: "Activity",
    title: "Мониторинг 24/7",
    desc: "Реальное время: аномалии трафика, попытки вторжения, нестандартные паттерны. Уведомления мгновенно.",
  },
  {
    icon: "UserCheck",
    title: "Управление доступом",
    desc: "Политики по пользователю и роли. Интеграция с Active Directory и LDAP. Zero Trust — доверие не по умолчанию.",
  },
  {
    icon: "FileSearch",
    title: "Аудит и форензика",
    desc: "Полный журнал сетевых событий. Расследование инцидентов с таймлайном. Отчёты для руководства.",
  },
];

export default function BusinessPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={15} />
        Назад
      </button>

      <div className="mb-10">
        <span className="font-mono text-xs tracking-widest text-white/30 border border-white/15 px-2 py-1 inline-block mb-4">
          BUSINESS SECURITY
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Безопасность для бизнеса
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-xl leading-relaxed">
          Защита корпоративной инфраструктуры: от малого офиса до распределённой сети с несколькими ЦОД.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-12">
        {FEATURES.map((f) => (
          <div key={f.title} className="border border-white/10 bg-slate-800 p-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-white/60 shrink-0">
                <Icon name={f.icon} size={20} />
              </div>
              <div>
                <div className="text-base font-semibold text-white mb-2">{f.title}</div>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-white">Тарифы</h2>
        <span className="text-sm text-white/30">Развёртывание от 1 дня</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setActivePlan(activePlan === plan.id ? null : plan.id)}
            className={`relative flex flex-col cursor-pointer transition-all duration-300 group
              ${plan.highlight
                ? "border border-cyber-green bg-cyber-green/[0.04] shadow-[0_0_32px_-8px_rgba(0,255,136,0.18)]"
                : "border bg-slate-800 hover:bg-cyber-green/[0.03]"
              }
              ${activePlan === plan.id
                ? "border-cyber-green shadow-[0_0_24px_-6px_rgba(0,255,136,0.25)]"
                : plan.highlight
                  ? "border-cyber-green/50 hover:border-cyber-green"
                  : "border-white/10 hover:border-cyber-green/40"
              }`}
          >
            {/* Top accent line */}
            {plan.highlight && (
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent" />
            )}
            {/* Popular badge */}
            {plan.highlight && (
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[9px] bg-cyber-green/15 text-cyber-green border border-cyber-green/30 px-2 py-0.5 tracking-widest">POPULAR</span>
              </div>
            )}

            {/* Header */}
            <div className={`p-5 border-b ${plan.highlight ? "border-cyber-green/20" : "border-white/8"}`}>
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-7 h-7 flex items-center justify-center border ${plan.highlight ? "border-cyber-green/40 text-cyber-green" : "border-white/15 text-white/40 group-hover:border-cyber-green/30 group-hover:text-cyber-green/70"} transition-all duration-300`}>
                  <Icon name={plan.icon} size={13} />
                </div>
                <span className={`font-mono text-[10px] tracking-widest ${plan.highlight ? "text-cyber-green/60" : "text-white/25"}`}>{plan.badge}</span>
              </div>
              <div className="text-base font-bold text-white mb-0.5">{plan.title}</div>
              <div className="font-mono text-xs text-white/30 mb-5">{plan.subtitle}</div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-3xl font-bold tracking-tight ${plan.highlight ? "text-cyber-green" : "text-white"}`}>{plan.price}</span>
                {plan.period && <span className="font-mono text-xs text-white/25">{plan.period}</span>}
              </div>
            </div>

            {/* Features */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              {plan.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5">
                  <Icon name="Check" size={12} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-cyber-green" : "text-white/35 group-hover:text-cyber-green/50"} transition-colors duration-300`} />
                  <span className="text-sm text-white/50 leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="p-5 pt-0">
              <button className={`w-full py-2.5 font-mono text-xs font-bold tracking-wider transition-all duration-200
                ${activePlan === plan.id
                  ? "bg-cyber-green text-cyber-blue"
                  : plan.highlight
                    ? "border border-cyber-green/50 text-cyber-green hover:bg-cyber-green hover:text-cyber-blue"
                    : "border border-white/15 text-white/35 hover:border-cyber-green/40 hover:text-cyber-green/70"
                }`}>
                {activePlan === plan.id ? "ВЫБРАНО — СВЯЗАТЬСЯ →" : "ВЫБРАТЬ"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-white/10 bg-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-white mb-1">Нужна индивидуальная конфигурация?</div>
          <div className="text-sm text-white/45">Опишем архитектуру под вашу инфраструктуру</div>
        </div>
        <button
          onClick={() => navigate("/contact")}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium px-5 py-3 hover:bg-white/10 transition-all"
        >
          <Icon name="MessageSquare" size={14} />
          Написать нам
        </button>
      </div>
    </div>
  );
}