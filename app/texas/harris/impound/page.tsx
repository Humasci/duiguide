export default function HarrisCountyImpoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/texas" className="hover:text-gray-700"> Texas</a> / 
        <a href="/texas/harris" className="hover:text-gray-700"> Harris County</a> / 
        <span className="text-gray-900"> Impound</span>
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
              URGENT: You Have 14 Days to Request a Tow Hearing
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>File in the Justice of the Peace court where the tow occurred, NOT where your car is stored. Missing this deadline means you cannot contest the tow.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Harris County Impound Information</h1>
      <p className="text-xl text-gray-600 mb-8">Get your car out of impound after a DUI arrest in Harris County, Texas</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Primary Harris County Impound Lots</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4">🏢 Harris County Sheriff's Office Auto Pound</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>📍 Address:</strong> 8301 John Ralston Road, Houston, TX 77044</p>
                <p className="mb-2"><strong>📞 Phone:</strong> (713) 274-3232</p>
                <p className="mb-2"><strong>🕐 Release Hours:</strong> Mon-Fri 8:00 AM - 4:30 PM</p>
                <p className="mb-2"><strong>💳 Payment:</strong> Cash, Money Order, Cashier's Check</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💰 Fees</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Tow Fee: $200</li>
                  <li>• Daily Storage: $25/day</li>
                  <li>• Admin Fee: $50</li>
                  <li>• After-Hours: +$100</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4">🏢 Houston Police Department Auto Dealers Detail</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>📍 Address:</strong> 17800 Northwest Freeway, Houston, TX 77040</p>
                <p className="mb-2"><strong>📞 Phone:</strong> (713) 308-8800</p>
                <p className="mb-2"><strong>🕐 Release Hours:</strong> Daily 8:00 AM - 5:00 PM</p>
                <p className="mb-2"><strong>💳 Payment:</strong> Cash, Credit/Debit Cards</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💰 Fees</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Tow Fee: $185</li>
                  <li>• Daily Storage: $20/day</li>
                  <li>• Admin Fee: $45</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 What You Need to Release Your Vehicle</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">✅ Required Documents</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Valid photo ID (driver's license or state ID)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Proof of ownership (title or current registration)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Payment for all fees
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">❓ Insurance Required?</h3>
            <div className="bg-green-100 border border-green-200 rounded p-3">
              <p className="text-green-800 font-medium">NO - Texas Law Prohibits This</p>
              <p className="text-green-700 text-sm mt-1">Vehicle Storage Facilities cannot require proof of insurance for release (Texas Occupations Code Chapter 2308)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Contest Your Tow - Harris County JP Courts</h2>
        <p className="mb-4">You must file in the Justice of the Peace court for the precinct where the tow occurred, not where your car is stored.</p>
        
        <div className="bg-white border border-gray-200 rounded p-4 mb-4">
          <h3 className="font-semibold mb-2">🔍 Find Your JP Precinct</h3>
          <p className="text-sm text-gray-600 mb-2">Use our JP Precinct Locator to determine which court has jurisdiction:</p>
          <a href="/texas/jp-precinct-locator" className="text-blue-600 hover:text-blue-700 font-medium">Harris County JP Precinct Locator →</a>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Common JP Courts for Houston DUI Tows</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>JP Court 1-1:</strong> Downtown Houston arrests</li>
              <li>• <strong>JP Court 4-1:</strong> Westside Houston arrests</li>
              <li>• <strong>JP Court 5-2:</strong> East Houston arrests</li>
              <li>• <strong>JP Court 7-2:</strong> North Houston arrests</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Filing Requirements</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Deadline:</strong> 14 days from notice</li>
              <li>• <strong>Filing Fee:</strong> $54</li>
              <li>• <strong>Form:</strong> Tow hearing request</li>
              <li>• <strong>Service:</strong> On tow company</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💡 Money-Saving Options</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">🚚 Tow-Out Option</h3>
            <p className="text-sm text-gray-600 mb-3">Have your car towed directly from the lot to avoid additional daily storage fees.</p>
            <ul className="space-y-1 text-sm">
              <li>• No insurance required</li>
              <li>• Licensed tow truck only</li>
              <li>• Still pay initial tow + storage</li>
              <li>• Saves future daily fees</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">⏰ Get Personal Property</h3>
            <p className="text-sm text-gray-600 mb-3">Texas law allows you to retrieve personal items even if you can't afford to get the car.</p>
            <ul className="space-y-1 text-sm">
              <li>• No fee for retrieval</li>
              <li>• Bring photo ID</li>
              <li>• Business hours only</li>
              <li>• "Attached" items excluded</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ Can't Afford to Get Your Car?</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Timeline to Act:</h3>
            <ul className="space-y-2 text-sm mt-2">
              <li>• <strong>Day 1-14:</strong> Request tow hearing ($54 filing fee)</li>
              <li>• <strong>Day 30:</strong> VSF can apply for title (if car worth &lt;$4,000)</li>
              <li>• <strong>Day 90:</strong> Vehicle can be sold at auction</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <h4 className="font-semibold mb-2">💰 Can't Afford Fees? Your Options:</h4>
            <ul className="space-y-1 text-sm">
              <li>• File tow hearing to challenge fees</li>
              <li>• Remove personal property first</li>
              <li>• Negotiate payment plan with lot</li>
              <li>• Consider controlled abandonment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">🔗 Related Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="space-y-2">
              <li><a href="/texas/harris/dmv" className="text-blue-600 hover:text-blue-700">Request DMV Hearing (15-day deadline)</a></li>
              <li><a href="/texas/harris/bail" className="text-blue-600 hover:text-blue-700">Harris County Bail Information</a></li>
              <li><a href="/find-attorney/texas" className="text-blue-600 hover:text-blue-700">Find DUI Attorney</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Texas DUI Guide</h3>
            <ul className="space-y-2">
              <li><a href="/guide/after-arrest" className="text-blue-600 hover:text-blue-700">What Happens After DUI Arrest</a></li>
              <li><a href="/texas/laws" className="text-blue-600 hover:text-blue-700">Texas DUI Laws</a></li>
              <li><a href="/texas/penalties" className="text-blue-600 hover:text-blue-700">Texas DUI Penalties</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}