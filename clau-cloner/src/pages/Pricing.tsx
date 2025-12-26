import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type PricingTab = "individual" | "team" | "api";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<PricingTab>("api");

  return (
    <div className="min-h-screen bg-background">
      <Header pageType="pricing" />
      
      <main className="py-20">
        <div className="container">
          {/* Title */}
          <h1 className="font-heading text-5xl md:text-6xl text-center mb-12">Pricing</h1>

          {/* Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-muted rounded-full p-1">
              {[
                { id: "individual" as PricingTab, label: "Individual" },
                { id: "team" as PricingTab, label: "Team & Enterprise" },
                { id: "api" as PricingTab, label: "API" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Plans */}
          {activeTab === "individual" && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PricingCard
                icon={<PricingIcon variant="free" />}
                title="Free"
                subtitle="Try Claude"
                price="$0"
                priceSubtext="Free for everyone"
                features={[
                  "Chat on web, iOS, Android, and on your desktop",
                  "Generate code and visualize data",
                  "Write, edit, and create content",
                  "Analyze text and images",
                  "Ability to search the web",
                  "Unlock more from Claude with desktop extensions",
                ]}
              />
              <PricingCard
                icon={<PricingIcon variant="pro" />}
                title="Pro"
                subtitle="For everyday productivity"
                price="$17"
                priceSubtext="Per month with annual subscription discount ($200 billed up front). $20 if billed monthly."
                features={[
                  "More usage*",
                  "Access Claude Code on the web and in your terminal",
                  "Create files and execute code",
                  "Access to unlimited projects to organize chats and documents",
                  "Access to Research",
                  "Connect Google Workspace: email, calendar, and docs",
                  "Integrate any context or tool through connectors with remote MCP",
                  "Extended thinking for complex work",
                  "Ability to use more Claude models",
                ]}
                highlighted="Everything in Free, plus:"
              />
              <PricingCard
                icon={<PricingIcon variant="max" />}
                title="Max"
                subtitle="Get the most out of Claude"
                price="From $100"
                priceSubtext="Per person billed monthly"
                features={[
                  "Choose 5x or 20x more usage than Pro*",
                  "Higher output limits for all tasks",
                  "Memory across conversations",
                  "Early access to advanced Claude features",
                  "Priority access at high traffic times",
                ]}
                highlighted="Everything in Pro, plus:"
              />
            </div>
          )}

          {/* Team & Enterprise Plans */}
          {activeTab === "team" && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <PricingCard
                icon={<PricingIcon variant="team" />}
                title="Team"
                subtitle="For collaboration across organizations"
                customPricing={
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Standard seat</p>
                      <p className="text-xs text-muted-foreground">Chat, projects, and more</p>
                      <p className="text-2xl font-semibold mt-1">$25</p>
                      <p className="text-xs text-muted-foreground">Per person / month with annual subscription discount. $30 if billed monthly. Minimum 5 members.</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Premium seat</p>
                      <p className="text-xs text-muted-foreground">Includes Claude Code</p>
                      <p className="text-2xl font-semibold mt-1">$150</p>
                      <p className="text-xs text-muted-foreground">Per person / month. Minimum 5 members.</p>
                    </div>
                  </div>
                }
                features={[
                  "More usage*",
                  "Admin controls for remote and local connectors",
                  "Single sign-on (SSO) and domain capture",
                  "Enterprise deployment for the Claude desktop app",
                  "Enterprise search across your organization",
                  "Connect Microsoft 365, Slack, and more",
                  "Central billing and administration",
                  "Early access to collaboration features",
                  "Claude Code available with premium seat",
                ]}
                buttonText="Create a Team plan"
              />
              <PricingCard
                icon={<PricingIcon variant="enterprise" />}
                title="Enterprise"
                subtitle="For businesses operating at scale"
                customPricing={
                  <div className="mb-4">
                    <Button variant="outline" className="w-full rounded-full">Contact sales</Button>
                  </div>
                }
                features={[
                  "More usage*",
                  "Enhanced context window",
                  "Role-based access with fine-grained permissioning",
                  "System for Cross-domain Identity Management (SCIM)",
                  "Audit logs",
                  "Google Docs cataloging",
                  "Compliance API for observability and monitoring",
                  "Claude Code available with premium seat",
                  "Custom data retention controls",
                ]}
                highlighted="Everything in Team, plus:"
                hideButton
              />
            </div>
          )}

          {/* API Plans */}
          {activeTab === "api" && (
            <div className="space-y-16">
              {/* API Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <PricingCard
                  icon={<PricingIcon variant="free" />}
                  title="Free"
                  subtitle="Try Claude"
                  price="$0"
                  priceSubtext="Free for everyone"
                  features={[
                    "Chat on web, iOS, Android, and on your desktop",
                    "Generate code and visualize data",
                    "Write, edit, and create content",
                    "Analyze text and images",
                    "Ability to search the web",
                    "Unlock more from Claude with desktop extensions",
                  ]}
                />
                <PricingCard
                  icon={<PricingIcon variant="pro" />}
                  title="Pro"
                  subtitle="For everyday productivity"
                  price="$17"
                  priceSubtext="Per month with annual subscription discount ($200 billed up front). $20 if billed monthly."
                  features={[
                    "More usage*",
                    "Access Claude Code on the web and in your terminal",
                    "Create files and execute code",
                    "Access to unlimited projects to organize chats and documents",
                    "Access to Research",
                    "Connect Google Workspace: email, calendar, and docs",
                    "Extended thinking for complex work",
                    "Ability to use more Claude models",
                  ]}
                  highlighted="Everything in Free, plus:"
                />
                <PricingCard
                  icon={<PricingIcon variant="max" />}
                  title="Max"
                  subtitle="Get the most out of Claude"
                  price="From $100"
                  priceSubtext="Per person billed monthly"
                  features={[
                    "Choose 5x or 20x more usage than Pro*",
                    "Higher output limits for all tasks",
                    "Memory across conversations",
                    "Early access to advanced Claude features",
                    "Priority access at high traffic times",
                  ]}
                  highlighted="Everything in Pro, plus:"
                />
              </div>

              {/* API Model Pricing */}
              <section className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-heading text-2xl mb-2">Latest models</h2>
                    <p className="text-sm text-muted-foreground">
                      Save 50% with batch processing.{" "}
                      <a href="#" className="text-primary underline">Learn more</a>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full">Contact sales</Button>
                    <Button className="bg-foreground text-background rounded-full">Start building</Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <ModelPricingCard
                    title="Opus 4.5"
                    description="Most intelligent model for building agents and coding"
                    inputPrice="$5 / MTok"
                    outputPrice="$25 / MTok"
                    caching={[
                      { label: "Write", price: "$6.25 / MTok" },
                      { label: "Read", price: "$0.50 / MTok" },
                    ]}
                  />
                  <ModelPricingCard
                    title="Sonnet 4.5"
                    description="Optimal balance of intelligence, cost, and speed"
                    inputPrice="$3 / MTok"
                    inputSubtext="Prompts ≤ 200K tokens"
                    outputPrice="$15 / MTok"
                    outputSubtext="Prompts ≤ 200K tokens"
                    caching={[
                      { label: "Write (≤ 200K)", price: "$3.75 / MTok" },
                      { label: "Read (≤ 200K)", price: "$0.30 / MTok" },
                    ]}
                  />
                  <ModelPricingCard
                    title="Haiku 4.5"
                    description="Fastest, most cost-efficient model"
                    inputPrice="$1 / MTok"
                    outputPrice="$5 / MTok"
                    caching={[
                      { label: "Write", price: "$1.25 / MTok" },
                      { label: "Read", price: "$0.10 / MTok" },
                    ]}
                  />
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Prompt caching pricing reflects 5-minute TTL. Learn about{" "}
                  <a href="#" className="underline">extended prompt caching</a>.
                </p>
              </section>

              {/* Tools Pricing */}
              <section className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl mb-2">Pricing for tools</h2>
                  <p className="text-sm text-muted-foreground">
                    Get even more out of Claude with advanced features and capabilities.{" "}
                    <a href="#" className="text-primary underline">Learn more</a>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-heading text-xl mb-2">Web search</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Give Claude access to the latest information from the web. Doesn't include input and output tokens required to process requests.
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Cost</span>
                      <span className="font-semibold ml-2">$10 / 1K searches</span>
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-heading text-xl mb-2">Code execution</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Run Python code in a sandboxed environment for advanced data analysis. 50 free hours of usage daily per organization.
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Additional hours</span>
                      <span className="font-semibold ml-2">$0.05 per hour per container</span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Footer note */}
          <p className="text-xs text-muted-foreground text-center mt-12">
            Additional <a href="#" className="underline">usage limits</a> apply. Prices shown don't include applicable tax.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface PricingCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  price?: string;
  priceSubtext?: string;
  customPricing?: React.ReactNode;
  features: string[];
  highlighted?: string;
  buttonText?: string;
  hideButton?: boolean;
}

