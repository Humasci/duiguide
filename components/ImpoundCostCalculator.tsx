'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Calendar, Clock, CreditCard, AlertTriangle, Info } from 'lucide-react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const calculateCost = () => {
    if (!arrestDate || !pickupDate) return;

    const arrest = new Date(arrestDate);
    const pickup = new Date(pickupDate);

    const timeDiff = pickup.getTime() - arrest.getTime();
    const daysImpounded = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const storageFees = daysImpounded * county.impound_daily_fee;
    const totalCost = storageFees + county.impound_admin_fee;

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

  useEffect(() => {
    if (!arrestDate) {
      const today = new Date();
      setArrestDate(today.toISOString().split('T')[0]);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-8 ${className}`}>
      {/* Sticky Alert */}
      <div className="sticky top-4 z-10 bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 stroke-[1.5]" />
          <div>
            <p className="font-heading text-lg font-normal text-foreground mb-1">
              Daily Storage Fee: {formatCurrency(county.impound_daily_fee)}/day
            </p>
            {result && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4 stroke-[1.5]" />
                Next charge in {result.hoursUntilNextCharge} hours (12:00 AM)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Calculator Card */}
      <Card className="p-8 md:p-12 rounded-2xl">
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3 flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary stroke-[1.5]" />
              Impound Cost Calculator
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Calculate how much it will cost to retrieve your vehicle from {county.impound_lot_name || 'the impound lot'} in {county.name}, {county.state_name}.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="arrestDate" className="flex items-center gap-2 text-base font-medium">
                <Calendar className="h-5 w-5 text-primary stroke-[1.5]" />
                Arrest Date (Vehicle Towed)
              </Label>
              <Input
                id="arrestDate"
                type="date"
                value={arrestDate}
                onChange={(e) => setArrestDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="h-12 rounded-xl border-2 border-border hover:border-primary/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="pickupDate" className="flex items-center gap-2 text-base font-medium">
                <Calendar className="h-5 w-5 text-primary stroke-[1.5]" />
                Planned Pickup Date
              </Label>
              <Input
                id="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={arrestDate || undefined}
                className="h-12 rounded-xl border-2 border-border hover:border-primary/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {!pickupDate && arrestDate && (
            <div className="text-center py-6 bg-muted/50 rounded-2xl border-2 border-dashed border-border">
              <p className="text-muted-foreground leading-relaxed">Select a pickup date to see cost estimate</p>
            </div>
          )}
        </div>
      </Card>

      {/* Cost Breakdown */}
      {result && (
        <Card className="p-8 md:p-12 border-2 border-primary/30 bg-accent rounded-2xl">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-3">
                Cost Breakdown
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                From {formatDate(result.arrestDate)} to {formatDate(result.pickupDate)}
              </p>
            </div>

            {/* Calculation Details */}
            <div className="space-y-6 bg-background rounded-2xl p-8 border border-border">
              <div className="flex justify-between items-center pb-6 border-b border-border">
                <span className="text-muted-foreground text-lg">Days Impounded</span>
                <span className="font-heading text-2xl text-foreground">{result.daysImpounded} days</span>
              </div>

              <div className="flex justify-between items-center pb-6 border-b border-border">
                <div>
                  <div className="text-foreground text-lg font-medium">Daily Storage Fee</div>
                  <div className="text-sm text-muted-foreground">{result.daysImpounded} days × {formatCurrency(result.dailyFee)}/day</div>
                </div>
                <span className="font-heading text-2xl text-foreground">{formatCurrency(result.storageFees)}</span>
              </div>

              <div className="flex justify-between items-center pb-6 border-b border-border">
                <div>
                  <div className="text-foreground text-lg font-medium">Administrative Fee</div>
                  <div className="text-sm text-muted-foreground">One-time charge</div>
                </div>
                <span className="font-heading text-2xl text-foreground">{formatCurrency(result.adminFee)}</span>
              </div>

              <div className="flex justify-between items-center pt-6 bg-primary/10 border-2 border-primary/30 -mx-8 -mb-8 px-8 py-8 rounded-b-2xl">
                <div>
                  <div className="text-foreground font-heading text-xl mb-1">TOTAL CASH NEEDED</div>
                  <div className="text-sm text-muted-foreground">Amount to bring for pickup</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl md:text-5xl font-heading font-normal text-foreground">{formatCurrency(result.totalCost)}</div>
                </div>
              </div>
            </div>

            {/* Warning for high costs */}
            {result.totalCost > 500 && (
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 stroke-[1.5]" />
                  <div>
                    <p className="font-heading text-lg font-normal text-foreground mb-2">High Storage Costs</p>
                    <p className="text-muted-foreground leading-relaxed">
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
        <Card className="p-8 md:p-12 rounded-2xl">
          <h3 className="font-heading text-2xl font-normal text-foreground mb-6 flex items-center gap-3">
            <CreditCard className="h-7 w-7 text-primary stroke-[1.5]" />
            Payment & Pickup Information
          </h3>

          <div className="space-y-6">
            {county.impound_lot_name && (
              <div>
                <div className="font-medium text-foreground mb-1 text-lg">Impound Lot</div>
                <div className="text-muted-foreground leading-relaxed">{county.impound_lot_name}</div>
              </div>
            )}

            {county.impound_lot_address && (
              <div>
                <div className="font-medium text-foreground mb-1 text-lg">Address</div>
                <div className="text-muted-foreground leading-relaxed">{county.impound_lot_address}</div>
              </div>
            )}

            {county.impound_release_hours && (
              <div>
                <div className="font-medium text-foreground mb-1 text-lg">Release Hours</div>
                <div className="text-muted-foreground leading-relaxed">{county.impound_release_hours}</div>
              </div>
            )}

            {county.impound_payment_methods && (
              <div>
                <div className="font-medium text-foreground mb-3 text-lg">Accepted Payment Methods</div>
                <div className="flex flex-wrap gap-2">
                  {county.impound_payment_methods.split(',').map((method, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-foreground border border-primary/30 rounded-full text-sm font-medium"
                    >
                      {method.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-accent border border-border rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-primary flex-shrink-0 stroke-[1.5]" />
              <div>
                <p className="font-heading text-lg font-normal text-foreground mb-3">Important Reminders</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
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
