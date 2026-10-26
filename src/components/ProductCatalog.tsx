import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORY_FILTERS } from '../data/products';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'apparel') {
          return p.category === 'apparel' || p.category === 'accessories';
        }
        return p.category === selectedCategory;
      })
      .filter((p) => {
        // Search filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="product-catalog" className="py-16 sm:py-24 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 mb-2">
            The Complete Atelier & Hardware Store
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 mb-4">
            Curated Catalog & Immediate Availability
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Select any item for technical specifications, bespoke sizing, instant shopping bag addition, or one-click WhatsApp consultation with our direct sales agents.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          
          {/* Category Tabs (Segmented Button Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => {
              const count = products.filter(p => {
                if (cat.id === 'all') return true;
                if (cat.id === 'apparel') return p.category === 'apparel' || p.category === 'accessories';
                return p.category === cat.id;
              }).length;

              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-950 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter catalog..."
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded pl-8 pr-7 py-2 focus:outline-none focus:border-stone-500 text-stone-900"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-stone-50 border border-stone-200 rounded px-2.5 py-2 text-stone-700 focus:outline-none focus:border-stone-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results Counter / Active Query notice */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <div>
            Showing <span className="font-semibold text-stone-800">{filteredProducts.length}</span> of {products.length} products
            {searchQuery && (
              <span> matching "<span className="text-stone-900 font-medium">{searchQuery}</span>"</span>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-800 hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-lg border border-dashed border-stone-300">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">No matching products found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
              We couldn't find items matching your criteria. Try resetting the search or exploring our other collections.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-stone-800"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
