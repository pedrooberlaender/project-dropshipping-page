import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, Laptop, Smartphone, Headphones, Camera, Gamepad, Tv, Home } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Category {
  name: string;
  icon: React.ReactNode;
  route: string;
  subcategories: Array<{
    name: string;
    route: string;
  }>;
}

const categories: Category[] = [
  {
    name: 'Eletrônicos',
    icon: <Laptop className="w-5 h-5" />,
    route: '/eletronicos',
    subcategories: [
      { name: 'Notebooks', route: '/eletronicos?categoria=notebooks' },
      { name: 'Tablets', route: '/eletronicos?categoria=tablets' },
      { name: 'Acessórios para PC', route: '/eletronicos?categoria=acessorios' },
      { name: 'Componentes', route: '/eletronicos?categoria=componentes' }
    ]
  },
  {
    name: 'Smartphones',
    icon: <Smartphone className="w-5 h-5" />,
    route: '/smartphones',
    subcategories: [
      { name: 'Apple', route: '/smartphones?marca=apple' },
      { name: 'Samsung', route: '/smartphones?marca=samsung' },
      { name: 'Xiaomi', route: '/smartphones?marca=xiaomi' },
      { name: 'Acessórios', route: '/smartphones?categoria=acessorios' }
    ]
  },
  {
    name: 'Áudio',
    icon: <Headphones className="w-5 h-5" />,
    route: '/audio',
    subcategories: [
      { name: 'Fones', route: '/audio?categoria=fones' },
      { name: 'Caixas de Som', route: '/audio?categoria=caixas' },
      { name: 'Microfones', route: '/audio?categoria=microfones' },
      { name: 'Home Theater', route: '/audio?categoria=home-theater' }
    ]
  },
  {
    name: 'Fotografia',
    icon: <Camera className="w-5 h-5" />,
    route: '/fotografia',
    subcategories: [
      { name: 'Câmeras', route: '/fotografia?categoria=cameras' },
      { name: 'Lentes', route: '/fotografia?categoria=lentes' },
      { name: 'Tripés', route: '/fotografia?categoria=tripes' },
      { name: 'Iluminação', route: '/fotografia?categoria=iluminacao' }
    ]
  },
  {
    name: 'Games',
    icon: <Gamepad className="w-5 h-5" />,
    route: '/games',
    subcategories: [
      { name: 'Consoles', route: '/games?categoria=consoles' },
      { name: 'Jogos', route: '/games?categoria=jogos' },
      { name: 'Acessórios', route: '/games?categoria=acessorios' },
      { name: 'Cadeiras Gamer', route: '/games?categoria=cadeiras' }
    ]
  },
  {
    name: 'TV & Home',
    icon: <Tv className="w-5 h-5" />,
    route: '/tv-home',
    subcategories: [
      { name: 'Smart TVs', route: '/tv-home?categoria=smart-tvs' },
      { name: 'Projetores', route: '/tv-home?categoria=projetores' },
      { name: 'Soundbars', route: '/tv-home?categoria=soundbars' },
      { name: 'Streaming', route: '/tv-home?categoria=streaming' }
    ]
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { state: { items } } = useCart();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderSearchBar = () => (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Encontre produtos..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </form>
  );

  const renderUserMenu = () => (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
      >
        <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>
      
      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <Link to="/conta" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Dados da conta
          </Link>
          <Link to="/pedidos" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Meus pedidos
          </Link>
          <Link to="/atendimento" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Atendimento ao cliente
          </Link>
          <Link to="/carteira" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Minha carteira
          </Link>
        </div>
      )}
    </div>
  );

  const renderMobileMenu = () => (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
        <div className="py-2">
          <div className="px-4 py-3">
            {renderSearchBar()}
          </div>

          {categories.map((category) => (
            <div key={category.name} className="px-2">
              <Link
                to={category.route}
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 
                        hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-400 dark:text-gray-500">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </Link>
              
              <div className="ml-6 space-y-1">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.route}
                    className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 
                            hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-800/50 transition-colors duration-300 relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          {isCartPage ? (
            <div className="flex items-center justify-between w-full">
              {/* Ícone Home à esquerda */}
              <Link 
                to="/"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              >
                <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </Link>

              {/* Logo e título centralizados */}
              <div className="flex items-center justify-center flex-1">
                <Link 
                  to="/"
                  className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 
                    lg:hover:from-indigo-700 lg:hover:to-violet-700 
                    dark:from-indigo-500 dark:to-violet-500 
                    lg:dark:hover:from-indigo-400 lg:dark:hover:to-violet-400 
                    transition-all duration-300 min-w-[130px]"
                >
                  NEXUS
                </Link>
                <span className="mx-6 text-gray-300 dark:text-gray-600">|</span>
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Carrinho de Compras
                  </h1>
                </div>
              </div>

              {/* Menu do usuário e categorias à direita */}
              <div className="flex items-center space-x-2">
                {/* Menu de categorias */}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                    aria-expanded={isOpen}
                    aria-label="Menu de categorias"
                  >
                    {isOpen ? (
                      <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>

                  {/* Menu dropdown para desktop */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 hidden lg:block">
                      <div className="py-2">
                        <div className="px-4 py-3">
                          {renderSearchBar()}
                        </div>
                        {categories.map((category) => (
                          <div key={category.name} className="px-2">
                            <Link
                              to={category.route}
                              className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-200 
                                      hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="text-gray-400 dark:text-gray-500">
                                {category.icon}
                              </span>
                              <span>{category.name}</span>
                            </Link>
                            
                            <div className="ml-6 space-y-1">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.route}
                                  className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 
                                          hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {renderUserMenu()}
              </div>
            </div>
          ) : (
            <>
              {/* Layout normal para outras páginas */}
              <div className="flex items-center">
                <Link 
                  to="/"
                  className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 
                    lg:hover:from-indigo-700 lg:hover:to-violet-700 
                    dark:from-indigo-500 dark:to-violet-500 
                    lg:dark:hover:from-indigo-400 lg:dark:hover:to-violet-400 
                    transition-all duration-300 min-w-[130px]"
                >
                  NEXUS
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center space-x-10 flex-1 px-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative group"
                  >
                    <Link
                      to={category.route}
                      className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-2"
                    >
                      <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {category.icon}
                      </span>
                      <span className="text-base">{category.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Link>

                    <div className="absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-700/50 
                                  ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none z-50
                                  transition-all duration-200 transform origin-top-left
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <div className="py-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.route}
                            className="group/item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          >
                            <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                              {sub.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-8">
                <div className="relative w-96">
                  {renderSearchBar()}
                </div>

                {renderUserMenu()}

                <div className="relative">
                  <Link
                    to="/cart"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 flex items-center gap-1"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    <span 
                      className={`text-sm font-medium ${
                        items.length > 0 
                          ? 'bg-indigo-600 text-white px-2 py-0.5 rounded-full' 
                          : 'text-gray-600 dark:text-gray-300'
                      } ${isHovered ? 'cart-counter-animation' : ''}`}
                    >
                      {items.length || "0"}
                    </span>
                  </Link>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center lg:hidden gap-4">
                {renderUserMenu()}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-label="Menu principal"
                >
                  {isOpen ? (
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && renderMobileMenu()}
    </nav>
  );
};

export default Navbar;