import React from 'react';
import { CategoryTemplate } from '../components/CategoryPage/CategoryTemplate';

const audioData = {
  categoryName: 'Áudio',
  subcategories: [
    'Fones de Ouvido',
    'Headphones',
    'Caixas de Som',
    'Soundbars',
    'Microfones',
    'Home Theater',
    'Amplificadores',
    'Acessórios'
  ],
  products: [
    {
      id: '1',
      name: 'Apple AirPods Pro 2ª Geração com Cancelamento de Ruído',
      price: 2299.99,
      originalPrice: 2699.99,
      image: '/images/products/airpods-pro.jpg',
      brand: 'Apple',
      rating: 4.9,
      reviews: 312,
      tags: ['Wireless', 'Noise Cancelling', 'Bluetooth 5.0'],
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'JBL Charge 5 Caixa de Som Bluetooth à Prova D\'água',
      price: 999.99,
      originalPrice: 1199.99,
      image: '/images/products/jbl-charge.jpg',
      brand: 'JBL',
      rating: 4.7,
      reviews: 245,
      tags: ['Bluetooth', 'Waterproof', 'Powerbank'],
      discount: 15
    },
    // Adicionar mais produtos...
  ],
  filters: {
    brands: [
      'Apple',
      'JBL',
      'Sony',
      'Bose',
      'Samsung',
      'Beats',
      'Sennheiser',
      'LG'
    ],
    priceRanges: [
      { min: 0, max: 500, label: 'Até R$ 500' },
      { min: 500, max: 1000, label: 'R$ 500 a R$ 1.000' },
      { min: 1000, max: 2000, label: 'R$ 1.000 a R$ 2.000' },
      { min: 2000, max: 3000, label: 'R$ 2.000 a R$ 3.000' },
      { min: 3000, max: Infinity, label: 'Acima de R$ 3.000' }
    ],
    tags: [
      'Bluetooth',
      'Wireless',
      'Noise Cancelling',
      'Waterproof',
      'Microfone',
      'Bass Boost',
      'Dolby Atmos',
      'Hi-Res Audio'
    ]
  }
};

export function Audio() {
  return <CategoryTemplate {...audioData} />;
}
