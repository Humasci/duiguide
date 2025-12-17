'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface StateDeadline {
  name: string;
  abbreviation: string;
  slug: string;
  dmv_deadline_days: number;
  terminology: string;
}

interface DeadlineResult {
  arrestDate: Date;
  deadlineDate: Date;
  daysRemaining: number;
  dmvDeadlineDays: number;
  hasExpired: boolean;
  urgencyLevel: 'critical' | 'urgent' | 'warning' | 'ok';
  state: StateDeadline;
}

const STATES: StateDeadline[] = [
  { name: 'Texas', abbreviation: 'TX', slug: 'texas', dmv_deadline_days: 15, terminology: 'DWI' },
  { name: 'Arizona', abbreviation: 'AZ', slug: 'arizona', dmv_deadline_days: 15, terminology: 'DUI' },
  { name: 'California', abbreviation: 'CA', slug: 'california', dmv_deadline_days: 10, terminology: 'DUI' },
  { name: 'Florida', abbreviation: 'FL', slug: 'florida', dmv_deadline_days: 10, terminology: 'DUI' },
  { name: 'Georgia', abbreviation: 'GA', slug: 'georgia', dmv_deadline_days: 30, terminology: 'DUI' },
  { name: 'North Carolina', abbreviation: 'NC', slug: 'north-carolina', dmv_deadline_days: 10, terminology: 'DWI' },
  { name: 'Colorado', abbreviation: 'CO', slug: 'colorado', dmv_deadline_days: 7, terminology: 'DUI' },
  { name: 'Ohio', abbreviation: 'OH', slug: 'ohio', dmv_deadline_days: 30, terminology: 'OVI' },
  { name: 'Tennessee', abbreviation: 'TN', slug: 'tennessee', dmv_deadline_days: 20, terminology: 'DUI' },
];

