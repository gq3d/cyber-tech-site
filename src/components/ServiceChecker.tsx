import { useState, useCallback, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Service {
  name: string;
  domain: string;
  icon: string;
  category: string;
}

type Status = "pending" | "checking" | "ok" | "slow" | "blocked";

interface ServiceResult {
  service: Service;
  status: Status;
  ms: number | null;
}

const SERVICES: Service[] = [
  { name: "YouTube",    domain: "www.youtube.com",    icon: "Play",          category: "Видео" },
  { name: "WhatsApp",   domain: "web.whatsapp.com",   icon: "MessageCircle", category: "Мессенджер" },
  { name: "Instagram",  domain: "www.instagram.com",  icon: "Camera",        category: "Соцсети" },
  { name: "Facebook",   domain: "www.facebook.com",   icon: "Users",         category: "Соцсети" },
  { name: "Twitter / X",domain: "x.com",              icon: "Zap",           category: "Соцсети" },
  { name: "LinkedIn",   domain: "www.linkedin.com",   icon: "Briefcase",     category: "Бизнес" },
  { name: "Telegram",   domain: "web.telegram.org",   icon: "Send",          category: "Мессенджер" },
  { name: "Discord",    domain: "discord.com",        icon: "Headphones",    category: "Мессенджер" },
  { name: "Zoom",       domain: "zoom.us",            icon: "Video",         category: "Видеосвязь" },
  { name: "GitHub",     domain: "github.com",         icon: "Code",          category: "Dev" },
  { name: "Notion",     domain: "www.notion.so",      icon: "FileText",      category: "Инструменты" },
  { name: "Figma",      domain: "www.figma.com",      icon: "Pen",           category: "Дизайн" },
];

// Пробуем несколько путей, берём первый успешный
const PROBE_PATHS = ["/favicon.ico", "/", ""];

async function probeService(domain: string): Promise<number> {
  for (const path of PROBE_PATHS) {
    const url = `https://${domain}${path}`;
    const start = performance.now();
    try {
      await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      });
      const ms = Math.round(performance.now() - start);
      // no-cors всегда возвращает opaque response (не ошибку) если соединение прошло
      // если ms очень маленькое (<5) — скорее всего кеш или instant reject, пробуем дальше
      if (ms >= 5) return ms;
    } catch {
      // таймаут или сетевая ошибка — сервис недоступен
      return -1;
    }
  }
  return -1;
}

function classify(ms: number): Status {
  if (ms < 0) return "blocked";
  if (ms < 600) return "ok";
  return "slow";
}

const STATUS_COLORS: Record<Status | string, string> = {
  ok:       "text-emerald-400",
  slow:     "text-amber-400",
  blocked:  "text-rose-400",
  pending:  "text-white/20",
  checking: "text-white/40",
};

const STATUS_BG: Record<Status | string, string> = {
  ok:       "bg-emerald-400/10 border-emerald-400/20",
  slow:     "bg-amber-400/10 border-amber-400/20",
  blocked:  "bg-rose-500/10 border-rose-500/20",
  pending:  "bg-white/[0.03] border-white/8",
  checking: "bg-white/5 border-white/10",
};

const STATUS_LABEL: Record<Status | string, string> = {
  ok:       "Доступен",
  slow:     "Медленно",
  blocked:  "Недоступен",
  pending:  "—",
  checking: "проверка...",
};

const STATUS_ICON: Record<Status | string, string> = {
  ok:       "CheckCircle",
  slow:     "AlertTriangle",
  blocked:  "XCircle",
  pending:  "Circle",
  checking: "Loader",
};

function buildShareText(results: ServiceResult[]): string {
  const blocked = results.filter((r) => r.status === "blocked").map((r) => r.service.name);
  const ok = results.filter((r) => r.status === "ok").map((r) => r.service.name);
  const slow = results.filter((r) => r.status === "slow").map((r) => r.service.name);

  const lines: string[] = [
    "🔍 Проверка доступности сервисов — инфо-безопасность.рф",
    "",
  ];
  if (blocked.length) lines.push(`🔴 Недоступно (${blocked.length}): ${blocked.join(", ")}`);
  if (slow.length)    lines.push(`🟡 Медленно (${slow.length}): ${slow.join(", ")}`);
  if (ok.length)      lines.push(`🟢 Доступно (${ok.length}): ${ok.join(", ")}`);
  lines.push("", "Проверь свою сеть: https://инфо-безопасность.рф/check");
  return lines.join("\n");
}

