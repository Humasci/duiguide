const Footer = () => {
  const links = {
    Product: ["Claude", "Claude for Enterprise", "Claude for Teams", "API", "Pricing"],
    Company: ["About", "Careers", "News", "Research"],
    Resources: ["Documentation", "Status", "Support", "Trust Center"],
    Legal: ["Privacy Policy", "Terms of Service", "Responsible Disclosure", "Compliance"]
  };

  return (
    <footer className="bg-card py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-heading text-lg font-bold text-foreground">Claude</span>
            </a>
            <p className="text-sm text-muted-foreground">
              AI assistant by Anthropic
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a 
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Anthropic PBC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "YouTube", "Discord"].map((social) => (
              <a 
                key={social}
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;