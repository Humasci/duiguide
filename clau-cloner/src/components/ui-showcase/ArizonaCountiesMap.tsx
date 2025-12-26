import React, { useState } from "react";
import { toast } from "sonner";

export interface ArizonaCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string) => void;
}

// Arizona counties grid - one tile per county, approximating the state shape
const countiesGrid = [
  ["Mohave", "Coconino", "Navajo", "Apache"],
  ["La Paz", "Yavapai", "Gila", "Greenlee"],
  ["Yuma", "Maricopa", "Pinal", "Graham"],
  ["", "Pima", "Santa Cruz", "Cochise"],
];

// County full names
const countyNames: Record<string, string> = {
  Apache: "Apache County",
  Cochise: "Cochise County",
  Coconino: "Coconino County",
  Gila: "Gila County",
  Graham: "Graham County",
  Greenlee: "Greenlee County",
  "La Paz": "La Paz County",
  Maricopa: "Maricopa County",
  Mohave: "Mohave County",
  Navajo: "Navajo County",
  Pima: "Pima County",
  Pinal: "Pinal County",
  "Santa Cruz": "Santa Cruz County",
  Yavapai: "Yavapai County",
  Yuma: "Yuma County",
};

// Generate consistent colors for each county
const getCountyColor = (county: string, isHovered: boolean, isSelected: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const saturation = isSelected ? 60 : isHovered ? 50 : 40 + (seed % 30);
  const lightness = isSelected ? 40 : isHovered ? 50 : 45 + (seed % 15);
  return `hsl(160 ${saturation}% ${lightness}%)`;
};

// Get 4-letter abbreviated name for display
const getAbbreviation = (county: string): string => {
  if (!county) return "";
  const abbrevMap: Record<string, string> = {
    Apache: "APCH",
    Cochise: "COCH",
    Coconino: "COCO",
    Gila: "GILA",
    Graham: "GRHM",
    Greenlee: "GRNL",
    "La Paz": "LAPZ",
    Maricopa: "MARI",
    Mohave: "MOHV",
    Navajo: "NAVJ",
    Pima: "PIMA",
    Pinal: "PINL",
    "Santa Cruz": "SCRZ",
    Yavapai: "YAVP",
    Yuma: "YUMA",
  };
  return abbrevMap[county] || county.substring(0, 4).toUpperCase();
};

const ArizonaCountiesMap: React.FC<ArizonaCountiesMapProps> = ({
  title,
  description,
  className = "",
  onCountyClick,
}) => {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  const handleCountyClick = (county: string) => {
    if (!county) return;
    
    setSelectedCounty(county === selectedCounty ? null : county);
    onCountyClick?.(county);
    toast.info(`Selected: ${countyNames[county] || county}`);
  };

  return (
    <div className={`bg-card rounded-2xl p-6 md:p-8 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-heading text-xl text-foreground mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      )}
      
      {/* Selected county info */}
      {selectedCounty && (
        <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h4 className="font-semibold text-foreground">{countyNames[selectedCounty] || selectedCounty}</h4>
          <p className="text-sm text-muted-foreground">Click another county to select it, or click again to deselect.</p>
        </div>
      )}

      <div className="flex items-center justify-center">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => (
            <div
              key={i}
              className={`w-9 h-9 md:w-11 md:h-11 rounded-md flex items-center justify-center text-[10px] md:text-xs font-medium transition-all duration-200 ${
                county
                  ? "hover:scale-110 hover:shadow-lg cursor-pointer"
                  : "bg-transparent"
              } ${selectedCounty === county ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
              style={{
                backgroundColor: getCountyColor(county, hoveredCounty === county, selectedCounty === county),
                color: county ? "hsl(160 30% 15%)" : "transparent",
              }}
              title={county ? countyNames[county] || county : undefined}
              onClick={() => handleCountyClick(county)}
              onMouseEnter={() => county && setHoveredCounty(county)}
              onMouseLeave={() => setHoveredCounty(null)}
            >
              {getAbbreviation(county)}
            </div>
          ))}
        </div>
      </div>

      {/* Hovered county tooltip */}
      {hoveredCounty && !selectedCounty && (
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            County: <span className="font-medium text-foreground">{countyNames[hoveredCounty]}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default ArizonaCountiesMap;
