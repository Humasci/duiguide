'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
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
    legal_term: string; // DUI, DWI, or OVI
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
            <div key={row.key} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">{row.label}</div>
                  <div className="text-sm text-gray-600 mb-2">{row.description}</div>
                  <div className="text-base text-gray-900 font-medium bg-blue-50 px-3 py-2 rounded">
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left p-4 font-bold text-gray-900">Penalty Type</th>
              <th className="text-center p-4 font-bold text-gray-900 bg-blue-50">1st Offense</th>
              <th className="text-center p-4 font-bold text-gray-900 bg-orange-50">2nd Offense</th>
              <th className="text-center p-4 font-bold text-gray-900 bg-red-50">3rd Offense</th>
            </tr>
          </thead>
          <tbody>
            {PENALTY_ROWS.map((row, index) => {
              const hasAnyData = penalties['1st'][row.key] || penalties['2nd'][row.key] || penalties['3rd'][row.key];
              if (!hasAnyData) return null;

              const Icon = row.icon;

              return (
                <tr
                  key={row.key}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">{row.label}</div>
                        <div className="text-xs text-gray-600">{row.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center bg-blue-50/50">
                    <span className="text-gray-900 font-medium">
                      {penalties['1st'][row.key] || '—'}
                    </span>
                  </td>
                  <td className="p-4 text-center bg-orange-50/50">
                    <span className="text-gray-900 font-medium">
                      {penalties['2nd'][row.key] || '—'}
                    </span>
                  </td>
                  <td className="p-4 text-center bg-red-50/50">
                    <span className="text-gray-900 font-medium">
                      {penalties['3rd'][row.key] || '—'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Scale className="h-8 w-8 text-blue-600" />
              {state.legal_term} Penalties in {state.name}
            </h2>
            <p className="text-gray-600">
              Understand the potential consequences for {state.legal_term} offenses in {state.name}.
              Penalties increase significantly with each subsequent offense.
            </p>
          </div>

          {/* Tab Buttons (Mobile Only) */}
          <div className="flex gap-2 md:hidden">
            {(['1st', '2nd', '3rd'] as OffenseType[]).map((offense) => {
              if (!hasData(offense)) return null;

              const isActive = activeOffense === offense;
              const bgColors = {
                '1st': 'bg-blue-100 text-blue-800 border-blue-300',
                '2nd': 'bg-orange-100 text-orange-800 border-orange-300',
                '3rd': 'bg-red-100 text-red-800 border-red-300',
              };
              const activeBgColors = {
                '1st': 'bg-blue-600 text-white border-blue-700',
                '2nd': 'bg-orange-600 text-white border-orange-700',
                '3rd': 'bg-red-600 text-white border-red-700',
              };

              return (
                <button
                  key={offense}
                  onClick={() => setActiveOffense(offense)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold border-2 transition-all ${
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
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-900">
                <p className="font-semibold mb-1">Important Legal Notice</p>
                <p className="text-yellow-800">
                  These are general penalty ranges. Actual penalties can vary based on aggravating factors
                  (high BAC, accident, injury, minor in vehicle, etc.). An experienced {state.legal_term} attorney
                  can help minimize penalties and explore alternatives like diversion programs.
                </p>
              </div>
            </div>
          </div>

          {/* Escalation Warning */}
          {(hasData('2nd') || hasData('3rd')) && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-900">
                  <p className="font-semibold mb-1">Escalating Consequences</p>
                  <p className="text-red-800">
                    Second and third {state.legal_term} offenses carry significantly harsher penalties,
                    including mandatory jail time in most cases. Multiple offenses may result in felony charges.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
