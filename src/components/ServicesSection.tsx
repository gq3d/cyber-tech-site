import SectionLabel from "./SectionLabel";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    id: "01",
    icon: "Network",
    title: "Защищённые сетевые каналы",
    status: "ACTIVE",
    desc: "Построение изолированных каналов передачи данных между объектами инфраструктуры. Шифрование на транспортном уровне, аутентификация узлов.",
    tags: ["L3/L4", "Mesh", "Multi-site"],
  },
  {
    id: "02",
    icon: "Layers",
    title: "Сегментация и микросегментация",
    status: "ACTIVE",
    desc: "Разделение сетевых зон по политикам безопасности. Ограничение горизонтального распространения угроз внутри инфраструктуры.",
    tags: ["VLAN", "Zero Trust", "Policy"],
  },
  {
    id: "03",
    icon: "Activity",
    title: "Мониторинг трафика в реальном времени",
    status: "ACTIVE",
    desc: "Анализ сетевых потоков, детекция аномалий, профилирование поведения узлов. Уведомления об инцидентах в режиме реального времени.",
    tags: ["NetFlow", "DPI", "SIEM"],
  },
  {
    id: "04",
    icon: "ShieldCheck",
    title: "Аудит и оценка защищённости",
    status: "BETA",
    desc: "Комплексная проверка сетевой инфраструктуры: конфигурации, политики доступа, экспортированные сервисы, уязвимые точки входа.",
    tags: ["Pentest", "Config Review", "Report"],
  },
  {
    id: "05",
    icon: "Server",
    title: "Управляемая инфраструктура",
    status: "SOON",
    desc: "Делегирование операционного управления сетевыми компонентами. Мониторинг, обновления, реагирование на инциденты — на стороне команды.",
    tags: ["NOC", "24/7", "SLA"],
  },
  {
    id: "06",
    icon: "Key",
    title: "Управление идентификацией",
    status: "SOON",
    desc: "Централизованное управление доступом к сетевым ресурсам. Интеграция с корпоративными каталогами, MFA, контроль сессий.",
    tags: ["IAM", "MFA", "SSO"],
  },
];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "text-cyber-green border-cyber-green",
  BETA: "text-yellow-400 border-yellow-400",
  SOON: "text-gray-500 border-gray-600",
};

export default function ServicesSection() {
  return (
    <section id="Услуги" className="relative bg-[#070b14] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="02" label="Услуги" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight max-w-lg">
            Комплексная защита{" "}
            <span className="text-cyber-green">от периметра до данных</span>
          </h2>
          <p className="font-mono text-xs text-cyber-green opacity-40 max-w-xs leading-relaxed">
            Набор услуг формируется под задачи конкретной инфраструктуры. Можно выбрать отдельные модули или полный стек.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cyber-green bg-opacity-10">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="relative bg-[#070b14] p-6 hover:bg-black hover:bg-opacity-40 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 border border-cyber-green border-opacity-20 flex items-center justify-center group-hover:border-opacity-50 transition-all">
                  <Icon name={s.icon} size={18} className="text-cyber-green opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className={`font-mono text-[10px] border px-2 py-0.5 ${STATUS_COLORS[s.status]} opacity-70`}>
                  {s.status}
                </span>
              </div>

              <div className="font-mono text-xs text-cyber-green opacity-30 mb-1">{s.id}</div>
              <h3 className="font-sans text-base font-semibold text-white mb-3 leading-snug">{s.title}</h3>
              <p className="font-mono text-xs text-cyber-green opacity-45 leading-relaxed mb-5">{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] text-cyber-green opacity-40 border border-cyber-green border-opacity-15 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-px bg-cyber-green group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
