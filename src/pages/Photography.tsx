import React from 'react';
import { CategoryTemplate } from '../components/CategoryPage/CategoryTemplate';

const photographyData = {
  categoryName: 'Fotografia',
  subcategories: [
    'Câmeras DSLR',
    'Câmeras Mirrorless',
    'Lentes',
    'Flashes',
    'Tripés',
    'Estabilizadores',
    'Iluminação',
    'Acessórios'
  ],
  products: [
    {
      id: '1',
      name: 'Sony Alpha a7 III Mirrorless Camera com Lente 28-70mm',
      price: 12999.99,
      originalPrice: 14999.99,
      image: '/images/products/sony-a7iii.jpg',
      brand: 'Sony',
      rating: 4.9,
      reviews: 156,
      tags: ['Full Frame', '4K', 'Estabilização'],
      isNew: true,
      isFeatured: true
    },
    {
      id: '2',
      name: 'Canon EOS R6 Mirrorless Camera (Corpo)',
      price: 15999.99,
      originalPrice: 17499.99,
      image: '/images/products/canon-r6.jpg',
      brand: 'Canon',
      rating: 4.8,
      reviews: 98,
      tags: ['Full Frame', '4K 60fps', 'IBIS'],
      discount: 10
    },
    {
      id: '3',
      name: 'Lente Sony FE 24-70mm f/2.8 GM',
      price: 9999.99,
      originalPrice: 11499.99,
      image: '/images/products/sony-24-70.jpg',
      brand: 'Sony',
      rating: 4.9,
      reviews: 87,
      tags: ['Zoom', 'f/2.8', 'G Master'],
      isFeatured: true
    }
  ],
  filters: {
    brands: [
      'Sony',
      'Canon',
      'Nikon',
      'Fujifilm',
      'Panasonic',
      'DJI',
      'GoPro',
      'Sigma'
    ],
    priceRanges: [
      { min: 0, max: 1000, label: 'Até R$ 1.000' },
      { min: 1000, max: 5000, label: 'R$ 1.000 a R$ 5.000' },
      { min: 5000, max: 10000, label: 'R$ 5.000 a R$ 10.000' },
      { min: 10000, max: 20000, label: 'R$ 10.000 a R$ 20.000' },
      { min: 20000, max: Infinity, label: 'Acima de R$ 20.000' }
    ],
    tags: [
      'Full Frame',
      'APS-C',
      '4K',
      'Estabilização',
      'Mirrorless',
      'DSLR',
      'Weather Sealed',
      'Touch Screen'
    ]
  }
};

export function Photography() {
  return <CategoryTemplate {...photographyData} />;
}
