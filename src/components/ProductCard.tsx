import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import { generateProductInquiryMessage, createWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    setQuickViewProduct,
    isWishlisted,
    toggleWishlist
  } = useShop();

  const isFavorite = isWishlisted(product.id);
  const formattedPrice = formatPrice(product.price);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]?.name);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const whatsappMessage = generateProductInquiryMessage(
    product.name,
    formattedPrice,
    product.variants?.[0]?.name
  );
  const whatsappUrl = createWhatsAppUrl(whatsappMessage);

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-lg overflow-hidden border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Tag if available - Clean non-pill tag */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-red-600 transition-colors shadow-xs"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`}
          />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded shadow-sm backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-2 bg-stone-950 hover:bg-stone-800 text-white rounded shadow-sm transition-colors"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category kicker */}
          <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
            {product.categoryLabel}
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Subtitle / Short description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="font-medium text-stone-800">{product.rating.toFixed(1)}</span>
            <span className="text-stone-400">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-sm sm:text-base font-mono font-bold text-stone-900 tabular-nums">
              {formattedPrice}
            </div>
            {product.originalPrice && (
              <div className="text-xs font-mono text-stone-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Direct WhatsApp Inquiry for this item */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium rounded transition-colors"
            title="Ask sales team on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
