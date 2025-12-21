'use client';

import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface TrustBadgeProps {
  lastVerified: string | Date;
  countyName: string;
  className?: string;
}

export default function TrustBadge({ lastVerified, countyName, className = "" }: TrustBadgeProps) {
  const verifiedDate = new Date(lastVerified);
  const now = new Date();
  const daysSinceVerification = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));

  // Freshness tiers
  const isFresh = daysSinceVerification <= 30;
  const isStale = daysSinceVerification > 30 && daysSinceVerification <= 90;
  const isOutdated = daysSinceVerification > 90;

  const getStatusConfig = () => {
    if (isFresh) {
      return {
        icon: CheckCircle,
        bgClass: "bg-primary/10",
        textClass: "text-primary",
        borderClass: "border-primary/20",
        label: "Recently Verified",
        timeAgo: formatTimeAgo(daysSinceVerification)
      };
    }

    if (isStale) {
      return {
        icon: Clock,
        bgClass: "bg-secondary",
        textClass: "text-muted-foreground",
        borderClass: "border-border",
        label: "Last Verified",
        timeAgo: formatTimeAgo(daysSinceVerification)
      };
    }

    return {
      icon: AlertTriangle,
      bgClass: "bg-destructive/10",
      textClass: "text-destructive",
      borderClass: "border-destructive/20",
      label: "Verification Needed",
      timeAgo: formatTimeAgo(daysSinceVerification)
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${config.bgClass} ${config.textClass} ${config.borderClass} ${className}`}>
      <Icon className="w-3.5 h-3.5 stroke-[1.5]" />
      <span className="font-body">
        {countyName} Data {config.label}: <strong>{config.timeAgo}</strong>
      </span>
    </div>
  );
}

function formatTimeAgo(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}
