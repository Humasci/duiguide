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
    description: 'Potential incarceration period'
  },
  {
    key: 'fines',
    label: 'Fines',
    description: 'Monetary penalties'
  },
  {
    key: 'license_suspension',
    label: 'License Suspension',
    description: 'Driver\'s license suspension period'
  },
  {
    key: 'iid_required',
    label: 'Ignition Interlock (IID)',
    description: 'Mandatory ignition interlock device'
  },
  {
    key: 'probation',
    label: 'Probation',
    description: 'Supervised probation period'
  },
  {
    key: 'community_service',
    label: 'Community Service',
    description: 'Required community service hours'
  },
  {
    key: 'alcohol_education',
    label: 'Alcohol Education',
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
      <div className="space-y-3">
        {PENALTY_ROWS.map((row) => {
          const value = currentData[row.key];
          if (!value) return null;

          return (
            <div key={row.key} className="bg-background border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-heading text-base font-normal text-foreground">{row.label}</div>
                  <div className="text-xs text-muted-foreground">{row.description}</div>
                </div>
                <div className="text-base text-foreground font-medium">
                  {value}
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
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b hover:bg-muted/50">
              <TableHead className="font-heading text-sm font-medium text-foreground p-4">Penalty Type</TableHead>
              <TableHead className="font-heading text-sm font-medium text-foreground text-center p-4">1st Offense</TableHead>
              <TableHead className="font-heading text-sm font-medium text-foreground text-center p-4">2nd Offense</TableHead>
              <TableHead className="font-heading text-sm font-medium text-foreground text-center p-4">3rd Offense</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PENALTY_ROWS.map((row) => {
              const hasAnyData = penalties['1st'][row.key] || penalties['2nd'][row.key] || penalties['3rd'][row.key];
              if (!hasAnyData) return null;

              return (
                <TableRow
                  key={row.key}
                  className="border-b hover:bg-primary/5 transition-colors duration-200"
                >
                  <TableCell className="p-4">
                    <div className="font-medium text-foreground">{row.label}</div>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <span className="text-foreground">
                      {penalties['1st'][row.key] || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <span className="text-foreground">
                      {penalties['2nd'][row.key] || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 text-center">
                    <span className="text-foreground">
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
      <Card className="p-6 md:p-10 rounded-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-2">
              {state.legal_term} Penalties in {state.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Potential consequences for {state.legal_term} offenses. Penalties increase with each subsequent offense.
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
          <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 border border-border">
            <p className="font-medium text-foreground mb-1">Note</p>
            <p>
              These are general penalty ranges. Actual penalties vary based on aggravating factors.
              An experienced {state.legal_term} attorney can help minimize penalties.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
