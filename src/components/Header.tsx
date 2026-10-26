import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsInquiryOpen,
    searchQuery,
    setSearchQuery,
    scrollToCatalog
  } = useShop();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (category?: string) => {
    setIsMobileMenuOpen(false);
    scrollToCatalog(category);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToCatalog();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Search Bar Drawer if opened */}
      {isSearchOpen && (
        <div className="bg-white border-b border-stone-200 px-4 py-3 shadow-xs">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cosmetics, designer clothes, POS cash terminals..."
              className="w-full text-sm bg-transparent border-none focus:outline-none text-stone-900 placeholder:text-stone-400"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-stone-400 hover:text-stone-700 px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="text-xs uppercase tracking-wider font-semibold bg-stone-900 text-white px-3 py-1.5 rounded hover:bg-stone-800 shrink-0"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Main Navigation Bar complying with the Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* ZONE 1: Brand Wordmark (Single text element in display face) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-left"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 group-hover:text-stone-700 transition-colors">
                ORNEL
              </span>
              <span className="ml-2 text-xs tracking-[0.25em] uppercase font-light text-stone-500 font-sans">
                FASHION
              </span>
            </button>
          </div>

          {/* ZONE 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('all')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-stone-300"
            >
              Catalog
            </button>
            <button
              onClick={() => handleNavClick('cosmetics')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-stone-300"
            >
              Cosmetics & Beauty
            </button>
            <button
              onClick={() => handleNavClick('apparel')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-stone-300"
            >
              Branded Apparel
            </button>
            <button
              onClick={() => handleNavClick('cash-systems')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-stone-300"
            >
              Cash Systems & POS
            </button>
            <a
              href="#contact-seller"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-stone-300"
            >
              Contact Seller
            </a>
          </nav>

          {/* ZONE 3: Primary Action & Direct Affordances */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
              title="Search catalog"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Inquiries / Direct Messaging Drawer Trigger */}
            <button
              onClick={() => setIsInquiryOpen(true)}
              className="hidden sm:flex items-center gap-1.5 p-2 text-stone-700 hover:text-stone-950 transition-colors"
              title="Customer Inquiries & Messages"
              aria-label="Inquiries"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs font-medium hidden md:inline">Inquiries</span>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-700 hover:text-stone-950 transition-colors"
              title="Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: WhatsApp Sales Concierge */}
            <a
              href={createWhatsAppUrl("Hello ORNEL Fashion sales team, I would like to inquire about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded transition-all whitespace-nowrap shrink-0 shadow-xs"
            >
              <span>Sales Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 shadow-md transition-all">
          <div className="flex flex-col gap-4 text-base font-medium text-stone-800">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left py-2 border-b border-stone-100 hover:text-amber-800"
            >
              Browse Complete Catalog
            </button>
            <button
              onClick={() => handleNavClick('cosmetics')}
              className="text-left py-2 border-b border-stone-100 hover:text-amber-800"
            >
              Cosmetics & Luxury Beauty
            </button>
            <button
              onClick={() => handleNavClick('apparel')}
              className="text-left py-2 border-b border-stone-100 hover:text-amber-800"
            >
              Branded Clothes & Haute Couture
            </button>
            <button
              onClick={() => handleNavClick('cash-systems')}
              className="text-left py-2 border-b border-stone-100 hover:text-amber-800"
            >
              Cash Systems & Retail POS
            </button>
            <a
              href="#contact-seller"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 border-b border-stone-100 hover:text-amber-800"
            >
              Contact Seller & Showrooms
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsInquiryOpen(true);
              }}
              className="text-left py-2 border-b border-stone-100 hover:text-amber-800 flex items-center justify-between"
            >
              <span>Customer Inquiries & Messages</span>
              <MessageSquare className="w-4 h-4 text-stone-500" />
            </button>

            <div className="pt-2">
              <a
                href={createWhatsAppUrl("Hello ORNEL Fashion sales team, I am contacting you from the mobile website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded transition-colors"
              >
                <span>Chat On WhatsApp (+237 654 049 049)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
