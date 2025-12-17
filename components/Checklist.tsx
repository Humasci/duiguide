'use client';
import { useState } from 'react';

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
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Progress</span>
          <span className="text-gray-600">{completed.length} of {steps.length} complete</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Checklist Items */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <label key={i} className="flex items-start gap-4 p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={completed.includes(i)}
              onChange={() => toggle(i)}
              className="w-6 h-6 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 mt-1"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              {step.deadline && (
                <div className="text-sm text-red-600 font-bold mb-2">
                  ⏰ Deadline: {step.deadline}
                </div>
              )}
              <p className="text-gray-700 mb-2">{step.action}</p>
              {step.details && (
                <p className="text-sm text-gray-600">{step.details}</p>
              )}
              {step.consequences && (
                <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 text-sm text-red-800">
                  <strong>Warning:</strong> {step.consequences}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}