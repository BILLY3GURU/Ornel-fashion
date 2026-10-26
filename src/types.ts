export type ProductCategory = 'cosmetics' | 'apparel' | 'cash-systems' | 'accessories';

export type Currency = 'USD' | 'XAF' | 'EUR';

export interface ProductVariant {
  name: string;
  sku?: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subtitle: string;
  price: number; // in USD base
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  badge?: 'Best Seller' | 'Limited Edition' | 'New Arrival' | 'Commercial Grade' | 'Trending';
  description: string;
  features: string[];
  specs?: Record<string, string>;
  variants?: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface InquiryMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface InquiryThread {
  id: string;
  customerName: string;
  customerContact: string;
  contactType: 'whatsapp' | 'email' | 'phone';
  department: 'Cosmetics & Beauty' | 'Branded Apparel' | 'Cash Systems & POS' | 'General Sales';
  subject: string;
  messages: InquiryMessage[];
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}
