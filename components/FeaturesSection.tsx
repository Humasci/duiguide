import { CheckCircle2, Building2, Layers, Workflow } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Get consistent results on specialized tasks",
    description: "Skills give Claude details on how you want to create documents, analyze data, and automate workflows, so you get consistent outputs every time."
  },
  {
    icon: Building2,
    title: "Capture what your organization knows",
    description: "Package your company's procedures, best practices, and institutional knowledge so teams work consistently and new members get expert-level results from day one."
  },
  {
    icon: Layers,
    title: "Build once, use everywhere",
    description: "The same skill runs across Claude.ai, Claude Code, and the API without needing to modify for each platform."
  },
  {
    icon: Workflow,
    title: "Stack skills for complex work",
    description: "Combine skills for multi-step workflows. Claude uses what's needed, when it's needed—no manual selection required."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            Expert output, every time
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl hover:bg-card transition-colors duration-300"
            >
              <feature.icon className="h-8 w-8 text-primary mb-4 stroke-[1.5]" />
              <h3 className="font-heading text-xl font-normal text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;