import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, MessageCircle, Eye, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { generateProductInquiryMessage, createWhatsAppUrl } from '../utils/whatsapp';

export const ShowroomSpotlight: React.FC = () => {
  const { products, formatPrice, setQuickViewProduct, addToCart } = useShop();

  // Find the user showcase products
  const showcaseIds = ['app-showcase-01', 'app-showcase-02', 'cosm-showcase-01', 'app-showcase-03'];
  const showcaseItems = products.filter(p => showcaseIds.includes(p.id));

  if (showcaseItems.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Showroom Collection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Fresh Boutique Releases & Glam Units
            </h2>
          </div>
          <p className="text-stone-300 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Live from our Akwa & Bastos showrooms: hand-beaded crystal abayas, sculptural halterneck evening dresses, and 100% virgin human hair HD lace units ready for immediate dispatch.
          </p>
        </div>

        {/* 4-Item Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item) => {
            const formattedPrice = formatPrice(item.price);
            const whatsappUrl = createWhatsAppUrl(
              generateProductInquiryMessage(item.name, formattedPrice, item.variants?.[0]?.name)
            );

            return (
              <div
                key={item.id}
                onClick={() => setQuickViewProduct(item)}
                className="group bg-stone-950/80 rounded-xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl"
              >
                {/* Image Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-amber-400 text-stone-950 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                      {item.badge}
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(item);
                      }}
                      className="flex-1 py-2 bg-white text-stone-950 text-xs font-semibold uppercase tracking-wider rounded shadow-md flex items-center justify-center gap-1.5 hover:bg-stone-100"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item, 1, item.variants?.[0]?.name);
                      }}
                      className="p-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded shadow-md transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 block mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3 font-light">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-mono font-bold text-white tabular-nums">
                        {formattedPrice}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[11px] font-mono text-stone-500 line-through block">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600/90 hover:bg-emerald-600 text-white text-[11px] font-medium rounded transition-colors"
                      title="Chat about this item on WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
