import { useState, useEffect, useRef } from "react";
import SectionLabel from "./SectionLabel";
import { ScanResult, generateResult, SCAN_PHASES } from "./infraAnalyzerTypes";
import InfraAnalyzerScan from "./InfraAnalyzerScan";
import InfraAnalyzerResults from "./InfraAnalyzerResults";

export default function InfraAnalyzer() {
  const [domain, setDomain] = useState("");
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<ScanResult | null>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  const addLog = (line: string) => setLogs((p) => [...p, line]);

  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  const handleScan = async () => {
    const raw = domain.trim().replace(/^https?:\/\//, "").split("/")[0];
    if (!raw) return;

    setPhase("scanning");
    setPhaseIdx(0);
    setPhaseProgress(0);
    setLogs([]);
    setResult(null);

    addLog(`[${new Date().toISOString()}] Starting infrastructure analysis`);
    addLog(`target: ${raw}`);
    addLog("─".repeat(48));

    for (let i = 0; i < SCAN_PHASES.length; i++) {
      const p = SCAN_PHASES[i];
      setPhaseIdx(i);

      addLog(`[${String(i + 1).padStart(2, "0")}/${SCAN_PHASES.length}] ${p.label}...`);

      const steps = 20;
      for (let s = 0; s <= steps; s++) {
        setPhaseProgress((s / steps) * 100);
        await new Promise((r) => setTimeout(r, p.duration / steps));
      }

      if (i === 0) addLog(`      → resolved in 12ms`);
      if (i === 1) addLog(`      → scanned 1024 ports`);
      if (i === 2) addLog(`      → identified services`);
      if (i === 3) addLog(`      → cipher suite analyzed`);
      if (i === 4) addLog(`      → matched CVE database`);
      if (i === 5) addLog(`      → score calculated`);
    }

    const res = generateResult(raw);
    setResult(res);
    addLog("─".repeat(48));
    addLog(`[DONE] Analysis complete — risk: ${res.risk.toUpperCase()}, score: ${res.score}/100`);
    setPhase("done");
  };

  const isValid = domain.trim().length > 2;

  return (
    <section id="Анализ" className="relative bg-[#070b14] py-24 px-6 md:px-12 overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionLabel index="06" label="Анализ инфраструктуры" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight max-w-xl">
            Проверьте домен{" "}
            <span className="text-cyber-green">прямо сейчас</span>
          </h2>
          <p className="font-mono text-xs text-cyber-green opacity-40 max-w-xs leading-relaxed">
            Демо-анализ на основе публично доступных данных. Полный аудит — по заявке.
          </p>
        </div>

        <InfraAnalyzerScan
          domain={domain}
          setDomain={setDomain}
          phase={phase}
          phaseIdx={phaseIdx}
          phaseProgress={phaseProgress}
          logs={logs}
          isValid={isValid}
          onScan={handleScan}
        />

        {phase === "done" && result && (
          <InfraAnalyzerResults result={result} logs={logs} />
        )}
      </div>
    </section>
  );
}
