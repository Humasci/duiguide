import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Equipping agents for the real world with Agent Skills",
    description: "Introducing Agent Skills, a new way to build specialized agents using files and folders.",
    image: "https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69374c85bb1201b8c99e7874_image_marginalia-skills-eng-blog.webp"
  },
  {
    title: "Improving frontend design through Skills",
    description: "Best practices for building richer, more customized frontend design with Claude and Skills.",
    image: "https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6937b189e2c0aead6e5f66cc_85f472e26270265f7bb77786bb2d34e6_skills-blog-post.webp"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <a 
              key={index}
              href="#"
              className="group block bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;