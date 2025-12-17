'use client';

import Link from "next/link";
import { Phone, Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Resources', href: '/resources' },
    { name: 'States', href: '/#select-state' },
    { name: 'About', href: '/about' },
    { name: 'For Attorneys', href: '/for-attorneys' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none">DUI Guide</span>
              <span className="text-xs text-muted-foreground leading-none">Legal Help 24/7</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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
        </div>

        {/* Right Side: CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a href="tel:+18005551234" className="hidden sm:inline-flex">
            <Button variant="default" size="default" className="gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">Call 24/7</span>
              <span className="lg:hidden">Call Now</span>
            </Button>
          </a>

          {/* Mobile CTA Icon */}
          <a href="tel:+18005551234" className="sm:hidden">
            <Button variant="default" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t">
              <a href="tel:+18005551234" className="block">
                <Button variant="default" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now - 24/7 Help
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
