'use client';
import { useState } from 'react';

interface County {
  id: number;
  name: string;
  state: {
    name: string;
    abbreviation: string;
    dui_laws: {
      terminology: string;
    };
  };
}

interface LeadFormProps {
  county: County;
}

export default function LeadForm({ county }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      // Send to backend/4LegalLeads
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          case_type: formData.get('case_type'),
          has_attorney: formData.get('has_attorney') === 'on',
          county_id: county.id,
          county_name: county.name,
          state: county.state.abbreviation,
          terminology: county.state.dui_laws.terminology
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (submitted) {
    return (
      <div className="text-center py-12" id="get-help">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-lg">A local attorney will contact you within 24 hours.</p>
        <p className="text-sm mt-4 opacity-75">
          We've connected you with attorneys who specialize in {county.state.dui_laws.terminology} cases in {county.name}.
        </p>
      </div>
    );
  }
  
  return (
    <div id="get-help">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="case_type" className="block text-sm font-medium mb-2">
            Case Type *
          </label>
          <select
            id="case_type"
            name="case_type"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="" className="text-gray-900">Select...</option>
            <option value="first_offense" className="text-gray-900">First Offense</option>
            <option value="second_offense" className="text-gray-900">Second Offense</option>
            <option value="felony" className="text-gray-900">Felony/Third+ Offense</option>
            <option value="cdl" className="text-gray-900">CDL/Commercial License</option>
            <option value="injury" className="text-gray-900">Accident with Injury</option>
            <option value="other" className="text-gray-900">Other</option>
          </select>
        </div>
        
        <div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="has_attorney"
              className="w-5 h-5 rounded border-2"
            />
            <span className="text-sm">I already have an attorney</span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors shadow-lg ${
            loading 
              ? 'bg-yellow-300 text-blue-800 cursor-not-allowed' 
              : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
          }`}
        >
          {loading ? 'Submitting...' : 'Get Free Consultation'}
        </button>
        
        <p className="text-xs text-center text-white/70">
          By submitting, you agree to be contacted by an attorney in {county.name}. 
          Your information is secure and will only be shared with qualified {county.state.dui_laws.terminology} attorneys.
        </p>
      </form>
    </div>
  );
}