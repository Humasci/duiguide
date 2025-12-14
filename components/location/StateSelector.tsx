"use client";

import { ACTIVE_STATES } from "@/lib/constants/states";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StateSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function StateSelector({
  value,
  onValueChange,
  placeholder = "Select a state",
}: StateSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {ACTIVE_STATES.map((state) => (
          <SelectItem key={state.slug} value={state.slug}>
            {state.name} ({state.abbreviation})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
