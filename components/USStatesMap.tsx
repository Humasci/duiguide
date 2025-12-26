'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface USStatesMapProps {
  title?: string;
  description?: string;
  className?: string;
  prioritizedStates?: string[];
  onStateClick?: (stateAbbr: string, stateSlug: string) => void;
}

// US states grid layout (11 columns, 8 rows)
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

// State names and slugs mapping
const stateData: Record<string, { name: string; slug: string }> = {
  AL: { name: "Alabama", slug: "alabama" },
  AK: { name: "Alaska", slug: "alaska" },
  AZ: { name: "Arizona", slug: "arizona" },
  AR: { name: "Arkansas", slug: "arkansas" },
  CA: { name: "California", slug: "california" },
  CO: { name: "Colorado", slug: "colorado" },
  CT: { name: "Connecticut", slug: "connecticut" },
  DE: { name: "Delaware", slug: "delaware" },
  DC: { name: "District of Columbia", slug: "dc" },
  FL: { name: "Florida", slug: "florida" },
  GA: { name: "Georgia", slug: "georgia" },
  HI: { name: "Hawaii", slug: "hawaii" },
  ID: { name: "Idaho", slug: "idaho" },
  IL: { name: "Illinois", slug: "illinois" },
  IN: { name: "Indiana", slug: "indiana" },
  IA: { name: "Iowa", slug: "iowa" },
  KS: { name: "Kansas", slug: "kansas" },
  KY: { name: "Kentucky", slug: "kentucky" },
  LA: { name: "Louisiana", slug: "louisiana" },
  ME: { name: "Maine", slug: "maine" },
  MD: { name: "Maryland", slug: "maryland" },
  MA: { name: "Massachusetts", slug: "massachusetts" },
  MI: { name: "Michigan", slug: "michigan" },
  MN: { name: "Minnesota", slug: "minnesota" },
  MS: { name: "Mississippi", slug: "mississippi" },
  MO: { name: "Missouri", slug: "missouri" },
  MT: { name: "Montana", slug: "montana" },
  NE: { name: "Nebraska", slug: "nebraska" },
  NV: { name: "Nevada", slug: "nevada" },
  NH: { name: "New Hampshire", slug: "new-hampshire" },
  NJ: { name: "New Jersey", slug: "new-jersey" },
  NM: { name: "New Mexico", slug: "new-mexico" },
  NY: { name: "New York", slug: "new-york" },
  NC: { name: "North Carolina", slug: "north-carolina" },
  ND: { name: "North Dakota", slug: "north-dakota" },
  OH: { name: "Ohio", slug: "ohio" },
  OK: { name: "Oklahoma", slug: "oklahoma" },
  OR: { name: "Oregon", slug: "oregon" },
  PA: { name: "Pennsylvania", slug: "pennsylvania" },
  RI: { name: "Rhode Island", slug: "rhode-island" },
  SC: { name: "South Carolina", slug: "south-carolina" },
  SD: { name: "South Dakota", slug: "south-dakota" },
  TN: { name: "Tennessee", slug: "tennessee" },
  TX: { name: "Texas", slug: "texas" },
  UT: { name: "Utah", slug: "utah" },
  VT: { name: "Vermont", slug: "vermont" },
  VA: { name: "Virginia", slug: "virginia" },
  WA: { name: "Washington", slug: "washington" },
  WV: { name: "West Virginia", slug: "west-virginia" },
  WI: { name: "Wisconsin", slug: "wisconsin" },
  WY: { name: "Wyoming", slug: "wyoming" },
};

// Default prioritized states (the 7 we're focusing on)
const defaultPrioritizedStates = ["TX", "AZ", "GA", "NC", "CO", "OH", "TN"];

const USStatesMap: React.FC<USStatesMapProps> = ({
  title,
  description,
  className = "",
  prioritizedStates = defaultPrioritizedStates,
  onStateClick,
}) => {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const isPrioritized = (state: string) => prioritizedStates.includes(state);

  const getStateStyles = (state: string, isHovered: boolean) => {
    if (!state) return { backgroundColor: "transparent", color: "transparent" };

    const prioritized = isPrioritized(state);

    if (prioritized) {
      // Prioritized states use primary color scheme
      return {
        backgroundColor: isHovered
          ? "hsl(var(--primary))"
          : "hsl(var(--primary) / 0.8)",
        color: "hsl(var(--primary-foreground))",
      };
    } else {
      // Non-prioritized states are muted
      return {
        backgroundColor: isHovered
          ? "hsl(var(--muted-foreground) / 0.3)"
          : "hsl(var(--muted) / 0.8)",
        color: isHovered
          ? "hsl(var(--foreground))"
          : "hsl(var(--muted-foreground))",
      };
    }
  };

  const handleStateClick = (state: string) => {
    if (!state) return;

    const data = stateData[state];
    if (!data) return;

    if (onStateClick) {
      onStateClick(state, data.slug);
    } else if (isPrioritized(state)) {
      // Navigate to state page for prioritized states
      router.push(`/${data.slug}`);
    }
  };

  return (
    <div className={`${className}`}>
      {(title || description) && (
        <div className="text-center mb-6">
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
          className="grid gap-1 md:gap-1.5"
          style={{ gridTemplateColumns: "repeat(11, 1fr)" }}
        >
          {statesGrid.flat().map((state, i) => {
            const isHovered = hoveredState === state;
            const prioritized = isPrioritized(state);
            const styles = getStateStyles(state, isHovered);

            return (
              <div
                key={i}
                className={`
                  w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10
                  rounded-md flex items-center justify-center
                  text-[10px] sm:text-xs font-medium
                  transition-all duration-200
                  ${state ? "cursor-pointer" : ""}
                  ${state && prioritized ? "hover:scale-110 hover:shadow-lg" : ""}
                  ${state && !prioritized ? "hover:scale-105 opacity-60 hover:opacity-80" : ""}
                `}
                style={styles}
                title={state ? `${stateData[state]?.name || state}${prioritized ? " - Click to view DUI info" : " - Coming soon"}` : undefined}
                onClick={() => handleStateClick(state)}
                onMouseEnter={() => state && setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
              >
                {state}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hovered state tooltip */}
      <div className="mt-4 text-center h-6">
        {hoveredState && (
          <span className="text-sm text-muted-foreground">
            {isPrioritized(hoveredState) ? (
              <>
                <span className="font-medium text-foreground">{stateData[hoveredState]?.name}</span>
                <span className="text-primary ml-2">→ View DUI guide</span>
              </>
            ) : (
              <>
                <span className="font-medium text-foreground">{stateData[hoveredState]?.name}</span>
                <span className="ml-2">— Coming soon</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default USStatesMap;
