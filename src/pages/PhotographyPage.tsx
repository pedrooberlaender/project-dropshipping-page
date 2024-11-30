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
  const [sortBy, setSortBy] = useState('relevancia');
  const [isFiltering, setIsFiltering] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Função para rolar suavemente até os produtos
  const scrollToProducts = () => {
    if (productsRef.current) {
      const yOffset = -100; // Offset para deixar um espaço no topo
      const y = productsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Função para atualizar filtros com animação
  const handleFilterChange = (
    type: 'category' | 'brand' | 'price' | 'search',
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
    }

    // Rola até os produtos após um pequeno delay
    setTimeout(() => {
      scrollToProducts();
      setIsFiltering(false);
    }, 100);
  };

  // Effect to update category when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('categoria');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      scrollToProducts();
    }
  }, [searchParams]);

  // Effect to scroll to products when category changes
  useEffect(() => {
    scrollToProducts();
  }, [selectedCategory]);

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
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
        break;
      default:
        // relevância - mantém a ordem original
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, selectedBrands, sortBy]);

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
          />
        </div>

        {/* Products Section */}
        <div className="w-full lg:w-3/4" ref={productsRef}>
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-slate-600 dark:text-slate-400">
              {filteredProducts.length} produtos encontrados
            </p>
            <div className="flex items-center space-x-2">
              <label className="text-slate-600 dark:text-slate-400">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-600 
                         bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                <option value="relevancia">Relevância</option>
                <option value="preco-menor">Menor Preço</option>
                <option value="preco-maior">Maior Preço</option>
                <option value="desconto">Maior Desconto</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyPage;
