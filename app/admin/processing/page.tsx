import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar
} from 'lucide-react';

async function getProcessingSources() {
  const supabase = await createClient();

  try {
    const { data: sources, error } = await supabase
      .from('sources')
      .select(`
        *,
        state:states(name, slug),
        county:counties(name, slug)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching sources:', error);
      return [];
    }

    return sources || [];
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
}

export default async function ProcessingStatusPage() {
  const sources = await getProcessingSources();

  const statusCounts = {
    pending: sources.filter(s => s.processing_status === 'pending').length,
    processing: sources.filter(s => s.processing_status === 'processing').length,
    completed: sources.filter(s => s.processing_status === 'completed').length,
    error: sources.filter(s => s.processing_status === 'error').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-orange-600 animate-spin" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800',
      processing: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status as keyof typeof colors] || colors.pending}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Processing Status</h1>
        <p className="mt-1 text-gray-600">
          Files uploaded to legal-data-factory and their processing status
        </p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-l-4 border-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.pending}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-orange-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.processing}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.error}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Sources Table */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Recent Sources</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Multi-Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No sources found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Upload research files to legal-data-factory to see them here
                    </p>
                  </td>
                </tr>
              ) : (
                sources.map((source) => (
                  <tr key={source.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(source.processing_status)}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {source.file_name}
                          </div>
                          {source.file_path && (
                            <div className="text-xs text-gray-500 font-mono">
                              {source.file_path}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {source.county?.name || 'Unknown County'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {source.state?.name || 'Unknown State'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {source.topic || '—'}
                      </div>
                      {source.all_topics && source.all_topics.length > 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{source.all_topics.length - 1} more
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(source.processing_status)}
                    </td>
                    <td className="px-6 py-4">
                      {source.is_multi_topic ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Multi-Topic ({source.all_topics?.length || 0})
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(source.created_at)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
