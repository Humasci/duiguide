'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertTriangle, Scale, FileText } from 'lucide-react';

interface TimelineProps {
  deadline: number;
}

interface TimelinePhase {
  id: string;
  day: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
  urgent?: boolean;
}

export default function Timeline({ deadline }: TimelineProps) {
  const phases: TimelinePhase[] = [
    {
      id: 'arrest',
      day: 'Day 0',
      title: 'Arrest',
      description: 'You are arrested and booked',
      icon: <AlertTriangle className="h-4 w-4" />,
      status: 'completed'
    },
    {
      id: 'deadline',
      day: `Day ${deadline}`,
      title: 'DMV Deadline',
      description: 'Last day to request admin hearing',
      icon: <AlertTriangle className="h-4 w-4" />,
      status: 'current',
      urgent: true
    },
    {
      id: 'arraignment',
      day: 'Day 30-45',
      title: 'Arraignment',
      description: 'First court appearance',
      icon: <Scale className="h-4 w-4" />,
      status: 'upcoming'
    },
    {
      id: 'resolution',
      day: 'Month 3-6',
      title: 'Trial/Plea',
      description: 'Case resolution',
      icon: <FileText className="h-4 w-4" />,
      status: 'upcoming'
    },
  ];

  const [activePhase, setActivePhase] = useState<string>(phases[1]?.id || 'deadline');

  const getNodeStyles = (status: string, isActive: boolean, urgent?: boolean) => {
    if (urgent && isActive) {
      return 'bg-destructive text-destructive-foreground border-destructive animate-pulse';
    }
    if (isActive) {
      return 'bg-foreground text-background border-foreground';
    }
    switch (status) {
      case 'completed':
        return 'bg-primary/20 text-primary border-primary/40';
      case 'current':
        return 'bg-background text-foreground border-foreground';
      case 'upcoming':
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="w-full">
      {/* Vertical Timeline for mobile, horizontal for desktop */}
      <div className="hidden md:block">
        {/* Horizontal Timeline */}
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

          {phases.map((phase) => {
            const isActive = activePhase === phase.id;

            return (
              <div key={phase.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => setActivePhase(phase.id)}
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-105',
                    getNodeStyles(phase.status, isActive, phase.urgent)
                  )}
                >
                  {phase.status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[1.5]">{phase.icon}</span>
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
                onClick={() => setActivePhase(phase.id)}
                className={cn(
                  'flex-1 text-center px-2 transition-opacity duration-300 group',
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                )}
              >
                <div className={cn(
                  'text-xs font-semibold mb-1',
                  phase.urgent && isActive ? 'text-destructive' : 'text-primary'
                )}>
                  {phase.day}
                </div>
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

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden flex flex-col">
        {phases.map((phase, index) => {
          const isActive = activePhase === phase.id;
          const isLast = index === phases.length - 1;

          return (
            <div key={phase.id} className="flex gap-4">
              {/* Line and node */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setActivePhase(phase.id)}
                  className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                    getNodeStyles(phase.status, isActive, phase.urgent)
                  )}
                >
                  {phase.status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[1.5]">{phase.icon}</span>
                  )}
                </button>
                {!isLast && (
                  <div className={cn(
                    'w-px h-16 transition-colors duration-300',
                    phase.status === 'completed' ? 'bg-primary/30' : 'bg-border'
                  )} />
                )}
              </div>

              {/* Content */}
              <div className={cn(
                'flex-1 pb-6 transition-opacity duration-300',
                isActive ? 'opacity-100' : 'opacity-60'
              )}>
                <button
                  onClick={() => setActivePhase(phase.id)}
                  className="text-left w-full"
                >
                  <div className={cn(
                    'text-xs font-semibold mb-1',
                    phase.urgent && isActive ? 'text-destructive' : 'text-primary'
                  )}>
                    {phase.day}
                  </div>
                  <h4 className="font-heading text-lg font-normal text-foreground">
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
    </div>
  );
}
