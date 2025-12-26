import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, ExternalLink, Lock, Copy } from "lucide-react";

const faqCategories = [
  { id: "security", label: "Security" },
  { id: "ai-safety", label: "AI Safety and Transparency" },
  { id: "data-processing", label: "Data Processing" },
  { id: "federal", label: "U.S. Federal Compliance" },
  { id: "training", label: "Model Training" },
  { id: "frontier", label: "Frontier AI Compliance" },
  { id: "other", label: "Other" },
];

const faqData = {
  security: [
    {
      question: "What is ISO 27001?",
      answer: "ISO 27001 is an international standard for information security management systems (ISMS). It provides a framework for organizations to establish, implement, maintain, and continually improve their information security practices.",
    },
    {
      question: "What can customers assume about Anthropic based on this ISO 27001 certificate?",
      answer: "Customers can be confident that Anthropic has implemented a comprehensive information security management system that meets international standards for protecting sensitive data and managing security risks.",
    },
    {
      question: "How will Anthropic maintain its ISO 27001 certification over time?",
      answer: "Anthropic undergoes regular surveillance audits and recertification assessments to ensure ongoing compliance with ISO 27001 requirements. We continuously improve our security practices based on evolving threats and best practices.",
    },
    {
      question: "How can stakeholders learn more about Anthropic's ISO 27001 certification?",
      answer: "Stakeholders can request access to our ISO 27001 certificate and Statement of Applicability through the Trust Center resources section.",
    },
  ],
  "ai-safety": [
    {
      question: "What is ISO 42001?",
      answer: "ISO 42001 is an international standard specifically designed for AI management systems. It provides guidelines for organizations developing, providing, or using AI systems to do so responsibly and ethically.",
    },
    {
      question: "How does Anthropic's ISO 42001 certification relate to our Responsible Scaling Policy (RSP)?",
      answer: "Our ISO 42001 certification complements our RSP by providing an internationally recognized framework for our AI safety practices. Both work together to ensure we develop AI systems responsibly.",
    },
    {
      question: "What can customers assume about Anthropic based on this ISO 42001 certificate?",
      answer: "Customers can trust that Anthropic has established formal processes for managing AI-related risks, ensuring ethical AI development, and maintaining transparency in our AI systems.",
    },
    {
      question: "Does Anthropic expect its own vendors and partners to achieve ISO 42001 certification?",
      answer: "While we encourage our partners to adopt responsible AI practices, we evaluate each partnership based on their specific role and the nature of their AI involvement.",
    },
    {
      question: "What's your approach to user safety and wellbeing?",
      answer: "User safety is paramount to our mission. We implement multiple layers of safety measures including content filtering, harmful output prevention, and ongoing monitoring to protect users interacting with Claude.",
    },
  ],
  "data-processing": [
    {
      question: "What security measures are in place to protect customer data?",
      answer: "We implement industry-leading security measures including encryption at rest and in transit, access controls, regular security audits, and comprehensive monitoring to protect customer data.",
    },
    {
      question: "Where are your data centers located?",
      answer: "Our infrastructure is hosted in secure, SOC 2 compliant data centers in the United States. We work with trusted cloud providers who meet our stringent security requirements.",
    },
    {
      question: "How long is data retained?",
      answer: "Data retention periods vary based on the product and service. For detailed information, please refer to our Data Processing Addendum and Privacy Policy.",
    },
  ],
  federal: [
    {
      question: "Is Anthropic FedRAMP authorized?",
      answer: "Yes, Claude for Government (C4G) has achieved FedRAMP High authorization, enabling federal agencies to use our AI services with confidence.",
    },
    {
      question: "What compliance standards does Anthropic meet for federal customers?",
      answer: "We maintain FedRAMP High authorization and comply with relevant federal regulations including FISMA, NIST frameworks, and agency-specific requirements.",
    },
  ],
  training: [
    {
      question: "Is customer data used for model training?",
      answer: "For API and Enterprise customers, we do not use customer data to train our models unless explicitly opted in. Consumer product usage may be used in accordance with our privacy policy.",
    },
    {
      question: "How does Anthropic ensure training data quality?",
      answer: "We employ rigorous data curation processes, including human review, automated filtering, and quality assessments to ensure our training data meets our standards for safety and accuracy.",
    },
  ],
  frontier: [
    {
      question: "What is Anthropic's approach to frontier AI safety?",
      answer: "We follow our Responsible Scaling Policy (RSP) which defines clear commitments for how we develop and deploy increasingly capable AI systems safely.",
    },
    {
      question: "How does Anthropic address potential risks from advanced AI?",
      answer: "We invest heavily in AI safety research, implement capability evaluations, and maintain commitments to pause development if safety measures are insufficient for the capability level.",
    },
  ],
  other: [
    {
      question: "Does Anthropic have a bug bounty program?",
      answer: "Yes, we maintain a responsible disclosure program and work with security researchers to identify and address vulnerabilities. Contact security@anthropic.com for details.",
    },
    {
      question: "How can I report a security concern?",
      answer: "Security concerns can be reported to security@anthropic.com. We take all reports seriously and respond promptly to legitimate security issues.",
    },
  ],
};

const TrustFAQ = () => {
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
                  i === 3 
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
                {faqCategories.map((cat) => (
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

            {/* FAQ List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-heading text-2xl font-bold">FAQ</h2>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">Collapse all</Button>
                  <Button variant="outline" size="sm">Expand all</Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search questions and answers" 
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              {faqCategories.map((cat) => (
                <div key={cat.id} id={cat.id} className="mb-12">
                  <h3 className="font-heading text-lg font-semibold mb-4">{cat.label}</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqData[cat.id as keyof typeof faqData]?.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`${cat.id}-${i}`}
                        className="bg-muted/50 rounded-lg px-4 border-none"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span className="text-sm font-medium text-left">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4">
                          <div className="flex items-start justify-between gap-4">
                            <p>{faq.answer}</p>
                            <Button variant="ghost" size="sm" className="flex-shrink-0 gap-1">
                              <Copy className="h-3 w-3" />
                              Copy link
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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

export default TrustFAQ;
