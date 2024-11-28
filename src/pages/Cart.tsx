import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const { state: { items }, removeFromCart, updateQuantity } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar itens baseado na busca
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Barra de Busca */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     text-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Conteúdo do Carrinho */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Seu carrinho de compras está vazio
            </h2>
            <Link
              to="/produtos"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md 
                       hover:bg-indigo-700 transition-colors duration-200
                       text-lg font-medium"
            >
              Conferir nossos produtos
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remover
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  R$ {items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
