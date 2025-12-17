import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, DollarSign, Clock, Zap, Shield, MapPin } from 'lucide-react';

interface SCAMProvider {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  daily_cost_min?: number;
  daily_cost_max?: number;
  setup_fee?: number;
  hours?: string;
  services?: string[];
}

interface SCAMInfoProps {
  state: {
    name: string;
    abbreviation: string;
    dui_laws: {
      terminology: string;
      enhanced_bac_threshold: number;
    };
  };
  county?: {
    name: string;
  };
  providers?: SCAMProvider[];
  className?: string;
}

export function SCAMInfo({ state, county, providers = [], className }: SCAMInfoProps) {
  const terminology = state.dui_laws.terminology;
  
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Shield className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold">SCAM Alcohol Monitoring</h3>
          <p className="text-sm text-gray-600">What you need to know</p>
        </div>
      </div>
      
      {/* When Required */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          When SCAM is Required
        </h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>Second or subsequent {terminology} offense</li>
          <li>High BAC ({state.dui_laws.enhanced_bac_threshold}+ in {state.name})</li>
          <li>Probation violation</li>
          <li>Court-ordered alcohol monitoring</li>
          <li>Pre-trial release condition</li>
        </ul>
      </div>
      
      {/* Cost Breakdown */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center">
          <DollarSign className="w-5 h-5 text-green-500 mr-2" />
          Typical Costs
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Daily Monitoring</p>
            <p className="font-bold text-lg">$10-15</p>
            <p className="text-xs text-gray-600">Per day</p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500">Installation</p>
            <p className="font-bold text-lg">$50-150</p>
            <p className="text-xs text-gray-600">One-time fee</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Monthly cost: approximately $300-450 plus setup
        </p>
      </div>
      
      {/* How it Works */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center">
          <Zap className="w-5 h-5 text-blue-500 mr-2" />
          How SCAM Works
        </h4>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 mt-0.5">1</div>
            <p>Ankle bracelet monitors your sweat every 30 minutes</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 mt-0.5">2</div>
            <p>Detects alcohol consumption within 30 minutes of drinking</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 mt-0.5">3</div>
            <p>Automatically reports violations to court/probation</p>
          </div>
        </div>
      </div>
      
      {/* Important Warnings */}
      <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Warnings</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
          <li>Hand sanitizer and mouthwash can trigger false positives</li>
          <li>Some perfumes and cleaning products may cause readings</li>
          <li>Hair products with alcohol should be avoided</li>
          <li>Notify provider immediately if you suspect a false positive</li>
        </ul>
      </div>
      
      {/* Local Providers */}
      {providers && providers.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <MapPin className="w-5 h-5 text-purple-500 mr-2" />
            {county ? `SCAM Providers in ${county.name}` : `SCAM Providers in ${state.name}`}
          </h4>
          <div className="space-y-3">
            {providers.slice(0, 3).map((provider) => (
              <div key={provider.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium">{provider.name}</h5>
                  {provider.daily_cost_min && (
                    <Badge variant="outline" className="text-xs">
                      ${provider.daily_cost_min}-{provider.daily_cost_max || provider.daily_cost_min}/day
                    </Badge>
                  )}
                </div>
                
                {provider.address && (
                  <p className="text-sm text-gray-600 mb-1">{provider.address}</p>
                )}
                
                {provider.phone && (
                  <p className="text-sm font-medium text-blue-600">{provider.phone}</p>
                )}
                
                {provider.hours && (
                  <p className="text-xs text-gray-500 mt-1">{provider.hours}</p>
                )}
                
                {provider.services && provider.services.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {provider.services.slice(0, 3).map((service, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {providers.length > 3 && (
            <p className="text-sm text-gray-600 mt-3">
              + {providers.length - 3} more providers available
            </p>
          )}
        </div>
      )}
      
      {/* Next Steps */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold mb-3 flex items-center">
          <Clock className="w-5 h-5 text-blue-500 mr-2" />
          Next Steps
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Get court order or probation requirements in writing</li>
          <li>Contact a certified SCAM provider immediately</li>
          <li>Schedule installation appointment (usually within 24-48 hours)</li>
          <li>Bring payment for setup fee and first week&apos;s monitoring</li>
          <li>Attend all required check-ins and payments</li>
        </ol>
      </div>
      
      {/* Contact Help */}
      <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
        <p className="text-sm text-blue-800">
          <strong>Need Help?</strong> SCAM violations can result in jail time. 
          Contact a {terminology} attorney immediately if you receive a violation notice.
        </p>
      </div>
    </Card>
  );
}

export default SCAMInfo;