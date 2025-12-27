'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface GeorgiaCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string, slug: string) => void;
  navigateOnClick?: boolean;
}

// Georgia counties grid - simplified representation of major counties
const countiesGrid = [
  ["Dade", "Catoosa", "Whitfield", "Murray", "Fannin", "Union", "Towns", "Rabun"],
  ["Walker", "Chattooga", "Gordon", "Gilmer", "Lumpkin", "White", "Habersham", "Stephens"],
  ["Floyd", "Bartow", "Cherokee", "Dawson", "Hall", "Banks", "Franklin", "Hart"],
  ["Polk", "Paulding", "Cobb", "Forsyth", "Jackson", "Madison", "Elbert", ""],
  ["Haralson", "Douglas", "Fulton", "Gwinnett", "Barrow", "Clarke", "Oglethorpe", "Lincoln"],
  ["Carroll", "Coweta", "Fayette", "DeKalb", "Walton", "Morgan", "Greene", "Taliaferro"],
  ["Heard", "Troup", "Meriwether", "Pike", "Henry", "Newton", "Putnam", "Hancock"],
  ["", "Harris", "Upson", "Lamar", "Butts", "Jasper", "Baldwin", "Washington"],
  ["Muscogee", "Talbot", "Crawford", "Monroe", "Jones", "Wilkinson", "Johnson", "Jefferson"],
  ["Chattahoochee", "Marion", "Taylor", "Bibb", "Twiggs", "Laurens", "Emanuel", "Burke"],
  ["Stewart", "Webster", "Macon", "Houston", "Bleckley", "Dodge", "Candler", "Screven"],
  ["Quitman", "Randolph", "Sumter", "Dooly", "Pulaski", "Wheeler", "Treutlen", "Bulloch"],
  ["Clay", "Terrell", "Lee", "Crisp", "Wilcox", "Telfair", "Montgomery", "Effingham"],
  ["Calhoun", "Dougherty", "Worth", "Turner", "Ben Hill", "Coffee", "Toombs", "Chatham"],
  ["Early", "Baker", "Mitchell", "Colquitt", "Tift", "Irwin", "Appling", "Bryan"],
  ["Miller", "Decatur", "Grady", "Thomas", "Brooks", "Berrien", "Bacon", "Liberty"],
  ["Seminole", "", "Cook", "Lowndes", "Lanier", "Atkinson", "Ware", "McIntosh"],
  ["", "", "", "Echols", "Clinch", "Charlton", "Camden", "Glynn"],
];

