import React from 'react';
import { CategoryTemplate } from '../components/CategoryPage/CategoryTemplate';

const tvHomeData = {
  categoryName: 'TV & Home',
  subcategories: [
    'Smart TVs',
    'Home Theater',
    'Soundbars',
    'Projetores',
    'Streaming',
    'Suportes',
    'Automação',
    'Acessórios'
  ],
  products: [
    {
      id: '1',
      name: 'Smart TV Samsung Neo QLED 65" 4K UHD 65QN85B',
      price: 7999.99,
      originalPrice: 9499.99,
      image: '/images/products/samsung-neo-qled.jpg',
      brand: 'Samsung',
      rating: 4.9,
      reviews: 234,
      tags: ['Neo QLED', '4K', 'HDR'],
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'Smart TV LG OLED 55" 4K UHD 55C1',
      price: 6499.99,
      originalPrice: 7999.99,
      image: '/images/products/lg-oled.jpg',
      brand: 'LG',
      rating: 4.8,
      reviews: 189,
      tags: ['OLED', '4K', 'Gaming'],
      discount: 15
    },
    {
      id: '3',
      name: 'Soundbar Samsung HW-Q950A 11.1.4 Canais',
      price: 5999.99,
      originalPrice: 7499.99,
      image: '/images/products/samsung-soundbar.jpg',
      brand: 'Samsung',
      rating: 4.7,
      reviews: 156,
      tags: ['Dolby Atmos', 'Wireless', 'Bluetooth'],
      isFeatured: true
    },
    {
      id: '4',
      name: 'Projetor 4K Epson Home Cinema 3800',
      price: 12999.99,
      originalPrice: 14999.99,
      image: '/images/products/epson-projector.jpg',
      brand: 'Epson',
      rating: 4.8,
      reviews: 87,
      tags: ['4K', '3000 Lumens', 'HDR'],
      discount: 10
    }
  ],
  filters: {
    brands: [
      'Samsung',
      'LG',
      'Sony',
      'TCL',
      'Philips',
      'Epson',
      'JBL',
      'Bose'
    ],
    priceRanges: [
      { min: 0, max: 2000, label: 'Até R$ 2.000' },
      { min: 2000, max: 5000, label: 'R$ 2.000 a R$ 5.000' },
      { min: 5000, max: 10000, label: 'R$ 5.000 a R$ 10.000' },
      { min: 10000, max: 15000, label: 'R$ 10.000 a R$ 15.000' },
      { min: 15000, max: Infinity, label: 'Acima de R$ 15.000' }
    ],
    tags: [
      '4K',
      '8K',
      'OLED',
      'QLED',
      'HDR',
      'Dolby Atmos',
      'Smart TV',
      'Gaming'
    ]
  }
};

export function TVHome() {
  return <CategoryTemplate {...tvHomeData} />;
}
