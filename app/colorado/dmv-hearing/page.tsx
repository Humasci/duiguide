export default function ColoradoDMVHearingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/colorado" className="hover:text-gray-700"> Colorado</a> / 
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
              CRITICAL: You Have Only 7 Days to Request an Express Consent Hearing
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Colorado has the shortest deadline in the US. Missing this 7-day deadline results in automatic 3-month license revocation with NO exceptions.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Colorado DMV Hearing - Express Consent Revocation</h1>
      <p className="text-xl text-gray-600 mb-8">Request your Colorado Express Consent hearing within 7 days to avoid automatic license revocation</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">⏱️ Critical Timeline for Colorado DUI</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 1</div>
            <div>
              <h3 className="font-semibold text-lg">DUI Arrest - Clock Starts Ticking</h3>
              <p className="text-gray-600">Officer gives you Express Consent Affidavit and Notice of Revocation</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 7</div>
            <div>
              <h3 className="font-semibold text-lg">DEADLINE - Last Day to Request Hearing</h3>
              <p className="text-gray-600">Must be postmarked or received by Colorado DMV by end of 7th day</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mr-4">DAY 8</div>
            <div>
              <h3 className="font-semibold text-lg">TOO LATE - No Hearing Allowed</h3>
              <p className="text-gray-600">Automatic 3-month revocation begins, no exceptions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 How to Request Your Colorado Express Consent Hearing</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">🌐 Online Request (Fastest - Recommended)</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Website:</strong> <a href="https://mydmv.colorado.gov" className="text-blue-600 hover:text-blue-700">mydmv.colorado.gov</a></p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $95 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Time:</strong> Available 24/7</p>
              <p className="text-sm text-green-700"><strong>✅ Instant confirmation</strong> with receipt</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-blue-800">📞 Phone Request</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Phone:</strong> (303) 205-5613</p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $95 (credit/debit card)</p>
              <p className="text-sm mb-2"><strong>Hours:</strong> Mon-Fri 8 AM - 5 PM</p>
              <p className="text-sm text-yellow-700"><strong>⚠️ Risk:</strong> Busy lines, limited hours</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3 text-blue-800">📧 Mail Request (NOT Recommended - Risky)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Address:</strong><br/>
              Colorado Division of Motor Vehicles<br/>
              Express Consent Unit<br/>
              1881 Pierce St, Room 142<br/>
              Lakewood, CO 80214</p>
            </div>
            <div>
              <p><strong>⚠️ DANGER:</strong> Must be <strong>postmarked</strong> by day 7</p>
              <p><strong>Fee:</strong> $95 (money order or cashier's check only)</p>
              <p><strong>Form:</strong> DR 2870 (Express Consent Hearing Request)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 Information Needed for Hearing Request</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">From Your Express Consent Notice:</h3>
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
                <strong>Arresting Agency</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Officer Name/Badge Number</strong>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Incident Report Number</strong>
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
        <h2 className="text-2xl font-semibold mb-4">⚠️ Colorado Express Consent Consequences</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-800 mb-3">If You Miss the 7-Day Deadline:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Automatic 3-month revocation</strong> (first offense)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>6-month revocation</strong> (if prior DUI in 7 years)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>12-month revocation</strong> (refusal or 3rd+ offense)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>NO hearing allowed</strong> - decision is final
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>NO exceptions</strong> for any reason
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-800 mb-3">Additional Consequences:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>PDD designation</strong> if BAC ≥0.15 or refusal
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Ignition interlock required</strong> for reinstatement
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>SR-22 insurance filing</strong> required
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>Reinstatement fees</strong> and additional requirements
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">✅ What Happens After You Request the Hearing</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Temporary Permit Extended</h3>
              <p className="text-gray-600 text-sm">Your temporary permit remains valid until the hearing decision</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Hearing Scheduled</h3>
              <p className="text-gray-600 text-sm">DMV schedules hearing within 60 days (usually sooner)</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Notice Mailed</h3>
              <p className="text-gray-600 text-sm">Hearing officer, date, time, and location sent by mail</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</div>
            <div>
              <h3 className="font-semibold">Prepare Defense</h3>
              <p className="text-gray-600 text-sm">Work with attorney to challenge the revocation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ Colorado Express Consent Hearing Process</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Hearing Location:</h3>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm">
              <p><strong>Colorado Department of Revenue</strong></p>
              <p>1881 Pierce Street</p>
              <p>Lakewood, CO 80214</p>
              <p><strong>Phone:</strong> (303) 205-5613</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">What DMV Must Prove:</h3>
            <ul className="space-y-2 text-sm">
              <li>• You were driving or in actual physical control</li>
              <li>• Officer had probable cause for arrest</li>
              <li>• You were under the influence OR BAC ≥0.08</li>
              <li>• Proper advisement given (if breath test refused)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3">💼 Should You Hire an Attorney?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Benefits:</strong></p>
              <ul className="space-y-1">
                <li>• Higher success rate</li>
                <li>• Can subpoena officer/records</li>
                <li>• Knows technical defenses</li>
                <li>• Preview of criminal case</li>
              </ul>
            </div>
            <div>
              <p><strong>Without Attorney:</strong></p>
              <ul className="space-y-1">
                <li>• Must represent yourself</li>
                <li>• Lower win rate</li>
                <li>• Complex legal standards</li>
                <li>• Limited subpoena power</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🎯 Colorado PDD (Persistent Drunk Driver) Designation</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">PDD Triggers:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>BAC ≥0.15</strong> (first offense)</li>
              <li>• <strong>Refusal</strong> to take chemical test</li>
              <li>• <strong>Prior DUI conviction</strong> in any state</li>
              <li>• <strong>DWAI conviction</strong> within 5 years</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">PDD Consequences:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Ignition interlock required</strong> for 2+ years</li>
              <li>• <strong>Level II alcohol education</strong> (minimum)</li>
              <li>• <strong>SR-22 insurance</strong> for 3 years</li>
              <li>• <strong>Early reinstatement possible</strong> with interlock</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚗 Early Reinstatement Options</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Ignition Interlock Early Reinstatement:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Available after <strong>1 month</strong> of revocation</li>
              <li>• Must install approved interlock device</li>
              <li>• SR-22 insurance required</li>
              <li>• Complete alcohol education</li>
              <li>• Pay all reinstatement fees</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Work/Medical Permits:</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Limited driving permit</strong> available</li>
              <li>• Work, school, medical appointments</li>
              <li>• Must show necessity</li>
              <li>• Interlock may be required</li>
              <li>• Additional fees apply</li>
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
              <li><a href="https://mydmv.colorado.gov" className="text-blue-600 hover:text-blue-700 bg-red-100 px-2 py-1 rounded font-semibold">REQUEST HEARING NOW</a></li>
              <li><a href="/find-attorney/colorado" className="text-blue-600 hover:text-blue-700">Find Colorado DUI Attorney</a></li>
              <li><a href="/colorado/penalties" className="text-blue-600 hover:text-blue-700">Colorado DUI Penalties</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Colorado Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/colorado/interlock-employer-exemption" className="text-blue-600 hover:text-blue-700">Employer Interlock Exemption</a></li>
              <li><a href="/colorado/sr22-insurance" className="text-blue-600 hover:text-blue-700">Colorado SR-22 Insurance</a></li>
              <li><a href="/guide/requirements/interlock" className="text-blue-600 hover:text-blue-700">Ignition Interlock Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">County-Specific Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/colorado/denver" className="text-blue-600 hover:text-blue-700">Denver County</a></li>
              <li><a href="/colorado/el-paso" className="text-blue-600 hover:text-blue-700">El Paso County</a></li>
              <li><a href="/colorado/jefferson" className="text-blue-600 hover:text-blue-700">Jefferson County</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}