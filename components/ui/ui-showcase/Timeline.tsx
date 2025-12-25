import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  status?: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  phases: TimelinePhase[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Timeline = ({ phases, orientation = "horizontal", className }: TimelineProps) => {
  const [activePhase, setActivePhase] = useState<string | null>(phases[0]?.id || null);

  const handlePhaseClick = (phase: TimelinePhase) => {
    setActivePhase(phase.id);
    if (phase.href) {
      window.location.href = phase.href;
    }
  };

  const getNodeStyles = (status?: string, isActive?: boolean) => {
    if (isActive) {
      return "bg-foreground text-background border-foreground";
    }
    switch (status) {
      case "completed":
        return "bg-primary/20 text-primary border-primary/40";
      case "current":
        return "bg-background text-foreground border-foreground";
      case "upcoming":
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col", className)}>
        {phases.map((phase, index) => {
          const isActive = activePhase === phase.id;
          const isLast = index === phases.length - 1;

          return (
            <div key={phase.id} className="flex gap-6">
              {/* Line and node */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handlePhaseClick(phase)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-105",
                    getNodeStyles(phase.status, isActive)
                  )}
                >
                  {phase.status === "completed" ? (
                    <Check className="w-4 h-4" />
                  ) : phase.icon ? (
                    <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[1.5]">{phase.icon}</span>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                {!isLast && (
                  <div className={cn(
                    "w-px h-20 transition-colors duration-300",
                    phase.status === "completed" ? "bg-primary/30" : "bg-border"
                  )} />
                )}
              </div>

              {/* Content */}
              <div className={cn(
                "flex-1 pb-8 transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}>
                <button
                  onClick={() => handlePhaseClick(phase)}
                  className="text-left w-full group"
                >
                  <h4 className="font-heading text-lg font-normal text-foreground group-hover:text-primary transition-colors">
                    {phase.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {phase.description}
                  </p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={cn("w-full", className)}>
      {/* Timeline nodes */}
      <div className="relative flex items-center justify-between px-4">
        {/* Connection line */}
        <div className="absolute top-5 left-8 right-8 h-px bg-border" />
        <div 
          className="absolute top-5 left-8 h-px bg-primary/30 transition-all duration-500"
          style={{ 
            width: `${Math.max(0, (phases.findIndex(p => p.id === activePhase) / (phases.length - 1)) * 100)}%`,
            maxWidth: 'calc(100% - 64px)'
          }}
        />

        {phases.map((phase, index) => {
          const isActive = activePhase === phase.id;

          return (
            <div key={phase.id} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => handlePhaseClick(phase)}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-105",
                  getNodeStyles(phase.status, isActive)
                )}
              >
                {phase.status === "completed" ? (
                  <Check className="w-4 h-4" />
                ) : phase.icon ? (
                  <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[1.5]">{phase.icon}</span>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-6">
        {phases.map((phase) => {
          const isActive = activePhase === phase.id;

          return (
            <button
              key={phase.id}
              onClick={() => handlePhaseClick(phase)}
              className={cn(
                "flex-1 text-center px-2 transition-opacity duration-300 group",
                isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              <h4 className="font-heading text-sm font-normal text-foreground group-hover:text-primary transition-colors">
                {phase.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block leading-relaxed">
                {phase.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
