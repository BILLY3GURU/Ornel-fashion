/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryPillars } from './components/CategoryPillars';
import { ShowroomSpotlight } from './components/ShowroomSpotlight';
import { ProductCatalog } from './components/ProductCatalog';
import { CashSystemsSpotlight } from './components/CashSystemsSpotlight';
import { ContactSellerSection } from './components/ContactSellerSection';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { IntegratedMessagingSystem } from './components/IntegratedMessagingSystem';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-900 selection:text-white">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Header Navigation following Top Bar Contract */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Editorial Campaign Hero */}
          <Hero />

          {/* 3 Pillars: Cosmetics, Apparel, Cash Systems */}
          <CategoryPillars />

          {/* New Showroom Collection Spotlight (Featuring Real Boutique Items) */}
          <ShowroomSpotlight />

          {/* Interactive Product Catalog with filters, search, quick view & direct WhatsApp inquiry */}
          <ProductCatalog />

          {/* Dedicated Retail Cash Systems & POS Spotlight */}
          <CashSystemsSpotlight />

          {/* Contact the Seller & Showroom Consultation Section */}
          <ContactSellerSection />
        </main>

        {/* Boutique Footer */}
        <Footer />

        {/* Modals, Drawers & Overlays */}
        <ProductQuickViewModal />
        <CartDrawer />
        <WishlistDrawer />
        <IntegratedMessagingSystem />
        <CheckoutModal />

        {/* Floating WhatsApp Quick Action Button (+237654049049) */}
        <FloatingWhatsAppButton />
      </div>
    </ShopProvider>
  );
}
