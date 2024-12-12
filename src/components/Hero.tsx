import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeftCircle, ArrowRightCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  category: string;
  backgroundImage: string;
  textColor: string;
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const offers: Offer[] = [
    {
      id: 1,
      title: "Smartphones Premium",
      description: "Últimos lançamentos com tecnologia de ponta",
      discount: "Até 25% OFF",
      category: "Smartphones",
      backgroundImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=2400&h=1600",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Mega Ofertas em Eletrônicos",
      description: "Notebooks, Tablets e Acessórios com Preços Imperdíveis",
      discount: "Até 35% OFF",
      category: "Eletronicos",
      backgroundImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=2400&h=1600",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Universo Gamer",
      description: "Equipamentos para sua melhor performance",
      discount: "Até 40% OFF",
      category: "Games",
      backgroundImage: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=2400&h=1600",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Som Profissional",
      description: "Qualidade de áudio excepcional",
      discount: "Até 30% OFF",
      category: "Áudio",
      backgroundImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2400&h=1600",
      textColor: "text-white"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % offers.length);
    setTimeout(() => setIsTransitioning(false), 700); // Duração da transição
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    setTimeout(() => setIsTransitioning(false), 700); // Duração da transição
  };

  return (
    <div className="relative overflow-hidden w-screen">
      <div className="relative h-[450px] md:h-[500px] lg:h-[550px]">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform
              ${index === currentSlide 
                ? 'opacity-100 translate-x-0 z-10' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full z-0' 
                  : 'opacity-0 translate-x-full z-0'
              }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-[8000ms] ease-out"
              style={{
                backgroundImage: `url(${offer.backgroundImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
              <div className="container mx-auto px-6 h-full flex items-center">
                <div className={`max-w-xl transform transition-all duration-700 delay-100 
                      mx-12 sm:mx-16 md:mx-20 lg:mx-24
                      ${index === currentSlide 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-12'
                      }`}
                >
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 ${offer.textColor}`}>
                    {offer.title}
                  </h1>
                  <p className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 ${offer.textColor}`}>
                    {offer.description}
                  </p>
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 ${offer.textColor}`}>
                    {offer.discount}
                  </div>
                  <div className="relative z-50">
                    <Link
                      to={`/${offer.category.toLowerCase()}`}
                      className="group inline-flex items-center gap-1.5 sm:gap-2
                               bg-white text-slate-800 
                               px-5 py-2.5 sm:px-8 sm:py-4 
                               rounded-lg sm:rounded-xl 
                               font-medium sm:font-semibold 
                               text-base sm:text-lg
                               cursor-pointer select-none
                               transition-all duration-300 ease-in-out
                               hover:bg-[#4F46E5] hover:text-white 
                               active:bg-[#4338CA] active:scale-[0.98]
                               shadow-md sm:shadow-lg hover:shadow-[#4F46E5]/20 hover:shadow-xl
                               border-2 border-transparent hover:border-white/20"
                    >
                      Ver Ofertas
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto nav-button
                     ml-2 sm:ml-6 md:ml-12 p-2 sm:p-3 rounded-xl 
                     bg-black/20 text-white
                     backdrop-blur-sm
                     border border-white/20 opacity-75
                     tap-highlight-transparent"
            aria-label="Previous slide"
          >
            <ArrowLeftCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
        </div>
        <div className="flex-none">
          <button
            onClick={nextSlide}
            className="pointer-events-auto nav-button
                     mr-6 sm:mr-10 md:mr-16 p-2 sm:p-3 rounded-xl 
                     bg-black/20 text-white
                     backdrop-blur-sm
                     border border-white/20 opacity-75
                     tap-highlight-transparent"
            aria-label="Next slide"
          >
            <ArrowRightCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center space-x-2">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500
              ${currentSlide === index 
                ? 'bg-[#4F46E5] scale-125' 
                : 'bg-white/50 hover:bg-white/75'
              }`}
          />
        ))}
      </div>
<<<<<<< HEAD
    </div>
  );
=======
    </div>
  );
>>>>>>> f8faa856918704f1a92ef77419528b8b05ce4258
}