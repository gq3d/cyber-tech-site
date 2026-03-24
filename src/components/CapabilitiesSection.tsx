import { useState } from "react";
import SectionLabel from "./SectionLabel";
import Icon from "@/components/ui/icon";

const CAPABILITIES = [
  {
    icon: "Lock",
    title: "Сквозное шифрование трафика",
    short: "E2E Encryption",
    desc: "Данные шифруются на отправляющем узле и расшифровываются только на принимающем. Промежуточные узлы, провайдеры и операторы не имеют доступа к содержимому.",
    spec: "AES-256-GCM · ChaCha20-Poly1305 · Perfect Forward Secrecy",
    tag: "CRYPTO",
  },
  {
    icon: "Layers",
    title: "Сегментация сети",
    short: "Network Segmentation",
    desc: "Разбивка инфраструктуры на изолированные зоны с независимыми политиками доступа. Компрометация одного сегмента не затрагивает остальные.",
    spec: "VLAN · Namespace isolation · eBPF policy engine",
    tag: "ARCH",
  },
  {
    icon: "Globe",
    title: "Разные IP для разных устройств",
    short: "Per-device IP Routing",
    desc: "Каждое устройство получает независимый внешний идентификатор. Перекрёстная корреляция активности между устройствами исключена на уровне маршрутизации.",
    spec: "Multi-egress routing · IP rotation · NAT isolation",
    tag: "PRIVACY",
  },
  {
    icon: "EyeOff",
    title: "Защита от DPI и анализа трафика",
    short: "Traffic Obfuscation",
    desc: "Трафик маскируется под легитимные протоколы. Статистические паттерны и сигнатуры подавляются — классификаторы глубокой инспекции пакетов не выявляют тип соединения.",
    spec: "Protocol obfuscation · Padding · Timing randomization",
    tag: "STEALTH",
  },
  {
    icon: "GitMerge",
    title: "Интеллектуальная маршрутизация",
    short: "Smart Routing",
    desc: "Трафик распределяется по оптимальным путям в реальном времени с учётом задержки, нагрузки и доступности каналов. Переключение между маршрутами — бесшовное.",
    spec: "BGP · OSPF · Latency-aware failover · ECMP",
    tag: "ROUTING",
  },
  {
    icon: "Radio",
    title: "Резервные каналы связи",
    short: "Multi-channel Redundancy",
    desc: "Автоматическое переключение между каналами: оптоволокно, мобильные сети, спутниковый канал, радио. Потеря одного канала не прерывает соединение.",
    spec: "Satellite · LTE/5G · Radio · Fiber · SD-WAN bonding",
    tag: "RESILIENCE",
  },
  {
    icon: "Cpu",
    title: "Аппаратное шифрование",
    short: "Hardware Crypto",
    desc: "Криптографические операции выполняются на выделенных аппаратных модулях (HSM / TPM). Ключи никогда не покидают защищённую среду исполнения.",
    spec: "HSM · TPM 2.0 · ARM TrustZone · AES-NI offload",
    tag: "HW",
  },
  {
    icon: "LayoutDashboard",
    title: "Централизованное управление",
    short: "Unified Control Plane",
    desc: "Единая консоль для управления политиками, мониторинга состояния узлов и реагирования на инциденты по всей инфраструктуре — независимо от её географии.",
    spec: "REST API · Terraform provider · RBAC · Audit log",
    tag: "MGMT",
  },
];

const TAG_COLORS: Record<string, string> = {
  CRYPTO: "text-cyber-green border-cyber-green",
  ARCH: "text-sky-400 border-sky-400",
  PRIVACY: "text-violet-400 border-violet-400",
  STEALTH: "text-rose-400 border-rose-400",
  ROUTING: "text-amber-400 border-amber-400",
  RESILIENCE: "text-orange-400 border-orange-400",
  HW: "text-cyan-400 border-cyan-400",
  MGMT: "text-emerald-400 border-emerald-400",
};

export default function CapabilitiesSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="Возможности" className="relative bg-cyber-blue py-24 px-6 md:px-12 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-25" />

      {/* Ambient glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)",
          opacity: hovered !== null ? 1 : 0,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel index="05" label="Возможности системы" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight max-w-xl">
            Инженерные решения,{" "}
            <span className="text-cyber-green">а не маркетинговые обещания</span>
          </h2>
          <div className="font-mono text-xs text-cyber-green opacity-40 max-w-xs leading-relaxed">
            Каждая возможность реализована на уровне протоколов и железа — не на уровне настроек ПО.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-cyber-green bg-opacity-[0.07]">
          {CAPABILITIES.map((cap, i) => {
            const isHovered = hovered === i;
            const isExpanded = expanded === i;

            return (
              <div
                key={cap.title}
                className="relative bg-cyber-blue p-0 group cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                {/* Hover background fill */}
                <div
                  className="absolute inset-0 bg-cyber-green pointer-events-none transition-opacity duration-300"
                  style={{ opacity: isHovered ? 0.025 : 0 }}
                />

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 w-0.5 bg-cyber-green transition-all duration-500"
                  style={{ height: isHovered || isExpanded ? "100%" : "0%" }}
                />

                <div className="relative px-6 py-5">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? "border-cyber-green bg-cyber-green bg-opacity-10"
                            : "border-cyber-green border-opacity-20"
                        }`}
                      >
                        <Icon
                          name={cap.icon}
                          size={18}
                          className={`transition-all duration-300 ${isHovered ? "text-cyber-green" : "text-cyber-green opacity-50"}`}
                        />
                      </div>
                      <div>
                        <h3 className={`font-sans text-sm font-semibold leading-snug transition-colors duration-200 ${isHovered ? "text-white" : "text-white opacity-80"}`}>
                          {cap.title}
                        </h3>
                        <div className="font-mono text-[10px] text-cyber-green opacity-30 mt-0.5">{cap.short}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`font-mono text-[9px] border px-1.5 py-0.5 opacity-60 ${TAG_COLORS[cap.tag]}`}>
                        {cap.tag}
                      </span>
                      <Icon
                        name="ChevronDown"
                        size={13}
                        className={`text-cyber-green opacity-30 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`font-mono text-xs leading-relaxed transition-colors duration-200 ${isHovered ? "text-cyber-green opacity-65" : "text-cyber-green opacity-40"}`}>
                    {cap.desc}
                  </p>

                  {/* Spec line — always visible but expands on hover */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: isHovered || isExpanded ? "60px" : "0px", opacity: isHovered || isExpanded ? 1 : 0 }}
                  >
                    <div className="mt-4 pt-4 border-t border-cyber-green border-opacity-10 flex items-center gap-2">
                      <Icon name="Terminal" size={11} className="text-cyber-green opacity-30 shrink-0" />
                      <span className="font-mono text-[10px] text-cyber-green opacity-40 leading-snug">{cap.spec}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 border border-cyber-green border-opacity-10 bg-black bg-opacity-20 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green status-active" />
            <span className="font-mono text-xs text-cyber-green opacity-50">
              Все возможности доступны в рамках аудита инфраструктуры
            </span>
          </div>
          <button
            className="font-mono text-xs border border-cyber-green border-opacity-30 text-cyber-green px-5 py-2.5 hover:bg-cyber-green hover:text-cyber-blue transition-all duration-200 tracking-wider shrink-0"
            onClick={() => {
              document.getElementById("Контакт")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Запросить демо →
          </button>
        </div>
      </div>
    </section>
  );
}
