import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ShoppingCart, 
  User,
  Search,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Gamepad,
  Tv,
  LogOut, 
  Settings, 
  ShoppingBag, 
  HeartIcon, 
  UserCircle,
  RefreshCcw,
  MessageSquareMore
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useMenu } from '../contexts/MenuContext';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './Auth/AuthModal';

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
    icon: <Laptop className="w-6 h-6" />,
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
    icon: <Smartphone className="w-6 h-6" />,
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
    icon: <Headphones className="w-6 h-6" />,
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
    icon: <Camera className="w-6 h-6" />,
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
    icon: <Gamepad className="w-6 h-6" />,
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
    icon: <Tv className="w-6 h-6" />,
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const getFirstName = (fullName: string | undefined) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  const handleAuthenticatedAction = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      window.location.href = path;
    }
  };

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
    <div className="flex items-center pl-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Encontre produtos..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button
        type="submit"
        className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ml-2"
      >
        <Search className="h-7 w-7" />
      </button>
    </div>
  );

  const renderUserMenu = () => (
    <div 
      className="relative group pl-6 border-l border-gray-200 dark:border-gray-700"
      ref={userMenuRef}
    >
      <button
        className="flex items-center space-x-2 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-2.5"
        onClick={() => !isAuthenticated && setIsAuthModalOpen(true)}
      >
        <span className="text-slate-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          <User className="w-7 h-7" />
        </span>
        <div className="flex items-center space-x-1">
          {!isAuthenticated ? (
            <span className="text-lg">Entrar</span>
          ) : (
            <div className="flex items-center">
              <span className="text-lg">Olá, </span>
              <span className="text-lg text-indigo-600 dark:text-indigo-400 ml-1">
                {getFirstName(user?.name)}
              </span>
              <ChevronDown className="w-5 h-5 ml-1" />
            </div>
          )}
        </div>
      </button>
      
      {isAuthenticated && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-gray-800 shadow-lg
                      ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none z-50
                      transition-all duration-200 transform origin-top-right
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible">
          <div className="py-2">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <UserCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-2 py-2 space-y-1">
              <a 
                href="/conta" 
                onClick={(e) => handleAuthenticatedAction(e, '/conta')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <User className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                <span className="flex-1">Dados da conta</span>
              </a>
              <a 
                href="/pedidos"
                onClick={(e) => handleAuthenticatedAction(e, '/pedidos')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <ShoppingBag className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                <span className="flex-1">Meus pedidos</span>
              </a>
              <a 
                href="/trocas"
                onClick={(e) => handleAuthenticatedAction(e, '/trocas')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <RefreshCcw className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                <span className="flex-1">Trocas e devoluções</span>
              </a>
              <a 
                href="/atendimento"
                onClick={(e) => handleAuthenticatedAction(e, '/atendimento')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <MessageSquareMore className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                <span className="flex-1">Atendimento</span>
              </a>
            </div>
            <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2.5 text-[15px] text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="flex-1 text-left">Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <nav className="bg-white dark:bg-slate-950 shadow-lg relative z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gray-200 dark:after:via-gray-800 after:to-transparent">
          <div className="max-w-[2000px] mx-auto px-2">
            <div className="flex h-20 items-center">
              {/* Logo */}
              <div className="flex-shrink-0 -ml-6">
                <button 
                  onClick={handleHomeClick}
                  className="text-3xl sm:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 
                    hover:from-indigo-700 hover:to-violet-700 
                    transition-all duration-300 whitespace-nowrap"
                >
                  NEXUS
                </button>
              </div>

              {/* Navigation */}
              <div className="hidden 2xl:flex items-center justify-center space-x-8 ml-16 flex-1 px-6">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative group flex-shrink-0"
                    onMouseEnter={() => setOpenDropdown(category.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={category.route + '?categoria=todos'}
                      className="flex items-center space-x-3 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-3 whitespace-nowrap"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(category.route + '?categoria=todos');
                      }}
                    >
                      <span className="text-slate-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {category.icon}
                      </span>
                      <span className="text-lg">{category.name}</span>
                      <ChevronDown className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-200" />
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
                            <p className="flex-1 text-base font-medium text-slate-700 dark:text-gray-300 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors duration-200">
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
              <div className="flex items-center space-x-4 flex-shrink-0 pr-2">
                {/* Search */}
                <div className="hidden 2xl:block w-[480px]">
                  {renderSearchBar()}
                </div>

                {/* User Menu */}
                <div className="hidden 2xl:block">
                  {renderUserMenu()}
                </div>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative group pl-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation('/cart');
                  }}
                >
                  <ShoppingCart className="h-6 w-6 text-slate-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 text-white text-sm flex items-center justify-center">
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
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;