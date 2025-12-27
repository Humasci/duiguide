'use client';
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="text-center py-12 bg-background rounded-2xl" id="get-help">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary stroke-[1.5]" />
        </div>
        <h3 className="font-heading text-2xl font-normal text-foreground mb-2">Thank You!</h3>
        <p className="text-lg text-muted-foreground mb-4">A local attorney will contact you within 24 hours.</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ve connected you with attorneys who specialize in {county.state.dui_laws.terminology} cases in {county.name}.
        </p>
      </div>
    );
  }

  return (
    <div id="get-help">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-background/90 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl bg-background/10 border-2 border-background/20 text-background placeholder-background/50 focus:border-background focus:outline-none focus:ring-0 transition-colors"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-background/90 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-xl bg-background/10 border-2 border-background/20 text-background placeholder-background/50 focus:border-background focus:outline-none focus:ring-0 transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-background/90 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-background/10 border-2 border-background/20 text-background placeholder-background/50 focus:border-background focus:outline-none focus:ring-0 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="case_type" className="block text-sm font-medium text-background/90 mb-2">
            Case Type *
          </label>
          <select
            id="case_type"
            name="case_type"
            required
            className="w-full px-4 py-3 rounded-xl bg-background/10 border-2 border-background/20 text-background focus:border-background focus:outline-none focus:ring-0 transition-colors"
          >
            <option value="" className="text-foreground bg-background">Select...</option>
            <option value="first_offense" className="text-foreground bg-background">First Offense</option>
            <option value="second_offense" className="text-foreground bg-background">Second Offense</option>
            <option value="felony" className="text-foreground bg-background">Felony/Third+ Offense</option>
            <option value="cdl" className="text-foreground bg-background">CDL/Commercial License</option>
            <option value="injury" className="text-foreground bg-background">Accident with Injury</option>
            <option value="other" className="text-foreground bg-background">Other</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="has_attorney"
              className="w-5 h-5 rounded border-2 border-background/30 bg-transparent checked:bg-background checked:border-background focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-sm text-background/80">I already have an attorney</span>
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-background text-foreground hover:bg-background/90 rounded-full py-6 text-base font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get Free Consultation'
          )}
        </Button>

        <p className="text-xs text-center text-background/60 leading-relaxed">
          By submitting, you agree to be contacted by an attorney in {county.name}.
          Your information is secure and will only be shared with qualified {county.state.dui_laws.terminology} attorneys.
        </p>
      </form>
    </div>
  );
}
