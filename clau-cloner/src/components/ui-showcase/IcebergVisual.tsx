import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface IcebergItem {
  id: string;
  title: string;
  description: string;
  level: "visible" | "surface" | "deep" | "hidden";
  href?: string;
  icon?: React.ReactNode;
}

interface IcebergVisualProps {
  title?: string;
  subtitle?: string;
  items: IcebergItem[];
  className?: string;
}

const IcebergVisual = ({ title, subtitle, items, className }: IcebergVisualProps) => {
  const [revealedLevels, setRevealedLevels] = useState<Set<string>>(new Set(["visible"]));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const levels = ["visible", "surface", "deep", "hidden"] as const;
  const levelLabels = {
    visible: "Visible",
    surface: "Surface",
    deep: "Deep",
    hidden: "Hidden"
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

  const getItemsForLevel = (level: string) => items.filter(item => item.level === level);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
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

      {/* Iceberg visualization with SVG background */}
      <div className="relative">
        {/* SVG Iceberg Background */}
        <svg
          viewBox="0 0 400 600"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Sky/Air background */}
          <rect x="0" y="0" width="400" height="150" fill="hsl(var(--background))" />
          
          {/* Water background with gradient */}
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(200, 60%, 85%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(200, 70%, 70%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(210, 80%, 50%)" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="icebergGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
            <filter id="icebergShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.15" />
            </filter>
          </defs>
          
          <rect x="0" y="150" width="400" height="450" fill="url(#waterGradient)" />
          
          {/* Water line */}
          <line x1="0" y1="150" x2="400" y2="150" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="8 4" />
          
          {/* Iceberg shape - sketchy hand-drawn style */}
          <path
            d="M200 30 
               L240 60 L260 50 L280 80 L290 75 L300 100 L310 95 L320 130 L310 145
               L350 160 L360 200 L370 250 L365 300 L380 350 L370 400 L360 450 L340 500 L300 530 L260 550 L200 570 L140 550 L100 530 L60 500 L40 450 L30 400 L20 350 L35 300 L30 250 L40 200 L50 160
               L90 145 L80 130 L90 95 L100 100 L110 75 L120 80 L140 50 L160 60 L200 30Z"
            fill="url(#icebergGradient)"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            filter="url(#icebergShadow)"
            className="transition-all duration-500"
          />
          
          {/* Sketchy detail lines on iceberg */}
          <path
            d="M180 50 L170 80 M220 55 L235 85 M160 90 L140 120 M240 88 L260 115"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M120 180 L100 220 M280 175 L300 210 M90 280 L70 320 M310 275 L330 310 M80 380 L60 420 M320 370 L340 410"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
          
          {/* Visible level - above water */}
          <foreignObject x="100" y="60" width="200" height="80">
            <div className="h-full flex flex-col items-center justify-center p-2">
              <button
                onClick={() => toggleLevel("visible")}
                className={cn(
                  "text-xs font-heading px-3 py-1.5 rounded-full transition-all",
                  revealedLevels.has("visible") 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {levelLabels.visible}
              </button>
              {revealedLevels.has("visible") && getItemsForLevel("visible").length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {getItemsForLevel("visible").map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "text-[10px] px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm transition-all",
                        "hover:bg-background hover:shadow-md",
                        hoveredItem === item.id && "ring-1 ring-primary/30"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </foreignObject>
          
          {/* Surface level */}
          <foreignObject x="80" y="170" width="240" height="90">
            <div className="h-full flex flex-col items-center justify-center p-2">
              <button
                onClick={() => toggleLevel("surface")}
                className={cn(
                  "text-xs font-heading px-3 py-1.5 rounded-full transition-all",
                  revealedLevels.has("surface") 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted/60 text-muted-foreground",
                  !revealedLevels.has("surface") && "opacity-60"
                )}
              >
                {levelLabels.surface}
              </button>
              {revealedLevels.has("surface") && getItemsForLevel("surface").length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[220px]">
                  {getItemsForLevel("surface").map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "text-[10px] px-2 py-1 rounded-lg bg-background/70 backdrop-blur-sm transition-all",
                        "hover:bg-background hover:shadow-md",
                        hoveredItem === item.id && "ring-1 ring-primary/30"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </foreignObject>
          
          {/* Deep level */}
          <foreignObject x="60" y="290" width="280" height="120">
            <div className="h-full flex flex-col items-center justify-center p-2">
              <button
                onClick={() => toggleLevel("deep")}
                className={cn(
                  "text-xs font-heading px-3 py-1.5 rounded-full transition-all",
                  revealedLevels.has("deep") 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted/40 text-muted-foreground",
                  !revealedLevels.has("deep") && "opacity-50"
                )}
              >
                {levelLabels.deep}
              </button>
              {revealedLevels.has("deep") && getItemsForLevel("deep").length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[260px]">
                  {getItemsForLevel("deep").map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "text-[10px] px-2 py-1 rounded-lg bg-background/60 backdrop-blur-sm transition-all",
                        "hover:bg-background/80 hover:shadow-md",
                        hoveredItem === item.id && "ring-1 ring-primary/30"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </foreignObject>
          
          {/* Hidden level */}
          <foreignObject x="80" y="440" width="240" height="120">
            <div className="h-full flex flex-col items-center justify-center p-2">
              <button
                onClick={() => toggleLevel("hidden")}
                className={cn(
                  "text-xs font-heading px-3 py-1.5 rounded-full transition-all",
                  revealedLevels.has("hidden") 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted/30 text-muted-foreground",
                  !revealedLevels.has("hidden") && "opacity-40"
                )}
              >
                {levelLabels.hidden}
              </button>
              {revealedLevels.has("hidden") && getItemsForLevel("hidden").length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[220px]">
                  {getItemsForLevel("hidden").map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={cn(
                        "text-[10px] px-2 py-1 rounded-lg bg-background/50 backdrop-blur-sm transition-all",
                        "hover:bg-background/70 hover:shadow-md",
                        hoveredItem === item.id && "ring-1 ring-primary/30"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </foreignObject>
          
          {/* Wave decorations */}
          <path
            d="M0 148 Q50 142 100 148 T200 148 T300 148 T400 148"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.2"
            fill="none"
          />
          <path
            d="M0 152 Q50 158 100 152 T200 152 T300 152 T400 152"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.2"
            fill="none"
          />
        </svg>

        {/* Reveal all button */}
        <div className="flex justify-center mt-6">
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
                Hide depths
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 stroke-[1.5]" />
                Reveal all depths
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded item detail panel */}
      {hoveredItem && (
        <div className="mt-6 p-4 bg-card rounded-2xl border border-border/50">
          {items.filter(item => item.id === hoveredItem).map(item => (
            <div key={item.id} className="flex items-start gap-3">
              {item.icon && (
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[1.5] [&>svg]:text-foreground">{item.icon}</span>
                </div>
              )}
              <div>
                <h4 className="font-heading text-base font-normal text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IcebergVisual;
