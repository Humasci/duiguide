import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    logo: "Notion",
    quote: "The platform's Prompt caching makes Notion AI faster and cheaper, all while maintaining state-of-the-art quality. This enables us to create a more elevated and responsive user experience for our customers.",
    author: "Simon Last",
    role: "Co-founder",
  },
  {
    logo: "iGent AI",
    quote: "Claude Opus 4.5 handles long-horizon coding tasks more efficiently than any model we've tested. It achieves higher pass rates on held-out tests while using up to 65% fewer tokens, giving developers real cost control without sacrificing quality.",
    author: "Sean Ward",
    role: "CEO and Co-founder",
  },
  {
    logo: "StubHub",
    quote: "The decision to choose Claude was entirely data-driven. We tested multiple model providers side by side, and Claude consistently delivered the best results for case resolution rates and customer satisfaction scores.",
    author: "Timothy Addison",
    role: "Engineering Org Chief of Staff",
    hasLink: true,
  },
  {
    logo: "Thomson Reuters",
    quote: "The partnership with Anthropic has been exceptional—their guidance and support have helped our engineering teams maximize the models.",
    author: "Joel Hron",
    role: "CTO",
    hasLink: true,
  },
  {
    logo: "Intercom",
    quote: "With Claude, we're not just automating customer service—we're elevating it to truly human quality. This lets support teams think more strategically about customer experience and what makes interactions genuinely valuable.",
    author: "Fergal Reid",
    role: "VP of AI",
    hasLink: true,
  },
  {
    logo: "Cursor",
    quote: "We're seeing state-of-the-art coding performance from Claude Sonnet 4.5, with significant improvements on longer horizon tasks. It reinforces why many developers using Cursor choose Claude for solving their most complex problems.",
    author: "Michael Truell",
    role: "CEO",
  },
];

const models = [
  {
    name: "Opus 4.5",
    description: "Most intelligent model for building agents and coding",
    inputPrice: "$5 / MTok",
    outputPrice: "$25 / MTok",
    cacheWrite: "$6.25 / MTok",
    cacheRead: "$0.50 / MTok",
  },
  {
    name: "Sonnet 4.5",
    description: "Optimal balance of intelligence, cost, and speed",
    inputPrice: "$3 / MTok",
    outputPrice: "$15 / MTok",
    cacheWrite: "$3.75 / MTok",
    cacheRead: "$0.30 / MTok",
    tiered: true,
  },
  {
    name: "Haiku 4.5",
    description: "Fastest, most cost-effective model",
    inputPrice: "$1 / MTok",
    outputPrice: "$5 / MTok",
    cacheWrite: "$1.25 / MTok",
    cacheRead: "$0.10 / MTok",
  },
];

const tools = [
  { name: "Prompt caching", description: "Give Claude more background knowledge and example outputs to reduce costs and latency." },
  { name: "Web search", description: "Augment Claude's knowledge with current, real-world data from across the web." },
  { name: "Advanced tool use", description: "Allow Claude to interact with hundreds of external tools and APIs so it can perform a wider range of tasks." },
  { name: "Batch processing", description: "Process large volumes of requests asynchronously and save 50% on costs." },
  { name: "Memory", description: "Let Claude store and consult information from a dedicated memory file." },
  { name: "Context editing", description: "Automatically clear less relevant tool calls and results from the context window when approaching token limits." },
  { name: "MCP connector", description: "Connect Claude to any remote MCP server without writing client code." },
  { name: "Code execution", description: "Run Python code, create visualizations, and analyze data directly within API calls." },
  { name: "Citations", description: "Get detailed references to the exact sentences and passages Claude uses to generate responses, leading to more verifiable, trustworthy outputs." },
  { name: "Files API", description: "Upload documents once and reference them repeatedly across conversations." },
];

const useCases = [
  {
    title: "Coding",
    description: "Our models are constantly improving on coding, math, and reasoning. Claude can complete complex engineering tasks to solve problems that would typically take a full day of engineering work.",
    hasLink: true,
  },
  {
    title: "Agents",
    description: "Claude offers superior instruction following, tool selection, error correction, and advanced reasoning for customer-facing agents and complex AI workflows.",
    hasLink: true,
  },
  {
    title: "Productivity",
    description: "Claude can extract relevant information from business emails and documents, categorize and summarize survey responses, and wrangle reams of text with high speed and accuracy.",
    hasLink: false,
  },
  {
    title: "Customer support",
    description: "Claude can handle ticket triage, on-demand complex inquiries using rich context awareness, and multi-step support workflows—all with a casual tone and conversational responses.",
    hasLink: true,
  },
];

