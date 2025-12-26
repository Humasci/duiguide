import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/ui-showcase/Timeline";
import Iceberg from "@/components/ui-showcase/Iceberg";
import IcebergVisual from "@/components/ui-showcase/IcebergVisual";
import DecisionTree from "@/components/ui-showcase/DecisionTree";
import DecisionTreeDiagram from "@/components/ui-showcase/DecisionTreeDiagram";
import FeatureCard from "@/components/ui-showcase/FeatureCard";
import UseCaseCard from "@/components/ui-showcase/UseCaseCard";
import ResourceCard from "@/components/ui-showcase/ResourceCard";
import BlogCard from "@/components/ui-showcase/BlogCard";
import PricingCard from "@/components/ui-showcase/PricingCard";
import TestimonialCard from "@/components/ui-showcase/TestimonialCard";
import HeroCard, { DocumentCard, SkillCard, FolderCard } from "@/components/ui-showcase/HeroCard";
import TabButton, { TabGroup } from "@/components/ui-showcase/TabButton";
import USStatesMap from "@/components/ui-showcase/USStatesMap";
import ArizonaCountiesMap from "@/components/ui-showcase/ArizonaCountiesMap";
import TexasCountiesMap from "@/components/ui-showcase/TexasCountiesMap";
import GeorgiaCountiesMap from "@/components/ui-showcase/GeorgiaCountiesMap";
import NorthCarolinaCountiesMap from "@/components/ui-showcase/NorthCarolinaCountiesMap";
import TennesseeCountiesMap from "@/components/ui-showcase/TennesseeCountiesMap";
import LatestUpdates from "@/components/ui-showcase/LatestUpdates";
import { AnnouncementsGrid } from "@/components/ui-showcase/AnnouncementCard";
import { useState } from "react";
import { 
  Target, Zap, Code, Shield, Rocket, DollarSign, Users, Building, 
  Clock, TrendingUp, AlertTriangle, FileSpreadsheet, Layers, Workflow,
  Play, CheckCircle2
} from "lucide-react";

