import ImpoundCostCalculator from '@/components/ImpoundCostCalculator';
import PenaltyMatrix from '@/components/PenaltyMatrix';
import CrisisGrid from '@/components/CrisisGrid';

// Mock data for testing
const mockCounty = {
  name: 'Harris County',
  state_name: 'Texas',
  impound_daily_fee: 45,
  impound_admin_fee: 150,
  impound_lot_name: 'Harris County Auto Pound',
  impound_lot_address: '123 Main St, Houston, TX 77002',
  impound_release_hours: 'Mon-Fri 8AM-5PM',
  impound_payment_methods: 'Cash, Credit Card, Money Order',
};

const mockState = {
  name: 'Texas',
  legal_term: 'DWI',
  first_offense_penalties: {
    jail_time: '3-180 days',
    fines: '$300-$2,000',
    license_suspension: '90 days - 1 year',
    iid_required: 'Up to 1 year',
    probation: 'Up to 2 years',
    community_service: '24-100 hours',
    alcohol_education: 'Required (12-32 hours)',
  },
  second_offense_penalties: {
    jail_time: '30 days - 1 year',
    fines: '$600-$4,000',
    license_suspension: '180 days - 2 years',
    iid_required: '1-2 years (mandatory)',
    probation: 'Up to 2 years',
    community_service: '80-200 hours',
    alcohol_education: 'Required (32+ hours)',
  },
  third_offense_penalties: {
    jail_time: '2-10 years (felony)',
    fines: '$2,000-$10,000',
    license_suspension: '2-10 years',
    iid_required: '2+ years (mandatory)',
    probation: '3-10 years',
    community_service: '160-600 hours',
    alcohol_education: 'Required + treatment program',
  },
};

export default function TestComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Component Testing Page
          </h1>
          <p className="text-gray-600">
            Testing ImpoundCostCalculator, PenaltyMatrix, and CrisisGrid components
          </p>
        </div>

        <hr className="border-gray-300" />

        {/* Crisis Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Crisis Grid Component</h2>
          <CrisisGrid
            stateSlug="texas"
            countySlug="harris"
            countyName="Harris County"
            dmvDeadlineDays={10}
          />
        </section>

        <hr className="border-gray-300" />

        {/* Impound Calculator */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Impound Cost Calculator</h2>
          <ImpoundCostCalculator county={mockCounty} />
        </section>

        <hr className="border-gray-300" />

        {/* Penalty Matrix */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Penalty Matrix Component</h2>
          <PenaltyMatrix state={mockState} />
        </section>
      </div>
    </div>
  );
}
