'use client';

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Resources', href: '/resources' },
    { name: 'States', href: '/#select-state' },
    { name: 'For Attorneys', href: '/for-attorneys' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-foreground leading-tight">
                DUI Arrested
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
                DUI DWI Survival Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side: CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a href="tel:+18005551234" className="hidden sm:inline-flex">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full gap-2 px-6">
                <Phone className="h-4 w-4 stroke-[1.5]" />
                <span>Call 24/7</span>
              </Button>
            </a>

            {/* Mobile CTA */}
            <a href="tel:+18005551234" className="sm:hidden">
              <Button size="icon" className="bg-foreground text-background hover:bg-foreground/90 rounded-full">
                <Phone className="h-4 w-4 stroke-[1.5]" />
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[1.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
