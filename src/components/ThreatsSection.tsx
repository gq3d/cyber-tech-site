import SectionLabel from "./SectionLabel";
import Icon from "@/components/ui/icon";

const THREATS = [
  {
    icon: "Crosshair",
    code: "THR-01",
    title: "Перехват трафика",
    vector: "Man-in-the-Middle / Passive Sniffing",
    desc: "Атакующий перехватывает пакеты на участке между отправителем и получателем. Возможен в публичных сетях, на скомпрометированном маршрутизаторе или через ARP-spoofing внутри LAN.",
    how: "Сквозное шифрование E2E — трафик расшифровывается только на конечном узле. Промежуточные узлы видят зашифрованный поток без возможности его декодировать.",
    specs: ["AES-256-GCM", "Perfect Forward Secrecy", "Mutual TLS"],
    risk: "CRITICAL",
  },
  {
    icon: "Activity",
    code: "THR-02",
    title: "Анализ сетевой активности",
    vector: "Traffic Analysis / DPI / Fingerprinting",
    desc: "Даже зашифрованный трафик содержит метаданные: размер пакетов, интервалы, паттерны запросов. По ним можно восстановить тип активности, идентифицировать сервисы и профиль поведения.",
    how: "Обфускация паттернов трафика, рандомизация размеров пакетов и интервалов, cover traffic для подавления статистических признаков. DPI-классификаторы не выявляют тип соединения.",
    specs: ["Protocol obfuscation", "Timing randomization", "Padding"],
    risk: "HIGH",
  },
  {
    icon: "FileX",
    code: "THR-03",
    title: "Утечки данных",
    vector: "Data Exfiltration / Insider Threat / Misconfiguration",
    desc: "Данные покидают периметр по разрешённым каналам — через открытые API, DNS-туннели, облачные хранилища, email. Часто не детектируется классическими средствами из-за использования легитимных протоколов.",
    how: "DLP-политики на уровне сети контролируют объём и тип данных в каждом направлении. Сегментация ограничивает доступ к данным по принципу least privilege. Весь исходящий трафик логируется.",
    specs: ["DLP enforcement", "Egress filtering", "Audit log"],
    risk: "HIGH",
  },
  {
    icon: "Bug",
    code: "THR-04",
    title: "Компрометация сети",
    vector: "Lateral Movement / Privilege Escalation / Ransomware",
    desc: "После взлома одного узла атакующий перемещается по плоской сети горизонтально, получая доступ к другим ресурсам. Один скомпрометированный хост становится плацдармом для атаки на всю инфраструктуру.",
    how: "Микросегментация на уровне eBPF: каждый сегмент изолирован, межсегментный трафик — только по явным политикам. Default deny исключает горизонтальное перемещение без авторизации.",
    specs: ["eBPF policy engine", "Zero Trust", "Default Deny"],
    risk: "CRITICAL",
  },
  {
    icon: "WifiOff",
    code: "THR-05",
    title: "Нестабильные каналы связи",
    vector: "Channel Failure / DoS / Physical Disruption",
    desc: "Отказ единственного канала связи — физическое повреждение, перегрузка, направленные помехи или блокировка на уровне провайдера — полностью изолирует объект. Критично для объектов без резервирования.",
    how: "SD-WAN bonding объединяет разнородные каналы (оптика, LTE, спутник, радио) в единый логический интерфейс. Failover при деградации канала — менее 100ms, без разрыва сессий.",
    specs: ["Multi-channel bonding", "BFD failover <100ms", "Satellite fallback"],
    risk: "HIGH",
  },
];

const RISK_STYLE: Record<string, { badge: string; bar: string }> = {
  CRITICAL: { badge: "text-rose-400 border-rose-400",   bar: "bg-rose-500" },
  HIGH:     { badge: "text-orange-400 border-orange-400", bar: "bg-orange-500" },
};

export default function ThreatsSection() {
  return (
    <section id="Угрозы" className="relative bg-[#070b14] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="08" label="Что мы защищаем" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight max-w-xl">
            Конкретные угрозы —{" "}
            <span className="text-cyber-green">конкретные контрмеры</span>
          </h2>
          <p className="font-mono text-xs text-cyber-green opacity-40 max-w-xs leading-relaxed">
            Каждая угроза закрывается на уровне протоколов и архитектуры, а не настроек ПО.
          </p>
        </div>

        <div className="space-y-px">
          {THREATS.map((t) => (
            <div
              key={t.code}
              className="group relative border-l-2 border-cyber-green border-opacity-0 hover:border-opacity-60 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"
            >
              <div className="grid md:grid-cols-[1fr_1fr] gap-0">

                {/* Left — threat */}
                <div className="flex gap-5 p-6 border border-cyber-green border-opacity-10 group-hover:border-opacity-20 transition-all mr-0 md:mr-px">
                  <div className="shrink-0 flex flex-col items-center gap-3 pt-0.5">
                    <div className="w-10 h-10 border border-cyber-green border-opacity-20 group-hover:border-opacity-50 flex items-center justify-center transition-all duration-300">
                      <Icon name={t.icon} size={18} className="text-cyber-green opacity-55 group-hover:opacity-90 transition-opacity" />
                    </div>
                    <div className="w-px flex-1 bg-cyber-green opacity-10 group-hover:opacity-25 transition-opacity" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-mono text-[10px] text-cyber-green opacity-30">{t.code}</span>
                      <span className={`font-mono text-[9px] border px-1.5 py-0.5 ${RISK_STYLE[t.risk].badge} opacity-70`}>
                        {t.risk}
                      </span>
                    </div>

                    <h3 className="font-sans text-base font-semibold text-white mb-1.5 group-hover:text-white transition-colors">
                      {t.title}
                    </h3>

                    <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-3 leading-snug">
                      {t.vector}
                    </div>

                    <p className="font-mono text-xs text-cyber-green opacity-50 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>

                {/* Right — countermeasure */}
                <div className="flex gap-5 p-6 border border-cyber-green border-opacity-10 group-hover:border-opacity-20 transition-all border-l-0 md:border-l">
                  <div className="shrink-0 pt-0.5">
                    <div className="w-10 h-10 border border-cyber-green border-opacity-20 group-hover:border-opacity-40 bg-cyber-green group-hover:bg-opacity-5 bg-opacity-0 flex items-center justify-center transition-all duration-300">
                      <Icon name="ShieldCheck" size={16} className="text-cyber-green opacity-40 group-hover:opacity-70 transition-opacity" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-3 tracking-widest">
                      // КОНТРМЕРА
                    </div>

                    <p className="font-mono text-xs text-cyber-green opacity-55 leading-relaxed mb-4">
                      {t.how}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {t.specs.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] border border-cyber-green border-opacity-20 text-cyber-green opacity-55 px-2 py-0.5 group-hover:opacity-80 group-hover:border-opacity-35 transition-all"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 border border-cyber-green border-opacity-10">
          {THREATS.map((t, i) => (
            <div
              key={t.code}
              className="flex flex-col items-center gap-2 py-4 px-3 border-r border-cyber-green border-opacity-10 last:border-r-0"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${RISK_STYLE[t.risk].bar}`} />
              <span className="font-mono text-[9px] text-cyber-green opacity-30 text-center leading-tight">
                {String(i + 1).padStart(2, "0")} {t.title.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className={`font-mono text-[8px] border px-1 py-0.5 ${RISK_STYLE[t.risk].badge} opacity-50`}>
                {t.risk}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
