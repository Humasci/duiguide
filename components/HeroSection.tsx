import { Button } from "@/components/ui/button";
import { FileSearch, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-8">
      <div className="container max-w-4xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4">
            <FileSearch className="h-16 w-16 text-foreground stroke-[1.5]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6 text-foreground">
          Teach Claude your way of working
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Turn your expertise, procedures, and best practices into reusable capabilities 
          so Claude can apply them automatically, every time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base font-medium">
            Start using skills
          </Button>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground rounded-full px-6 py-6 text-base gap-2"
          >
            <Play className="h-4 w-4" />
            Play video
          </Button>
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="container max-w-5xl mt-12">
        <div className="bg-card rounded-3xl p-8 md:p-12 min-h-[400px] flex items-center justify-center">
          <div className="flex items-end gap-4 md:gap-8 transform -rotate-6">
            {/* Brand Guidelines Document */}
            <div className="bg-background rounded-xl shadow-lg p-4 w-36 md:w-48 transform rotate-[-8deg]">
              <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center p-4">
                <div className="text-primary font-heading text-[10px] md:text-xs font-bold tracking-wider">CRABRACADABRA</div>
                <div className="text-muted-foreground text-[8px] md:text-[10px] mt-1">GAMES</div>
                <div className="mt-4 w-full space-y-1.5">
                  <div className="h-1.5 bg-border rounded w-3/4 mx-auto" />
                  <div className="h-1.5 bg-border rounded w-1/2 mx-auto" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">brand-guidelines.pdf</p>
            </div>

            {/* Skill Card */}
            <div className="bg-background rounded-xl shadow-lg p-4 w-32 md:w-40 transform rotate-[5deg] z-10">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground/50 font-heading text-lg md:text-xl">SKILL</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Play className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Resources Folder */}
            <div className="transform rotate-[12deg]">
              <div className="relative">
                <div className="w-32 md:w-44 h-24 md:h-32 bg-sky-400 rounded-lg rounded-tl-none shadow-lg" />
                <div className="absolute -top-3 left-0 w-12 md:w-16 h-3 bg-sky-400 rounded-t-lg" />
                <span className="absolute bottom-3 left-3 text-background/90 text-xs md:text-sm font-medium">Resources</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;