const DarkTheme = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeToolIndex, setActiveToolIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0d0d0d]/60 border-b border-white/10">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="#E85D2D" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-bold text-white">Claude</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {["Meet Claude", "Platform", "Solutions", "Pricing", "Learn"].map((item) => (
              <button
                key={item}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {item}
                <ChevronDown className="h-4 w-4" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              Contact sales
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-5">
              Try Claude
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container flex h-12 items-center justify-between">
            <span className="text-sm font-medium text-white">Platform</span>
            <button className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors">
              Explore here
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-tight mb-6">
                Build on the Claude Developer Platform
              </h1>
              <p className="text-xl text-white/60 mb-8 max-w-lg">
                Use our API to create new user experiences, products, and ways to work with the most advanced AI models on the market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-3 text-base">
                  Start building
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-3 text-base">
                  See developer docs
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Abstract geometric illustration */}
                  <circle cx="200" cy="120" r="60" fill="#E85D2D" />
                  <rect x="160" y="200" width="120" height="100" fill="#E85D2D" opacity="0.8" />
                  <path d="M100 150 Q 200 50, 300 150" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                  <path d="M320 180 L 350 280 L 290 280 Z" fill="#1a1a1a" />
                  <circle cx="340" cy="200" r="8" fill="#1a1a1a" />
                  <circle cx="360" cy="240" r="8" fill="#1a1a1a" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12">
              <div className="text-2xl font-bold text-white/40 mb-6">{testimonials[currentTestimonial].logo}</div>
              <blockquote className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{testimonials[currentTestimonial].author}</p>
                  <p className="text-white/60">{testimonials[currentTestimonial].role}</p>
                </div>
                {testimonials[currentTestimonial].hasLink && (
                  <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                    Read story →
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-white/60" />
              </button>
              <span className="text-white/60 text-sm">
                {currentTestimonial + 1}/{testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Choose How to Get Started */}
      <section className="py-20 border-t border-white/10">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Choose how to get started</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Build on your own</h3>
              <p className="text-white/60 mb-6">Launch your own generative AI solution with:</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Access to all Claude models",
                  "Usage-based tiers",
                  "Automatically increasing rate limits",
                  "Simple pay-as-you-go pricing",
                  "Self-serve deployment on workbench",
                  "Prompting guides and developer docs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#E85D2D] mt-1">•</span>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                Start building
              </Button>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">Get extra support</h3>
              <p className="text-white/60 mb-6">Need custom rate limits or hands-on help? Contact our sales team for:</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Anthropic-supported onboarding",
                  "Custom rate limits",
                  "Billing via monthly invoices",
                  "Prompting support",
                  "Deployment support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#E85D2D] mt-1">•</span>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
                Contact sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Claude Models */}
      <section className="py-20 border-t border-white/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Claude models</h2>
            <p className="text-white/60 text-lg mb-6">Right-sized for any task, our models offer the best combination of speed and performance.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                Start building
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
                Learn more
              </Button>
            </div>
            <p className="text-[#E85D2D] text-sm mt-4">Save 50% with batch processing.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {models.map((model) => (
              <div key={model.name} className="bg-[#1a1a1a] rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                <p className="text-white/60 text-sm mb-6">{model.description}</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 text-xs uppercase mb-1">Input</p>
                    <p className="text-white font-medium">{model.inputPrice}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase mb-1">Output</p>
                    <p className="text-white font-medium">{model.outputPrice}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/40 text-xs uppercase mb-2">Prompt caching</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-white/40 text-xs">Write</p>
                        <p className="text-white text-sm">{model.cacheWrite}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">Read</p>
                        <p className="text-white text-sm">{model.cacheRead}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mt-6">
            Prompt caching pricing reflects 5-minute TTL. Learn about extended prompt caching.
          </p>
        </div>
      </section>

      {/* Built-in Tools */}
      <section className="py-20 border-t border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-serif">Do more with built-in tools</h2>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
              See developer docs
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className={`p-6 rounded-xl cursor-pointer transition-all ${
                  activeToolIndex === index
                    ? "bg-[#E85D2D] text-white"
                    : "bg-[#1a1a1a] hover:bg-[#252525]"
                }`}
                onClick={() => setActiveToolIndex(index)}
              >
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className={`text-sm ${activeToolIndex === index ? "text-white/90" : "text-white/60"}`}>
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Console Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
            Get to production faster with the Claude Console
          </h2>
          <p className="text-white/60 text-center text-lg mb-12 max-w-2xl mx-auto">
            Integrate Claude's powerful AI capabilities into your apps and deliver production-grade solutions faster.
          </p>
          
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white/60">Existing prompt</h3>
                <div className="bg-[#0d0d0d] rounded-lg p-4 text-sm text-white/70 font-mono">
                  <p>Classify all customer support tickets into the most relevant category.</p>
                  <p className="mt-4">Here is the list of categories to choose from:</p>
                  <p className="text-[#E85D2D]">{"{{CATEGORY_LIST}}"}</p>
                  <p className="mt-4">Here is the content of the support ticket:</p>
                  <p className="text-[#E85D2D]">{"{{TICKET_CONTENT}}"}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Built for developers</h3>
                <p className="text-white/60 mb-4">Build, test, and iterate on your deployment:</p>
                <ul className="space-y-3">
                  {[
                    "Automatically generate or improve existing prompts",
                    "Evaluate model responses against real-world scenarios",
                    "Build faster with pre-built cookbooks and guides",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#E85D2D] mt-1">•</span>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 border-t border-white/10">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">Use cases for Claude</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-[#1a1a1a] rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-white/60 mb-6">{useCase.description}</p>
                {useCase.hasLink && (
                  <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 p-0">
                    Learn more →
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Start building</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
              See pricing
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
              Start building
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DarkTheme;
