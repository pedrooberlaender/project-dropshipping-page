import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    description: 'iPhone 14 Pro Max com 256GB, Câmera Tripla de 48MP, Tela Super Retina XDR de 6.7"',
    price: 7999.99,
    originalPrice: 8999.99,
    image: '/images/products/iphone-14.jpg',
    brand: 'Apple',
    category: 'iphone',
    rating: 4.9,
    reviews: 256,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Samsung Galaxy S23 Ultra com 256GB, Câmera de 200MP, S Pen integrada',
    price: 6799.99,
    originalPrice: 7499.99,
    image: '/images/products/galaxy-s23.jpg',
    brand: 'Samsung',
    category: 'android',
    rating: 4.8,
    reviews: 189,
    inStock: true
  },
  {
    id: '3',
    name: 'Xiaomi 13 Pro',
    description: 'Xiaomi 13 Pro com 256GB, Câmera Leica, Snapdragon 8 Gen 2',
    price: 5499.99,
    originalPrice: 5999.99,
    image: '/images/products/xiaomi-13.jpg',
    brand: 'Xiaomi',
    category: 'android',
    rating: 4.7,
    reviews: 145,
    inStock: true
  },
  {
    id: '4',
    name: 'iPhone 13',
    description: 'iPhone 13 com 128GB, Câmera Dupla, Tela Super Retina XDR de 6.1"',
    price: 4999.99,
    originalPrice: 5499.99,
    image: '/images/products/iphone-13.jpg',
    brand: 'Apple',
    category: 'iphone',
    rating: 4.8,
    reviews: 324,
    inStock: true
  },
  {
    id: '5',
    name: 'Motorola Edge 40 Pro',
    description: 'Motorola Edge 40 Pro com 256GB, Câmera tripla de 50MP, Tela pOLED de 6.7"',
    price: 4299.99,
    originalPrice: 4799.99,
    image: '/images/products/moto-edge.jpg',
    brand: 'Motorola',
    category: 'android',
    rating: 4.6,
    reviews: 98,
    inStock: true
  },
  {
    id: '6',
    name: 'Nokia 105',
    description: 'Nokia 105 com teclado físico, bateria de longa duração, ideal para uso básico',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/products/nokia-105.jpg',
    brand: 'Nokia',
    category: 'basicos',
    rating: 4.5,
    reviews: 156,
    inStock: true
  },
  {
    id: '7',
    name: 'LG K22+',
    description: 'LG K22+ com Android Go, ideal para uso básico e ótima duração de bateria',
    price: 699.99,
    originalPrice: 899.99,
    image: '/images/products/lg-k22.jpg',
    brand: 'LG',
    category: 'basicos',
    rating: 4.3,
    reviews: 89,
    inStock: true
  },
  {
    id: '8',
    name: 'Carregador iPhone 20W',
    description: 'Carregador USB-C de 20W original para iPhone com carregamento rápido',
    price: 219.99,
    originalPrice: 249.99,
    image: '/images/products/iphone-charger.jpg',
    brand: 'Apple',
    category: 'acessorios',
    rating: 4.8,
    reviews: 445,
    inStock: true
  },
  {
    id: '9',
    name: 'Capa Protetora Galaxy S23',
    description: 'Capa protetora original Samsung com proteção militar para Galaxy S23',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/products/samsung-case.jpg',
    brand: 'Samsung',
    category: 'acessorios',
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: '10',
    name: 'Película iPhone 14 Pro Max',
    description: 'Película de vidro temperado com proteção contra impacto e riscos',
    price: 79.99,
    originalPrice: 99.99,
    image: '/images/products/screen-protector.jpg',
    brand: 'Generic',
    category: 'acessorios',
    rating: 4.6,
    reviews: 567,
    inStock: true
  }
];