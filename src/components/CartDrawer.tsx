import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { createWhatsAppUrl, generateCartOrderMessage, ORNEL_WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    formatPrice,
    setIsCheckoutOpen,
    scrollToCatalog
  } = useShop();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 150; // in USD
  const deliveryDelta = freeDeliveryThreshold - cartSubtotal;
  const progressPercent = Math.min(100, Math.max(0, (cartSubtotal / freeDeliveryThreshold) * 100));

  const handleWhatsAppCheckout = () => {
    const itemsFormatted = cart.map(item => {
      let p = item.product.price;
      if (item.selectedVariant && item.product.variants) {
        const v = item.product.variants.find(va => va.name === item.selectedVariant);
        if (v?.priceModifier) p += v.priceModifier;
      }
      return {
        name: item.product.name,
        quantity: item.quantity,
        variant: item.selectedVariant,
        priceFormatted: formatPrice(p * item.quantity)
      };
    });

    const msg = generateCartOrderMessage(itemsFormatted, formatPrice(cartSubtotal));
    const url = createWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleStandardCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-lg font-bold">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#FAF9F5] px-5 py-3 border-b border-stone-200 text-xs">
          {deliveryDelta > 0 ? (
            <p className="text-stone-700 mb-1.5">
              Add <strong className="font-mono text-stone-900">{formatPrice(deliveryDelta)}</strong> more for complimentary delivery!
            </p>
          ) : (
            <p className="text-emerald-700 font-semibold mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>You qualified for complimentary luxury delivery!</span>
            </p>
          )}
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-700 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                Your bag is currently empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                Explore our curated cosmetics, designer dresses, or retail POS cash registers.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  scrollToCatalog('all');
                }}
                className="px-5 py-2.5 bg-stone-950 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              let unitPrice = item.product.price;
              if (item.selectedVariant && item.product.variants) {
                const v = item.product.variants.find(va => va.name === item.selectedVariant);
                if (v?.priceModifier) unitPrice += v.priceModifier;
              }

              return (
                <div
                  key={`${item.product.id}-${item.selectedVariant || 'default'}-${idx}`}
                  className="flex gap-4 p-3 rounded-lg border border-stone-200/80 bg-stone-50/60"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                          className="text-stone-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <span className="text-[11px] text-stone-500 block">
                          {item.selectedVariant}
                        </span>
                      )}

                      <div className="text-xs font-mono font-bold text-stone-900 mt-1">
                        {formatPrice(unitPrice * item.quantity)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-stone-200 rounded bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                          className="px-2 py-0.5 hover:bg-stone-100 text-stone-700"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 font-mono font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                          className="px-2 py-0.5 hover:bg-stone-100 text-stone-700"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-400">
                        @ {formatPrice(unitPrice)} each
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cart.length > 0 && (
          <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Subtotal:</span>
              <span className="text-xl font-mono font-bold text-stone-950">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <p className="text-[11px] text-stone-500">
              Taxes calculated at dispatch. Cash on Delivery (COD) & Mobile Money available.
            </p>

            {/* Primary Action 1: Instant WhatsApp Order */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp ({ORNEL_WHATSAPP_DISPLAY})</span>
            </button>

            {/* Primary Action 2: Standard Store Checkout Modal */}
            <button
              onClick={handleStandardCheckout}
              className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2"
            >
              <span>Standard Checkout (Cash on Delivery / Card)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
