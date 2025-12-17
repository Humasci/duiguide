export default function HarrisCountySCRAMPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/texas" className="hover:text-gray-700"> Texas</a> / 
        <a href="/texas/harris" className="hover:text-gray-700"> Harris County</a> / 
        <span className="text-gray-900"> SCRAM Monitoring</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Harris County SCRAM Bracelet Information</h1>
      <p className="text-xl text-gray-600 mb-8">SCRAM alcohol monitoring providers serving Harris County and Houston metro area</p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚖️ When Is SCRAM Required in Harris County?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Common SCRAM Triggers</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>2nd DWI offense</strong> (bond condition)
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>High BAC</strong> (≥0.15) on 1st offense
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Intoxication Assault/Manslaughter</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Probation condition</strong> (post-conviction)
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Pre-trial release</strong> (judge&apos;s discretion)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Voluntary SCRAM Benefits</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Mitigate sentencing
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Help with custody cases
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Show commitment to sobriety
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Negotiate better plea deal
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">📍 SCRAM Providers in Harris County</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4">🏢 Recovery Monitoring Solutions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>📍 Address:</strong> 3555 Timmons Lane, Suite 1120, Houston, TX 77027</p>
                <p className="mb-2"><strong>📞 Phone:</strong> (713) 622-7722</p>
                <p className="mb-2"><strong>🕐 Hours:</strong> Mon-Fri 8:00 AM - 5:00 PM</p>
                <p className="mb-2"><strong>🌐 Website:</strong> rmsdwi.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💰 Typical Costs</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Installation: $50-$100</li>
                  <li>• Daily Monitoring: $10-$15</li>
                  <li>• Monthly Average: $300-$450</li>
                  <li>• Removal: $25-$50</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold mb-4">🏢 Safe Monitoring Solutions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>📍 Address:</strong> 2909 Hillcroft St, Suite 415, Houston, TX 77057</p>
                <p className="mb-2"><strong>📞 Phone:</strong> (713) 781-0088</p>
                <p className="mb-2"><strong>🕐 Hours:</strong> Mon-Fri 9:00 AM - 6:00 PM, Sat 9:00 AM - 2:00 PM</p>
                <p className="mb-2"><strong>🌐 Website:</strong> safemonitoring.net</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Services</h4>
                <ul className="space-y-1 text-sm">
                  <li>• SCRAM CAM (alcohol)</li>
                  <li>• SCRAM GPS (location)</li>
                  <li>• House arrest monitoring</li>
                  <li>• Drug patch testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚫 Products to Avoid While on SCRAM</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-3">🧴 Personal Care</h3>
            <ul className="space-y-1 text-sm">
              <li>• Mouthwash (alcohol-based)</li>
              <li>• Hand sanitizer</li>
              <li>• Aftershave</li>
              <li>• Perfume/cologne</li>
              <li>• Hair sprays</li>
              <li>• Deodorants (some)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">🍽️ Food & Drinks</h3>
            <ul className="space-y-1 text-sm">
              <li>• Vanilla extract</li>
              <li>• Energy drinks (some)</li>
              <li>• Kombucha</li>
              <li>• Non-alcoholic beer</li>
              <li>• Cooking wine</li>
              <li>• Vinegar (large amounts)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">🏠 Household</h3>
            <ul className="space-y-1 text-sm">
              <li>• Cleaning products</li>
              <li>• Paint thinner</li>
              <li>• Rubbing alcohol</li>
              <li>• Nail polish remover</li>
              <li>• Air fresheners</li>
              <li>• Lysol wipes</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-white border border-red-200 rounded p-4">
          <p className="text-sm"><strong>⚠️ Important:</strong> Always check product labels for alcohol content. Even small amounts can trigger a violation. When in doubt, ask your monitoring provider for an approved products list.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📱 Living with SCRAM - Tips for Success</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Daily Maintenance</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Charge device daily (2+ hours)
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Clean skin around device with unscented soap
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Avoid pools/hot tubs (water damage)
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Wear loose-fitting pants to avoid irritation
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Avoiding False Positives</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Use alcohol-free products only
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Keep a product log/receipts
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Report any skin conditions immediately
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Avoid environments with alcohol vapors
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💰 SCRAM Cost Breakdown</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Installation</td>
                <td className="px-4 py-3 text-sm font-semibold">$50-$100</td>
                <td className="px-4 py-3 text-sm">One-time setup fee</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Daily Monitoring</td>
                <td className="px-4 py-3 text-sm font-semibold">$10-$15</td>
                <td className="px-4 py-3 text-sm">$300-$450/month</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Removal</td>
                <td className="px-4 py-3 text-sm font-semibold">$25-$50</td>
                <td className="px-4 py-3 text-sm">End of monitoring period</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Violation Fee</td>
                <td className="px-4 py-3 text-sm font-semibold">$300-$500</td>
                <td className="px-4 py-3 text-sm">Per confirmed alcohol event</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">*Costs may vary by provider and monitoring requirements. Some courts may order specific providers.</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ SCRAM Violations - What to Expect</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-800 mb-3">Types of Violations</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Confirmed Alcohol:</strong> 3+ consecutive positive reads</li>
              <li>• <strong>Tamper:</strong> Blocking, removing, or damaging device</li>
              <li>• <strong>Obstruction:</strong> Covering sensors</li>
              <li>• <strong>Non-Compliance:</strong> Missing check-ins</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-3">Potential Consequences</h3>
            <ul className="space-y-2 text-sm">
              <li>• Bond revocation and re-arrest</li>
              <li>• Extended monitoring period</li>
              <li>• Additional probation conditions</li>
              <li>• Jail time (if on probation)</li>
              <li>• Higher bond amount</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Related Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Harris County Resources</h3>
            <ul className="space-y-2">
              <li><a href="/texas/harris/court" className="text-blue-600 hover:text-blue-700">Court Information</a></li>
              <li><a href="/texas/harris/bail" className="text-blue-600 hover:text-blue-700">Bail Bonds</a></li>
              <li><a href="/find-attorney/texas" className="text-blue-600 hover:text-blue-700">Find DUI Attorney</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">SCRAM Resources</h3>
            <ul className="space-y-2">
              <li><a href="/guide/monitoring/scram" className="text-blue-600 hover:text-blue-700">Complete SCRAM Guide</a></li>
              <li><a href="/guide/monitoring/scram/false-positive" className="text-blue-600 hover:text-blue-700">False Positive Prevention</a></li>
              <li><a href="/guide/monitoring/scram/products" className="text-blue-600 hover:text-blue-700">Safe Products List</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}