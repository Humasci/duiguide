export default function HarrisCountyDMVPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-gray-700">Home</a> / 
        <a href="/texas" className="hover:text-gray-700"> Texas</a> / 
        <a href="/texas/harris" className="hover:text-gray-700"> Harris County</a> / 
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
              CRITICAL: 15-Day Deadline for ALR Hearing Request
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>You have exactly 15 days from arrest to request an Administrative License Revocation (ALR) hearing. Missing this deadline results in automatic 90-day license suspension.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Harris County DMV Hearing Request</h1>
      <p className="text-xl text-gray-600 mb-8">Request your Administrative License Revocation (ALR) hearing at the Texas DPS office serving Harris County</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6">📍 Texas DPS Office - Harris County</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Houston Mega Center</h3>
            <div className="space-y-2">
              <p><strong>📍 Address:</strong> 11450 I-45 North, Houston, TX 77060</p>
              <p><strong>📞 Phone:</strong> (281) 219-4500</p>
              <p><strong>🕐 Hours:</strong> Mon-Fri 8:00 AM - 5:00 PM</p>
              <p><strong>🅿️ Parking:</strong> Free on-site parking</p>
              <p><strong>🚌 Metro:</strong> Red Line to Northline TC</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Alternative Locations</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p><strong>Southwest Houston</strong></p>
                <p>7000 Ardmore St, Houston, TX 77054</p>
                <p>(281) 219-4700</p>
              </div>
              <div>
                <p><strong>Northwest Houston</strong></p>
                <p>15706 Northwest Fwy, Houston, TX 77040</p>
                <p>(281) 219-4600</p>
              </div>
              <div>
                <p><strong>East Houston</strong></p>
                <p>8826 Tidwell Rd, Houston, TX 77078</p>
                <p>(281) 219-4800</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📋 How to Request Your ALR Hearing</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">🌐 Online Request (Fastest)</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Website:</strong> <a href="https://www.dps.texas.gov" className="text-blue-600 hover:text-blue-700">dps.texas.gov</a></p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $125 (credit card)</p>
              <p className="text-sm mb-2"><strong>Time:</strong> Available 24/7</p>
              <p className="text-sm text-green-700"><strong>✅ Recommended:</strong> Instant confirmation</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">📞 Phone Request</h3>
            <div className="bg-white border border-blue-200 rounded p-4">
              <p className="text-sm mb-3"><strong>Phone:</strong> (512) 424-2600</p>
              <p className="text-sm mb-2"><strong>Fee:</strong> $125 (credit card)</p>
              <p className="text-sm mb-2"><strong>Hours:</strong> Mon-Fri 8 AM - 5 PM</p>
              <p className="text-sm text-yellow-700"><strong>⚠️ Busy:</strong> Long hold times</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3">📧 Mail/Fax Request (Not Recommended)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Mail Address:</strong></p>
              <p>Texas DPS ALR Program<br/>
              P.O. Box 4087<br/>
              Austin, TX 78773-0001</p>
            </div>
            <div>
              <p><strong>Fax:</strong> (512) 424-2330</p>
              <p><strong>Risk:</strong> May not arrive in time</p>
              <p><strong>Fee:</strong> $125 (money order only)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📄 Required Information for ALR Request</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">From Your DIC-25 Notice</h3>
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
                <strong>Arresting Agency</strong> (HPD, HCSO, etc.)
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <strong>Arresting Officer Name</strong>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Personal Information</h3>
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
        <h2 className="text-2xl font-semibold mb-4">⚠️ What Happens If You Miss the 15-Day Deadline?</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">Automatic Consequences:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>90-day license suspension</strong> (first offense)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>1-year suspension</strong> (if prior DUI within 10 years)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>2-year suspension</strong> (if refused breath test)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <strong>No hearing allowed</strong> - suspension is final
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">NO Exceptions For:</h3>
            <ul className="space-y-1 text-sm">
              <li>• "I didn't know about the deadline"</li>
              <li>• "I was still in jail"</li>
              <li>• "I didn't get the notice"</li>
              <li>• "My attorney said not to worry"</li>
              <li>• "The mail was delayed"</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">✅ What Happens After You Request the Hearing?</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Temporary Driving Permit</h3>
              <p className="text-gray-600 text-sm">You can drive until your hearing (usually 40-120 days)</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Hearing Notice</h3>
              <p className="text-gray-600 text-sm">DPS will mail you the hearing date and location</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Prepare Defense</h3>
              <p className="text-gray-600 text-sm">Work with attorney to challenge the suspension</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏛️ ALR Hearing Location</h2>
        
        <div className="bg-white border border-blue-200 rounded p-4">
          <h3 className="font-semibold mb-3">State Office of Administrative Hearings (SOAH)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>📍 Address:</strong> 300 W. 15th St, Austin, TX 78701</p>
              <p><strong>📞 Phone:</strong> (512) 475-4993</p>
              <p><strong>🌐 Website:</strong> <a href="https://www.soah.texas.gov" className="text-blue-600 hover:text-blue-700">soah.texas.gov</a></p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Most Harris County ALR hearings are conducted by phone or video conference. You don't usually need to travel to Austin.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💼 Should You Hire an Attorney for ALR Hearing?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-3">✅ Benefits of Attorney</h3>
            <ul className="space-y-2 text-sm">
              <li>• Subpoena arresting officer</li>
              <li>• Cross-examine witnesses</li>
              <li>• Challenge evidence</li>
              <li>• Higher win rate (~30% vs 5%)</li>
              <li>• Preview of criminal case</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Without Attorney</h3>
            <ul className="space-y-2 text-sm">
              <li>• Must represent yourself</li>
              <li>• Low success rate</li>
              <li>• Don't know legal standards</li>
              <li>• Can't subpoena witnesses</li>
              <li>• May hurt criminal case</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 Next Steps After Requesting Hearing</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Immediate Actions</h3>
            <ul className="space-y-2">
              <li><a href="/find-attorney/texas" className="text-blue-600 hover:text-blue-700">Find Experienced DUI Attorney</a></li>
              <li><a href="/texas/harris/court" className="text-blue-600 hover:text-blue-700">Understand Court Process</a></li>
              <li><a href="/guide/dmv-hearing" className="text-blue-600 hover:text-blue-700">ALR Hearing Defense Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Harris County Resources</h3>
            <ul className="space-y-2">
              <li><a href="/texas/harris/impound" className="text-blue-600 hover:text-blue-700">Get Car from Impound</a></li>
              <li><a href="/texas/harris/bail" className="text-blue-600 hover:text-blue-700">Bail Bonds Information</a></li>
              <li><a href="/texas/harris" className="text-blue-600 hover:text-blue-700">Harris County DUI Guide</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}