import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CAPABILITIES, CapabilityDiagramNode, CapabilityDiagramEdge } from "@/data/capabilities";
import Icon from "@/components/ui/icon";

function ArchDiagram({ nodes, edges }: { nodes: CapabilityDiagramNode[]; edges: CapabilityDiagramEdge[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const TYPE_COLORS: Record<string, string> = {
      source: "rgba(251,191,36,0.7)",
      process: "rgba(251,191,36,0.5)",
      target: "rgba(251,191,36,0.7)",
      shield: "rgba(251,191,36,0.8)",
    };

    const getXY = (n: CapabilityDiagramNode) => ({
      x: (n.x / 100) * W,
      y: (n.y / 100) * H,
    });

    ctx.clearRect(0, 0, W, H);

    // Draw grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Draw edges
    for (const edge of edges) {
      const from = nodes.find((n) => n.id === edge.from);
      const to = nodes.find((n) => n.id === edge.to);
      if (!from || !to) continue;
      const p1 = getXY(from);
      const p2 = getXY(to);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = edge.encrypted ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.15)";
      ctx.lineWidth = edge.encrypted ? 1.5 : 1;
      if (!edge.encrypted) ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrow
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-8, -4);
      ctx.lineTo(-8, 4);
      ctx.closePath();
      ctx.fillStyle = edge.encrypted ? "rgba(251,191,36,0.6)" : "rgba(255,255,255,0.2)";
      ctx.fill();
      ctx.restore();

      if (edge.label) {
        ctx.fillStyle = "rgba(251,191,36,0.4)";
        ctx.font = `9px IBM Plex Mono, monospace`;
        ctx.fillText(edge.label, mx + 4, my - 5);
      }
    }

    // Draw nodes
    for (const node of nodes) {
      const { x, y } = getXY(node);
      const color = TYPE_COLORS[node.type] || "rgba(251,191,36,0.5)";

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      const bw = 80, bh = 36;
      ctx.strokeRect(x - bw / 2, y - bh / 2, bw, bh);
      ctx.fillStyle = "rgba(15,23,42,0.9)";
      ctx.fillRect(x - bw / 2 + 1, y - bh / 2 + 1, bw - 2, bh - 2);

      const lines = node.label.split("\n");
      ctx.fillStyle = color;
      ctx.font = `bold 9px IBM Plex Mono, monospace`;
      ctx.textAlign = "center";
      if (lines.length === 1) {
        ctx.fillText(lines[0], x, y + 3);
      } else {
        ctx.fillText(lines[0], x, y - 3);
        ctx.font = `8px IBM Plex Mono, monospace`;
        ctx.fillStyle = color.replace("0.7", "0.45");
        ctx.fillText(lines[1], x, y + 9);
      }
    }
  }, [nodes, edges]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: 180 }}
    />
  );
}

