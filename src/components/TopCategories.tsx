import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Headphones, Camera, Star, ChevronRight, ChevronLeft, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// Banner data
const banners = [
  {
    id: 1,
    title: "Buy Now Pay Later",
    subtitle: "How to Get it now",
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=800&auto=format&fit=crop",
    buttonText: "Learn More",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    id: 2,
    title: "Sale Spring",
    subtitle: "GALAXY S23 Up to 50%",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800&auto=format&fit=crop",
    buttonText: "Shop Now",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  }
];

// Today's best deals
const bestDeals = [
  {
    id: 1,
    name: 'AirPods Max',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop',
    category: 'Áudio',
    discount: 15,
    features: ['Noise Cancelling', 'Bluetooth 5.0', 'Hi-Fi Audio', '20h Battery']
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    category: 'Notebooks',
    discount: 10,
    features: ['M3 Chip', '16GB RAM', '512GB SSD', 'Retina Display']
  }
];

// Top product categories
const categories = [
  {
    title: 'Computadores & Laptops',
    items: ['Desktop PCs', 'Notebooks', 'Monitores', 'Componentes', 'Acessórios'],
    icon: <Monitor className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80'
  },
  {
    title: 'Áudio & Headphones',
    items: ['Fones Bluetooth', 'Fones com Fio', 'Speakers', 'Microfones', 'Acessórios'],
    icon: <Headphones className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1625245488600-f03fef636a3c?auto=format&fit=crop&q=80'
  },
  {
    title: 'Foto & Vídeo',
    items: ['Câmeras DSLR', 'Lentes', 'Tripés', 'Iluminação', 'Acessórios'],
    icon: <Camera className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80'
  }
];

// Selling products data
const sellingProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 629.99,
    oldPrice: 899.99,
    discount: 30,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 939.24,
    oldPrice: 1104.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Apple Watch Series 8",
    price: 255.99,
    oldPrice: 319.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: 175.99,
    oldPrice: 219.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "iPad Pro 12.9\"",
    price: 758.99,
    oldPrice: 1011.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop"
  }
];

// Additional products data
const newSeasonProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S23 Ultra",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1675785931264-766bb9c3c7c3?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 120,
    discount: 15,
    tag: "New"
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1399.99,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 95,
    discount: 10,
    tag: "Hot"
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1696426051872-0a9e2945ee69?auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 80,
    discount: 17,
    tag: "New"
  }
];

const recommendedProducts = [
  {
    id: 1,
    name: "Smart Home Camera",
    category: "Smart Home",
    price: 75.99,
    oldPrice: 79.99,
    discount: 5,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop",
    isNew: false
  },
  {
    id: 2,
    name: "4K Gaming Monitor",
    category: "Monitores",
    price: 319.99,
    oldPrice: 399.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
    isNew: false
  },
  {
    id: 3,
    name: "Wireless Gaming Mouse",
    category: "Periféricos",
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop",
    isNew: false
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    category: "Periféricos",
    price: 116.99,
    oldPrice: 129.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?q=80&w=800&auto=format&fit=crop",
    isNew: false
  }
];

// Featured Collections Products
const featuredCollections = [
  {
    id: 1,
    title: "Home Office Essentials",
    description: "Tudo que você precisa para um workspace produtivo",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80",
    items: 42,
    category: "Workspace"
  },
  {
    id: 2,
    title: "Setup Gamer",
    description: "Equipamentos premium para gamers",
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&q=80",
    items: 28,
    category: "Gaming"
  },
  {
    id: 3,
    title: "Audio Premium",
    description: "Som cristalino para os mais exigentes",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80",
    items: 35,
    category: "Áudio"
  }
];

// Trending Tech Products
const trendingTechProducts = [
  {
    id: 1,
    name: "Drone DJI Mini 3 Pro",
    price: 645.99,
    oldPrice: 759.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80",
    badge: "Drones",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "#1 em Drones",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 15
  },
  {
    id: 2,
    name: "GoPro Hero 11 Black",
    price: 319.99,
    oldPrice: 399.99,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&q=80",
    badge: "Câmeras",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "Mais Vendido",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 20
  },
  {
    id: 3,
    name: "Samsung 49\" Ultrawide",
    price: 899.99,
    oldPrice: 999.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80",
    badge: "Monitores",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "Tendência",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 10
  },
  {
    id: 4,
    name: "Steam Deck",
    price: 617.49,
    oldPrice: 649.99,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?auto=format&fit=crop&q=80",
    badge: "Gaming",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "Novo Lançamento",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 5
  }
];

const products = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    category: "Smartphones",
    price: 7999.90,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 2,
    name: "Placa de Vídeo ASUS RTX 3070 Ti",
    category: "Eletrônicos",
    price: 4299.90,
    image: "https://images.unsplash.com/photo-1591488320449-4b52cd9b104e?q=80&w=800&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 3,
    name: "MacBook Pro M2 14\"",
    category: "Eletrônicos",
    price: 14999.90,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 4,
    name: "iPad Pro 12.9\" M2",
    category: "Eletrônicos",
    price: 10499.90,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 5,
    name: "JBL Flip 6",
    category: "Áudio",
    price: 699.90,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 6,
    name: "PlayStation 5",
    category: "Games",
    price: 3999.90,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=800&auto=format&fit=crop",
    isNew: true
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    category: "Smartphones",
    price: 6799.99,
    originalPrice: 7999.99,
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=774&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 2,
    name: "ASUS RTX 3070 Ti",
    category: "Hardware",
    price: 3599.99,
    originalPrice: 4499.99,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "MacBook Pro M2",
    category: "Notebooks",
    price: 12999.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=774&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: 4,
    name: "iPad Pro M2",
    category: "Tablets",
    price: 8099.99,
    originalPrice: 8999.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "JBL Flip 6",
    category: "Audio",
    price: 799.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "PlayStation 5",
    category: "Games",
    price: 3959.99,
    originalPrice: 4499.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=774&auto=format&fit=crop",
  },
];

