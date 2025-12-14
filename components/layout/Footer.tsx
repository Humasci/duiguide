import Link from "next/link";
import { GENERAL_DISCLAIMER } from "@/lib/constants/disclaimers";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">DUI Guide</h3>
            <p className="text-sm text-muted-foreground">
              Helping people understand their rights and connect with local DUI
              attorneys.
            </p>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Coverage Areas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/texas" className="hover:text-foreground">
                  Texas
                </Link>
              </li>
              <li>
                <Link href="/arizona" className="hover:text-foreground">
                  Arizona
                </Link>
              </li>
              <li>
                <Link href="/california" className="hover:text-foreground">
                  California
                </Link>
              </li>
              <li>
                <Link href="/florida" className="hover:text-foreground">
                  Florida
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/for-attorneys" className="hover:text-foreground">
                  For Attorneys
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="mb-4 rounded-lg bg-muted p-4 text-xs text-muted-foreground">
            <strong>Legal Disclaimer:</strong> {GENERAL_DISCLAIMER}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} DUI Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
