import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, ArrowLeft, CheckCircle, Star, Truck, Shield, ArrowLeftRight, Package, Weight, User, ThumbsUp, ShoppingBag, ChevronLeft, ChevronRight, ZoomIn, Maximize2, Repeat, X, FileText, Settings2, ShieldCheck, MessageSquare } from 'lucide-react';
import type { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';

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
  maxQuantity: 3,
  specifications: {
    resolution: '4K',
    screenSize: '55 polegadas',
    smartFeatures: 'WebOS, ThinQ AI'
  },
  description: 'O Smart TV OLED 55" é um produto de alta qualidade, desenvolvido com os melhores materiais e tecnologias disponíveis no mercado. Com design moderno e funcional, este produto oferece excelente durabilidade e desempenho excepcional.'
};

const ProductOffer = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, state } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [productId]);

  // Em um cenário real, você buscaria os dados do produto usando o productId
  const product = mockProduct;

  // Mock images array - substituir por dados reais
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    const currentCartItem = state.items.find(item => item.id === product.id);
    const currentQuantity = currentCartItem?.quantity || 0;
    const maxAllowed = product.maxQuantity || 5;

    if (action === 'increase') {
      if (quantity < maxAllowed && (currentQuantity + quantity) < maxAllowed) {
        setQuantity(quantity + 1);
      }
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity
        }
      }
    });
  };

  const handleAddToCart = () => {
    const currentCartItem = state.items.find(item => item.id === product.id);
    const currentQuantity = currentCartItem?.quantity || 0;
    const maxAllowed = product.maxQuantity || 5;
    
    if (currentQuantity + quantity > maxAllowed) {
      alert(`Quantidade máxima permitida é ${maxAllowed} unidades`);
      return;
    }

    setIsAddingToCart(true);
    addToCart({
      ...product,
      quantity,
      maxQuantity: product.maxQuantity
    });
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 2000);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleZoomToggle = () => {
    if (!isLightboxOpen) {
      setIsLightboxOpen(true);
    } else {
      setIsZoomed(!isZoomed);
    }
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isLightboxOpen) {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'Escape':
          setIsLightboxOpen(false);
          setIsZoomed(false);
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Home / {product.category} / {product.name}
          </div>
        </div>

        {/* Main Product Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Images */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                {/* Main Image Container */}
                <div className="relative group">
                  <div 
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <img
                      src={productImages[selectedImage]}
                      alt={`${product.name} - Imagem ${selectedImage + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 
                             text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity
                             hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 
                             text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity
                             hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-xs">
                    {selectedImage + 1} / {productImages.length}
                  </div>

                  {/* Click to expand indicator */}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Clique para expandir
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900 
                                ${selectedImage === index 
                                  ? 'ring-2 ring-indigo-600 dark:ring-indigo-400' 
                                  : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
                                } transition-all duration-200`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Miniatura ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Lightbox Modal */}
              {isLightboxOpen && (
                <div 
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setIsZoomed(false);
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    {/* Close button */}
                    <button 
                      className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
                      onClick={() => {
                        setIsLightboxOpen(false);
                        setIsZoomed(false);
                      }}
                    >
                      <X className="h-6 w-6" />
                    </button>

                    {/* Main image */}
                    <div 
                      className="relative max-w-5xl w-full h-full flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={productImages[selectedImage]}
                        alt={`${product.name} - Imagem ${selectedImage + 1}`}
                        className={`max-h-full object-contain transition-transform duration-300 cursor-zoom-in
                                  ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}`}
                        onClick={handleZoomToggle}
                      />

                      {/* Navigation arrows */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white
                                 hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white
                                 hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 text-white">
                        {selectedImage + 1} / {productImages.length}
                      </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/60 rounded-lg">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageClick(index)}
                          className={`w-16 h-16 rounded overflow-hidden transition-opacity
                                    ${selectedImage === index 
                                      ? 'opacity-100 ring-2 ring-white' 
                                      : 'opacity-60 hover:opacity-100'
                                    }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} - Miniatura ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Tags and Title */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full">
                      Em Promoção
                    </span>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
                      Oferta por tempo limitado
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">Marca: <span className="font-medium text-gray-900 dark:text-white">{product.brand}</span></p>
                </div>

                {/* Price Section */}
                <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg text-gray-900 dark:text-white">
                      Em até 12x de {calculateInstallments(product.price)} sem juros
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Economize {formatPrice(product.originalPrice! - product.price)}
                    </p>
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cor
                    </label>
                    <div className="flex gap-3">
                      {['black', 'silver', 'blue'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${color === 'black' ? 'bg-gray-900' : ''}
                            ${color === 'silver' ? 'bg-gray-400' : ''}
                            ${color === 'blue' ? 'bg-blue-600' : ''}
                            ${selectedColor === color 
                              ? 'ring-2 ring-offset-2 ring-indigo-600 dark:ring-indigo-400' 
                              : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 dark:hover:ring-gray-500'
                            }
                            transition-all duration-200
                          `}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quantidade
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange('decrease')}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className={`h-4 w-4 ${quantity <= 1 ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'}`} />
                        </button>
                        <span className="w-12 text-center text-gray-900 dark:text-white">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange('increase')}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          disabled={quantity >= (product.maxQuantity || 5)}
                        >
                          <Plus className={`h-4 w-4 ${quantity >= (product.maxQuantity || 5) ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'}`} />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Apenas {(product.maxQuantity || 5)} unidades disponíveis
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 max-w-[380px]">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md flex items-center justify-center gap-2 
                             hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-sm font-medium"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Comprar agora
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full px-6 py-3 rounded-md flex items-center justify-center gap-2
                             transition-all duration-200 text-sm font-medium min-h-[48px]
                             disabled:cursor-not-allowed
                             ${isAddingToCart 
                               ? 'bg-green-500 text-white border-green-500' 
                               : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
                             }`}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Adicionado!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        Adicionar ao carrinho
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Sections */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Section Divider - Product Description */}
                <div className="mt-8 mb-10">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 dark:via-indigo-900/20 to-transparent opacity-70"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700
                                    shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 
                                             bg-clip-text text-transparent">
                            Descrição do Produto
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Description Content */}
                <div className="space-y-6 text-gray-700 dark:text-gray-300 mb-16">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description || `O ${product.name} é um produto de alta qualidade, desenvolvido com os melhores materiais 
                    e tecnologias disponíveis no mercado. Com design moderno e funcional, este produto oferece excelente 
                    custo-benefício e durabilidade excepcional.`}
                  </p>

                  {/* Destaques do Produto */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Destaques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Design Inovador</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Estilo moderno que combina com qualquer ambiente</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Alta Durabilidade</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Materiais premium para maior vida útil</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Tecnologia Avançada</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Recursos inteligentes para melhor desempenho</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Economia de Energia</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Sistema inteligente de eficiência energética</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Fácil Instalação</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Sistema prático e intuitivo de montagem</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Certificação de Qualidade</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Produto aprovado pelos principais órgãos reguladores</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Divider - Technical Specifications */}
                <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 dark:via-indigo-900/20 to-transparent opacity-70"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700
                                    shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <Settings2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 
                                             bg-clip-text text-transparent">
                            Especificações Técnicas
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications Content */}
                <div className="space-y-4 mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      {/* Características Técnicas */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Características Técnicas</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <Settings2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white block">Resolution</span>
                              <span className="text-gray-600 dark:text-gray-400">4K</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <Maximize2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white block">Screen Size</span>
                              <span className="text-gray-600 dark:text-gray-400">55 polegadas</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <Settings2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white block">Smart Features</span>
                              <span className="text-gray-600 dark:text-gray-400">WebOS, ThinQ AI</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Itens Inclusos */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Itens Inclusos</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                            <div>1x {product.name}</div>
                          </div>
                          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                            <div>1x Manual do usuário</div>
                          </div>
                          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                            <div>1x Certificado de garantia</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações Adicionais</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                          <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white block">Dimensões da Embalagem</span>
                            <span className="text-gray-600 dark:text-gray-400">30 x 20 x 10 cm</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                          <Weight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white block">Peso do Produto</span>
                            <span className="text-gray-600 dark:text-gray-400">800g</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                          <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white block">Garantia</span>
                            <span className="text-gray-600 dark:text-gray-400">12 meses de garantia de fábrica</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Divider - Shipping & Returns */}
                <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 dark:via-indigo-900/20 to-transparent opacity-70"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700
                                    shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 
                                             bg-clip-text text-transparent">
                            Envio e Garantias
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping, Warranty and Return Information */}
                <div className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Shipping Info */}
                    <div className="group relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 
                                  dark:from-gray-800 dark:to-gray-900 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 
                                  transform hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute -top-3 left-6 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                                    dark:from-indigo-600 dark:to-purple-600 rounded-full shadow-lg">
                        <div className="flex items-center gap-2 text-white">
                          <Truck className="h-4 w-4" />
                          <span className="text-sm font-medium tracking-wide">Envio</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Frete Grátis para todo o Brasil.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Rastreamento em tempo real, com atualizações precisas.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Entrega realizada por transportadoras confiáveis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Buyer Protection */}
                    <div className="group relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 
                                  dark:from-gray-800 dark:to-gray-900 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 
                                  transform hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute -top-3 left-6 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                                    dark:from-indigo-600 dark:to-purple-600 rounded-full shadow-lg">
                        <div className="flex items-center gap-2 text-white">
                          <Shield className="h-4 w-4" />
                          <span className="text-sm font-medium tracking-wide">Proteção ao Comprador</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Garantia de produtos originais.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Transações 100% seguras, com proteção em cada etapa.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Suporte especializado, sempre à disposição.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Return Policy */}
                    <div className="group relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 
                                  dark:from-gray-800 dark:to-gray-900 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700 
                                  transform hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute -top-3 left-6 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 
                                    dark:from-indigo-600 dark:to-purple-600 rounded-full shadow-lg">
                        <div className="flex items-center gap-2 text-white">
                          <ArrowLeftRight className="h-4 w-4" />
                          <span className="text-sm font-medium tracking-wide">Devolução</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            7 dias para devolução, sem complicações.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Frete Grátis na devolução em qualquer região do Brasil.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 mr-2
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-300 
                                            transition-all duration-300" />
                          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white 
                                    transition-colors">
                            Reembolso garantido, de forma simples e rápida.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Divider - Customer Reviews */}
                <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 dark:via-indigo-900/20 to-transparent opacity-70"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700
                                    shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 
                                             bg-clip-text text-transparent">
                            Avaliações dos Clientes
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Reviews Content */}
                <div className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Resumo das Avaliações */}
                    <div className="lg:col-span-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                        <div className="text-center mb-6">
                          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">4.8</div>
                          <div className="flex justify-center items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Baseado em 247 avaliações
                          </div>
                        </div>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="text-sm text-gray-600 dark:text-gray-400 w-6">{rating}</div>
                              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400" 
                                  style={{ 
                                    width: `${rating === 5 ? '70' : rating === 4 ? '20' : '10'}%` 
                                  }} 
                                />
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 w-8">
                                {rating === 5 ? '70%' : rating === 4 ? '20%' : '10%'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Lista de Avaliações */}
                    <div className="lg:col-span-8">
                      <div className="space-y-6">
                        {[
                          {
                            name: 'Ana Silva',
                            rating: 5,
                            date: '2 semanas atrás',
                            comment: 'Excelente produto! Superou todas as minhas expectativas. A qualidade é impressionante e o atendimento foi muito bom.'
                          },
                          {
                            name: 'Carlos Santos',
                            rating: 4,
                            date: '1 mês atrás',
                            comment: 'Muito satisfeito com a compra. O produto chegou antes do prazo e está funcionando perfeitamente.'
                          }
                        ].map((review, index) => (
                          <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{review.name}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">{review.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOffer;
