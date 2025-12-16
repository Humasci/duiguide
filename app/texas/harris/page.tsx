export default function HarrisCountyPage() {
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
              URGENT: You Have 15 Days to Request a DMV Hearing
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Failure to request an Administrative License Revocation (ALR) hearing within 15 days will result in automatic license suspension.</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Harris County DUI Guide</h1>
      <p className="text-xl text-gray-600 mb-8">Complete guide to DUI process, impound, bail, and court information for Harris County, Texas</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🚗 Get Your Car Out of Impound</h2>
          <p className="text-gray-600 mb-4">Your vehicle may be impounded after a DUI arrest. Learn about Harris County impound lots, fees, and release procedures.</p>
          <a href="/texas/harris/impound" className="text-blue-600 hover:text-blue-700 font-medium">View Impound Information →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚖️ Bail Bonds & Release</h2>
          <p className="text-gray-600 mb-4">Information about Harris County Jail, bail amounts, and bondsmen serving the Houston area.</p>
          <a href="/texas/harris/bail" className="text-blue-600 hover:text-blue-700 font-medium">View Bail Information →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🏛️ Court Information</h2>
          <p className="text-gray-600 mb-4">Harris County court details, DUI court process, and what to expect at your hearings.</p>
          <a href="/texas/harris/court" className="text-blue-600 hover:text-blue-700 font-medium">View Court Information →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 DMV Hearing Request</h2>
          <p className="text-gray-600 mb-4">Request your ALR hearing at the Texas DPS office serving Harris County.</p>
          <a href="/texas/harris/dmv" className="text-blue-600 hover:text-blue-700 font-medium">View DMV Information →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔒 Ignition Interlock</h2>
          <p className="text-gray-600 mb-4">Find approved ignition interlock installers in Harris County and understand Texas requirements.</p>
          <a href="/texas/harris/interlock" className="text-blue-600 hover:text-blue-700 font-medium">View Interlock Information →</a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📱 SCRAM Monitoring</h2>
          <p className="text-gray-600 mb-4">SCRAM bracelet providers serving Harris County and Houston metro area.</p>
          <a href="/texas/harris/scram" className="text-blue-600 hover:text-blue-700 font-medium">View SCRAM Information →</a>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">💼 Need Legal Representation?</h2>
        <p className="text-gray-700 mb-4">Connect with experienced DUI attorneys serving Harris County who understand local courts and procedures.</p>
        <a href="/find-attorney/texas" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Find a Harris County DUI Attorney</a>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Harris County DUI Process Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">1</div>
            <div>
              <h3 className="font-semibold">Hours 0-24: Arrest & Booking</h3>
              <p className="text-gray-600">Booked at Harris County Jail, vehicle potentially impounded</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">2</div>
            <div>
              <h3 className="font-semibold">Days 1-15: Critical Window</h3>
              <p className="text-gray-600">Request ALR hearing with Texas DPS, get car from impound</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">3</div>
            <div>
              <h3 className="font-semibold">Weeks 2-12: Pre-Trial</h3>
              <p className="text-gray-600">Build defense, negotiate plea, prepare for trial</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">4</div>
            <div>
              <h3 className="font-semibold">Months 3-6: Resolution</h3>
              <p className="text-gray-600">Trial or plea agreement, sentencing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}