export default function DMVHearingPage() {
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
              URGENT: DMV Hearing Deadline May Be Today
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Missing your DMV hearing deadline results in automatic license suspension. Some states have deadlines as short as 7 days from arrest.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">DMV Administrative Hearing Guide</h1>
      <p className="text-xl text-gray-600 mb-8">Everything you need to know about requesting and winning your DMV hearing to keep your license after a DUI arrest.</p>

      {/* State Deadline Quick Reference */}
      <div className="bg-white border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-red-700">⏰ Critical Deadlines by State</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-600 mb-3">🔴 EXTREMELY URGENT (7-10 Days)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span><strong>Colorado:</strong></span>
                <span className="text-red-600 font-bold">7 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span><strong>North Carolina:</strong></span>
                <span className="text-red-600 font-bold">10 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span><strong>Tennessee:</strong></span>
                <span className="text-red-600 font-bold">10 days</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-orange-600 mb-3">🟡 URGENT (15-30 Days)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span><strong>Texas:</strong></span>
                <span className="text-orange-600 font-bold">15 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span><strong>Arizona:</strong></span>
                <span className="text-orange-600 font-bold">15 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span><strong>Georgia:</strong></span>
                <span className="text-yellow-600 font-bold">30 days</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span><strong>Ohio:</strong></span>
                <span className="text-yellow-600 font-bold">30 days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-700"><strong>Important:</strong> These deadlines are from the date of arrest, not from when you were released or received any paperwork. Don't wait - request your hearing immediately.</p>
        </div>
      </div>

      {/* Navigation to Sub-guides */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📝 How to Request Your Hearing</h2>
          <p className="text-gray-600 mb-4">Step-by-step guide to submitting your DMV hearing request before the deadline.</p>
          <a href="/guide/dmv-hearing/request" className="text-blue-600 hover:text-blue-700 font-medium">Request Hearing Guide →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🛤️ Two-Track System</h2>
          <p className="text-gray-600 mb-4">Understanding how DMV hearings differ from criminal court proceedings.</p>
          <a href="/guide/dmv-hearing/two-track" className="text-blue-600 hover:text-blue-700 font-medium">Learn Two-Track System →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚖️ Administrative vs Criminal</h2>
          <p className="text-gray-600 mb-4">Key differences between administrative and criminal proceedings.</p>
          <a href="/guide/dmv-hearing/admin-vs-criminal" className="text-blue-600 hover:text-blue-700 font-medium">Compare Proceedings →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📄 Temporary Driving Permit</h2>
          <p className="text-gray-600 mb-4">Understanding your temporary permit and driving privileges.</p>
          <a href="/guide/dmv-hearing/temporary-permit" className="text-blue-600 hover:text-blue-700 font-medium">Temporary Permit Info →</a>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-700">⚠️ Missed Your Deadline?</h2>
          <p className="text-gray-600 mb-4">Options if you've already missed the DMV hearing request deadline.</p>
          <a href="/guide/dmv-hearing/missed-deadline" className="text-red-600 hover:text-red-700 font-medium">Explore Options →</a>
        </div>
      </div>

      {/* What is a DMV Hearing */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ What is a DMV Administrative Hearing?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">The Hearing Explained</h3>
            <p className="text-gray-700 mb-4">A DMV administrative hearing is a separate proceeding from your criminal DUI case. It's conducted by the Department of Motor Vehicles (or equivalent state agency) to determine whether your driving privileges should be suspended based on:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Refusing a breath/blood test</li>
              <li>• Testing over the legal limit (0.08% BAC)</li>
              <li>• Driving under the influence</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Why It Matters</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Completely separate</strong> from criminal court case</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Lower burden of proof</strong> than criminal case</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Can suspend license</strong> even if criminal case is dismissed</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>May get restricted license</strong> for work/medical needs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* State-Specific Quick Links */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🗺️ State-Specific DMV Hearing Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Texas:</strong> <a href="/texas/dmv-hearing" className="text-blue-600 hover:text-blue-700">ALR Hearing Request →</a></p>
            <p><strong>Arizona:</strong> <a href="/arizona/dmv-hearing" className="text-blue-600 hover:text-blue-700">Implied Consent Hearing →</a></p>
            <p><strong>Colorado:</strong> <a href="/colorado/dmv-hearing" className="text-blue-600 hover:text-blue-700">Express Consent Hearing →</a></p>
            <p><strong>Georgia:</strong> <a href="/georgia/dmv-hearing" className="text-blue-600 hover:text-blue-700">ALS Hearing Request →</a></p>
          </div>
          <div>
            <p><strong>Tennessee:</strong> <a href="/tennessee/dmv-hearing" className="text-blue-600 hover:text-blue-700">Administrative Hearing →</a></p>
            <p><strong>North Carolina:</strong> <a href="/north-carolina/dmv-hearing" className="text-blue-600 hover:text-blue-700">Civil Revocation Hearing →</a></p>
            <p><strong>Ohio:</strong> <a href="/ohio/dmv-hearing" className="text-blue-600 hover:text-blue-700">ALS Appeal →</a></p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🚀 Your Next Steps</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-red-600">If You Haven't Requested Hearing Yet:</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                <span><strong>STOP EVERYTHING</strong> - Request hearing immediately</span>
              </li>
              <li className="flex items-start">
                <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                <span>Find your state-specific form and deadline above</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                <span>Submit request (mail, fax, or online)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                <span>Contact DUI attorney immediately</span>
              </li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-green-600">If You've Already Requested:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Hire attorney</strong> if you haven't already</li>
              <li>• <strong>Gather evidence</strong> - photos, witness contacts, medical records</li>
              <li>• <strong>Request discovery</strong> - police reports, calibration records</li>
              <li>• <strong>Prepare defense strategy</strong> based on arrest circumstances</li>
              <li>• <strong>Schedule hearing</strong> at convenient time</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a href="/find-attorney" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">Find DUI Attorney</a>
          <a href="/resources/deadline-checker" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">Check Your Deadline</a>
          <a href="/guide/defense" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium">Defense Strategies</a>
        </div>
      </div>
    </div>
  )
}