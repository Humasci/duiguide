import React, { useState } from "react";
import { toast } from "sonner";

export interface TexasCountiesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onCountyClick?: (county: string) => void;
}

// Texas counties grid - one tile per major region/county grouping
// Texas has 254 counties, so we show major ones in a simplified grid
const countiesGrid = [
  ["Dallam", "Sherman", "Hansford", "Ochiltree", "Lipscomb", "", ""],
  ["Hartley", "Moore", "Hutchinson", "Roberts", "Hemphill", "", ""],
  ["Oldham", "Potter", "Carson", "Gray", "Wheeler", "Collin", "Bowie"],
  ["Deaf Smith", "Randall", "Armstrong", "Donley", "Collingsworth", "Dallas", "Smith"],
  ["Parmer", "Castro", "Swisher", "Briscoe", "Hall", "Tarrant", "Harrison"],
  ["Bailey", "Lamb", "Hale", "Floyd", "Motley", "Ellis", "Nacogdoches"],
  ["Cochran", "Hockley", "Lubbock", "Crosby", "Dickens", "McLennan", "Angelina"],
  ["Yoakum", "Terry", "Lynn", "Garza", "Kent", "Bell", "Houston"],
  ["Gaines", "Dawson", "Borden", "Scurry", "Fisher", "Travis", "Montgomery"],
  ["Andrews", "Martin", "Howard", "Mitchell", "Nolan", "Williamson", "Harris"],
  ["El Paso", "Loving", "Ector", "Midland", "Tom Green", "Hays", "Galveston"],
  ["Hudspeth", "Culberson", "Reeves", "Pecos", "Crockett", "Bexar", "Brazoria"],
  ["Jeff Davis", "Presidio", "Brewster", "Terrell", "Val Verde", "Comal", "Fort Bend"],
  ["", "", "", "", "Kinney", "Guadalupe", "Matagorda"],
  ["", "", "", "Maverick", "Uvalde", "Gonzales", "Victoria"],
  ["", "", "", "Webb", "La Salle", "Karnes", "Calhoun"],
  ["", "", "", "Zapata", "Duval", "Bee", "Refugio"],
  ["", "", "", "Starr", "Jim Hogg", "Nueces", "Aransas"],
  ["", "", "", "Hidalgo", "Brooks", "Kleberg", "San Patricio"],
  ["", "", "", "Cameron", "Willacy", "Kenedy", ""],
];

// County full names
const countyNames: Record<string, string> = {
  Dallam: "Dallam County", Sherman: "Sherman County", Hansford: "Hansford County",
  Ochiltree: "Ochiltree County", Lipscomb: "Lipscomb County", Hartley: "Hartley County",
  Moore: "Moore County", Hutchinson: "Hutchinson County", Roberts: "Roberts County",
  Hemphill: "Hemphill County", Oldham: "Oldham County", Potter: "Potter County",
  Carson: "Carson County", Gray: "Gray County", Wheeler: "Wheeler County",
  "Deaf Smith": "Deaf Smith County", Randall: "Randall County", Armstrong: "Armstrong County",
  Donley: "Donley County", Collingsworth: "Collingsworth County", Parmer: "Parmer County",
  Castro: "Castro County", Swisher: "Swisher County", Briscoe: "Briscoe County",
  Hall: "Hall County", Bailey: "Bailey County", Lamb: "Lamb County", Hale: "Hale County",
  Floyd: "Floyd County", Motley: "Motley County", Cochran: "Cochran County",
  Hockley: "Hockley County", Lubbock: "Lubbock County", Crosby: "Crosby County",
  Dickens: "Dickens County", Yoakum: "Yoakum County", Terry: "Terry County",
  Lynn: "Lynn County", Garza: "Garza County", Kent: "Kent County", Gaines: "Gaines County",
  Dawson: "Dawson County", Borden: "Borden County", Scurry: "Scurry County",
  Fisher: "Fisher County", Andrews: "Andrews County", Martin: "Martin County",
  Howard: "Howard County", Mitchell: "Mitchell County", Nolan: "Nolan County",
  "El Paso": "El Paso County", Loving: "Loving County", Ector: "Ector County",
  Midland: "Midland County", "Tom Green": "Tom Green County", Hudspeth: "Hudspeth County",
  Culberson: "Culberson County", Reeves: "Reeves County", Pecos: "Pecos County",
  Crockett: "Crockett County", "Jeff Davis": "Jeff Davis County", Presidio: "Presidio County",
  Brewster: "Brewster County", Terrell: "Terrell County", "Val Verde": "Val Verde County",
  Kinney: "Kinney County", Uvalde: "Uvalde County", Maverick: "Maverick County",
  Webb: "Webb County", "La Salle": "La Salle County", Zapata: "Zapata County",
  Duval: "Duval County", Starr: "Starr County", "Jim Hogg": "Jim Hogg County",
  Hidalgo: "Hidalgo County", Brooks: "Brooks County", Cameron: "Cameron County",
  Willacy: "Willacy County", Collin: "Collin County", Dallas: "Dallas County",
  Tarrant: "Tarrant County", Ellis: "Ellis County", McLennan: "McLennan County",
  Bell: "Bell County", Travis: "Travis County", Williamson: "Williamson County",
  Hays: "Hays County", Bexar: "Bexar County", Comal: "Comal County",
  Guadalupe: "Guadalupe County", Gonzales: "Gonzales County", Karnes: "Karnes County",
  Bee: "Bee County", Nueces: "Nueces County", Kleberg: "Kleberg County",
  Kenedy: "Kenedy County", Bowie: "Bowie County", Smith: "Smith County",
  Harrison: "Harrison County", Nacogdoches: "Nacogdoches County", Angelina: "Angelina County",
  Houston: "Houston County", Montgomery: "Montgomery County", Harris: "Harris County",
  Galveston: "Galveston County", Brazoria: "Brazoria County", "Fort Bend": "Fort Bend County",
  Matagorda: "Matagorda County", Victoria: "Victoria County", Calhoun: "Calhoun County",
  Refugio: "Refugio County", Aransas: "Aransas County", "San Patricio": "San Patricio County",
};

// Generate consistent colors for each county
const getCountyColor = (county: string, isHovered: boolean, isSelected: boolean) => {
  if (!county) return "transparent";
  const seed = county.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const saturation = isSelected ? 60 : isHovered ? 50 : 40 + (seed % 30);
  const lightness = isSelected ? 40 : isHovered ? 50 : 45 + (seed % 15);
  return `hsl(200 ${saturation}% ${lightness}%)`;
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

const TexasCountiesMap: React.FC<TexasCountiesMapProps> = ({
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
          style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
        >
          {countiesGrid.flat().map((county, i) => (
            <div
              key={i}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center text-[8px] md:text-[9px] font-medium transition-all duration-200 ${
                county
                  ? "hover:scale-110 hover:shadow-lg cursor-pointer"
                  : "bg-transparent"
              } ${selectedCounty === county ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
              style={{
                backgroundColor: getCountyColor(county, hoveredCounty === county, selectedCounty === county),
                color: county ? "hsl(200 30% 15%)" : "transparent",
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

export default TexasCountiesMap;
