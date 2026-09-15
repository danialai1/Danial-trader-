export interface Product {
  id: string;
  name: string;
  category: 'biscuits' | 'kite';
  description: string;
  image: string;
  link?: string;
  details?: string;
  badge?: 'Best Seller' | 'New Arrival' | 'Trending' | 'Premium Choice';
  specs?: {
    packing: string;
    weight: string;
    dimensions: string;
    moisture?: string;
  };
  ingredients?: string[];
  price?: string;
}

export interface Stat {
  value: string;
  label: string;
  iconName: string;
}

export interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
  details?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiryType: 'B2B' | 'Export' | 'Consumer';
  brandType: 'Both' | 'Biscuits' | 'Kite';
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  feedback: string;
  rating: number;
  portfolio: 'biscuits' | 'matches' | 'both';
}

