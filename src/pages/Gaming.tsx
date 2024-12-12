import React from 'react';
import { CategoryTemplate } from '../components/CategoryPage/CategoryTemplate';

const gamingData = {
  categoryName: 'Games',
  subcategories: [
    'Consoles',
    'Jogos',
    'Controles',
    'Acessórios',
    'Cadeiras Gamer',
    'Headsets',
    'Streaming',
    'Realidade Virtual'
  ],
  products: [
    {
      id: '1',
      name: 'PlayStation 5 Digital Edition + 2 Controles DualSense',
      price: 4499.99,
      originalPrice: 4999.99,
      image: '/images/products/ps5-digital.jpg',
      brand: 'Sony',
      rating: 4.9,
      reviews: 324,
      tags: ['Console', '4K', 'SSD'],
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'Xbox Series X 1TB',
      price: 4299.99,
      originalPrice: 4799.99,
      image: '/images/products/xbox-series-x.jpg',
      brand: 'Microsoft',
      rating: 4.8,
      reviews: 256,
      tags: ['Console', '4K', 'Ray Tracing'],
      discount: 10
    },
    {
      id: '3',
      name: 'Cadeira Gamer Thunder X3 TGC12 Preta',
      price: 1299.99,
      originalPrice: 1599.99,
      image: '/images/products/thunder-x3.jpg',
      brand: 'Thunder X3',
      rating: 4.7,
      reviews: 189,
      tags: ['Ergonômica', 'Reclinável', '150kg'],
      isFeatured: true
    },
    {
      id: '4',
      name: 'Nintendo Switch OLED Model',
      price: 2499.99,
      originalPrice: 2799.99,
      image: '/images/products/switch-oled.jpg',
      brand: 'Nintendo',
      rating: 4.8,
      reviews: 145,
      tags: ['Portátil', 'OLED', 'Dock'],
      discount: 15
    }
  ],
  filters: {
    brands: [
      'Sony',
      'Microsoft',
      'Nintendo',
      'Razer',
      'Logitech',
      'HyperX',
      'Corsair',
      'DXRacer'
    ],
    priceRanges: [
      { min: 0, max: 500, label: 'Até R$ 500' },
      { min: 500, max: 1000, label: 'R$ 500 a R$ 1.000' },
      { min: 1000, max: 2000, label: 'R$ 1.000 a R$ 2.000' },
      { min: 2000, max: 5000, label: 'R$ 2.000 a R$ 5.000' },
      { min: 5000, max: Infinity, label: 'Acima de R$ 5.000' }
    ],
    tags: [
      'Console',
      'Portátil',
      'Wireless',
      'RGB',
      '4K',
      'Ray Tracing',
      'Ergonômico',
      'Bluetooth'
    ]
  }
};

export function Gaming() {
  return <CategoryTemplate {...gamingData} />;
}
