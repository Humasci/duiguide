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

// Priority counties for Arizona
const priorityCounties = ['Maricopa', 'Pima', 'Pinal', 'Yavapai', 'Yuma', 'Mohave', 'Coconino', 'Cochise', 'Navajo', 'Apache'];

// Check if county is a priority county
const isPriorityCounty = (county: string) => priorityCounties.includes(county);

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

  const getTileStyles = (county: string, isHovered: boolean) => {
    if (!county) return { backgroundColor: "transparent", color: "transparent" };

    const isPriority = isPriorityCounty(county);

    if (isPriority) {
      return {
        backgroundColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.85)",
        color: "hsl(var(--primary-foreground))",
        boxShadow: isHovered ? "0 4px 12px hsl(var(--primary) / 0.3)" : "none",
      };
    }

    return {
      backgroundColor: isHovered ? "hsl(var(--primary) / 0.15)" : "hsl(var(--primary) / 0.08)",
      color: isHovered ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
      boxShadow: isHovered ? "0 2px 8px hsl(var(--primary) / 0.15)" : "none",
    };
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
          {countiesGrid.flat().map((county, i) => {
            const isHovered = hoveredCounty === county;
            const styles = getTileStyles(county, isHovered);
            return (
              <div
                key={i}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-200 ease-out ${
                  county
                    ? "hover:scale-110 hover:-translate-y-0.5 cursor-pointer"
                    : ""
                }`}
                style={styles}
                title={county ? `${countyNames[county] || county} - Click for DUI guide` : undefined}
                onClick={() => handleCountyClick(county)}
                onMouseEnter={() => county && setHoveredCounty(county)}
                onMouseLeave={() => setHoveredCounty(null)}
              >
                {getAbbreviation(county)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hovered county tooltip */}
      <div className="mt-4 text-center h-6">
        {hoveredCounty && (
          <span className="text-sm">
            <span className="font-medium text-foreground">{countyNames[hoveredCounty]}</span>
            <span className="text-primary font-medium ml-2">View guide</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ArizonaCountiesMap;
