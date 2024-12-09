import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/Shop/ProductCard';
import { Filters } from '../components/Shop/Filters';
import { SearchBar } from '../components/Shop/SearchBar';

const products = [
  {
    id: 1,
    name: 'Fones de Ouvido Premium',
    price: 999.90,
    image: 'https://images.unsplash.com/photo-1631867675167-90a456a90863?auto=format&fit=crop&q=80',
    category: 'Áudio',
    description: 'Som de alta fidelidade com cancelamento de ruído ativo e qualidade premium.',
  },
  {
    id: 2,
    name: 'Smartwatch Elite',
    price: 1499.90,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80',
    category: 'Vestíveis',
    description: 'Monitoramento avançado de fitness, frequência cardíaca e notificações do smartphone.',
  },
  {
    id: 3,
    name: 'Mochila Designer',
    price: 799.90,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80',
    category: 'Acessórios',
    description: 'Mochila elegante e funcional com compartimento para laptop e resistência à água.',
  },
  {
    id: 4,
    name: 'Relógio Minimalista',
    price: 1249.90,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80',
    category: 'Vestíveis',
    description: 'Design clean com materiais premium e movimento suíço.',
  },
  {
    id: 5,
    name: 'Carregador Sem Fio',
    price: 249.90,
    image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80',
    category: 'Eletrônicos',
    description: 'Carregamento sem fio rápido com design elegante e indicadores LED.',
  },
  {
    id: 6,
    name: 'Fones de Ouvido Premium',
    price: 1749.90,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80',
    category: 'Áudio',
    description: 'Som com qualidade de estúdio, materiais premium e conectividade sem fio.',
  },
  {
    id: 7,
    name: 'Teclado Mecânico',
    price: 899.90,
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&q=80',
    category: 'Eletrônicos',
    description: 'Switches mecânicos premium com iluminação RGB personalizável.',
  },
  {
    id: 8,
    name: 'Carteira de Couro',
    price: 449.90,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80',
    category: 'Acessórios',
    description: 'Carteira artesanal em couro legítimo com proteção RFID.',
  },
  {
    id: 9,
    name: 'Caixa de Som Portátil',
    price: 649.90,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80',
    category: 'Áudio',
    description: 'Caixa de som à prova d\'água com som em 360 graus.',
  },
];

export function Shop() {
  const maxPrice = Math.max(...products.map(p => p.price));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))).sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />
          </aside>

          <main className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}