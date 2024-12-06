import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/Photography/ProductCard';
import { Filters } from '../components/Photography/Filters';
import { mockProducts } from '../components/Photography/mockData';
import { Product } from '../types/product';

const PhotographyPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'todos');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevancia');
  const [isFiltering, setIsFiltering] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Função para atualizar filtros com animação
  const handleFilterChange = (
    type: 'category' | 'brand' | 'price' | 'search' | 'discount',
    value: any
  ) => {
    setIsFiltering(true);

    // Atualiza o filtro específico
    switch (type) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'brand':
        setSelectedBrands(value);
        break;
      case 'price':
        setPriceRange(value);
        break;
      case 'search':
        setSearchQuery(value);
        break;
      case 'discount':
        setSelectedDiscountRanges(value);
        break;
    }

    // Apenas remove o estado de filtragem após um pequeno delay
    setTimeout(() => {
      setIsFiltering(false);
    }, 100);
  };

  // Effect to update category when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoria');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory === 'todos') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', selectedCategory);
    }
    setSearchParams(searchParams);
  }, [selectedCategory]);

  // Filter products based on all criteria
  useEffect(() => {
    let filtered = mockProducts;

    // Category filter
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Discount range filter
    if (selectedDiscountRanges.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.originalPrice || product.originalPrice <= product.price) return false;
        
        const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        return selectedDiscountRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return discountPercentage > min && discountPercentage <= max;
        });
      });
    }

    // Sorting
    switch (sortBy) {
      case 'preco-menor':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'preco-maior':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'desconto':
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
        break;
      default:
        // relevância - mantém a ordem original
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, selectedBrands, selectedDiscountRanges, sortBy]);

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
          <li className="before:content-['/'] before:mx-2">Fotografia</li>
          {selectedCategory !== 'todos' && (
            <li className="before:content-['/'] before:mx-2 capitalize">
              {selectedCategory}
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={(query) => handleFilterChange('search', query)}
            selectedCategory={selectedCategory}
            setSelectedCategory={(category) => handleFilterChange('category', category)}
            priceRange={priceRange}
            setPriceRange={(range) => handleFilterChange('price', range)}
            selectedBrands={selectedBrands}
            setSelectedBrands={(brands) => handleFilterChange('brand', brands)}
            selectedDiscountRanges={selectedDiscountRanges}
            setSelectedDiscountRanges={(ranges) => handleFilterChange('discount', ranges)}
          />
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4" ref={productsRef}>
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600 dark:text-slate-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-slate-600 dark:text-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <option value="relevancia">Relevância</option>
              <option value="preco-menor">Menor Preço</option>
              <option value="preco-maior">Maior Preço</option>
              <option value="desconto">Maior Desconto</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isFiltering ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              ))
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyPage;
