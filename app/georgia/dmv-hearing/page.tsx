export default function GeorgiaDMVHearingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Critical Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              URGENT: Georgia ALS Hearing - 30 Day Deadline
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>You have 30 days from arrest to request an Administrative License Suspension (ALS) hearing with Georgia DDS. Missing this deadline results in automatic license suspension.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Georgia DUI Administrative License Suspension (ALS) Hearing</h1>
      <p className="text-xl text-gray-600 mb-8">Complete guide to requesting and winning your Georgia DDS administrative hearing to keep your license after a DUI arrest.</p>

      {/* Quick Action Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚨 Take Action Now</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Request ALS Hearing Immediately</h3>
            <p className="text-gray-700 mb-4">Contact Georgia DDS within 30 days of your arrest:</p>
            <div className="bg-white rounded p-4 border">
              <p><strong>Georgia DDS Administrative Hearings</strong></p>
              <p>Phone: (678) 413-8400</p>
              <p>Online: <span className="text-blue-600">dds.georgia.gov</span></p>
              <p>Mail: PO Box 80447, Conyers, GA 30013</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Required Information</h3>
            <ul className="space-y-1 text-sm">
              <li>• Full name and date of birth</li>
              <li>• Georgia driver license number</li>
              <li>• Date of arrest</li>
              <li>• Arresting agency and officer</li>
              <li>• Payment: $150 hearing fee</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Georgia Specific Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📅 Georgia DUI Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Day 0-1: Arrest & Notice</h3>
              <p className="text-gray-600 text-sm">DUI arrest, Form 1205 issued (temporary permit), breath/blood test</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Days 1-30: Request Hearing Window</h3>
              <p className="text-gray-600 text-sm"><strong>Must request ALS hearing</strong> within 30 days</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Day 31: Automatic Suspension</h3>
              <p className="text-gray-600 text-sm">If no hearing requested, suspension begins (120 days-1 year)</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</div>
            <div>
              <h3 className="font-semibold">30-90 Days: Hearing Process</h3>
              <p className="text-gray-600 text-sm">Hearing scheduled, evidence review, decision issued</p>
            </div>
          </div>
        </div>
      </div>

      {/* Georgia Law Specifics */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚖️ Georgia Implied Consent Law</h2>
          <p className="text-gray-700 mb-4">O.C.G.A. § 40-5-67.1 requires chemical testing when arrested for DUI. The consequences vary by BAC level and refusal.</p>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Refusal (1st):</strong> 12-month suspension</li>
            <li>• <strong>BAC 0.08+:</strong> 120-day suspension</li>
            <li>• <strong>BAC 0.15+:</strong> Ignition interlock required</li>
            <li>• <strong>Under 21:</strong> 6-month suspension (any BAC)</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 ALS Hearing Issues</h2>
          <p className="text-gray-700 mb-4">Georgia DDS must prove these elements:</p>
          <ul className="space-y-2 text-sm">
            <li>• You were lawfully arrested</li>
            <li>• Arresting officer had probable cause</li>
            <li>• You were driving or in physical control</li>
            <li>• You refused testing OR tested 0.08% or higher</li>
            <li>• Proper implied consent notice was given</li>
          </ul>
        </div>
      </div>

      {/* Georgia Suspension Lengths */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📊 Georgia License Suspension Periods</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Administrative Suspension</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>BAC 0.08+ (1st offense):</span>
                <span className="font-bold">120 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>BAC 0.08+ (2nd offense):</span>
                <span className="font-bold text-red-600">3 years</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Refusal (1st offense):</span>
                <span className="font-bold text-red-600">12 months</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Under 21 (any BAC):</span>
                <span className="font-bold">6 months</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Limited Driving Permit Options</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span>Work permit available:</span>
                <span className="font-bold text-green-600">After 30 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Ignition interlock permit:</span>
                <span className="font-bold text-green-600">Immediately</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Refusal cases:</span>
                <span className="font-bold text-red-600">No permit</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="text-sm"><strong>Note:</strong> BAC 0.15% or higher requires ignition interlock for any driving permit.</p>
        </div>
      </div>

      {/* Hearing Process */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Georgia ALS Hearing Process</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Hearing Details</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Location:</strong> Usually telephonic hearing</li>
              <li>• <strong>Duration:</strong> 15-30 minutes typically</li>
              <li>• <strong>Officer:</strong> Administrative hearing officer</li>
              <li>• <strong>Evidence:</strong> Form 1205, breath/blood results, police report</li>
              <li>• <strong>Standard:</strong> Preponderance of evidence</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Your Rights</h3>
            <ul className="space-y-2 text-sm">
              <li>• Right to legal representation</li>
              <li>• Right to cross-examine witnesses</li>
              <li>• Right to present evidence and testimony</li>
              <li>• Right to subpoena documents</li>
              <li>• Right to interpreter services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Georgia-Specific Defenses */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🛡️ Georgia ALS Hearing Defenses</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-600">Common Technical Defenses</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Intoxilyzer issues:</strong> Maintenance, calibration problems</li>
              <li>• <strong>Blood test errors:</strong> Chain of custody, contamination</li>
              <li>• <strong>Form 1205 defects:</strong> Improper notice or completion</li>
              <li>• <strong>Medical conditions:</strong> GERD, diabetes, ketosis</li>
              <li>• <strong>Rising BAC defense:</strong> BAC below 0.08 while driving</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-green-600">Procedural Defenses</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Lack of probable cause:</strong> Improper arrest</li>
              <li>• <strong>No reasonable suspicion:</strong> Invalid traffic stop</li>
              <li>• <strong>Improper implied consent:</strong> Notice not properly given</li>
              <li>• <strong>No driving/physical control:</strong> Not operating vehicle</li>
              <li>• <strong>Officer not qualified:</strong> Lack of certification</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Georgia-Specific Resources */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📞 Georgia DDS Contacts</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p><strong>Customer Service Center</strong></p>
              <p>Phone: (678) 413-8400</p>
              <p>Hours: Mon-Fri 8am-5pm</p>
            </div>
            <div>
              <p><strong>ALS Hearing Requests:</strong></p>
              <p>Online: dds.georgia.gov</p>
              <p>Mail: PO Box 80447, Conyers, GA 30013</p>
            </div>
            <div>
              <p><strong>Fee:</strong> $150 (non-refundable)</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🍑 Major Georgia Counties</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Fulton County:</strong> <a href="/georgia/fulton" className="text-blue-600 hover:text-blue-700">Atlanta →</a></p>
            <p><strong>Gwinnett County:</strong> <a href="/georgia/gwinnett" className="text-blue-600 hover:text-blue-700">Lawrenceville →</a></p>
            <p><strong>Cobb County:</strong> <a href="/georgia/cobb" className="text-blue-600 hover:text-blue-700">Marietta →</a></p>
            <p><strong>DeKalb County:</strong> <a href="/georgia/dekalb" className="text-blue-600 hover:text-blue-700">Decatur →</a></p>
            <p><strong>Clayton County:</strong> <a href="/georgia/clayton" className="text-blue-600 hover:text-blue-700">Jonesboro →</a></p>
          </div>
        </div>
      </div>

      {/* Form 1205 Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 Understanding Form DDS 1205</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">What is Form 1205?</h3>
            <p className="text-gray-700 mb-3">Form 1205 is the official notice given when you&apos;re arrested for DUI. It serves as:</p>
            <ul className="space-y-1 text-sm">
              <li>• Temporary driving permit (45 days)</li>
              <li>• Notice of license suspension</li>
              <li>• Information about ALS hearing rights</li>
              <li>• Evidence in your ALS hearing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Common Form 1205 Defects</h3>
            <ul className="space-y-1 text-sm">
              <li>• Incomplete or incorrect information</li>
              <li>• Officer signature missing or invalid</li>
              <li>• Wrong suspension dates</li>
              <li>• Improper boxes checked</li>
              <li>• Not given to driver at time of arrest</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🚀 Your Next Steps in Georgia</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-yellow-600">Immediate Actions (Days 1-30):</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                <span>Request ALS hearing online or call (678) 413-8400</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                <span>Pay $150 hearing fee</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                <span>Contact Georgia DUI attorney</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                <span>Review Form 1205 for defects</span>
              </li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-green-600">Pre-Hearing Preparation:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Obtain complete police report</li>
              <li>• Request Intoxilyzer maintenance records</li>
              <li>• Gather medical records if applicable</li>
              <li>• Document timeline of events</li>
              <li>• Identify potential witnesses</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a href="/find-attorney/georgia" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">Find Georgia DUI Attorney</a>
          <a href="/georgia" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium">Georgia DUI Resources</a>
          <a href="/guide/defense" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">Defense Strategies</a>
        </div>
      </div>
    </div>
  )
}