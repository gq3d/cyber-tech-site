import Icon from "@/components/ui/icon";
import { ScanResult, RISK_CONFIG, SEVERITY_CONFIG } from "./infraAnalyzerTypes";
import { RadarChart, CategoryBars, ScoreArc } from "./InfraAnalyzerCharts";

interface InfraAnalyzerResultsProps {
  result: ScanResult;
  logs: string[];
}

export default function InfraAnalyzerResults({ result, logs }: InfraAnalyzerResultsProps) {
  return (
    <div className="space-y-4 animate-fade-in-up">

      {/* Score + summary */}
      <div className="border border-cyber-green border-opacity-15 bg-black bg-opacity-20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <ScoreArc score={result.score} risk={result.risk} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`font-mono text-lg font-bold ${RISK_CONFIG[result.risk].color}`}>
                {RISK_CONFIG[result.risk].label}
              </span>
              <span className={`font-mono text-[10px] border px-2 py-0.5 ${RISK_CONFIG[result.risk].border} ${RISK_CONFIG[result.risk].color} opacity-70`}>
                {result.risk.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "IP",     value: result.ip },
                { label: "ASN",    value: result.asn },
                { label: "TLS",    value: result.tls },
                { label: "DNSSEC", value: result.dnssec ? "Включён" : "Отключён" },
              ].map((item) => (
                <div key={item.label} className="border border-cyber-green border-opacity-10 px-3 py-2">
                  <div className="font-mono text-[10px] text-cyber-green opacity-30 mb-0.5">{item.label}</div>
                  <div className="font-mono text-xs text-cyber-green opacity-75 truncate">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk categories chart */}
      <div className="border border-cyber-green border-opacity-15 bg-black bg-opacity-20 p-5">
        <div className="flex items-center gap-2 mb-5">
          <Icon name="RadarIcon" fallback="BarChart2" size={13} className="text-cyber-green opacity-50" />
          <span className="font-mono text-xs text-cyber-green opacity-40 tracking-widest">// КАРТА РИСКОВ ПО КАТЕГОРИЯМ</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <RadarChart categories={result.categories} />
          </div>
          <div className="flex-1 w-full">
            <CategoryBars categories={result.categories} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Open ports */}
        <div className="border border-cyber-green border-opacity-10 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Network" size={13} className="text-cyber-green opacity-50" />
            <span className="font-mono text-xs text-cyber-green opacity-40 tracking-widest">// ОТКРЫТЫЕ ПОРТЫ</span>
          </div>
          <div className="space-y-1.5">
            {result.openPorts.map((p, i) => (
              <div key={i} className="font-mono text-xs text-cyber-green opacity-60 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyber-green opacity-50 shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Vulns */}
        <div className="border border-cyber-green border-opacity-10 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="AlertTriangle" size={13} className="text-rose-400 opacity-60" />
            <span className="font-mono text-xs text-cyber-green opacity-40 tracking-widest">// УЯЗВИМОСТИ</span>
          </div>
          <div className="space-y-3">
            {result.vulns.map((v) => (
              <div key={v.id} className="border-l-2 border-cyber-green border-opacity-15 pl-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-[9px] text-cyber-green opacity-30">{v.id}</span>
                  <span className={`font-mono text-[9px] border px-1.5 py-0.5 ${SEVERITY_CONFIG[v.severity]}`}>
                    {v.severity}
                  </span>
                </div>
                <div className="font-sans text-xs font-medium text-white opacity-80 mb-0.5">{v.title}</div>
                <div className="font-mono text-[10px] text-cyber-green opacity-40 leading-snug">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-cyber-green border-opacity-15 bg-black bg-opacity-10 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Lightbulb" size={13} className="text-cyber-green opacity-60" />
          <span className="font-mono text-xs text-cyber-green opacity-40 tracking-widest">// РЕКОМЕНДАЦИИ</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {result.recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-3 border border-cyber-green border-opacity-10 px-4 py-3 hover:border-opacity-25 transition-all">
              <div className="w-7 h-7 border border-cyber-green border-opacity-20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name={r.icon} size={13} className="text-cyber-green opacity-60" />
              </div>
              <span className="font-mono text-xs text-cyber-green opacity-60 leading-relaxed">{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-cyber-green border-opacity-20 bg-cyber-green bg-opacity-[0.03] px-5 py-4">
        <div>
          <div className="font-sans text-sm font-semibold text-white mb-0.5">Нужен полный аудит?</div>
          <div className="font-mono text-xs text-cyber-green opacity-40">Инженер проведёт глубокий анализ и предоставит детальный отчёт</div>
        </div>
        <button
          className="font-mono text-xs bg-cyber-green text-cyber-blue font-bold px-6 py-3 hover:bg-cyber-green-dim transition-colors shrink-0 tracking-wider"
          onClick={() => { window.location.href = "/contact"; }}
        >
          Запросить аудит →
        </button>
      </div>

      {/* Terminal log (collapsed) */}
      <details className="border border-cyber-green border-opacity-10">
        <summary className="font-mono text-xs text-cyber-green opacity-30 px-4 py-3 cursor-pointer hover:opacity-50 transition-opacity select-none">
          // показать лог сканирования ({logs.length} строк)
        </summary>
        <div className="px-4 pb-4 space-y-0.5 max-h-48 overflow-y-auto">
          {logs.map((l, i) => (
            <div key={i} className="font-mono text-[11px] text-cyber-green opacity-40">{l}</div>
          ))}
        </div>
      </details>
    </div>
  );
}