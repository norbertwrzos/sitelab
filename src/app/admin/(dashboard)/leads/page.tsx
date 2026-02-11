'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTable, StatusBadge } from '@/components/admin';
import { Button, Select, Card, Alert } from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';
import type { Lead, LeadStatus } from '@/types';
import { Search, Filter, Mail, Phone, RefreshCw } from 'lucide-react';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'CONVERTED', label: 'Converted' },
  { value: 'CLOSED', label: 'Closed' },
];

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || '';

  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: ((page - 1) * limit).toString(),
      });
      if (status) params.set('status', status);

      const response = await fetch(`/api/leads?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setLeads(data.leads);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, status]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
    
    // Update URL
    const params = new URLSearchParams();
    if (newStatus) params.set('status', newStatus);
    router.push(`/admin/leads${params.toString() ? `?${params}` : ''}`);
  };

  const updateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update lead');

      // Refresh leads
      fetchLeads();
      setSelectedLead(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead');
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (lead: Lead) => (
        <div>
          <p className="font-medium text-slate-900">{lead.name}</p>
          <p className="text-sm text-slate-500">{lead.email}</p>
        </div>
      ),
    },
    {
      key: 'businessType',
      header: 'Industry',
      render: (lead: Lead) => (
        <span className="text-slate-600">{lead.businessType || '-'}</span>
      ),
    },
    {
      key: 'source',
      header: 'Source',
      render: (lead: Lead) => (
        <span className="text-slate-600 capitalize">
          {lead.source.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (lead: Lead) => <StatusBadge status={lead.status} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (lead: Lead) => (
        <span className="text-slate-500">
          {formatRelativeTime(new Date(lead.createdAt))}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500 mt-1">
            Manage and track your leads
          </p>
        </div>
        <Button onClick={fetchLeads} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <Select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-40"
              options={statusOptions}
            />
          </div>
          <p className="text-sm text-slate-500 sm:ml-auto">
            Showing {leads.length} of {total} leads
          </p>
        </div>
      </Card>

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={leads}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No leads found"
        pagination={{
          page,
          totalPages,
          onPageChange: setPage,
        }}
        onRowClick={setSelectedLead}
      />

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {selectedLead.name}
                </h2>
                <StatusBadge status={selectedLead.status} className="mt-1" />
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="text-primary-600 hover:underline"
                >
                  {selectedLead.email}
                </a>
              </div>

              {selectedLead.businessType && (
                <div>
                  <p className="text-sm text-slate-500">Industry</p>
                  <p className="text-slate-900">{selectedLead.businessType}</p>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <p className="text-sm text-slate-500">Message</p>
                  <p className="text-slate-900">{selectedLead.message}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-500">Source</p>
                <p className="text-slate-900 capitalize">
                  {selectedLead.source.replace(/_/g, ' ')}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Created</p>
                <p className="text-slate-900">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Status Actions */}
            <div className="border-t pt-4">
              <p className="text-sm text-slate-500 mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'] as LeadStatus[]).map(
                  (s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selectedLead.status === s ? 'primary' : 'outline'}
                      onClick={() => updateLeadStatus(selectedLead.id, s)}
                      disabled={isUpdating || selectedLead.status === s}
                    >
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </Button>
                  )
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
