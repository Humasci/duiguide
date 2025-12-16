export default function ImpoundGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/guide" className="hover:text-gray-700"> DUI Guide</a> / 
        <a href="/guide/after-arrest" className="hover:text-gray-700"> After Arrest</a> / 
        <span className="text-gray-900"> Get Car from Impound</span>
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
              URGENT: Daily Storage Fees Are Accumulating
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Every day your car sits in impound costs $20-50. After 30-90 days, it can be auctioned. You may also have the right to contest the tow - but deadlines are strict.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Your Car Out of Impound After DUI</h1>
      <p className="text-xl text-gray-600 mb-8">Complete guide to retrieving your vehicle, understanding your rights, and contesting impound fees.</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">🚗 Why Was My Car Impounded?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Common Impound Reasons:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <strong>DUI arrest</strong> - Car can't be left unattended
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <strong>Suspended/revoked license</strong> - Illegal to drive
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <strong>No insurance</strong> - State-specific requirements
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <strong>Outstanding warrants</strong> - Extended detention
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <strong>Vehicle evidence</strong> - Accident/investigation
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Mandatory vs. Discretionary:</h3>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <h4 className="font-semibold text-red-800">Mandatory Impounds</h4>
                <p className="text-sm">Arizona: 30 days for suspended license</p>
                <p className="text-sm">Some jurisdictions: Automatic tow</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <h4 className="font-semibold text-yellow-800">Discretionary Impounds</h4>
                <p className="text-sm">Officer's choice based on circumstances</p>
                <p className="text-sm">May allow alternative arrangements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💰 Impound Fees Breakdown</h2>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Range</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Tow Fee</td>
                <td className="px-4 py-3 text-sm">$150-$300</td>
                <td className="px-4 py-3 text-sm">One-time charge for towing</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">Daily Storage</td>
                <td className="px-4 py-3 text-sm">$20-$50/day</td>
                <td className="px-4 py-3 text-sm">Begins immediately after tow</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Administrative Fee</td>
                <td className="px-4 py-3 text-sm">$50-$150</td>
                <td className="px-4 py-3 text-sm">Processing/paperwork</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">After-Hours Release</td>
                <td className="px-4 py-3 text-sm">$75-$200</td>
                <td className="px-4 py-3 text-sm">If available outside business hours</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-2">💡 Cost Example (7 days):</h3>
          <ul className="text-sm space-y-1">
            <li>• Tow fee: $200</li>
            <li>• Storage (7 days × $35): $245</li>
            <li>• Admin fee: $75</li>
            <li>• <strong>Total: $520</strong></li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">📋 What You Need to Get Your Car</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4 text-green-800">✅ Required Documents</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 font-bold">•</span>
                <div>
                  <strong>Valid Photo ID</strong>
                  <p className="text-sm text-gray-600">Driver's license or state ID</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 font-bold">•</span>
                <div>
                  <strong>Proof of Ownership</strong>
                  <p className="text-sm text-gray-600">Title, registration, or loan documents</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 font-bold">•</span>
                <div>
                  <strong>Payment</strong>
                  <p className="text-sm text-gray-600">Cash, money order, or cards (varies)</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-yellow-800">❓ Insurance Requirements (State-Specific)</h3>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <h4 className="font-semibold">✅ NOT Required:</h4>
                <p className="text-sm">Texas: VSFs cannot require insurance proof</p>
                <p className="text-sm">Many states: Tow-out option available</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <h4 className="font-semibold">❌ May Be Required:</h4>
                <p className="text-sm">Some jurisdictions: Valid insurance to drive</p>
                <p className="text-sm">Check local requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚖️ Contest Your Tow - Know Your Rights</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">When You Can Contest:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Illegal tow:</strong> No proper authorization</li>
              <li>• <strong>Improper signage:</strong> Private property tows</li>
              <li>• <strong>Excessive fees:</strong> Above legal limits</li>
              <li>• <strong>Damage claims:</strong> Vehicle damaged during tow</li>
              <li>• <strong>Invalid hold:</strong> Legal basis questionable</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contest Deadlines by State:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Texas:</strong> 14 days (JP court where towed)</li>
              <li>• <strong>Arizona:</strong> 30 days post-storage hearing</li>
              <li>• <strong>Georgia:</strong> Magistrate court process</li>
              <li>• <strong>Colorado:</strong> Municipal court jurisdiction</li>
              <li>• <strong>Other states:</strong> Check local laws</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-yellow-200 rounded p-4 mt-4">
          <h3 className="font-semibold mb-2">📝 Texas Special Rule: JP Precinct Jurisdiction</h3>
          <p className="text-sm">In Texas, you must file your tow hearing in the Justice of the Peace court for the precinct where the tow occurred, NOT where your car is stored. This is a common mistake.</p>
          <a href="/texas/jp-precinct-locator" className="text-yellow-700 hover:text-yellow-800 text-sm font-medium">Use Texas JP Precinct Locator →</a>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">🎯 State-Specific Impound Rules</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="bg-red-500 text-white rounded px-2 py-1 text-xs mr-2">TX</span>
              Texas Impound Rules
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>14-day hearing deadline</strong> to contest tow</li>
              <li>• <strong>No insurance requirement</strong> for vehicle release</li>
              <li>• <strong>Tow-out option:</strong> Licensed tow truck can remove without owner insurance</li>
              <li>• <strong>JP court jurisdiction:</strong> File where towed, not where stored</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="bg-orange-500 text-white rounded px-2 py-1 text-xs mr-2">AZ</span>
              Arizona Impound Rules
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>30-day mandatory impound</strong> for suspended/revoked license</li>
              <li>• <strong>Early release options:</strong> Spousal affidavit, license reinstatement</li>
              <li>• <strong>Post-storage hearing:</strong> 30 days to contest after release</li>
              <li>• <strong>Rental/bailment exception:</strong> Special rules for non-owner vehicles</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="bg-blue-500 text-white rounded px-2 py-1 text-xs mr-2">GA</span>
              Georgia Impound Rules
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>NCT permit required</strong> for private property towing</li>
              <li>• <strong>Signage requirements:</strong> Must accept cash, money order, AND credit cards</li>
              <li>• <strong>30-day personal property rule:</strong> Can retrieve belongings</li>
              <li>• <strong>Magistrate court:</strong> Contest through local magistrate court</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="bg-green-500 text-white rounded px-2 py-1 text-xs mr-2">CO</span>
              Colorado Impound Rules
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>15% payment rule</strong> for residential property tows (max $60)</li>
              <li>• <strong>Essential items free:</strong> Medications, ID, child seats</li>
              <li>• <strong>Labor charges:</strong> Up to $100/hour for property retrieval (police tows)</li>
              <li>• <strong>Retrieval with Payment Owed form:</strong> Special payment arrangement</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="bg-purple-500 text-white rounded px-2 py-1 text-xs mr-2">OH</span>
              Ohio Impound Rules
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>BMV 4202 affidavit:</strong> Vehicles worth &lt;$3,500 can transfer title</li>
              <li>• <strong>60-day rule:</strong> Tow company can claim title after 60 days</li>
              <li>• <strong>Defense:</strong> If vehicle worth &gt;$3,500, company needs court order</li>
              <li>• <strong>Notification required:</strong> Tow company must verify ownership via BMV</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="bg-yellow-500 text-white rounded px-2 py-1 text-xs mr-2">TN</span>
              Tennessee Impound Rules
            </h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>TIES verification:</strong> Sheriff must verify ownership within 3 days</li>
              <li>• <strong>Consumer Bill of Rights:</strong> Right to retrieve personal property</li>
              <li>• <strong>Rental vehicle notice:</strong> 3 business days for notification</li>
              <li>• <strong>Property retrieval:</strong> Business hours only, photo ID required</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ What If You Can't Afford the Fees?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Immediate Options:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Get personal property first</strong> - Usually free</li>
              <li>• <strong>File tow hearing</strong> - May reduce/eliminate fees</li>
              <li>• <strong>Negotiate payment plan</strong> - Some lots offer this</li>
              <li>• <strong>Tow-out arrangement</strong> - Move car to cheaper storage</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Timeline Consequences:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Day 30:</strong> Title transfer possible (low-value vehicles)</li>
              <li>• <strong>Day 90:</strong> Lien foreclosure proceedings begin</li>
              <li>• <strong>Day 120+:</strong> Vehicle auction/disposal</li>
              <li>• <strong>Deficiency:</strong> You may still owe money after auction</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-red-200 rounded p-4 mt-4">
          <h3 className="font-semibold text-red-800 mb-2">Controlled Abandonment:</h3>
          <p className="text-sm">If fees exceed vehicle value, you may choose to abandon the vehicle. However, you could still be liable for storage fees up to abandonment, and any deficiency after auction.</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💡 Money-Saving Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-green-800">Act Quickly:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Get car ASAP:</strong> Every day costs $20-50</li>
              <li>• <strong>Retrieve belongings first:</strong> Usually free</li>
              <li>• <strong>Call ahead:</strong> Confirm hours and payment methods</li>
              <li>• <strong>Bring exact documents:</strong> Avoid multiple trips</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-green-800">Know Your Rights:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Question fees:</strong> Ask for itemized breakdown</li>
              <li>• <strong>Check signage:</strong> Illegal tow if improper notice</li>
              <li>• <strong>Document damage:</strong> Photos before and after</li>
              <li>• <strong>Get receipts:</strong> For all payments made</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Related Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Local Impound Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/texas/harris/impound" className="text-blue-600 hover:text-blue-700">Harris County, TX</a></li>
              <li><a href="/arizona/maricopa/impound" className="text-blue-600 hover:text-blue-700">Maricopa County, AZ</a></li>
              <li><a href="/georgia/fulton/impound" className="text-blue-600 hover:text-blue-700">Fulton County, GA</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contest Your Tow</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/guide/after-arrest/tow-hearing" className="text-blue-600 hover:text-blue-700">Tow Hearing Guide</a></li>
              <li><a href="/texas/jp-precinct-locator" className="text-blue-600 hover:text-blue-700">Texas JP Locator</a></li>
              <li><a href="/guide/after-arrest/personal-property" className="text-blue-600 hover:text-blue-700">Get Your Belongings</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/guide/dmv-hearing" className="text-blue-600 hover:text-blue-700">Request DMV Hearing</a></li>
              <li><a href="/guide/after-arrest/bail" className="text-blue-600 hover:text-blue-700">Understand Bail Process</a></li>
              <li><a href="/find-attorney" className="text-blue-600 hover:text-blue-700">Find DUI Attorney</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}