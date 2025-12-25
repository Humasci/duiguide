import React from "react";
import { ArrowRight } from "lucide-react";

export interface Announcement {
  title: string;
  description: string;
  href?: string;
}

export interface AnnouncementCardProps {
  announcement: Announcement;
  className?: string;
}

export interface AnnouncementsGridProps {
  title?: string;
  announcements: Announcement[];
  className?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  className = "",
}) => {
  return (
    <a
      href={announcement.href || "#"}
      className={`group bg-card rounded-2xl p-6 hover:shadow-lg transition-all block ${className}`}
    >
      <h4 className="font-heading text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
        {announcement.title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {announcement.description}
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        Read more
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
};

export const AnnouncementsGrid: React.FC<AnnouncementsGridProps> = ({
  title = "Announcements",
  announcements,
  className = "",
}) => {
  return (
    <div className={className}>
      {title && (
        <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-6">{title}</h3>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {announcements.map((announcement, index) => (
          <AnnouncementCard key={index} announcement={announcement} />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementCard;
