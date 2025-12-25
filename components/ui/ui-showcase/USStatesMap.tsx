'use client';

import React, { useState } from "react";
import { toast } from "sonner";

export interface USStatesMapProps {
  title?: string;
  description?: string;
  className?: string;
  onStateClick?: (state: string) => void;
}

// US states grid data with adoption intensity
const statesGrid = [
  ["", "", "", "", "", "", "", "", "", "", "ME"],
  ["", "AK", "", "", "", "", "WI", "", "", "VT", "NH"],
  ["WA", "ID", "MT", "ND", "MN", "IL", "MI", "", "NY", "MA", ""],
  ["OR", "NV", "WY", "SD", "IA", "IN", "OH", "PA", "NJ", "CT", "RI"],
  ["CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "DC", "MD", "DE"],
  ["", "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "", "", ""],
  ["", "", "", "OK", "LA", "MS", "AL", "GA", "", "", ""],
  ["", "HI", "", "TX", "", "", "", "", "FL", "", ""],
];

// State names mapping
const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

// Generate consistent colors for each state
const getStateColor = (state: string, isHovered: boolean, isSelected: boolean) => {
  if (!state) return "transparent";
  const seed = state.charCodeAt(0) + (state.charCodeAt(1) || 0);
  const saturation = isSelected ? 60 : isHovered ? 50 : 40 + (seed % 30);
  const lightness = isSelected ? 40 : isHovered ? 50 : 45 + (seed % 15);
  return `hsl(160 ${saturation}% ${lightness}%)`;
};

const USStatesMap: React.FC<USStatesMapProps> = ({
  title,
  description,
  className = "",
  onStateClick,
}) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (state: string) => {
    if (!state) return;
    
    setSelectedState(state === selectedState ? null : state);
    onStateClick?.(state);
    toast.info(`Selected: ${stateNames[state] || state}`);
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
      
      {/* Selected state info */}
      {selectedState && (
        <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <h4 className="font-semibold text-foreground">{stateNames[selectedState] || selectedState}</h4>
          <p className="text-sm text-muted-foreground">Click another state to select it, or click again to deselect.</p>
        </div>
      )}

      <div className="flex items-center justify-center">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(11, 1fr)" }}
        >
          {statesGrid.flat().map((state, i) => (
            <div
              key={i}
              className={`w-7 h-7 md:w-9 md:h-9 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                state
                  ? "hover:scale-110 hover:shadow-lg cursor-pointer"
                  : "bg-transparent"
              } ${selectedState === state ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
              style={{
                backgroundColor: getStateColor(state, hoveredState === state, selectedState === state),
                color: state ? "hsl(160 30% 15%)" : "transparent",
              }}
              title={state ? stateNames[state] || state : undefined}
              onClick={() => handleStateClick(state)}
              onMouseEnter={() => state && setHoveredState(state)}
              onMouseLeave={() => setHoveredState(null)}
            >
              {state}
            </div>
          ))}
        </div>
      </div>

      {/* Hovered state tooltip */}
      {hoveredState && !selectedState && (
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            State: <span className="font-medium text-foreground">{stateNames[hoveredState]}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default USStatesMap;
