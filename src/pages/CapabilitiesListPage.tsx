import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { CAPABILITIES } from "@/data/capabilities";

export default function CapabilitiesListPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-cyber-blue px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 font-mono text-xs text-cyber-green/40 hover:text-cyber-green/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={14} />
        Назад
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-widest text-cyber-green/40 border border-cyber-green/20 px-2 py-0.5">
            TECHNOLOGIES
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-sans font-semibold text-white mb-3">
          Технологии и{" "}
          <span className="text-cyber-green">возможности</span>
        </h1>
        <p className="font-mono text-xs text-cyber-green/40 max-w-xl leading-relaxed">
          Технические детали каждого компонента: протоколы, алгоритмы, архитектурные решения.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CAPABILITIES.map((cap) => (
          <button
            key={cap.slug}
            onClick={() => navigate(`/capabilities/${cap.slug}`)}
            className="text-left border border-cyber-green/10 hover:border-cyber-green/35 bg-gradient-to-br from-cyber-green/[0.02] to-transparent p-5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 border border-cyber-green/20 flex items-center justify-center`}>
                <Icon name={cap.icon} size={14} className="text-cyber-green opacity-60" />
              </div>
              <Icon name="ArrowRight" size={13} className="text-cyber-green opacity-0 group-hover:opacity-40 transition-opacity mt-1" />
            </div>
            <div className={`font-mono text-[10px] tracking-widest mb-2 ${cap.tagColor}`}>
              {cap.tag}
            </div>
            <div className="font-sans text-sm font-semibold text-white mb-1.5 leading-snug">
              {cap.title}
            </div>
            <p className="font-mono text-[11px] text-cyber-green/35 leading-relaxed line-clamp-2">
              {cap.short}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
