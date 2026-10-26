import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency, InquiryThread } from '../types';
import { PRODUCTS, CURRENCY_RATES } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isInquiryOpen: boolean;
  setIsInquiryOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Inquiries
  inquiries: InquiryThread[];
  createInquiry: (data: {
    customerName: string;
    customerContact: string;
    contactType: 'whatsapp' | 'email' | 'phone';
    department: 'Cosmetics & Beauty' | 'Branded Apparel' | 'Cash Systems & POS' | 'General Sales';
    subject: string;
    message: string;
  }) => InquiryThread;
  addInquiryReply: (inquiryId: string, text: string) => void;

  // Active filters
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scrollToCatalog: (category?: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_INQUIRIES: InquiryThread[] = [
  {
    id: 'INQ-9482',
    customerName: 'Claire B.',
    customerContact: '+237699112233',
    contactType: 'whatsapp',
    department: 'Cosmetics & Beauty',
    subject: 'Consultation on Aethel Radiance Serum routine',
    status: 'In Progress',
    createdAt: 'Today, 10:14 AM',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Hello, is the Aethel Botanical Serum suitable for hyperpigmentation and sensitive skin?',
        timestamp: '10:14 AM'
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Hello Claire! Yes absolutely. The 2% bio-hyaluronic acid and 5% niacinamide target hyperpigmentation without irritation. We also have tester sets available at our Akwa showroom.',
        timestamp: '10:17 AM'
      }
    ]
  },
  {
    id: 'INQ-9481',
    customerName: 'Marc Antoine Retail',
    customerContact: 'marc@boutiquemode.cm',
    contactType: 'email',
    department: 'Cash Systems & POS',
    subject: 'Bulk quotation for 3 POS terminals in Yaoundé',
    status: 'Resolved',
    createdAt: 'Yesterday, 3:45 PM',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'We are opening two new fashion stores in Bastos. Can you supply 3 Arisan Touch POS units with barcode scanners and receipt printers?',
        timestamp: '3:45 PM'
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Our technical director reached out via WhatsApp (+237654049049). Quotation sent with complimentary on-site installation and 1-year warranty.',
        timestamp: '4:02 PM'
      }
    ]
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ornel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ornel_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inquiries, setInquiries] = useState<InquiryThread[]>(() => {
    try {
      const saved = localStorage.getItem('ornel_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('ornel_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ornel_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ornel_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const formatPrice = (priceInUSD: number): string => {
    const rateInfo = CURRENCY_RATES[currency];
    const converted = priceInUSD * rateInfo.rate;
    if (currency === 'XAF') {
      return `${Math.round(converted).toLocaleString()} FCFA`;
    }
    return `${rateInfo.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedVariant === variant)));
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedVariant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.selectedVariant && item.product.variants) {
      const v = item.product.variants.find(va => va.name === item.selectedVariant);
      if (v?.priceModifier) {
        itemPrice += v.priceModifier;
      }
    }
    return acc + itemPrice * item.quantity;
  }, 0);

  const createInquiry = (data: {
    customerName: string;
    customerContact: string;
    contactType: 'whatsapp' | 'email' | 'phone';
    department: 'Cosmetics & Beauty' | 'Branded Apparel' | 'Cash Systems & POS' | 'General Sales';
    subject: string;
    message: string;
  }): InquiryThread => {
    const newId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newInquiry: InquiryThread = {
      id: newId,
      customerName: data.customerName,
      customerContact: data.customerContact,
      contactType: data.contactType,
      department: data.department,
      subject: data.subject,
      status: 'Open',
      createdAt: 'Just now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          text: data.message,
          timestamp: timeString
        },
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'agent',
          text: `Thank you for contacting ORNEL Fashion (${data.department}). Your inquiry ticket is #${newId}. Our sales team has logged your request. You can also press "Continue on WhatsApp" anytime for instant response from +237654049049.`,
          timestamp: timeString
        }
      ]
    };

    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const addInquiryReply = (inquiryId: string, text: string) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInquiries(prev =>
      prev.map(inq => {
        if (inq.id === inquiryId) {
          return {
            ...inq,
            status: 'In Progress',
            messages: [
              ...inq.messages,
              {
                id: `reply-${Date.now()}`,
                sender: 'user',
                text,
                timestamp: timeString
              }
            ]
          };
        }
        return inq;
      })
    );
  };

  const scrollToCatalog = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isInquiryOpen,
        setIsInquiryOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        inquiries,
        createInquiry,
        addInquiryReply,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        scrollToCatalog
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
