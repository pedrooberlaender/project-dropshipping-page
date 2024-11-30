import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  // Notebooks
  {
    id: '1',
    name: 'MacBook Pro M2 14"',
    description: 'Apple M2 Pro, 16GB RAM, 512GB SSD, Tela Liquid Retina XDR',
    price: 14999,
    image: '/images/products/macbook-pro.jpg',
    category: 'notebooks',
    brand: 'Apple',
    isNew: true
  },
  {
    id: '2',
    name: 'Dell XPS 13 Plus',
    description: 'Intel Core i7 12ª Geração, 16GB RAM, 1TB SSD, Windows 11 Pro',
    price: 8999,
    originalPrice: 10499,
    image: '/images/products/dell-xps.jpg',
    category: 'notebooks',
    brand: 'Dell',
    isPromotion: true
  },
  {
    id: '3',
    name: 'Lenovo Legion 5 Pro',
    description: 'AMD Ryzen 7, RTX 3070, 32GB RAM, 1TB SSD',
    price: 7999,
    originalPrice: 9299,
    image: '/images/products/lenovo-legion.jpg',
    category: 'notebooks',
    brand: 'Lenovo',
    isPromotion: true
  },
  {
    id: '4',
    name: 'Notebook Lenovo Legion 5',
    description: 'AMD Ryzen 7, 16GB RAM, 512GB SSD, RTX 3060, Tela 15.6" 144Hz',
    price: 6999,
    originalPrice: 7999,
    image: '/images/products/notebook-lenovo.jpg',
    category: 'notebooks',
    brand: 'Lenovo',
    isPromotion: true
  },
  {
    id: '5',
    name: 'MacBook Air M1',
    description: 'Apple M1, 8GB RAM, 256GB SSD, Tela 13.3" Retina',
    price: 7999,
    originalPrice: 8999,
    image: '/images/products/macbook-air.jpg',
    category: 'notebooks',
    brand: 'Apple',
    isPromotion: true
  },
  {
    id: '6',
    name: 'Notebook Dell XPS 13',
    description: 'Intel Core i7 11ª Geração, 16GB RAM, 512GB SSD, Tela 13.4" Full HD+',
    price: 8499,
    originalPrice: 9999,
    image: '/images/products/notebook-dell.jpg',
    category: 'notebooks',
    brand: 'Dell',
    isPromotion: true
  },

  // Tablets
  {
    id: '7',
    name: 'iPad Pro 12.9"',
    description: 'M2 chip, 256GB, Wi-Fi + 5G, Liquid Retina XDR display',
    price: 11999,
    image: '/images/products/ipad-pro.jpg',
    category: 'tablets',
    brand: 'Apple',
    isNew: true
  },
  {
    id: '8',
    name: 'Samsung Galaxy Tab S9 Ultra',
    description: 'Snapdragon 8 Gen 2, 512GB, 16GB RAM, Tela 14.6" Dynamic AMOLED 2X',
    price: 9999,
    originalPrice: 11999,
    image: '/images/products/galaxy-tab.jpg',
    category: 'tablets',
    brand: 'Samsung',
    isPromotion: true
  },
  {
    id: '9',
    name: 'Samsung Galaxy Tab S8 Ultra',
    description: 'Snapdragon 8 Gen 1, 256GB, 12GB RAM, Tela 14.6" Super AMOLED',
    price: 7299,
    originalPrice: 8299,
    image: '/images/products/galaxy-tab.jpg',
    category: 'tablets',
    brand: 'Samsung',
    isPromotion: true
  },
  {
    id: '10',
    name: 'iPad Pro 12.9"',
    description: 'M1 Chip, 256GB, Wi-Fi, Liquid Retina XDR display',
    price: 9499,
    originalPrice: 10499,
    image: '/images/products/ipad-pro.jpg',
    category: 'tablets',
    brand: 'Apple',
    isPromotion: true
  },

  // Acessórios
  {
    id: '11',
    name: 'Mouse Logitech G Pro X Superlight 2',
    description: 'Sensor HERO 2, Wireless, 60g, RGB',
    price: 899,
    image: '/images/products/mouse-logitech.jpg',
    category: 'acessorios',
    brand: 'Logitech',
    isNew: true
  },
  {
    id: '12',
    name: 'Mouse Logitech G Pro X Superlight',
    description: 'Sensor HERO 25K, Wireless, 63g',
    price: 699,
    originalPrice: 899,
    image: '/images/products/mouse-logitech.jpg',
    category: 'acessorios',
    brand: 'Logitech',
    isPromotion: true
  },
  {
    id: '13',
    name: 'Teclado Razer BlackWidow V3',
    description: 'Switch Green, RGB Chroma, USB-C',
    price: 899,
    originalPrice: 1099,
    image: '/images/products/teclado-razer.jpg',
    category: 'acessorios',
    brand: 'Razer',
    isPromotion: true
  },
  {
    id: '14',
    name: 'Headset Corsair Virtuoso RGB',
    description: 'Wireless, Som Surround 7.1, Microfone Destacável',
    price: 1299,
    originalPrice: 1499,
    image: '/images/products/headset-corsair.jpg',
    category: 'acessorios',
    brand: 'Corsair',
    isPromotion: true
  },

  // Componentes
  {
    id: '15',
    name: 'Placa de Vídeo ASUS RTX 3070 Ti',
    description: '8GB GDDR6X, RGB, Ray Tracing',
    price: 4299,
    originalPrice: 4999,
    image: '/images/products/gpu-asus.jpg',
    category: 'componentes',
    brand: 'Asus',
    isPromotion: true
  },
  {
    id: '16',
    name: 'Processador AMD Ryzen 9 5900X',
    description: '12 núcleos, 24 threads, Até 4.8GHz',
    price: 2799,
    originalPrice: 3299,
    image: '/images/products/cpu-amd.jpg',
    category: 'componentes',
    brand: 'AMD',
    isPromotion: true
  },
  {
    id: '17',
    name: 'Memória RAM Corsair Vengeance RGB Pro',
    description: '32GB (2x16GB) DDR4 3600MHz',
    price: 899,
    originalPrice: 1099,
    image: '/images/products/ram-corsair.jpg',
    category: 'componentes',
    brand: 'Corsair',
    isPromotion: true
  },
  {
    id: '18',
    name: 'SSD Samsung 970 EVO Plus',
    description: '1TB, NVMe M.2, Leitura 3500MB/s',
    price: 799,
    originalPrice: 999,
    image: '/images/products/ssd-samsung.jpg',
    category: 'componentes',
    brand: 'Samsung',
    isPromotion: true
  }
];