import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function VpnBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      style={{ maxWidth: 340 }}
    >
      <div
        onClick={() => navigate("/personal-security")}
        className="relative cursor-pointer group overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          border: "1px solid rgba(251,191,36,0.45)",
          boxShadow: "0 0 32px rgba(251,191,36,0.18), 0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        {/* Glow bg */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.08) 0%, transparent 70%)" }}
        />

        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors z-10"
        >
          <Icon name="X" size={14} />
        </button>

        <div className="p-5 pr-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center justify-center w-10 h-10 shrink-0"
              style={{ border: "1px solid rgba(251,191,36,0.5)", background: "rgba(251,191,36,0.08)" }}
            >
              <Icon name="ShieldCheck" size={18} className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-widest text-amber-400 font-mono">PVN</span>
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 text-amber-400/80 tracking-widest"
                  style={{ border: "1px solid rgba(251,191,36,0.35)" }}
                >
                  АКТИВЕН
                </span>
              </div>
              <div className="text-[11px] text-white/40 font-mono tracking-wider">АНОНИМНОСТЬ · ЗАЩИТА · СВОБОДА</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {[
              { icon: "EyeOff", text: "Анонимизация трафика и геопозиции" },
              { icon: "Lock", text: "Шифрование AES-256 / WireGuard" },
              { icon: "Shield", text: "Защита от DPI и слежки" },
              { icon: "Globe", text: "Доступ к любым ресурсам мира" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon name={icon} size={13} className="text-amber-400 shrink-0" />
                <span className="text-xs text-white/65 leading-tight">{text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="flex items-center justify-between px-3 py-2.5 transition-all duration-300 group-hover:bg-amber-400/10"
            style={{ border: "1px solid rgba(251,191,36,0.3)" }}
          >
            <span className="font-mono text-xs font-bold text-amber-400 tracking-wider">Смотреть предложения</span>
            <Icon name="ArrowRight" size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom pulse line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent animate-pulse" />
      </div>
    </div>
  );
}