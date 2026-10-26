import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ORNEL_WHATSAPP_DISPLAY, ORNEL_EMAIL, createWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const { scrollToCatalog, setIsInquiryOpen } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800/80">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                ORNEL FASHION
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-light block mt-1">
                Haute Couture · Cosmetics · Retail Cash Systems
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              Elevating lifestyle and retail enterprise. We combine Parisian & Milanese couture tailoring, artisanal botanical beauty formulations, and certified point-of-sale cash registers for luxury boutiques.
            </p>

            <div className="pt-2">
              <a
                href={createWhatsAppUrl("Hello ORNEL Fashion! I want to connect with your concierge team.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded border border-stone-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {ORNEL_WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Department Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => scrollToCatalog('cosmetics')}
                  className="hover:text-white transition-colors"
                >
                  Cosmetics & Beauty
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToCatalog('apparel')}
                  className="hover:text-white transition-colors"
                >
                  Branded Clothes & Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToCatalog('cash-systems')}
                  className="hover:text-white transition-colors"
                >
                  Cash Systems & POS Terminals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToCatalog('all')}
                  className="hover:text-white transition-colors"
                >
                  Complete Catalog
                </button>
              </li>
              <li>
                <a href="#contact-seller" className="hover:text-white transition-colors">
                  Contact the Seller
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Seller Showrooms & Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Seller & Showrooms
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <span className="text-stone-300 block font-medium">Akwa Showroom:</span>
                <span>Douala, Cameroon</span>
              </li>
              <li>
                <span className="text-stone-300 block font-medium">Bastos Salon:</span>
                <span>Yaoundé, Cameroon</span>
              </li>
              <li>
                <span className="text-stone-300 block font-medium">Direct Line:</span>
                <span className="font-mono text-emerald-400">{ORNEL_WHATSAPP_DISPLAY}</span>
              </li>
              <li>
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="text-amber-400 hover:underline flex items-center gap-1 mt-1"
                >
                  <span>Open Inquiries Desk</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Private Newsletter
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Receive previews of runway arrivals, skincare formulations, and boutique POS trade releases.
            </p>
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 p-2.5 rounded">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you for joining our private registry.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full text-xs bg-stone-900 border border-stone-700 rounded px-3 py-2 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} ORNEL Fashion. All rights reserved. Registered boutique & retail equipment enterprise.
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-stone-400 font-mono text-[11px]">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>MTN MoMo</span>
            <span>·</span>
            <span>Orange Money</span>
            <span>·</span>
            <span>Visa / Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
