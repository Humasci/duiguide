export default function ArizonaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              URGENT: Arizona DUI - 15 Day MVD Hearing Deadline
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>You have 15 days from arrest to request an implied consent hearing. Missing this deadline = automatic 90-day license suspension.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Arizona DUI Guide</h1>
      <p className="text-xl text-gray-600 mb-8">Complete guide to DUI process, penalties, and procedures in Arizona. Get help with MVD hearings, court proceedings, and license restoration.</p>

      {/* Quick Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-700">🚨 MVD Implied Consent Hearing</h2>
          <p className="text-gray-700 mb-4">Request your administrative hearing within 15 days to challenge license suspension.</p>
          <div className="space-y-2 text-sm mb-4">
            <p><strong>Deadline:</strong> 15 days from arrest</p>
            <p><strong>Fee:</strong> $500</p>
            <p><strong>Phone:</strong> (602) 712-7355</p>
          </div>
          <a href="/arizona/dmv-hearing" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">Request Hearing →</a>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">⚖️ Arizona DUI Penalties</h2>
          <p className="text-gray-700 mb-4">Understanding Arizona's strict DUI laws and potential consequences.</p>
          <div className="space-y-1 text-sm mb-4">
            <p>• <strong>First Offense:</strong> 10+ days jail</p>
            <p>• <strong>Extreme DUI:</strong> 30+ days jail</p>
            <p>• <strong>License:</strong> 90-365 day suspension</p>
          </div>
          <a href="/arizona/penalties" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">View Penalties →</a>
        </div>
      </div>

      {/* County Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🌵 Arizona Counties</h2>
        <p className="text-gray-600 mb-6">Find county-specific information for courts, impound lots, bail bonds, and other services.</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Maricopa County</h3>
            <p className="text-sm text-gray-600 mb-3">Phoenix, Scottsdale, Mesa, Tempe, Chandler, Glendale</p>
            <a href="/arizona/maricopa" className="text-blue-600 hover:text-blue-700 text-sm">View County Info →</a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Pima County</h3>
            <p className="text-sm text-gray-600 mb-3">Tucson, Oro Valley, South Tucson</p>
            <a href="/arizona/pima" className="text-blue-600 hover:text-blue-700 text-sm">View County Info →</a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Pinal County</h3>
            <p className="text-sm text-gray-600 mb-3">Casa Grande, Maricopa, Eloy</p>
            <a href="/arizona/pinal" className="text-blue-600 hover:text-blue-700 text-sm">View County Info →</a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Yavapai County</h3>
            <p className="text-sm text-gray-600 mb-3">Prescott, Sedona, Cottonwood</p>
            <a href="/arizona/yavapai" className="text-blue-600 hover:text-blue-700 text-sm">View County Info →</a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Yuma County</h3>
            <p className="text-sm text-gray-600 mb-3">Yuma, Somerton, San Luis</p>
            <a href="/arizona/yuma" className="text-blue-600 hover:text-blue-700 text-sm">View County Info →</a>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Mohave County</h3>
            <p className="text-sm text-gray-600 mb-3">Lake Havasu City, Kingman, Bullhead City</p>
            <a href="/arizona/mohave" className="text-blue-600 hover:text-blue-700 text-sm">View County Info →</a>
          </div>
        </div>
      </div>

      {/* Arizona DUI Services */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🚗 Vehicle Impound</h2>
          <p className="text-gray-600 mb-4">Get your vehicle released from impound lots across Arizona.</p>
          <a href="/arizona/towing-impound" className="text-blue-600 hover:text-blue-700 font-medium">Arizona Impound Info →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">💰 Bail Bonds</h2>
          <p className="text-gray-600 mb-4">Find bail bond agents serving Arizona counties.</p>
          <a href="/arizona/bail-bonds" className="text-blue-600 hover:text-blue-700 font-medium">Bail Bond Services →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔒 Ignition Interlock</h2>
          <p className="text-gray-600 mb-4">Find certified ignition interlock installers in Arizona.</p>
          <a href="/arizona/ignition-interlock" className="text-blue-600 hover:text-blue-700 font-medium">Interlock Installers →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📱 SCRAM Monitoring</h2>
          <p className="text-gray-600 mb-4">Continuous alcohol monitoring providers in Arizona.</p>
          <a href="/arizona/scram" className="text-blue-600 hover:text-blue-700 font-medium">SCRAM Providers →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎓 DUI School</h2>
          <p className="text-gray-600 mb-4">Court-approved DUI education programs in Arizona.</p>
          <a href="/arizona/dui-school" className="text-blue-600 hover:text-blue-700 font-medium">Find DUI School →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📄 SR-22 Insurance</h2>
          <p className="text-gray-600 mb-4">Get required SR-22 filing for license reinstatement.</p>
          <a href="/arizona/sr22-insurance" className="text-blue-600 hover:text-blue-700 font-medium">SR-22 Information →</a>
        </div>
      </div>

      {/* Arizona Laws & Penalties */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📜 Arizona DUI Laws Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Arizona DUI Levels</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Regular DUI:</strong> BAC 0.08-0.149%</li>
              <li>• <strong>Extreme DUI:</strong> BAC 0.15-0.199%</li>
              <li>• <strong>Super Extreme DUI:</strong> BAC 0.20%+</li>
              <li>• <strong>Drug DUI:</strong> Any impairing substance</li>
              <li>• <strong>Aggravated DUI:</strong> 3rd offense, suspended license, etc.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Key Arizona Statutes</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>A.R.S. § 28-1381:</strong> DUI definitions</li>
              <li>• <strong>A.R.S. § 28-1382:</strong> Extreme DUI</li>
              <li>• <strong>A.R.S. § 28-1383:</strong> Aggravated DUI</li>
              <li>• <strong>A.R.S. § 28-1321:</strong> Implied consent</li>
              <li>• <strong>A.R.S. § 28-1401:</strong> Ignition interlock</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4">
          <a href="/arizona/laws" className="text-blue-600 hover:text-blue-700 font-medium">View Complete Arizona DUI Laws →</a>
        </div>
      </div>

      {/* Legal Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">👨‍⚖️ Need Legal Representation?</h2>
        <p className="text-gray-700 mb-4">Connect with experienced Arizona DUI attorneys who understand local courts and procedures.</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold mb-2">Why You Need an Attorney:</h3>
            <ul className="text-sm space-y-1">
              <li>• Arizona has complex DUI laws</li>
              <li>• Mandatory jail time even for first offense</li>
              <li>• License suspension separate from criminal case</li>
              <li>• Ignition interlock requirements</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Attorney Benefits:</h3>
            <ul className="text-sm space-y-1">
              <li>• Challenge MVD evidence</li>
              <li>• Negotiate reduced charges</li>
              <li>• Minimize jail time</li>
              <li>• Protect driving privileges</li>
            </ul>
          </div>
        </div>
        <a href="/find-attorney/arizona" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Find Arizona DUI Attorney</a>
      </div>
    </div>
  )
}