export default function CapabilityPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const idx = CAPABILITIES.findIndex((c) => c.slug === slug);
  const cap = CAPABILITIES[idx];
  const prev = idx > 0 ? CAPABILITIES[idx - 1] : null;
  const next = idx < CAPABILITIES.length - 1 ? CAPABILITIES[idx + 1] : null;

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    window.scrollTo(0, 0);
    return () => clearTimeout(t);
  }, [slug]);

  useEffect(() => {
    if (!cap) return;
    const title = `${cap.title} — инфо-безопасность.рф`;
    const description = cap.summary;
    const url = `https://инфо-безопасность.рф/capabilities/${cap.slug}`;

    document.title = title;
    const setMeta = (sel: string, content: string) => {
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", url);

    return () => {
      document.title = "инфо-безопасность.рф — Защита сетевой инфраструктуры";
      setMeta('meta[name="description"]', "Профессиональная защита корпоративных сетей: приватные каналы, микросегментация, Zero Trust архитектура, мониторинг трафика 24/7.");
      setMeta('meta[property="og:title"]', "инфо-безопасность.рф — Защита сетевой инфраструктуры");
      setMeta('meta[property="og:description"]', "Профессиональная защита корпоративных сетей: приватные каналы, микросегментация, Zero Trust архитектура, мониторинг трафика 24/7.");
      setMeta('meta[property="og:url"]', "https://инфо-безопасность.рф/");
      if (canonical) canonical.setAttribute("href", "https://инфо-безопасность.рф/");
    };
  }, [cap]);

  const goBack = () => {
    navigate("/capabilities");
  };

  if (!cap) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-white/40 mb-4">404 · NOT FOUND</div>
          <Link to="/" className="font-mono text-sm text-amber-400 border border-amber-400/30 px-4 py-2">← На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-full bg-black"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">

        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors"
        >
          <Icon name="ArrowLeft" size={15} />
          Назад
        </button>

        {/* Header */}
        <div className="mb-10 border border-white/10 bg-slate-800 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
              <Icon name={cap.icon} size={18} className="text-white/60" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-white/30 border border-white/15 px-2 py-0.5">{cap.tag}</span>
            <span className="font-mono text-[10px] text-white/20">{String(idx + 1).padStart(2, "0")} / {String(CAPABILITIES.length).padStart(2, "0")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-amber-400">
            {cap.title}
          </h1>
          <p className="text-sm sm:text-base max-w-2xl leading-relaxed text-white/60">
            {cap.summary}
          </p>
        </div>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          <div className="border border-white/10 bg-slate-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="AlertTriangle" size={13} className="text-rose-400" />
              <span className="font-mono text-xs text-rose-400/70 tracking-widest">ПРОБЛЕМА</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">{cap.problem}</p>
          </div>
          <div className="border border-white/15 bg-slate-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="CheckCircle" size={13} className="text-amber-400" />
              <span className="font-mono text-xs text-amber-400/70 tracking-widest">РЕШЕНИЕ</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">{cap.solution}</p>
          </div>
        </div>

        {/* Diagram */}
        <div className="border border-white/10 bg-slate-900 mb-6">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>
            <span className="font-mono text-[10px] text-white/25 ml-1">architecture.diagram</span>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-px bg-amber-400/50" />
                <span className="font-mono text-[9px] text-white/25">зашифрованный</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-px bg-white/20" style={{ borderTop: "1px dashed" }} />
                <span className="font-mono text-[9px] text-white/25">открытый</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <ArchDiagram nodes={cap.diagram.nodes} edges={cap.diagram.edges} />
          </div>
        </div>

        {/* Specs */}
        <div className="mb-6">
          <div className="font-mono text-xs text-white/25 tracking-widest mb-3">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {cap.specs.map((s) => (
              <div key={s.label} className="bg-slate-900 p-4 hover:bg-slate-800 transition-colors">
                <div className="font-mono text-[10px] text-white/35 mb-1.5">{s.label}</div>
                <div className="font-mono text-sm text-amber-400 font-semibold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Use cases + tech stack */}
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          <div className="border border-white/10 bg-slate-800 p-6">
            <div className="font-mono text-xs text-white/25 tracking-widest mb-4">СЦЕНАРИИ ПРИМЕНЕНИЯ</div>
            <div className="space-y-3">
              {cap.useCases.map((u, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-amber-400/50 mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-white/55 leading-snug">{u}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-white/10 bg-slate-800 p-6">
            <div className="font-mono text-xs text-white/25 tracking-widest mb-4">ТЕХНОЛОГИЧЕСКИЙ СТЕК</div>
            <div className="flex flex-wrap gap-2">
              {cap.techStack.map((t) => (
                <span key={t} className="font-mono text-xs border border-white/15 text-amber-400 px-2.5 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-white/15 bg-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="text-base font-semibold text-white mb-1">Нужна консультация по этой возможности?</div>
            <div className="text-sm text-white/40">Инженер разберёт применимость к вашей инфраструктуре</div>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 text-sm font-medium text-white border border-white/25 px-4 py-2.5 hover:bg-white/10 transition-all whitespace-nowrap"
          >
            <Icon name="Send" size={14} />
            Связаться →
          </Link>
        </div>

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {prev ? (
            <button
              onClick={() => navigate(`/capabilities/${prev.slug}`)}
              className="group flex items-center gap-3 border border-white/10 hover:border-white/30 bg-slate-800 p-4 text-left transition-all duration-200"
            >
              <Icon name="ArrowLeft" size={14} className="text-white/30 group-hover:text-white/60 shrink-0 transition-colors" />
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-white/25 mb-0.5">Предыдущая</div>
                <div className="text-xs text-white/60 group-hover:text-white transition-colors leading-snug truncate">{prev.title}</div>
              </div>
            </button>
          ) : <div />}

          {next ? (
            <button
              onClick={() => navigate(`/capabilities/${next.slug}`)}
              className="group flex items-center gap-3 border border-white/10 hover:border-white/30 bg-slate-800 p-4 text-right ml-auto w-full justify-end transition-all duration-200"
            >
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-white/25 mb-0.5">Следующая</div>
                <div className="text-xs text-white/60 group-hover:text-white transition-colors leading-snug truncate">{next.title}</div>
              </div>
              <Icon name="ArrowRight" size={14} className="text-white/30 group-hover:text-white/60 shrink-0 transition-colors" />
            </button>
          ) : <div />}
        </div>

        {/* All capabilities */}
        <div className="border-t border-white/10 pt-6">
          <div className="font-mono text-xs text-white/25 mb-4 tracking-widest">ВСЕ ВОЗМОЖНОСТИ</div>
          <div className="flex flex-wrap gap-2">
            {CAPABILITIES.map((c) => (
              <Link
                key={c.slug}
                to={`/capabilities/${c.slug}`}
                className={`font-mono text-xs px-3 py-1.5 border transition-all duration-150 ${
                  c.slug === slug
                    ? "border-amber-400/60 text-amber-400"
                    : "border-white/10 text-white/35 hover:border-white/30 hover:text-white/60"
                }`}
              >
                {c.tag}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
