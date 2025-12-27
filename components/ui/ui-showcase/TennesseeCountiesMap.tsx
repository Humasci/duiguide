'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface TennesseeCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string, slug: string) => void;
  navigateOnClick?: boolean;
}

// Tennessee counties grid - simplified representation (95 counties)
const countiesGrid = [
  ["Lake", "Obion", "Weakley", "Henry", "Stewart", "Montgomery", "Robertson", "Sumner", "Macon", "Clay", "Pickett", "Scott", "Campbell", "Claiborne", "Hancock", "Hawkins", "Sullivan"],
  ["", "Dyer", "Gibson", "Carroll", "Benton", "Houston", "Cheatham", "Davidson", "Wilson", "Trousdale", "Jackson", "Overton", "Fentress", "Morgan", "Anderson", "Union", "Grainger", "Johnson"],
  ["Lauderdale", "Crockett", "Madison", "Henderson", "Decatur", "Humphreys", "Dickson", "Williamson", "Rutherford", "Smith", "Putnam", "Cumberland", "Roane", "Knox", "Jefferson", "Hamblen", "Greene", "Washington"],
  ["Tipton", "Haywood", "Chester", "Perry", "Hickman", "Lewis", "Maury", "Marshall", "Bedford", "DeKalb", "White", "Van Buren", "Rhea", "Loudon", "Blount", "Sevier", "Cocke", "Unicoi"],
  ["Shelby", "Fayette", "Hardeman", "McNairy", "Hardin", "Wayne", "Lawrence", "Giles", "Lincoln", "Moore", "Coffee", "Warren", "Grundy", "Sequatchie", "Hamilton", "Meigs", "McMinn", "Monroe", "Carter"],
  ["", "", "", "", "", "", "", "", "Franklin", "Marion", "Bledsoe", "Bradley", "Polk", "", "", "", "", "", ""],
];

// County full names
const countyNames: Record<string, string> = {
  Anderson: "Anderson County", Bedford: "Bedford County", Benton: "Benton County",
  Bledsoe: "Bledsoe County", Blount: "Blount County", Bradley: "Bradley County",
  Campbell: "Campbell County", Cannon: "Cannon County", Carroll: "Carroll County",
  Carter: "Carter County", Cheatham: "Cheatham County", Chester: "Chester County",
  Claiborne: "Claiborne County", Clay: "Clay County", Cocke: "Cocke County",
  Coffee: "Coffee County", Crockett: "Crockett County", Cumberland: "Cumberland County",
  Davidson: "Davidson County", DeKalb: "DeKalb County", Decatur: "Decatur County",
  Dickson: "Dickson County", Dyer: "Dyer County", Fayette: "Fayette County",
  Fentress: "Fentress County", Franklin: "Franklin County", Gibson: "Gibson County",
  Giles: "Giles County", Grainger: "Grainger County", Greene: "Greene County",
  Grundy: "Grundy County", Hamblen: "Hamblen County", Hamilton: "Hamilton County",
  Hancock: "Hancock County", Hardeman: "Hardeman County", Hardin: "Hardin County",
  Hawkins: "Hawkins County", Haywood: "Haywood County", Henderson: "Henderson County",
  Henry: "Henry County", Hickman: "Hickman County", Houston: "Houston County",
  Humphreys: "Humphreys County", Jackson: "Jackson County", Jefferson: "Jefferson County",
  Johnson: "Johnson County", Knox: "Knox County", Lake: "Lake County",
  Lauderdale: "Lauderdale County", Lawrence: "Lawrence County", Lewis: "Lewis County",
  Lincoln: "Lincoln County", Loudon: "Loudon County", Macon: "Macon County",
  Madison: "Madison County", Marion: "Marion County", Marshall: "Marshall County",
  Maury: "Maury County", McMinn: "McMinn County", McNairy: "McNairy County",
  Meigs: "Meigs County", Monroe: "Monroe County", Montgomery: "Montgomery County",
  Moore: "Moore County", Morgan: "Morgan County", Obion: "Obion County",
  Overton: "Overton County", Perry: "Perry County", Pickett: "Pickett County",
  Polk: "Polk County", Putnam: "Putnam County", Rhea: "Rhea County",
  Roane: "Roane County", Robertson: "Robertson County", Rutherford: "Rutherford County",
  Scott: "Scott County", Sequatchie: "Sequatchie County", Sevier: "Sevier County",
  Shelby: "Shelby County", Smith: "Smith County", Stewart: "Stewart County",
  Sullivan: "Sullivan County", Sumner: "Sumner County", Tipton: "Tipton County",
  Trousdale: "Trousdale County", Unicoi: "Unicoi County", Union: "Union County",
  "Van Buren": "Van Buren County", Warren: "Warren County", Washington: "Washington County",
  Wayne: "Wayne County", Weakley: "Weakley County", White: "White County",
  Williamson: "Williamson County", Wilson: "Wilson County",
};

// Generate consistent colors for each county - using warm primary tones
const getCountyColor = (county: string, isHovered: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Use warm hues matching theme
  const hue = 28 + (seed % 12);
  const saturation = isHovered ? 55 : 35 + (seed % 20);
  const lightness = isHovered ? 55 : 50 + (seed % 12);
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};

// Get 4-letter abbreviated name for display
const getAbbreviation = (county: string): string => {
  if (!county) return "";
  const words = county.split(' ');
  if (words.length > 1) {
    return (words[0].substring(0, 2) + words[1].substring(0, 2)).toUpperCase();
  }
  return county.substring(0, 4).toUpperCase();
};

// Convert county name to URL slug
const toSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const TennesseeCountiesMap: React.FC<TennesseeCountiesMapProps> = ({
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
      router.push(`/tennessee/${slug}`);
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

      <div className="flex items-center justify-center overflow-x-auto pb-2">
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => {
            const isHovered = hoveredCounty === county;
            return (
              <div
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md flex items-center justify-center text-[6px] sm:text-[7px] md:text-[8px] font-semibold transition-all duration-200 ease-out ${
                  county
                    ? "hover:scale-110 hover:-translate-y-0.5 cursor-pointer"
                    : "bg-transparent"
                }`}
                style={{
                  backgroundColor: getCountyColor(county, isHovered),
                  color: county ? "hsl(28 40% 20%)" : "transparent",
                  boxShadow: isHovered && county ? "0 3px 10px hsl(28 50% 50% / 0.3)" : "none",
                }}
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
      <div className="mt-3 text-center h-5">
        {hoveredCounty && (
          <span className="text-sm">
            <span className="font-medium text-foreground">{countyNames[hoveredCounty]}</span>
            <span className="text-primary font-medium ml-2">→ View guide</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default TennesseeCountiesMap;
