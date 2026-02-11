import { db } from '@/lib/db';
import {
  sendDemoRequestConfirmation,
  sendAdminDemoNotification,
} from '@/lib/email';
import type { DemoRequest, DemoStatus } from '@/types';

interface CreateDemoRequestInput {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  websiteGoals?: string;
  currentWebsite?: string;
  phone?: string;
}

interface UpdateDemoRequestInput {
  status?: DemoStatus;
  demoUrl?: string;
}

/**
 * Create a new demo request
 */
export async function createDemoRequest(
  input: CreateDemoRequestInput
): Promise<DemoRequest> {
  const demoRequest = await db.demoRequest.create({
    data: {
      name: input.name,
      email: input.email,
      businessName: input.businessName,
      businessType: input.businessType,
      websiteGoals: input.websiteGoals || null,
      currentWebsite: input.currentWebsite || null,
      phone: input.phone || null,
      status: 'PENDING',
    },
  });

  // Send confirmation email to user (non-blocking)
  sendDemoRequestConfirmation({
    name: demoRequest.name,
    email: demoRequest.email,
    businessName: demoRequest.businessName,
  }).catch((err) =>
    console.error('Failed to send demo confirmation:', err)
  );

  // Send notification to admin (non-blocking)
  sendAdminDemoNotification({
    id: demoRequest.id,
    name: demoRequest.name,
    email: demoRequest.email,
    businessName: demoRequest.businessName,
    businessType: demoRequest.businessType,
    websiteGoals: demoRequest.websiteGoals,
    currentWebsite: demoRequest.currentWebsite,
    phone: demoRequest.phone,
  }).catch((err) =>
    console.error('Failed to send admin notification:', err)
  );

  return demoRequest as DemoRequest;
}

/**
 * Get all demo requests with optional filtering
 */
export async function getDemoRequests(options?: {
  status?: DemoStatus;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}): Promise<{ demoRequests: DemoRequest[]; total: number }> {
  const {
    status,
    limit = 50,
    offset = 0,
    orderBy = 'createdAt',
    order = 'desc',
  } = options || {};

  const where = status ? { status } : {};

  const [demoRequests, total] = await Promise.all([
    db.demoRequest.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { [orderBy]: order },
    }),
    db.demoRequest.count({ where }),
  ]);

  return { demoRequests: demoRequests as DemoRequest[], total };
}

/**
 * Get a single demo request by ID
 */
export async function getDemoRequestById(
  id: string
): Promise<DemoRequest | null> {
  const demoRequest = await db.demoRequest.findUnique({
    where: { id },
  });

  return demoRequest as DemoRequest | null;
}

/**
 * Update a demo request
 */
export async function updateDemoRequest(
  id: string,
  input: UpdateDemoRequestInput
): Promise<DemoRequest> {
  const demoRequest = await db.demoRequest.update({
    where: { id },
    data: input,
  });

  return demoRequest as DemoRequest;
}

/**
 * Mark demo as delivered and record follow-up sent
 */
export async function markDemoDelivered(
  id: string,
  demoUrl: string
): Promise<DemoRequest> {
  const demoRequest = await db.demoRequest.update({
    where: { id },
    data: {
      status: 'DELIVERED',
      demoUrl,
      followUpSentAt: new Date(),
    },
  });

  // TODO: Send demo delivery email to user

  return demoRequest as DemoRequest;
}

/**
 * Delete a demo request
 */
export async function deleteDemoRequest(id: string): Promise<void> {
  await db.demoRequest.delete({
    where: { id },
  });
}

/**
 * Get demo request statistics
 */
export async function getDemoRequestStats(): Promise<{
  total: number;
  pending: number;
  inProgress: number;
  delivered: number;
  converted: number;
  thisMonth: number;
  conversionRate: number;
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, pending, inProgress, delivered, converted, thisMonth] =
    await Promise.all([
      db.demoRequest.count(),
      db.demoRequest.count({ where: { status: 'PENDING' } }),
      db.demoRequest.count({ where: { status: 'IN_PROGRESS' } }),
      db.demoRequest.count({ where: { status: 'DELIVERED' } }),
      db.demoRequest.count({ where: { status: 'CONVERTED' } }),
      db.demoRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
    ]);

  // Calculate conversion rate (converted / total delivered+converted)
  const completedDemos = delivered + converted;
  const conversionRate = completedDemos > 0 ? (converted / completedDemos) * 100 : 0;

  return {
    total,
    pending,
    inProgress,
    delivered,
    converted,
    thisMonth,
    conversionRate: Math.round(conversionRate * 10) / 10,
  };
}
