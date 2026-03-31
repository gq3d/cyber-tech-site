import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { SCAN_PHASES } from "./infraAnalyzerTypes";

interface InfraAnalyzerScanProps {
  domain: string;
  setDomain: (v: string) => void;
  phase: "idle" | "scanning" | "done";
  phaseIdx: number;
  phaseProgress: number;
  logs: string[];
  isValid: boolean;
  onScan: () => void;
}

export default function InfraAnalyzerScan({
  domain,
  setDomain,
  phase,
  phaseIdx,
  phaseProgress,
  logs,
  isValid,
  onScan,
}: InfraAnalyzerScanProps) {
  const logsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Input */}
      <div className="border border-cyber-green border-opacity-20 bg-black bg-opacity-30 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyber-green border-opacity-10">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 opacity-60" />
            <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-60" />
            <div className="w-2 h-2 rounded-full bg-cyber-green opacity-60" />
          </div>
          <span className="font-mono text-[10px] text-cyber-green opacity-30 ml-1">netguard.scanner — bash</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green status-active" />
            <span className="font-mono text-[10px] text-cyber-green opacity-40">ONLINE</span>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <span className="font-mono text-sm text-cyber-green opacity-40 shrink-0">$</span>
          <span className="font-mono text-sm text-cyber-green opacity-40 shrink-0 hidden sm:block">scan --target</span>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && isValid && phase !== "scanning" && onScan()}
            placeholder="example.com"
            disabled={phase === "scanning"}
            className="flex-1 bg-transparent font-mono text-sm text-cyber-green placeholder-cyber-green placeholder-opacity-20 outline-none border-b border-cyber-green border-opacity-20 pb-1 focus:border-opacity-60 transition-all disabled:opacity-50"
          />
          <button
            onClick={onScan}
            disabled={!isValid || phase === "scanning"}
            className="flex items-center gap-2 bg-cyber-green text-cyber-blue font-mono text-xs font-bold px-5 py-2.5 hover:bg-cyber-green-dim transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 tracking-wider"
          >
            {phase === "scanning" ? (
              <><Icon name="Loader" size={13} className="animate-spin" />СКАНИРУЮ...</>
            ) : (
              <><Icon name="Scan" size={13} />ЗАПУСТИТЬ</>
            )}
          </button>
        </div>
      </div>

      {/* Scanning progress */}
      {phase === "scanning" && (
        <div className="border border-cyber-green border-opacity-15 bg-black bg-opacity-20 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-green status-active" />
              <span className="font-mono text-xs text-cyber-green opacity-60 tracking-widest">SCANNING</span>
            </div>
            <span className="font-mono text-xs text-cyber-green opacity-40">
              {phaseIdx + 1} / {SCAN_PHASES.length} — {SCAN_PHASES[phaseIdx]?.label}
            </span>
          </div>

          <div className="h-0.5 bg-cyber-green bg-opacity-10 mb-4">
            <div
              className="h-full bg-cyber-green transition-all duration-200"
              style={{ width: `${((phaseIdx / SCAN_PHASES.length) * 100) + (phaseProgress / SCAN_PHASES.length)}%` }}
            />
          </div>

          <div className="flex gap-1 mb-5">
            {SCAN_PHASES.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`h-0.5 w-full transition-all duration-300 ${
                  i < phaseIdx ? "bg-cyber-green" : i === phaseIdx ? "bg-cyber-green opacity-60" : "bg-cyber-green opacity-10"
                }`} />
                <span className="font-mono text-[8px] text-cyber-green opacity-25 text-center leading-tight hidden md:block">
                  {p.label.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          <div ref={logsRef} className="h-32 overflow-y-auto space-y-0.5">
            {logs.map((l, i) => (
              <div key={i} className="font-mono text-[11px] text-cyber-green opacity-55 leading-relaxed">
                {l}
              </div>
            ))}
            <span className="cursor-blink inline-block w-1.5 h-3 bg-cyber-green opacity-70 ml-0.5" />
          </div>
        </div>
      )}

      {/* Idle hint */}
      {phase === "idle" && (
        <div className="border border-cyber-green border-opacity-10 bg-black bg-opacity-10 px-6 py-8 text-center">
          <Icon name="Scan" size={28} className="text-cyber-green opacity-15 mx-auto mb-3" />
          <div className="font-mono text-xs text-cyber-green opacity-25">
            Введите домен и нажмите «Запустить» — анализ займёт несколько секунд
          </div>
        </div>
      )}
    </>
  );
}
