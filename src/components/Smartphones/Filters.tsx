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
}

export const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'iphone', label: 'iPhones' },
  { value: 'android', label: 'Android' },
  { value: 'basicos', label: 'Básicos' },
  { value: 'acessorios', label: 'Acessórios' }
];

export const brands = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'Motorola',
  'LG',
  'Asus',
  'OnePlus',
  'Huawei',
  'Google',
  'Sony',
  'Nokia',
  'Realme',
  'OPPO',
  'Vivo'
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
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('all');
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
    <aside className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden sticky top-[15.5rem] w-80">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-violet-500">
        <h2 className="text-xl font-bold text-white">Filtros</h2>
      </div>

      <div className={`${expandedSection === 'brands' ? 'overflow-y-auto' : 'overflow-hidden'} max-h-[calc(100vh-18rem)]`}>
        <div className="p-5 space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-base font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-2">
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
              className={`space-y-2 transition-all duration-300 ease-in-out ${
                expandedSection === 'categories' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm ${
                    selectedCategory === category.value
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    selectedCategory === category.value
                      ? 'bg-indigo-600 dark:bg-indigo-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-base font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-2">
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
              className={`space-y-4 transition-all duration-300 ease-in-out ${
                expandedSection === 'price' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                  <span className="text-sm text-gray-600 dark:text-gray-300">R$ {priceRange[0].toLocaleString('pt-BR')}</span>
                </div>
                <div className="h-[1px] w-4 bg-gray-300 dark:bg-gray-600" />
                <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                  <span className="text-sm text-gray-600 dark:text-gray-300">R$ {priceRange[1].toLocaleString('pt-BR')}</span>
                </div>
              </div>
              <div className="pt-1">
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:dark:bg-indigo-400
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                           [&::-webkit-slider-thumb]:hover:ring-2 [&::-webkit-slider-thumb]:hover:ring-indigo-200
                           [&::-webkit-slider-thumb]:dark:hover:ring-indigo-900"
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-base font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-2">
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
                expandedSection === 'brands' ? 'opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              {/* Brand Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar marcas..."
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 
                           bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100
                           focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                           placeholder-gray-400 dark:placeholder-gray-500
                           transition-all duration-200 text-sm"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                {filteredBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-3 px-4 py-2.5 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-gray-600
                                 checked:border-indigo-500 checked:bg-indigo-500 dark:checked:border-indigo-400 dark:checked:bg-indigo-400
                                 hover:border-indigo-500 dark:hover:border-indigo-400
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                                 transition-all duration-200"
                      />
                      <svg
                        className="pointer-events-none absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
