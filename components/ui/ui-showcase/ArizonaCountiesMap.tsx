'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface ArizonaCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string, slug: string) => void;
  navigateOnClick?: boolean;
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
const getCountyColor = (county: string, isHovered: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const saturation = isHovered ? 50 : 40 + (seed % 30);
  const lightness = isHovered ? 50 : 45 + (seed % 15);
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

// Convert county name to URL slug
const toSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const ArizonaCountiesMap: React.FC<ArizonaCountiesMapProps> = ({
  title,
  description,
  className = "",
  onCountyClick,
  navigateOnClick = true,
}) => {
  const router = useRouter();
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  const handleCountyClick = (county: string) => {
    if (!county) return;

    const slug = toSlug(county);

    if (onCountyClick) {
      onCountyClick(county, slug);
    }

    if (navigateOnClick) {
      router.push(`/arizona/${slug}`);
    }
  };

  return (
    <div className={`${className}`}>
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && (
            <h3 className="font-heading text-xl text-foreground mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
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
              className={`w-12 h-12 md:w-14 md:h-14 rounded-md flex items-center justify-center text-[11px] md:text-sm font-medium transition-all duration-200 ${
                county
                  ? "hover:scale-110 hover:shadow-lg cursor-pointer"
                  : "bg-transparent"
              }`}
              style={{
                backgroundColor: getCountyColor(county, hoveredCounty === county),
                color: county ? "hsl(160 30% 15%)" : "transparent",
              }}
              title={county ? `${countyNames[county] || county} - Click for DUI guide` : undefined}
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
      <div className="mt-4 text-center h-6">
        {hoveredCounty && (
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{countyNames[hoveredCounty]}</span>
            <span className="text-primary ml-2">→ View DUI guide</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ArizonaCountiesMap;