const Components = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  // Timeline demo data
  const timelinePhases = [
    {
      id: "discovery",
      title: "Discovery",
      description: "Research and requirements gathering",
      status: "completed" as const,
      icon: <Target className="w-5 h-5" />
    },
    {
      id: "design",
      title: "Design",
      description: "Create wireframes and prototypes",
      status: "completed" as const,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: "development",
      title: "Development",
      description: "Build and implement features",
      status: "current" as const,
      icon: <Code className="w-5 h-5" />
    },
    {
      id: "testing",
      title: "Testing",
      description: "QA and user testing",
      status: "upcoming" as const,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "launch",
      title: "Launch",
      description: "Deploy and monitor",
      status: "upcoming" as const,
      icon: <Rocket className="w-5 h-5" />
    }
  ];

  // Iceberg demo data
  const icebergItems = [
    {
      id: "license",
      title: "Software License",
      description: "The upfront cost everyone sees",
      level: "visible" as const,
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      id: "implementation",
      title: "Implementation Costs",
      description: "Setup, configuration, and customization",
      level: "surface" as const,
      icon: <Code className="w-4 h-4" />
    },
    {
      id: "training",
      title: "Training & Onboarding",
      description: "Getting your team up to speed",
      level: "surface" as const,
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "integration",
      title: "Integration Complexity",
      description: "Connecting with existing systems",
      level: "deep" as const,
      icon: <Building className="w-4 h-4" />
    },
    {
      id: "maintenance",
      title: "Ongoing Maintenance",
      description: "Updates, patches, and support",
      level: "deep" as const,
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: "productivity",
      title: "Productivity Loss",
      description: "Transition period inefficiencies",
      level: "hidden" as const,
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: "opportunity",
      title: "Opportunity Cost",
      description: "What else could you have built?",
      level: "hidden" as const,
      icon: <AlertTriangle className="w-4 h-4" />
    }
  ];

  // Step-by-step Decision Tree data
  const decisionNodes = [
    {
      id: "start",
      question: "Let's find the right solution",
      title: "What's your primary goal?",
      description: "We'll help you find the best approach based on your needs.",
      icon: <Target className="w-8 h-8" />,
      options: [
        { label: "Build a new product from scratch", nextId: "new-product" },
        { label: "Improve an existing product", nextId: "improve" },
        { label: "Automate internal processes", nextId: "automate" }
      ]
    },
    {
      id: "new-product",
      question: "Building something new",
      title: "What's your timeline?",
      icon: <Clock className="w-8 h-8" />,
      options: [
        { label: "Need it ASAP (< 3 months)", nextId: "fast" },
        { label: "Standard timeline (3-6 months)", nextId: "standard" },
        { label: "Long-term project (6+ months)", nextId: "longterm" }
      ]
    },
    {
      id: "improve",
      question: "Improving existing product",
      title: "What needs the most attention?",
      icon: <TrendingUp className="w-8 h-8" />,
      options: [
        { label: "Performance & speed", nextId: "performance" },
        { label: "User experience", nextId: "ux" },
        { label: "New features", nextId: "features" }
      ]
    },
    {
      id: "automate",
      question: "Process automation",
      title: "What type of processes?",
      icon: <Zap className="w-8 h-8" />,
      options: [
        { label: "Data processing & analysis", nextId: "data" },
        { label: "Customer communications", nextId: "comms" },
        { label: "Internal workflows", nextId: "workflows" }
      ]
    },
    {
      id: "fast",
      title: "Rapid MVP Development",
      description: "We recommend our accelerated development program with pre-built components and rapid iteration cycles.",
      icon: <Rocket className="w-8 h-8" />,
      isEndpoint: true,
      href: "#mvp"
    },
    {
      id: "standard",
      title: "Full-Stack Development",
      description: "Our comprehensive development approach with full customization and thorough testing.",
      icon: <Code className="w-8 h-8" />,
      isEndpoint: true,
      href: "#fullstack"
    },
    {
      id: "longterm",
      title: "Enterprise Solution",
      description: "Strategic partnership with dedicated team, ongoing support, and scalable architecture.",
      icon: <Building className="w-8 h-8" />,
      isEndpoint: true,
      href: "#enterprise"
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Audit and optimize your application for speed, efficiency, and reliability.",
      icon: <Zap className="w-8 h-8" />,
      isEndpoint: true,
      href: "#performance"
    },
    {
      id: "ux",
      title: "UX Redesign",
      description: "User research, design thinking, and interface improvements for better engagement.",
      icon: <Users className="w-8 h-8" />,
      isEndpoint: true,
      href: "#ux"
    },
    {
      id: "features",
      title: "Feature Development",
      description: "Expand your product capabilities with new, well-integrated features.",
      icon: <Target className="w-8 h-8" />,
      isEndpoint: true,
      href: "#features"
    },
    {
      id: "data",
      title: "Data Pipeline Automation",
      description: "Automated data collection, processing, and visualization solutions.",
      icon: <TrendingUp className="w-8 h-8" />,
      isEndpoint: true,
      href: "#data"
    },
    {
      id: "comms",
      title: "Communication Automation",
      description: "Intelligent customer engagement with personalized, automated messaging.",
      icon: <Users className="w-8 h-8" />,
      isEndpoint: true,
      href: "#comms"
    },
    {
      id: "workflows",
      title: "Workflow Automation",
      description: "Streamline internal processes with custom automation solutions.",
      icon: <Zap className="w-8 h-8" />,
      isEndpoint: true,
      href: "#workflows"
    }
  ];

  // Tree Diagram data
  const treeNodes = [
    {
      id: "root",
      label: "What's your goal?",
      children: [
        { label: "Build new", nodeId: "build" },
        { label: "Improve", nodeId: "improve-tree" },
        { label: "Automate", nodeId: "automate-tree" }
      ]
    },
    {
      id: "build",
      label: "Build New Product",
      description: "Start from scratch with a custom solution",
      children: [
        { label: "Fast", nodeId: "mvp" },
        { label: "Standard", nodeId: "standard-tree" },
        { label: "Enterprise", nodeId: "enterprise-tree" }
      ]
    },
    {
      id: "improve-tree",
      label: "Improve Existing",
      description: "Enhance what you already have",
      children: [
        { label: "Performance", nodeId: "perf" },
        { label: "UX", nodeId: "ux-tree" },
        { label: "Features", nodeId: "feat" }
      ]
    },
    {
      id: "automate-tree",
      label: "Automate Processes",
      description: "Streamline your workflows",
      children: [
        { label: "Data", nodeId: "data-tree" },
        { label: "Comms", nodeId: "comms-tree" },
        { label: "Workflows", nodeId: "work" }
      ]
    },
    {
      id: "mvp",
      label: "Rapid MVP",
      description: "Get to market in under 3 months with our accelerated program",
      href: "#mvp"
    },
    {
      id: "standard-tree",
      label: "Full-Stack Dev",
      description: "Comprehensive development with 3-6 month timeline",
      href: "#fullstack"
    },
    {
      id: "enterprise-tree",
      label: "Enterprise",
      description: "Long-term strategic partnership with dedicated team",
      href: "#enterprise"
    },
    {
      id: "perf",
      label: "Performance",
      description: "Speed and efficiency optimization",
      href: "#performance"
    },
    {
      id: "ux-tree",
      label: "UX Redesign",
      description: "Better user experience and engagement",
      href: "#ux"
    },
    {
      id: "feat",
      label: "New Features",
      description: "Expand product capabilities",
      href: "#features"
    },
    {
      id: "data-tree",
      label: "Data Pipeline",
      description: "Automated data processing",
      href: "#data"
    },
    {
      id: "comms-tree",
      label: "Communications",
      description: "Customer engagement automation",
      href: "#comms"
    },
    {
      id: "work",
      label: "Workflows",
      description: "Internal process automation",
      href: "#workflows"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header pageType="skills" />

      {/* Hero */}
      <section className="pt-16 pb-8">
        <div className="container max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6 text-foreground">
            UI Components
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Interactive components designed to enhance user engagement and guide decision-making.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Cards</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Various card styles for different content types.
            </p>

            {/* Feature Cards */}
            <div className="mb-16">
              <h3 className="font-heading text-xl font-normal text-foreground mb-6">Feature Cards</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  icon={CheckCircle2}
                  title="Get consistent results"
                  description="Skills give Claude details on how you want to create documents, analyze data, and automate workflows."
                />
                <FeatureCard
                  icon={Building}
                  title="Capture what you know"
                  description="Package your organization's knowledge so everyone gets consistent results."
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <FeatureCard
                  icon={Layers}
                  title="Build once"
                  description="The same skill runs across all platforms."
                  variant="centered"
                />
                <FeatureCard
                  icon={Workflow}
                  title="Stack skills"
                  description="Combine skills for complex workflows."
                  variant="centered"
                />
                <FeatureCard
                  icon={Zap}
                  title="Automate"
                  description="No manual selection required."
                  variant="centered"
                />
              </div>
            </div>

            {/* Use Case Cards */}
            <div className="mb-16">
              <h3 className="font-heading text-xl font-normal text-foreground mb-6">Use Case Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <UseCaseCard
                  icon={FileSpreadsheet}
                  title="Built-in workflows"
                  description="Claude handles the essentials every team needs."
                  items={[
                    "Create Excel sheets with formulas",
                    "Analyze and visualize data",
                    "Convert files between formats"
                  ]}
                />
                <UseCaseCard
                  icon={Building}
                  title="Company-specific"
                  description="Package your organization's knowledge."
                  items={[
                    "Apply brand guidelines",
                    "Use pre-built industry skills",
                    "Create custom workflows"
                  ]}
                />
                <UseCaseCard
                  icon={Users}
                  title="Individual workflows"
                  description="Create skills for how you work."
                  items={[
                    "Build note-taking systems",
                    "Make development workflows",
                    "Create research methods"
                  ]}
                />
              </div>
            </div>

            {/* Resource & Blog Cards */}
            <div className="mb-16">
              <h3 className="font-heading text-xl font-normal text-foreground mb-6">Resource & Blog Cards</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <ResourceCard
                  type="Blog"
                  title="Skills explained: How Skills compares to prompts, Projects, and MCP"
                />
                <ResourceCard
                  type="Video"
                  title="Building Skills for Claude Code: Automating your procedural knowledge"
                />
                <ResourceCard
                  type="eBook"
                  title="The Enterprise AI transformation guide for healthcare"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <BlogCard
                  title="Equipping agents for the real world"
                  description="Introducing Agent Skills, a new way to build specialized agents."
                  image="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69374c85bb1201b8c99e7874_image_marginalia-skills-eng-blog.webp"
                />
                <BlogCard
                  title="Improving frontend design through Skills"
                  description="Best practices for building richer, more customized frontend design."
                  image="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6937b189e2c0aead6e5f66cc_85f472e26270265f7bb77786bb2d34e6_skills-blog-post.webp"
                />
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="mb-16">
              <h3 className="font-heading text-xl font-normal text-foreground mb-6">Pricing Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <PricingCard
                  title="Free"
                  subtitle="Try it out"
                  price="$0"
                  priceSubtext="Free for everyone"
                  features={[
                    "Chat on web and mobile",
                    "Generate code",
                    "Write and edit content",
                    "Analyze text and images"
                  ]}
                />
                <PricingCard
                  title="Pro"
                  subtitle="For everyday productivity"
                  price="$20"
                  priceSubtext="Per month"
                  features={[
                    "More usage",
                    "Access to Claude Code",
                    "Create files and execute code",
                    "Extended thinking"
                  ]}
                  highlighted="Everything in Free, plus:"
                />
                <PricingCard
                  title="Enterprise"
                  subtitle="For businesses at scale"
                  features={[
                    "Custom usage limits",
                    "Enhanced context window",
                    "SSO and domain capture",
                    "Compliance API"
                  ]}
                  buttonText="Contact sales"
                  buttonVariant="outline"
                  highlighted="Everything in Pro, plus:"
                />
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className="mb-16">
              <h3 className="font-heading text-xl font-normal text-foreground mb-6">Testimonial Cards</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <TestimonialCard
                  variant="compact"
                  quote="When we set out to create an AI agent, we focused on three key factors. Claude was the standout leader."
                  author="Alfredo Andere"
                  title="Co-founder and CEO"
                  company="Latch Bio"
                />
                <TestimonialCard
                  variant="compact"
                  quote="Claude helps our team work faster while maintaining the accuracy our work demands."
                  author="Sarah Chen"
                  title="Director of Engineering"
                  company="Acme Corp"
                />
              </div>
            </div>

            {/* Hero Cards */}
            <div>
              <h3 className="font-heading text-xl font-normal text-foreground mb-6">Hero & Document Cards</h3>
              <HeroCard className="min-h-[300px] flex items-center justify-center">
                <div className="flex items-end gap-4 md:gap-8 transform -rotate-6">
                  <DocumentCard 
                    title="CRABRACADABRA" 
                    subtitle="GAMES" 
                    label="brand-guidelines.pdf"
                    className="transform rotate-[-8deg]"
                  />
                  <SkillCard 
                    icon={<Play className="h-4 w-4 text-muted-foreground" />}
                    className="transform rotate-[5deg] z-10"
                  />
                  <FolderCard 
                    label="Resources"
                    className="transform rotate-[12deg]"
                  />
                </div>
              </HeroCard>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Tabs</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Tab navigation styles for content switching.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-6">Pill Tabs</h3>
                <TabGroup>
                  <TabButton active={activeTab === "tab1"} onClick={() => setActiveTab("tab1")}>
                    Synthesis
                  </TabButton>
                  <TabButton active={activeTab === "tab2"} onClick={() => setActiveTab("tab2")}>
                    Protocols
                  </TabButton>
                  <TabButton active={activeTab === "tab3"} onClick={() => setActiveTab("tab3")}>
                    Bioinformatics
                  </TabButton>
                  <TabButton active={activeTab === "tab4"} onClick={() => setActiveTab("tab4")}>
                    Compliance
                  </TabButton>
                </TabGroup>
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-6">Segmented Tabs</h3>
                <TabGroup variant="segment">
                  <TabButton variant="segment" active={activeTab === "tab1"} onClick={() => setActiveTab("tab1")}>
                    Individual
                  </TabButton>
                  <TabButton variant="segment" active={activeTab === "tab2"} onClick={() => setActiveTab("tab2")}>
                    Team & Enterprise
                  </TabButton>
                  <TabButton variant="segment" active={activeTab === "tab3"} onClick={() => setActiveTab("tab3")}>
                    API
                  </TabButton>
                </TabGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Timeline</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Visualize phases of a process with interactive, clickable milestones.
            </p>

            <div className="space-y-20">
              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-8">Horizontal Layout</h3>
                <Timeline phases={timelinePhases} orientation="horizontal" />
              </div>

              <div>
                <h3 className="font-heading text-xl font-normal text-foreground mb-8">Vertical Layout</h3>
                <div className="max-w-md">
                  <Timeline phases={timelinePhases} orientation="vertical" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iceberg Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Iceberg (List View)</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Reveal hidden costs and consequences layer by layer.
            </p>

            <Iceberg 
              title="True Cost of Software" 
              subtitle="Click each layer to reveal hidden expenses"
              items={icebergItems}
            />
          </div>
        </div>
      </section>

      {/* Iceberg Visual Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Iceberg (Visual)</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive iceberg illustration with layered content.
            </p>

            <IcebergVisual 
              title="True Cost of Software" 
              subtitle="Click each depth level to reveal hidden expenses"
              items={icebergItems}
            />
          </div>
        </div>
      </section>

      {/* Decision Tree Step-by-Step Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Decision Tree (Step-by-Step)</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Guide users through choices to personalized recommendations.
            </p>

            <DecisionTree nodes={decisionNodes} startNodeId="start" />
          </div>
        </div>
      </section>

      {/* Decision Tree Diagram Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Decision Tree (Diagram)</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Visual tree structure showing all possible paths at once.
            </p>

            <DecisionTreeDiagram nodes={treeNodes} rootId="root" />
          </div>
        </div>
      </section>

      {/* US States Map Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">US States Map</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive grid visualization of US states. Click on any state to select it.
            </p>

            <USStatesMap 
              title="AI Adoption by State"
              description="Click on states to see details"
            />
          </div>
        </div>
      </section>

      {/* Arizona Counties Map Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Arizona Counties Map</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive grid map of Arizona's 15 counties. Click counties to select them.
            </p>

            <ArizonaCountiesMap 
              title="Arizona Counties"
              description="Click on a county to see details"
            />
          </div>
        </div>
      </section>

      {/* Texas Counties Map Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Texas Counties Map</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive grid map of Texas counties. Click counties to select them.
            </p>

            <TexasCountiesMap 
              title="Texas Counties"
              description="Click on a county to see details"
            />
          </div>
        </div>
      </section>

      {/* Georgia Counties Map Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Georgia Counties Map</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive grid map of Georgia's 159 counties. Click counties to select them.
            </p>

            <GeorgiaCountiesMap 
              title="Georgia Counties"
              description="Click on a county to see details"
            />
          </div>
        </div>
      </section>

      {/* North Carolina Counties Map Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">North Carolina Counties Map</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive grid map of North Carolina's 100 counties. Click counties to select them.
            </p>

            <NorthCarolinaCountiesMap 
              title="North Carolina Counties"
              description="Click on a county to see details"
            />
          </div>
        </div>
      </section>

      {/* Tennessee Counties Map Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Tennessee Counties Map</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Interactive grid map of Tennessee's 95 counties. Click counties to select them.
            </p>

            <TennesseeCountiesMap 
              title="Tennessee Counties"
              description="Click on a county to see details"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Latest Updates</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Searchable table of updates with date, category, and title columns.
            </p>

            <LatestUpdates 
              updates={[
                {
                  date: "Nov 5, 2025",
                  category: "Economic Research",
                  title: "Launching the Economic Futures Programme in the UK and Europe",
                },
                {
                  date: "Sep 15, 2025",
                  category: "Economic Research",
                  title: "Economic Index report: Uneven geographic and enterprise AI adoption",
                },
                {
                  date: "Sep 15, 2025",
                  category: "Economic Research",
                  title: "Economic Index: Tracking AI's role in the US and global economy",
                },
                {
                  date: "Apr 28, 2025",
                  category: "Societal Impacts",
                  title: "Economic Index: AI's impact on software development",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">Announcements</h2>
            <p className="text-muted-foreground text-lg mb-12">
              Card grid for announcements with title, description, and read more link.
            </p>

            <AnnouncementsGrid 
              title=""
              announcements={[
                {
                  title: "Economic Futures Symposium Proposals",
                  description: "A selection of policy proposals from attendees at our DC Economic Futures Symposium",
                },
                {
                  title: "Introducing Economic Futures Program",
                  description: "We're launching the Economic Futures program, a multidisciplinary effort that builds upon our existing economic research efforts.",
                },
                {
                  title: "Preserving privacy",
                  description: "The Economic Index is made possible by Clio, a system that allows us to analyze conversations while preserving user privacy.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Components;
