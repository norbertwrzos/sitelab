import { db } from '@/lib/db';
import {
  sendLeadConfirmation,
  sendAdminLeadNotification,
} from '@/lib/email';
import type { Lead, LeadStatus } from '@/types';

interface CreateLeadInput {
  name: string;
  email: string;
  businessType?: string;
  message?: string;
  source?: string;
}

interface UpdateLeadInput {
  status?: LeadStatus;
}

/**
 * Create a new lead
 */
export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const lead = await db.lead.create({
    data: {
      name: input.name,
      email: input.email,
      businessType: input.businessType || null,
      message: input.message || null,
      source: input.source || 'contact_form',
      status: 'NEW',
    },
  });

  // Send confirmation email to user (non-blocking)
  sendLeadConfirmation({
    name: lead.name,
    email: lead.email,
  }).catch((err) => console.error('Failed to send lead confirmation:', err));

  // Send notification to admin (non-blocking)
  sendAdminLeadNotification({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    businessType: lead.businessType,
    message: lead.message,
    source: lead.source,
  }).catch((err) => console.error('Failed to send admin notification:', err));

  return lead as Lead;
}

/**
 * Get all leads with optional filtering
 */
export async function getLeads(options?: {
  status?: LeadStatus;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}): Promise<{ leads: Lead[]; total: number }> {
  const {
    status,
    limit = 50,
    offset = 0,
    orderBy = 'createdAt',
    order = 'desc',
  } = options || {};

  const where = status ? { status } : {};

  const [leads, total] = await Promise.all([
    db.lead.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { [orderBy]: order },
    }),
    db.lead.count({ where }),
  ]);

  return { leads: leads as Lead[], total };
}

/**
 * Get a single lead by ID
 */
export async function getLeadById(id: string): Promise<Lead | null> {
  const lead = await db.lead.findUnique({
    where: { id },
  });

  return lead as Lead | null;
}

/**
 * Update a lead
 */
export async function updateLead(
  id: string,
  input: UpdateLeadInput
): Promise<Lead> {
  const lead = await db.lead.update({
    where: { id },
    data: input,
  });

  return lead as Lead;
}

/**
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<void> {
  await db.lead.delete({
    where: { id },
  });
}

/**
 * Get lead statistics
 */
export async function getLeadStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  thisMonth: number;
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, newCount, contacted, qualified, converted, thisMonth] =
    await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: 'NEW' } }),
      db.lead.count({ where: { status: 'CONTACTED' } }),
      db.lead.count({ where: { status: 'QUALIFIED' } }),
      db.lead.count({ where: { status: 'CONVERTED' } }),
      db.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    ]);

  return {
    total,
    new: newCount,
    contacted,
    qualified,
    converted,
    thisMonth,
  };
}