export default function DeadlineCalculator() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [arrestDate, setArrestDate] = useState<string>('');
  const [result, setResult] = useState<DeadlineResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const calculateDeadline = () => {
    if (!selectedState || !arrestDate) return;

    const state = STATES.find(s => s.abbreviation === selectedState);
    if (!state) return;

    const arrest = new Date(arrestDate);
    const deadline = new Date(arrest);
    deadline.setDate(deadline.getDate() + state.dmv_deadline_days);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arrestDateNormalized = new Date(arrest);
    arrestDateNormalized.setHours(0, 0, 0, 0);

    const deadlineNormalized = new Date(deadline);
    deadlineNormalized.setHours(0, 0, 0, 0);

    const daysRemaining = Math.ceil((deadlineNormalized.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const hasExpired = daysRemaining < 0;

    let urgencyLevel: 'critical' | 'urgent' | 'warning' | 'ok' = 'ok';
    if (hasExpired) {
      urgencyLevel = 'critical';
    } else if (daysRemaining <= 2) {
      urgencyLevel = 'critical';
    } else if (daysRemaining <= 5) {
      urgencyLevel = 'urgent';
    } else if (daysRemaining <= state.dmv_deadline_days / 2) {
      urgencyLevel = 'warning';
    }

    setResult({
      arrestDate: arrest,
      deadlineDate: deadline,
      daysRemaining,
      dmvDeadlineDays: state.dmv_deadline_days,
      hasExpired,
      urgencyLevel,
      state,
    });
  };

  useEffect(() => {
    if (selectedState && arrestDate) {
      calculateDeadline();
    }
  }, [selectedState, arrestDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'urgent': return 'bg-orange-50 border-orange-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-green-50 border-green-200';
    }
  };

  const getUrgencyTextColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-700';
      case 'urgent': return 'text-orange-700';
      case 'warning': return 'text-yellow-700';
      default: return 'text-green-700';
    }
  };

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case 'critical':
      case 'urgent':
        return <AlertCircle className="h-8 w-8 text-red-600" />;
      case 'warning':
        return <Clock className="h-8 w-8 text-yellow-600" />;
      default:
        return <CheckCircle className="h-8 w-8 text-green-600" />;
    }
  };

  const getUrgencyMessage = (result: DeadlineResult) => {
    if (result.hasExpired) {
      return {
        title: 'DEADLINE EXPIRED',
        message: `Your ${result.state.dmv_deadline_days}-day DMV hearing deadline has passed. You may have already lost your license automatically. Contact an attorney IMMEDIATELY to explore any remaining options.`,
      };
    }

    if (result.daysRemaining === 0) {
      return {
        title: 'LAST DAY - ACT NOW',
        message: `Today is your FINAL day to request a DMV hearing. You must submit your request TODAY or lose your license automatically tomorrow.`,
      };
    }

    if (result.daysRemaining === 1) {
      return {
        title: 'CRITICAL - 1 DAY LEFT',
        message: `You have only 1 day remaining to request your DMV hearing. If you miss this deadline, your license will be automatically suspended.`,
      };
    }

    if (result.daysRemaining <= 2) {
      return {
        title: 'URGENT - 2 DAYS LEFT',
        message: `You have only ${result.daysRemaining} days to request your DMV hearing. This is separate from your criminal court case. Missing this deadline means automatic license suspension.`,
      };
    }

    if (result.daysRemaining <= 5) {
      return {
        title: 'URGENT ACTION NEEDED',
        message: `You have ${result.daysRemaining} days remaining. Most attorneys recommend requesting a hearing within the first few days to avoid last-minute issues.`,
      };
    }

    return {
      title: 'Time to Act',
      message: `You have ${result.daysRemaining} days remaining. This is the administrative deadline - separate from your criminal court case. Request your hearing as soon as possible.`,
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              DMV Hearing Deadline Calculator
            </h2>
            <p className="text-gray-600">
              After a DUI/DWI arrest, you have a limited time to request a DMV hearing to prevent automatic license suspension.
              This deadline is <strong>separate from your criminal court case</strong> and is often shorter.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="state">State of Arrest</Label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your state...</option>
                {STATES.map((state) => (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name} ({state.dmv_deadline_days} days)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrestDate">Date of Arrest</Label>
              <Input
                id="arrestDate"
                type="date"
                value={arrestDate}
                onChange={(e) => setArrestDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
          </div>

          {selectedState && !arrestDate && (
            <div className="text-sm text-gray-500 text-center py-2">
              Please enter your arrest date to calculate your deadline
            </div>
          )}
        </div>
      </Card>

      {result && (
        <Card className={`p-6 md:p-8 border-2 ${getUrgencyColor(result.urgencyLevel)}`}>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              {getUrgencyIcon(result.urgencyLevel)}
              <div className="flex-1">
                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${getUrgencyTextColor(result.urgencyLevel)}`}>
                  {getUrgencyMessage(result).title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {getUrgencyMessage(result).message}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 bg-white/50 rounded-lg p-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Arrest Date</div>
                <div className="font-semibold">{formatDate(result.arrestDate)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Deadline Date</div>
                <div className="font-semibold">{formatDate(result.deadlineDate)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Days Remaining</div>
                <div className={`text-2xl font-bold ${getUrgencyTextColor(result.urgencyLevel)}`}>
                  {result.hasExpired ? 'EXPIRED' : result.daysRemaining}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">What is a DMV Hearing?</h4>
              <p className="text-sm text-blue-800 mb-2">
                In {result.state.name}, this is called an <strong>Administrative License Suspension (ALS)</strong> hearing.
                This is your opportunity to challenge the automatic suspension of your driver's license.
              </p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Separate from your criminal {result.state.terminology} court case</li>
                <li>Must be requested within {result.state.dmv_deadline_days} days of arrest</li>
                <li>Can potentially save your driving privileges</li>
                <li>An attorney can handle this process for you</li>
              </ul>
            </div>

            {!showLeadForm ? (
              <Button
                onClick={() => setShowLeadForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
              >
                Connect with a {result.state.name} {result.state.terminology} Attorney Now
              </Button>
            ) : (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Get Help from a Local Attorney</h4>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Request Attorney Contact
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Free consultation • No obligation • Local {result.state.name} attorneys
                  </p>
                </form>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card className="p-6 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Why These Deadlines Matter</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Critical Mistake:</strong> Many people focus only on their criminal court case and miss the DMV deadline entirely.
            This results in automatic license suspension even if you later win or reduce your criminal case.
          </p>
          <p>
            <strong>Two Separate Systems:</strong> A DUI/DWI involves TWO cases: (1) Criminal court case for the charges, and (2) Administrative DMV case for your license.
            The DMV deadline comes FIRST and is usually much shorter.
          </p>
          <p>
            <strong>Requesting the hearing:</strong> Simply requesting the hearing (even without an attorney yet) preserves your rights and prevents automatic suspension while your case is pending.
          </p>
        </div>
      </Card>
    </div>
  );
}