const PricingCard = ({
  icon,
  title,
  subtitle,
  price,
  priceSubtext,
  customPricing,
  features,
  highlighted,
  buttonText = "Try Claude",
  hideButton = false,
}: PricingCardProps) => (
  <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
    <div className="mb-4">{icon}</div>
    <h3 className="font-heading text-2xl mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
    
    {customPricing ? (
      customPricing
    ) : (
      <>
        <p className="text-3xl font-semibold mb-1">{price}</p>
        <p className="text-xs text-muted-foreground mb-6">{priceSubtext}</p>
      </>
    )}

    {!hideButton && (
      <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full mb-6">
        {buttonText}
      </Button>
    )}

    {highlighted && (
      <p className="font-medium text-sm mb-3">{highlighted}</p>
    )}

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

interface ModelPricingCardProps {
  title: string;
  description: string;
  inputPrice: string;
  inputSubtext?: string;
  outputPrice: string;
  outputSubtext?: string;
  caching: { label: string; price: string }[];
}

const ModelPricingCard = ({
  title,
  description,
  inputPrice,
  inputSubtext,
  outputPrice,
  outputSubtext,
  caching,
}: ModelPricingCardProps) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <h3 className="font-heading text-xl mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground mb-6">{description}</p>
    
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground">Input</p>
        {inputSubtext && <p className="text-xs text-muted-foreground">{inputSubtext}</p>}
        <p className="font-semibold">{inputPrice}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Output</p>
        {outputSubtext && <p className="text-xs text-muted-foreground">{outputSubtext}</p>}
        <p className="font-semibold">{outputPrice}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">Prompt caching</p>
        {caching.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PricingIcon = ({ variant }: { variant: "free" | "pro" | "max" | "team" | "enterprise" }) => {
  const iconClass = "w-10 h-10 text-foreground";
  
  return (
    <svg className={iconClass} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 16V28" stroke="currentColor" strokeWidth="1.5" />
      {variant === "free" && (
        <>
          <circle cx="12" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
      {variant === "pro" && (
        <>
          <circle cx="12" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="28" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3" />
        </>
      )}
      {(variant === "max" || variant === "team" || variant === "enterprise") && (
        <>
          <circle cx="12" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
          <circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
          <circle cx="28" cy="28" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
        </>
      )}
      <path d="M12 25L20 16L28 25" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
};

export default Pricing;
