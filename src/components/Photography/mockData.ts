import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Canon EOS R6 Mark II",
    description: "Câmera mirrorless full-frame com 24.2MP, gravação 4K 60p e estabilização de 8 stops",
    price: 14999.99,
    originalPrice: 16999.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=774&auto=format&fit=crop",
    category: "cameras",
    brand: "Canon",
    isNew: true,
    stock: 8
  },
  {
    id: 2,
    name: "Sony Alpha A7 IV",
    description: "Câmera mirrorless full-frame com 33MP, AF inteligente e gravação 4K",
    price: 15999.99,
    originalPrice: 18999.99,
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=774&auto=format&fit=crop",
    category: "cameras",
    brand: "Sony",
    isNew: true,
    stock: 5
  },
  {
    id: 3,
    name: "Nikon Z6 II",
    description: "Câmera mirrorless full-frame com 24.5MP, dual processors e 4K 60p",
    price: 13999.99,
    originalPrice: 15999.99,
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=774&auto=format&fit=crop",
    category: "cameras",
    brand: "Nikon",
    isNew: false,
    stock: 12
  },
  {
    id: 4,
    name: "Canon RF 24-70mm f/2.8L",
    description: "Lente zoom profissional para sistema RF com abertura constante f/2.8",
    price: 11499.99,
    originalPrice: 12999.99,
    image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=774&auto=format&fit=crop",
    category: "lentes",
    brand: "Canon",
    isNew: false,
    stock: 6
  },
  {
    id: 5,
    name: "Sony 85mm f/1.4 GM",
    description: "Lente prime profissional para retratos com bokeh excepcional",
    price: 9999.99,
    originalPrice: 11999.99,
    image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=774&auto=format&fit=crop",
    category: "lentes",
    brand: "Sony",
    isNew: false,
    stock: 4
  },
  {
    id: 6,
    name: "DJI RSC 3 Pro",
    description: "Estabilizador profissional para câmeras mirrorless e DSLR",
    price: 3999.99,
    originalPrice: 4499.99,
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "DJI",
    isNew: true,
    stock: 15
  },
  {
    id: 7,
    name: "Godox AD600 Pro",
    description: "Flash profissional portátil com 600Ws e receptor wireless embutido",
    price: 4999.99,
    originalPrice: 5999.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=774&auto=format&fit=crop",
    category: "iluminacao",
    brand: "Godox",
    isNew: false,
    stock: 10
  },
  {
    id: 8,
    name: "Profoto B10 Plus",
    description: "Flash compacto de estúdio com 500Ws e controle via smartphone",
    price: 8999.99,
    originalPrice: 10999.99,
    image: "https://images.unsplash.com/photo-1542567455-cd733f23fbb1?q=80&w=774&auto=format&fit=crop",
    category: "iluminacao",
    brand: "Profoto",
    isNew: true,
    stock: 3
  },
  {
    id: 9,
    name: "Manfrotto MT055CXPRO4",
    description: "Tripé profissional de fibra de carbono com coluna central versátil",
    price: 2999.99,
    originalPrice: 3499.99,
    image: "https://images.unsplash.com/photo-1520549233664-03f65c1d1327?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Manfrotto",
    isNew: false,
    stock: 20
  },
  {
    id: 10,
    name: "DJI Air 2S",
    description: "Drone com câmera 5.4K, sensor de 1 polegada e autonomia de 31 minutos",
    price: 7999.99,
    originalPrice: 9499.99,
    image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=774&auto=format&fit=crop",
    category: "drones",
    brand: "DJI",
    isNew: true,
    stock: 7
  },
  {
    id: 11,
    name: "Nikon Z 24-120mm f/4 S",
    description: "Lente zoom versátil para sistema Z com excelente alcance",
    price: 6999.99,
    originalPrice: 7999.99,
    image: "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?q=80&w=774&auto=format&fit=crop",
    category: "lentes",
    brand: "Nikon",
    isNew: false,
    stock: 9
  },
  {
    id: 12,
    name: "DJI Mini 3 Pro",
    description: "Drone compacto com câmera 4K, sensor de 1/1.3 polegada e obstáculos tri-direcionais",
    price: 4999.99,
    originalPrice: 5999.99,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=774&auto=format&fit=crop",
    category: "drones",
    brand: "DJI",
    isNew: true,
    stock: 11
  }
];
