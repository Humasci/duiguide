'use client';

interface TimelineProps {
  deadline: number;
}

export default function Timeline({ deadline }: TimelineProps) {
  const steps = [
    { 
      day: 'Day 0', 
      title: 'Arrest', 
      description: 'You are arrested and booked', 
      icon: '🚔' 
    },
    { 
      day: `Day ${deadline}`, 
      title: 'Deadline', 
      description: 'Last day to request admin hearing', 
      icon: '⏰', 
      urgent: true 
    },
    { 
      day: 'Day 30-45', 
      title: 'Arraignment', 
      description: 'First court appearance', 
      icon: '⚖️' 
    },
    { 
      day: 'Month 3-6', 
      title: 'Trial/Plea', 
      description: 'Case resolution', 
      icon: '📋' 
    },
  ];
  
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200" />
      
      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="relative flex items-start gap-6">
            {/* Icon */}
            <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full text-2xl ${
              step.urgent ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
            } text-white shadow-lg`}>
              {step.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="text-sm font-bold text-blue-600 mb-1">{step.day}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}