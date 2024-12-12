import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/product';
import { ProductCard } from '../components/Electronics/ProductCard';
import { mockProducts as electronicProducts } from '../components/Electronics/mockData';
import { mockProducts as smartphoneProducts } from '../components/Smartphones/mockData';
import { mockProducts as gameProducts } from '../components/Games/mockData';
import { mockProducts as photographyProducts } from '../components/Photography/mockData';
import { mockProducts as tvHomeProducts } from '../components/TVHome/mockData';
import { mockProducts as audioProducts } from '../components/Audio/mockData';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.length >= 3) {
      // Combinar todos os produtos em um único array
      const allProducts = [
        ...electronicProducts,
        ...smartphoneProducts,
        ...gameProducts,
        ...photographyProducts,
        ...tvHomeProducts,
        ...audioProducts
      ];

      // Filtrar produtos baseado na query
      const searchResults = allProducts.filter(product => {
        const searchQuery = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchQuery) ||
          product.brand.toLowerCase().includes(searchQuery)
        );
      });

      setResults(searchResults);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <ul className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
          <li>
            <a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </a>
          </li>
          <li className="before:content-['/'] before:mx-2">Resultados da Pesquisa</li>
        </ul>
      </div>

      {/* Resultados */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Resultados da pesquisa
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {results.length} {results.length === 1 ? 'produto encontrado' : 'produtos encontrados'} para "{query}"
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {results.length === 0 && query.length >= 3 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Nenhum produto encontrado
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Tente usar palavras-chave diferentes ou verificar a ortografia.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
