export type AccommodationType = 'apartment' | 'villa' | 'house';

export interface AccommodationData {
  name: string;
  address: string;
  description?: string;
  type: AccommodationType;
  photos: string[];
}

export interface OwnerData {
  name: string;
  email: string;
  phone?: string;
}

export interface FormData {
  accommodation: AccommodationData;
  owner: OwnerData;
  summary?: Record<string, unknown>;
}

export type FormStep = 'accommodation' | 'owner' | 'summary';

export interface ValidationErrors {
  [key: string]: string;
} 