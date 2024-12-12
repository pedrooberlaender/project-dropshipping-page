import React from 'react';
import { Link } from 'react-router-dom';

export const FeaturedOffers: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Oferta 1 - Smartphones */}
        <Link to="/produtos/smartphones" className="group">
          <div className="relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-red-600 bg-red-100 rounded-full dark:bg-red-900/30 dark:text-red-400">
                  Oferta Especial
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Smartphones
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Toda linha Xiaomi com até 30% OFF
                </p>
                <button className="inline-flex items-center text-sm font-medium text-[#7C3AED] hover:text-[#6D28D9]">
                  Ver mais
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="relative w-32 h-32">
                <img
                  src="/images/redmi-note.png"
                  alt="Smartphone Xiaomi"
                  className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Oferta 2 - Notebooks */}
        <Link to="/produtos/notebooks" className="group">
          <div className="relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                  Lançamento
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Surface Laptop
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A partir de R$ 2.499,90
                </p>
                <button className="inline-flex items-center text-sm font-medium text-[#7C3AED] hover:text-[#6D28D9]">
                  Ver mais
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="relative w-32 h-32">
                <img
                  src="/images/surface-laptop.png"
                  alt="Microsoft Surface Laptop"
                  className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
