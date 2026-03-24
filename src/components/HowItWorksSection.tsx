import { useState } from "react";
import SectionLabel from "./SectionLabel";
import Icon from "@/components/ui/icon";

const STEPS = [
  {
    id: "01",
    icon: "Search",
    title: "Аудит инфраструктуры",
    duration: "1–3 дня",
    desc: "Сканирование сетевых активов, анализ текущей конфигурации маршрутизации, выявление открытых сервисов и уязвимых точек периметра.",
    substeps: [
      "Инвентаризация сетевых устройств",
      "Анализ таблиц маршрутизации",
      "Сканирование открытых портов",
      "Оценка конфигурации firewall",
    ],
    output: "Отчёт: схема сети + приоритеты устранения",
  },
  {
    id: "02",
    icon: "GitBranch",
    title: "Проектирование архитектуры",
    duration: "3–7 дней",
    desc: "Разработка схемы защищённых каналов, политик сегментации, конфигураций фильтрации трафика под конкретную топологию.",
    substeps: [
      "Проектирование сетевых зон",
      "Схема защищённых каналов",
      "Политики доступа (Zero Trust)",
      "Согласование с командой клиента",
    ],
    output: "Техническая документация + план внедрения",
  },
  {
    id: "03",
    icon: "Terminal",
    title: "Развёртывание и конфигурация",
    duration: "2–5 дней",
    desc: "Установка и настройка компонентов на стороне клиента. Интеграция с существующей инфраструктурой, минимальный downtime.",
    substeps: [
      "Установка агентов мониторинга",
      "Конфигурация защищённых каналов",
      "Настройка политик фильтрации",
      "Тестирование и валидация",
    ],
    output: "Рабочая конфигурация + runbook",
  },
  {
    id: "04",
    icon: "Activity",
    title: "Мониторинг и поддержка",
    duration: "ongoing",
    desc: "Непрерывный мониторинг сетевых событий, реагирование на инциденты, регулярные отчёты о состоянии безопасности.",
    substeps: [
      "24/7 мониторинг трафика",
      "Эскалация инцидентов",
      "Еженедельные отчёты",
      "Плановые ревью конфигурации",
    ],
    output: "SLA 99.9% · Время реакции <15 мин",
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="Как работает" className="relative bg-[#070b14] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="04" label="Как это работает" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight max-w-lg">
            От аудита до{" "}
            <span className="text-cyber-green">постоянного мониторинга</span>
          </h2>
          <p className="font-mono text-xs text-cyber-green opacity-40 max-w-xs leading-relaxed">
            Процесс структурирован и предсказуем. Никаких сюрпризов после подписания договора.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-2 lg:w-72 shrink-0">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`text-left flex items-center gap-4 p-4 border transition-all duration-200 ${
                  active === i
                    ? "border-cyber-green border-opacity-50 bg-black bg-opacity-50"
                    : "border-cyber-green border-opacity-10 hover:border-opacity-25 bg-transparent"
                }`}
              >
                <div
                  className={`shrink-0 w-8 h-8 border flex items-center justify-center transition-all ${
                    active === i ? "border-cyber-green bg-cyber-green text-cyber-blue" : "border-cyber-green border-opacity-25 text-cyber-green opacity-50"
                  }`}
                >
                  <Icon name={s.icon} size={14} />
                </div>
                <div>
                  <div className={`font-mono text-[10px] mb-0.5 ${active === i ? "text-cyber-green opacity-60" : "text-cyber-green opacity-25"}`}>
                    {s.id}
                  </div>
                  <div className={`font-sans text-sm font-medium leading-snug ${active === i ? "text-white" : "text-white opacity-40"}`}>
                    {s.title}
                  </div>
                </div>
                {active === i && (
                  <div className="ml-auto shrink-0">
                    <Icon name="ChevronRight" size={14} className="text-cyber-green" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 border border-cyber-green border-opacity-15 bg-black bg-opacity-20 p-7">
            {STEPS[active] && (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="font-mono text-xs text-cyber-green opacity-40 mb-2">ЭТАП {STEPS[active].id}</div>
                    <h3 className="font-sans text-xl font-semibold text-white">{STEPS[active].title}</h3>
                  </div>
                  <span className="font-mono text-xs border border-cyber-green border-opacity-25 text-cyber-green opacity-60 px-3 py-1 shrink-0">
                    {STEPS[active].duration}
                  </span>
                </div>

                <p className="font-mono text-sm text-cyber-green opacity-55 leading-relaxed mb-8">
                  {STEPS[active].desc}
                </p>

                <div className="mb-8">
                  <div className="font-mono text-xs text-cyber-green opacity-30 mb-4 tracking-widest">// СОСТАВ РАБОТ</div>
                  <div className="space-y-3">
                    {STEPS[active].substeps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-mono text-xs text-cyber-green opacity-30 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <div className="w-px h-4 bg-cyber-green opacity-20 shrink-0" />
                        <span className="font-mono text-sm text-cyber-green opacity-65">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-cyber-green border-opacity-10 pt-5">
                  <div className="font-mono text-xs text-cyber-green opacity-30 mb-2 tracking-widest">// РЕЗУЛЬТАТ</div>
                  <div className="font-mono text-sm text-cyber-green">{STEPS[active].output}</div>
                </div>

                <div className="flex gap-2 mt-6">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-0.5 flex-1 transition-all ${i === active ? "bg-cyber-green" : "bg-cyber-green opacity-15"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
