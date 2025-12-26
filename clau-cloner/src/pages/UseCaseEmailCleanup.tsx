import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Pencil, Tag, Cpu, Sparkles, Share2, Copy } from "lucide-react";

const UseCaseEmailCleanup = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header pageType="skills" />
      
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Use cases</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Clean up promotional emails</span>
          </div>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Explore here
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#f5f3ef]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Clean up promotional emails
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Claude in Chrome can scan your inbox, identify promotional and marketing emails, 
                and flag them for your review. You decide what to delete in bulk rather than 
                clicking through one by one.
              </p>
              <Button className="gap-2 rounded-full px-6">
                Try in Claude
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Metadata sidebar */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Pencil className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Author</p>
                  <p className="font-medium">Anthropic</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">Claude in Chrome</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">Haiku 4.5</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Features</p>
                  <p className="font-medium">Browser Use</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Share2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Share</p>
                  <button className="font-medium underline flex items-center gap-1">
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {/* Step 1 */}
          <div className="mb-16">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="font-medium">1</span>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-bold mb-4">Describe the task</h2>
                <p className="text-muted-foreground mb-6">
                  Promotional emails accumulate faster than you can unsubscribe. Claude in Chrome 
                  can scan through your inbox, identify marketing emails, newsletters, and automated 
                  notifications, then present them as a list for you to review before deleting in bulk.
                </p>
                <p className="text-muted-foreground mb-6">
                  Tell Claude what to look for and what to leave alone. It flags candidates for 
                  deletion and waits for your approval before taking action.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-6 mb-4">
                  <p className="font-medium mb-4">Find emails I likely don't need so I can review and bulk delete.</p>
                  
                  <p className="font-medium mb-2">Flag these:</p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                    <li>Promotional emails from retailers/brands</li>
                    <li>Newsletters I haven't opened in 3+ months</li>
                    <li>Automated notifications (delivered shipping updates, expired calendar reminders)</li>
                    <li>Marketing emails from SaaS products</li>
                  </ul>
                  
                  <p className="font-medium mb-2">Don't flag:</p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                    <li>Emails from actual people (not automated)</li>
                    <li>Anything with attachments</li>
                    <li>Anything from [my company domain]</li>
                  </ul>
                  
                  <p className="font-medium">Output: Show me the list organized by sender so I can review before deleting.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-16">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="font-medium">2</span>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-bold mb-4">Give Claude context</h2>
                <p className="text-muted-foreground mb-6">
                  Claude works within your Gmail session. It can read email content, see sender 
                  information, and check whether you've opened messages. It only takes action when you confirm.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-medium mb-2">Required context</h3>
                  <p className="text-muted-foreground">
                    Before starting your Claude in Chrome session, make sure you're logged into your Gmail account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-16">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="font-medium">3</span>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-bold mb-4">What Claude creates</h2>
                <p className="text-muted-foreground mb-6">
                  Claude uses your session to scan and sort through your inbox. Claude presents what 
                  it found, organized for your review.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-6">
                  <p className="text-xs text-muted-foreground mb-2">From Claude</p>
                  <p className="mb-4">
                    I've scanned your inbox and found 847 emails that match your criteria. Here's the breakdown by sender:
                  </p>
                  
                  <p className="font-medium mb-2">Retailers and brands (312 emails)</p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 text-sm">
                    <li>Amazon promotional: 89 emails</li>
                    <li>Target Circle: 45 emails</li>
                    <li>Nordstrom: 38 emails</li>
                    <li>Best Buy deals: 31 emails</li>
                    <li>Various other retailers: 109 emails</li>
                  </ul>
                  
                  <p className="font-medium mb-2">Unopened newsletters (203 emails)</p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 text-sm">
                    <li>Morning Brew: 67 emails (last opened 4 months ago)</li>
                    <li>The Hustle: 52 emails (never opened)</li>
                    <li>Various Substack newsletters: 84 emails</li>
                  </ul>
                  
                  <p className="font-medium mb-2">Automated notifications (198 emails)</p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 text-sm">
                    <li>Amazon shipping updates: 76 emails (all delivered)</li>
                    <li>Google Calendar reminders: 44 emails (past events)</li>
                    <li>LinkedIn notifications: 78 emails</li>
                  </ul>
                  
                  <p className="font-medium mb-2">SaaS marketing (134 emails)</p>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 text-sm">
                    <li>Notion tips: 23 emails</li>
                    <li>Figma updates: 19 emails</li>
                    <li>Various trial follow-ups: 92 emails</li>
                  </ul>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    I left alone: All emails from people (not automated senders), 34 emails with attachments, 
                    everything from your company domain.
                  </p>
                  
                  <p className="font-medium">Ready to delete all 847, or would you like to keep any of these senders?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-16">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="font-medium">4</span>
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-bold mb-4">Follow up prompts</h2>
                <p className="text-muted-foreground mb-6">
                  Continue the conversation with Claude to refine, expand, or explore further.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-medium mb-2">Adjust and proceed</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Keep certain senders or categories, then confirm the deletion.
                    </p>
                    <div className="bg-background rounded p-3 text-sm">
                      Keep Morning Brew and the Figma updates. Delete everything else.
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-medium mb-2">Unsubscribe from unwanted messages</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For senders that keep filling your inbox, have Claude unsubscribe instead of just deleting.
                    </p>
                    <div className="bg-background rounded p-3 text-sm">
                      For the retailers with more than 15 emails, go through and unsubscribe me instead of just deleting. I don't want to continue receiving these messages.
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-medium mb-2">Flag subscription emails you may have missed</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      While scanning emails, Claude can spot receipts and payment confirmations from services you might have forgotten about.
                    </p>
                    <div className="bg-background rounded p-3 text-sm">
                      While you're in there, can you find any recurring payment emails? I want to see which subscriptions I'm paying for and see if there are some I forgot to cancel.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCaseEmailCleanup;
