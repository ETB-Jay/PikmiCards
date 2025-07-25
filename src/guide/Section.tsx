// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { Subtitle, Text } from "../components";
import { cn } from "../context/functions";

// ─ Types ────────────────────────────────────────────────────────────────────────────────────────
interface StepData {
  title: string;
  description: string;
  icon?: ReactElement;
}

interface SectionProps {
  title: string;
  steps?: StepData[];
  variant?: "primary" | "secondary" | "accent";
}


const Section = memo(({ title, steps, variant = "primary" }: SectionProps): ReactElement => {
  const variantStyles = {
    primary: {
      container:
        "bg-gradient-to-br from-purple-800/60 to-purple-900/60" +
        "ring-purple-700/60 shadow-purple-900/50 text-purple-100",
      border: "border-purple-600/80",
      numberBg: "bg-purple-600",
      textColor: "text-purple-200",
    },
    secondary: {
      container:
        "bg-gradient-to-br from-blue-800/60 to-blue-900/60" +
        "ring-blue-700/80 shadow-blue-900/50 text-blue-100",
      border: "border-blue-600/80",
      numberBg: "bg-blue-600",
      textColor: "text-blue-200",
    },
    accent: {
      container:
        "bg-gradient-to-br from-green-800/60 to-green-900/60" +
        "ring-green-700/80 shadow-green-900/50 text-green-100",
      border: "border-green-600/80",
      numberBg: "bg-green-600",
      textColor: "text-green-200",
    },
  };

  const renderStepCard = (step: StepData, index: number) => (
    <div
      key={index}
      className={cn(
        "relative flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-gray-800/60",
        "to-gray-900/60 p-3 shadow-md transition-all duration-300 hover:scale-101 hover:shadow-lg",
        variantStyles[variant].border,
        variantStyles[variant].textColor
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white",
            variantStyles[variant].numberBg
          )}
        >
          {index + 1}
        </div>
        <h2 className={cn("font-semibold italic", variantStyles[variant].textColor)}>
          {step.title}
        </h2>
      </div>
      <Text text={step.description} />
      <div className="absolute top-2 right-2 opacity-40">{step.icon}</div>
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-1 flex-col rounded-2xl p-3 shadow-lg ring-2 backdrop-blur-sm",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        "gap-3 border border-gray-600/40",
        variantStyles[variant].container
      )}
    >
      <Subtitle text={title} />
      <div className="flex flex-col gap-4">
        {steps && <div className="flex flex-col gap-4">{steps.map(renderStepCard)}</div>}
      </div>
    </div>
  );
});
Section.displayName = "Section";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Section;