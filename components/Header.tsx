import { Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  pageType?: "home" | "state" | "guide";
}

const Header = ({ pageType = "home" }: HeaderProps) => {
  const getSubNavContent = () => {
    switch (pageType) {
      case "state":
        return { label: "State Guide", showExplore: true };
      case "guide":
        return { label: "Survival Guide", showExplore: true };
      default:
        return { label: "DUI Legal Help", showExplore: true };
    }
  };

  const subNav = getSubNavContent();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-xl font-semibold text-foreground leading-tight">
            DUI Arrested
          </span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
            DUI DWI Survival Guide
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Home", href: "/" },
            { label: "States", href: "/states" },
            { label: "Rights", href: "/guide/rights" },
            { label: "Process", href: "/guide/process" },
            { label: "Attorneys", href: "/find-attorney" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex text-sm font-medium">
            <Phone className="h-4 w-4" />
            Get Help
          </Button>
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5">
            <a href="tel:8005551234">Call Now</a>
          </Button>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="border-t border-border">
        <div className="container flex h-12 items-center justify-between">
          <span className="text-sm font-medium text-foreground">{subNav.label}</span>
          {subNav.showExplore && (
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Emergency Help Available 24/7
              <Phone className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;