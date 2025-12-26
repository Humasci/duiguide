import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
  className?: string;
  variant?: "default" | "compact";
}

const TestimonialCard = ({ 
  quote, 
  author, 
  title, 
  company,
  avatar,
  className,
  variant = "default"
}: TestimonialCardProps) => {
  if (variant === "compact") {
    return (
      <div className={cn(
        "bg-card rounded-2xl p-6",
        className
      )}>
        <blockquote className="font-heading text-lg font-normal text-foreground leading-relaxed mb-4">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-3">
          {avatar && (
            <img 
              src={avatar} 
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-medium text-foreground text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{title}, {company}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <p className="text-sm text-muted-foreground mb-4">{company}</p>
      <blockquote className="font-heading text-xl md:text-2xl font-normal text-foreground leading-relaxed mb-6">
        "{quote}"
      </blockquote>
      <p className="font-medium text-foreground">{author}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

export default TestimonialCard;
