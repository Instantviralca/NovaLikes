import { CartRecoveryDetail } from '@/components/admin/cart-recovery/cart-recovery-detail';

export default async function AdminCartRecoveryDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CartRecoveryDetail id={id} />;
}
