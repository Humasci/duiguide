"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { County } from "@/types/database";

interface CountySelectorProps {
  stateSlug?: string;
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function CountySelector({
  stateSlug,
  value,
  onValueChange,
  placeholder = "Select a county",
}: CountySelectorProps) {
  const [counties, setCounties] = useState<County[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stateSlug) {
      setCounties([]);
      return;
    }

    const fetchCounties = async () => {
      setIsLoading(true);
      try {
        // This will be implemented when we have the API endpoint
        // For now, we'll use mock data
        const mockCounties: County[] = [
          {
            id: "1",
            state_id: "1",
            name: "Harris County",
            slug: "harris",
            is_active: true,
            has_partner_coverage: true,
            content_status: "published",
            public_defender_available: true,
            dui_court_available: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            state_id: "1",
            name: "Dallas County",
            slug: "dallas",
            is_active: true,
            has_partner_coverage: true,
            content_status: "published",
            public_defender_available: true,
            dui_court_available: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
        setCounties(mockCounties);
      } catch (error) {
        console.error("Error fetching counties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounties();
  }, [stateSlug]);

  if (!stateSlug) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select a state first" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange} disabled={isLoading}>
      <SelectTrigger>
        <SelectValue
          placeholder={isLoading ? "Loading counties..." : placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        {counties.map((county) => (
          <SelectItem key={county.id} value={county.slug}>
            {county.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
