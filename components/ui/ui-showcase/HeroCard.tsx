import { cn } from "@/lib/utils";

interface HeroCardProps {
  children: React.ReactNode;
  className?: string;
}

const HeroCard = ({ children, className }: HeroCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-3xl p-8 md:p-12",
      className
    )}>
      {children}
    </div>
  );
};

interface DocumentCardProps {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
}

export const DocumentCard = ({ title, subtitle, label, className }: DocumentCardProps) => {
  return (
    <div className={cn(
      "bg-background rounded-xl shadow-lg p-4 w-36 md:w-48",
      className
    )}>
      <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center p-4">
        <div className="text-primary font-heading text-[10px] md:text-xs font-bold tracking-wider">{title}</div>
        {subtitle && (
          <div className="text-muted-foreground text-[8px] md:text-[10px] mt-1">{subtitle}</div>
        )}
        <div className="mt-4 w-full space-y-1.5">
          <div className="h-1.5 bg-border rounded w-3/4 mx-auto" />
          <div className="h-1.5 bg-border rounded w-1/2 mx-auto" />
        </div>
      </div>
      {label && (
        <p className="text-xs text-muted-foreground mt-2 italic">{label}</p>
      )}
    </div>
  );
};

interface SkillCardProps {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const SkillCard = ({ label = "SKILL", icon, className }: SkillCardProps) => {
  return (
    <div className={cn(
      "bg-background rounded-xl shadow-lg p-4 w-32 md:w-40",
      className
    )}>
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground/50 font-heading text-lg md:text-xl">{label}</span>
      </div>
      {icon && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
    </div>
  );
};

interface FolderCardProps {
  label: string;
  color?: string;
  className?: string;
}

export const FolderCard = ({ label, color = "bg-sky-400", className }: FolderCardProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className={cn("w-32 md:w-44 h-24 md:h-32 rounded-lg rounded-tl-none shadow-lg", color)} />
      <div className={cn("absolute -top-3 left-0 w-12 md:w-16 h-3 rounded-t-lg", color)} />
      <span className="absolute bottom-3 left-3 text-background/90 text-xs md:text-sm font-medium">{label}</span>
    </div>
  );
};

export default HeroCard;
