export default function ArizonaDMVHearingPage() {
  return (
    <main className="min-h-screen">
      {/* EXACT Claude.ai Hero Structure */}
      <section className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-32 sm:pb-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            
            {/* Left Column - Text Content */}
            <div>
              <div className="text-base font-semibold leading-7 text-destructive mb-4">
                URGENT: 15 Day Deadline
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Arizona DUI
                <br />
                <span className="text-muted-foreground">Implied Consent Hearing</span>
              </h1>
              
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
                You have only 15 days from arrest to request an implied consent hearing with Arizona MVD. Missing this deadline results in automatic 90-day license suspension.
              </p>
              
              <div className="mt-10 flex items-center gap-x-6">
                <a href="tel:6027127355" className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Call MVD: (602) 712-7355
                </a>
                <a href="/find-attorney/arizona" className="text-sm font-semibold leading-6 text-foreground">
                  Find attorney <span aria-hidden="true">→</span>
                </a>
              </div>
              
              <div className="mt-8 flex items-center gap-x-8 text-sm text-muted-foreground">
                <div>$500 hearing fee required</div>
                <div>15-day absolute deadline</div>
                <div>License at risk</div>
              </div>
            </div>
            
            {/* Right Column - Simple Illustration Area */}
            <div className="mt-20 lg:mt-0 lg:ml-10">
              <div className="aspect-square max-w-lg mx-auto lg:mx-0">
                <div className="w-full h-full rounded-2xl bg-muted/30 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-sm">Arizona MVD Process</div>
                    <div className="text-xs mt-2 opacity-70">(Hearing timeline illustration)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXACT Claude.ai Feature Cards Structure */}
      <section className="bg-muted/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Critical information
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Understanding Arizona's implied consent hearing process can save your license.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-destructive">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  15-Day Deadline
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Arizona law gives you exactly 15 days from arrest to request an implied consent hearing. This deadline is absolute with no exceptions.
                  </p>
                  <p className="mt-6">
                    <a href="tel:6027127355" className="text-sm font-semibold leading-6 text-primary">
                      Call MVD now <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  $500 Hearing Fee
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Arizona MVD requires a $500 fee to request the hearing. This can be paid by money order, cashier's check, or credit card.
                  </p>
                  <p className="mt-6">
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">
                      Payment required with request
                    </span>
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-warning">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.694-.833-3.464 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  Automatic Suspension
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    If you miss the 15-day deadline, your license will automatically be suspended for 90 days (first offense) or 12 months (refusal/repeat).
                  </p>
                  <p className="mt-6">
                    <span className="text-sm font-semibold leading-6 text-destructive">
                      No extensions available
                    </span>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Arizona Timeline - Claude Style */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-base font-semibold leading-7 text-primary">
              Arizona DUI Process
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Critical Timeline
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Understanding each step in Arizona's process helps protect your rights.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="space-y-8">
              
              <div className="flex gap-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-white font-bold">
                    1
                  </div>
                  <div className="mt-4 h-16 w-px bg-gray-300"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold leading-7 text-foreground">Day 0-1: Arrest & Booking</h3>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">
                    DUI arrest, breath/blood test, temporary permit issued valid for 15 days
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning text-white font-bold">
                    2
                  </div>
                  <div className="mt-4 h-16 w-px bg-gray-300"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold leading-7 text-foreground">Days 1-15: CRITICAL WINDOW</h3>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">
                    <strong>Request implied consent hearing</strong> - absolute deadline with $500 fee
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                    3
                  </div>
                  <div className="mt-4 h-16 w-px bg-gray-300"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold leading-7 text-foreground">Day 16: Automatic Suspension</h3>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">
                    If no hearing requested, 90-day suspension begins automatically
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold leading-7 text-foreground">30-90 Days: Hearing Process</h3>
                  <p className="mt-1 text-base leading-7 text-muted-foreground">
                    Hearing scheduled, evidence review, administrative law judge decision
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arizona Law Details - Claude Style */}
      <section className="bg-muted/40 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Arizona Law Specifics
            </h2>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            
            <div className="bg-card rounded-lg p-8 shadow-sm ring-1 ring-border">
              <h3 className="text-lg font-semibold leading-7 text-foreground mb-4">
                Implied Consent Law (A.R.S. § 28-1321)
              </h3>
              <div className="space-y-3">
                <div>
                  <strong>Refusal:</strong> Automatic 12-month suspension
                </div>
                <div>
                  <strong>BAC 0.08+:</strong> 90-day suspension (first offense)
                </div>
                <div>
                  <strong>BAC 0.15+:</strong> 90-day suspension + ignition interlock
                </div>
                <div>
                  <strong>Under 21:</strong> Any measurable BAC = suspension
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-sm ring-1 ring-border">
              <h3 className="text-lg font-semibold leading-7 text-foreground mb-4">
                Hearing Issues to Contest
              </h3>
              <div className="space-y-3">
                <div>Officer had reasonable grounds for arrest</div>
                <div>You were driving or in actual physical control</div>
                <div>You were under the influence of alcohol/drugs</div>
                <div>Chemical test was properly administered</div>
                <div>Test result was 0.08% or higher (or you refused)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info - Claude Style */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Take action now
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Contact Arizona MVD immediately to request your hearing.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl bg-card rounded-lg p-8 shadow-sm ring-1 ring-border">
            <h3 className="text-lg font-semibold leading-7 text-foreground mb-4">
              Arizona MVD Administrative Hearings
            </h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium">Phone:</div>
                <div className="text-muted-foreground">(602) 712-7355</div>
              </div>
              <div>
                <div className="font-medium">Fax:</div>
                <div className="text-muted-foreground">(602) 712-3396</div>
              </div>
              <div>
                <div className="font-medium">Address:</div>
                <div className="text-muted-foreground">
                  1801 W Jefferson St<br />
                  Phoenix, AZ 85007
                </div>
              </div>
              <div>
                <div className="font-medium">Mailing:</div>
                <div className="text-muted-foreground">
                  PO Box 2100, Mail Drop 555M<br />
                  Phoenix, AZ 85001-2100
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Claude.ai Dark Section Style */}
      <section className="bg-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Don't lose your license
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-background/80">
              The 15-day deadline is absolute. Get expert help to protect your driving privileges in Arizona.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="tel:6027127355" className="rounded-full bg-background px-8 py-3 text-lg font-semibold text-foreground shadow-sm hover:bg-background/90">
                Call MVD: (602) 712-7355
              </a>
              <a href="/find-attorney/arizona" className="text-sm font-semibold leading-6 text-background">
                Find attorney <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}