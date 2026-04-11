import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { CAPABILITIES } from "@/data/capabilities";
import { useMeta } from "@/hooks/useMeta";

export default function CapabilitiesListPage() {
  const navigate = useNavigate();
  useMeta({
    title: "Технологии и возможности",
    description: "WireGuard, AES-256, eBPF, Zero Trust, микросегментация сети, обнаружение аномалий. Технические решения для защиты корпоративной и личной инфраструктуры.",
    path: "/capabilities",
    keywords: "WireGuard, AES-256, Zero Trust, eBPF, сегментация сети, шифрование, VPN технологии",
  });

  return (
    <div className="min-h-full bg-black px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors"
      >
        <Icon name="ArrowLeft" size={15} />
        Назад
      </button>

      <div className="mb-10">
        <span className="font-mono text-xs tracking-widest text-white/30 border border-white/15 px-2 py-1 inline-block mb-4">
          TECHNOLOGIES
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-amber-400">
          Технологии и возможности
        </h1>
        <p className="text-sm sm:text-base max-w-xl leading-relaxed text-amber-400">
          Технические детали каждого компонента: протоколы, алгоритмы, архитектурные решения.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CAPABILITIES.map((cap) => (
          <button
            key={cap.slug}
            onClick={() => navigate(`/capabilities/${cap.slug}`)}
            className="text-left border border-white/10 hover:border-white/35 bg-slate-800 p-5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 border border-white/15 flex items-center justify-center">
                <Icon name={cap.icon} size={16} className="text-white/55" />
              </div>
              <Icon name="ArrowRight" size={14} className="text-white/0 group-hover:text-white/40 transition-all mt-1" />
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/30 mb-2 rounded-0">{cap.tag}</div>
            <div className="text-base font-semibold text-amber-400 mb-2 leading-snug">{cap.title}</div>
            <p className="text-sm leading-relaxed line-clamp-2 text-[#ffffff]">{cap.short}</p>
          </button>
        ))}
      </div>
    </div>
  );
}