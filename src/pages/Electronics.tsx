import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Product } from '../types/product';

// Mock data - Substituir por dados reais da API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Notebook Ultra Pro',
    price: 4799,
    originalPrice: 5999,
    image: '/placeholder-product.jpg',
    brand: 'Lenovo',
    category: 'notebooks',
    isPromotion: true,
    specifications: {
      processor: 'Intel i7',
      ram: '16GB',
      storage: '512GB SSD'
    }
  },
  // Adicione mais produtos mock aqui
];

export const Electronics = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'todos');

  const brands = ['Apple', 'Samsung', 'Dell', 'Lenovo', 'Asus', 'Acer'];
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleProductClick = (productId: string) => {
    navigate(`/produto/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandSelected = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const categoryMatches = selectedCategory === 'todos' || product.category === selectedCategory;
    const searchQueryMatches = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return priceInRange && brandSelected && categoryMatches && searchQueryMatches;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Buscar</h3>
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Categorias</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="notebooks">Notebooks</SelectItem>
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="acessorios">Acessórios para PC</SelectItem>
                    <SelectItem value="componentes">Componentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Faixa de Preço</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 10000]}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Marcas</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                      />
                      <label htmlFor={brand} className="ml-2 text-sm font-medium">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleProductClick(product.id)}>
                <CardHeader className="relative">
                  {product.isPromotion && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {product.specifications && (
                    <CardDescription className="text-sm text-gray-600">
                      {Object.values(product.specifications).join(', ')}
                    </CardDescription>
                  )}
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-primary">R$ {product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm line-through text-gray-500">
                        R$ {product.originalPrice}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Adicionar ao Carrinho
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;
