import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Smartphone, Laptop, Gamepad, Headphones, Camera, Watch, Tv, Speaker, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { FiShoppingCart, FiEye } from 'react-icons/fi';

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
  },
  {
    id: 7,
    name: 'Xiaomi 13 Pro',
    brand: 'Xiaomi',
    price: 5999.90,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80',
    category: 'Smartphones',
    subcategory: 'Xiaomi',
    isNew: true,
    description: 'Tecnologia de ponta por menos'
  },
  {
    id: 8,
    name: 'iPhone 13',
    brand: 'Apple',
    price: 4999.90,
    image: 'https://images.unsplash.com/photo-1632661674596-618d8b64d641?auto=format&fit=crop&q=80',
    category: 'Smartphones',
    subcategory: 'Apple',
    discount: 20,
    description: 'Ainda um excelente smartphone'
  },

  // Áudio
  {
    id: 9,
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 2499.90,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80',
    category: 'Áudio',
    subcategory: 'Fones',
    discount: 10,
    description: 'O melhor fone Bluetooth premium'
  },
  {
    id: 10,
    name: 'AirPods Pro 2',
    brand: 'Apple',
    price: 1899.90,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80',
    category: 'Áudio',
    subcategory: 'Fones',
    isNew: true,
    description: 'Cancelamento de ruído adaptativo'
  },
  {
    id: 11,
    name: 'JBL Boombox 3',
    brand: 'JBL',
    price: 2199.90,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80',
    category: 'Áudio',
    subcategory: 'Caixas de Som',
    isNew: true,
    description: 'Som potente e bateria duradoura'
  },
  {
    id: 12,
    name: 'Marshall Stanmore II',
    brand: 'Marshall',
    price: 2799.90,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80',
    category: 'Áudio',
    subcategory: 'Caixas de Som',
    discount: 15,
    description: 'Som vintage com tecnologia moderna'
  },

  // Fotografia
  {
    id: 13,
    name: 'Sony A7 IV',
    brand: 'Sony',
    price: 12999.90,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    category: 'Fotografia',
    subcategory: 'Câmeras',
    isNew: true,
    description: 'Câmera mirrorless full-frame profissional'
  },
  {
    id: 14,
    name: 'Canon EOS R6',
    brand: 'Canon',
    price: 14999.90,
    image: 'https://images.unsplash.com/photo-1502920917128-a205069470b6?auto=format&fit=crop&q=80',
    category: 'Fotografia',
    subcategory: 'Câmeras',
    discount: 15,
    description: 'Alta performance para foto e vídeo'
  },
  {
    id: 15,
    name: 'Sony 24-70mm f/2.8',
    brand: 'Sony',
    price: 8999.90,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    category: 'Fotografia',
    subcategory: 'Lentes',
    isNew: true,
    description: 'A lente zoom padrão profissional'
  },
  {
    id: 16,
    name: 'Canon RF 50mm f/1.2',
    brand: 'Canon',
    price: 9999.90,
    image: 'https://images.unsplash.com/photo-1617005082337-35b6e88bd2c6?auto=format&fit=crop&q=80',
    category: 'Fotografia',
    subcategory: 'Lentes',
    discount: 10,
    description: 'Bokeh perfeito e nitidez excepcional'
  },

  // Games
  {
    id: 17,
    name: 'PlayStation 5 Digital',
    brand: 'Sony',
    price: 3999.90,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80',
    category: 'Games',
    subcategory: 'Consoles',
    discount: 20,
    description: 'Nova geração de jogos em 4K'
  },
  {
    id: 18,
    name: 'Xbox Series X',
    brand: 'Microsoft',
    price: 4299.90,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf433fd6eb7?auto=format&fit=crop&q=80',
    category: 'Games',
    subcategory: 'Consoles',
    isNew: true,
    description: 'O console mais poderoso da Microsoft'
  },
  {
    id: 19,
    name: 'God of War Ragnarök',
    brand: 'Sony',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1621784563330-caee0b138a00?auto=format&fit=crop&q=80',
    category: 'Games',
    subcategory: 'Jogos',
    isNew: true,
    description: 'A continuação da saga nórdica'
  },
  {
    id: 20,
    name: 'Starfield',
    brand: 'Bethesda',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1616856769992-0a8c4e0e7b1c?auto=format&fit=crop&q=80',
    category: 'Games',
    subcategory: 'Jogos',
    discount: 10,
    description: 'Explore o espaço em uma aventura épica'
  },

  // TV & Home
  {
    id: 21,
    name: 'Samsung Neo QLED 65"',
    brand: 'Samsung',
    price: 8999.90,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80',
    category: 'TV & Home',
    subcategory: 'Smart TVs',
    isNew: true,
    description: 'Qualidade de imagem extraordinária'
  },
  {
    id: 22,
    name: 'LG OLED C2 55"',
    brand: 'LG',
    price: 6999.90,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80',
    category: 'TV & Home',
    subcategory: 'Smart TVs',
    discount: 15,
    description: 'Cores perfeitas e contraste infinito'
  },
  {
    id: 23,
    name: 'Sonos Arc',
    brand: 'Sonos',
    price: 4999.90,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80',
    category: 'TV & Home',
    subcategory: 'Home Theater',
    isNew: true,
    description: 'Som surround Dolby Atmos premium'
  },
  {
    id: 24,
    name: 'Samsung HW-Q990C',
    brand: 'Samsung',
    price: 5999.90,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80',
    category: 'TV & Home',
    subcategory: 'Home Theater',
    discount: 20,
    description: 'Sistema de som 11.1.4 canais'
  }
];

export function FeaturedProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState<{ [key: number]: boolean }>({});

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: calculateDiscountedPrice(product.price, product.discount),
        image: product.image
      });
      setIsAddingToCart(prev => ({ ...prev, [productId]: true }));
      setTimeout(() => {
        setIsAddingToCart(prev => ({ ...prev, [productId]: false }));
      }, 1500);
    }
  };

  const handleProductClick = (productId: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    navigate(`/produto/${productId}`);
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
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 rounded-full mb-4 transform transition-all duration-300 group-hover:scale-110"></div>
            <p className="max-w-2xl text-slate-600 dark:text-slate-400 text-lg">
              Descubra nossa seleção exclusiva de produtos premium com os melhores preços e qualidade garantida.
            </p>
          </div>
        </div>

        {/* Grid responsivo de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 6).map((product) => (
            <div 
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-100 dark:border-slate-700 min-h-[520px] w-full hover:scale-[1.02] cursor-pointer"
            >
              {/* Container da imagem com proporção fixa */}
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badges de desconto e novidade */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full
                                   shadow-lg transform transition-transform duration-300 hover:scale-105">
                      Novo
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-rose-600 dark:bg-rose-500 text-white text-sm font-semibold px-3 py-1 rounded-full
                                   shadow-lg transform transition-transform duration-300 hover:scale-105">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Informações do produto */}
              <div className="flex flex-col p-5">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {product.category} • {product.subcategory}
                  </span>
                  <div className="space-y-1">
                    <span className="text-sm text-slate-900 dark:text-slate-100 font-medium mb-1 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {product.brand}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Preços e botões */}
                <div className="mt-auto pt-4">
                  <div className="min-h-[60px]">
                    <div className="flex items-baseline gap-2 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                      </span>
                      {product.discount && (
                        <span className="text-sm text-slate-500 dark:text-slate-400 line-through group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <div className="flex items-center mt-1 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 group-hover:text-green-500 dark:group-hover:text-green-300 transition-colors">
                          Economize {formatPrice(product.price - calculateDiscountedPrice(product.price, product.discount))}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {/* Ver Detalhes */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/produto/${product.id}`);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5
                              text-indigo-600 dark:text-indigo-400
                              bg-indigo-50 dark:bg-indigo-900/30 
                              hover:bg-indigo-100 dark:hover:bg-indigo-900/50
                              active:bg-indigo-200 dark:active:bg-indigo-900/70
                              px-3 py-2 rounded-lg
                              text-sm font-medium
                              transform transition-all duration-200 ease-in-out
                              hover:scale-[1.02]
                              min-w-[120px] h-[38px]"
                    >
                      <span>Ver Detalhes</span>
                      <FiEye className="w-4 h-4" />
                    </button>

                    {/* Adicionar ao Carrinho */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                      disabled={isAddingToCart[product.id]}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5
                              px-3 py-2 rounded-lg
                              text-sm font-medium
                              transform transition-all duration-200 ease-in-out
                              hover:scale-[1.02]
                              min-w-[120px] h-[38px]
                              disabled:cursor-not-allowed
                              ${isAddingToCart[product.id] 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                              }`}
                    >
                      {isAddingToCart[product.id] ? (
                        <>
                          <span>Adicionado!</span>
                          <FiShoppingCart className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Adicionar</span>
                          <FiShoppingCart className="w-4 h-4" />
                        </>
                      )}
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
            onClick={() => navigate('/produtos')}
            className="group relative inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl
                     font-medium border border-slate-200 dark:border-slate-700 shadow-sm
                     transform transition-all duration-300
                     hover:border-indigo-600/20 dark:hover:border-indigo-400/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            Ver mais produtos
            <svg 
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Seção de Avaliações */}
        <div className="relative mt-24 py-20 bg-gradient-to-b from-slate-50 via-slate-50/80 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-800 rounded-3xl">
          {/* Divisor decorativo superior */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 dark:via-indigo-400/10 to-transparent"></div>
          
          {/* Elemento decorativo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full p-4 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>

          {/* Conteúdo das avaliações */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Cabeçalho da seção */}
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                O Que Nossos Clientes Dizem
              </h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-6 h-6 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                4.9 de 5 estrelas | +1000 avaliações verificadas
              </p>
            </div>

            {/* Grid de avaliações */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Avaliação 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className="w-6 h-6 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                  "Excelente experiência de compra! Os produtos são de alta qualidade e chegaram antes do prazo previsto. O atendimento ao cliente foi excepcional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Maria Silva</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente verificado</p>
                  </div>
                </div>
              </div>

              {/* Avaliação 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className="w-6 h-6 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                  "Produtos incríveis e preços competitivos. A entrega foi super rápida e o produto superou minhas expectativas. Recomendo!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">João Santos</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente verificado</p>
                  </div>
                </div>
              </div>

              {/* Avaliação 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className="w-6 h-6 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
                  "Ótimo custo-benefício! A qualidade dos produtos é excelente e o processo de compra é muito simples. Voltarei a comprar com certeza!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ana Oliveira</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente verificado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge de confiança */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full shadow-sm border border-green-100 dark:border-green-900/30">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">100% Avaliações Verificadas</span>
              </div>
            </div>
          </div>

          {/* Divisor decorativo inferior */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}