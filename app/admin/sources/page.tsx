import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import {
  Link as LinkIcon,
  ExternalLink,
  Calendar,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';

async function getCountySources() {
  const supabase = await createClient();

  try {
    const { data: sources, error } = await supabase
      .from('county_sources')
      .select(`
        *,
        county:counties(
          name,
          slug,
          state:states(name, slug)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('Error fetching county sources:', error);
      return [];
    }

    return sources || [];
  } catch (error) {
    console.error('Error fetching county sources:', error);
    return [];
  }
}

export default async function CountySourcesPage() {
  const sources = await getCountySources();

  // Group by county
  const sourcesByCounty = sources.reduce((acc, source) => {
    const countyKey = `${source.county?.state?.name || 'Unknown'} - ${source.county?.name || 'Unknown'}`;
    if (!acc[countyKey]) {
      acc[countyKey] = {
        state: source.county?.state,
        county: source.county,
        sources: []
      };
    }
    acc[countyKey].sources.push(source);
    return acc;
  }, {} as Record<string, { state: any; county: any; sources: typeof sources }>);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSourceTypeBadge = (type: string | null) => {
    if (!type) return { label: 'Unknown', color: 'gray' };

    const types: Record<string, { label: string; color: string }> = {
      bench_book: { label: 'Bench Book', color: 'blue' },
      dmv_guide: { label: 'DMV Guide', color: 'green' },
      enforcement_manual: { label: 'Enforcement Manual', color: 'purple' },
      court_website: { label: 'Court Website', color: 'indigo' },
      county_policy: { label: 'County Policy', color: 'yellow' },
      statute: { label: 'Statute', color: 'red' },
      other: { label: 'Other', color: 'gray' },
    };

    return types[type] || { label: type, color: 'gray' };
  };

  const totalSources = sources.length;
  const activeSources = sources.filter(s => s.is_active).length;
  const inactiveSources = totalSources - activeSources;
  const countiesCovered = Object.keys(sourcesByCounty).length;

  // Topic counts
  const topicCounts = sources.reduce((acc, source) => {
    const topic = source.topic || 'unknown';
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <LinkIcon className="h-8 w-8 text-purple-600" />
          County Sources
        </h1>
        <p className="mt-1 text-gray-600">
          URLs and research links stored as county-level intelligence assets
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-l-4 border-purple-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sources</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalSources}</p>
            </div>
            <LinkIcon className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active URLs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeSources}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive URLs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{inactiveSources}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Counties Covered</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{countiesCovered}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Sources by County */}
      <div className="space-y-6">
        {(Object.entries(sourcesByCounty) as [string, any][]).map(([countyKey, data]) => (
          <Card key={countyKey} className="overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{countyKey}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {data.sources.length} source{data.sources.length === 1 ? '' : 's'} •{' '}
                    {data.sources.filter((s: any) => s.is_active).length} active
                  </p>
                </div>
                <LinkIcon className="h-10 w-10 text-purple-600" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Last Checked
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.sources.map((source: any) => {
                    const sourceType = getSourceTypeBadge(source.source_type);

                    return (
                      <tr key={source.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            <LinkIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="text-sm text-gray-900 truncate max-w-md">
                                {source.url}
                              </div>
                              <div className="text-xs text-gray-500 font-mono mt-1">
                                Hash: {source.url_hash?.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-${sourceType.color}-100 text-${sourceType.color}-800`}>
                            {sourceType.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 capitalize">
                            {source.topic || '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {source.is_active ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600">
                              <XCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Inactive</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(source.last_checked)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Visit
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>

      {sources.length === 0 && (
        <Card className="p-12 text-center">
          <LinkIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No County Sources Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            URLs will appear here when legal-data-factory processes research documents containing links.
            These become reusable research assets for autonomous data collection.
          </p>
        </Card>
      )}
    </div>
  );
}
