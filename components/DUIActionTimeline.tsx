'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Clock,
  AlertTriangle,
  Car,
  Scale,
  FileText,
  Phone,
  CheckCircle2,
  ChevronRight,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionStep {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  urgency: "critical" | "high" | "medium" | "low";
  icon: React.ReactNode;
  href?: string;
  completed?: boolean;
}

interface DUIActionTimelineProps {
  stateName: string;
  countyName?: string;
  dmvDeadlineDays?: number;
  className?: string;
}

const DUIActionTimeline = ({
  stateName,
  countyName,
  dmvDeadlineDays = 15,
  className
}: DUIActionTimelineProps) => {
  const [expandedStep, setExpandedStep] = useState<string | null>("dmv-hearing");

  // Default action steps - can be customized per state/county
  const actionSteps: ActionStep[] = [
    {
      id: "dmv-hearing",
      title: "Request DMV/ALR Hearing",
      description: `File a request for an administrative license hearing to prevent automatic suspension. This is your most time-sensitive deadline.`,
      deadline: `${dmvDeadlineDays} days from arrest`,
      urgency: "critical",
      icon: <Clock className="w-5 h-5" />,
      href: `/${stateName.toLowerCase().replace(/\s+/g, '-')}/dmv-hearing`,
    },
    {
      id: "bail-bond",
      title: "Handle Bail & Release",
      description: "If still detained, arrange bail or bond for release. Contact a bail bondsman or use cash bail if available.",
      deadline: "Immediate",
      urgency: "critical",
      icon: <Scale className="w-5 h-5" />,
    },
    {
      id: "attorney",
      title: "Consult with DUI Attorney",
      description: "Schedule a free consultation with an experienced DUI attorney to understand your options and build your defense.",
      deadline: "Within 48-72 hours",
      urgency: "high",
      icon: <Phone className="w-5 h-5" />,
      href: `/find-attorney/${stateName.toLowerCase().replace(/\s+/g, '-')}`,
    },
    {
      id: "impound",
      title: "Retrieve Your Vehicle",
      description: "Your vehicle may be impounded. Retrieve it as soon as possible to avoid daily storage fees that can add up quickly.",
      deadline: "Within 2-3 days",
      urgency: "high",
      icon: <Car className="w-5 h-5" />,
    },
    {
      id: "court-date",
      title: "Prepare for Court Arraignment",
      description: "Your arraignment is your first court appearance. Attend on time, dressed appropriately, with your attorney if possible.",
      deadline: "Check your citation",
      urgency: "medium",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "documentation",
      title: "Gather Documentation",
      description: "Collect all relevant documents: arrest report, citation, license, insurance, and any witness information.",
      deadline: "Before attorney meeting",
      urgency: "medium",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const getUrgencyStyles = (urgency: ActionStep["urgency"], isExpanded: boolean) => {
    const base = "transition-all duration-300";

    switch (urgency) {
      case "critical":
        return cn(base, isExpanded
          ? "border-destructive bg-destructive/5"
          : "border-destructive/40 hover:border-destructive hover:bg-destructive/5");
      case "high":
        return cn(base, isExpanded
          ? "border-primary bg-primary/5"
          : "border-primary/40 hover:border-primary hover:bg-primary/5");
      case "medium":
        return cn(base, isExpanded
          ? "border-muted-foreground/50 bg-muted/50"
          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30");
      case "low":
      default:
        return cn(base, isExpanded
          ? "border-border bg-muted/30"
          : "border-border/50 hover:border-border");
    }
  };

  const getUrgencyBadge = (urgency: ActionStep["urgency"]) => {
    switch (urgency) {
      case "critical":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-destructive/15 text-destructive border border-destructive/30">
            <AlertTriangle className="w-3 h-3" />
            Critical
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary/15 text-primary border border-primary/30">
            High Priority
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-muted text-muted-foreground border border-border">
            Important
          </span>
        );
      default:
        return null;
    }
  };

  const getIconContainerStyles = (urgency: ActionStep["urgency"]) => {
    switch (urgency) {
      case "critical":
        return "bg-destructive/15 text-destructive border-destructive/30";
      case "high":
        return "bg-primary/15 text-primary border-primary/30";
      case "medium":
        return "bg-muted text-muted-foreground border-border";
      case "low":
      default:
        return "bg-muted/50 text-muted-foreground border-border/50";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading text-lg font-normal text-foreground">
            What You Need to Do
          </h3>
          <p className="text-sm text-muted-foreground">
            Ordered by urgency — start with critical items
          </p>
        </div>
      </div>

      {/* Timeline Items */}
      <div className="space-y-2">
        {actionSteps.map((step, index) => {
          const isExpanded = expandedStep === step.id;

          return (
            <div
              key={step.id}
              className={cn(
                "rounded-xl border-2 cursor-pointer overflow-hidden",
                getUrgencyStyles(step.urgency, isExpanded)
              )}
              onClick={() => setExpandedStep(isExpanded ? null : step.id)}
            >
              {/* Header Row */}
              <div className="flex items-center gap-3 p-3 md:p-4">
                {/* Step Number / Icon */}
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center",
                  getIconContainerStyles(step.urgency)
                )}>
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-heading text-base font-normal text-foreground">
                      {step.title}
                    </h4>
                    {getUrgencyBadge(step.urgency)}
                  </div>
                  {step.deadline && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {step.deadline}
                    </p>
                  )}
                </div>

                {/* Expand Arrow */}
                <ChevronRight className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-200",
                  isExpanded && "rotate-90"
                )} />
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0">
                  <div className="pl-13 md:pl-14 border-t border-border/50 pt-3">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {step.description}
                    </p>
                    {step.href && (
                      <Button
                        asChild
                        size="sm"
                        className={cn(
                          "rounded-full",
                          step.urgency === "critical"
                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        <Link href={step.href}>
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DUIActionTimeline;
