'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminFilterBar } from '@/components/admin/common/admin-filter-bar';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminSearch } from '@/components/admin/common/admin-search';
import { PricingCard } from '@/components/commerce/pricing/pricing-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { getPackageBadges } from '@/data/pricing/badges';
import { useDebouncedValue, paginate, totalPages } from '@/lib/admin/list-utils';
import { formatMoney } from '@/lib/pricing/format';
import type {
  AdminPackageEditorModel,
  AdminPricingFilters,
  AdminPricingRow,
} from '@/types/admin-pricing';
import type { PackageBadgeId } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';

function readCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('iv_admin_csrf='));
  if (!match) return undefined;
  return decodeURIComponent(match.slice('iv_admin_csrf='.length));
}

type PackageDraft = {
  id: string;
  packageName: string;
  price: string;
  compareAtPrice: string;
  quantity: string;
  deliveryTime: string;
  active: boolean;
  badge: PackageBadgeId | 'none';
  currency: AdminPackageEditorModel['currency'];
  source: AdminPackageEditorModel['source'];
};

function draftFromModel(model: AdminPackageEditorModel): PackageDraft {
  return {
    id: model.id,
    packageName: model.packageName,
    price: (model.price / 100).toFixed(2),
    compareAtPrice: model.compareAtPrice != null ? (model.compareAtPrice / 100).toFixed(2) : '',
    quantity: String(model.quantity),
    deliveryTime: model.deliveryTime ?? '',
    active: model.active,
    badge: model.badge ?? 'none',
    currency: model.currency,
    source: model.source,
  };
}

export function PricingSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const debounced = useDebouncedValue(local);
  useEffect(() => onChange(debounced), [debounced]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <AdminSearch
      value={local}
      onChange={setLocal}
      label="Search packages"
      placeholder="Package, service, platform, quantity…"
    />
  );
}

export function PricingFilters({
  filters,
  serviceOptions,
  onChange,
}: {
  filters: AdminPricingFilters;
  serviceOptions: Array<{ slug: string; name: string }>;
  onChange: (next: AdminPricingFilters) => void;
}) {
  const platforms: Array<PlatformId | 'all'> = ['all', 'instagram', 'tiktok', 'youtube', 'facebook'];
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label>Platform</Label>
        <Select
          value={filters.platform ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, platform: value as AdminPricingFilters['platform'] })
          }
        >
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {platforms.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Service</Label>
        <Select
          value={filters.serviceSlug ?? 'all'}
          onValueChange={(value) => onChange({ ...filters, serviceSlug: value })}
        >
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {serviceOptions.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, status: value as AdminPricingFilters['status'] })
          }
        >
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}

export function PricingRow({
  row,
  onEdit,
}: {
  row: AdminPricingRow;
  onEdit: () => void;
}) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-3 font-medium">{row.packageName}</td>
      <td className="px-3 py-3 capitalize">{row.platformId}</td>
      <td className="px-3 py-3">{row.serviceName}</td>
      <td className="px-3 py-3">{row.quantity}</td>
      <td className="px-3 py-3">{formatMoney(row.price, row.currency)}</td>
      <td className="px-3 py-3">
        {row.compareAtPrice ? formatMoney(row.compareAtPrice, row.currency) : '—'}
      </td>
      <td className="px-3 py-3">{row.badge ?? '—'}</td>
      <td className="px-3 py-3">{row.deliveryTime || '—'}</td>
      <td className="px-3 py-3">{row.active ? 'Active' : 'Inactive'}</td>
      <td className="px-3 py-3">{row.updatedAt}</td>
      <td className="px-3 py-3">
        <Button type="button" size="sm" variant="outline" onClick={onEdit}>Edit</Button>
      </td>
    </tr>
  );
}

