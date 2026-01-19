export interface Store {
  name: string;
  address: string;
  phone: string;
  isOpen: boolean;
  distance?: number;
  businessHours?: string;
}

export type FooterState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'selected'; store: Store };
