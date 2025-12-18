import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CreateYourOwnSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground">
            Create your own
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Skill Creator Card */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="mb-6 aspect-video bg-card rounded-xl overflow-hidden">
              <img 
                src="https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69373f50a86ba82311baf0eb_b521b55d5cc3d9561e64c20e13b95d9f_image_skill-creator-skill.webp"
                alt="Skill Creator"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-heading text-xl font-normal text-foreground mb-3">
              Try the skill-creator skill
            </h3>
            <p className="text-muted-foreground mb-6">
              Describe what you want, and Claude generates the folder structure, formats the SKILL.md file, and bundles your resources.
            </p>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6">
              Create a skill
            </Button>
          </div>

          {/* SKILL.md Preview Card */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="mb-6 bg-surface-code rounded-xl p-4 text-sm font-mono overflow-auto max-h-80">
              <pre className="text-green-400">
{`---
name: internal-comms
description: A set of resources to help 
me write all kinds of internal 
communications, using the formats that 
my company likes to use.
license: Complete terms in LICENSE.txt
---

## When to use this skill

To write internal communications:
- 3P updates (Progress, Plans, Problems)
- Company newsletters
- FAQ responses
- Status reports
- Leadership updates

## How to use this skill

1. **Identify the communication type**
2. **Load the appropriate guideline file**
3. **Follow the specific instructions**`}
              </pre>
            </div>
            <h3 className="font-heading text-xl font-normal text-foreground mb-3">
              Develop your own SKILL.md file
            </h3>
            <p className="text-muted-foreground mb-6">
              For developers who want full control, skills are just folders with a SKILL.md file containing instructions in Markdown. Add reference files, executable scripts, or code—whatever Claude needs to do the job.
            </p>
            <Button variant="ghost" className="text-foreground hover:text-primary gap-2 p-0">
              Read developer docs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateYourOwnSection;