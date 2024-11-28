import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useCart } from '../contexts/CartContext';
import { ChevronRight, Smartphone, Laptop, Gamepad, Headphones, Camera, Watch, Tv, Speaker, ArrowRight, Eye, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  discount?: number;
  isNew?: boolean;
  description: string;
}

// Definindo as categorias principais e suas subcategorias
const categories = {
  'Eletrônicos': {
    icon: <Laptop className="w-6 h-6 text-white" />,
    subcategories: ['Notebooks', 'Tablets', 'Acessórios']
  },
  'Smartphones': {
    icon: <Smartphone className="w-6 h-6 text-white" />,
    subcategories: ['Apple', 'Samsung', 'Xiaomi']
  },
  'Áudio': {
    icon: <Headphones className="w-6 h-6 text-white" />,
    subcategories: ['Fones', 'Caixas de Som']
  },
  'Fotografia': {
    icon: <Camera className="w-6 h-6 text-white" />,
    subcategories: ['Câmeras', 'Lentes']
  },
  'Games': {
    icon: <Gamepad className="w-6 h-6 text-white" />,
    subcategories: ['Consoles', 'Jogos']
  },
  'TV & Home': {
    icon: <Tv className="w-6 h-6 text-white" />,
    subcategories: ['Smart TVs', 'Home Theater']
  }
};

const products: Product[] = [
  // Eletrônicos
  {
    id: 1,
    name: 'MacBook Pro M2',
    brand: 'Apple',
    price: 12999.90,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80',
    category: 'Eletrônicos',
    subcategory: 'Notebooks',
    description: 'O notebook mais poderoso da Apple',
    isNew: true
  },
  {
    id: 2,
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    price: 9499.90,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80',
    category: 'Eletrônicos',
    subcategory: 'Tablets',
    discount: 10,
    description: 'A experiência definitiva em tablet'
  },
  {
    id: 3,
    name: 'Dell XPS 15',
    brand: 'Dell',
    price: 11999.90,
    image: 'https://images.unsplash.com/photo-1593642632823-797f1c22a38e?auto=format&fit=crop&q=80',
    category: 'Eletrônicos',
    subcategory: 'Notebooks',
    discount: 15,
    description: 'Performance excepcional para profissionais'
  },
  {
    id: 4,
    name: 'Samsung Galaxy Tab S9',
    brand: 'Samsung',
    price: 5999.90,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80',
    category: 'Eletrônicos',
    subcategory: 'Tablets',
    isNew: true,
    description: 'O tablet Android mais avançado'
  },
  // Smartphones
  {
    id: 5,
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    price: 7999.90,
    image: 'https://images.unsplash.com/photo-1678469816711-11d75dd4c1c1?auto=format&fit=crop&q=80',
    category: 'Smartphones',
    subcategory: 'Apple',
    isNew: true,
    description: 'O iPhone mais avançado já criado'
  },
  {
    id: 6,
    name: 'Samsung Galaxy S23 Ultra',
    brand: 'Samsung',
    price: 6999.90,
    image: 'https://images.unsplash.com/photo-1610945265064-0a8c4e0e7b1c?auto=format&fit=crop&q=80',
    category: 'Smartphones',
    subcategory: 'Samsung',
    discount: 15,
    description: 'Câmera de 200MP e S Pen incluída'
  }
];

export const FeaturedProducts = () => {
  const { navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState<{ [key: number]: boolean }>({});

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  const handleAddToCart = (productId: number) => {
    setIsAddingToCart(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setIsAddingToCart(prev => ({ ...prev, [productId]: false }));
    }, 1000);
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Elemento decorativo superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 dark:via-indigo-400/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="relative">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 mb-4 tracking-tight">
              Produtos em Destaque
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
              Confira nossa seleção especial de produtos com os melhores preços e condições.
            </p>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} 
                 className="group bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-100 dark:border-slate-700 min-h-[520px] w-full hover:scale-[1.02]">
              {/* Container da imagem com proporção fixa */}
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Badge de desconto */}
                {product.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                    -{product.discount}%
                  </div>
                )}
                {/* Badge de novo */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                    Novo
                  </div>
                )}
              </div>

              <div className="flex flex-col p-5">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {product.category} • {product.subcategory}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <div className="min-h-[60px]">
                    <div className="flex items-baseline gap-2 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                      </span>
                      {product.discount && (
                        <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: calculateDiscountedPrice(product.price, product.discount),
                        image: product.image
                      })}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isAddingToCart[product.id] ? 'Adicionado!' : 'Add carrinho'}
                    </button>
                    <button
                      onClick={() => navigateTo(`/produto/${product.id}`)}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão "Ver mais produtos" */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigateTo('/produtos')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-200 dark:border-slate-700"
          >
            <span>Ver mais produtos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};