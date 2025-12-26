const testimonials = [
  {
    logo: "Canva",
    quote: "Canva plans to leverage Skills to customize agents and expand what they can do. This unlocks new ways to bring Canva deeper into agentic workflows—helping teams capture their unique context and create stunning, high-quality designs effortlessly.",
    author: "Anwar Haneef",
    role: "GM & Head of Ecosystem"
  },
  {
    logo: "Box",
    quote: "Skills teaches Claude how to work with Box content. Users can transform stored files into PowerPoint presentations, Excel spreadsheets, and Word documents that follow their organization's standards—saving hours of effort.",
    author: "Yashodha Bhavnani",
    role: "Head of AI"
  },
  {
    logo: "Notion",
    quote: "With Skills, Claude works seamlessly with Notion - taking users from questions to action faster. Less prompt wrangling on complex tasks, more predictable results.",
    author: "MJ Felix",
    role: "Product Manager"
  },
  {
    logo: "Rakuten",
    quote: "Skills streamline our management accounting and finance workflows. Claude processes multiple spreadsheets, catches critical anomalies, and generates reports using our procedures. What once took a day, we can now accomplish in an hour.",
    author: "Yusuke Kaji",
    role: "General Manager AI"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-marquee">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[400px] mx-4"
            >
              <div className="bg-card rounded-2xl p-8 h-full">
                <div className="font-heading text-xl font-bold text-foreground mb-6">
                  {testimonial.logo}
                </div>
                <blockquote className="text-foreground/80 text-sm leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-medium text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;