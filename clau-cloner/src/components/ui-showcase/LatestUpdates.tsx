import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface UpdateItem {
  date: string;
  category: string;
  title: string;
  href?: string;
}

export interface LatestUpdatesProps {
  title?: string;
  updates: UpdateItem[];
  showSearch?: boolean;
  className?: string;
}

const LatestUpdates: React.FC<LatestUpdatesProps> = ({
  title = "Latest updates",
  updates,
  showSearch = true,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUpdates = updates.filter(
    (update) =>
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="font-heading text-2xl md:text-3xl text-foreground">{title}</h3>
        {showSearch && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full bg-card border-border"
            />
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[120px_150px_1fr] gap-4 py-3 border-b border-border text-sm text-muted-foreground">
        <span>Date</span>
        <span>Category</span>
        <span>Title</span>
      </div>

      {/* Updates List */}
      <div className="divide-y divide-border">
        {filteredUpdates.map((update, index) => (
          <a
            key={index}
            href={update.href || "#"}
            className="grid md:grid-cols-[120px_150px_1fr] gap-2 md:gap-4 py-4 hover:bg-card/50 transition-colors group"
          >
            <span className="text-sm text-muted-foreground">{update.date}</span>
            <span className="text-sm text-muted-foreground">{update.category}</span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {update.title}
            </span>
          </a>
        ))}
        {filteredUpdates.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No updates found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestUpdates;
