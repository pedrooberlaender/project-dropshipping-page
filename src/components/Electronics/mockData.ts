import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone Galaxy S23 Ultra',
    description: 'O mais avançado smartphone Samsung com câmera de 200MP e S Pen integrada',
    price: 6999.99,
    originalPrice: 7999.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=60',
    category: 'smartphones',
    brand: 'Samsung',
    isNew: true,
    stock: 15
  },
  {
    id: 2,
    name: 'MacBook Pro 14" M3 Pro',
    description: 'Notebook Apple com chip M3 Pro, 18GB RAM, 512GB SSD',
    price: 14999.99,
    originalPrice: 15999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60',
    category: 'notebooks',
    brand: 'Apple',
    isNew: true,
    stock: 10
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    description: 'Fone de ouvido premium com cancelamento de ruído',
    price: 1999.99,
    originalPrice: 2499.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    category: 'audio',
    brand: 'Sony',
    isNew: false,
    stock: 20
  },
  {
    id: 4,
    name: 'Smart TV LG OLED 65"',
    description: 'TV OLED 4K com WebOS e processador α9 Gen6 AI',
    price: 8999.99,
    originalPrice: 10999.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60',
    category: 'tv',
    brand: 'LG',
    isNew: true,
    stock: 8
  },
  {
    id: 5,
    name: 'PlayStation 5',
    description: 'Console de última geração com controle DualSense',
    price: 3799.99,
    originalPrice: 4499.99,
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop&q=60',
    category: 'games',
    brand: 'Sony',
    isNew: false,
    stock: 12
  },
  {
    id: 6,
    name: 'iPad Pro 12.9" M2',
    description: 'Tablet Apple com chip M2, tela Liquid Retina XDR',
    price: 9499.99,
    originalPrice: 10499.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
    category: 'tablets',
    brand: 'Apple',
    isNew: true,
    stock: 15
  },
  {
    id: 7,
    name: 'Canon EOS R5',
    description: 'Câmera mirrorless profissional com gravação 8K',
    price: 19999.99,
    originalPrice: 22999.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    category: 'cameras',
    brand: 'Canon',
    isNew: false,
    stock: 5
  },
  {
    id: 8,
    name: 'Dell XPS 15',
    description: 'Notebook premium com Intel Core i9 e RTX 4070',
    price: 12999.99,
    originalPrice: 13999.99,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=60',
    category: 'notebooks',
    brand: 'Dell',
    isNew: true,
    stock: 10
  },
  {
    id: 9,
    name: 'iPhone 15 Pro Max',
    description: 'iPhone com câmera de 48MP e chip A17 Pro',
    price: 9499.99,
    originalPrice: 10499.99,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60',
    category: 'smartphones',
    brand: 'Apple',
    isNew: true,
    stock: 18
  },
  {
    id: 10,
    name: 'Samsung QN85C Neo QLED 75"',
    description: 'Smart TV com tecnologia Mini LED e processador Neural Quantum',
    price: 11999.99,
    originalPrice: 13999.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60',
    category: 'tv',
    brand: 'Samsung',
    isNew: false,
    stock: 7
  }
];

// Categorias disponíveis
export const categories = [
  'todos',
  'smartphones',
  'notebooks',
  'audio',
  'tv',
  'games',
  'tablets',
  'cameras'
];

// Marcas disponíveis
export const brands = [
  'Samsung',
  'Apple',
  'Sony',
  'LG',
  'Dell',
  'Canon'
];

// Faixas de desconto
export const discountRanges = [
  '0-10%',
  '10-20%',
  '20-30%',
  '30% ou mais'
];
