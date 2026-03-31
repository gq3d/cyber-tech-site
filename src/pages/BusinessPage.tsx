import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PLANS = [
  {
    id: "smb",
    icon: "Building",
    badge: "SMB",
    title: "Малый офис",
    subtitle: "До 10 сотрудников",
    color: "border-amber-400/40",
    accent: "text-amber-400",
    bg: "from-amber-500/5",
    price: "9 900 ₽",
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
    subtitle: "10–100 сотрудников",
    color: "border-sky-400/40",
    accent: "text-sky-400",
    bg: "from-sky-500/5",
    price: "от 29 900 ₽",
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
    color: "border-rose-400/40",
    accent: "text-rose-400",
    bg: "from-rose-500/5",
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
    color: "text-sky-400",
    border: "border-sky-400/20",
    bg: "from-sky-500/5",
  },
  {
    icon: "Activity",
    title: "Мониторинг 24/7",
    desc: "Реальное время: аномалии трафика, попытки вторжения, нестандартные паттерны. Уведомления мгновенно.",
    color: "text-cyber-green",
    border: "border-cyber-green/20",
    bg: "from-cyber-green/5",
  },
  {
    icon: "UserCheck",
    title: "Управление доступом",
    desc: "Политики по пользователю и роли. Интеграция с Active Directory и LDAP. Zero Trust — доверие не по умолчанию.",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "from-amber-500/5",
  },
  {
    icon: "FileSearch",
    title: "Аудит и форензика",
    desc: "Полный журнал сетевых событий. Журнал нарушений политик. Расследование инцидентов с таймлайном.",
    color: "text-violet-400",
    border: "border-violet-400/20",
    bg: "from-violet-500/5",
  },
];

export default function BusinessPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-cyber-blue px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-mono text-xs text-cyber-green/40 hover:text-cyber-green/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={14} />
        Назад
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-widest text-cyber-green/40 border border-cyber-green/20 px-2 py-0.5">
            BUSINESS SECURITY
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-sans font-semibold text-white mb-3 leading-tight">
          Безопасность{" "}
          <span className="text-cyber-green">для бизнеса</span>
        </h1>
        <p className="font-mono text-xs text-cyber-green/40 max-w-xl leading-relaxed">
          Защита корпоративной инфраструктуры: от малого офиса до распределённой сети с несколькими ЦОД.
        </p>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-3 mb-12">
        {FEATURES.map((f) => (
          <div key={f.title} className={`border ${f.border} bg-gradient-to-br ${f.bg} to-transparent p-5`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${f.color}`}>
                <Icon name={f.icon} size={18} />
              </div>
              <div>
                <div className={`font-mono text-xs font-semibold mb-1.5 ${f.color}`}>{f.title}</div>
                <p className="font-mono text-[11px] text-cyber-green/40 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-lg font-semibold text-white">Тарифы</h2>
        <span className="font-mono text-[10px] text-cyber-green/30">Развёртывание от 1 дня</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setActivePlan(activePlan === plan.id ? null : plan.id)}
            className={`relative flex flex-col border cursor-pointer transition-all duration-200 bg-gradient-to-b ${plan.bg} to-transparent ${
              plan.highlight ? "ring-1 ring-sky-400/30" : ""
            } ${activePlan === plan.id ? plan.color : "border-cyber-green/10 hover:border-cyber-green/25"}`}
          >
            {plan.highlight && <div className="absolute -top-px left-0 right-0 h-0.5 bg-sky-400/60" />}
            {plan.highlight && (
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] bg-sky-400/20 text-sky-400 border border-sky-400/30 px-1.5 py-0.5">POPULAR</span>
              </div>
            )}

            <div className="p-5 border-b border-cyber-green/10">
              <div className="flex items-center gap-2 mb-3">
                <Icon name={plan.icon} size={14} className={plan.accent} />
                <span className={`font-mono text-[10px] tracking-widest ${plan.accent} opacity-60`}>{plan.badge}</span>
              </div>
              <div className={`font-sans text-base font-semibold ${plan.accent} mb-0.5`}>{plan.title}</div>
              <div className="font-mono text-[11px] text-cyber-green/30 mb-4">{plan.subtitle}</div>
              <div className="flex items-baseline gap-1">
                <span className="font-sans text-xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="font-mono text-[11px] text-cyber-green/30">{plan.period}</span>}
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
              <button className={`w-full py-2.5 font-mono text-xs tracking-wider border transition-all ${
                activePlan === plan.id
                  ? `${plan.accent} border-current bg-current/10`
                  : "text-cyber-green/40 border-cyber-green/15 hover:border-cyber-green/40 hover:text-cyber-green/70"
              }`}>
                {activePlan === plan.id ? "Выбрано — связаться" : "Выбрать"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-cyber-green/10 bg-cyber-green/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-white mb-1">Нужна индивидуальная конфигурация?</div>
          <div className="font-mono text-[11px] text-cyber-green/40">Опишем архитектуру под вашу инфраструктуру</div>
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
