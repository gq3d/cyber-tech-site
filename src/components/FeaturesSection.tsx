import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import Icon from "@/components/ui/icon";

const METRICS = [
  { label: "Пакеты/сек", value: "847K", change: "+2.3%" },
  { label: "Аномалии", value: "3", change: "обнаружено" },
  { label: "Активных узлов", value: "128", change: "в сети" },
  { label: "Задержка", value: "1.4ms", change: "avg RTT" },
];

const FEATURES = [
  {
    icon: "BarChart3",
    title: "Аналитика трафика в реальном времени",
    desc: "Непрерывный сбор и анализ сетевых потоков. Профили поведения узлов строятся автоматически, отклонения — немедленно флагируются.",
    detail: "NetFlow v9, IPFIX, sFlow · 100Gbps throughput · 30-day retention",
  },
  {
    icon: "Zap",
    title: "Детекция аномалий на основе ML",
    desc: "Модели машинного обучения обучаются на истории трафика вашей сети. Ложных срабатываний меньше — сигнал чище.",
    detail: "Supervised + unsupervised · <200ms detection · Auto-baselining",
  },
  {
    icon: "Map",
    title: "Карта сетевых зависимостей",
    desc: "Автоматическое построение топологии: узлы, соединения, направления потоков. Видите всё, что происходит в сети.",
    detail: "Auto-discovery · L2/L3 mapping · Export to Visio/JSON",
  },
  {
    icon: "Bell",
    title: "Инцидент-менеджмент",
    desc: "Алерты с контекстом: не просто «что-то сработало», а полный граф события с timeline и рекомендациями.",
    detail: "PagerDuty · Telegram · Webhook · SIEM integration",
  },
  {
    icon: "Shield",
    title: "Контроль политик доступа",
    desc: "Централизованное управление правилами: кто, куда, когда и по какому протоколу может подключаться.",
    detail: "RBAC · Time-based rules · Geo-fencing · Audit log",
  },
  {
    icon: "Archive",
    title: "Форензика и ретроспективный анализ",
    desc: "Любой инцидент можно разобрать по пакетам за любой момент времени. Полная картина атаки или утечки.",
    detail: "PCAP capture · 90-day replay · Chain of custody",
  },
];

function AnimatedBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="h-1 bg-cyber-green bg-opacity-10 rounded-full overflow-hidden">
      <div
        className="h-full bg-cyber-green rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, opacity: 0.7 }}
      />
    </div>
  );
}

function TrafficChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>(Array.from({ length: 60 }, () => Math.random() * 60 + 20));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const w = canvas.width;
      const h = canvas.height;
      const data = dataRef.current;

      ctx.clearRect(0, 0, w, h);

      const step = w / (data.length - 1);

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(0,255,136,0.2)");
      grad.addColorStop(1, "rgba(0,255,136,0)");

      ctx.beginPath();
      ctx.moveTo(0, h);
      data.forEach((val, i) => {
        ctx.lineTo(i * step, h - (val / 100) * h * 0.85);
      });
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      data.forEach((val, i) => {
        const x = i * step;
        const y = h - (val / 100) * h * 0.85;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "rgba(0,255,136,0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      dataRef.current = [...data.slice(1), Math.max(5, Math.min(95, data[data.length - 1] + (Math.random() - 0.5) * 15))];
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export default function FeaturesSection() {
  return (
    <section id="Возможности" className="relative bg-cyber-blue py-24 px-6 md:px-12 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel index="03" label="Возможности системы" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight max-w-lg">
            Мониторинг и аналитика{" "}
            <span className="text-cyber-green">в реальном времени</span>
          </h2>
        </div>

        <div className="border border-cyber-green border-opacity-15 bg-black bg-opacity-30 p-5 mb-14">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-green border-opacity-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green status-active" />
              <span className="font-mono text-xs text-cyber-green opacity-60">LIVE · TRAFFIC MONITOR</span>
            </div>
            <span className="font-mono text-xs text-cyber-green opacity-30">
              {new Date().toISOString().replace("T", " ").split(".")[0]} UTC
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {METRICS.map((m) => (
              <div key={m.label} className="p-3 border border-cyber-green border-opacity-10">
                <div className="font-mono text-xl text-cyber-green font-bold">{m.value}</div>
                <div className="font-mono text-xs text-cyber-green opacity-40 mt-0.5">{m.label}</div>
                <div className="font-mono text-[10px] text-cyber-green opacity-25 mt-1">{m.change}</div>
              </div>
            ))}
          </div>

          <div className="h-28 mb-4">
            <TrafficChart />
          </div>

          <div className="space-y-2">
            {[
              { label: "HTTP/S", pct: 68 },
              { label: "DNS", pct: 12 },
              { label: "SMTP", pct: 8 },
              { label: "Other", pct: 12 },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="font-mono text-xs text-cyber-green opacity-40 w-14 shrink-0">{item.label}</span>
                <div className="flex-1">
                  <AnimatedBar value={item.pct} delay={i * 200 + 500} />
                </div>
                <span className="font-mono text-xs text-cyber-green opacity-50 w-8 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-5 border border-cyber-green border-opacity-10 hover:border-opacity-30 transition-all duration-300 bg-black bg-opacity-10 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-cyber-green border-opacity-25 flex items-center justify-center group-hover:border-opacity-50 transition-all">
                  <Icon name={f.icon} size={15} className="text-cyber-green opacity-70" />
                </div>
                <div className="flex-1 h-px bg-cyber-green opacity-10" />
              </div>
              <h3 className="font-sans text-sm font-semibold text-white mb-2 leading-snug">{f.title}</h3>
              <p className="font-mono text-xs text-cyber-green opacity-45 leading-relaxed mb-4">{f.desc}</p>
              <div className="font-mono text-[10px] text-cyber-green opacity-25 border-t border-cyber-green border-opacity-10 pt-3">
                {f.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
