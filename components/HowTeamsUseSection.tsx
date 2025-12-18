import { FileSpreadsheet, Building, User } from "lucide-react";

const useCases = [
  {
    icon: FileSpreadsheet,
    title: "Built-in workflows",
    description: "Claude can handle the essentials every team needs.",
    items: [
      "Create Excel sheets with working formulas, Powerpoints with your branding, and more",
      "Analyze and visualize your own data",
      "Convert and transform files between formats"
    ]
  },
  {
    icon: Building,
    title: "Company-specific skills",
    description: "Package your organization's knowledge so everyone gets consistent results.",
    items: [
      "Apply brand guidelines or follow preferred formats in docs, meetings notes, and more",
      "Use pre-built skills for financial services, like DCF modeling and comps analysis",
      "Create industry-specific workflows, like healthcare documentation or compliance procedures"
    ]
  },
  {
    icon: User,
    title: "Individual workflows",
    description: "Create skills for how you personally work.",
    items: [
      "Build custom note-taking systems",
      "Make your own development workflows",
      "Create research and analysis methods for Claude to follow"
    ]
  }
];

const HowTeamsUseSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
            How teams use skills
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Claude comes with built-in skills for common workflows. You can add your organization's procedures, or build your own from scratch.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4">
                <useCase.icon className="h-6 w-6 text-foreground stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-xl font-normal text-foreground mb-2">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {useCase.description}
              </p>
              <ul className="space-y-3">
                {useCase.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="text-sm text-foreground/80 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowTeamsUseSection;