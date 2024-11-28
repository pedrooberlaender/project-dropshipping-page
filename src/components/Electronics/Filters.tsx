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

const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'notebooks', label: 'Notebooks' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'acessorios', label: 'Acessórios para PC' },
  { value: 'componentes', label: 'Componentes' }
];

const brands = ['Apple', 'Samsung', 'Dell', 'Lenovo', 'Asus', 'Acer', 'HP', 'Logitech', 'Razer', 'Corsair'];

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? 'all' : section);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-6 sticky top-4">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Filtros</h2>

      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-200">Buscar</h3>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 
                   bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                   placeholder-slate-400 dark:placeholder-slate-500
                   transition-all duration-200"
        />
      </div>

      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-lg font-semibold mb-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          <span>Categorias</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
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
          className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${
            expandedSection === 'categories' || expandedSection === 'all' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-lg font-semibold mb-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          <span>Faixa de Preço</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
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
          className={`space-y-4 transition-all duration-300 ease-in-out overflow-hidden ${
            expandedSection === 'price' || expandedSection === 'all' ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>R$ {priceRange[0].toLocaleString('pt-BR')}</span>
            <span>R$ {priceRange[1].toLocaleString('pt-BR')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="15000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-indigo-600 dark:accent-indigo-400"
          />
        </div>
      </div>

      {/* Brands */}
      <div>
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-lg font-semibold mb-2 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
        >
          <span>Marcas</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
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
          className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${
            expandedSection === 'brands' || expandedSection === 'all' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="rounded border-slate-300 dark:border-slate-600 
                         text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         bg-white dark:bg-slate-700
                         transition-colors duration-200"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
