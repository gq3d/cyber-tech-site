import { useEffect, useState } from "react";

interface Props {
  lines: string[];
  speed?: number;
  className?: string;
}

export default function TerminalText({ lines, speed = 35, className = "" }: Props) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || "") + lines[currentLine][currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, speed]);

  return (
    <div className={`font-mono text-sm ${className}`}>
      {lines.map((_, i) => (
        <div key={i} className="flex items-start gap-2 mb-1">
          <span className="text-cyber-green opacity-60 shrink-0">
            {i < currentLine || (i === currentLine && currentChar > 0) ? ">" : " "}
          </span>
          <span className="text-cyber-green">
            {displayed[i] || ""}
            {i === currentLine && currentLine < lines.length && (
              <span className="cursor-blink inline-block w-2 h-4 bg-cyber-green ml-0.5 align-middle" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
