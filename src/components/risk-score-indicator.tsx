"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface RiskScoreIndicatorProps {
  score: number;
}

export function RiskScoreIndicator({ score }: RiskScoreIndicatorProps) {
  const getScoreColor = (value: number) => {
    if (value > 75) return "bg-red-500";
    if (value > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-4xl font-bold text-primary w-20 text-center">{score}</div>
      <div className="flex-1">
        <Progress value={score} className="h-3" indicatorClassName={getScoreColor(score)} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low Risk</span>
          <span>Medium Risk</span>
          <span>High Risk</span>
        </div>
      </div>
    </div>
  );
}

// Override Progress component to allow custom indicator color
const OldProgress = Progress;

Progress.defaultProps = {
  ...OldProgress.defaultProps,
  indicatorClassName: "",
};

// @ts-ignore
Progress.render = function Progress({ className, value, indicatorClassName, ...props }, ref) {
  return (
    <OldProgress.render
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <OldProgress.Indicator
        className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </OldProgress.render>
  );
};
