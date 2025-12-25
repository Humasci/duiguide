import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Scale,
  FileText,
  Calendar,
  Target
} from 'lucide-react';

async function getGoldDustData() {
  const supabase = await createClient();

  try {
    const { data: goldDust, error } = await supabase
      .from('curated_data')
      .select(`
        *,
        source:sources(
          file_name,
          file_path,
          created_at
        ),
        county:counties(
          name,
          slug,
          state:states(name, slug)
        )
      `)
      .eq('priority', 10)
      .order('gold_dust_confidence', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching Gold Dust data:', error);
      return [];
    }

    return goldDust || [];
  } catch (error) {
    console.error('Error fetching Gold Dust data:', error);
    return [];
  }
}

export default async function GoldDustPage() {
  const goldDust = await getGoldDustData();

  const getConfidenceBadge = (confidence: number | null) => {
    if (!confidence) return { label: 'Unknown', color: 'gray' };

    if (confidence >= 0.9) return { label: 'Very High', color: 'green' };
    if (confidence >= 0.7) return { label: 'High', color: 'blue' };
    if (confidence >= 0.5) return { label: 'Medium', color: 'yellow' };
    return { label: 'Low', color: 'orange' };
  };

  const getFrictionIcon = (type: string) => {
    switch (type) {
      case 'cost_anomaly':
        return <DollarSign className="h-5 w-5 text-yellow-600" />;
      case 'procedural_difference':
        return <Scale className="h-5 w-5 text-blue-600" />;
      case 'loophole':
        return <Target className="h-5 w-5 text-green-600" />;
      case 'exception':
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-yellow-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Group by county
  const goldDustByCounty = goldDust.reduce((acc, item) => {
    const countyKey = `${item.county?.state?.name || 'Unknown'} - ${item.county?.name || 'Unknown'}`;
    if (!acc[countyKey]) {
      acc[countyKey] = [];
    }
    acc[countyKey].push(item);
    return acc;
  }, {} as Record<string, typeof goldDust>);

  // Overall stats
  const avgConfidence = goldDust.length > 0
    ? Math.round((goldDust.reduce((sum, item) => sum + (item.gold_dust_confidence || 0), 0) / goldDust.length) * 100)
    : 0;

  const countiesWithGoldDust = Object.keys(goldDustByCounty).length;

  // Friction type counts
  const frictionTypes = goldDust.reduce((acc: any, item: any) => {
    const type = item.gold_dust_metadata?.friction_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-yellow-600" />
          Gold Dust Intelligence
        </h1>
        <p className="mt-1 text-gray-600">
          High-priority county-specific insights automatically detected by legal-data-factory
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Gold Dust</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{goldDust.length}</p>
            </div>
            <Sparkles className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Counties Covered</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{countiesWithGoldDust}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{avgConfidence}%</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-purple-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Common Type</p>
              <p className="text-lg font-bold text-gray-900 mt-1 capitalize">
                {(Object.entries(frictionTypes) as [string, number][]).sort((a, b) => b[1] - a[1])[0]?.[0].replace('_', ' ') || 'N/A'}
              </p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Gold Dust Items by County */}
      <div className="space-y-6">
        {(Object.entries(goldDustByCounty) as [string, any][]).map(([countyKey, items]) => (
          <Card key={countyKey} className="overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{countyKey}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {items.length} Gold Dust {items.length === 1 ? 'item' : 'items'} detected
                  </p>
                </div>
                <Sparkles className="h-10 w-10 text-yellow-600" />
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item: any, index: number) => {
                const confidence = getConfidenceBadge(item.gold_dust_confidence);
                const metadata = item.gold_dust_metadata as any;
                const frictionIcon = getFrictionIcon(metadata?.friction_type);

                return (
                  <div key={item.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-yellow-100 rounded-full">
                          {frictionIcon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Topic and Type */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
                                {item.topic}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 capitalize">
                                {metadata?.friction_type?.replace('_', ' ')}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-${confidence.color}-100 text-${confidence.color}-800`}>
                                {confidence.label} Confidence
                              </span>
                            </div>

                            {/* Key Insight */}
                            <div className="mb-3">
                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                💎 {metadata?.key_insight || 'No insight provided'}
                              </h3>
                            </div>

                            {/* Reasons */}
                            {metadata?.reasons && metadata.reasons.length > 0 && (
                              <div className="mb-3">
                                <p className="text-sm font-semibold text-gray-700 mb-1">Why This Matters:</p>
                                <ul className="list-disc list-inside space-y-1">
                                  {metadata.reasons.map((reason: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-600">{reason}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Extracted Data Preview */}
                            {item.extracted_data && (
                              <details className="mt-3">
                                <summary className="text-sm font-semibold text-gray-700 cursor-pointer hover:text-gray-900">
                                  View Extracted Data
                                </summary>
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                                  {JSON.stringify(item.extracted_data, null, 2)}
                                </pre>
                              </details>
                            )}

                            {/* Source Info */}
                            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {item.source?.file_name || 'Unknown source'}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Detected {formatDate(item.created_at)}
                              </div>
                              {item.gold_dust_confidence && (
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  {Math.round(item.gold_dust_confidence * 100)}% confidence
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {goldDust.length === 0 && (
        <Card className="p-12 text-center">
          <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Gold Dust Detected Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Gold Dust intelligence will appear here when legal-data-factory detects county-specific
            friction points, loopholes, exceptions, or cost anomalies in research documents.
          </p>
        </Card>
      )}
    </div>
  );
}
