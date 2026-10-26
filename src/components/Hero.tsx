import React from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Cpu, Award } from 'lucide-react';
import { createWhatsAppUrl, ORNEL_WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { scrollToCatalog } = useShop();

  return (
    <section className="relative overflow-hidden bg-[#F6F4ED] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet text kicker - NO PILL */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 mb-4">
              <span>Haute Couture</span>
              <span aria-hidden="true">·</span>
              <span>Organic Beauty</span>
              <span aria-hidden="true">·</span>
              <span>Retail Cash POS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.1] mb-6 text-balance">
              Where Couture Fashion Meets Pure Cosmetics & Smart Cash Systems.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-light">
              Welcome to <strong className="font-medium text-stone-900">ORNEL Fashion</strong>. Discover our curated collections of rare artisanal cosmetics, tailored designer garments, and commercial-grade POS cash handling systems for modern luxury retailers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => scrollToCatalog('all')}
                className="px-6 py-3.5 bg-stone-950 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-800 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={createWhatsAppUrl("Hello ORNEL Fashion sales team! I am browsing your new collections on the website and would like immediate assistance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Sales Concierge</span>
              </a>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-stone-900 block">Artisanal Formulas</span>
                  <span>Pure botanicals & extrait</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-stone-900 block">Designer Tailoring</span>
                  <span>Handcrafted luxury fabrics</span>
                </div>
              </div>
              <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                <Cpu className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-stone-900 block">Retail POS Systems</span>
                  <span>1-Yr warranty & setup</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High Fashion Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Campaign Editorial Frame */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-200 shadow-xl border border-stone-300/60">
                <img
                  src="/src/assets/images/hero_fashion_luxury_1793011667944.jpg"
                  alt="ORNEL Fashion Haute Couture Editorial Campaign"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle scrim & lower caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                  <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                    Atelier Spotlight
                  </span>
                  <p className="font-serif text-lg font-medium leading-snug">
                    Bespoke Tailoring & Fine Jewellery Collection
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-stone-300 font-mono">
                    <span>Douala & Yaoundé Salons</span>
                    <span className="text-emerald-400 font-medium">WhatsApp: {ORNEL_WHATSAPP_DISPLAY}</span>
                  </div>
                </div>
              </div>

              {/* Secondary architectural detail tag */}
              <div className="absolute -bottom-4 -left-4 hidden sm:block bg-white p-4 rounded shadow-lg border border-stone-200 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wide">
                    Verified Authentic
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  All garments, beauty extracts, and cash desk hardware undergo rigorous showroom inspection before dispatch.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
