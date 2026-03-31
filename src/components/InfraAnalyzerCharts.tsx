import { useState, useEffect, useRef } from "react";
import { RiskCategory, RiskLevel, RISK_CONFIG } from "./infraAnalyzerTypes";

export function RadarChart({ categories }: { categories: RiskCategory[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, [categories]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 220;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const maxR = 80;
    const n = categories.length;

    const angleOf = (i: number) => (i / n) * Math.PI * 2 - Math.PI / 2;
    const ptAt = (i: number, r: number) => ({
      x: cx + r * Math.cos(angleOf(i)),
      y: cy + r * Math.sin(angleOf(i)),
    });

    ctx.clearRect(0, 0, SIZE, SIZE);

    const drawRing = (frac: number) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const p = ptAt(i, maxR * frac);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(0,255,136,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawAxes = () => {
      for (let i = 0; i < n; i++) {
        const p = ptAt(i, maxR);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = "rgba(0,255,136,0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    [0.25, 0.5, 0.75, 1].forEach(drawRing);
    drawAxes();

    const totalFrames = 40;
    let frame = 0;
    let animId: number;

    const drawFrame = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      [0.25, 0.5, 0.75, 1].forEach(drawRing);
      drawAxes();

      const ease = frame / totalFrames;

      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const r = (categories[i].score / 100) * maxR * ease;
        const p = ptAt(i, r);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(0,255,136,0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,255,136,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < n; i++) {
        const r = (categories[i].score / 100) * maxR * ease;
        const p = ptAt(i, r);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = categories[i].color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = categories[i].color + "30";
        ctx.fill();
      }

      ctx.font = "bold 9px IBM Plex Mono, monospace";
      ctx.textAlign = "center";
      for (let i = 0; i < n; i++) {
        const p = ptAt(i, maxR + 18);
        ctx.fillStyle = "rgba(0,255,136,0.45)";
        ctx.fillText(categories[i].label, p.x, p.y + 3);
      }

      if (frame < totalFrames) {
        frame++;
        animId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();
    return () => cancelAnimationFrame(animId);
  }, [mounted, categories]);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={220}
      className="mx-auto"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function CategoryBars({ categories }: { categories: RiskCategory[] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, [categories]);

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <div key={cat.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] text-cyber-green opacity-50">{cat.label}</span>
            <span className="font-mono text-[10px]" style={{ color: cat.color }}>{cat.score}/100</span>
          </div>
          <div className="h-1 bg-cyber-green bg-opacity-10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: animated ? `${cat.score}%` : "0%", backgroundColor: cat.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScoreArc({ score, risk }: { score: number; risk: RiskLevel }) {
  const cfg = RISK_CONFIG[risk];
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,255,136,0.07)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={risk === "low" ? "#00ff88" : risk === "medium" ? "#fbbf24" : "#f87171"}
          strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s ease" }}
        />
      </svg>
      <div className="text-center z-10">
        <div className={`font-mono text-2xl font-bold ${cfg.color}`}>{score}</div>
        <div className="font-mono text-[9px] text-cyber-green opacity-40 leading-tight">RISK<br/>SCORE</div>
      </div>
    </div>
  );
}
