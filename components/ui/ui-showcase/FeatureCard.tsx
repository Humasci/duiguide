import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  variant?: "default" | "centered" | "minimal";
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  variant = "default" 
}: FeatureCardProps) => {
  if (variant === "centered") {
    return (
      <div className={cn("text-center", className)}>
        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mx-auto mb-4">
          <Icon className="h-6 w-6 text-foreground stroke-[1.5]" />
        </div>
        <h3 className="font-heading text-xl font-normal text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("text-center", className)}>
        <h3 className="font-heading text-xl font-normal text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "group p-6 rounded-2xl hover:bg-card transition-colors duration-300",
        className
      )}
    >
      <Icon className="h-8 w-8 text-primary mb-4 stroke-[1.5]" />
      <h3 className="font-heading text-xl font-normal text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
