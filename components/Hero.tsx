'use client';

import { MapPin, Clock, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  h1: string;
  deadlineAlert: string;
  intro: string;
  county: {
    name: string;
    state: {
      name: string;
      abbreviation: string;
    };
  };
}

export default function Hero({ h1, deadlineAlert, intro, county }: HeroProps) {
  return (
    <section className="bg-card border-b border-border">
      <div className="container max-w-4xl py-16 md:py-20">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-6">
          <MapPin className="w-4 h-4 text-primary stroke-[1.5]" />
          <span className="text-sm font-medium text-foreground">{county.name}, {county.state.abbreviation}</span>
        </div>

        {/* H1 */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6 text-foreground">
          {h1}
        </h1>

        {/* Deadline Alert */}
        <div className="bg-destructive/10 border-2 border-destructive/30 p-6 mb-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5 stroke-[1.5]" />
            <div>
              <p className="font-heading text-lg font-normal text-foreground mb-1">Time-Sensitive Deadline</p>
              <p className="text-muted-foreground leading-relaxed">{deadlineAlert}</p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          {intro}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium"
          >
            <a href="#checklist">
              <FileText className="h-4 w-4" />
              View Checklist
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-medium border-2"
          >
            <a href="#get-help">
              <Phone className="h-4 w-4" />
              Talk to Attorney
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
