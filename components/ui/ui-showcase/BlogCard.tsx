import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
}

const BlogCard = ({ title, description, image, href = "#", className }: BlogCardProps) => {
  return (
    <a 
      href={href}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all">
          Read more
          <ArrowRight className="h-4 w-4 stroke-[1.5]" />
        </span>
      </div>
    </a>
  );
};

export default BlogCard;
