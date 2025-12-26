import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  price?: string;
  priceSubtext?: string;
  features: string[];
  highlighted?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
  className?: string;
}

const PricingCard = ({
  icon,
  title,
  subtitle,
  price,
  priceSubtext,
  features,
  highlighted,
  buttonText = "Get started",
  buttonVariant = "default",
  className,
}: PricingCardProps) => {
  return (
    <div className={cn(
      "bg-card border border-border rounded-2xl p-6 flex flex-col",
      className
    )}>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="font-heading text-2xl font-normal text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
      
      {price && (
        <>
          <p className="text-3xl font-semibold text-foreground mb-1">{price}</p>
          {priceSubtext && (
            <p className="text-xs text-muted-foreground mb-6">{priceSubtext}</p>
          )}
        </>
      )}

      <Button
        variant={buttonVariant}
        className={cn(
          "w-full rounded-full mb-6",
          buttonVariant === "default" && "bg-foreground text-background hover:bg-foreground/90"
        )}
      >
        {buttonText}
      </Button>

      {highlighted && (
        <p className="font-medium text-sm text-foreground mb-3">{highlighted}</p>
      )}

      <ul className="space-y-3 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <Check className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5 stroke-[1.5]" />
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
