'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataTable, StatusBadge } from '@/components/admin';
import { Button, Select, Card, Alert, Input } from '@/components/ui';
import { formatRelativeTime } from '@/lib/utils';
import type { DemoRequest, DemoStatus } from '@/types';
import {
  RefreshCw,
  Filter,
  Mail,
  Phone,
  Globe,
  Building,
  ExternalLink,
  Clock,
} from 'lucide-react';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CONVERTED', label: 'Converted' },
  { value: 'EXPIRED', label: 'Expired' },
];

export default function DemoRequestsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || '';

  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [demoUrl, setDemoUrl] = useState('');

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  const fetchDemoRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: ((page - 1) * limit).toString(),
      });
      if (status) params.set('status', status);

      const response = await fetch(`/api/demo-requests?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setDemoRequests(data.demoRequests);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch demo requests');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDemoRequests();
  }, [page, status]);

  useEffect(() => {
    if (selectedRequest?.demoUrl) {
      setDemoUrl(selectedRequest.demoUrl);
    } else {
      setDemoUrl('');
    }
  }, [selectedRequest]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);

    const params = new URLSearchParams();
    if (newStatus) params.set('status', newStatus);
    router.push(`/admin/demo-requests${params.toString() ? `?${params}` : ''}`);
  };

  const updateRequestStatus = async (id: string, newStatus: DemoStatus, url?: string) => {
    setIsUpdating(true);

    try {
      const body: any = { status: newStatus };
      if (url) body.demoUrl = url;

      const response = await fetch(`/api/demo-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to update demo request');

      fetchDemoRequests();
      setSelectedRequest(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      key: 'businessName',
      header: 'Business',
      render: (req: DemoRequest) => (
        <div>
          <p className="font-medium text-slate-900">{req.businessName}</p>
          <p className="text-sm text-slate-500">{req.name}</p>
        </div>
      ),
    },
    {
      key: 'businessType',
      header: 'Industry',
      render: (req: DemoRequest) => (
        <span className="text-slate-600">{req.businessType}</span>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (req: DemoRequest) => (
        <div>
          <p className="text-slate-600">{req.email}</p>
          {req.phone && (
            <p className="text-sm text-slate-500">{req.phone}</p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (req: DemoRequest) => <StatusBadge status={req.status} />,
    },
    {
      key: 'createdAt',
      header: 'Requested',
      render: (req: DemoRequest) => (
        <div>
          <span className="text-slate-500">
            {formatRelativeTime(new Date(req.createdAt))}
          </span>
          {req.status === 'PENDING' && (
            <div className="flex items-center gap-1 text-orange-600 text-xs mt-1">
              <Clock className="w-3 h-3" />
              24hr deadline
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Demo Requests</h1>
          <p className="text-slate-500 mt-1">
            Manage 24-hour demo requests
          </p>
        </div>
        <Button onClick={fetchDemoRequests} variant="outline" size="sm">
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
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
          <p className="text-sm text-slate-500 sm:ml-auto">
            Showing {demoRequests.length} of {total} requests
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
        data={demoRequests}
        keyField="id"
        isLoading={isLoading}
        emptyMessage="No demo requests found"
        pagination={{
          page,
          totalPages,
          onPageChange: setPage,
        }}
        onRowClick={setSelectedRequest}
      />

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {selectedRequest.businessName}
                </h2>
                <StatusBadge status={selectedRequest.status} className="mt-1" />
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Contact</p>
                  <p className="text-slate-900">{selectedRequest.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <a
                  href={`mailto:${selectedRequest.email}`}
                  className="text-primary-600 hover:underline"
                >
                  {selectedRequest.email}
                </a>
              </div>

              {selectedRequest.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <a
                    href={`tel:${selectedRequest.phone}`}
                    className="text-primary-600 hover:underline"
                  >
                    {selectedRequest.phone}
                  </a>
                </div>
              )}

              {selectedRequest.currentWebsite && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-slate-400" />
                  <a
                    href={selectedRequest.currentWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline flex items-center gap-1"
                  >
                    {selectedRequest.currentWebsite}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-500">Industry</p>
                <p className="text-slate-900">{selectedRequest.businessType}</p>
              </div>

              {selectedRequest.websiteGoals && (
                <div>
                  <p className="text-sm text-slate-500">Website Goals</p>
                  <p className="text-slate-900">{selectedRequest.websiteGoals}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-500">Requested</p>
                <p className="text-slate-900">
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedRequest.demoUrl && (
                <div>
                  <p className="text-sm text-slate-500">Demo URL</p>
                  <a
                    href={selectedRequest.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline flex items-center gap-1"
                  >
                    {selectedRequest.demoUrl}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t pt-4 space-y-4">
              {/* Demo URL Input (for marking as delivered) */}
              {(selectedRequest.status === 'PENDING' || 
                selectedRequest.status === 'IN_PROGRESS') && (
                <div>
                  <Input
                    label="Demo URL"
                    placeholder="https://demo.sitelab.com/preview/..."
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                  />
                </div>
              )}

              <div>
                <p className="text-sm text-slate-500 mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.status === 'PENDING' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateRequestStatus(selectedRequest.id, 'IN_PROGRESS')
                      }
                      disabled={isUpdating}
                    >
                      Start Working
                    </Button>
                  )}

                  {(selectedRequest.status === 'PENDING' ||
                    selectedRequest.status === 'IN_PROGRESS') && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        updateRequestStatus(
                          selectedRequest.id,
                          'DELIVERED',
                          demoUrl
                        )
                      }
                      disabled={isUpdating || !demoUrl}
                    >
                      Mark Delivered
                    </Button>
                  )}

                  {selectedRequest.status === 'DELIVERED' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        updateRequestStatus(selectedRequest.id, 'CONVERTED')
                      }
                      disabled={isUpdating}
                    >
                      Mark Converted
                    </Button>
                  )}

                  {selectedRequest.status !== 'EXPIRED' &&
                    selectedRequest.status !== 'CONVERTED' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          updateRequestStatus(selectedRequest.id, 'EXPIRED')
                        }
                        disabled={isUpdating}
                      >
                        Mark Expired
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
