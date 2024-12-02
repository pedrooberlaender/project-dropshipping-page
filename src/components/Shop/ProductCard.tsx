import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export function ProductCard({ product }: { product: ProductProps }) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="group relative bg-slate-100 dark:bg-slate-800/50 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 space-y-2">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors" title="Adicionar aos favoritos">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">{product.category}</span>
        <h3 className="font-semibold mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 transition-colors duration-300">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-slate-900 dark:text-slate-200 transition-colors duration-300">{formatPrice(product.price)}</span>
          <button className="btn-primary p-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors" title="Adicionar ao carrinho">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}