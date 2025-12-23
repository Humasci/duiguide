export default function TexasDMVHearingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/texas" className="hover:text-gray-700"> Texas</a> / 
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
              URGENT: You Have 15 Days to Request an ALR Hearing
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Texas Administrative License Revocation (ALR) hearings must be requested within 15 days. Missing this deadline results in automatic 90-day license suspension.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Texas DMV Hearing - Administrative License Revocation (ALR)</h1>
      <p className="text-xl text-gray-600 mb-8">Request your Texas ALR hearing within 15 days to avoid automatic license suspension and protect your driving privileges</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">⏱️ Critical Timeline for Texas DWI</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 1</div>
            <div>
              <h3 className="font-semibold text-lg">DWI Arrest - Clock Starts</h3>
              <p className="text-gray-600">Officer issues DIC-25 notice and temporary driving permit</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 15</div>
            <div>
              <h3 className="font-semibold text-lg">DEADLINE - Request ALR Hearing</h3>
              <p className="text-gray-600">Must be postmarked or received by Texas DPS within 15 days</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 16</div>
            <div>
              <h3 className="font-semibold text-lg">TOO LATE - Automatic Suspension</h3>
              <p className="text-gray-600">90-day suspension begins (or longer for repeat offenses)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 How to Request Your Texas ALR Hearing</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">🌐 Online Request (Fastest - Recommended)</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Website:</strong> <a href="https://www.dps.texas.gov" className="text-blue-600 hover:text-blue-700">dps.texas.gov</a></p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $125 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Time:</strong> Available 24/7</p>
              <p className="text-sm text-green-700"><strong>✅ Instant confirmation</strong> with receipt number</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">📞 Phone Request</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Phone:</strong> (512) 424-2600</p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $125 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Hours:</strong> Mon-Fri 8 AM - 5 PM</p>
              <p className="text-sm text-yellow-700"><strong>⚠️ Often busy</strong> - long hold times</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3 text-blue-800">📧 Mail/Fax Request (NOT Recommended - Risky)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Address:</strong><br/>
              Texas Department of Public Safety<br/>
              ALR Program<br/>
              P.O. Box 4087<br/>
              Austin, TX 78773-0001</p>
            </div>
            <div>
              <p><strong>Fax:</strong> (512) 424-2330</p>
              <p><strong>⚠️ DANGER:</strong> Must be postmarked by day 15</p>
              <p><strong>Fee:</strong> $125 (money order only)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 Information Needed for ALR Hearing Request</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">From Your DIC-25 Notice:</h3>
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
                <strong>Arresting Officer Name</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Arresting Agency</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>County of Arrest</strong>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Personal Information:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Full Legal Name</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Current Mailing Address</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Date of Birth</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Daytime Phone Number</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚠️ Texas ALR Suspension Periods</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Suspension Period</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">1st DWI (0.08+)</td>
                <td className="px-4 py-3 text-sm text-blue-900">90 days</td>
                <td className="px-4 py-3 text-sm">Can get occupational license after 30 days</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">1st Refusal</td>
                <td className="px-4 py-3 text-sm text-red-600">180 days</td>
                <td className="px-4 py-3 text-sm">No occupational license available</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Prior DWI within 10 years</td>
                <td className="px-4 py-3 text-sm text-red-600">1 year</td>
                <td className="px-4 py-3 text-sm">Can get occupational license after 90 days</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold">Prior DWI + Refusal</td>
                <td className="px-4 py-3 text-sm text-red-600">2 years</td>
                <td className="px-4 py-3 text-sm">Can get occupational license after 1 year</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Under 21 (any BAC)</td>
                <td className="px-4 py-3 text-sm text-yellow-600">60-120 days</td>
                <td className="px-4 py-3 text-sm">Varies by BAC level and prior offenses</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">✅ What Happens After You Request the Hearing</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Temporary Permit Extended</h3>
              <p className="text-gray-600 text-sm">Your temporary driving permit stays valid until hearing decision</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Hearing Scheduled</h3>
              <p className="text-gray-600 text-sm">DPS schedules hearing within 120 days (usually 60-90 days)</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Notice Sent</h3>
              <p className="text-gray-600 text-sm">Hearing date, time, and Administrative Law Judge assigned</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</div>
            <div>
              <h3 className="font-semibold">Prepare Defense</h3>
              <p className="text-gray-600 text-sm">Attorney can subpoena officer and challenge evidence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Texas ALR Hearing Process</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Hearing Location:</h3>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm">
              <p><strong>State Office of Administrative Hearings (SOAH)</strong></p>
              <p>300 W. 15th Street</p>
              <p>Austin, TX 78701</p>
              <p><strong>Phone:</strong> (512) 475-4993</p>
              <p className="mt-2 text-blue-600">Most hearings conducted by phone</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">What DPS Must Prove:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Reasonable suspicion for stop</li>
              <li>• Probable cause for arrest</li>
              <li>• You were intoxicated OR BAC ≥0.08</li>
              <li>• Proper warnings given (if breath test refusal)</li>
              <li>• Proper test administration</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3">💼 Attorney Representation Highly Recommended</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Benefits of Attorney:</strong></p>
              <ul className="space-y-1">
                <li>• Higher win rate (~30% vs 5% pro se)</li>
                <li>• Can subpoena officer and records</li>
                <li>• Knows technical defenses</li>
                <li>• Protects your criminal case</li>
                <li>• Cross-examines witnesses effectively</li>
              </ul>
            </div>
            <div>
              <p><strong>Without Attorney:</strong></p>
              <ul className="space-y-1">
                <li>• Very low success rate</li>
                <li>• Complex legal procedures</li>
                <li>• Can&apos;t effectively cross-examine</li>
                <li>• May hurt criminal case</li>
                <li>• Don&apos;t know admissibility rules</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚗 Texas Occupational Driver License</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-yellow-800 mb-3">Eligibility:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Essential need (work, school, medical)</li>
              <li>• Complete DWI education program</li>
              <li>• File SR-22 insurance</li>
              <li>• Install ignition interlock (if required)</li>
              <li>• Pay court/DPS fees</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800 mb-3">Waiting Period:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>1st DWI (0.08+):</strong> After 30 days</li>
              <li>• <strong>1st Refusal:</strong> Not eligible</li>
              <li>• <strong>2nd+ DWI:</strong> After 90 days</li>
              <li>• <strong>Under 21:</strong> After suspension period</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white border border-yellow-200 rounded p-4 mt-4">
          <h3 className="font-semibold mb-2">🔒 Ignition Interlock Requirements</h3>
          <ul className="text-sm space-y-1">
            <li>• Required for occupational license if BAC ≥0.15</li>
            <li>• Required for 2nd+ DWI occupational license</li>
            <li>• Must be installed on ALL vehicles you operate</li>
            <li>• Employer exemption available with proper documentation</li>
          </ul>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">⚖️ Common ALR Hearing Defenses</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Technical Defenses:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>No reasonable suspicion</strong> for traffic stop</li>
              <li>• <strong>No probable cause</strong> for DWI arrest</li>
              <li>• <strong>Improper breath test</strong> administration</li>
              <li>• <strong>Machine calibration</strong> issues</li>
              <li>• <strong>Chain of custody</strong> problems (blood test)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Procedural Defenses:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Improper warnings</strong> given</li>
              <li>• <strong>Officer not qualified</strong> to administer test</li>
              <li>• <strong>15-minute observation period</strong> not followed</li>
              <li>• <strong>Medical conditions</strong> affecting BAC</li>
              <li>• <strong>Rising blood alcohol</strong> defense</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 Texas DWI vs. ALR: Two Separate Tracks</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-3">ALR Hearing (Civil/DMV)</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Purpose:</strong> Keep your license</li>
              <li>• <strong>Deadline:</strong> 15 days to request</li>
              <li>• <strong>Standard:</strong> Preponderance of evidence</li>
              <li>• <strong>Judge:</strong> Administrative Law Judge</li>
              <li>• <strong>Penalty:</strong> License suspension only</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-3">Criminal DWI Case (Court)</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Purpose:</strong> Avoid criminal conviction</li>
              <li>• <strong>Deadline:</strong> Various court dates</li>
              <li>• <strong>Standard:</strong> Beyond reasonable doubt</li>
              <li>• <strong>Judge:</strong> District/County Court Judge</li>
              <li>• <strong>Penalty:</strong> Jail, fines, probation, MORE suspension</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Next Steps & Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Immediate Actions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.dps.texas.gov" className="text-blue-600 hover:text-blue-700 bg-red-100 px-2 py-1 rounded font-semibold">REQUEST ALR HEARING NOW</a></li>
              <li><a href="/find-attorney/texas" className="text-blue-600 hover:text-blue-700">Find Texas DWI Attorney</a></li>
              <li><a href="/texas/penalties" className="text-blue-600 hover:text-blue-700">Texas DWI Penalties</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Texas Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/texas/interlock-employer-exemption" className="text-blue-600 hover:text-blue-700">Employer Exemption Form</a></li>
              <li><a href="/texas/sr22-insurance" className="text-blue-600 hover:text-blue-700">Texas SR-22 Insurance</a></li>
              <li><a href="/texas/jp-precinct-locator" className="text-blue-600 hover:text-blue-700">JP Precinct Locator (Towing)</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">County-Specific Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/texas/harris" className="text-blue-600 hover:text-blue-700">Harris County (Houston)</a></li>
              <li><a href="/texas/dallas" className="text-blue-600 hover:text-blue-700">Dallas County</a></li>
              <li><a href="/texas/tarrant" className="text-blue-600 hover:text-blue-700">Tarrant County (Fort Worth)</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}