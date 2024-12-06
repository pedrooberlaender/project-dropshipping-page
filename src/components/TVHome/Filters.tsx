import React, { useState } from 'react';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedDiscountRanges: string[];
  setSelectedDiscountRanges: (ranges: string[]) => void;
}

export const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'smart-tvs', label: 'Smart TVs' },
  { value: 'projetores', label: 'Projetores' },
  { value: 'soundbars', label: 'Soundbars' },
  { value: 'streaming', label: 'Streaming' }
];

export const brands = [
  'Samsung',
  'LG',
  'Sony',
  'Epson',
  'Sonos',
  'Roku',
  'NVIDIA',
  'BenQ'
];

export const discountRanges = [
  { label: 'Até 10% OFF', value: '0-10' },
  { label: '10% a 20% OFF', value: '10-20' },
  { label: '20% a 30% OFF', value: '20-30' },
  { label: 'Acima de 30% OFF', value: '30-100' }
];

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedDiscountRanges,
  setSelectedDiscountRanges,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
  };

  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );

  return (
    <aside className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden sticky top-[15.5rem] w-88">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-violet-500">
        <h2 className="text-xl font-bold text-white">Filtros</h2>
      </div>

      <div className="p-5 space-y-7 overflow-hidden">
        <div className="space-y-7">
          {/* Categories */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>Categorias</span>
              </h3>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'categories' ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                expandedSection === 'categories' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-1 px-2 py-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedCategory === category.value
                          ? 'bg-indigo-600 dark:bg-indigo-400'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      <span className={`text-base transition-colors duration-200 ${
                        selectedCategory === category.value ? 'font-medium' : ''
                      }`}>
                        {category.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Faixa de Preço</span>
              </h3>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'price' ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`space-y-3 transition-all duration-300 ease-in-out ${
                expandedSection === 'price' ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  R$ {priceRange[0]}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  R$ {priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Marcas</span>
              </h3>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'brands' ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`space-y-3 transition-all duration-300 ease-in-out ${
                expandedSection === 'brands' ? 'opacity-100 max-h-[300px] overflow-y-auto pr-2' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  placeholder="Buscar marca..."
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-200 dark:border-slate-600 
                         bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         placeholder-slate-400 dark:placeholder-slate-500"
                />
                <svg
                  className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Brand list */}
              <div className="space-y-2">
                {filteredBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Promotions */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('promotions')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span>Promoções</span>
              </h3>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'promotions' ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`space-y-3 transition-all duration-300 ease-in-out ${
                expandedSection === 'promotions' ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              {discountRanges.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedDiscountRanges.includes(range.value)}
                    onChange={() => {
                      const newRanges = selectedDiscountRanges.includes(range.value)
                        ? selectedDiscountRanges.filter(r => r !== range.value)
                        : [...selectedDiscountRanges, range.value];
                      setSelectedDiscountRanges(newRanges);
                    }}
                    className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