export default function ServiceChecker() {
  const [results, setResults] = useState<ServiceResult[]>([]);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [current, setCurrent] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(false);

  const share = async () => {
    const text = buildShareText(results);
    if (navigator.share) {
      try { await navigator.share({ title: "Проверка доступности сервисов", text }); return; } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const runCheck = useCallback(async () => {
    abortRef.current = false;
    const initial: ServiceResult[] = SERVICES.map((s) => ({
      service: s,
      status: "pending",
      ms: null,
    }));
    setResults(initial);
    setPhase("running");

    const updated = [...initial];

    for (let i = 0; i < SERVICES.length; i++) {
      if (abortRef.current) break;
      setCurrent(i);
      updated[i] = { ...updated[i], status: "checking" };
      setResults([...updated]);

      const ms = await probeService(SERVICES[i].domain);
      const status = classify(ms);

      updated[i] = { ...updated[i], status, ms: ms >= 0 ? ms : null };
      setResults([...updated]);
    }

    setCurrent(-1);
    setPhase("done");
  }, []);

  const reset = () => {
    abortRef.current = true;
    setResults([]);
    setPhase("idle");
    setCurrent(-1);
  };

  const doneCount = results.filter((r) => r.status !== "pending" && r.status !== "checking").length;
  const blockedCount = results.filter((r) => r.status === "blocked").length;
  const slowCount = results.filter((r) => r.status === "slow").length;
  const okCount = results.filter((r) => r.status === "ok").length;

  return (
    <div className="w-full">
      <div className="border border-white/10 bg-slate-900">

        {/* Terminal title bar */}
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
            <span className="ml-auto font-mono text-[10px] text-emerald-400/70">✓ ЗАВЕРШЕНО</span>
          )}
        </div>

        {/* Idle */}
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
                Реальная проверка из вашего браузера — без симуляций. Запустите с VPN и без, чтобы увидеть разницу.
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
              <span>реальные запросы</span>
              <span>·</span>
              <span>~30 сек</span>
            </div>
          </div>
        )}

        {/* Results list */}
        {(phase === "running" || phase === "done") && (
          <div>
            {/* Summary */}
            {phase === "done" && (
              <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/8">
                <div className="bg-slate-900 px-4 py-3 text-center">
                  <div className="text-xl font-bold text-rose-400">{blockedCount}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-0.5">Недоступно</div>
                </div>
                <div className="bg-slate-900 px-4 py-3 text-center">
                  <div className="text-xl font-bold text-amber-400">{slowCount}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-0.5">Медленно</div>
                </div>
                <div className="bg-slate-900 px-4 py-3 text-center">
                  <div className="text-xl font-bold text-emerald-400">{okCount}</div>
                  <div className="font-mono text-[10px] text-white/30 mt-0.5">Доступно</div>
                </div>
              </div>
            )}

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {results.map((r, i) => (
                <div
                  key={r.service.domain}
                  className={`flex items-center gap-4 px-4 py-3 transition-colors duration-300 ${
                    i === current ? "bg-white/[0.03]" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-all duration-300 ${STATUS_BG[r.status]}`}>
                    <Icon
                      name={r.status === "checking" ? "Loader" : r.service.icon}
                      size={13}
                      className={`${STATUS_COLORS[r.status]} ${r.status === "checking" ? "animate-spin" : ""}`}
                    />
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/80 leading-none">{r.service.name}</div>
                    <div className="font-mono text-[10px] text-white/25 mt-0.5">{r.service.domain}</div>
                  </div>

                  {/* Category */}
                  <div className="hidden sm:block font-mono text-[10px] text-white/20 w-24 text-right">
                    {r.service.category}
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-0.5 w-28 shrink-0">
                    {r.status === "pending" ? (
                      <span className="font-mono text-xs text-white/15">—</span>
                    ) : r.status === "checking" ? (
                      <span className="font-mono text-xs text-white/30 animate-pulse">проверка...</span>
                    ) : (
                      <>
                        <div className={`flex items-center gap-1.5 ${STATUS_COLORS[r.status]}`}>
                          <Icon name={STATUS_ICON[r.status]} size={12} />
                          <span className="font-mono text-xs">{STATUS_LABEL[r.status]}</span>
                        </div>
                        {r.ms !== null && (
                          <span className="font-mono text-[10px] text-white/25">{r.ms} мс</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer after done */}
            {phase === "done" && (
              <div className="border-t border-white/8 p-5 bg-slate-900">
                {blockedCount > 0 ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-sm text-white/50 leading-relaxed">
                      <span className="text-rose-400 font-semibold">{blockedCount} сервис(а) недоступны</span> с вашего соединения.
                      Подключите защищённый канал и запустите тест повторно — результат изменится.
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <button
                        onClick={share}
                        className="flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white/70 px-3 py-2 border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <Icon name={copied ? "Check" : "Share2"} size={12} />
                        {copied ? "Скопировано!" : "Поделиться"}
                      </button>
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
                        Подключить VPN →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-sm text-white/50 leading-relaxed">
                      Все сервисы доступны.
                      {slowCount > 0 && ` ${slowCount} работают медленно — защищённый канал оптимизирует маршрут.`}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={share}
                        className="flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-white/70 px-3 py-2 border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <Icon name={copied ? "Check" : "Share2"} size={12} />
                        {copied ? "Скопировано!" : "Поделиться"}
                      </button>
                      <button
                        onClick={reset}
                        className="font-mono text-xs text-white/30 hover:text-white/60 px-3 py-2 border border-white/10 hover:border-white/20 transition-colors"
                      >
                        Повторить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Note */}
      {phase !== "idle" && (
        <div className="flex items-center gap-2 mt-3 px-1">
          <Icon name="Info" size={11} className="text-white/20 shrink-0" />
          <span className="font-mono text-[10px] text-white/20">
            Запросы выполняются напрямую из вашего браузера. Результат зависит от вашей сети и провайдера.
          </span>
        </div>
      )}
    </div>
  );
}