import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, Calendar, CheckCircle, XCircle, Users, FileText, Scale, MapPin } from 'lucide-react';

interface TimelineEvent {
  timeframe: string;
  title: string;
  description: string;
  events?: string[];
  actions_required?: string[];
  status?: 'upcoming' | 'current' | 'completed' | 'missed';
  urgency?: 'critical' | 'high' | 'medium' | 'low';
  county_specific_notes?: string;
  deadline?: string;
  consequences?: string;
}

interface DUITimelineProps {
  state: {
    name: string;
    abbreviation: string;
    dui_laws: {
      terminology: string;
      admin_hearing_deadline_days: number;
    };
  };
  county?: {
    name: string;
    court_name?: string;
  };
  timeline?: TimelineEvent[];
  className?: string;
  showLocalInfo?: boolean;
}

const DEFAULT_TIMELINE: TimelineEvent[] = [
  {
    timeframe: 'Hour 0-4',
    title: 'Arrest & Booking',
    description: 'You are arrested, processed, and booked into jail',
    events: [
      'Field sobriety tests and breathalyzer',
      'Miranda rights read',
      'Transported to jail',
      'Fingerprints and photos taken',
      'Personal property confiscated'
    ],
    actions_required: [
      'Remain calm and cooperative',
      'Do not admit guilt',
      'Remember details of the stop',
      'Ask for attorney if questioned'
    ],
    status: 'current',
    urgency: 'high'
  },
  {
    timeframe: 'Hours 4-24',
    title: 'Release from Jail',
    description: 'Bond/bail process and getting released',
    events: [
      'Bail amount set',
      'Bond payment or bondsman',
      'Release paperwork processed',
      'Court date assigned'
    ],
    actions_required: [
      'Contact family/bondsman for bail',
      'Arrange transportation (cannot drive)',
      'Collect personal belongings',
      'Note court date and time'
    ],
    status: 'upcoming',
    urgency: 'high'
  }
];

const URGENCY_COLORS = {
  critical: 'bg-red-100 border-red-500 text-red-900',
  high: 'bg-orange-100 border-orange-500 text-orange-900', 
  medium: 'bg-yellow-100 border-yellow-500 text-yellow-900',
  low: 'bg-blue-100 border-blue-500 text-blue-900'
};

const STATUS_ICONS = {
  upcoming: Clock,
  current: AlertTriangle,
  completed: CheckCircle,
  missed: XCircle
};

const STATUS_COLORS = {
  upcoming: 'text-blue-500',
  current: 'text-orange-500',
  completed: 'text-green-500',
  missed: 'text-red-500'
};

export function DUITimeline({ 
  state, 
  county, 
  timeline = DEFAULT_TIMELINE, 
  className = '',
  showLocalInfo = true 
}: DUITimelineProps) {
  
  const terminology = state.dui_laws.terminology;
  
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {terminology} Timeline: What Happens When
          </h3>
          <p className="text-sm text-gray-600">
            {county ? `${county.name}, ${state.abbreviation}` : state.name} process overview
          </p>
        </div>
      </div>
      
      {/* Critical Deadline Alert */}
      <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <p className="font-semibold text-red-800">
            Critical: You have {state.dui_laws.admin_hearing_deadline_days} days to request your administrative hearing
          </p>
        </div>
        <p className="text-sm text-red-700 mt-1">
          Missing this deadline results in automatic license suspension
        </p>
      </div>
      
      {/* Timeline Events */}
      <div className="space-y-6">
        {timeline.map((event, index) => {
          const StatusIcon = STATUS_ICONS[event.status || 'upcoming'];
          const urgencyClass = event.urgency ? URGENCY_COLORS[event.urgency] : URGENCY_COLORS.medium;
          const statusColor = STATUS_COLORS[event.status || 'upcoming'];
          
          return (
            <div key={index} className="relative">
              {/* Timeline connector line */}
              {index < timeline.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-20 bg-gray-200"></div>
              )}
              
              <div className="flex space-x-4">
                {/* Timeline marker */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 ${
                  event.status === 'completed' ? 'border-green-500' : 
                  event.status === 'current' ? 'border-orange-500' :
                  event.status === 'missed' ? 'border-red-500' : 'border-blue-500'
                } flex items-center justify-center`}>
                  <StatusIcon className={`w-6 h-6 ${statusColor}`} />
                </div>
                
                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="text-sm">
                      {event.timeframe}
                    </Badge>
                    {event.urgency && (
                      <Badge variant="secondary" className={`text-xs ${urgencyClass}`}>
                        {event.urgency.toUpperCase()}
                      </Badge>
                    )}
                    {event.deadline && (
                      <Badge variant="destructive" className="text-xs">
                        Deadline: {event.deadline}
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2">{event.title}</h4>
                  <p className="text-gray-700 mb-3">{event.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* What Happens */}
                    {event.events && event.events.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          What Happens
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {event.events.map((eventItem, i) => (
                            <li key={i}>{eventItem}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Actions Required */}
                    {event.actions_required && event.actions_required.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          Your Actions
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {event.actions_required.map((action, i) => (
                            <li key={i} className="font-medium">{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Local Context */}
                  {showLocalInfo && event.county_specific_notes && (
                    <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-1 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {county ? `${county.name} Specific Info` : 'Local Information'}
                      </h5>
                      <p className="text-sm text-blue-800">{event.county_specific_notes}</p>
                    </div>
                  )}
                  
                  {/* Consequences Warning */}
                  {event.consequences && (
                    <div className="mt-3 p-3 bg-red-50 rounded border-l-4 border-red-400">
                      <h5 className="font-medium text-red-900 mb-1 flex items-center">
                        <Scale className="w-4 h-4 mr-1" />
                        Consequences if Missed
                      </h5>
                      <p className="text-sm text-red-800">{event.consequences}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Court Information Footer */}
      {showLocalInfo && county && county.court_name && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-medium mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Your Court Information
            </h4>
            <p className="text-sm text-gray-700">
              <strong>{county.court_name}</strong> will handle your {terminology} case.
              All court appearances and hearings will be scheduled here.
            </p>
          </div>
        </div>
      )}
      
      {/* Next Steps CTA */}
      <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg">
        <h4 className="font-bold mb-2">Don't Wait - Take Action Now</h4>
        <p className="text-sm mb-3">
          Time is critical after a {terminology} arrest. Every day counts toward protecting your rights and driving privileges.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
            Find Local Attorney
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-400 transition-colors">
            Request DMV Hearing
          </button>
        </div>
      </div>
    </Card>
  );
}

export default DUITimeline;