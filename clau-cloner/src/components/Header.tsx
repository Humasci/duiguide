import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  pageType?: "skills" | "pricing" | "life-sciences";
}

const Header = ({ pageType = "skills" }: HeaderProps) => {
  const getSubNavContent = () => {
    switch (pageType) {
      case "pricing":
        return { label: "Pricing", showExplore: true };
      case "life-sciences":
        return { label: "Solutions / Life sciences", showExplore: true };
      default:
        return { label: "Skills", showExplore: true };
    }
  };

  const subNav = getSubNavContent();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-heading text-xl font-bold text-foreground">Claude</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Meet Claude", href: "/" },
            { label: "Platform", href: "/economic-futures" },
            { label: "Solutions", href: "/solutions/life-sciences" },
            { label: "Pricing", href: "/pricing" },
            { label: "Components", href: "/components" },
            { label: "Dark Theme", href: "/dark-theme" },
            { label: "Learn", href: "/learn/resources", hasDropdown: true },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
              <ChevronDown className="h-4 w-4" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex text-sm font-medium">
            Contact sales
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5">
            Try Claude
          </Button>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="border-t border-border">
        <div className="container flex h-12 items-center justify-between">
          <span className="text-sm font-medium text-foreground">{subNav.label}</span>
          {subNav.showExplore && (
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Explore here
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;