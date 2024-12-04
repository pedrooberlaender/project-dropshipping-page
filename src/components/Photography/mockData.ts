import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  {
    id: 'DSLR-SNY-A7IV-001',
    name: 'Sony Alpha A7 IV',
    description: 'Câmera mirrorless full-frame de 33MP, gravação 4K 60p, estabilização de 5 eixos',
    price: 15999.99,
    originalPrice: 17999.99,
    image: '/images/products/sony-a7iv.jpg',
    brand: 'Sony',
    category: 'cameras',
    rating: 4.9,
    reviews: 156,
    isNew: true,
    isFeatured: true,
    inStock: true
  },
  {
    id: 'LENS-CAN-2470-001',
    name: 'Canon RF 24-70mm f/2.8L',
    description: 'Lente zoom profissional para câmeras Canon RF, abertura f/2.8 constante',
    price: 12499.99,
    originalPrice: 13999.99,
    image: '/images/products/canon-rf2470.jpg',
    brand: 'Canon',
    category: 'lentes',
    rating: 4.8,
    reviews: 89,
    inStock: true
  },
  {
    id: 'TRIPD-PKD-TRAV-001',
    name: 'Peak Design Travel Tripod',
    description: 'Tripé de viagem em fibra de carbono, compacto e leve, cabeça de bola',
    price: 3999.99,
    originalPrice: 4499.99,
    image: '/images/products/peak-tripod.jpg',
    brand: 'Peak Design',
    category: 'tripes',
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: 'LIGHT-GDX-600P-001',
    name: 'Godox AD600Pro',
    description: 'Flash profissional 600W TTL com bateria, reciclagem rápida e controle sem fio',
    price: 5999.99,
    originalPrice: 6999.99,
    image: '/images/products/godox-ad600.jpg',
    brand: 'Godox',
    category: 'iluminacao',
    rating: 4.8,
    reviews: 167,
    inStock: true
  },
  {
    id: 'DSLR-CAN-R6M2-002',
    name: 'Canon EOS R6 Mark II',
    description: 'Câmera mirrorless full-frame de 24MP, gravação 4K 60p, estabilização de 8 stops',
    price: 13999.99,
    originalPrice: 15999.99,
    image: '/images/products/canon-r6.jpg',
    brand: 'Canon',
    category: 'cameras',
    rating: 4.9,
    reviews: 123,
    inStock: true
  },
  {
    id: 'LENS-SNY-70GM2-002',
    name: 'Sony FE 70-200mm f/2.8 GM II',
    description: 'Lente teleobjetiva zoom profissional, abertura f/2.8 constante',
    price: 14999.99,
    originalPrice: 16999.99,
    image: '/images/products/sony-70200.jpg',
    brand: 'Sony',
    category: 'lentes',
    rating: 4.9,
    reviews: 78,
    inStock: true
  },
  {
    id: 'TRIPD-MFT-055X4-002',
    name: 'Manfrotto MT055XPRO4',
    description: 'Tripé profissional em alumínio, coluna central horizontal, até 9kg',
    price: 2499.99,
    originalPrice: 2999.99,
    image: '/images/products/manfrotto-tripod.jpg',
    brand: 'Manfrotto',
    category: 'tripes',
    rating: 4.7,
    reviews: 245,
    inStock: true
  },
  {
    id: 'LIGHT-APT-600X-002',
    name: 'Aputure LS 600x Pro',
    description: 'LED profissional bicolor 600W, controle DMX, Bowens Mount',
    price: 9999.99,
    originalPrice: 11999.99,
    image: '/images/products/aputure-600x.jpg',
    brand: 'Aputure',
    category: 'iluminacao',
    rating: 4.8,
    reviews: 56,
    inStock: true
  },
  {
    id: 'LIGHT-PFT-B10X-003',
    name: 'Profoto B10X Plus',
    description: 'Flash de estúdio portátil 500W, bateria integrada, luz de modelagem LED',
    price: 12999.99,
    originalPrice: 14999.99,
    image: '/images/products/profoto-b10x.jpg',
    brand: 'Profoto',
    category: 'iluminacao',
    rating: 4.8,
    reviews: 34,
    inStock: true
  }
];
