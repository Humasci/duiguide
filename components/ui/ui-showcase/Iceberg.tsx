import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

interface IcebergItem {
  id: string;
  title: string;
  description: string;
  level: "visible" | "surface" | "deep" | "hidden";
  href?: string;
  icon?: React.ReactNode;
}

interface IcebergProps {
  title?: string;
  subtitle?: string;
  items: IcebergItem[];
  className?: string;
}

const Iceberg = ({ title, subtitle, items, className }: IcebergProps) => {
  const [revealedLevels, setRevealedLevels] = useState<Set<string>>(new Set(["visible"]));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const levels = ["visible", "surface", "deep", "hidden"] as const;
  const levelLabels = {
    visible: "Visible Costs",
    surface: "Surface Level",
    deep: "Deep Impact",
    hidden: "Hidden Consequences"
  };

  const levelDepthStyles = {
    visible: "bg-background",
    surface: "bg-card",
    deep: "bg-secondary",
    hidden: "bg-muted"
  };

  const toggleLevel = (level: string) => {
    const newRevealed = new Set(revealedLevels);
    if (newRevealed.has(level)) {
      const levelIndex = levels.indexOf(level as typeof levels[number]);
      levels.slice(levelIndex).forEach(l => newRevealed.delete(l));
    } else {
      const levelIndex = levels.indexOf(level as typeof levels[number]);
      levels.slice(0, levelIndex + 1).forEach(l => newRevealed.add(l));
    }
    setRevealedLevels(newRevealed);
  };

  const handleItemClick = (item: IcebergItem) => {
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h3 className="font-heading text-2xl font-normal text-foreground">{title}</h3>
          )}
          {subtitle && (
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          )}
        </div>
      )}

      {/* Iceberg visualization */}
      <div className="relative">
        {/* Water line indicator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">waterline</span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>

        {/* Levels */}
        <div className="space-y-3">
          {levels.map((level, levelIndex) => {
            const levelItems = items.filter(item => item.level === level);
            const isRevealed = revealedLevels.has(level);
            const isAboveWater = levelIndex === 0;

            return (
              <div
                key={level}
                className={cn(
                  "rounded-2xl overflow-hidden transition-all duration-300",
                  levelDepthStyles[level],
                  !isRevealed && !isAboveWater && "opacity-40"
                )}
              >
                {/* Level header */}
                <button
                  onClick={() => toggleLevel(level)}
                  className="w-full flex items-center justify-between p-4 hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center">
                      {isRevealed ? (
                        <Eye className="w-4 h-4 text-foreground stroke-[1.5]" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground stroke-[1.5]" />
                      )}
                    </div>
                    <span className="font-heading text-base font-normal text-foreground">
                      {levelLabels[level]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {levelItems.length} {levelItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-300 stroke-[1.5]",
                      isRevealed && "rotate-180"
                    )} 
                  />
                </button>

                {/* Level items */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isRevealed ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-4 pb-4 space-y-2">
                    {levelItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={cn(
                          "w-full text-left p-4 rounded-xl bg-background transition-all duration-300",
                          "hover:shadow-lg",
                          hoveredItem === item.id && "shadow-lg"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {item.icon && (
                            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center flex-shrink-0">
                              <span className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[1.5] [&>svg]:text-foreground">{item.icon}</span>
                            </div>
                          )}
                          <div>
                            <h4 className="font-heading text-base font-normal text-foreground">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reveal all button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            if (revealedLevels.size === levels.length) {
              setRevealedLevels(new Set(["visible"]));
            } else {
              setRevealedLevels(new Set(levels));
            }
          }}
          className="px-6 py-3 text-sm font-medium text-foreground bg-card hover:bg-secondary rounded-full transition-colors flex items-center gap-2"
        >
          {revealedLevels.size === levels.length ? (
            <>
              <EyeOff className="w-4 h-4 stroke-[1.5]" />
              Hide all layers
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 stroke-[1.5]" />
              Reveal all layers
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Iceberg;
