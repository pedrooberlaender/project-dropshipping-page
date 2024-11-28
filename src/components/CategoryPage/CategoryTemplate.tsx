import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Search, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

interface CategoryTemplateProps {
  categoryName: string;
  subcategories: string[];
  products: Product[];
  filters: {
    brands: string[];
    priceRanges: { min: number; max: number; label: string }[];
    tags: string[];
  };
}

export function CategoryTemplate({ categoryName, subcategories, products: initialProducts, filters }: CategoryTemplateProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    subcategory: '',
    brand: '',
    priceRange: '',
    tag: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      subcategory: '',
      brand: '',
      priceRange: '',
      tag: '',
      search: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleFilterChange('subcategory', sub)}
                className={`px-4 py-2 rounded-full ${
                  selectedFilters.subcategory === sub
                    ? 'bg-white text-indigo-600'
                    : 'bg-indigo-500/20 hover:bg-indigo-500/30'
                } transition-colors`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={selectedFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <SlidersHorizontal size={20} />
            Filtros
            <ChevronDown
              size={20}
              className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Marcas</h3>
                <div className="space-y-2">
                  {filters.brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleFilterChange('brand', brand)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedFilters.brand === brand
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Faixa de Preço</h3>
                <div className="space-y-2">
                  {filters.priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => handleFilterChange('priceRange', range.label)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedFilters.priceRange === range.label
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Características</h3>
                <div className="space-y-2">
                  {filters.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleFilterChange('tag', tag)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedFilters.tag === tag
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {Object.values(selectedFilters).some(Boolean) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <X size={16} />
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  Novo
                </span>
              )}
              {product.discount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600">{product.brand}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    R$ {product.originalPrice.toLocaleString('pt-BR')}
                  </span>
                )}
                <span className="text-2xl font-bold text-indigo-600">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
