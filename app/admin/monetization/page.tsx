'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DollarSign,
  Users,
  TrendingUp,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Stats {
  leads: {
    total: number;
    qualified: number;
    sent: number;
    converted: number;
    conversionRate: number;
  };
  partners: {
    total: number;
    active: number;
    paused: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    avgCPL: number;
  };
}

interface RecentLead {
  id: string;
  name: string;
  phone: string;
  state: string;
  county: string;
  status: string;
  created_at: string;
  assigned_partner_id: string | null;
}

export default function MonetizationPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const supabase = createClient();
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      // Fetch all leads
      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch all partners
      const { data: partners } = await supabase
        .from('partners')
        .select('*');

      if (leads) {
        // Calculate lead stats
        const total = leads.length;
        const qualified = leads.filter((l) => l.is_qualified).length;
        const sent = leads.filter((l) => ['sent', 'accepted', 'converted'].includes(l.status)).length;
        const converted = leads.filter((l) => l.status === 'converted').length;
        const conversionRate = sent > 0 ? (converted / sent) * 100 : 0;

        // Calculate partner stats
        const activePartners = partners?.filter((p) => p.status === 'active').length || 0;
        const pausedPartners = partners?.filter((p) => p.status === 'paused').length || 0;

        // Calculate revenue
        const avgCPL = partners && partners.length > 0
          ? partners.reduce((sum, p) => sum + p.cpl_rate, 0) / partners.length
          : 0;

        const totalRevenue = converted * avgCPL;

        // Calculate this month and last month revenue
        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        const thisMonthLeads = leads.filter((l) => {
          const createdAt = new Date(l.created_at);
          return createdAt >= thisMonthStart && l.status === 'converted';
        }).length;

        const lastMonthLeads = leads.filter((l) => {
          const createdAt = new Date(l.created_at);
          return createdAt >= lastMonthStart && createdAt <= lastMonthEnd && l.status === 'converted';
        }).length;

        setStats({
          leads: {
            total,
            qualified,
            sent,
            converted,
            conversionRate,
          },
          partners: {
            total: partners?.length || 0,
            active: activePartners,
            paused: pausedPartners,
          },
          revenue: {
            total: totalRevenue,
            thisMonth: thisMonthLeads * avgCPL,
            lastMonth: lastMonthLeads * avgCPL,
            avgCPL,
          },
        });

        setRecentLeads(leads.slice(0, 10) as RecentLead[]);
      }
    } catch (error) {
      console.error('Error fetching monetization data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
      new: { label: 'New', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      qualified: { label: 'Qualified', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      sent: { label: 'Sent', color: 'bg-purple-100 text-purple-800', icon: Clock },
      accepted: { label: 'Accepted', color: 'bg-indigo-100 text-indigo-800', icon: CheckCircle },
      converted: { label: 'Converted', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
      lost: { label: 'Lost', color: 'bg-gray-100 text-gray-800', icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.new;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading monetization data...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-500">Unable to load monetization statistics.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Monetization Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Track leads, partner performance, and revenue metrics
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.revenue.total)}
                </p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.revenue.thisMonth)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  vs {formatCurrency(stats.revenue.lastMonth)} last month
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.leads.total}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.leads.qualified} qualified
                </p>
              </div>
              <Phone className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.leads.conversionRate.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.leads.converted} of {stats.leads.sent} sent
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead & Partner Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Lead Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700">Total Leads</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.leads.total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">Qualified</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.leads.qualified}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-700">Sent to Partners</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.leads.sent}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-sm text-gray-700">Converted</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.leads.converted}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${stats.leads.conversionRate}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {stats.leads.conversionRate.toFixed(1)}% conversion rate
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Partner Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Total Partners</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.partners.total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Active Partners</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.partners.active}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Paused Partners</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.partners.paused}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Avg CPL Rate</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(stats.revenue.avgCPL)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Partner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Phone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No leads yet</p>
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">{lead.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{lead.county || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{lead.state}</div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {lead.assigned_partner_id ? 'Assigned' : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
