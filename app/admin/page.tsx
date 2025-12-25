import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import {
  FileText,
  MapPin,
  Sparkles,
  Link as LinkIcon,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

async function getDashboardStats() {
  const supabase = await createClient();

  try {
    // Get processing stats
    const { count: totalSources } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true });

    const { count: completedSources } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'completed');

    const { count: processingSources } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'processing');

    const { count: errorSources } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true })
      .eq('processing_status', 'error');

    // Get coverage stats
    const { count: totalCounties } = await supabase
      .from('counties')
      .select('*', { count: 'exact', head: true });

    const { count: countiesWithData } = await supabase
      .from('counties')
      .select('*', { count: 'exact', head: true })
      .not('impound_daily_fee', 'is', null);

    // Get Gold Dust stats
    const { count: goldDustCount } = await supabase
      .from('curated_data')
      .select('*', { count: 'exact', head: true })
      .eq('priority', 10);

    // Get county sources stats
    const { count: countySources } = await supabase
      .from('county_sources')
      .select('*', { count: 'exact', head: true });

    const { count: activeSources } = await supabase
      .from('county_sources')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    return {
      sources: {
        total: totalSources || 0,
        completed: completedSources || 0,
        processing: processingSources || 0,
        error: errorSources || 0,
      },
      coverage: {
        total: totalCounties || 0,
        withData: countiesWithData || 0,
      },
      goldDust: goldDustCount || 0,
      countySources: {
        total: countySources || 0,
        active: activeSources || 0,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      sources: { total: 0, completed: 0, processing: 0, error: 0 },
      coverage: { total: 0, withData: 0 },
      goldDust: 0,
      countySources: { total: 0, active: 0 },
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const completionRate = stats.sources.total > 0
    ? Math.round((stats.sources.completed / stats.sources.total) * 100)
    : 0;

  const coverageRate = stats.coverage.total > 0
    ? Math.round((stats.coverage.withData / stats.coverage.total) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Overview of legal-data-factory processing and DUIarrested.com content status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Processing Status */}
        <Link href="/admin/processing">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sources</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.sources.total}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.sources.completed} completed
                </p>
              </div>
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            {stats.sources.processing > 0 && (
              <div className="mt-4 flex items-center gap-2 text-sm text-orange-600">
                <Clock className="h-4 w-4" />
                {stats.sources.processing} processing
              </div>
            )}
            {stats.sources.error > 0 && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertTriangle className="h-4 w-4" />
                {stats.sources.error} errors
              </div>
            )}
          </Card>
        </Link>

        {/* Coverage Map */}
        <Link href="/admin/coverage">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">County Coverage</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{coverageRate}%</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.coverage.withData} of {stats.coverage.total} counties
                </p>
              </div>
              <MapPin className="h-10 w-10 text-green-600" />
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${coverageRate}%` }}
              />
            </div>
          </Card>
        </Link>

        {/* Gold Dust */}
        <Link href="/admin/gold-dust">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gold Dust Intel</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.goldDust}</p>
                <p className="text-sm text-gray-500 mt-1">High-priority findings</p>
              </div>
              <Sparkles className="h-10 w-10 text-yellow-600" />
            </div>
            {stats.goldDust > 0 && (
              <div className="mt-4 flex items-center gap-2 text-sm text-yellow-700">
                <TrendingUp className="h-4 w-4" />
                Priority insights detected
              </div>
            )}
          </Card>
        </Link>

        {/* County Sources */}
        <Link href="/admin/sources">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">County Sources</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.countySources.total}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.countySources.active} active URLs
                </p>
              </div>
              <LinkIcon className="h-10 w-10 text-purple-600" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Processing Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Processing Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Completed</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {stats.sources.completed}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-700">Processing</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {stats.sources.processing}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-gray-700">Errors</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {stats.sources.error}
              </span>
            </div>
          </div>

          {stats.sources.total > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">
                Completion Rate: {completionRate}%
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link
              href="/admin/processing"
              className="block p-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">View Processing Status</div>
                  <div className="text-xs text-gray-500">See all uploaded files and their status</div>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/coverage"
              className="block p-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Coverage Map</div>
                  <div className="text-xs text-gray-500">See which counties have complete data</div>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/gold-dust"
              className="block p-3 rounded-lg hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Gold Dust Intelligence</div>
                  <div className="text-xs text-gray-500">High-priority county insights</div>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/sources"
              className="block p-3 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">County Sources</div>
                  <div className="text-xs text-gray-500">Manage stored URLs and research links</div>
                </div>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
