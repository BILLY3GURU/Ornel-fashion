import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleBatchInquiry = () => {
    let msg = `Hello ORNEL Fashion Sales Team,\n\nI have saved these items to my wishlist and would like to check availability:\n`;
    wishlistedProducts.forEach((p, idx) => {
      msg += `\n${idx + 1}. *${p.name}* (${p.categoryLabel}) — ${formatPrice(p.price)}`;
    });
    msg += `\n\nCould you please let me know current showroom stock and delivery schedule? Thank you!`;
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="font-serif text-lg font-bold">
              Saved Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any product in our catalog to save it for later review.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 rounded-lg border border-stone-200/80 bg-stone-50/60"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded bg-stone-100 shrink-0 cursor-pointer"
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="font-serif text-xs font-bold text-stone-900 line-clamp-1 hover:text-amber-800 cursor-pointer"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsWishlistOpen(false);
                        }}
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[11px] text-stone-400 block">
                      {product.categoryLabel}
                    </span>

                    <div className="text-xs font-mono font-bold text-stone-900 mt-1">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        addToCart(product, 1, product.variants?.[0]?.name);
                        toggleWishlist(product.id);
                      }}
                      className="px-3 py-1 bg-stone-950 text-white text-xs font-semibold rounded hover:bg-stone-800 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {wishlistedProducts.length > 0 && (
          <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-2">
            <button
              onClick={handleBatchInquiry}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire All via WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
