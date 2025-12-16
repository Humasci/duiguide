export default function HarrisCountyBailPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/texas" className="hover:text-gray-700"> Texas</a> / 
        <a href="/texas/harris" className="hover:text-gray-700"> Harris County</a> / 
        <span className="text-gray-900"> Bail Bonds</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Harris County Bail Bonds & Release</h1>
      <p className="text-xl text-gray-600 mb-8">Complete information about getting released from Harris County Jail after a DUI arrest</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">🏛️ Harris County Jail Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Harris County Joint Processing Center</h3>
            <div className="space-y-2">
              <p><strong>📍 Address:</strong> 700 N. San Jacinto St, Houston, TX 77002</p>
              <p><strong>📞 Booking:</strong> (713) 755-5000</p>
              <p><strong>🔍 Inmate Search:</strong> <a href="https://www.harriscountysheriff.org" className="text-blue-600 hover:text-blue-700">HarrisCountySheriff.org</a></p>
              <p><strong>⏰ Processing Time:</strong> 2-6 hours average</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Bail Information</h3>
            <div className="space-y-2">
              <p><strong>📋 Bail Schedule:</strong> Available 24/7</p>
              <p><strong>💳 Payment Methods:</strong> Cash, Bond, Property</p>
              <p><strong>🕐 Release Hours:</strong> 24/7</p>
              <p><strong>📞 Bail Info Line:</strong> (713) 755-6044</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💰 Harris County DUI Bail Amounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charge</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typical Bail</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">10% Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">DWI 1st Offense</td>
                <td className="px-4 py-3 text-sm">$1,000 - $3,000</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">$100 - $300</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">DWI 2nd Offense</td>
                <td className="px-4 py-3 text-sm">$2,500 - $5,000</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">$250 - $500</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">DWI w/ BAC ≥ 0.15</td>
                <td className="px-4 py-3 text-sm">$3,000 - $7,500</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">$300 - $750</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">DWI 3rd (Felony)</td>
                <td className="px-4 py-3 text-sm">$5,000 - $15,000</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">$500 - $1,500</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Intoxication Assault</td>
                <td className="px-4 py-3 text-sm">$15,000 - $50,000</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-600">$1,500 - $5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">*Actual bail amounts set by judge and may vary based on criminal history, flight risk, and other factors.</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 Texas Bail Bond Laws - What You Need to Know</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-yellow-800">Premium Rate (What You Pay)</h3>
            <div className="bg-white border border-yellow-200 rounded p-4">
              <p className="text-sm mb-2"><strong>Market Rate:</strong> ~10% of bail amount</p>
              <p className="text-sm mb-2"><strong>No Legal Cap:</strong> Texas doesn't set maximum rates</p>
              <p className="text-sm mb-2"><strong>Non-Refundable:</strong> You don't get this money back</p>
              <p className="text-sm text-gray-600">Example: $5,000 bail = ~$500 premium to bondsman</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-yellow-800">Co-Signer Liability</h3>
            <div className="bg-white border border-yellow-200 rounded p-4">
              <p className="text-sm mb-2"><strong>Full Bond Amount:</strong> Not just the premium</p>
              <p className="text-sm mb-2"><strong>Property at Risk:</strong> House, car, savings</p>
              <p className="text-sm mb-2"><strong>Bond Forfeiture:</strong> If defendant skips court</p>
              <p className="text-sm text-gray-600">Example: Co-sign $10,000 bond = liable for full $10,000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ Co-Signer Warning</h2>
        <div className="space-y-4">
          <div className="bg-white border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">When You Co-Sign a Bond, You're Responsible For:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Full bond amount</strong> if defendant doesn't appear in court
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Court costs and attorney fees</strong> in collection lawsuits
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Locating the defendant</strong> and bringing them to court
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Property seizure</strong> to satisfy judgment
              </li>
            </ul>
          </div>
          <div className="bg-white border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">Texas Judgment Nisi Process:</h3>
            <ol className="space-y-1 text-sm">
              <li>1. Defendant misses court → Bond declared forfeited</li>
              <li>2. 20-day notice period to produce defendant</li>
              <li>3. If not produced → Judgment Nisi entered</li>
              <li>4. 150-day period to seek "remission" (reduction)</li>
              <li>5. Final judgment → Collection lawsuit against co-signer</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🆓 Free/Low-Cost Bail Options in Harris County</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Harris County Pretrial Services</h3>
            <div className="bg-white border border-green-200 rounded p-4">
              <p className="text-sm mb-2"><strong>Personal Recognizance (PR) Bond</strong></p>
              <p className="text-sm mb-2">📞 Phone: (713) 755-6565</p>
              <p className="text-sm mb-2">💰 Cost: $0 (sign a promise to appear)</p>
              <p className="text-sm text-gray-600">Available for qualifying first-time offenders</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Charitable Bail Organizations</h3>
            <div className="bg-white border border-green-200 rounded p-4">
              <p className="text-sm mb-2"><strong>The Bail Project Houston</strong></p>
              <p className="text-sm mb-2">🌐 Website: bailproject.org</p>
              <p className="text-sm mb-2">💰 Cost: $0 (cannot charge fees under Texas law)</p>
              <p className="text-sm text-gray-600">Limited funding, not available for all charges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📞 Licensed Harris County Bail Bondsmen</h2>
        <p className="text-gray-600 mb-4">Licensed by the Harris County Bail Bond Board. Always verify license status.</p>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2">24/7 Emergency Bail Services</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p><strong>AAAA Bail Bonds</strong></p>
                <p>📞 (713) 676-2000</p>
                <p>🕐 24/7 Service</p>
              </div>
              <div>
                <p><strong>ATX Bail Bonds</strong></p>
                <p>📞 (713) 782-8776</p>
                <p>🕐 24/7 Service</p>
              </div>
              <div>
                <p><strong>Houston Bail Services</strong></p>
                <p>📞 (713) 225-2245</p>
                <p>🕐 24/7 Service</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">*This is not an endorsement. Always compare rates and verify licensing with the Harris County Bail Bond Board.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⏰ What Happens After Release?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">🚨 URGENT (15 days)</h3>
            <p className="text-sm">Request Administrative License Revocation (ALR) hearing with Texas DPS</p>
            <a href="/texas/harris/dmv" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Learn More →</a>
          </div>
          <div className="bg-white border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">📅 Court Date</h3>
            <p className="text-sm">Listed on your bond paperwork. DO NOT MISS or bond will be forfeited.</p>
            <a href="/texas/harris/court" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Court Info →</a>
          </div>
          <div className="bg-white border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">👨‍💼 Get Attorney</h3>
            <p className="text-sm">Contact experienced DUI attorney before first court appearance</p>
            <a href="/find-attorney/texas" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Find Attorney →</a>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Related Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Harris County Resources</h3>
            <ul className="space-y-2">
              <li><a href="/texas/harris/impound" className="text-blue-600 hover:text-blue-700">Get Car from Impound</a></li>
              <li><a href="/texas/harris/court" className="text-blue-600 hover:text-blue-700">Court Information</a></li>
              <li><a href="/texas/harris/dmv" className="text-blue-600 hover:text-blue-700">DMV Hearing Request</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Texas DUI Guide</h3>
            <ul className="space-y-2">
              <li><a href="/guide/after-arrest" className="text-blue-600 hover:text-blue-700">What Happens After Arrest</a></li>
              <li><a href="/texas/penalties" className="text-blue-600 hover:text-blue-700">Texas DUI Penalties</a></li>
              <li><a href="/guide/dmv-hearing" className="text-blue-600 hover:text-blue-700">DMV Hearing Guide</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}