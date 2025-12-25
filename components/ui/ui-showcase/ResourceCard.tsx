import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
  type: string;
  title: string;
  href?: string;
  className?: string;
}

const ResourceCard = ({ type, title, href = "#", className }: ResourceCardProps) => {
  return (
    <a
      href={href}
      className={cn(
        "group block bg-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">{type}</p>
      <h3 className="font-heading text-base font-normal text-foreground leading-snug group-hover:text-primary transition-colors">
        {title}
      </h3>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground mt-4 group-hover:text-foreground group-hover:gap-3 transition-all">
        {type}
        <ArrowRight className="h-4 w-4 stroke-[1.5]" />
      </span>
    </a>
  );
};

export default ResourceCard;
