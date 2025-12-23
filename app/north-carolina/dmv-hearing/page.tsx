export default function NorthCarolinaDMVHearingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/north-carolina" className="hover:text-gray-700"> North Carolina</a> / 
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
              CRITICAL: You Have Only 10 Days to Request a Civil Revocation Hearing
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>North Carolina has one of the shortest deadlines in the US. Missing this 10-day deadline results in automatic 1-year license revocation with NO appeal.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">North Carolina DMV Hearing - Civil Revocation</h1>
      <p className="text-xl text-gray-600 mb-8">Request your North Carolina Civil Revocation hearing within 10 days to avoid automatic license revocation</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">⏱️ Critical Timeline for North Carolina DWI</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 1</div>
            <div>
              <h3 className="font-semibold text-lg">DWI Arrest - Clock Starts</h3>
              <p className="text-gray-600">Officer gives you a civil revocation notice (DL-123)</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 10</div>
            <div>
              <h3 className="font-semibold text-lg">DEADLINE - Request Hearing</h3>
              <p className="text-gray-600">Must be received by NC DMV within 10 calendar days</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 11</div>
            <div>
              <h3 className="font-semibold text-lg">TOO LATE - No Hearing</h3>
              <p className="text-gray-600">Automatic 1-year revocation, no exceptions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 How to Request Your NC Civil Revocation Hearing</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">🌐 Online Request (Fastest)</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Website:</strong> <a href="https://www.ncdot.gov/dmv" className="text-blue-600 hover:text-blue-700">ncdot.gov/dmv</a></p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $50 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Time:</strong> Available 24/7</p>
              <p className="text-sm text-green-700"><strong>✅ Instant confirmation</strong></p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">📞 Phone Request</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Phone:</strong> (919) 715-7000</p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $50 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Hours:</strong> Mon-Fri 8 AM - 5 PM</p>
              <p className="text-sm text-yellow-700"><strong>⚠️ Limited hours</strong></p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3 text-blue-800">📧 Mail Request (NOT Recommended)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Address:</strong><br/>
              NC Division of Motor Vehicles<br/>
              Driver License Section<br/>
              1100 New Bern Ave<br/>
              Raleigh, NC 27697</p>
            </div>
            <div>
              <p><strong>⚠️ RISK:</strong> Must arrive within 10 days</p>
              <p><strong>Fee:</strong> $50 (certified check or money order)</p>
              <p><strong>Form:</strong> DL-123B (hearing request)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 North Carolina DWI Levels & Consequences</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DWI Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Civil Revocation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criminal Penalties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Level A1 (Aggravated)</td>
                <td className="px-4 py-3 text-sm text-red-600">1 year</td>
                <td className="px-4 py-3 text-sm">60 days jail (min), $4,000 fine, mandatory SCRAM</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">Level 1</td>
                <td className="px-4 py-3 text-sm text-red-600">1 year</td>
                <td className="px-4 py-3 text-sm">30 days jail (min), $4,000 fine</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Level 2</td>
                <td className="px-4 py-3 text-sm text-blue-900">1 year</td>
                <td className="px-4 py-3 text-sm">7 days jail (min), $2,000 fine</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">Level 3</td>
                <td className="px-4 py-3 text-sm text-blue-900">1 year</td>
                <td className="px-4 py-3 text-sm">72 hours jail (min), $1,000 fine</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Level 4</td>
                <td className="px-4 py-3 text-sm text-yellow-600">1 year</td>
                <td className="px-4 py-3 text-sm">48 hours jail (min), $500 fine</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">Level 5</td>
                <td className="px-4 py-3 text-sm text-green-600">1 year</td>
                <td className="px-4 py-3 text-sm">24 hours jail (min), $200 fine</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 bg-white border border-yellow-200 rounded p-4">
          <h3 className="font-semibold mb-2">⚠️ Level A1 Triggers (Most Severe):</h3>
          <ul className="text-sm space-y-1">
            <li>• DWI while license revoked for prior DWI</li>
            <li>• DWI causing serious bodily injury</li>
            <li>• DWI with child under 18 in vehicle</li>
            <li>• Prior DWI conviction within 7 years</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ North Carolina Civil Revocation vs. Criminal Case</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-800 mb-3">Civil Revocation (DMV):</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Automatic:</strong> Triggered by arrest
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>10-day deadline:</strong> Request hearing
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>1-year revocation:</strong> If you lose/don&apos;t request
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Lower burden:</strong> Preponderance of evidence
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-3">Criminal Case (Court):</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Separate process:</strong> Different from civil
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Jury trial possible:</strong> Beyond reasonable doubt
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Additional penalties:</strong> Jail, fines, probation
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Second revocation:</strong> If convicted
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">✅ Limited Driving Privilege in NC</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Eligibility Requirements:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Complete substance abuse assessment</li>
              <li>• Install ignition interlock (if required)</li>
              <li>• File SR-22 insurance</li>
              <li>• Pay restoration fee ($130)</li>
              <li>• No pending criminal charges for DWI</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-3">Permitted Activities:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Work/employment</li>
              <li>• School/education</li>
              <li>• Medical appointments</li>
              <li>• Court-ordered treatment</li>
              <li>• Religious services</li>
              <li>• Emergency situations</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-green-200 rounded p-4 mt-4">
          <h3 className="font-semibold mb-2">📅 When Can You Apply?</h3>
          <ul className="text-sm space-y-1">
            <li>• <strong>First offense:</strong> After 10 days of revocation</li>
            <li>• <strong>Refusal:</strong> After 6 months</li>
            <li>• <strong>Prior DWI:</strong> After 45 days to 2 years (depends on history)</li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 North Carolina Ignition Interlock Requirements</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">When Interlock is Required:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>BAC ≥0.15</strong> (any offense)</li>
              <li>• <strong>Refusal</strong> to submit to test</li>
              <li>• <strong>Prior DWI conviction</strong> (any time)</li>
              <li>• <strong>Limited driving privilege</strong> (most cases)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Interlock Period:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>First offense:</strong> 1 year minimum</li>
              <li>• <strong>Second offense:</strong> 3 years minimum</li>
              <li>• <strong>Third+ offense:</strong> 7 years minimum</li>
              <li>• <strong>A1 level:</strong> Permanent (no removal)</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
          <h3 className="font-semibold mb-2">💼 Employer Vehicle Exemption</h3>
          <p className="text-sm">North Carolina allows exemption for employer-owned vehicles with written authorization and court approval. Must still install on personal vehicle.</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Civil Revocation Hearing Process</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Hearing Location:</h3>
            <div className="bg-white border border-yellow-200 rounded p-3 text-sm">
              <p><strong>Office of Administrative Hearings</strong></p>
              <p>6714 Mail Service Center</p>
              <p>Raleigh, NC 27699-6714</p>
              <p><strong>Phone:</strong> (919) 431-3000</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">What DMV Must Prove:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Valid arrest for DWI</li>
              <li>• Proper chemical test administration</li>
              <li>• BAC ≥0.08 OR refusal</li>
              <li>• Proper notice given</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-white border border-yellow-200 rounded p-4">
          <h3 className="font-semibold mb-3">💼 Legal Representation Recommended</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>With Attorney:</strong></p>
              <ul className="space-y-1">
                <li>• Can challenge evidence</li>
                <li>• Knows technical defenses</li>
                <li>• Higher success rate</li>
                <li>• Coordinates with criminal case</li>
              </ul>
            </div>
            <div>
              <p><strong>Pro Se (Self-Represented):</strong></p>
              <ul className="space-y-1">
                <li>• Complex legal procedures</li>
                <li>• Limited knowledge of defenses</li>
                <li>• Lower win rate</li>
                <li>• Risk to criminal case</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Next Steps & Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Immediate Actions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.ncdot.gov/dmv" className="text-blue-600 hover:text-blue-700 bg-red-100 px-2 py-1 rounded font-semibold">REQUEST HEARING NOW</a></li>
              <li><a href="/find-attorney/north-carolina" className="text-blue-600 hover:text-blue-700">Find NC DUI Attorney</a></li>
              <li><a href="/north-carolina/penalties" className="text-blue-600 hover:text-blue-700">NC DWI Penalties</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">North Carolina Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/north-carolina/interlock-employer-exemption" className="text-blue-600 hover:text-blue-700">Employer Exemption Process</a></li>
              <li><a href="/north-carolina/sr22-insurance" className="text-blue-600 hover:text-blue-700">NC SR-22 Insurance</a></li>
              <li><a href="/guide/requirements/interlock" className="text-blue-600 hover:text-blue-700">Ignition Interlock Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">County-Specific Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/north-carolina/mecklenburg" className="text-blue-600 hover:text-blue-700">Mecklenburg County</a></li>
              <li><a href="/north-carolina/wake" className="text-blue-600 hover:text-blue-700">Wake County</a></li>
              <li><a href="/north-carolina/guilford" className="text-blue-600 hover:text-blue-700">Guilford County</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}