export function PricingTable({
  rows,
  onEdit,
}: {
  rows: AdminPricingRow[];
  onEdit: (id: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <AdminEmptyState
        title="No packages found"
        description="Only real NovaLikes.com packages are listed. Adjust filters if needed."
      />
    );
  }
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              {['Package', 'Platform', 'Service', 'Qty', 'Price', 'Compare', 'Badge', 'Delivery', 'Status', 'Updated', 'Actions'].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <PricingRow key={row.id} row={row} onEdit={() => onEdit(row.id)} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <article key={row.id} className="rounded-lg border p-4 space-y-2">
            <p className="font-medium">{row.packageName}</p>
            <p className="text-sm text-muted-foreground">
              {row.serviceName} · {formatMoney(row.price, row.currency)}
            </p>
            <Button type="button" size="sm" variant="outline" onClick={() => onEdit(row.id)}>
              Edit
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}

export function PackageEditor({
  open,
  draft,
  onDraftChange,
  onOpenChange,
  onSave,
  saving,
  error,
}: {
  open: boolean;
  draft: PackageDraft | null;
  onDraftChange: (next: PackageDraft) => void;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  saving: boolean;
  error: string | null;
}) {
  if (!draft) return null;
  const priceMinor = Math.round(Number(draft.price || 0) * 100);
  const compareMinor = draft.compareAtPrice
    ? Math.round(Number(draft.compareAtPrice) * 100)
    : undefined;
  const previewSource = {
    ...draft.source,
    price: priceMinor,
    regularPrice: priceMinor,
    compareAtPrice: compareMinor,
    quantity: Number(draft.quantity) || draft.source.quantity,
    deliveryTime: draft.deliveryTime,
    active: draft.active,
    availability: draft.active ? ('active' as const) : ('hidden' as const),
    badge: draft.badge === 'none' ? undefined : draft.badge,
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{draft.packageName}</SheetTitle>
          <SheetDescription>
            Edit price, quantity, delivery text, badge, and active status. Changes apply to checkout and service pages.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="pkg-price">Price (USD)</Label>
              <Input
                id="pkg-price"
                type="number"
                min="0"
                step="0.01"
                value={draft.price}
                onChange={(e) => onDraftChange({ ...draft, price: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pkg-compare">Compare-at (USD)</Label>
              <Input
                id="pkg-compare"
                type="number"
                min="0"
                step="0.01"
                value={draft.compareAtPrice}
                onChange={(e) => onDraftChange({ ...draft, compareAtPrice: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pkg-qty">Quantity</Label>
              <Input
                id="pkg-qty"
                type="number"
                min="1"
                value={draft.quantity}
                onChange={(e) => onDraftChange({ ...draft, quantity: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={draft.active ? 'active' : 'inactive'}
                onValueChange={(value) =>
                  onDraftChange({ ...draft, active: value === 'active' })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="pkg-delivery">Delivery time</Label>
              <Input
                id="pkg-delivery"
                value={draft.deliveryTime}
                onChange={(e) => onDraftChange({ ...draft, deliveryTime: e.target.value })}
                placeholder="e.g. 0-1 hours"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Badge</Label>
              <Select
                value={draft.badge}
                onValueChange={(value) =>
                  onDraftChange({
                    ...draft,
                    badge: value as PackageBadgeId | 'none',
                  })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {getPackageBadges().map((badge) => (
                    <SelectItem key={badge.id} value={badge.id}>{badge.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="max-w-sm">
            <PricingCard
              model={{
                package: previewSource,
                priceDisplay: formatMoney(previewSource.price, draft.currency),
                compareAtDisplay: previewSource.compareAtPrice
                  ? formatMoney(previewSource.compareAtPrice, draft.currency)
                  : undefined,
                badgeLabel: previewSource.badge,
                primaryCta: { label: 'Order Now', href: `#${draft.id}` },
              }}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={onSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save package'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PricingPage() {
  const [rows, setRows] = useState<AdminPricingRow[]>([]);
  const [serviceOptions, setServiceOptions] = useState<Array<{ slug: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdminPricingFilters>({
    platform: 'all',
    serviceSlug: 'all',
    status: 'all',
  });
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<PackageDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const response = await fetch('/api/admin/pricing');
      const data = (await response.json()) as {
        ok?: boolean;
        packages?: AdminPricingRow[];
        services?: Array<{ slug: string; name: string }>;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to load packages.');
      }
      setRows(data.packages ?? []);
      setServiceOptions(data.services ?? []);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to load packages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filters.platform && filters.platform !== 'all' && row.platformId !== filters.platform) return false;
      if (filters.serviceSlug && filters.serviceSlug !== 'all' && row.serviceSlug !== filters.serviceSlug) return false;
      if (filters.status === 'active' && !row.active) return false;
      if (filters.status === 'inactive' && row.active) return false;
      if (!q) return true;
      return (
        row.packageName.toLowerCase().includes(q) ||
        row.serviceName.toLowerCase().includes(q) ||
        row.platformId.includes(q) ||
        String(row.quantity).includes(q)
      );
    });
  }, [rows, query, filters]);

  const pages = totalPages(filtered.length, pageSize);

  async function openEdit(id: string) {
    setSaveError(null);
    const response = await fetch(`/api/admin/pricing?packageId=${encodeURIComponent(id)}`);
    const data = (await response.json()) as {
      ok?: boolean;
      package?: AdminPackageEditorModel;
      error?: string;
    };
    if (response.ok && data.ok && data.package) {
      setDraft(draftFromModel(data.package));
    } else {
      setSaveError(data.error ?? 'Unable to open package.');
    }
  }

  async function saveDraft() {
    if (!draft) return;
    setSaving(true);
    setSaveError(null);
    try {
      const csrf = readCsrfToken();
      const response = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({
          packageId: draft.id,
          price: draft.price,
          compareAtPrice: draft.compareAtPrice || null,
          quantity: draft.quantity,
          deliveryTime: draft.deliveryTime,
          active: draft.active,
          badge: draft.badge === 'none' ? null : draft.badge,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to save package.');
      }
      setDraft(null);
      await load();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save package.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Pricing"
        description="Edit NovaLikes package prices, quantities, and availability."
      />
      <PricingSearch value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      <PricingFilters
        filters={filters}
        serviceOptions={serviceOptions}
        onChange={(next) => { setFilters(next); setPage(1); }}
      />
      {loading ? <p className="text-sm text-muted-foreground">Loading packages…</p> : null}
      {loadError ? (
        <p className="text-sm text-destructive" role="alert">{loadError}</p>
      ) : null}
      <PricingTable
        rows={paginate(filtered, page, pageSize)}
        onEdit={(id) => {
          void openEdit(id);
        }}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} packages · Page {page}/{pages}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <Button type="button" size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <PackageEditor
        open={Boolean(draft)}
        draft={draft}
        saving={saving}
        error={saveError}
        onDraftChange={setDraft}
        onSave={() => {
          void saveDraft();
        }}
        onOpenChange={(open) => {
          if (!open) {
            setDraft(null);
            setSaveError(null);
          }
        }}
      />
    </div>
  );
}
