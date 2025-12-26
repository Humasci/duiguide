import Link from "next/link";
import { Scale } from "lucide-react";
import { GENERAL_DISCLAIMER } from "@/lib/constants/disclaimers";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    "Coverage Areas": [
      { label: "Texas", href: "/texas" },
      { label: "Arizona", href: "/arizona" },
      { label: "Georgia", href: "/georgia" },
      { label: "Ohio", href: "/ohio" },
      { label: "Colorado", href: "/colorado" },
    ],
    Resources: [
      { label: "DUI Guide", href: "/guide" },
      { label: "DMV Hearings", href: "/guide/dmv-hearing" },
      { label: "Find Attorney", href: "/find-attorney" },
      { label: "For Attorneys", href: "/for-attorneys" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <footer className="bg-card py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6 text-primary stroke-[1.5]" />
              <span className="font-heading text-lg font-normal text-foreground">DUI Guide</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping people understand their rights and connect with local DUI attorneys.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="mb-6 rounded-2xl bg-muted p-6 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Legal Disclaimer:</strong> {GENERAL_DISCLAIMER}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} DUI Guide. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
