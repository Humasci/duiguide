'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Scale,
  Clock,
  DollarSign,
  Ban,
  Key,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface PenaltyData {
  jail_time?: string;
  fines?: string;
  license_suspension?: string;
  iid_required?: string;
  probation?: string;
  community_service?: string;
  alcohol_education?: string;
  [key: string]: string | undefined;
}

interface PenaltyMatrixProps {
  state: {
    name: string;
    legal_term: string;
    first_offense_penalties?: PenaltyData;
    second_offense_penalties?: PenaltyData;
    third_offense_penalties?: PenaltyData;
  };
  className?: string;
}

type OffenseType = '1st' | '2nd' | '3rd';

const PENALTY_ROWS = [
  {
    key: 'jail_time',
    label: 'Jail Time',
    icon: Clock,
    description: 'Potential incarceration period'
  },
  {
    key: 'fines',
    label: 'Fines',
    icon: DollarSign,
    description: 'Monetary penalties'
  },
  {
    key: 'license_suspension',
    label: 'License Suspension',
    icon: Ban,
    description: 'Driver\'s license suspension period'
  },
  {
    key: 'iid_required',
    label: 'Ignition Interlock (IID)',
    icon: Key,
    description: 'Mandatory ignition interlock device'
  },
  {
    key: 'probation',
    label: 'Probation',
    icon: FileText,
    description: 'Supervised probation period'
  },
  {
    key: 'community_service',
    label: 'Community Service',
    icon: AlertTriangle,
    description: 'Required community service hours'
  },
  {
    key: 'alcohol_education',
    label: 'Alcohol Education',
    icon: FileText,
    description: 'Mandatory education programs'
  },
];

