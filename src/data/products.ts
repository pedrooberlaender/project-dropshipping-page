import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smart TV OLED 55"',
    price: 3999.90,
    originalPrice: 4999.90,
    image: '/placeholder-product.jpg',
    brand: 'LG',
    category: 'tvs',
    isPromotion: true,
    maxQuantity: 3,
    specifications: {
      resolution: '4K',
      screenSize: '55 polegadas',
      smartFeatures: 'WebOS, ThinQ AI'
    },
    description: 'O Smart TV OLED 55" é um produto de alta qualidade, desenvolvido com os melhores materiais e tecnologias disponíveis no mercado.'
  },
  {
    id: '2',
    name: 'Smartphone Galaxy S23',
    price: 4999.90,
    originalPrice: 5999.90,
    image: '/smartphone-s23.jpg',
    brand: 'Samsung',
    category: 'smartphones',
    isPromotion: true,
    maxQuantity: 5,
    specifications: {
      processor: 'Snapdragon 8 Gen 2',
      ram: '8GB',
      storage: '256GB'
    },
    description: 'O Galaxy S23 é o mais recente smartphone da Samsung, com câmera de alta resolução e processador potente.'
  },
  {
    id: 'starlink',
    name: 'Adaptador Starlink Ethernet V2',
    price: 249.99,
    originalPrice: 300.00,
    image: '/images/products/starlink-adapter.png',
    brand: 'Genérico',
    category: 'eletronicos',
    isPromotion: true,
    maxQuantity: 10,
    specifications: {
      tipo: 'Adaptador Ethernet',
      versao: 'V2',
      categoria: 'Eletrônicos, componentes'
    },
    description: 'Adaptador Starlink Ethernet V2 é a solução definitiva para quem deseja aproveitar a conexão de internet via satélite com máxima eficiência e desempenho. Projetado especificamente para o sistema Starlink de 2ª geração, este adaptador oferece uma conexão com fio confiável, garantindo que suas atividades online sejam rápidas, estáveis e ininterruptas.'
  },
  {
    id: 'carrinho-off-road',
    name: 'Carrinho de controle remoto off-road 4x4 MN82',
    price: 0, // Aguardando preço
    originalPrice: 0, // Aguardando preço original
    image: '/images/products/carrinho-off-road.png',
    brand: 'MN82',
    category: 'brinquedos',
    isPromotion: false,
    maxQuantity: 10,
    specifications: {
      tipo: 'Carrinho de Controle Remoto',
      modelo: 'MN82',
      tracao: '4x4',
      categoria: 'Off-road'
    },
    description: '' // Aguardando descrição
  }
];
