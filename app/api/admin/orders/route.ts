import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  ADMIN_CSRF_COOKIE,
  requireAdminFromCookies,
  verifyCsrfToken,
} from '@/lib/admin/auth';
import {
  getAdminOrderById,
  getAdminOrderRows,
  getAdminOrderServiceOptions,
} from '@/lib/admin/orders';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import { manualOrderWorkflow } from '@/lib/orders/manual-workflow';
import { canTransition, ORDER_STATUSES } from '@/lib/orders/status';
import { getOrderById, listOrders } from '@/lib/orders/store';
import type { OrderActor, OrderStatus } from '@/types/order-status';

export const runtime = 'nodejs';

const ADMIN_ACTOR: OrderActor = {
  id: 'admin',
  type: 'admin',
  displayName: 'Admin',
};

async function requireAdmin(request: Request) {
  const jar = await cookies();
  const ok = await requireAdminFromCookies(jar);
  if (!ok) return false;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const csrfCookie = jar.get(ADMIN_CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
    if (!verifyCsrfToken(csrfCookie, csrfHeader)) return false;
  }
  return true;
}

function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && (ORDER_STATUSES as readonly string[]).includes(value);
}

async function applyStatusTransition(
  orderId: string,
  nextStatus: OrderStatus,
  note?: string,
) {
  switch (nextStatus) {
    case 'processing':
      return manualOrderWorkflow.startProcessing(orderId, ADMIN_ACTOR, note);
    case 'completed':
      return manualOrderWorkflow.markCompleted(orderId, ADMIN_ACTOR, note);
    case 'partial':
      return manualOrderWorkflow.markPartial(orderId, ADMIN_ACTOR, note);
    case 'cancelled':
      return manualOrderWorkflow.cancelOrder(orderId, ADMIN_ACTOR, note);
    case 'refunded':
      return manualOrderWorkflow.refundOrder(orderId, ADMIN_ACTOR, note);
    default:
      throw new Error(`[Admin OMS] Unsupported status: ${nextStatus}`);
  }
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  if (orderId) {
    const details = await getAdminOrderById(orderId);
    if (!details) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, order: details });
  }

  const all = await listOrders();
  const fulfilment = all.filter(isEligibleForFulfilmentQueue);
  const rows = await getAdminOrderRows({ paidOnly: true });

  return NextResponse.json({
    ok: true,
    orders: rows,
    fulfilmentQueueCount: fulfilment.length,
    services: getAdminOrderServiceOptions(),
  });
}

/**
 * Update order status or add an internal note.
 * Body: { orderId, action: 'status' | 'note', nextStatus?, note? }
 */
export async function PATCH(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const payload = body as {
    orderId?: unknown;
    action?: unknown;
    nextStatus?: unknown;
    note?: unknown;
  };

  const orderId = typeof payload.orderId === 'string' ? payload.orderId.trim() : '';
  if (!orderId) {
    return NextResponse.json({ ok: false, error: 'orderId is required' }, { status: 400 });
  }

  const action = payload.action === 'note' ? 'note' : 'status';
  const note =
    typeof payload.note === 'string' && payload.note.trim()
      ? payload.note.trim()
      : undefined;

  try {
    if (action === 'note') {
      if (!note) {
        return NextResponse.json(
          { ok: false, error: 'note is required' },
          { status: 400 },
        );
      }
      await manualOrderWorkflow.addInternalNote({
        orderId,
        body: note,
        actor: ADMIN_ACTOR,
      });
    } else {
      if (!isOrderStatus(payload.nextStatus)) {
        return NextResponse.json(
          { ok: false, error: 'nextStatus is required' },
          { status: 400 },
        );
      }
      const current = await getOrderById(orderId);
      if (!current) {
        return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
      }
      if (!canTransition(current.status, payload.nextStatus)) {
        return NextResponse.json(
          {
            ok: false,
            error: `Invalid transition ${current.status} → ${payload.nextStatus}. Pending orders must move to Processing before Completed.`,
          },
          { status: 400 },
        );
      }
      await applyStatusTransition(orderId, payload.nextStatus, note);
    }

    const details = await getAdminOrderById(orderId);
    if (!details) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, order: details });
  } catch (error) {
    console.error('[admin/orders PATCH]', error);
    const message = error instanceof Error ? error.message : '';
    if (message.toLowerCase().includes('not found')) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(
      { ok: false, error: 'Unable to update order. Please try again later.' },
      { status: 500 },
    );
  }
}
