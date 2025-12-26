import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";

const updates = [
  {
    date: "Nov 5, 2025",
    category: "Economic Research",
    title: "Launching the Anthropic Economic Futures Programme in the UK and Europe",
  },
  {
    date: "Sep 15, 2025",
    category: "Economic Research",
    title: "Anthropic Economic Index report: Uneven geographic and enterprise AI adoption",
  },
  {
    date: "Sep 15, 2025",
    category: "Economic Research",
    title: "Anthropic Economic Index: Tracking AI's role in the US and global economy",
  },
  {
    date: "Apr 28, 2025",
    category: "Societal Impacts",
    title: "Anthropic Economic Index: AI's impact on software development",
  },
  {
    date: "Mar 27, 2025",
    category: "Societal Impacts",
    title: "Anthropic Economic Index: Insights from Claude 3.7 Sonnet",
  },
  {
    date: "Feb 10, 2025",
    category: "Societal Impacts",
    title: "The Anthropic Economic Index",
  },
];

const announcements = [
  {
    title: "Economic Futures Symposium Proposals",
    description: "A selection of policy proposals from attendees at our DC Economic Futures Symposium",
  },
  {
    title: "Introducing Anthropic Economic Futures Program",
    description: "We're launching the Anthropic Economic Futures program, a multidisciplinary effort that builds upon our existing economic research efforts.",
  },
  {
    title: "Preserving privacy",
    description: "The Anthropic Economic Index is made possible by Clio, a system that allows us to analyze conversations with Claude while preserving user privacy.",
  },
];

// US states grid data with adoption intensity
const statesGrid = [
  ["", "", "", "", "", "", "", "", "", "", "ME"],
  ["", "AK", "", "", "", "", "WI", "", "", "VT", "NH"],
  ["WA", "ID", "MT", "ND", "MN", "IL", "MI", "", "NY", "MA", ""],
  ["OR", "NV", "WY", "SD", "IA", "IN", "OH", "PA", "NJ", "CT", "RI"],
  ["CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "DC", "MD", "DE"],
  ["", "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "", "", ""],
  ["", "", "", "OK", "LA", "MS", "AL", "GA", "", "", ""],
  ["", "HI", "", "TX", "", "", "", "", "FL", "", ""],
];

const EconomicFutures = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header pageType="skills" />
      
      <main>
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              Economic Futures
            </h1>
            <p className="font-heading text-lg md:text-xl text-foreground/80 leading-relaxed">
              The Anthropic Economic Futures program aims to support research and policy development for addressing the economic impacts of AI. It provides research grants, forums for policy discussion, and evidence on real-world AI use.
            </p>
          </div>
        </section>

        {/* Economic Index Card */}
        <section className="container pb-16">
          <div className="border-t border-border pt-8">
            <div className="bg-card rounded-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12">
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-medium text-muted-foreground mb-4">Economic Index</span>
                  <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                    Analyzing how Claude is used across the economy.
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    The Anthropic Economic Index reveals the shape of AI adoption across the world. Here, you can explore the data behind our research to understand how people are using Claude across every US state and hundreds of occupations.
                  </p>
                  <Button variant="outline" className="w-fit rounded-full px-6 gap-2 border-foreground/20 hover:bg-foreground/5">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* US States Grid */}
                <div className="flex items-center justify-center">
                  <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}>
                    {statesGrid.flat().map((state, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                          state
                            ? 'bg-primary/30 hover:bg-primary/50 text-foreground cursor-pointer'
                            : 'bg-transparent'
                        }`}
                        style={{
                          backgroundColor: state ? `hsl(160 ${40 + Math.random() * 30}% ${45 + Math.random() * 15}%)` : 'transparent',
                          color: state ? 'hsl(160 30% 15%)' : 'transparent',
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <section className="container pb-16">
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground">Latest updates</h2>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search" 
                  className="pl-10 rounded-full bg-card border-border"
                />
              </div>
            </div>
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[120px_150px_1fr] gap-4 py-3 border-b border-border text-sm text-muted-foreground">
              <span>Date</span>
              <span>Category</span>
              <span>Title</span>
            </div>
            
            {/* Updates List */}
            <div className="divide-y divide-border">
              {updates.map((update, index) => (
                <a
                  key={index}
                  href="#"
                  className="grid md:grid-cols-[120px_150px_1fr] gap-2 md:gap-4 py-4 hover:bg-card/50 transition-colors group"
                >
                  <span className="text-sm text-muted-foreground">{update.date}</span>
                  <span className="text-sm text-muted-foreground">{update.category}</span>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {update.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section className="container pb-24">
          <div className="border-t border-border pt-8">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">Announcements</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {announcements.map((announcement, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-card rounded-2xl p-6 hover:shadow-lg transition-all"
                >
                  <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {announcement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {announcement.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EconomicFutures;