'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  status?: "completed" | "current" | "upcoming";
  urgency?: "critical" | "high" | "medium" | "low";
  deadline?: string;
}

interface TimelineProps {
  phases: TimelinePhase[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  showUrgency?: boolean;
}

const Timeline = ({ phases, orientation = "horizontal", className, showUrgency = false }: TimelineProps) => {
  const [activePhase, setActivePhase] = useState<string | null>(phases[0]?.id || null);

  const handlePhaseClick = (phase: TimelinePhase) => {
    setActivePhase(phase.id);
    if (phase.href && !showUrgency) {
      window.location.href = phase.href;
    }
  };

  const getNodeStyles = (status?: string, urgency?: string, isActive?: boolean) => {
    if (isActive && showUrgency) {
      if (urgency === "critical") return "bg-destructive text-destructive-foreground border-destructive shadow-lg shadow-destructive/20";
      if (urgency === "high") return "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20";
      return "bg-foreground text-background border-foreground";
    }
    if (isActive) {
      return "bg-foreground text-background border-foreground";
    }
    if (showUrgency && urgency === "critical") {
      return "bg-destructive/15 text-destructive border-destructive/50";
    }
    if (showUrgency && urgency === "high") {
      return "bg-primary/15 text-primary border-primary/50";
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

  const getUrgencyBadge = (urgency?: string) => {
    if (!showUrgency || !urgency) return null;
    switch (urgency) {
      case "critical":
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-destructive/15 text-destructive">
            <AlertTriangle className="w-2.5 h-2.5" />
            Critical
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/15 text-primary">
            High
          </span>
        );
      default:
        return null;
    }
  };

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col", className)}>
        {phases.map((phase, index) => {
          const isActive = activePhase === phase.id;
          const isLast = index === phases.length - 1;

          const ContentWrapper = phase.href ? Link : 'div';
          const contentProps = phase.href ? { href: phase.href } : {};

          return (
            <div key={phase.id} className="flex gap-4 md:gap-6">
              {/* Line and node */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handlePhaseClick(phase)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-105",
                    getNodeStyles(phase.status, phase.urgency, isActive)
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
                    "w-px flex-1 min-h-[3rem] transition-colors duration-300",
                    phase.status === "completed" ? "bg-primary/30" :
                    phase.urgency === "critical" ? "bg-destructive/20" :
                    phase.urgency === "high" ? "bg-primary/20" : "bg-border"
                  )} />
                )}
              </div>

              {/* Content */}
              <div className={cn(
                "flex-1 pb-6 transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
              )}>
                <ContentWrapper
                  {...contentProps}
                  onClick={() => !phase.href && handlePhaseClick(phase)}
                  className="text-left w-full group block cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className={cn(
                      "font-heading text-base md:text-lg font-normal transition-colors",
                      isActive && phase.urgency === "critical" ? "text-destructive" :
                      isActive && phase.urgency === "high" ? "text-primary" :
                      "text-foreground group-hover:text-primary"
                    )}>
                      {phase.title}
                    </h4>
                    {getUrgencyBadge(phase.urgency)}
                  </div>
                  {phase.deadline && (
                    <p className={cn(
                      "text-xs flex items-center gap-1 mb-1",
                      phase.urgency === "critical" ? "text-destructive" : "text-muted-foreground"
                    )}>
                      <Clock className="w-3 h-3" />
                      {phase.deadline}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </ContentWrapper>
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
          className={cn(
            "absolute top-5 left-8 h-px transition-all duration-500",
            phases[phases.findIndex(p => p.id === activePhase)]?.urgency === "critical"
              ? "bg-destructive/40" : "bg-primary/30"
          )}
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
                  getNodeStyles(phase.status, phase.urgency, isActive)
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
              <div className="flex items-center justify-center gap-1 mb-1">
                <h4 className={cn(
                  "font-heading text-sm font-normal transition-colors",
                  isActive && phase.urgency === "critical" ? "text-destructive" :
                  isActive && phase.urgency === "high" ? "text-primary" :
                  "text-foreground group-hover:text-primary"
                )}>
                  {phase.title}
                </h4>
              </div>
              {showUrgency && phase.deadline && (
                <p className={cn(
                  "text-[10px] flex items-center justify-center gap-0.5 mb-1",
                  phase.urgency === "critical" ? "text-destructive" : "text-muted-foreground"
                )}>
                  <Clock className="w-2.5 h-2.5" />
                  {phase.deadline}
                </p>
              )}
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
