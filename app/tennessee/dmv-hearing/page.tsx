export default function TennesseeDMVHearingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/tennessee" className="hover:text-gray-700"> Tennessee</a> / 
        <span className="text-gray-900"> DMV Hearing</span>
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
              CRITICAL: You Have Only 10 Days to Request a Hearing
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Tennessee requires hearing requests within 10 calendar days. Missing this deadline results in automatic 1-year license suspension with NO appeal available.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Tennessee DMV Hearing - Administrative License Revocation</h1>
      <p className="text-xl text-gray-600 mb-8">Request your Tennessee administrative hearing within 10 days to avoid automatic license revocation</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">⏱️ Critical Timeline for Tennessee DUI</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 1</div>
            <div>
              <h3 className="font-semibold text-lg">DUI Arrest - Clock Starts</h3>
              <p className="text-gray-600">Officer issues implied consent advisory and notice form</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 10</div>
            <div>
              <h3 className="font-semibold text-lg">DEADLINE - Request Hearing</h3>
              <p className="text-gray-600">Must be received by Tennessee Department of Safety within 10 calendar days</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 11</div>
            <div>
              <h3 className="font-semibold text-lg">TOO LATE - Automatic Suspension</h3>
              <p className="text-gray-600">1-year suspension begins, no hearing allowed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 How to Request Your Tennessee Administrative Hearing</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">🌐 Online Request (Fastest)</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Website:</strong> <a href="https://www.tn.gov/safety" className="text-blue-600 hover:text-blue-700">tn.gov/safety</a></p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $100 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Time:</strong> Available 24/7</p>
              <p className="text-sm text-green-700"><strong>✅ Instant confirmation</strong></p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">📞 Phone Request</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Phone:</strong> (615) 741-3954</p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $100 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Hours:</strong> Mon-Fri 8 AM - 4:30 PM</p>
              <p className="text-sm text-yellow-700"><strong>⚠️ Limited hours</strong></p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3 text-blue-800">📧 Mail/Fax Request (NOT Recommended)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Address:</strong><br/>
              Tennessee Department of Safety<br/>
              Driver License Division<br/>
              1150 Foster Ave<br/>
              Nashville, TN 37249</p>
            </div>
            <div>
              <p><strong>Fax:</strong> (615) 532-1693</p>
              <p><strong>⚠️ RISK:</strong> Must arrive within 10 days</p>
              <p><strong>Fee:</strong> $100 (money order only)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 Information Needed for Tennessee Hearing Request</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">From Your Notice Form:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Driver License Number</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Date of Arrest</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Arresting Officer</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Arresting Agency</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Incident Number</strong>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Personal Details:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Full Legal Name</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Current Address</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Date of Birth</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Phone Number</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ Tennessee DUI Suspension Periods</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offense</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin Suspension</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">BAC Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">1st DUI</td>
                <td className="px-4 py-3 text-sm text-orange-600">1 year</td>
                <td className="px-4 py-3 text-sm">0.08+ or refusal</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">2nd DUI (within 10 years)</td>
                <td className="px-4 py-3 text-sm text-red-600">2 years</td>
                <td className="px-4 py-3 text-sm">0.08+ or refusal</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">3rd+ DUI</td>
                <td className="px-4 py-3 text-sm text-red-600">5 years</td>
                <td className="px-4 py-3 text-sm">0.08+ or refusal</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">Under 21</td>
                <td className="px-4 py-3 text-sm text-yellow-600">1 year</td>
                <td className="px-4 py-3 text-sm">0.02+ or refusal</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">CDL Holder</td>
                <td className="px-4 py-3 text-sm text-red-600">1 year</td>
                <td className="px-4 py-3 text-sm">0.04+ or refusal</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 bg-white border border-red-200 rounded p-4">
          <h3 className="font-semibold text-red-800 mb-2">⚠️ Additional Consequences:</h3>
          <ul className="text-sm space-y-1">
            <li>• Administrative suspension runs concurrent with criminal penalties</li>
            <li>• SR-22 insurance required for reinstatement</li>
            <li>• DUI school completion mandatory</li>
            <li>• Ignition interlock may be required for repeat offenders</li>
          </ul>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">✅ Tennessee Restricted Driving Permits</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Eligibility Requirements:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Complete DUI education course</li>
              <li>• Install ignition interlock (if required)</li>
              <li>• File SR-22 insurance</li>
              <li>• Pay application fee ($65)</li>
              <li>• Show proof of employment/hardship</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Permitted Activities:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Work/employment</li>
              <li>• Medical appointments</li>
              <li>• Court-ordered programs</li>
              <li>• DUI school attendance</li>
              <li>• Essential errands (limited)</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-green-200 rounded p-4 mt-4">
          <h3 className="font-semibold mb-2">📅 When Can You Apply?</h3>
          <ul className="text-sm space-y-1">
            <li>• <strong>First offense:</strong> After 30 days of suspension</li>
            <li>• <strong>Second offense:</strong> After 90 days of suspension</li>
            <li>• <strong>Third+ offense:</strong> After 1 year of suspension</li>
            <li>• <strong>Refusal:</strong> Generally not eligible for restricted permit</li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚗 Tennessee Ignition Interlock Requirements</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">When Interlock is Required:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>2nd DUI conviction</strong> (mandatory)</li>
              <li>• <strong>3rd+ DUI conviction</strong> (mandatory)</li>
              <li>• <strong>High BAC first offense</strong> (0.20+ - discretionary)</li>
              <li>• <strong>Restricted driving permit</strong> (often required)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Interlock Period:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>2nd offense:</strong> 1 year minimum</li>
              <li>• <strong>3rd offense:</strong> 2 years minimum</li>
              <li>• <strong>4th+ offense:</strong> 5 years minimum</li>
              <li>• <strong>All vehicles:</strong> Must install on ALL owned vehicles</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded p-4 mt-4">
          <h3 className="font-semibold mb-2 text-red-800">❌ NO Employer Vehicle Exemption</h3>
          <p className="text-sm">Tennessee does NOT allow exemptions for employer-owned vehicles. If you drive for work, your employer must either install an interlock device or find alternative arrangements.</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Administrative Hearing Process</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Hearing Details:</h3>
            <div className="bg-white border border-yellow-200 rounded p-3 text-sm">
              <p><strong>Tennessee Department of Safety</strong></p>
              <p>1150 Foster Avenue</p>
              <p>Nashville, TN 37249</p>
              <p><strong>Phone:</strong> (615) 741-3954</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">What State Must Prove:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Lawful arrest for DUI</li>
              <li>• Proper implied consent advisory</li>
              <li>• BAC ≥0.08 OR refusal to test</li>
              <li>• Test administered correctly</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-white border border-yellow-200 rounded p-4">
          <h3 className="font-semibold mb-3">💼 Attorney Representation Benefits</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>With Attorney:</strong></p>
              <ul className="space-y-1">
                <li>• Can subpoena officer/records</li>
                <li>• Knows technical defenses</li>
                <li>• Higher success rate</li>
                <li>• Protects criminal case</li>
              </ul>
            </div>
            <div>
              <p><strong>Without Attorney:</strong></p>
              <ul className="space-y-1">
                <li>• Must handle complex procedures</li>
                <li>• Limited defense knowledge</li>
                <li>• Lower win rate</li>
                <li>• Risk hurting criminal case</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 Tennessee DUI Criminal Penalties</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offense</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jail Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fine</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">License Suspension</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">1st DUI</td>
                <td className="px-4 py-3 text-sm">48 hours - 11 months 29 days</td>
                <td className="px-4 py-3 text-sm">$350-$1,500</td>
                <td className="px-4 py-3 text-sm">1 year</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">2nd DUI</td>
                <td className="px-4 py-3 text-sm">45 days - 11 months 29 days</td>
                <td className="px-4 py-3 text-sm">$600-$3,500</td>
                <td className="px-4 py-3 text-sm">2 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">3rd DUI</td>
                <td className="px-4 py-3 text-sm">120 days - 11 months 29 days</td>
                <td className="px-4 py-3 text-sm">$1,100-$10,000</td>
                <td className="px-4 py-3 text-sm">6 years</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">4th+ DUI (Felony)</td>
                <td className="px-4 py-3 text-sm">150 days - 6 years</td>
                <td className="px-4 py-3 text-sm">$3,000-$15,000</td>
                <td className="px-4 py-3 text-sm">8 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Next Steps & Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Immediate Actions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.tn.gov/safety" className="text-blue-600 hover:text-blue-700 bg-red-100 px-2 py-1 rounded font-semibold">REQUEST HEARING NOW</a></li>
              <li><a href="/find-attorney/tennessee" className="text-blue-600 hover:text-blue-700">Find TN DUI Attorney</a></li>
              <li><a href="/tennessee/penalties" className="text-blue-600 hover:text-blue-700">Tennessee DUI Penalties</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Tennessee Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/tennessee/interlock-no-exemption" className="text-blue-600 hover:text-blue-700">No Employer Exemption</a></li>
              <li><a href="/tennessee/sr22-insurance" className="text-blue-600 hover:text-blue-700">Tennessee SR-22 Insurance</a></li>
              <li><a href="/guide/requirements/interlock" className="text-blue-600 hover:text-blue-700">Ignition Interlock Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">County-Specific Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/tennessee/shelby" className="text-blue-600 hover:text-blue-700">Shelby County (Memphis)</a></li>
              <li><a href="/tennessee/davidson" className="text-blue-600 hover:text-blue-700">Davidson County (Nashville)</a></li>
              <li><a href="/tennessee/knox" className="text-blue-600 hover:text-blue-700">Knox County (Knoxville)</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}