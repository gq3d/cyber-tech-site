import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useMeta } from "@/hooks/useMeta";

const FEATURES = [
  {
    icon: "EyeOff",
    title: "Отсутствие цифрового следа",
    desc: "Ваши действия в сети не оставляют следов: ни у провайдера, ни у рекламных сетей, ни у государственных систем слежения. История посещений и поведенческие паттерны не фиксируются.",
  },
  {
    icon: "Lock",
    title: "Шифрование трафика",
    desc: "Весь входящий и исходящий трафик шифруется на вашем устройстве до выхода в сеть. Провайдер видит только зашифрованный поток — содержимое и адреса назначения скрыты.",
  },
  {
    icon: "Globe",
    title: "Полная анонимность",
    desc: "Ваш реальный IP-адрес никогда не виден ресурсам, которые вы посещаете. Трафик проходит через изолированные узлы с ротацией адресов — корреляция сессий исключена.",
  },
  {
    icon: "Unlock",
    title: "Доступ к любым ресурсам",
    desc: "Никаких географических блокировок. Любые сайты, сервисы и мессенджеры — Telegram, Signal, WhatsApp — работают без ограничений.",
  },
];

const PLANS = [
  {
    id: "solo",
    icon: "User",
    badge: "SOLO",
    title: "Личный",
    price: "555 ₽",
    period: "/ месяц",
    features: [
      "Шифрование всего трафика",
      "Анонимный DNS",
      "Блокировка трекеров",
      "Доступ к заблокированным ресурсам",
      "Приложение для всех платформ",
    ],
  },
  {
    id: "privacy",
    icon: "ShieldCheck",
    badge: "PRIVACY",
    title: "Приватность",
    price: "888 ₽",
    period: "/ месяц",
    highlight: true,
    features: [
      "Шифрование E2E",
      "Анонимный DNS + DoH/DoT",
      "Обфускация трафика",
      "Доступ к заблокированным ресурсам",
      "Приоритетная поддержка",
    ],
  },
  {
    id: "ghost",
    icon: "Ghost",
    badge: "GHOST",
    title: "Невидимка",
    price: "3 333 ₽",
    period: "/ месяц",
    features: [
      "Максимальное шифрование AES-256",
      "Маскировка трафика под HTTPS",
      "Защита от анализа трафика",
      "Защита DNS от утечек",
      "Доступ к заблокированным ресурсам",
      "Приоритетные обновления шифрования и анонимизации",
      "Личный менеджер",
    ],
  },
];

export default function PersonalSecurityPage() {
  const navigate = useNavigate();
  useMeta({
    title: "Личная цифровая безопасность",
    description: "Анонимность в сети, шифрование трафика, защита от слежки и цифрового следа. Личный VPN и приватный доступ к любым ресурсам. Тарифы от 555 ₽/мес.",
    path: "/personal-security",
    keywords: "личная безопасность, VPN, анонимность, шифрование трафика, цифровой след, приватность",
  });

  return (
    <div className="min-h-full bg-black px-4 md:px-8 py-8 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={15} />
        Назад
      </button>

      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-xs tracking-widest text-white/30 border border-white/15 px-2 py-1 inline-block mb-4">
          PERSONAL SECURITY
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight text-amber-400">
          Личная цифровая безопасность
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-xl leading-relaxed">
          Полный контроль над вашим цифровым присутствием. Ни один внешний наблюдатель не получит информацию о вашей активности в сети.
        </p>
      </div>

      {/* Plans */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-amber-400">Выберите тариф</h2>
        <span className="text-sm text-white/30">Подключение за 24 часа</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col transition-all duration-300 group
              ${plan.highlight
                ? "border border-cyber-green bg-cyber-green/[0.04] shadow-[0_0_32px_-8px_rgba(0,255,136,0.18)] hover:shadow-[0_0_40px_-6px_rgba(0,255,136,0.28)] hover:border-cyber-green"
                : "border border-white/10 bg-slate-800 hover:border-cyber-green/40 hover:bg-cyber-green/[0.03]"
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
                <div className={`w-7 h-7 flex items-center justify-center border transition-all duration-300 ${plan.highlight ? "border-cyber-green/40 text-cyber-green" : "border-white/15 text-white/40 group-hover:border-cyber-green/30 group-hover:text-cyber-green/70"}`}>
                  <Icon name={plan.icon} size={13} />
                </div>
                <span className={`font-mono text-[10px] tracking-widest ${plan.highlight ? "text-cyber-green/60" : "text-white/25"}`}>{plan.badge}</span>
              </div>
              <div className="text-base font-bold text-white mb-5">{plan.title}</div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-3xl font-bold tracking-tight ${plan.highlight ? "text-cyber-green" : "text-white"}`}>{plan.price}</span>
                <span className="font-mono text-xs text-white/25">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              {plan.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5">
                  <Icon name="Check" size={12} className={`mt-0.5 shrink-0 transition-colors duration-300 ${plan.highlight ? "text-cyber-green" : "text-white/35 group-hover:text-cyber-green/50"}`} />
                  <span className="text-sm text-white/50 leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div className="p-5 pt-0">
              <a
                href="/contact"
                className={`block w-full py-2.5 text-center font-mono text-xs font-bold tracking-wider transition-all duration-200
                  ${plan.highlight
                    ? "bg-cyber-green text-cyber-blue hover:bg-cyber-green/90"
                    : "border border-white/15 text-white/35 hover:border-cyber-green/40 hover:text-cyber-green/70"
                  }`}
              >
                {plan.highlight ? "ВЫБРАТЬ →" : "ПОДРОБНЕЕ"}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Features grid */}
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

      {/* Payment & onboarding info */}
      <div className="border border-white/10 bg-slate-800 p-6 mb-4">
        <div className="font-mono text-[10px] text-white/30 tracking-widest mb-4">КАК ПОДКЛЮЧИТЬСЯ</div>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="MessageSquare" size={13} className="text-white/50" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Напишите менеджеру</div>
              <div className="text-xs text-white/40 leading-relaxed">В Telegram или в Живом чате на сайте</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="CreditCard" size={13} className="text-white/50" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Любой способ оплаты</div>
              <div className="text-xs text-white/40 leading-relaxed">Карта, СБП, наличные, криптовалюта — принимаем всё</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="Zap" size={13} className="text-white/50" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Быстрое подключение</div>
              <div className="text-xs text-white/40 leading-relaxed">Установка и настройка за 15–30 минут</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs text-white/35">Подключиться прямо сейчас:</span>
          <div className="flex gap-3">
            <a href="https://t.me/secureinfosupport" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-white border border-white/25 px-3 py-1.5 hover:bg-white/10 transition-all">
              <Icon name="Send" size={12} />
              Telegram
            </a>
            <button onClick={() => { const w = window as Window & { jivo_api?: { open: () => void } }; if (w.jivo_api) w.jivo_api.open(); }}
              className="flex items-center gap-1.5 text-xs font-medium text-white/60 border border-white/15 px-3 py-1.5 hover:bg-white/5 hover:text-white transition-all">
              <Icon name="MessageCircle" size={12} />
              Живой чат
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border border-white/10 bg-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-white mb-1">Не знаете, какой тариф выбрать?</div>
          <div className="text-sm text-white/45">Расскажите о своей ситуации — подберём оптимальное решение</div>
        </div>
        <a
          href="https://t.me/secureinfosupport"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium px-5 py-3 hover:bg-white/10 transition-all"
        >
          <Icon name="Send" size={14} />
          Telegram
        </a>
      </div>
    </div>
  );
}