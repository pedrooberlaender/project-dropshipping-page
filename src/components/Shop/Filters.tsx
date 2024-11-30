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
}

export function Filters({
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
  categories,
  selectedCategories,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="space-y-6">
      {/* Filtro de Preço */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200 transition-colors duration-300">
          Preço
        </h3>
        <Slider
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={onPriceChange}
        />
        <div className="mt-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
          <span>R$ {priceRange[0].toFixed(2)}</span>
          <span>R$ {priceRange[1].toFixed(2)}</span>
        </div>
      </div>

      {/* Filtro de Categorias */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200 transition-colors duration-300">
          Categorias
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 dark:text-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-300"
              />
              <span className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}