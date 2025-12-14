// State constants for DUI Guide

export const ACTIVE_STATES = [
  { name: 'Texas', abbreviation: 'TX', slug: 'texas' },
  { name: 'Arizona', abbreviation: 'AZ', slug: 'arizona' },
  { name: 'California', abbreviation: 'CA', slug: 'california' },
  { name: 'Florida', abbreviation: 'FL', slug: 'florida' },
  { name: 'Georgia', abbreviation: 'GA', slug: 'georgia' },
  { name: 'North Carolina', abbreviation: 'NC', slug: 'north-carolina' },
  { name: 'Colorado', abbreviation: 'CO', slug: 'colorado' },
] as const;

export const STATE_ABBREVIATIONS = ACTIVE_STATES.map((s) => s.abbreviation);
export const STATE_SLUGS = ACTIVE_STATES.map((s) => s.slug);

export function getStateBySlug(slug: string) {
  return ACTIVE_STATES.find((s) => s.slug === slug);
}

export function getStateByAbbreviation(abbreviation: string) {
  return ACTIVE_STATES.find((s) => s.abbreviation === abbreviation);
}
