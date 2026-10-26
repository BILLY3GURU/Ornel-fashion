import React from 'react';
import { useShop } from '../context/ShopContext';
import { Cpu, CheckCircle2, ShieldCheck, Wrench, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, generateCashSystemQuoteMessage } from '../utils/whatsapp';

export const CashSystemsSpotlight: React.FC = () => {
  const { products, addToCart, formatPrice, setQuickViewProduct } = useShop();

  const posProduct = products.find(p => p.id === 'pos-01');

  const handleAddBundle = () => {
    if (posProduct) {
      addToCart(posProduct, 1, 'Complete Retail Bundle (Terminal + Printer + Drawer + Scanner)');
    }
  };

  const handleQuickView = () => {
    if (posProduct) {
      setQuickViewProduct(posProduct);
    }
  };

  const whatsappQuoteMsg = generateCashSystemQuoteMessage(
    "Arisan Touch POS Smart Terminal & Complete Cash Desk Package",
    "Fashion & Cosmetics Boutique"
  );
  const whatsappUrl = createWhatsAppUrl(whatsappQuoteMsg);

  return (
    <section className="py-16 sm:py-24 bg-[#141413] text-stone-100 overflow-hidden relative">
      {/* Background architectural aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Presentation */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-stone-800 bg-stone-900/60 shadow-2xl group">
              <img
                src="/src/assets/images/product_cash_system_pos_1793011669771.jpg"
                alt="ORNEL Fashion Cash Systems & Commercial Touch POS Desk Setup"
                className="w-full aspect-[4/3] object-cover group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-950/80 backdrop-blur-md rounded border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block">
                    Turnkey Cashier Architecture
                  </span>
                  <span className="font-serif text-sm font-semibold text-white">
                    Touch POS Terminal + Vault Drawer + Thermal Printer
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-stone-400 block">From</span>
                  <span className="text-sm font-bold text-emerald-400">
                    {posProduct ? formatPrice(posProduct.price) : '$495'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical & Retail Value */}
          <div className="lg:col-span-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>ORNEL Retail Intelligence Division</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Modern Cash Systems & POS for Thriving Boutiques
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
              Elevate your boutique’s checkout experience. We engineer and supply heavy-duty cash desk hardware, capacitive touchscreen POS registers, and instant barcode systems configured to handle cash, card, and local mobile money with zero operational friction.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual-screen customer display</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Heavy-gauge 5-bill steel cash drawer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Blazing 250mm/s thermal receipt printer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1D/2D QR & garment tag barcode scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-Year comprehensive hardware warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Complimentary technician setup support</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Quotation on WhatsApp</span>
              </a>

              <button
                onClick={handleAddBundle}
                className="px-6 py-3.5 bg-white text-stone-950 hover:bg-stone-200 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Bundle To Bag</span>
              </button>

              <button
                onClick={handleQuickView}
                className="text-xs text-stone-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                View Full Hardware Specs
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
