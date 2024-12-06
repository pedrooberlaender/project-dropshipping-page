import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  {
    id: 'STTV-SAM-NEO65-001',
    name: 'Smart TV Samsung Neo QLED 65"',
    description: 'TV Neo QLED 4K, 120Hz, HDR, Alexa built-in, Design slim',
    price: 6999.99,
    originalPrice: 8499.99,
    image: '/images/products/samsung-neo-qled.jpg',
    brand: 'Samsung',
    category: 'smart-tvs',
    rating: 4.9,
    reviews: 345,
    isFeatured: true,
    inStock: true
  },
  {
    id: 'STTV-LG-OLDC3-002',
    name: 'LG OLED evo C3 55"',
    description: 'TV OLED 4K, 120Hz, Dolby Vision IQ, webOS 23, Processador α9 Gen6',
    price: 5999.99,
    originalPrice: 6999.99,
    image: '/images/products/lg-oled-c3.jpg',
    brand: 'LG',
    category: 'smart-tvs',
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 'SBAR-SON-ARC-001',
    name: 'Sonos Arc',
    description: 'Soundbar Premium com Dolby Atmos, 11 drivers, controle por voz',
    price: 7499.99,
    originalPrice: 8499.99,
    image: '/images/products/sonos-arc.jpg',
    brand: 'Sonos',
    category: 'soundbars',
    rating: 4.9,
    reviews: 189,
    inStock: true
  },
  {
    id: 'SBAR-SAM-Q990C-002',
    name: 'Samsung HW-Q990C',
    description: 'Soundbar 11.1.4 canais, Dolby Atmos, Q-Symphony, SpaceFit Sound Pro',
    price: 5999.99,
    originalPrice: 6999.99,
    image: '/images/products/samsung-q990c.jpg',
    brand: 'Samsung',
    category: 'soundbars',
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 'STRM-ROK-ULTRA-001',
    name: 'Roku Ultra',
    description: 'Player de streaming 4K HDR, Dolby Vision, Dolby Atmos, Wi-Fi 6',
    price: 899.99,
    originalPrice: 999.99,
    image: '/images/products/roku-ultra.jpg',
    brand: 'Roku',
    category: 'streaming',
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: 'STRM-NVD-SHLD-002',
    name: 'NVIDIA Shield TV Pro',
    description: 'Player de streaming 4K AI Upscaling, GeForce NOW, Google Assistant',
    price: 1999.99,
    originalPrice: 2299.99,
    image: '/images/products/nvidia-shield.jpg',
    brand: 'NVIDIA',
    category: 'streaming',
    rating: 4.8,
    reviews: 167,
    inStock: true
  }
];
