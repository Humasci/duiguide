'use client';

import React, { useState } from "react";
import { toast } from "sonner";

export interface TennesseeCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string) => void;
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

// Generate consistent colors for each county
const getCountyColor = (county: string, isHovered: boolean, isSelected: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const saturation = isSelected ? 60 : isHovered ? 50 : 40 + (seed % 30);
  const lightness = isSelected ? 40 : isHovered ? 50 : 45 + (seed % 15);
  return `hsl(30 ${saturation}% ${lightness}%)`;
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

const TennesseeCountiesMap: React.FC<TennesseeCountiesMapProps> = ({
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

      <div className="flex items-center justify-center overflow-x-auto">
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => (
            <div
              key={i}
              className={`w-6 h-6 md:w-8 md:h-8 rounded-sm flex items-center justify-center text-[6px] md:text-[7px] font-medium transition-all duration-200 ${
                county
                  ? "hover:scale-110 hover:shadow-lg cursor-pointer"
                  : "bg-transparent"
              } ${selectedCounty === county ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
              style={{
                backgroundColor: getCountyColor(county, hoveredCounty === county, selectedCounty === county),
                color: county ? "hsl(30 30% 15%)" : "transparent",
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

export default TennesseeCountiesMap;
