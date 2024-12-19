import { Product } from '../../types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "PlayStation 5",
    description: "Console PlayStation 5 com drive de disco, controle DualSense e tecnologia Ray Tracing",
    price: 3999.99,
    originalPrice: 4499.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=774&auto=format&fit=crop",
    category: "consoles",
    brand: "Sony",
    isNew: true,
    stock: 15
  },
  {
    id: 2,
    name: "Xbox Series X",
    description: "Console Xbox Series X 1TB com controle sem fio e suporte a 4K 120fps",
    price: 3799.99,
    originalPrice: 4299.99,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=774&auto=format&fit=crop",
    category: "consoles",
    brand: "Microsoft",
    isNew: true,
    stock: 12
  },
  {
    id: 3,
    name: "Nintendo Switch OLED",
    description: "Console híbrido com tela OLED de 7 polegadas e dock com porta LAN",
    price: 2499.99,
    originalPrice: 2799.99,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=774&auto=format&fit=crop",
    category: "consoles",
    brand: "Nintendo",
    isNew: false,
    stock: 20
  },
  {
    id: 4,
    name: "DualSense Edge",
    description: "Controle sem fio profissional com botões personalizáveis e gatilhos ajustáveis",
    price: 999.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Sony",
    isNew: true,
    stock: 25
  },
  {
    id: 5,
    name: "Xbox Elite Controller Series 2",
    description: "Controle premium com peças intercambiáveis e perfis personalizáveis",
    price: 899.99,
    originalPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Microsoft",
    isNew: false,
    stock: 18
  },
  {
    id: 6,
    name: "Razer BlackShark V2 Pro",
    description: "Headset gamer sem fio com som surround THX e microfone destacável",
    price: 799.99,
    originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Razer",
    isNew: true,
    stock: 30
  },
  {
    id: 7,
    name: "SteelSeries Arctis Nova Pro",
    description: "Headset premium com ANC e som Hi-Fi para gaming",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "SteelSeries",
    isNew: true,
    stock: 15
  },
  {
    id: 8,
    name: "Logitech G Pro X Superlight",
    description: "Mouse gamer sem fio ultraleve com sensor HERO 25K",
    price: 699.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Logitech",
    isNew: false,
    stock: 22
  },
  {
    id: 9,
    name: "Seagate Game Drive 4TB",
    description: "HD externo para PS5 e PS4 com 4TB de capacidade",
    price: 799.99,
    originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Seagate",
    isNew: false,
    stock: 25
  },
  {
    id: 10,
    name: "Nintendo Pro Controller",
    description: "Controle profissional para Nintendo Switch com giroscópio e NFC",
    price: 499.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Nintendo",
    isNew: false,
    stock: 20
  },
  {
    id: 11,
    name: "Razer Kishi V2",
    description: "Controle mobile para smartphones com conexão USB-C",
    price: 399.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "Razer",
    isNew: true,
    stock: 28
  },
  {
    id: 12,
    name: "HyperX Alloy Origins",
    description: "Teclado mecânico gamer com switches HyperX Red e iluminação RGB",
    price: 599.99,
    originalPrice: 749.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=774&auto=format&fit=crop",
    category: "acessorios",
    brand: "HyperX",
    isNew: false,
    stock: 35
  }
];
