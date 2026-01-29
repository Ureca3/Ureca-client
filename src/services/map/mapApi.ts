import type { Store } from '@/types/map/map';

export const fetchStoreMock = async (): Promise<Store> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error('mock error');
  return {
    name: 'LG U+ 강남점',
    address: '서울 강남구 테헤란로',
    phone: '02-1234-5678',
    isOpen: true,
    distance: 0.15,
    businessHours: '10:00 - 21:00',
  };
};