const smartphones = [
  {
    id: 1,
    name: 'Samsung Galaxy S23 Ultra',
    price: 1104.99,
    oldPrice: 1299.99,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80',
    discount: 15
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 1259.99,
    oldPrice: 1399.99,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    discount: 10
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro',
    price: 999.99,
    oldPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80',
    discount: 17
  }
];

const bestSellers = [
  {
    id: 2,
    name: "MacBook Air M2",
    category: "Notebooks",
    price: 939.24,
    oldPrice: 1104.99,
    discount: 15,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    isNew: true
  },
  {
    id: 3,
    name: "Apple Watch Series 8",
    category: "Smartwatches",
    price: 255.99,
    oldPrice: 319.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
    isNew: false
  },
  {
    id: 4,
    name: "AirPods Pro",
    category: "Áudio",
    price: 175.99,
    oldPrice: 219.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=800&auto=format&fit=crop",
    isNew: false
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    category: "Tablets",
    price: 758.99,
    oldPrice: 1011.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
    isNew: false
  }
];

const techProducts = [
  {
    id: 1,
    name: "Drone DJI Mini 3 Pro",
    price: 645.99,
    oldPrice: 759.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80",
    badge: "Drones",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "#1 em Drones",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 15
  },
  {
    id: 2,
    name: "GoPro Hero 11 Black",
    price: 319.99,
    oldPrice: 399.99,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&q=80",
    badge: "Câmeras",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "Mais Vendido",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 20
  },
  {
    id: 3,
    name: "Samsung 49\" Ultrawide",
    price: 899.99,
    oldPrice: 999.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80",
    badge: "Monitores",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "Tendência",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 10
  },
  {
    id: 4,
    name: "Steam Deck",
    price: 617.49,
    oldPrice: 649.99,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?auto=format&fit=crop&q=80",
    badge: "Gaming",
    badgeColor: "bg-blue-100 text-blue-800",
    extraBadge: "Novo Lançamento",
    extraBadgeColor: "bg-green-100 text-green-800",
    discount: 5
  }
];

export function TopCategories() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());

  const formatPrice = (price: number) => `R$ ${price.toFixed(2)}`;

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  const handleProductClick = (productName: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/produto/' + productName);
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof featuredProducts[0]) => {
    e.stopPropagation(); // Prevent product click navigation
    
    const finalPrice = product.originalPrice 
      ? calculateDiscountedPrice(product.originalPrice, product.discount)
      : product.price;

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      image: product.image
    });

    // Add to added products set
    setAddedProducts(prev => new Set([...prev, product.id]));

    // Remove from added products after animation
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Produtos em Destaque
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Descubra nossa seleção exclusiva de produtos premium com os melhores preços e qualidade garantida.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <div
                key={product.name}
                onClick={() => handleProductClick(product.name)}
                className="group cursor-pointer"
              >
                {/* Product Card */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[5/4] rounded-2xl mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* New Badge */}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2.5 py-0.5 rounded-full text-sm font-medium">
                      Novo
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-full">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                    <span className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Promotional Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`${banner.bgColor} rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 sm:justify-between overflow-hidden relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="flex-1 z-10 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {banner.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                    {banner.subtitle}
                  </p>
                  <button className="bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:translate-x-1 text-sm sm:text-base">
                    {banner.buttonText}
                  </button>
                </div>
                <div className="w-32 h-32 sm:w-48 sm:h-48 relative transform transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Ofertas do Dia */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Ofertas do Dia
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Não perca essas ofertas exclusivas
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestDeals.map((deal) => (
                <div
                  key={deal.name}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-full sm:w-40 h-40 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                      -{deal.discount}%
                    </div>
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mt-1">
                        {deal.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {deal.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                          R$ {calculateDiscountedPrice(deal.price, deal.discount).toFixed(2)}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 line-through">
                          R$ {deal.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produtos Mais Vendidos */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Produtos Mais Vendidos
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Os produtos favoritos dos nossos clientes
                </p>
              </div>
            </div>

            {/* Best Sellers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {bestSellers.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => handleProductClick(product.name)}
                >
                  <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="px-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-full">
                        {product.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      <span className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Principais Categorias */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Principais Categorias
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Explore nossas categorias mais populares
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {category.items.length} produtos
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center justify-between text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50"
                        >
                          <span>{item}</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Produtos Recomendados
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Selecionados especialmente para você
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => handleProductClick(product.name)}
                >
                  <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="px-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-full">
                        {product.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      <span className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Collections Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Coleções em Destaque
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Explore nossas seleções especiais
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCollections.map((collection) => (
                <div
                  key={collection.id}
                  className={`group cursor-pointer relative overflow-hidden rounded-2xl ${
                    collection.featured ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Background Image with Overlay */}
                  <div className="relative h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    {/* Category Badge */}
                    <div className={`inline-flex items-center self-start px-3 py-1.5 mb-4 rounded-full 
                      bg-gray-100 dark:bg-gray-100 text-gray-900 dark:text-gray-900 text-sm font-medium`}>
                      {collection.category}
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-gray-300">
                      {collection.description}
                    </p>

                    {/* Products count and Explore link */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {collection.items} produtos
                      </span>
                      <div className="flex items-center gap-2 text-indigo-300 group-hover:text-indigo-400 transition-colors">
                        <span>Explorar Coleção</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tech Section */}
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tecnologia em Alta
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Produtos mais buscados da semana
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {techProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => handleProductClick(product.name)}
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-full">
                        {product.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            R$ {product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                      <span className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}