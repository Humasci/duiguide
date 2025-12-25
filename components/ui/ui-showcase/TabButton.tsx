import { cn } from "@/lib/utils";

interface TabButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: "pill" | "segment";
  className?: string;
}

const TabButton = ({ 
  children, 
  active = false, 
  onClick, 
  variant = "pill",
  className 
}: TabButtonProps) => {
  if (variant === "segment") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "px-6 py-2 text-sm font-medium rounded-full transition-colors",
          active
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
          className
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-full text-sm font-medium border transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background hover:bg-muted",
        className
      )}
    >
      {children}
    </button>
  );
};

interface TabGroupProps {
  children: React.ReactNode;
  variant?: "pill" | "segment";
  className?: string;
}

export const TabGroup = ({ children, variant = "pill", className }: TabGroupProps) => {
  if (variant === "segment") {
    return (
      <div className={cn("inline-flex bg-muted rounded-full p-1", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap justify-center gap-3", className)}>
      {children}
    </div>
  );
};

export default TabButton;
