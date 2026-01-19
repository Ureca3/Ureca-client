import type { Store } from '@/types/map';

export function isValidStore(store: Partial<Store>): store is Store {
  return Boolean(store.name && store.address && store.phone && typeof store.isOpen === 'boolean');
}
