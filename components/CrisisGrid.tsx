'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Car,
  Shield,
  AlertTriangle,
  Scale,
  Clock,
  ChevronRight,
  Zap
} from 'lucide-react';

interface CrisisGridProps {
  stateSlug: string;
  countySlug: string;
  countyName: string;
  dmvDeadlineDays?: number; // How many days to request DMV hearing
  className?: string;
}

interface CrisisCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  urgency: 'critical' | 'high' | 'medium';
  urgencyLabel: string;
  bgGradient: string;
  iconColor: string;
  borderColor: string;
  urgencyBadgeColor: string;
}

export default function CrisisGrid({
  stateSlug,
  countySlug,
  countyName,
  dmvDeadlineDays = 10,
  className = ''
}: CrisisGridProps) {
  const cards: CrisisCard[] = [
    {
      title: 'Save Your License',
      subtitle: `${dmvDeadlineDays}-Day Deadline`,
      description: `Request your DMV hearing within ${dmvDeadlineDays} days or lose your license automatically. This is the most time-sensitive action.`,
      icon: AlertTriangle,
      href: `/${stateSlug}/${countySlug}/dmv-hearing`,
      urgency: 'critical',
      urgencyLabel: 'CRITICAL - Act Now',
      bgGradient: 'from-red-50 to-red-100',
      iconColor: 'text-red-600',
      borderColor: 'border-red-300',
      urgencyBadgeColor: 'bg-red-600 text-white',
    },
    {
      title: 'Get Your Car Back',
      subtitle: 'Impound Fees Add Up Daily',
      description: `Vehicle impound fees accrue every day. Learn the exact costs, location, and what you need to retrieve your car from ${countyName}.`,
      icon: Car,
      href: `/${stateSlug}/${countySlug}/impound`,
      urgency: 'high',
      urgencyLabel: 'Time-Sensitive',
      bgGradient: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-300',
      urgencyBadgeColor: 'bg-orange-600 text-white',
    },
    {
      title: 'Bail & Release',
      subtitle: 'Get Out of Jail',
      description: `Understand bail amounts, how bail bonds work, and what happens at your arraignment in ${countyName}.`,
      icon: Shield,
      href: `/${stateSlug}/${countySlug}/bail`,
      urgency: 'high',
      urgencyLabel: 'Urgent',
      bgGradient: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-300',
      urgencyBadgeColor: 'bg-blue-600 text-white',
    },
    {
      title: 'Court Process',
      subtitle: 'What to Expect',
      description: `Arraignment, plea bargaining, diversion programs, and court dates. Know your rights and options in ${countyName}.`,
      icon: Scale,
      href: `/${stateSlug}/${countySlug}/court`,
      urgency: 'medium',
      urgencyLabel: 'Important',
      bgGradient: 'from-gray-50 to-gray-100',
      iconColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      urgencyBadgeColor: 'bg-gray-600 text-white',
    },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          What to Do Right Now
        </h2>
        <p className="text-gray-600">
          Time-sensitive actions after a DUI arrest in {countyName}. Start with the most critical deadlines.
        </p>
      </div>

      {/* Crisis Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Link
              key={index}
              href={card.href}
              className="group block h-full"
            >
              <Card
                className={`
                  h-full p-6 transition-all duration-300 border-2
                  ${card.borderColor}
                  bg-gradient-to-br ${card.bgGradient}
                  hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1
                  ${card.urgency === 'critical' ? 'ring-2 ring-red-400 animate-pulse-border' : ''}
                `}
              >
                <div className="flex flex-col h-full">
                  {/* Urgency Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${card.urgencyBadgeColor}
                      flex items-center gap-1
                    `}>
                      {card.urgency === 'critical' && <Zap className="h-3 w-3" />}
                      {card.urgency === 'high' && <Clock className="h-3 w-3" />}
                      {card.urgencyLabel}
                    </span>

                    {/* Icon */}
                    <div className={`
                      p-3 rounded-full bg-white shadow-md
                      group-hover:scale-110 transition-transform
                    `}>
                      <Icon className={`h-6 w-6 ${card.iconColor}`} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      {card.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-300/50 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                      Learn More
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Critical Reminder for DMV Deadline */}
      {dmvDeadlineDays <= 10 && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg shadow-lg">
          <div className="flex items-start gap-3">
            <Zap className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0 animate-pulse" />
            <div>
              <p className="font-bold text-red-900 mb-1">
                ⚠️ DMV Hearing Deadline: {dmvDeadlineDays} Days
              </p>
              <p className="text-sm text-red-800">
                You have only <strong>{dmvDeadlineDays} days</strong> from your arrest to request a DMV hearing.
                If you miss this deadline, your license will be automatically suspended. This is separate from
                your criminal case and requires immediate action.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