export default function PenaltyMatrix({ state, className = '' }: PenaltyMatrixProps) {
  const [activeOffense, setActiveOffense] = useState<OffenseType>('1st');

  const getPenaltyData = (offense: OffenseType): PenaltyData => {
    switch (offense) {
      case '1st':
        return state.first_offense_penalties || {};
      case '2nd':
        return state.second_offense_penalties || {};
      case '3rd':
        return state.third_offense_penalties || {};
      default:
        return {};
    }
  };

  const getAllPenalties = () => {
    return {
      '1st': state.first_offense_penalties || {},
      '2nd': state.second_offense_penalties || {},
      '3rd': state.third_offense_penalties || {},
    };
  };

  const hasData = (offense: OffenseType) => {
    const data = getPenaltyData(offense);
    return Object.keys(data).length > 0;
  };

  const renderMobileView = () => {
    const currentData = getPenaltyData(activeOffense);

    return (
      <div className="space-y-4">
        {PENALTY_ROWS.map((row) => {
          const value = currentData[row.key];
          if (!value) return null;

          const Icon = row.icon;

          return (
            <div key={row.key} className="bg-background border border-border rounded-2xl p-6 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Icon className="h-6 w-6 text-primary stroke-[1.5]" />
                </div>
                <div className="flex-1">
                  <div className="font-heading text-lg font-normal text-foreground mb-2">{row.label}</div>
                  <div className="text-sm text-muted-foreground mb-3 leading-relaxed">{row.description}</div>
                  <div className="text-base text-foreground font-medium bg-blue-50/80 px-4 py-3 rounded-xl border border-blue-200">
                    {value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDesktopView = () => {
    const penalties = getAllPenalties();

    return (
      <div className="rounded-2xl border-2 border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b-2 hover:bg-muted/50">
              <TableHead className="font-heading text-base font-normal text-foreground p-6">Penalty Type</TableHead>
              <TableHead className="font-heading text-base font-normal text-foreground text-center p-6 bg-blue-50/80">1st Offense</TableHead>
              <TableHead className="font-heading text-base font-normal text-foreground text-center p-6 bg-yellow-50/80">2nd Offense</TableHead>
              <TableHead className="font-heading text-base font-normal text-foreground text-center p-6 bg-green-50/80">3rd Offense</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PENALTY_ROWS.map((row, index) => {
              const hasAnyData = penalties['1st'][row.key] || penalties['2nd'][row.key] || penalties['3rd'][row.key];
              if (!hasAnyData) return null;

              const Icon = row.icon;

              return (
                <TableRow
                  key={row.key}
                  className="border-b hover:bg-teal-50 transition-colors duration-300"
                >
                  <TableCell className="p-6">
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 text-primary flex-shrink-0 stroke-[1.5]" />
                      <div>
                        <div className="font-heading text-base font-normal text-foreground">{row.label}</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">{row.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-center bg-blue-50/50">
                    <span className="text-foreground font-medium">
                      {penalties['1st'][row.key] || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="p-6 text-center bg-yellow-50/50">
                    <span className="text-foreground font-medium">
                      {penalties['2nd'][row.key] || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="p-6 text-center bg-green-50/50">
                    <span className="text-foreground font-medium">
                      {penalties['3rd'][row.key] || '—'}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <Card className="p-8 md:p-12 rounded-2xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3 flex items-center gap-3">
              <Scale className="h-8 w-8 text-primary stroke-[1.5]" />
              {state.legal_term} Penalties in {state.name}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Understand the potential consequences for {state.legal_term} offenses in {state.name}.
              Penalties increase significantly with each subsequent offense.
            </p>
          </div>

          {/* Tab Buttons (Mobile Only) */}
          <div className="flex gap-3 md:hidden">
            {(['1st', '2nd', '3rd'] as OffenseType[]).map((offense) => {
              if (!hasData(offense)) return null;

              const isActive = activeOffense === offense;
              const bgColors = {
                '1st': 'bg-blue-50/80 text-blue-800 border-blue-300',
                '2nd': 'bg-yellow-50/80 text-yellow-800 border-yellow-300',
                '3rd': 'bg-green-50/80 text-green-800 border-green-300',
              };
              const activeBgColors = {
                '1st': 'bg-blue-500 text-white border-blue-600',
                '2nd': 'bg-yellow-500 text-white border-yellow-600',
                '3rd': 'bg-green-500 text-white border-green-600',
              };

              return (
                <button
                  key={offense}
                  onClick={() => setActiveOffense(offense)}
                  className={`flex-1 px-6 py-4 rounded-2xl font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                    isActive ? activeBgColors[offense] : bgColors[offense]
                  }`}
                >
                  {offense} Offense
                </button>
              );
            })}
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {renderMobileView()}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            {renderDesktopView()}
          </div>

          {/* Important Notice */}
          <Alert className="border-2 rounded-2xl bg-yellow-50/80 border-yellow-300">
            <AlertTriangle className="h-6 w-6 text-yellow-600 stroke-[1.5]" />
            <AlertDescription className="ml-7">
              <p className="font-bold text-foreground mb-2">Important Legal Notice</p>
              <p className="text-muted-foreground leading-relaxed">
                These are general penalty ranges. Actual penalties can vary based on aggravating factors
                (high BAC, accident, injury, minor in vehicle, etc.). An experienced {state.legal_term} attorney
                can help minimize penalties and explore alternatives like diversion programs.
              </p>
            </AlertDescription>
          </Alert>

          {/* Escalation Warning */}
          {(hasData('2nd') || hasData('3rd')) && (
            <Alert className="border-2 rounded-2xl bg-green-50/80 border-green-300">
              <AlertTriangle className="h-6 w-6 text-green-600 stroke-[1.5]" />
              <AlertDescription className="ml-7">
                <p className="font-bold text-foreground mb-2">Escalating Consequences</p>
                <p className="text-muted-foreground leading-relaxed">
                  Second and third {state.legal_term} offenses carry significantly harsher penalties,
                  including mandatory jail time in most cases. Multiple offenses may result in felony charges.
                </p>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>
    </div>
  );
}
