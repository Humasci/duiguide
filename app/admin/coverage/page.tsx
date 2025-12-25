import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock
} from 'lucide-react';

async function getCoverageData() {
  const supabase = await createClient();

  try {
    const { data: counties, error } = await supabase
      .from('counties')
      .select(`
        *,
        state:states(name, slug, legal_term)
      `)
      .order('state_id', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching counties:', error);
      return [];
    }

    return counties || [];
  } catch (error) {
    console.error('Error fetching counties:', error);
    return [];
  }
}

export default async function CoverageMapPage() {
  const counties = await getCoverageData();

  // Group counties by state
  const countiesByState = counties.reduce((acc, county) => {
    const stateName = county.state?.name || 'Unknown';
    if (!acc[stateName]) {
      acc[stateName] = [];
    }
    acc[stateName].push(county);
    return acc;
  }, {} as Record<string, typeof counties>);

  // Calculate completeness for each county
  const getCompletenessScore = (county: typeof counties[0]) => {
    let score = 0;
    let total = 0;

    // Core fields
    const coreFields = [
      'impound_daily_fee',
      'impound_admin_fee',
      'court_name',
      'court_address',
      'typical_bail_range_min',
      'typical_bail_range_max',
    ];

    coreFields.forEach(field => {
      total++;
      if (county[field as keyof typeof county] !== null && county[field as keyof typeof county] !== undefined) {
        score++;
      }
    });

    return { score, total, percentage: Math.round((score / total) * 100) };
  };

  const getCompletenessStatus = (percentage: number) => {
    if (percentage >= 80) return { label: 'Complete', color: 'green', icon: CheckCircle };
    if (percentage >= 50) return { label: 'Partial', color: 'orange', icon: AlertTriangle };
    if (percentage >= 20) return { label: 'Minimal', color: 'yellow', icon: Clock };
    return { label: 'Missing', color: 'red', icon: XCircle };
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString();
  };

  // Overall stats
  const totalCounties = counties.length;
  const completeCounties = counties.filter(c => getCompletenessScore(c).percentage >= 80).length;
  const partialCounties = counties.filter(c => {
    const pct = getCompletenessScore(c).percentage;
    return pct >= 50 && pct < 80;
  }).length;
  const missingCounties = counties.filter(c => getCompletenessScore(c).percentage < 50).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">County Coverage Map</h1>
        <p className="mt-1 text-gray-600">
          Track which counties have complete data across all states
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Counties</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalCounties}</p>
            </div>
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Complete</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{completeCounties}</p>
              <p className="text-xs text-gray-500 mt-1">≥80% data</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-orange-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Partial</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{partialCounties}</p>
              <p className="text-xs text-gray-500 mt-1">50-79% data</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Missing</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{missingCounties}</p>
              <p className="text-xs text-gray-500 mt-1">&lt;50% data</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Coverage by State */}
      <div className="space-y-6">
        {(Object.entries(countiesByState) as [string, any][]).map(([stateName, stateCounties]) => {
          const stateComplete = stateCounties.filter((c: any) => getCompletenessScore(c).percentage >= 80).length;
          const stateTotal = stateCounties.length;
          const statePercentage = Math.round((stateComplete / stateTotal) * 100);

          return (
            <Card key={stateName} className="overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{stateName}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {stateComplete} of {stateTotal} counties complete ({statePercentage}%)
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-900">{statePercentage}%</div>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${statePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        County
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Completeness
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Last Verified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Missing Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stateCounties.map((county: any) => {
                      const completeness = getCompletenessScore(county);
                      const status = getCompletenessStatus(completeness.percentage);
                      const StatusIcon = status.icon;

                      const missingFields = [];
                      if (!county.impound_daily_fee) missingFields.push('Impound fees');
                      if (!county.court_name) missingFields.push('Court info');
                      if (!county.typical_bail_range_min) missingFields.push('Bail range');

                      return (
                        <tr key={county.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {county.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              /{county.state?.slug}/{county.slug}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <StatusIcon className={`h-5 w-5 text-${status.color}-600`} />
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-${status.color}-100 text-${status.color}-800`}>
                                {status.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">
                                  {completeness.percentage}%
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div
                                    className={`bg-${status.color}-600 h-2 rounded-full transition-all`}
                                    style={{ width: `${completeness.percentage}%` }}
                                  />
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">
                                {completeness.score}/{completeness.total}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(county.last_verified_at)}
                          </td>
                          <td className="px-6 py-4">
                            {missingFields.length > 0 ? (
                              <div className="text-xs text-red-600">
                                {missingFields.join(', ')}
                              </div>
                            ) : (
                              <div className="text-xs text-green-600">
                                ✓ All core data present
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>

      {counties.length === 0 && (
        <Card className="p-12 text-center">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Counties Found</h3>
          <p className="text-gray-500">
            Counties will appear here once they are added to the database
          </p>
        </Card>
      )}
    </div>
  );
}
