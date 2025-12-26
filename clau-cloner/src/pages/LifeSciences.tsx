import { Check, Play, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LifeSciences = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header pageType="life-sciences" />

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <div className="flex justify-center mb-8">
            <LifeScienceIcon />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 max-w-4xl mx-auto">
            Accelerate science, from discovery through translation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Claude helps pharma companies, biotech startups, and research institutions move faster, 
            while maintaining the accuracy your work demands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base">
              Get started
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 text-base">
              Contact sales
            </Button>
          </div>
          
          {/* Play video button */}
          <button className="mt-8 flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <Play className="h-4 w-4 ml-0.5" />
            </div>
            Play video
          </button>
        </div>
      </section>

      {/* Demo Card Section */}
      <section className="pb-20">
        <div className="container max-w-4xl">
          <div className="bg-cream-light border border-border rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Acme Co.</span>
            </div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-heading text-3xl md:text-4xl">Evening, Anne</span>
            </div>
            <div className="bg-background rounded-xl p-6 text-sm text-muted-foreground leading-relaxed">
              My colleagues recently published the attached single-cell dataset that describes gene expression differences between adult and pediatric liver samples with a focus on the immune system. I would like to explore these samples but focus on the parenchymal cells and differences between adult and pediatric liver...
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-cream-light">
        <div className="container max-w-4xl">
          <TestimonialCard
            quote="When we set out to create an AI agent that could automate bioinformatics analyses, we focused on three key factors to decide what model provider to use: top-ranking at software development, aligned with life sciences, and support for startups. We evaluated half a dozen platforms, and it became clear that Claude was the standout leader."
            author="Alfredo Andere"
            title="Co-founder and CEO"
            company="Latch Bio"
          />
        </div>
      </section>

      {/* Built for Breakthrough Science */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-5xl text-center mb-16">
            Built for breakthrough science
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              title="AI you can trust"
              description="Claude models are safe, secure, and reliably accurate, so you can handle clinical trial data and proprietary compounds with confidence."
            />
            <FeatureCard
              title="Made for R&D"
              description="Claude excels at tasks like bioinformatics and lab protocol drafting, and connects to the tools you use every day—so every scientist on your team can accelerate their work."
            />
            <FeatureCard
              title="Your partner in discovery"
              description="We collaborate with pharma leaders and research institutions to make sure Claude evolves with life sciences needs and advances real scientific discovery."
            />
          </div>
        </div>
      </section>

      {/* How Teams Use Claude */}
      <section className="py-20 bg-cream-light">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-5xl text-center mb-16">
            How life sciences teams use Claude
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Synthesis", "Protocols", "Bioinformatics", "Compliance"].map((tab) => (
              <button
                key={tab}
                className="px-6 py-2 rounded-full text-sm font-medium border border-border bg-background hover:bg-muted transition-colors"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl p-8">
              <h3 className="font-heading text-2xl mb-4">Research synthesis</h3>
              <p className="text-muted-foreground mb-6">
                Survey hundreds of papers in hours instead of weeks. Claude synthesizes findings across biomedical literature, 
                identifies contradictions, and generates testable hypotheses with verifiable citations.
              </p>
              <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                View prompt <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-background rounded-2xl p-8">
              <h3 className="font-heading text-2xl mb-4">Protocol generation</h3>
              <p className="text-muted-foreground mb-6">
                Draft study protocols, SOPs, and consent documents directly in Benchling. 
                Claude structures experimental workflows while you maintain control over scientific decisions.
              </p>
              <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                View prompt <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cream-light rounded-2xl p-8">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Case study</p>
              <h3 className="font-heading text-xl mb-4">
                Novo Nordisk accelerates clinical documentation and drug development with Claude
              </h3>
              <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                Read story <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-cream-light rounded-2xl p-8">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Webinar</p>
              <h3 className="font-heading text-xl mb-4">
                Watch how life sciences organizations use Claude
              </h3>
              <button className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                Watch <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-cream-light">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-5xl text-center mb-6">
            Get started with Claude
          </h2>

          <div className="flex justify-center gap-3 mb-12">
            {["Individual", "Team & Enterprise"].map((tab) => (
              <button
                key={tab}
                className="px-6 py-2 rounded-full text-sm font-medium border border-border bg-background hover:bg-muted transition-colors"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <PricingCard
              title="Pro"
              subtitle="For everyday productivity"
              features={[
                "Life sciences connectors and skills",
                "Access to file creation (docs, slides, spreadsheets, and PDFs)",
                "Access to research",
                "Access to Claude Code",
                "Life sciences guides and docs",
              ]}
            />
            <PricingCard
              title="Max"
              subtitle="Get the most out of Claude"
              features={[
                "Choose 5x or 20x more usage than Pro*",
                "Higher output limits for all tasks",
                "Early access to advanced Claude features",
              ]}
              highlighted="Everything in Pro, plus:"
            />
            <PricingCard
              title="Team"
              subtitle="For collaboration across organizations"
              features={[
                "For organizations purchasing fewer than 20 seats",
                "Life sciences connectors and skills",
                "Access to file creation",
                "Single sign-on (SSO)",
                "Central billing and administration",
              ]}
            />
            <PricingCard
              title="Enterprise"
              subtitle="For businesses operating at scale"
              features={[
                "More usage*",
                "Enhanced context window",
                "Compliance API for observability and monitoring",
                "Single sign-on (SSO) and domain capture",
                "Custom data retention controls",
              ]}
              highlighted="Everything in Team, plus:"
              buttonText="Contact sales"
              buttonVariant="outline"
            />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            Additional <a href="#" className="underline">usage limits</a> apply. Prices shown don't include applicable tax.
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-5xl text-center mb-12">
            More resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <ResourceCard
              type="eBook"
              title="The Enterprise AI transformation guide for healthcare and life sciences"
            />
            <ResourceCard
              type="Video"
              title="Jonah Cool and Eric Kauderer-Abrams share their vision for making Claude the go-to AI research assistant"
            />
            <ResourceCard
              type="Video"
              title="AI in life sciences with Dario Amodei, CEO Anthropic, and Diogo Rau, CIDO Eli Lilly and Company"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const LifeScienceIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M40 30V50" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="56" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="40" cy="56" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="56" cy="56" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M24 50L40 30L56 50" stroke="currentColor" strokeWidth="2" />
  </svg>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  company: string;
}

const TestimonialCard = ({ quote, author, title, company }: TestimonialCardProps) => (
  <div className="text-center">
    <p className="text-sm text-muted-foreground mb-4">{company}</p>
    <blockquote className="font-heading text-xl md:text-2xl leading-relaxed mb-6">
      "{quote}"
    </blockquote>
    <p className="font-medium">{author}</p>
    <p className="text-sm text-muted-foreground">{title}</p>
  </div>
);

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="text-center">
    <h3 className="font-heading text-xl mb-4">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface PricingCardProps {
  title: string;
  subtitle: string;
  features: string[];
  highlighted?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline";
}

const PricingCard = ({
  title,
  subtitle,
  features,
  highlighted,
  buttonText = "Try Claude",
  buttonVariant = "default",
}: PricingCardProps) => (
  <div className="bg-background border border-border rounded-2xl p-6 flex flex-col">
    <h3 className="font-heading text-xl mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>

    <Button
      variant={buttonVariant}
      className={`w-full rounded-full mb-6 ${
        buttonVariant === "default" ? "bg-foreground text-background hover:bg-foreground/90" : ""
      }`}
    >
      {buttonText}
    </Button>

    {highlighted && <p className="font-medium text-sm mb-3">{highlighted}</p>}

    <ul className="space-y-3 flex-1">
      {features.map((feature, index) => (
        <li key={index} className="flex gap-3 text-sm">
          <Check className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface ResourceCardProps {
  type: string;
  title: string;
}

const ResourceCard = ({ type, title }: ResourceCardProps) => (
  <div className="bg-cream-light rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer">
    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">{type}</p>
    <h3 className="font-heading text-lg">{title}</h3>
    <button className="text-sm font-medium flex items-center gap-2 mt-4 hover:gap-3 transition-all">
      {type} <ArrowRight className="h-4 w-4" />
    </button>
  </div>
);

export default LifeSciences;
