'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface NorthCarolinaCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string, slug: string) => void;
  navigateOnClick?: boolean;
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

// Priority counties for North Carolina
const priorityCounties = ['Mecklenburg', 'Wake', 'Guilford', 'Forsyth', 'Cumberland', 'Durham', 'Buncombe', 'Gaston', 'New Hanover', 'Union'];

// Check if county is a priority county
const isPriorityCounty = (county: string) => priorityCounties.includes(county);

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

const NorthCarolinaCountiesMap: React.FC<NorthCarolinaCountiesMapProps> = ({
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
      router.push(`/north-carolina/${slug}`);
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

      <div className="flex items-center justify-center overflow-x-auto">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(14, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => {
            const isHovered = hoveredCounty === county;
            const styles = getTileStyles(county, isHovered);
            return (
              <div
                key={i}
                className={`w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-md flex items-center justify-center text-[8px] sm:text-[9px] md:text-[10px] font-bold transition-all duration-200 ease-out ${
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

export default NorthCarolinaCountiesMap;
