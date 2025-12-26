'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Clock, AlertTriangle } from 'lucide-react';

interface ChecklistStep {
  title: string;
  deadline?: string;
  action: string;
  details: string;
  consequences?: string;
}

interface ChecklistProps {
  steps: ChecklistStep[];
}

export default function Checklist({ steps }: ChecklistProps) {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggle = (i: number) => {
    setCompleted(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const progress = steps.length > 0 ? (completed.length / steps.length) * 100 : 0;

  return (
    <div id="checklist">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-3">
          <span className="font-medium text-foreground">Progress</span>
          <span className="text-muted-foreground">{completed.length} of {steps.length} complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {steps.map((step, i) => {
          const isCompleted = completed.includes(i);
          return (
            <label
              key={i}
              className={cn(
                'flex items-start gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                isCompleted
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-background border-border hover:border-primary/50'
              )}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className={cn(
                  'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-0.5',
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted-foreground hover:border-primary'
                )}
              >
                {isCompleted && <Check className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <h3 className={cn(
                  'font-heading text-lg font-normal mb-2 transition-colors',
                  isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                )}>
                  {step.title}
                </h3>
                {step.deadline && (
                  <div className="flex items-center gap-2 text-sm text-destructive font-medium mb-2">
                    <Clock className="h-4 w-4 stroke-[1.5]" />
                    Deadline: {step.deadline}
                  </div>
                )}
                <p className={cn(
                  'mb-2 leading-relaxed',
                  isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'
                )}>
                  {step.action}
                </p>
                {step.details && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                )}
                {step.consequences && (
                  <div className="mt-3 p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0 stroke-[1.5]" />
                      <span className="text-foreground">
                        <strong>Warning:</strong> {step.consequences}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
