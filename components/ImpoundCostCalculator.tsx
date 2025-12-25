'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, DollarSign, Calendar, Clock, CreditCard, Info } from 'lucide-react';

interface ImpoundCostCalculatorProps {
  county: {
    name: string;
    state_name: string;
    impound_daily_fee: number;
    impound_admin_fee: number;
    impound_lot_name?: string;
    impound_lot_address?: string;
    impound_release_hours?: string;
    impound_payment_methods?: string;
  };
  className?: string;
}

interface CostBreakdown {
  arrestDate: Date;
  pickupDate: Date;
  daysImpounded: number;
  dailyFee: number;
  storageFees: number;
  adminFee: number;
  totalCost: number;
  nextChargeTime: Date;
  hoursUntilNextCharge: number;
}

export default function ImpoundCostCalculator({ county, className = '' }: ImpoundCostCalculatorProps) {
  const [arrestDate, setArrestDate] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [result, setResult] = useState<CostBreakdown | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const calculateCost = () => {
    if (!arrestDate || !pickupDate) return;

    const arrest = new Date(arrestDate);
    const pickup = new Date(pickupDate);

    // Calculate days impounded (ceiling to charge partial days)
    const timeDiff = pickup.getTime() - arrest.getTime();
    const daysImpounded = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate costs
    const storageFees = daysImpounded * county.impound_daily_fee;
    const totalCost = storageFees + county.impound_admin_fee;

    // Calculate next charge (midnight tonight)
    const nextCharge = new Date();
    nextCharge.setHours(24, 0, 0, 0);
    const hoursUntilNextCharge = Math.ceil((nextCharge.getTime() - currentTime.getTime()) / (1000 * 60 * 60));

    setResult({
      arrestDate: arrest,
      pickupDate: pickup,
      daysImpounded,
      dailyFee: county.impound_daily_fee,
      storageFees,
      adminFee: county.impound_admin_fee,
      totalCost,
      nextChargeTime: nextCharge,
      hoursUntilNextCharge,
    });
  };

  useEffect(() => {
    if (arrestDate && pickupDate) {
      calculateCost();
    }
  }, [arrestDate, pickupDate, currentTime]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Auto-set arrest date to today if empty
  useEffect(() => {
    if (!arrestDate) {
      const today = new Date();
      setArrestDate(today.toISOString().split('T')[0]);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Sticky Alert */}
      <div className="sticky top-0 z-10 bg-red-50 border-2 border-red-400 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-red-900">
              Daily Storage Fee: {formatCurrency(county.impound_daily_fee)}/day
            </p>
            {result && (
              <p className="text-sm text-red-800 mt-1">
                <Clock className="inline h-4 w-4 mr-1" />
                Next charge in {result.hoursUntilNextCharge} hours (12:00 AM)
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-900">
              ${county.impound_daily_fee}
            </div>
            <div className="text-xs text-red-700">per day</div>
          </div>
        </div>
      </div>

      {/* Calculator Card */}
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              Impound Cost Calculator
            </h2>
            <p className="text-gray-600">
              Calculate how much it will cost to retrieve your vehicle from {county.impound_lot_name || 'the impound lot'} in {county.name}, {county.state_name}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="arrestDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Arrest Date (Vehicle Towed)
              </Label>
              <Input
                id="arrestDate"
                type="date"
                value={arrestDate}
                onChange={(e) => setArrestDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Planned Pickup Date
              </Label>
              <Input
                id="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={arrestDate || undefined}
                className="w-full"
              />
            </div>
          </div>

          {!pickupDate && arrestDate && (
            <div className="text-sm text-gray-500 text-center py-2 bg-gray-50 rounded">
              Select a pickup date to see cost estimate
            </div>
          )}
        </div>
      </Card>

      {/* Cost Breakdown */}
      {result && (
        <Card className="p-6 md:p-8 border-2 border-blue-200 bg-blue-50">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Cost Breakdown
              </h3>
              <p className="text-gray-700">
                From {formatDate(result.arrestDate)} to {formatDate(result.pickupDate)}
              </p>
            </div>

            {/* Calculation Details */}
            <div className="space-y-4 bg-white rounded-lg p-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-700">Days Impounded</span>
                <span className="font-bold text-xl">{result.daysImpounded} days</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <div className="text-gray-700">Daily Storage Fee</div>
                  <div className="text-sm text-gray-500">{result.daysImpounded} days × {formatCurrency(result.dailyFee)}/day</div>
                </div>
                <span className="font-bold text-xl">{formatCurrency(result.storageFees)}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <div className="text-gray-700">Administrative Fee</div>
                  <div className="text-sm text-gray-500">One-time charge</div>
                </div>
                <span className="font-bold text-xl">{formatCurrency(result.adminFee)}</span>
              </div>

              <div className="flex justify-between items-center pt-3 bg-blue-100 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                <div>
                  <div className="text-blue-900 font-bold text-lg">TOTAL CASH NEEDED</div>
                  <div className="text-sm text-blue-700">Amount to bring for pickup</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-900">{formatCurrency(result.totalCost)}</div>
                </div>
              </div>
            </div>

            {/* Warning for high costs */}
            {result.totalCost > 500 && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900">High Storage Costs</p>
                    <p className="text-sm text-orange-800 mt-1">
                      Costs increase by {formatCurrency(county.impound_daily_fee)} every day. Consider retrieving your vehicle as soon as possible to avoid further charges.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Payment & Location Info */}
      {result && (
        <Card className="p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            Payment & Pickup Information
          </h3>

          <div className="space-y-4">
            {county.impound_lot_name && (
              <div>
                <div className="font-medium text-gray-900">Impound Lot</div>
                <div className="text-gray-700">{county.impound_lot_name}</div>
              </div>
            )}

            {county.impound_lot_address && (
              <div>
                <div className="font-medium text-gray-900">Address</div>
                <div className="text-gray-700">{county.impound_lot_address}</div>
              </div>
            )}

            {county.impound_release_hours && (
              <div>
                <div className="font-medium text-gray-900">Release Hours</div>
                <div className="text-gray-700">{county.impound_release_hours}</div>
              </div>
            )}

            {county.impound_payment_methods && (
              <div>
                <div className="font-medium text-gray-900 mb-2">Accepted Payment Methods</div>
                <div className="flex flex-wrap gap-2">
                  {county.impound_payment_methods.split(',').map((method, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {method.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Important Reminders</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Bring valid photo ID and vehicle registration</li>
                  <li>Proof of insurance may be required</li>
                  <li>Only exact amounts shown above - no credit cards for storage fees at some lots</li>
                  <li>Call ahead to verify current balance and payment requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
