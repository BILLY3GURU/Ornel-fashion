import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. COSMETICS & BEAUTY
  {
    id: 'cosm-01',
    name: 'Aethel Botanical Radiance Serum & Cream Duo',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics & Beauty',
    subtitle: 'Nourishing botanical active concentrate with pure cold-pressed botanical lipids',
    price: 88,
    originalPrice: 110,
    image: '/src/assets/images/product_cosmetics_luxury_1793011668956.jpg',
    badge: 'Best Seller',
    description: 'Formulated with organic cold-extracted bio-botanicals, niacinamide, and bioactive hyaluronic complexes. This dual ritual restores luminosity, deep hydration, and structural barrier vitality to stressed skin.',
    features: [
      'Clinically tested 72-hour moisture lock',
      'Amber apothecary UV-protective glass bottle with calibrated dropper',
      'Non-comedogenic, 100% cruelty-free and dermatologically certified',
      'Free from synthetic parabens, phthalates, and artificial fragrances'
    ],
    specs: {
      'Volume': 'Serum 60ml + Cream 50ml',
      'Skin Type': 'All skin types, including sensitive and mature skin',
      'Active Ingredients': 'Hyaluronic Acid 2%, Niacinamide 5%, Squalane',
      'Origin': 'Formulated in Grasse, France'
    },
    variants: [
      { name: 'Standard Ritual (60ml + 50ml)' },
      { name: 'Concentrate Serum Only (60ml)', priceModifier: -35 },
      { name: 'Grand Deluxe Set (100ml + 100ml)', priceModifier: 45 }
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true
  },
  {
    id: 'cosm-02',
    name: 'Éclat D’Or Haute Parfumerie Flacon',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics & Beauty',
    subtitle: 'Rare artisanal extrait de parfum infused with Madagascan vanilla and smoky ambergris',
    price: 165,
    originalPrice: 195,
    image: '/src/assets/images/product_perfume_luxury_1793011669951.jpg',
    badge: 'Limited Edition',
    description: 'An evocative olfactory journey combining top notes of sunlit bergamot and pink pepper with a velvety heart of Damask rose, resting on an opulent base of royal oud, raw amber, and bourbon vanilla.',
    features: [
      'Hand-cut heavy crystal flacon with knurled brass cap',
      'High concentration 28% Extrait de Parfum for 16+ hour longevity',
      'Master perfumer small-batch distillation',
      'Presented in a velvet-lined magnetic gift presentation case'
    ],
    specs: {
      'Concentration': 'Extrait de Parfum (28%)',
      'Bottle Size': '100ml / 3.4 fl. oz.',
      'Sillage': 'Intense & memorable',
      'Olfactory Family': 'Warm Amber Floriental'
    },
    variants: [
      { name: '100ml Crystal Flacon' },
      { name: '50ml Travel Flacon', priceModifier: -45 },
      { name: 'Collector Edition 200ml with Solid Perfume', priceModifier: 95 }
    ],
    inStock: true,
    stockCount: 12,
    rating: 5.0,
    reviewCount: 98,
    isFeatured: true
  },
  {
    id: 'cosm-03',
    name: 'Velours Royale Matte Lip Elixir',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics & Beauty',
    subtitle: 'Ultra-pigmented hydrating liquid velvet formula with soft-focus blurring effect',
    price: 36,
    originalPrice: 42,
    image: '/src/assets/images/product_cosmetics_luxury_1793011668956.jpg',
    badge: 'Trending',
    description: 'Delivers intense, feather-light matte color that never settles into lines or dries out lips. Enriched with Moroccan argan oil and vitamin E for a supple all-day finish.',
    features: [
      '12-hour transfer-resistant wear',
      'Precision teardrop applicator for crisp contouring',
      'Infused with antioxidant botanical oils',
      'Available in signature timeless nude and couture red shades'
    ],
    specs: {
      'Finish': 'Velvet Soft Matte',
      'Volume': '6.5ml',
      'Texture': 'Weightless Whipped Mousse'
    },
    variants: [
      { name: 'Shade 01: Parisian Nude' },
      { name: 'Shade 02: Scarlet Imperial' },
      { name: 'Shade 03: Cashmere Rose' },
      { name: 'Shade 04: Dark Berry Noir' }
    ],
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: 'cosm-04',
    name: 'Caviar & 24K Gold Restorative Eye Matrix',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics & Beauty',
    subtitle: 'Intensive firming eye cream with colloidal gold and micro-peptide complex',
    price: 74,
    originalPrice: 90,
    image: '/src/assets/images/product_perfume_luxury_1793011669951.jpg',
    badge: 'New Arrival',
    description: 'Visibly reduces dark circles, puffiness, and fine lines around the delicate orbital area within 14 days of continued application.',
    features: [
      'Cooling surgical steel massage applicator tip',
      'Sustainably sourced royal caviar extract',
      'Fragrance-free formula tested by ophthalmologists'
    ],
    specs: {
      'Volume': '15ml',
      'Application': 'Morning and evening ritual'
    },
    variants: [
      { name: 'Standard Pot (15ml)' },
      { name: 'Twin Pack (2 x 15ml)', priceModifier: 55 }
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviewCount: 54
  },

  // 2. BRANDED CLOTHES & APPAREL
  {
    id: 'app-01',
    name: 'Bespoke Emerald Tailored Velvet Suit',
    category: 'apparel',
    categoryLabel: 'Branded Apparel',
    subtitle: 'Double-breasted Italian velvet blazer with matching high-rise wide-leg trousers',
    price: 320,
    originalPrice: 380,
    image: '/src/assets/images/product_apparel_couture_1793011669251.jpg',
    badge: 'Best Seller',
    description: 'Masterfully crafted from deep emerald Italian cotton-silk velvet with sculpted peaked lapels, genuine horn buttons, and handcrafted interior silk lining. Designed for discerning galas, fashion soirées, and power tailoring.',
    features: [
      '100% Italian silk-cotton plush velvet',
      'Structured shoulder padding with bespoke interior canvassing',
      'Wide-leg trousers with pressed front crease and hidden side zip',
      'Hand-finished pick stitching along lapel edges'
    ],
    specs: {
      'Material': '85% Cotton, 15% Silk Velvet / Lining: 100% Cupro Silk',
      'Cut': 'Tailored Structured Fit',
      'Care': 'Specialist dry clean only',
      'Origin': 'Tailored in Milan atelier'
    },
    variants: [
      { name: 'Size 36 (US 4 / Small)' },
      { name: 'Size 38 (US 6 / Medium)' },
      { name: 'Size 40 (US 8 / Large)' },
      { name: 'Size 42 (US 10 / X-Large)' },
      { name: 'Custom Made-to-Measure', priceModifier: 60 }
    ],
    inStock: true,
    stockCount: 8,
    rating: 5.0,
    reviewCount: 76,
    isFeatured: true
  },
  {
    id: 'app-02',
    name: 'ORNEL Signature Wool-Cashmere Atelier Coat',
    category: 'apparel',
    categoryLabel: 'Branded Apparel',
    subtitle: 'Sculptural belted silhouette in charcoal virgin wool with gold chain accents',
    price: 410,
    originalPrice: 490,
    image: '/src/assets/images/hero_fashion_luxury_1793011667944.jpg',
    badge: 'Limited Edition',
    description: 'A monument to modern minimalist elegance. Cut with clean architectural lines, cinched waist, and fine jewelry chain detailing, this heirloom-grade coat protects with quiet authority.',
    features: [
      'Heavyweight 750gsm virgin wool blended with Mongolian cashmere',
      'Removable gold-plated chain brooch and waist cinch belt',
      'Deep slash welt pockets with fleece lining',
      'Horn button cuffs and storm collar'
    ],
    specs: {
      'Composition': '70% Virgin Wool, 30% Cashmere',
      'Length': 'Mid-calf (115cm)',
      'Hardware': '18K Gold Plated Zinc Alloy'
    },
    variants: [
      { name: 'Size S (EU 36)' },
      { name: 'Size M (EU 38)' },
      { name: 'Size L (EU 40)' },
      { name: 'Size XL (EU 42)' }
    ],
    inStock: true,
    stockCount: 6,
    rating: 4.9,
    reviewCount: 43,
    isFeatured: true
  },
  {
    id: 'app-03',
    name: 'Silk Charmeuse Pussy-Bow Runway Blouse',
    category: 'apparel',
    categoryLabel: 'Branded Apparel',
    subtitle: 'Pure mulberry silk blouse with dramatic draped scarf collar and french cuffs',
    price: 145,
    originalPrice: 175,
    image: '/src/assets/images/product_apparel_couture_1793011669251.jpg',
    badge: 'Trending',
    description: 'Fluid, luminous 22-momme mulberry silk draping seamlessly against the skin. Features elongated button cuffs and versatile tie collar that can be styled into a bow or left dramatically cascading.',
    features: [
      '100% Pure Mulberry Silk Charmeuse',
      'Mother-of-pearl engraved buttons',
      'French seam construction throughout'
    ],
    specs: {
      'Weight': '22 Momme Silk',
      'Fit': 'Relaxed Fluid Silhouette'
    },
    variants: [
      { name: 'Champagne Ivory · Small' },
      { name: 'Champagne Ivory · Medium' },
      { name: 'Champagne Ivory · Large' },
      { name: 'Midnight Onyx · Medium' }
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 39
  },
  {
    id: 'app-04',
    name: 'Monogrammed Structured Box Leather Handbag',
    category: 'accessories',
    categoryLabel: 'Branded Apparel',
    subtitle: 'Hand-burnished calfskin leather bag with architectural brass top handle and strap',
    price: 240,
    originalPrice: 285,
    image: '/src/assets/images/hero_fashion_luxury_1793011667944.jpg',
    badge: 'New Arrival',
    description: 'Impeccable structural leather construction, designed to preserve its iconic geometry through years of daily use. Includes detachable crossbody strap and custom microfiber organizer.',
    features: [
      'Full-grain Tuscan box calf leather',
      'Solid brushed brass clasp and feet studs',
      'Dual accordion compartments with zipper coin pocket'
    ],
    specs: {
      'Dimensions': '24cm x 18cm x 9cm',
      'Strap Drop': '52cm (Adjustable)'
    },
    variants: [
      { name: 'Forest Noir with Gold Brass' },
      { name: 'Cognac Saddle with Gold Brass' },
      { name: 'Trench Beige with Silver Chrome' }
    ],
    inStock: true,
    stockCount: 11,
    rating: 4.9,
    reviewCount: 51
  },

  // 3. CASH SYSTEMS / POS & RETAIL CHECKOUT HARDWARE
  {
    id: 'pos-01',
    name: 'Arisan Touch POS Smart Terminal & Cash Desk System',
    category: 'cash-systems',
    categoryLabel: 'Cash Systems & POS',
    subtitle: 'Commercial touch POS terminal with high-speed receipt printer, scanner & steel cash drawer',
    price: 495,
    originalPrice: 580,
    image: '/src/assets/images/product_cash_system_pos_1793011669771.jpg',
    badge: 'Commercial Grade',
    description: 'The premier cashier and point-of-sale solution engineered for fashion boutiques, luxury cosmetic shops, and high-traffic retail counters. Includes full touchscreen terminal, thermal receipt printer, omnidirectional 2D barcode scanner, and heavy-gauge reinforced cash drawer with RJ11 auto-trigger.',
    features: [
      '15.6" Full HD capacitive multi-touch merchant display with customer mirror screen',
      'Built-in 80mm thermal receipt printer with auto-cutter (250mm/sec speed)',
      'Heavy-duty 5-bill / 8-coin steel cash drawer with 3-position lock & key',
      'Supports Cash, Mobile Money (MTN MoMo & Orange Money), and EMV Card Readers',
      'Pre-installed offline & cloud inventory management software with zero monthly lock-in',
      '1-Year direct hardware warranty & dedicated technical onboarding'
    ],
    specs: {
      'Display': '15.6" IPS Touch (1920x1080) + 10.1" Customer Screen',
      'Processor / OS': 'Intel Quad-Core 2.4GHz / Windows 11 Pro & Android Dual-Boot',
      'Printer': '80mm Thermal Receipt with USB + Ethernet + Bluetooth',
      'Cash Drawer': 'Solid steel construction, 410W x 420D x 100H mm',
      'Warranty': '12 Months replacement warranty + phone/WhatsApp support'
    },
    variants: [
      { name: 'Complete Retail Bundle (Terminal + Printer + Drawer + Scanner)' },
      { name: 'Touch POS Terminal & Printer Only', priceModifier: -120 },
      { name: 'Dual Screen Enterprise POS System (with Dual Customer Display)', priceModifier: 80 }
    ],
    inStock: true,
    stockCount: 14,
    rating: 5.0,
    reviewCount: 88,
    isFeatured: true
  },
  {
    id: 'pos-02',
    name: 'Heavy-Duty Electronic Cash Drawer with Microswitch',
    category: 'cash-systems',
    categoryLabel: 'Cash Systems & POS',
    subtitle: 'Industrial-grade ball bearing cash vault drawer with RJ11 printer interface',
    price: 85,
    originalPrice: 105,
    image: '/src/assets/images/product_cash_system_pos_1793011669771.jpg',
    badge: 'Best Seller',
    description: 'Built to withstand over 1.5 million cashier operations. Thick cold-rolled steel housing with polyurethane rollers ensures ultra-quiet and smooth drawer glide, with adjustable coin trays and dual check media slots.',
    features: [
      'Standard RJ11 / RJ12 cable connects directly to any receipt printer or POS terminal',
      '5 Adjustable banknote slots with heavy spring-loaded metal wire grippers',
      '8 Removable coin compartments for rapid reconciliation',
      'Key lock modes: Manual open, Electronic POS auto-kick, Locked shut'
    ],
    specs: {
      'Dimensions': '410mm (W) x 415mm (D) x 100mm (H)',
      'Weight': '6.8 kg solid steel',
      'Voltage': '12V / 24V compatible'
    },
    variants: [
      { name: 'Matte Charcoal Black' },
      { name: 'Arctic Boutique White', priceModifier: 10 }
    ],
    inStock: true,
    stockCount: 26,
    rating: 4.9,
    reviewCount: 112
  },
  {
    id: 'pos-03',
    name: 'OmniScan 2D Hands-Free Boutique Barcode Scanner',
    category: 'cash-systems',
    categoryLabel: 'Cash Systems & POS',
    subtitle: 'High-speed omnidirectional barcode & QR scanner with auto-sense infrared trigger',
    price: 72,
    originalPrice: 89,
    image: '/src/assets/images/product_cash_system_pos_1793011669771.jpg',
    badge: 'Trending',
    description: 'Instantly reads product clothing tags, small cosmetic barcodes, and smartphone customer payment screens with zero lag. Compact footprint fits seamlessly beside your cashier terminal.',
    features: [
      'Plug-and-play USB connection, no driver installation required',
      'Reads 1D UPC/EAN and 2D QR codes even if wrinkled, reflective, or dimmed',
      'Adjustable pitch angle head with pleasant tone feedback'
    ],
    specs: {
      'Scan Rate': '2400 scans per second',
      'Connectivity': 'USB 2.0 / USB-C adapter included',
      'Compatibility': 'Windows, Mac, Android POS, Linux'
    },
    variants: [
      { name: 'Desktop Hands-Free Scanner' },
      { name: 'Wireless Bluetooth Handheld Gun with Base', priceModifier: 25 }
    ],
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviewCount: 64
  },
  {
    id: 'pos-04',
    name: 'Pro-Thermal 80mm High-Speed Receipt & Order Printer',
    category: 'cash-systems',
    categoryLabel: 'Cash Systems & POS',
    subtitle: 'Silent ultra-fast thermal printer with auto-cutter, USB, LAN & Bluetooth',
    price: 115,
    originalPrice: 135,
    image: '/src/assets/images/product_cash_system_pos_1793011669771.jpg',
    badge: 'Commercial Grade',
    description: 'Never run out of ink again. Uses inkless direct thermal technology to print sharp sales receipts, custom boutique logos, and QR codes at blazing 260mm/s speeds.',
    features: [
      'Drop-in paper loading with 80mm standard paper roll capacity',
      'Supports customized store logo, return policies, and cashier names',
      'Integrated RJ11 cash drawer trigger port',
      'Auto-cutter rated for 1.8 million clean cuts'
    ],
    specs: {
      'Print Speed': '260 mm/s',
      'Interfaces': 'USB + Ethernet LAN + Serial + Cash Drawer Port',
      'Resolution': '203 DPI'
    },
    variants: [
      { name: 'USB + LAN Standard Model' },
      { name: 'USB + LAN + Wireless Bluetooth Model', priceModifier: 20 }
    ],
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewCount: 77
  }
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Collections' },
  { id: 'cosmetics', label: 'Cosmetics & Beauty' },
  { id: 'apparel', label: 'Branded Apparel' },
  { id: 'cash-systems', label: 'Cash Systems & POS' }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  XAF: { symbol: 'FCFA', rate: 615, label: 'XAF (FCFA)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' }
};
