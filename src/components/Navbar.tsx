import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, Laptop, Smartphone, Headphones, Camera, Gamepad, Tv } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useMenu } from '../contexts/MenuContext';

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
      { name: 'iPhones', route: '/smartphones?categoria=iphone' },
      { name: 'Android', route: '/smartphones?categoria=android' },
      { name: 'Básicos', route: '/smartphones?categoria=basicos' },
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

const Navbar: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: { items } } = useCart();
  const { theme } = useTheme();
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  const renderSearchBar = () => (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Encontre produtos..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                placeholder-gray-500 dark:placeholder-gray-400"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
    </form>
  );

  const renderUserMenu = () => (
    <div 
      className="relative group"
      ref={userMenuRef}
    >
      <button
        className="flex items-center space-x-2 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-2"
      >
        <span className="text-slate-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          <User className="h-5 w-5" />
        </span>
        <span className="text-base">Minha Conta</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg
                    ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none z-50
                    transition-all duration-200 transform origin-top-right
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible">
        <div className="py-2">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Link 
              to="/login" 
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
            >
              Entre ou cadastre-se
            </Link>
          </div>
          <div className="py-2">
            <Link to="/conta" className="group/item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-700">
              <User className="h-4 w-4 mr-3 text-slate-400 dark:text-gray-500 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400" />
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                Dados da conta
              </p>
            </Link>
            <Link to="/pedidos" className="group/item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-700">
              <svg className="h-4 w-4 mr-3 text-slate-400 dark:text-gray-500 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                Meus pedidos
              </p>
            </Link>
            <Link to="/trocas" className="group/item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-700">
              <svg className="h-4 w-4 mr-3 text-slate-400 dark:text-gray-500 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                Trocas e devoluções
              </p>
            </Link>
            <Link to="/atendimento" className="group/item flex items-center px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-700">
              <svg className="h-4 w-4 mr-3 text-slate-400 dark:text-gray-500 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="flex-1 text-sm font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                Atendimento
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="bg-white dark:bg-slate-950 shadow-lg relative z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-200 dark:after:via-gray-800 after:to-transparent">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleHomeClick}
                className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 
                  hover:from-indigo-700 hover:to-violet-700 
                  transition-all duration-300 whitespace-nowrap"
              >
                NEXUS
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden 2xl:flex items-center justify-center space-x-6 flex-1 px-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative group flex-shrink-0"
                  onMouseEnter={() => setOpenDropdown(category.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={category.route + '?categoria=todos'}
                    className="flex items-center space-x-2 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-2 whitespace-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(category.route + '?categoria=todos');
                    }}
                  >
                    <span className="text-slate-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {category.icon}
                    </span>
                    <span className="text-base">{category.name}</span>
                    <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  <div className={`absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg
                                ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none
                                transition-all duration-200 transform origin-top-left
                                ${openDropdown === category.name 
                                  ? 'opacity-100 visible translate-y-0' 
                                  : 'opacity-0 invisible -translate-y-2'}
                                z-[60]`}>
                    <div className="py-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.route}
                          className="group/item relative flex items-center px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(sub.route);
                          }}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-top"></div>
                          <p className="flex-1 text-sm font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors duration-200">
                            {sub.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search, User Menu e Cart */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Search */}
              <div className="hidden 2xl:block w-96">
                {renderSearchBar()}
              </div>

              {/* User Menu */}
              <div className="hidden 2xl:block">
                {renderUserMenu()}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 group"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="2xl:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 group"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="2xl:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-slate-950 shadow-lg overflow-y-auto">
              {/* Cabeçalho do menu móvel */}
              <div className="sticky top-0 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 group"
                  >
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                  </button>
                </div>
                <div className="px-4 pb-3">
                  {renderSearchBar()}
                </div>
              </div>

              {/* Lista de categorias */}
              <div className="py-2">
                {categories.map((category) => (
                  <div key={category.name} className="px-2">
                    <Link
                      to={category.route + '?categoria=todos'}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg group"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(category.route + '?categoria=todos');
                      }}
                    >
                      <span className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {category.icon}
                      </span>
                      <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">{category.name}</span>
                    </Link>
                    
                    <div className="ml-6 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.route}
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(sub.route);
                          }}
                        >
                          <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rodapé do menu móvel */}
              <div className="sticky bottom-0 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
                <div className="px-4 py-3 space-y-3">
                  <Link 
                    to="/login" 
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entre ou cadastre-se
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;