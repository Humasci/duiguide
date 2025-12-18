import { ArrowRight } from "lucide-react";

const resources = [
  {
    title: "Skills explained: How Skills compares to prompts, Projects, MCP, and subagents",
    type: "Blog"
  },
  {
    title: "Building Skills for Claude Code: Automating your procedural knowledge",
    type: "Blog"
  },
  {
    title: "How to create Skills: Key steps, limitations, and examples",
    type: "Blog"
  }
];

const ResourcesSection = () => {
  return (
    <section className="py-20">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
            More resources
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a 
              key={index}
              href="#"
              className="group block bg-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-heading text-base font-normal text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground group-hover:gap-2 transition-all">
                {resource.type}
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;