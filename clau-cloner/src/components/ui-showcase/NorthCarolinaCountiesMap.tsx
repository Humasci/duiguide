import React, { useState } from "react";
import { toast } from "sonner";

export interface NorthCarolinaCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string) => void;
}

// North Carolina counties grid - simplified representation
const countiesGrid = [
  ["Ashe", "Alleghany", "Surry", "Stokes", "Rockingham", "Caswell", "Person", "Granville", "Vance", "Warren", "Northampton", "Hertford", "Gates", "Currituck"],
  ["Watauga", "Wilkes", "Yadkin", "Forsyth", "Guilford", "Alamance", "Orange", "Durham", "Franklin", "Halifax", "Bertie", "Chowan", "Pasquotank", "Camden"],
  ["Avery", "Caldwell", "Alexander", "Davie", "Davidson", "Randolph", "Chatham", "Wake", "Nash", "Edgecombe", "Martin", "Washington", "Tyrrell", "Dare"],
  ["Mitchell", "Burke", "Catawba", "Iredell", "Rowan", "Montgomery", "Lee", "Harnett", "Johnston", "Wilson", "Pitt", "Beaufort", "Hyde", ""],
  ["Yancey", "McDowell", "Lincoln", "Gaston", "Mecklenburg", "Stanly", "Moore", "Cumberland", "Sampson", "Wayne", "Greene", "Lenoir", "Craven", "Pamlico"],
  ["Madison", "Buncombe", "Rutherford", "Cleveland", "Cabarrus", "Union", "Anson", "Richmond", "Hoke", "Robeson", "Duplin", "Jones", "Carteret", ""],
  ["Haywood", "Henderson", "Polk", "", "", "", "Scotland", "Bladen", "Columbus", "Pender", "Onslow", "", "", ""],
  ["Swain", "Transylvania", "", "", "", "", "", "Brunswick", "New Hanover", "", "", "", "", ""],
  ["Jackson", "Macon", "Cherokee", "Clay", "Graham", "", "", "", "", "", "", "", "", ""],
];

// County full names
const countyNames: Record<string, string> = {
  Alamance: "Alamance County", Alexander: "Alexander County", Alleghany: "Alleghany County",
  Anson: "Anson County", Ashe: "Ashe County", Avery: "Avery County", Beaufort: "Beaufort County",
  Bertie: "Bertie County", Bladen: "Bladen County", Brunswick: "Brunswick County",
  Buncombe: "Buncombe County", Burke: "Burke County", Cabarrus: "Cabarrus County",
  Caldwell: "Caldwell County", Camden: "Camden County", Carteret: "Carteret County",
  Caswell: "Caswell County", Catawba: "Catawba County", Chatham: "Chatham County",
  Cherokee: "Cherokee County", Chowan: "Chowan County", Clay: "Clay County",
  Cleveland: "Cleveland County", Columbus: "Columbus County", Craven: "Craven County",
  Cumberland: "Cumberland County", Currituck: "Currituck County", Dare: "Dare County",
  Davidson: "Davidson County", Davie: "Davie County", Duplin: "Duplin County",
  Durham: "Durham County", Edgecombe: "Edgecombe County", Forsyth: "Forsyth County",
  Franklin: "Franklin County", Gaston: "Gaston County", Gates: "Gates County",
  Graham: "Graham County", Granville: "Granville County", Greene: "Greene County",
  Guilford: "Guilford County", Halifax: "Halifax County", Harnett: "Harnett County",
  Haywood: "Haywood County", Henderson: "Henderson County", Hertford: "Hertford County",
  Hoke: "Hoke County", Hyde: "Hyde County", Iredell: "Iredell County",
  Jackson: "Jackson County", Johnston: "Johnston County", Jones: "Jones County",
  Lee: "Lee County", Lenoir: "Lenoir County", Lincoln: "Lincoln County",
  Macon: "Macon County", Madison: "Madison County", Martin: "Martin County",
  McDowell: "McDowell County", Mecklenburg: "Mecklenburg County", Mitchell: "Mitchell County",
  Montgomery: "Montgomery County", Moore: "Moore County", Nash: "Nash County",
  "New Hanover": "New Hanover County", Northampton: "Northampton County", Onslow: "Onslow County",
  Orange: "Orange County", Pamlico: "Pamlico County", Pasquotank: "Pasquotank County",
  Pender: "Pender County", Perquimans: "Perquimans County", Person: "Person County",
  Pitt: "Pitt County", Polk: "Polk County", Randolph: "Randolph County",
  Richmond: "Richmond County", Robeson: "Robeson County", Rockingham: "Rockingham County",
  Rowan: "Rowan County", Rutherford: "Rutherford County", Sampson: "Sampson County",
  Scotland: "Scotland County", Stanly: "Stanly County", Stokes: "Stokes County",
  Surry: "Surry County", Swain: "Swain County", Transylvania: "Transylvania County",
  Tyrrell: "Tyrrell County", Union: "Union County", Vance: "Vance County",
  Wake: "Wake County", Warren: "Warren County", Washington: "Washington County",
  Watauga: "Watauga County", Wayne: "Wayne County", Wilkes: "Wilkes County",
  Wilson: "Wilson County", Yadkin: "Yadkin County", Yancey: "Yancey County",
};

// Generate consistent colors for each county
const getCountyColor = (county: string, isHovered: boolean, isSelected: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const saturation = isSelected ? 60 : isHovered ? 50 : 40 + (seed % 30);
  const lightness = isSelected ? 40 : isHovered ? 50 : 45 + (seed % 15);
  return `hsl(340 ${saturation}% ${lightness}%)`;
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

const NorthCarolinaCountiesMap: React.FC<NorthCarolinaCountiesMapProps> = ({
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
          style={{ gridTemplateColumns: "repeat(14, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => (
            <div
              key={i}
              className={`w-7 h-7 md:w-9 md:h-9 rounded-sm flex items-center justify-center text-[7px] md:text-[8px] font-medium transition-all duration-200 ${
                county
                  ? "hover:scale-110 hover:shadow-lg cursor-pointer"
                  : "bg-transparent"
              } ${selectedCounty === county ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
              style={{
                backgroundColor: getCountyColor(county, hoveredCounty === county, selectedCounty === county),
                color: county ? "hsl(340 30% 15%)" : "transparent",
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

export default NorthCarolinaCountiesMap;
