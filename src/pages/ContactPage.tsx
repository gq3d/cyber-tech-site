import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-cyber-blue px-4 md:px-8 py-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-mono text-xs text-cyber-green/40 hover:text-cyber-green/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={14} />
        Назад
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-widest text-cyber-green/40 border border-cyber-green/20 px-2 py-0.5">
            CONTACT
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-sans font-semibold text-white mb-3">
          Свяжитесь{" "}
          <span className="text-cyber-green">с нами</span>
        </h1>
        <p className="font-mono text-xs text-cyber-green/40 max-w-lg leading-relaxed">
          Расскажите о задаче — инженер ответит в течение нескольких часов и предложит подходящее решение.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contacts */}
        <div className="border border-cyber-green/15 bg-black/20 p-6">
          <div className="font-mono text-[10px] text-cyber-green/30 mb-5 tracking-widest">// КОНТАКТЫ</div>
          <div className="space-y-4">
            {[
              { icon: "Mail", label: "Email", value: "info@инфо-безопасность.рф", href: "mailto:info@инфо-безопасность.рф" },
              { icon: "MessageSquare", label: "Telegram", value: "@infosec_rf", href: "https://t.me/infosec_rf" },
              { icon: "Clock", label: "Часы работы", value: "Пн–Пт 9:00–20:00 МСК", href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 border border-cyber-green/20 flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={13} className="text-cyber-green opacity-50" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-cyber-green/30 mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="font-mono text-xs text-cyber-green/65 hover:text-cyber-green transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-cyber-green/50">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-cyber-green/10">
            <div className="font-mono text-[10px] text-cyber-green/30 mb-3 tracking-widest">// КАК НАПИСАТЬ</div>
            {["Опишите задачу в свободной форме", "Укажите примерный масштаб", "Инженер свяжется и уточнит детали"].map((step, i) => (
              <div key={step} className="flex items-start gap-2 mb-2">
                <span className="font-mono text-[10px] text-cyber-green/25 mt-0.5 shrink-0">{i + 1}.</span>
                <span className="font-mono text-xs text-cyber-green/45 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status panel */}
        <div className="border border-cyber-green/15 bg-black/20">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-cyber-green/10">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-cyber-green/60" />
            </div>
            <span className="font-mono text-xs text-cyber-green/30 ml-2">system.status</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-mono text-[10px] text-cyber-green/40">ONLINE</span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {[
              { label: "Приём заявок", value: "Активно" },
              { label: "Инженеры на связи", value: "Доступны" },
              { label: "Время реакции", value: "< 24 ч" },
              { label: "Конфиденциальность", value: "NDA обязательно" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between pb-3 border-b border-cyber-green/5 last:border-0 last:pb-0">
                <span className="font-mono text-xs text-cyber-green/40">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                  <span className="font-mono text-xs text-cyber-green/75">{row.value}</span>
                </div>
              </div>
            ))}

            <div className="pt-2">
              {[
                { icon: "Clock", text: "Ответ инженера в течение 24 часов" },
                { icon: "FileText", text: "Отчёт в PDF с детализацией" },
                { icon: "Lock", text: "NDA до начала работ" },
                { icon: "Users", text: "Персональный менеджер" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div className="w-6 h-6 border border-cyber-green/20 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={11} className="text-cyber-green opacity-50" />
                  </div>
                  <span className="font-mono text-[11px] text-cyber-green/50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
