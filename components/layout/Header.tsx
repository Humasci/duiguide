import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">DUI Guide</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/for-attorneys"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Attorneys
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a href="tel:+18005551234" className="hidden sm:inline-flex">
            <Button variant="default" size="default">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">Call 24/7</span>
              <span className="lg:hidden">Call Now</span>
            </Button>
          </a>

          <a href="tel:+18005551234" className="sm:hidden">
            <Button variant="default" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