// County full names
const countyNames: Record<string, string> = {
  Dade: "Dade County", Catoosa: "Catoosa County", Whitfield: "Whitfield County",
  Murray: "Murray County", Fannin: "Fannin County", Union: "Union County",
  Towns: "Towns County", Rabun: "Rabun County", Walker: "Walker County",
  Chattooga: "Chattooga County", Gordon: "Gordon County", Gilmer: "Gilmer County",
  Lumpkin: "Lumpkin County", White: "White County", Habersham: "Habersham County",
  Stephens: "Stephens County", Floyd: "Floyd County", Bartow: "Bartow County",
  Cherokee: "Cherokee County", Dawson: "Dawson County", Hall: "Hall County",
  Banks: "Banks County", Franklin: "Franklin County", Hart: "Hart County",
  Polk: "Polk County", Paulding: "Paulding County", Cobb: "Cobb County",
  Forsyth: "Forsyth County", Jackson: "Jackson County", Madison: "Madison County",
  Elbert: "Elbert County", Haralson: "Haralson County", Douglas: "Douglas County",
  Fulton: "Fulton County", Gwinnett: "Gwinnett County", Barrow: "Barrow County",
  Clarke: "Clarke County", Oglethorpe: "Oglethorpe County", Lincoln: "Lincoln County",
  Carroll: "Carroll County", Coweta: "Coweta County", Fayette: "Fayette County",
  DeKalb: "DeKalb County", Walton: "Walton County", Morgan: "Morgan County",
  Greene: "Greene County", Taliaferro: "Taliaferro County", Heard: "Heard County",
  Troup: "Troup County", Meriwether: "Meriwether County", Pike: "Pike County",
  Henry: "Henry County", Newton: "Newton County", Putnam: "Putnam County",
  Hancock: "Hancock County", Harris: "Harris County", Upson: "Upson County",
  Lamar: "Lamar County", Butts: "Butts County", Jasper: "Jasper County",
  Baldwin: "Baldwin County", Washington: "Washington County", Muscogee: "Muscogee County",
  Talbot: "Talbot County", Crawford: "Crawford County", Monroe: "Monroe County",
  Jones: "Jones County", Wilkinson: "Wilkinson County", Johnson: "Johnson County",
  Jefferson: "Jefferson County", Chattahoochee: "Chattahoochee County", Marion: "Marion County",
  Taylor: "Taylor County", Bibb: "Bibb County", Twiggs: "Twiggs County",
  Laurens: "Laurens County", Emanuel: "Emanuel County", Burke: "Burke County",
  Stewart: "Stewart County", Webster: "Webster County", Macon: "Macon County",
  Houston: "Houston County", Bleckley: "Bleckley County", Dodge: "Dodge County",
  Candler: "Candler County", Screven: "Screven County", Quitman: "Quitman County",
  Randolph: "Randolph County", Sumter: "Sumter County", Dooly: "Dooly County",
  Pulaski: "Pulaski County", Wheeler: "Wheeler County", Treutlen: "Treutlen County",
  Bulloch: "Bulloch County", Clay: "Clay County", Terrell: "Terrell County",
  Lee: "Lee County", Crisp: "Crisp County", Wilcox: "Wilcox County",
  Telfair: "Telfair County", Montgomery: "Montgomery County", Effingham: "Effingham County",
  Calhoun: "Calhoun County", Dougherty: "Dougherty County", Worth: "Worth County",
  Turner: "Turner County", "Ben Hill": "Ben Hill County", Coffee: "Coffee County",
  Toombs: "Toombs County", Chatham: "Chatham County", Early: "Early County",
  Baker: "Baker County", Mitchell: "Mitchell County", Colquitt: "Colquitt County",
  Tift: "Tift County", Irwin: "Irwin County", Appling: "Appling County",
  Bryan: "Bryan County", Miller: "Miller County", Decatur: "Decatur County",
  Grady: "Grady County", Thomas: "Thomas County", Brooks: "Brooks County",
  Berrien: "Berrien County", Bacon: "Bacon County", Liberty: "Liberty County",
  Seminole: "Seminole County", Cook: "Cook County", Lowndes: "Lowndes County",
  Lanier: "Lanier County", Atkinson: "Atkinson County", Ware: "Ware County",
  McIntosh: "McIntosh County", Echols: "Echols County", Clinch: "Clinch County",
  Charlton: "Charlton County", Camden: "Camden County", Glynn: "Glynn County",
};

// Generate consistent colors for each county - using warm primary tones
const getCountyColor = (county: string, isHovered: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Use warm hues matching theme
  const hue = 26 + (seed % 14);
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

const GeorgiaCountiesMap: React.FC<GeorgiaCountiesMapProps> = ({
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
      router.push(`/georgia/${slug}`);
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

      <div className="flex items-center justify-center overflow-x-auto">
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: "repeat(8, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => {
            const isHovered = hoveredCounty === county;
            return (
              <div
                key={i}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-[9px] md:text-[10px] font-semibold transition-all duration-200 ease-out ${
                  county
                    ? "hover:scale-110 hover:-translate-y-0.5 cursor-pointer"
                    : "bg-transparent"
                }`}
                style={{
                  backgroundColor: getCountyColor(county, isHovered),
                  color: county ? "hsl(26 40% 20%)" : "transparent",
                  boxShadow: isHovered && county ? "0 4px 12px hsl(26 50% 50% / 0.3)" : "none",
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

export default GeorgiaCountiesMap;
