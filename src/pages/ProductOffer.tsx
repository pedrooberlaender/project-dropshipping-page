import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import type { Product } from '../types/product';

// Mock data - Substituir por dados reais da API
const mockProduct: Product = {
  id: '1',
  name: 'Smart TV OLED 55"',
  price: 3999.90,
  originalPrice: 4999.90,
  image: '/placeholder-product.jpg',
  brand: 'LG',
  category: 'tvs',
  isPromotion: true,
  specifications: {
    resolution: '4K',
    screenSize: '55 polegadas',
    smartFeatures: 'WebOS, ThinQ AI'
  }
};

const ProductOffer = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [productId]);

  // Em um cenário real, você buscaria os dados do produto usando o productId
  const product = mockProduct;

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase' && quantity < 5) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const calculateInstallments = (price: number) => {
    const installmentValue = price / 12;
    return formatPrice(installmentValue);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagem do Produto */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden bg-white cursor-pointer hover:ring-2 hover:ring-indigo-500"
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} - Vista ${index}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                    Em Promoção
                  </span>
                  <span className="text-red-600 text-sm font-medium">
                    Oferta por tempo limitado
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-500 mt-1">Marca: {product.brand}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-indigo-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">
                  Em até 12x de {calculateInstallments(product.price)} sem juros
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor
                  </label>
                  <div className="flex gap-2">
                    {['black', 'silver', 'blue'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`
                          w-8 h-8 rounded-full
                          ${color === 'black' ? 'bg-gray-900' : ''}
                          ${color === 'silver' ? 'bg-gray-400' : ''}
                          ${color === 'blue' ? 'bg-blue-600' : ''}
                          ${selectedColor === color ? 'ring-2 ring-offset-2 ring-indigo-600' : ''}
                        `}
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
                        onClick={() => handleQuantityChange('decrease')}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange('increase')}
                        className="p-2 hover:bg-gray-100"
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
                <button
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Adicionar ao Carrinho
                </button>
                <button
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Especificações do Produto */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Especificações:</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-4">
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOffer;
