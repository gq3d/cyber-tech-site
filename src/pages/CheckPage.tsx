import ServiceChecker from "@/components/ServiceChecker";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function CheckPage() {
  return (
    <div className="min-h-full bg-black">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">

        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 mb-8 transition-colors">
          <Icon name="ArrowLeft" size={14} />
          На главную
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="font-mono text-[10px] tracking-widest text-white/25 border border-white/10 px-2 py-0.5">ИНСТРУМЕНТ</div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-3 leading-tight">
            Проверка доступности сервисов
          </h1>
          <p className="text-sm text-white/50 leading-relaxed max-w-xl">
            Узнайте, какие международные платформы заблокированы или замедлены на вашем соединении — и как они работают через защищённый канал.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-px bg-white/5 mb-8">
          {[
            { icon: "Scan", label: "Сканирование", desc: "Проверяем 12 популярных сервисов" },
            { icon: "GitCompare", label: "Сравнение", desc: "Ваш маршрут vs защищённый канал" },
            { icon: "BarChart2", label: "Результат", desc: "Статус и задержка для каждого" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-900 px-4 py-4 text-center">
              <Icon name={item.icon} size={16} className="text-amber-400/60 mx-auto mb-2" />
              <div className="text-xs font-semibold text-white/70 mb-1">{item.label}</div>
              <div className="font-mono text-[10px] text-white/30 leading-snug">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Main checker */}
        <ServiceChecker />

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-3 border border-white/6 bg-slate-900/50 p-4">
          <Icon name="Info" size={14} className="text-white/20 mt-0.5 shrink-0" />
          <p className="font-mono text-[11px] text-white/25 leading-relaxed">
            Прямая проверка выполняется через ваш браузер с реальными запросами к серверам сервисов.
            Данные защищённого маршрута — моделирование на основе характеристик нашей инфраструктуры.
          </p>
        </div>

      </div>
    </div>
  );
}
