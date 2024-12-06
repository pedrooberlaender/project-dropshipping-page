import React from 'react';
import { Slider } from './Slider';

interface FiltersProps {
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  showPromoOnly: boolean;
  onPromoChange: (checked: boolean) => void;
}

export function Filters({
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
  categories,
  selectedCategories,
  onCategoryChange,
  showPromoOnly,
  onPromoChange,
}: FiltersProps) {
  return (
    <div className="space-y-8 p-4">
      {/* Filtro de Preço */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-slate-900 dark:text-slate-200 transition-colors duration-300">
          Preço
        </h3>
        <Slider
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={onPriceChange}
        />
        <div className="mt-3 flex items-center justify-between text-base text-slate-600 dark:text-slate-400 transition-colors duration-300">
          <span>R$ {priceRange[0].toFixed(2)}</span>
          <span>R$ {priceRange[1].toFixed(2)}</span>
        </div>
      </div>

      {/* Filtro de Promoções */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-slate-900 dark:text-slate-200 transition-colors duration-300">
          Promoções
        </h3>
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={showPromoOnly}
            onChange={(e) => onPromoChange(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-300"
          />
          <span className="text-lg text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            Mostrar apenas produtos em promoção
          </span>
        </label>
      </div>

      {/* Filtro de Categorias */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-slate-900 dark:text-slate-200 transition-colors duration-300">
          Categorias
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-300"
              />
              <span className="text-lg text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}