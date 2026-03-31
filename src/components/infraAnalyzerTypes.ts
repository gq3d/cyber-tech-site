export type RiskLevel = "low" | "medium" | "high";

export interface RiskCategory {
  label: string;
  score: number;
  color: string;
}

export interface ScanResult {
  risk: RiskLevel;
  score: number;
  ip: string;
  openPorts: string[];
  vulns: { id: string; title: string; severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"; desc: string }[];
  recommendations: { icon: string; text: string }[];
  asn: string;
  tls: string;
  dnssec: boolean;
  categories: RiskCategory[];
}

const RISK_PRESETS: Record<string, RiskLevel> = {
  "google.com": "low",
  "example.com": "medium",
};

export function generateResult(domain: string): ScanResult {
  const seed = domain.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = (min: number, max: number) => min + (seed % (max - min + 1));

  const riskKey = RISK_PRESETS[domain.toLowerCase()];
  const risk: RiskLevel = riskKey ?? (seed % 3 === 0 ? "low" : seed % 3 === 1 ? "medium" : "high");

  const scoreMap = { low: rng(72, 91), medium: rng(42, 68), high: rng(14, 39) };
  const score = scoreMap[risk];

  const ipOctet = seed % 200 + 10;
  const ip = `${(seed % 180) + 40}.${ipOctet}.${(seed * 3) % 255}.${(seed * 7) % 255}`;

  const portSets: Record<RiskLevel, string[]> = {
    low:    ["443/tcp  open  https", "80/tcp   open  http (→ 443)", "25/tcp   filtered smtp"],
    medium: ["443/tcp  open  https", "80/tcp   open  http", "8080/tcp open  http-alt", "22/tcp   open  ssh"],
    high:   ["443/tcp  open  https", "80/tcp   open  http", "22/tcp   open  ssh", "3389/tcp open  rdp", "21/tcp   open  ftp", "8443/tcp open  https-alt"],
  };

  const vulnSets: Record<RiskLevel, ScanResult["vulns"]> = {
    low: [
      { id: "CVE-2023-4450", title: "TLS 1.1 поддерживается", severity: "LOW", desc: "Сервер допускает устаревший TLS 1.1. Рекомендуется отключить." },
      { id: "INF-HDR-001",   title: "Отсутствует HSTS preload", severity: "LOW", desc: "Заголовок Strict-Transport-Security не включён в preload-список." },
    ],
    medium: [
      { id: "CVE-2024-1182", title: "Открытый SSH без ограничений", severity: "HIGH",   desc: "SSH (22/tcp) доступен без IP-ограничений. Обнаружен баннер OpenSSH 8.2." },
      { id: "CVE-2023-6895", title: "HTTP без редиректа на HTTPS",  severity: "MEDIUM", desc: "Порт 80 отдаёт контент без редиректа. Возможна атака downgrade." },
      { id: "INF-DNS-002",   title: "DNSSEC не настроен",           severity: "MEDIUM", desc: "Зона DNS не подписана. Возможна атака DNS spoofing." },
    ],
    high: [
      { id: "CVE-2024-3094", title: "RDP открыт в публичный интернет", severity: "CRITICAL", desc: "Порт 3389 (RDP) доступен без ограничений. Высокий риск bruteforce и эксплуатации." },
      { id: "CVE-2023-7101", title: "FTP с возможной анонимной авторизацией", severity: "HIGH", desc: "Порт 21 (FTP) открыт. Протокол передаёт данные в открытом виде." },
      { id: "CVE-2024-0519", title: "Смешанный контент HTTP/HTTPS", severity: "HIGH", desc: "Обнаружены ресурсы, загружаемые по HTTP на HTTPS-странице. Риск перехвата." },
    ],
  };

  const recSets: Record<RiskLevel, ScanResult["recommendations"]> = {
    low: [
      { icon: "ShieldCheck", text: "Отключить поддержку TLS 1.0 / 1.1 на уровне сервера" },
      { icon: "Lock",        text: "Добавить HSTS с директивой preload и includeSubDomains" },
      { icon: "Globe",       text: "Включить DNSSEC для защиты DNS-зоны" },
    ],
    medium: [
      { icon: "EyeOff",     text: "Закрыть SSH (22/tcp) по IP-allowlist или перевести на нестандартный порт + ключи" },
      { icon: "ArrowRight", text: "Настроить принудительный редирект HTTP → HTTPS (301)" },
      { icon: "Shield",     text: "Активировать DNSSEC и CAA-записи для контроля выпуска сертификатов" },
    ],
    high: [
      { icon: "AlertTriangle", text: "Немедленно закрыть RDP (3389) от публичного доступа — только через защищённый туннель" },
      { icon: "X",             text: "Отключить FTP, заменить на SFTP с аутентификацией по ключу" },
      { icon: "Layers",        text: "Сегментировать инфраструктуру — вынести публичные сервисы в DMZ" },
      { icon: "Lock",          text: "Провести полный аудит открытых портов и политик firewall" },
    ],
  };

  const asnList = ["AS13335 Cloudflare", "AS15169 Google LLC", "AS16509 Amazon AWS", "AS14618 Amazon AWS", "AS8075 Microsoft"];
  const tlsList = ["TLS 1.3 (A+)", "TLS 1.2 / 1.3 (A)", "TLS 1.1 / 1.2 / 1.3 (B)"];

  const categoryPresets: Record<RiskLevel, RiskCategory[]> = {
    low: [
      { label: "Периметр",      score: 88, color: "#00ff88" },
      { label: "Шифрование",    score: 91, color: "#00ff88" },
      { label: "DNS / PKI",     score: 74, color: "#34d399" },
      { label: "Доступ",        score: 82, color: "#00ff88" },
      { label: "Конфигурация",  score: 79, color: "#34d399" },
      { label: "Мониторинг",    score: 85, color: "#00ff88" },
    ],
    medium: [
      { label: "Периметр",      score: 54, color: "#fbbf24" },
      { label: "Шифрование",    score: 68, color: "#fcd34d" },
      { label: "DNS / PKI",     score: 41, color: "#f59e0b" },
      { label: "Доступ",        score: 38, color: "#ef4444" },
      { label: "Конфигурация",  score: 55, color: "#fbbf24" },
      { label: "Мониторинг",    score: 62, color: "#fcd34d" },
    ],
    high: [
      { label: "Периметр",      score: 18, color: "#f87171" },
      { label: "Шифрование",    score: 34, color: "#fca5a5" },
      { label: "DNS / PKI",     score: 22, color: "#f87171" },
      { label: "Доступ",        score: 9,  color: "#ef4444" },
      { label: "Конфигурация",  score: 27, color: "#f87171" },
      { label: "Мониторинг",    score: 15, color: "#ef4444" },
    ],
  };

  return {
    risk,
    score,
    ip,
    openPorts: portSets[risk],
    vulns: vulnSets[risk],
    recommendations: recSets[risk],
    asn: asnList[seed % asnList.length],
    tls: tlsList[seed % tlsList.length],
    dnssec: risk === "low",
    categories: categoryPresets[risk],
  };
}

export const RISK_CONFIG = {
  low:    { label: "Низкий риск",  color: "text-cyber-green", border: "border-cyber-green", bg: "bg-cyber-green", bar: "bg-cyber-green" },
  medium: { label: "Средний риск", color: "text-amber-400",   border: "border-amber-400",   bg: "bg-amber-400",   bar: "bg-amber-400"   },
  high:   { label: "Высокий риск", color: "text-rose-400",    border: "border-rose-400",    bg: "bg-rose-400",    bar: "bg-rose-400"    },
};

export const SEVERITY_CONFIG = {
  CRITICAL: "text-rose-400 border-rose-400",
  HIGH:     "text-orange-400 border-orange-400",
  MEDIUM:   "text-amber-400 border-amber-400",
  LOW:      "text-sky-400 border-sky-400",
};

export const SCAN_PHASES = [
  { label: "DNS resolution",            duration: 500 },
  { label: "Port discovery (SYN scan)", duration: 900 },
  { label: "Service fingerprinting",    duration: 700 },
  { label: "TLS/SSL analysis",          duration: 600 },
  { label: "Vulnerability matching",    duration: 800 },
  { label: "Risk scoring",              duration: 400 },
];
