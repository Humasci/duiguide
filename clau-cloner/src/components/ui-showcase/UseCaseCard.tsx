import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  className?: string;
}

const UseCaseCard = ({ 
  icon: Icon, 
  title, 
  description, 
  items,
  className 
}: UseCaseCardProps) => {
  return (
    <div 
      className={cn(
        "bg-background rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-foreground stroke-[1.5]" />
      </div>
      <h3 className="font-heading text-xl font-normal text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        {description}
      </p>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li 
            key={index}
            className="text-sm text-foreground/80 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseCaseCard;
