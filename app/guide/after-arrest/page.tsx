export default function AfterArrestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/guide" className="hover:text-gray-700"> DUI Guide</a> / 
        <span className="text-gray-900"> After Arrest</span>
      </nav>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              TIME SENSITIVE: Multiple Critical Deadlines Start Immediately
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>You have as little as 7 days (Colorado) to request a DMV hearing. Car may be impounded with daily storage fees. Taking action now can save thousands and protect your license.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">What Happens After a DUI Arrest</h1>
      <p className="text-xl text-gray-600 mb-8">Understanding the critical first 24-48 hours and the immediate actions you must take to protect your rights and minimize consequences.</p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⏰ Immediate Timeline: Hours 0-48</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Arrest & Booking (0-6 hours)</h3>
              <p className="text-gray-600 text-sm">Transported to jail, fingerprints, photos, possible breath/blood test</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Vehicle Impound (Immediate)</h3>
              <p className="text-gray-600 text-sm">Car towed to impound lot, daily storage fees begin accruing</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Bail/Release (2-24 hours)</h3>
              <p className="text-gray-600 text-sm">Posted bail, OR release, or hold until arraignment</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</div>
            <div>
              <h3 className="font-semibold">License Notice (At release)</h3>
              <p className="text-gray-600 text-sm">Given DPS notice with temporary permit and hearing deadline</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-800">🚨 URGENT: First 48 Hours</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">•</span>
              <div>
                <strong>Request DMV hearing</strong>
                <p className="text-sm text-gray-600">7-30 days depending on state</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">•</span>
              <div>
                <strong>Get car from impound</strong>
                <p className="text-sm text-gray-600">Fees increase daily ($20-50/day)</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">•</span>
              <div>
                <strong>Contact DUI attorney</strong>
                <p className="text-sm text-gray-600">Early representation = better outcomes</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 font-bold">•</span>
              <div>
                <strong>Document everything</strong>
                <p className="text-sm text-gray-600">Memory fades, evidence disappears</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Next 7-15 Days</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 font-bold">•</span>
              <div>
                <strong>File tow hearing request</strong>
                <p className="text-sm text-gray-600">Contest impound fees (if applicable)</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 font-bold">•</span>
              <div>
                <strong>Arraignment preparation</strong>
                <p className="text-sm text-gray-600">First court appearance scheduled</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 font-bold">•</span>
              <div>
                <strong>Insurance notification</strong>
                <p className="text-sm text-gray-600">May need SR-22 filing</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 font-bold">•</span>
              <div>
                <strong>Work/family planning</strong>
                <p className="text-sm text-gray-600">Potential license suspension impacts</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">📋 Phase 1 Action Items by Priority</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-red-500 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
              Request Administrative Hearing (CRITICAL)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-3"><strong>Deadline by State:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Colorado:</strong> 7 days</li>
                  <li>• <strong>North Carolina:</strong> 10 days</li>
                  <li>• <strong>Tennessee:</strong> 10 days</li>
                  <li>• <strong>Texas:</strong> 15 days</li>
                  <li>• <strong>Arizona:</strong> 15 days</li>
                  <li>• <strong>Georgia:</strong> 30 days</li>
                  <li>• <strong>Ohio:</strong> 30 days</li>
                </ul>
              </div>
              <div>
                <p className="mb-3"><strong>Consequences of Missing:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• Automatic license suspension</li>
                  <li>• No hearing allowed</li>
                  <li>• Loss of driving privileges</li>
                  <li>• Job/family impact</li>
                </ul>
                <a href="/guide/dmv-hearing" className="inline-block mt-3 bg-pastel-blue text-gray-700 px-4 py-2 rounded hover:bg-blue-900 text-sm">Request Hearing Now →</a>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-900 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
              Retrieve Your Vehicle from Impound
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-3"><strong>Why It&apos;s Urgent:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• Daily storage fees: $20-50/day</li>
                  <li>• 30-90 days = vehicle auction</li>
                  <li>• Personal property retrieval</li>
                  <li>• Transportation needs</li>
                </ul>
              </div>
              <div>
                <p className="mb-3"><strong>What You Need:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• Valid ID</li>
                  <li>• Proof of ownership</li>
                  <li>• Payment for fees</li>
                  <li>• Insurance (varies by state)</li>
                </ul>
                <a href="/guide/after-arrest/impound" className="inline-block mt-3 bg-pastel-green text-gray-700 px-4 py-2 rounded hover:bg-blue-900 text-sm">Get Car Out →</a>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-yellow-500 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
              Understand Your Release and Bail Situation
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-3"><strong>Types of Release:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Cash Bond:</strong> Full amount paid</li>
                  <li>• <strong>Bail Bond:</strong> 10-15% to bondsman</li>
                  <li>• <strong>OR Release:</strong> Own recognizance</li>
                  <li>• <strong>Property Bond:</strong> Real estate collateral</li>
                </ul>
              </div>
              <div>
                <p className="mb-3"><strong>Bond Conditions:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• No alcohol consumption</li>
                  <li>• SCRAM monitoring possible</li>
                  <li>• Ignition interlock possible</li>
                  <li>• Travel restrictions</li>
                </ul>
                <a href="/guide/after-arrest/bail" className="inline-block mt-3 bg-pastel-yellow text-gray-700 px-4 py-2 rounded hover:bg-blue-900 text-sm">Bail Information →</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-500 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
              Secure Legal Representation
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-3"><strong>Why Early Representation Matters:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• Evidence preservation</li>
                  <li>• DMV hearing defense</li>
                  <li>• Bond modification possible</li>
                  <li>• Pre-trial negotiations</li>
                </ul>
              </div>
              <div>
                <p className="mb-3"><strong>What to Look For:</strong></p>
                <ul className="space-y-1 text-sm">
                  <li>• DUI specialization</li>
                  <li>• Local court experience</li>
                  <li>• DMV hearing experience</li>
                  <li>• Trial experience</li>
                </ul>
                <a href="/find-attorney" className="inline-block mt-3 bg-pastel-blue text-gray-700 px-4 py-2 rounded hover:bg-blue-900 text-sm">Find Attorney →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📝 Document Everything Now</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">About the Traffic Stop:</h3>
            <ul className="space-y-1 text-sm">
              <li>• Reason for the stop</li>
              <li>• Officer observations</li>
              <li>• Field sobriety tests performed</li>
              <li>• Breath/blood test details</li>
              <li>• Miranda rights given?</li>
              <li>• Weather/road conditions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Your Personal Details:</h3>
            <ul className="space-y-1 text-sm">
              <li>• When did you last eat?</li>
              <li>• What did you drink (amount/time)?</li>
              <li>• Medications taken</li>
              <li>• Medical conditions (diabetes, GERD)</li>
              <li>• Hours of sleep</li>
              <li>• Witnesses present</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 State-Specific Priority Actions</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">🔴 7-10 Day States (CRITICAL)</h3>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <h4 className="font-semibold">Colorado (7 days)</h4>
                <p className="text-sm">Request Express Consent hearing immediately</p>
                <a href="/colorado/dmv-hearing" className="text-red-600 hover:text-red-700 text-sm">Colorado DMV →</a>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <h4 className="font-semibold">North Carolina (10 days)</h4>
                <p className="text-sm">Civil Revocation hearing request</p>
                <a href="/north-carolina/dmv-hearing" className="text-red-600 hover:text-red-700 text-sm">NC DMV →</a>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <h4 className="font-semibold">Tennessee (10 days)</h4>
                <p className="text-sm">Administrative hearing request</p>
                <a href="/tennessee/dmv-hearing" className="text-red-600 hover:text-red-700 text-sm">TN DMV →</a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">🟡 15-30 Day States (HIGH)</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <h4 className="font-semibold">Texas (15 days)</h4>
                <p className="text-sm">ALR hearing + tow hearing (14 days)</p>
                <a href="/texas/dmv-hearing" className="text-blue-900 hover:text-blue-700 text-sm">Texas DPS →</a>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <h4 className="font-semibold">Arizona (15 days)</h4>
                <p className="text-sm">Implied Consent hearing</p>
                <a href="/arizona/dmv-hearing" className="text-blue-900 hover:text-blue-700 text-sm">Arizona MVD →</a>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <h4 className="font-semibold">Georgia & Ohio (30 days)</h4>
                <p className="text-sm">Administrative hearing request</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Next Steps in Your DUI Process</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Phase 2: Critical Window (Days 1-10)</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/guide/dmv-hearing" className="text-blue-600 hover:text-blue-700">DMV Hearing Guide</a></li>
              <li><a href="/guide/dmv-hearing/two-track" className="text-blue-600 hover:text-blue-700">Two-Track System</a></li>
              <li><a href="/guide/after-arrest/tow-hearing" className="text-blue-600 hover:text-blue-700">Contest Tow Hearing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phase 3: Pre-Trial (Weeks 2-12)</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/guide/defense" className="text-blue-600 hover:text-blue-700">Defense Strategies</a></li>
              <li><a href="/guide/defense/false-positive" className="text-blue-600 hover:text-blue-700">False Positives</a></li>
              <li><a href="/guide/defense/diversion" className="text-blue-600 hover:text-blue-700">Diversion Programs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Immediate Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/resources/deadline-checker" className="text-blue-600 hover:text-blue-700">Deadline Checker</a></li>
              <li><a href="/resources/bac-calculator" className="text-blue-600 hover:text-blue-700">BAC Calculator</a></li>
              <li><a href="/find-attorney" className="text-blue-600 hover:text-blue-700">Find DUI Attorney</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}