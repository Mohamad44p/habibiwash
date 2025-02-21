export type QuoteStatus = 'PENDING' | 'REVIEWED' | 'APPROVED' | 'REJECTED';

export type QuoteFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicle: string;
  zipCode?: string | null;  // Make it optional and nullable
  exteriorServices: string[];
  interiorServices: string[];
  contactMethod: string;
  message?: string | null;  // Make it optional and nullable
  newsletter: boolean;
};

export type Quote = {
  id: string;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
} & Omit<QuoteFormData, 'zipCode' | 'message'> & {
  zipCode: string | null;
  message: string | null;
};
