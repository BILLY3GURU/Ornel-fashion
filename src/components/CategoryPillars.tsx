import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const CategoryPillars: React.FC = () => {
  const { scrollToCatalog } = useShop();

  const PILLARS = [
    {
      id: 'cosmetics',
      title: 'Cosmetics & Beauty',
      subtitle: 'Artisanal serums, extracted botanicals, French perfumery & velvet lips',
      image: '/src/assets/images/product_cosmetics_luxury_1793011668956.jpg',
      itemCount: '4 Curated Rituals',
      tag: 'Organic & Dermatological'
    },
    {
      id: 'apparel',
      title: 'Branded Clothes & Couture',
      subtitle: 'Crystal-embroidered modest abayas, halterneck evening gowns & bespoke tailoring',
      image: '/src/assets/images/ornel_showcase_1.jpg',
      itemCount: '7 Runway Essentials',
      tag: 'Atelier Couture & Modest'
    },
    {
      id: 'cash-systems',
      title: 'Cash Systems & POS',
      subtitle: 'Smart touch retail terminals, heavy-gauge steel cash drawers & barcode scanners',
      image: '/src/assets/images/product_cash_system_pos_1793011669771.jpg',
      itemCount: '4 Retail Hardware Solutions',
      tag: 'Commercial Hardware & Warranty'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 mb-2">
              Signature Divisions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
              The Three Pillars of ORNEL Fashion
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-md">
            From personal beauty rituals to prestigious wardrobe tailoring and seamless store checkout infrastructure.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="group bg-white rounded-lg overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                  {pillar.tag}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-stone-400 mb-1">
                    {pillar.itemCount}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-950 mb-2 group-hover:text-amber-800 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => scrollToCatalog(pillar.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-amber-700 transition-colors"
                  >
                    <span>View Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={createWhatsAppUrl(`Hello ORNEL Fashion, I would like to inquire specifically about your ${pillar.title} offerings.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 transition-colors p-1"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
