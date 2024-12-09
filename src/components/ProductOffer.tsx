import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Heart } from 'lucide-react';

const ProductOffer = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex-1 px-6 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src="/images/smart-watch-pro.jpg"
                alt="Smart Watch Pro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((img) => (
                <div key={img} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={`/images/smart-watch-${img}.jpg`}
                    alt={`Smart Watch view ${img}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Promoção Limitada
              </span>
              <span className="text-red-600 text-sm font-medium">Termina em 12:45:30</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Smart Watch Pro Series 5
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">(128 avaliações)</span>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-indigo-600">R$ 899,90</span>
                <span className="text-lg text-gray-500 line-through">R$ 1.299,90</span>
              </div>
              <p className="text-gray-600">
                Em até 12x de R$ 74,99 sem juros
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor
                </label>
                <div className="flex gap-2">
                  {['bg-black', 'bg-gray-400', 'bg-indigo-600'].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ring-transparent hover:ring-indigo-600 transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Apenas 5 unidades disponíveis
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Destaques do Produto:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Monitoramento avançado de saúde 24/7</li>
                <li>✓ Bateria com duração de até 7 dias</li>
                <li>✓ Resistente à água (5ATM)</li>
                <li>✓ GPS integrado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOffer;
