import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingBag, MessageCircle, Heart, Check, ShieldCheck, Truck } from 'lucide-react';
import { generateProductInquiryMessage, createWhatsAppUrl } from '../utils/whatsapp';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    isWishlisted,
    toggleWishlist
  } = useShop();

  if (!quickViewProduct) return null;

  const [activeImage, setActiveImage] = useState<string>(quickViewProduct.image);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    quickViewProduct.variants?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');

  const allImages = [
    quickViewProduct.image,
    ...(quickViewProduct.additionalImages || [])
  ];

  const isFavorite = isWishlisted(quickViewProduct.id);

  // Calculate price with variant modifier if any
  let currentPrice = quickViewProduct.price;
  if (selectedVariant && quickViewProduct.variants) {
    const v = quickViewProduct.variants.find(item => item.name === selectedVariant);
    if (v?.priceModifier) {
      currentPrice += v.priceModifier;
    }
  }

  const formattedPrice = formatPrice(currentPrice);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedVariant);
    setQuickViewProduct(null);
  };

  const whatsappMessage = generateProductInquiryMessage(
    quickViewProduct.name,
    formattedPrice,
    selectedVariant
  );
  const whatsappUrl = createWhatsAppUrl(whatsappMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image Frame & Thumbnails */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col justify-between p-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-200">
              <img
                src={activeImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (quickViewProduct.additionalImages && quickViewProduct.additionalImages.length > 0 && target.src !== quickViewProduct.additionalImages[0]) {
                    target.src = quickViewProduct.additionalImages[0];
                  }
                }}
              />
              {quickViewProduct.badge && (
                <div className="absolute top-3 left-3 bg-stone-950 text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                  {quickViewProduct.badge}
                </div>
              )}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-stone-700 hover:text-red-600 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnails if multiple images exist */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-stone-900 shadow-sm scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Product view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category */}
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                {quickViewProduct.categoryLabel}
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-bold text-stone-950 mb-2">
                {quickViewProduct.name}
              </h2>

              {/* Subtitle */}
              <p className="text-xs text-stone-500 mb-3">
                {quickViewProduct.subtitle}
              </p>

              {/* Rating & Stock */}
              <div className="flex items-center justify-between text-xs text-stone-600 mb-4 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                  <span className="font-semibold text-stone-800">{quickViewProduct.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({quickViewProduct.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock ({quickViewProduct.stockCount} units available)</span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-mono font-bold text-stone-950">
                  {formattedPrice}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Variant Selector (if any) */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Select Option / Sizing:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {quickViewProduct.variants.map((v) => (
                      <button
                        key={v.name}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`text-left text-xs px-3 py-2.5 rounded border transition-all flex items-center justify-between ${
                          selectedVariant === v.name
                            ? 'border-stone-900 bg-stone-900 text-white font-medium'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-stone-50'
                        }`}
                      >
                        <span>{v.name}</span>
                        {v.priceModifier ? (
                          <span className="text-[11px] opacity-80 font-mono">
                            {v.priceModifier > 0 ? `+${formatPrice(v.priceModifier)}` : `-${formatPrice(Math.abs(v.priceModifier))}`}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm hover:bg-stone-100 text-stone-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm hover:bg-stone-100 text-stone-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag · {formattedPrice}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp (+237 654 049 049)</span>
                </a>
              </div>

              {/* Tabs: Description vs Technical Specs */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-3">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-1 border-b-2 transition-colors ${
                      activeTab === 'description'
                        ? 'border-stone-900 text-stone-950'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-1 border-b-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'border-stone-900 text-stone-950'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    Specifications
                  </button>
                </div>

                {activeTab === 'description' ? (
                  <div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      {quickViewProduct.description}
                    </p>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {quickViewProduct.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    {quickViewProduct.specs ? (
                      Object.entries(quickViewProduct.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-1 border-b border-stone-100">
                          <span className="text-stone-500">{key}</span>
                          <span className="font-medium text-stone-900">{val}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-stone-500">Standard specifications apply.</p>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Micro reassurance footer */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Showroom Inspected</span>
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-500" />
                <span>Express Cameroon & Global Delivery</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
