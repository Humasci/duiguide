export default function ArizonaDMVHearingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Critical Alert */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              URGENT: Arizona Implied Consent Hearing - 15 Day Deadline
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>You have only 15 days from arrest to request an implied consent hearing with Arizona MVD. Missing this deadline results in automatic 90-day license suspension.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Arizona DUI Implied Consent Hearing</h1>
      <p className="text-xl text-gray-600 mb-8">Complete guide to requesting and winning your Arizona MVD implied consent hearing to keep your license after a DUI arrest.</p>

      {/* Quick Action Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚨 Take Action Now</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Request Hearing Immediately</h3>
            <p className="text-gray-700 mb-4">Contact Arizona MVD within 15 days of your arrest:</p>
            <div className="bg-white rounded p-4 border">
              <p><strong>Arizona MVD Administrative Hearings</strong></p>
              <p>Phone: (602) 712-7355</p>
              <p>Fax: (602) 712-3396</p>
              <p>Mail: PO Box 2100, Phoenix, AZ 85001</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Required Information</h3>
            <ul className="space-y-1 text-sm">
              <li>• Full name and date of birth</li>
              <li>• Arizona driver license number</li>
              <li>• Date of arrest</li>
              <li>• Arresting agency</li>
              <li>• Payment: $500 hearing fee</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Arizona Specific Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📅 Arizona DUI Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Day 0-1: Arrest & Booking</h3>
              <p className="text-gray-600 text-sm">DUI arrest, breath/blood test, temporary permit issued</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Days 1-15: CRITICAL WINDOW</h3>
              <p className="text-gray-600 text-sm"><strong>Request implied consent hearing</strong> - absolute deadline</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Day 16: Automatic Suspension</h3>
              <p className="text-gray-600 text-sm">If no hearing requested, 90-day suspension begins</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</div>
            <div>
              <h3 className="font-semibold">30-90 Days: Hearing Process</h3>
              <p className="text-gray-600 text-sm">Hearing scheduled, evidence gathering, decision issued</p>
            </div>
          </div>
        </div>
      </div>

      {/* Arizona Law Specifics */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚖️ Arizona Implied Consent Law</h2>
          <p className="text-gray-700 mb-4">Arizona Revised Statutes § 28-1321 requires all drivers to submit to chemical testing when lawfully arrested for DUI.</p>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Refusal:</strong> Automatic 12-month suspension</li>
            <li>• <strong>BAC 0.08+:</strong> 90-day suspension (first offense)</li>
            <li>• <strong>BAC 0.15+:</strong> 90-day suspension + ignition interlock</li>
            <li>• <strong>Under 21:</strong> Any measurable BAC = suspension</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Hearing Issues to Contest</h2>
          <p className="text-gray-700 mb-4">Arizona MVD must prove these elements:</p>
          <ul className="space-y-2 text-sm">
            <li>• Officer had reasonable grounds for arrest</li>
            <li>• You were driving or in actual physical control</li>
            <li>• You were under the influence of alcohol/drugs</li>
            <li>• Chemical test was properly administered</li>
            <li>• Test result was 0.08% or higher (or you refused)</li>
          </ul>
        </div>
      </div>

      {/* Suspension Lengths */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📊 Arizona License Suspension Periods</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">First Offense</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>BAC 0.08-0.149:</span>
                <span className="font-bold">90 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>BAC 0.15+:</span>
                <span className="font-bold">90 days + IID</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Refusal:</span>
                <span className="font-bold text-red-600">12 months</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Under 21 (any BAC):</span>
                <span className="font-bold">90 days</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Second Offense (within 84 months)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>Any BAC:</span>
                <span className="font-bold text-red-600">12 months</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Refusal:</span>
                <span className="font-bold text-red-600">24 months</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Ignition Interlock:</span>
                <span className="font-bold">Required</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="text-sm"><strong>Note:</strong> Restricted license may be available after 30-45 days with ignition interlock device installation.</p>
        </div>
      </div>

      {/* Hearing Process */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Arizona MVD Hearing Process</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Hearing Format</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Location:</strong> Phoenix MVD office or telephonic</li>
              <li>• <strong>Duration:</strong> 30-60 minutes typically</li>
              <li>• <strong>Officer:</strong> Administrative law judge</li>
              <li>• <strong>Evidence:</strong> Police reports, breath/blood results</li>
              <li>• <strong>Witnesses:</strong> Arresting officer may testify</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Your Rights</h3>
            <ul className="space-y-2 text-sm">
              <li>• Right to legal representation</li>
              <li>• Right to cross-examine witnesses</li>
              <li>• Right to present evidence</li>
              <li>• Right to call witnesses</li>
              <li>• Right to interpreter if needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Defenses */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🛡️ Common Arizona DUI Defenses</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-600">Technical Defenses</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Intoxilyzer malfunction:</strong> Machine not properly calibrated</li>
              <li>• <strong>Blood test contamination:</strong> Improper storage or handling</li>
              <li>• <strong>Rising BAC:</strong> Alcohol level below 0.08 while driving</li>
              <li>• <strong>Medical conditions:</strong> Diabetes, GERD affecting test</li>
              <li>• <strong>Mouth alcohol:</strong> Recent dental work, breath spray</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-green-600">Procedural Defenses</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>No reasonable suspicion:</strong> Invalid traffic stop</li>
              <li>• <strong>No probable cause:</strong> Insufficient evidence for arrest</li>
              <li>• <strong>Miranda violations:</strong> Rights not properly read</li>
              <li>• <strong>15-minute observation:</strong> Not properly observed before test</li>
              <li>• <strong>Chain of custody:</strong> Blood sample handling errors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Arizona-Specific Resources */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📞 Arizona MVD Contacts</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p><strong>Administrative Hearings Unit</strong></p>
              <p>1801 W Jefferson St, Phoenix, AZ 85007</p>
              <p>Phone: (602) 712-7355</p>
              <p>Fax: (602) 712-3396</p>
            </div>
            <div>
              <p><strong>Mailing Address:</strong></p>
              <p>PO Box 2100, Mail Drop 555M</p>
              <p>Phoenix, AZ 85001-2100</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🌵 Major Arizona Counties</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Maricopa County:</strong> <a href="/arizona/maricopa" className="text-blue-600 hover:text-blue-700">Phoenix, Scottsdale, Mesa →</a></p>
            <p><strong>Pima County:</strong> <a href="/arizona/pima" className="text-blue-600 hover:text-blue-700">Tucson →</a></p>
            <p><strong>Pinal County:</strong> <a href="/arizona/pinal" className="text-blue-600 hover:text-blue-700">Casa Grande →</a></p>
            <p><strong>Yavapai County:</strong> <a href="/arizona/yavapai" className="text-blue-600 hover:text-blue-700">Prescott →</a></p>
            <p><strong>Mohave County:</strong> <a href="/arizona/mohave" className="text-blue-600 hover:text-blue-700">Lake Havasu →</a></p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🚀 Your Next Steps in Arizona</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-red-600">Immediate Actions (Days 1-15):</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                <span>Call (602) 712-7355 to request hearing</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                <span>Pay $500 hearing fee</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                <span>Contact Arizona DUI attorney</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                <span>Document arrest details</span>
              </li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-green-600">Pre-Hearing Preparation:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Review police report for errors</li>
              <li>• Gather medical records if applicable</li>
              <li>• Identify potential witnesses</li>
              <li>• Research Intoxilyzer calibration records</li>
              <li>• Prepare timeline of events</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a href="/find-attorney/arizona" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">Find Arizona DUI Attorney</a>
          <a href="/arizona" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium">Arizona DUI Resources</a>
          <a href="/guide/defense" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">Defense Strategies</a>
        </div>
      </div>
    </div>
  )
}