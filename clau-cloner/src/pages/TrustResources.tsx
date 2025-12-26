import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, ExternalLink, Lock } from "lucide-react";

const resourceCategories = [
  { id: "system-cards", label: "System / Model Cards" },
  { id: "soc2", label: "SOC 2" },
  { id: "iso", label: "ISO" },
  { id: "hipaa", label: "HIPAA" },
  { id: "fedramp", label: "FedRAMP" },
  { id: "international", label: "International Compliance" },
  { id: "questionnaires", label: "Questionnaires" },
  { id: "diagrams", label: "Diagrams" },
  { id: "compliance-api", label: "Compliance API" },
  { id: "frontier", label: "Frontier AI Compliance" },
  { id: "code-of-conduct", label: "Code of Conduct" },
  { id: "other", label: "Other Documents" },
];

const resources = {
  "system-cards": [
    { name: "[Anthropic] - Claude 4.5 Sonnet System Card", access: "view" },
    { name: "[Anthropic] - Claude 4 System Card", access: "view" },
    { name: "[Anthropic] - Claude 3.7 Sonnet System Card", access: "view" },
    { name: "[Anthropic] - Claude 3.5 Sonnet Model Card Addendum", access: "view" },
    { name: "[Anthropic] - Claude 3.5 Haiku and Upgraded 3.5 Sonnet Model Card Addendum", access: "view" },
    { name: "[Anthropic] - Claude 3 Model Card", access: "view" },
  ],
  "soc2": [
    { name: "[Anthropic] 2025 Type 2 SOC 2 and CSA STAR L2 Report.pdf", access: "request" },
    { name: "[Anthropic] 2025 Type 2 SOC 3 Report.pdf", access: "view" },
  ],
  "iso": [
    { name: "[Anthropic] ISO 27001 Certificate (2025).pdf", access: "view" },
    { name: "[Anthropic] ISO 42001 Certificate (2025).pdf", access: "view" },
    { name: "[Anthropic] - ISO Statement of Applicability", access: "request" },
  ],
  "hipaa": [
    { name: "[Anthropic] 2025 Type 1 HIPAA Report (1P API).pdf", access: "request" },
    { name: "Claude for Enterprise - HIPAA-Ready Offering Implementation Guide", access: "request" },
  ],
  "fedramp": [
    { name: "Claude for Government (C4G) PFCS-SS FedRAMP High Authorization Package", access: "view" },
  ],
  "international": [
    { name: "[Anthropic Ireland Limited] Cyber Essentials Certificate (2025)", access: "view" },
  ],
  "questionnaires": [
    { name: "[Anthropic] - SIG Lite (March 2025)", access: "request" },
    { name: "[Anthropic] - CAIQ Lite (March 2025)", access: "request" },
    { name: "[Anthropic] - VSA Core (March 2025)", access: "request" },
    { name: "[Anthropic] - HECVAT v4.04 (July 2025 v2)", access: "request" },
  ],
  "diagrams": [
    { name: "[Anthropic] - Infrastructure Diagram - April 2025", access: "request" },
  ],
  "compliance-api": [
    { name: "Anthropic Compliance API v2025-11-15_RevC", access: "request" },
  ],
  "frontier": [
    { name: "AB 2013 Training Data Summary", access: "view" },
    { name: "Anthropic Frontier Compliance Framework", access: "view" },
  ],
  "code-of-conduct": [
    { name: "Global Code of Conduct", access: "request" },
    { name: "Global Vendor Code of Conduct", access: "request" },
  ],
  "other": [
    { name: "[Anthropic] Data Processing Addendum", access: "view" },
    { name: "[Anthropic] 2025 Annual Penetration Testing Reports", access: "request" },
    { name: "[Anthropic] Evidence of Insurance (COI)", access: "request" },
    { name: "[Anthropic] VPAT - Accessibility Conformance Report (ACR)", access: "request" },
    { name: "[Anthropic] Statement on Modern Slavery Act 2015", access: "view" },
  ],
};

const TrustResources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header pageType="skills" />
      
      {/* Hero Section */}
      <section className="bg-[#c4a77d] text-foreground py-16 relative overflow-hidden">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Welcome to the Anthropic Trust Center
          </h1>
          <p className="text-lg text-foreground/80 mb-6 max-w-2xl">
            Anthropic is an AI safety and research company with a mission of ensuring the world safely 
            makes the transition through transformative AI. We believe deeply in transparency and the 
            need for secure practices in this rapidly evolving industry.
          </p>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Privacy Policy
          </Button>
        </div>
        
        {/* Decorative illustration */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-48 h-48 bg-background rounded-lg shadow-lg flex items-center justify-center">
            <Lock className="h-24 w-24 text-foreground/20" />
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <div className="container">
          <nav className="flex gap-8 py-4">
            {["Overview", "Resources", "Subprocessors", "FAQ", "Updates"].map((tab, i) => (
              <button
                key={tab}
                className={`text-sm font-medium transition-colors ${
                  i === 1 
                    ? "text-foreground border-b-2 border-foreground pb-4 -mb-4" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="space-y-2 sticky top-24">
                {resourceCategories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {cat.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Resources List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-2xl font-bold">Resources</h2>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Bulk download
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search resources" 
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              {resourceCategories.map((cat) => (
                <div key={cat.id} id={cat.id} className="mb-12">
                  <h3 className="font-heading text-lg font-semibold mb-4">{cat.label}</h3>
                  <div className="space-y-2">
                    {resources[cat.id as keyof typeof resources]?.map((resource, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-sm">{resource.name}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Copy link
                          </Button>
                          <Button 
                            variant={resource.access === "view" ? "outline" : "secondary"} 
                            size="sm"
                          >
                            {resource.access === "view" ? "View" : "Request access"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrustResources;
