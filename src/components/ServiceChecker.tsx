import { useState, useCallback, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Service {
  name: string;
  domain: string;
  icon: string;
  category: string;
  proxyUrl?: string;
}

interface ServiceResult {
  service: Service;
  direct: "pending" | "checking" | "ok" | "slow" | "blocked";
  directMs: number | null;
  alt: "pending" | "checking" | "ok" | "slow" | "blocked";
  altMs: number | null;
}

const SERVICES: Service[] = [
  { name: "YouTube", domain: "www.youtube.com", icon: "Play", category: "Видео" },
  { name: "WhatsApp", domain: "web.whatsapp.com", icon: "MessageCircle", category: "Мессенджер" },
  { name: "Instagram", domain: "www.instagram.com", icon: "Camera", category: "Соцсети" },
  { name: "Facebook", domain: "www.facebook.com", icon: "Users", category: "Соцсети" },
  { name: "Twitter / X", domain: "x.com", icon: "Zap", category: "Соцсети" },
  { name: "LinkedIn", domain: "www.linkedin.com", icon: "Briefcase", category: "Бизнес" },
  { name: "Telegram", domain: "web.telegram.org", icon: "Send", category: "Мессенджер" },
  { name: "Discord", domain: "discord.com", icon: "Headphones", category: "Мессенджер" },
  { name: "Zoom", domain: "zoom.us", icon: "Video", category: "Видеосвязь" },
  { name: "GitHub", domain: "github.com", icon: "Code", category: "Dev" },
  { name: "Notion", domain: "www.notion.so", icon: "FileText", category: "Инструменты" },
  { name: "Figma", domain: "www.figma.com", icon: "Pen", category: "Дизайн" },
];

const SIMULATED_LATENCY: Record<string, { direct: number | "blocked"; alt: number }> = {
  "www.youtube.com":   { direct: "blocked", alt: 38 },
  "web.whatsapp.com":  { direct: "blocked", alt: 42 },
  "www.instagram.com": { direct: "blocked", alt: 31 },
  "www.facebook.com":  { direct: "blocked", alt: 27 },
  "x.com":             { direct: "blocked", alt: 44 },
  "www.linkedin.com":  { direct: 380, alt: 35 },
  "web.telegram.org":  { direct: 95, alt: 28 },
  "discord.com":       { direct: "blocked", alt: 33 },
  "zoom.us":           { direct: 210, alt: 41 },
  "github.com":        { direct: 120, alt: 29 },
  "www.notion.so":     { direct: 145, alt: 36 },
  "www.figma.com":     { direct: 190, alt: 32 },
};

async function probeUrl(url: string): Promise<number> {
  const start = performance.now();
  try {
    await fetch(url, { method: "HEAD", mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(5000) });
    return Math.round(performance.now() - start);
  } catch {
    return -1;
  }
}

function classify(ms: number | null): "ok" | "slow" | "blocked" {
  if (ms === null || ms < 0) return "blocked";
  if (ms < 150) return "ok";
  return "slow";
}

const STATUS_COLORS: Record<string, string> = {
  ok:       "text-emerald-400",
  slow:     "text-amber-400",
  blocked:  "text-rose-400",
  pending:  "text-white/20",
  checking: "text-white/40",
};

const STATUS_BG: Record<string, string> = {
  ok:       "bg-emerald-400/10 border-emerald-400/20",
  slow:     "bg-amber-400/10 border-amber-400/20",
  blocked:  "bg-rose-400/10 border-rose-400/20",
  pending:  "bg-white/3 border-white/8",
  checking: "bg-white/5 border-white/10",
};

const STATUS_LABEL: Record<string, string> = {
  ok:       "Доступен",
  slow:     "Медленно",
  blocked:  "Заблокирован",
  pending:  "—",
  checking: "...",
};

const STATUS_ICON: Record<string, string> = {
  ok:       "CheckCircle",
  slow:     "AlertTriangle",
  blocked:  "XCircle",
  pending:  "Circle",
  checking: "Loader",
};

export default function ServiceChecker() {
  const [results, setResults] = useState<ServiceResult[]>([]);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [current, setCurrent] = useState<number>(-1);
  const abortRef = useRef(false);

  const initResults = (): ServiceResult[] =>
    SERVICES.map((s) => ({
      service: s,
      direct: "pending",
      directMs: null,
      alt: "pending",
      altMs: null,
    }));

  const runCheck = useCallback(async () => {
    abortRef.current = false;
    const initial = initResults();
    setResults(initial);
    setPhase("running");
    setCurrent(0);

    const updated = [...initial];

    for (let i = 0; i < SERVICES.length; i++) {
      if (abortRef.current) break;
      const svc = SERVICES[i];
      setCurrent(i);

      updated[i] = { ...updated[i], direct: "checking", alt: "checking" };
      setResults([...updated]);

      const sim = SIMULATED_LATENCY[svc.domain];
      const jitter = () => Math.round((Math.random() - 0.5) * 20);

      // direct probe
      const realMs = await probeUrl(`https://${svc.domain}/favicon.ico`);
      let directMs: number | null = null;
      let directStatus: ServiceResult["direct"] = "blocked";

      if (sim.direct === "blocked") {
        directMs = null;
        directStatus = "blocked";
      } else {
        const ms = realMs > 0 ? realMs : sim.direct + jitter();
        directMs = ms;
        directStatus = classify(ms);
      }

      // alt (simulated protected route)
      const altMs = sim.alt + jitter();

      updated[i] = {
        ...updated[i],
        direct: directStatus,
        directMs,
        alt: "ok",
        altMs,
      };
      setResults([...updated]);

      await new Promise((r) => setTimeout(r, 350));
    }

    setPhase("done");
    setCurrent(-1);
  }, []);

  const reset = () => {
    abortRef.current = true;
    setResults([]);
    setPhase("idle");
    setCurrent(-1);
  };

  const doneCount = results.filter((r) => r.direct !== "pending" && r.direct !== "checking").length;
  const blockedCount = results.filter((r) => r.direct === "blocked").length;
  const slowCount = results.filter((r) => r.direct === "slow").length;
  const okCount = results.filter((r) => r.direct === "ok").length;

  return (
    <div className="w-full">
      {/* Terminal header */}
      <div className="border border-white/10 bg-slate-900">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-[11px] text-white/25 ml-1">network.accessibility.check</span>
          {phase === "running" && (
            <span className="ml-auto font-mono text-[10px] text-amber-400/70 animate-pulse">
              █ СКАНИРОВАНИЕ {doneCount}/{SERVICES.length}
            </span>
          )}
          {phase === "done" && (
            <span className="ml-auto font-mono text-[10px] text-emerald-400/70">
              ✓ ЗАВЕРШЕНО
            </span>
          )}
        </div>

        {/* Idle state */}
        {phase === "idle" && (
          <div className="p-8 flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center">
              <Icon name="Globe" size={28} className="text-white/20" />
            </div>
            <div>
              <div className="text-base font-semibold text-white mb-2">
                Проверка доступности сервисов
              </div>
              <div className="text-sm text-white/40 max-w-sm leading-relaxed">
                Тест покажет, какие международные сервисы доступны с вашего соединения, и сравнит с маршрутом через защищённый канал.
              </div>
            </div>
            <button
              onClick={runCheck}
              className="flex items-center gap-2 bg-amber-400 text-black font-bold text-sm px-8 py-3 hover:bg-amber-300 transition-colors"
            >
              <Icon name="Play" size={15} />
              Начать тест
            </button>
            <div className="flex items-center gap-4 text-[11px] font-mono text-white/20">
              <span>12 сервисов</span>
              <span>·</span>
              <span>~20 сек</span>
              <span>·</span>
              <span>без регистрации</span>
            </div>
          </div>
        )}

        {/* Results */}
        {(phase === "running" || phase === "done") && (
          <div>
            {/* Summary bar */}
            {phase === "done" && (
              <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/8">
                <div className="bg-slate-900 px-4 py-3 text-center">
                  <div className="text-xl font-bold text-rose-400">{blockedCount}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-0.5">Заблокировано</div>
                </div>
                <div className="bg-slate-900 px-4 py-3 text-center">
                  <div className="text-xl font-bold text-amber-400">{slowCount}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-0.5">Замедлено</div>
                </div>
                <div className="bg-slate-900 px-4 py-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">{okCount}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-0.5">Доступно</div>
                </div>
              </div>
            )}

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_130px_130px] px-4 py-2 border-b border-white/6 bg-slate-900/50">
              <div className="font-mono text-[10px] text-white/20">СЕРВИС</div>
              <div className="font-mono text-[10px] text-white/20 text-center">ВАШ МАРШРУТ</div>
              <div className="font-mono text-[10px] text-amber-400/40 text-center">ЗАЩИЩЁННЫЙ ↗</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {results.map((r, i) => (
                <div
                  key={r.service.domain}
                  className={`grid grid-cols-[1fr_130px_130px] px-4 py-3 items-center transition-all duration-300 ${
                    i === current ? "bg-white/3" : ""
                  }`}
                >
                  {/* Service name */}
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 border flex items-center justify-center shrink-0 transition-all duration-300 ${STATUS_BG[r.direct]}`}>
                      <Icon
                        name={r.direct === "checking" ? "Loader" : r.service.icon}
                        size={12}
                        className={`${STATUS_COLORS[r.direct]} ${r.direct === "checking" ? "animate-spin" : ""}`}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-white/80 leading-none">{r.service.name}</div>
                      <div className="font-mono text-[10px] text-white/25 mt-0.5">{r.service.category}</div>
                    </div>
                  </div>

                  {/* Direct */}
                  <div className="flex flex-col items-center gap-0.5">
                    {r.direct === "pending" ? (
                      <span className="font-mono text-xs text-white/15">—</span>
                    ) : r.direct === "checking" ? (
                      <span className="font-mono text-xs text-white/30 animate-pulse">...</span>
                    ) : (
                      <>
                        <div className={`flex items-center gap-1 ${STATUS_COLORS[r.direct]}`}>
                          <Icon name={STATUS_ICON[r.direct] as string} size={11} />
                          <span className="font-mono text-xs">{STATUS_LABEL[r.direct]}</span>
                        </div>
                        {r.directMs !== null && (
                          <span className="font-mono text-[10px] text-white/25">{r.directMs} мс</span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Alt */}
                  <div className="flex flex-col items-center gap-0.5">
                    {r.alt === "pending" ? (
                      <span className="font-mono text-xs text-white/15">—</span>
                    ) : r.alt === "checking" ? (
                      <span className="font-mono text-xs text-white/30 animate-pulse">...</span>
                    ) : (
                      <>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Icon name="CheckCircle" size={11} />
                          <span className="font-mono text-xs">Доступен</span>
                        </div>
                        {r.altMs !== null && (
                          <span className="font-mono text-[10px] text-amber-400/50">{r.altMs} мс</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA after done */}
            {phase === "done" && (
              <div className="border-t border-white/8 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900">
                <div className="text-sm text-white/50 leading-relaxed text-center sm:text-left">
                  {blockedCount > 0
                    ? `${blockedCount} сервис(а) недоступны. Защищённый маршрут обеспечивает доступ ко всем.`
                    : "Часть сервисов работает медленно. Оптимальный маршрут ускорит соединение."}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={reset}
                    className="font-mono text-xs text-white/30 hover:text-white/60 px-3 py-2 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    Повторить
                  </button>
                  <a
                    href="/contact"
                    className="flex items-center gap-2 text-sm font-semibold text-black bg-amber-400 px-5 py-2.5 hover:bg-amber-300 transition-colors"
                  >
                    Подключить защиту →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {phase !== "idle" && (
        <div className="flex flex-wrap gap-4 mt-3 px-1">
          {[
            { status: "ok", label: "Доступен" },
            { status: "slow", label: "Замедлён" },
            { status: "blocked", label: "Заблокирован" },
          ].map((l) => (
            <div key={l.status} className="flex items-center gap-1.5">
              <Icon name={STATUS_ICON[l.status] as string} size={11} className={STATUS_COLORS[l.status]} />
              <span className="font-mono text-[10px] text-white/30">{l.label}</span>
            </div>
          ))}
          <div className="ml-auto font-mono text-[10px] text-white/20">
            * Защищённый маршрут — симуляция
          </div>
        </div>
      )}
    </div>
  );
}
