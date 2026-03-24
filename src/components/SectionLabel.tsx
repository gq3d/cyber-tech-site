interface Props {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-cyber-green opacity-50">[{index}]</span>
      <span className="font-mono text-xs text-cyber-green tracking-widest uppercase">{label}</span>
      <div className="flex-1 h-px bg-cyber-green opacity-10" />
    </div>
  );
}
