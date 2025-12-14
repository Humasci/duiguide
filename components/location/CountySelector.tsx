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
        const response = await fetch(`/api/counties/${stateSlug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch counties");
        }

        const data = await response.json();
        setCounties(data.counties || []);
      } catch (error) {
        console.error("Error fetching counties:", error);
        setCounties([]);
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
