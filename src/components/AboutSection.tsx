import SectionLabel from "./SectionLabel";
import Icon from "@/components/ui/icon";

const PRINCIPLES = [
  {
    icon: "Cpu",
    title: "Инженерная точность",
    text: "Каждое решение основано на анализе сетевых топологий, а не на маркетинговых обещаниях. Мы строим архитектуру под конкретные технические требования.",
  },
  {
    icon: "Lock",
    title: "Изоляция на уровне ядра",
    text: "Сегментация трафика реализована на уровне сетевого стека. Данные изолируются в момент передачи — не только при хранении.",
  },
  {
    icon: "Eye",
    title: "Полная наблюдаемость",
    text: "Реальная картина того, что происходит в сети. Все события логируются, аномалии детектируются автоматически, инциденты разбираются по полному flow.",
  },
  {
    icon: "Code",
    title: "Открытая документация",
    text: "Никаких чёрных ящиков. Протоколы, алгоритмы, схемы взаимодействия — доступны для аудита. Безопасность не требует тайны.",
  },
];

export default function AboutSection() {
  return (
    <section id="О нас" className="relative bg-cyber-blue py-24 px-6 md:px-12 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel index="01" label="О компании" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
              Инженеры, которые{" "}
              <span className="text-cyber-green">понимают сети</span>{" "}
              изнутри
            </h2>
            <p className="font-mono text-sm text-cyber-green opacity-60 leading-relaxed mb-4">
              Мы не продаём коробочные решения. Каждая инсталляция проектируется индивидуально: анализ топологии, профилирование трафика, построение защищённых каналов с учётом специфики инфраструктуры клиента.
            </p>
            <p className="font-mono text-sm text-cyber-green opacity-60 leading-relaxed">
              Команда состоит из network-инженеров и специалистов по информационной безопасности с опытом работы в корпоративных и государственных инфраструктурах.
            </p>

            <div className="mt-8 p-4 border border-cyber-green border-opacity-20 bg-black bg-opacity-30">
              <div className="font-mono text-xs text-cyber-green opacity-40 mb-3">// ТЕХНОЛОГИЧЕСКИЙ СТЕК</div>
              <div className="flex flex-wrap gap-2">
                {["WireGuard", "OpenSSL", "eBPF", "SNMP", "BGP", "Zero Trust", "SIEM", "IDS/IPS"].map((t) => (
                  <span key={t} className="font-mono text-xs border border-cyber-green border-opacity-25 text-cyber-green opacity-70 px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 p-5 border border-cyber-green border-opacity-10 hover:border-opacity-30 transition-all duration-300 bg-black bg-opacity-20 group"
              >
                <div className="shrink-0 w-9 h-9 border border-cyber-green border-opacity-30 flex items-center justify-center group-hover:border-opacity-60 transition-all">
                  <Icon name={p.icon} size={16} className="text-cyber-green" />
                </div>
                <div>
                  <div className="font-sans text-sm font-semibold text-white mb-1">{p.title}</div>
                  <div className="font-mono text-xs text-cyber-green opacity-50 leading-relaxed">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}