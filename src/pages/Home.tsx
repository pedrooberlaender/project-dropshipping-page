import React from 'react';
<<<<<<< HEAD
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { InfoSection } from '../components/InfoSection';
import { Footer } from '../components/Footer';
import CustomerReviews from '../components/CustomerReviews/CustomerReviews';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <CustomerReviews />
      <InfoSection />
      <Footer />
    </div>
  );
}
=======
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeaturedOffers from '../components/FeaturedOffers';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Banner Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Oferta 1 - Smartphones */}
          <Link to="/produtos/smartphones" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 transition-transform duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block px-4 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                      Oferta Especial
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Smartphones
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Até 30% de desconto em toda linha
                  </p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors duration-200">
                    Comprar Agora
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="relative w-40 h-40">
                  <img
                    src="/images/smartphone-banner.png"
                    alt="Smartphone em destaque"
                    className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Oferta 2 - Notebooks */}
          <Link to="/produtos/notebooks" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 transition-transform duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block px-4 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 rounded-full">
                      Lançamento
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Notebooks
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    A partir de R$ 2.499,90
                  </p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors duration-200">
                    Comprar Agora
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="relative w-40 h-40">
                  <img
                    src="/images/notebook-banner.png"
                    alt="Notebook em destaque"
                    className="absolute inset-0 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <FeaturedOffers />

      {/* Produtos em Destaque */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Produtos em Destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cards de produtos em destaque aqui */}
        </div>
      </div>
    </div>
  );
};

export default Home;
>>>>>>> e3c3cf8 (feat: add smooth animations to orders page using Framer Motion)
