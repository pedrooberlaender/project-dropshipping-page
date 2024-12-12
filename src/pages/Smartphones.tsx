import React from 'react';
import { CategoryTemplate } from '../components/CategoryPage/CategoryTemplate';

const smartphonesData = {
  categoryName: 'Smartphones',
  subcategories: [
    'Android',
    'iPhone',
    'Básicos',
    'Acessórios',
    'Capas',
    'Películas',
    'Carregadores',
    'Suportes'
  ],
  products: [
    {
      id: '1',
      name: 'iPhone 14 Pro Max 256GB Câmera Tripla',
      price: 7999.99,
      originalPrice: 8999.99,
      image: '/images/products/iphone-14.jpg',
      brand: 'Apple',
      rating: 4.9,
      reviews: 256,
      tags: ['5G', 'iOS 16', 'A16 Bionic'],
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Ultra 256GB 5G',
      price: 6799.99,
      originalPrice: 7499.99,
      image: '/images/products/galaxy-s23.jpg',
      brand: 'Samsung',
      rating: 4.8,
      reviews: 189,
      tags: ['5G', 'Android 13', 'S Pen'],
      discount: 10
    },
    // Adicionar mais produtos...
  ],
  filters: {
    brands: [
      'Apple',
      'Samsung',
      'Motorola',
      'Xiaomi',
      'Asus',
      'OnePlus',
      'Realme',
      'LG'
    ],
    priceRanges: [
      { min: 0, max: 1000, label: 'Até R$ 1.000' },
      { min: 1000, max: 2000, label: 'R$ 1.000 a R$ 2.000' },
      { min: 2000, max: 3000, label: 'R$ 2.000 a R$ 3.000' },
      { min: 3000, max: 5000, label: 'R$ 3.000 a R$ 5.000' },
      { min: 5000, max: Infinity, label: 'Acima de R$ 5.000' }
    ],
    tags: [
      '5G',
      '4G',
      'Dual SIM',
      'NFC',
      'Android 13',
      'iOS 16',
      'Câmera Tripla',
      'Carregamento Rápido'
    ]
  }
};

export function Smartphones() {
  return <CategoryTemplate {...smartphonesData} />;
}
