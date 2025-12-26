'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  dmvDeadlineDays?: number;
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
  bgColor: string;
  iconColor: string;
  badgeColor: string;
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
      bgColor: 'bg-yellow-50/80',
      iconColor: 'text-yellow-600',
      badgeColor: 'bg-yellow-500/20 text-yellow-800 border-yellow-300',
    },
    {
      title: 'Get Your Car Back',
      subtitle: 'Impound Fees Add Up Daily',
      description: `Vehicle impound fees accrue every day. Learn the exact costs, location, and what you need to retrieve your car from ${countyName}.`,
      icon: Car,
      href: `/${stateSlug}/${countySlug}/impound`,
      urgency: 'high',
      urgencyLabel: 'Time-Sensitive',
      bgColor: 'bg-blue-50/80',
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-500/20 text-blue-800 border-blue-300',
    },
    {
      title: 'Bail & Release',
      subtitle: 'Get Out of Jail',
      description: `Understand bail amounts, how bail bonds work, and what happens at your arraignment in ${countyName}.`,
      icon: Shield,
      href: `/${stateSlug}/${countySlug}/bail`,
      urgency: 'high',
      urgencyLabel: 'Urgent',
      bgColor: 'bg-green-50/80',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-500/20 text-green-800 border-green-300',
    },
    {
      title: 'Court Process',
      subtitle: 'What to Expect',
      description: `Arraignment, plea bargaining, diversion programs, and court dates. Know your rights and options in ${countyName}.`,
      icon: Scale,
      href: `/${stateSlug}/${countySlug}/court`,
      urgency: 'medium',
      urgencyLabel: 'Important',
      bgColor: 'bg-blue-50/80',
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-500/20 text-blue-800 border-blue-300',
    },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3">
          What to Do Right Now
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
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
                  h-full p-8 transition-all duration-300 rounded-2xl border-2
                  ${card.bgColor}
                  hover:bg-teal-50 hover:border-teal-300
                `}
              >
                <div className="flex flex-col h-full">
                  {/* Urgency Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge
                      className={`flex items-center gap-1.5 px-3 py-1.5 uppercase tracking-wide border ${card.badgeColor}`}
                    >
                      {card.urgency === 'critical' && <Zap className="h-3 w-3 stroke-[2]" />}
                      {card.urgency === 'high' && <Clock className="h-3 w-3 stroke-[2]" />}
                      {card.urgencyLabel}
                    </Badge>

                    {/* Icon */}
                    <div className={`p-3 rounded-full ${card.bgColor} border border-border group-hover:scale-110 group-hover:border-teal-400 transition-all`}>
                      <Icon className={`h-6 w-6 ${card.iconColor} group-hover:text-teal-600 stroke-[1.5] transition-colors`} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl font-normal text-foreground mb-2 group-hover:text-teal-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm font-semibold text-muted-foreground mb-4">
                      {card.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground group-hover:text-teal-700 transition-colors">
                      Learn More
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-teal-700 group-hover:translate-x-1 transition-all stroke-[1.5]" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Critical Reminder for DMV Deadline */}
      {dmvDeadlineDays <= 10 && (
        <Alert className="mt-8 border-2 rounded-2xl p-6 bg-yellow-50/80 border-yellow-300">
          <Zap className="h-6 w-6 stroke-[1.5] text-yellow-600" />
          <AlertDescription className="ml-7">
            <p className="font-bold text-foreground mb-2">
              ⚠️ DMV Hearing Deadline: {dmvDeadlineDays} Days
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You have only <strong>{dmvDeadlineDays} days</strong> from your arrest to request a DMV hearing.
              If you miss this deadline, your license will be automatically suspended. This is separate from
              your criminal case and requires immediate action.
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
