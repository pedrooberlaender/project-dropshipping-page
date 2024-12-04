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
  MessageSquareMore,
  Package,
  RefreshCw,
  HelpCircle
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
      { name: 'Smart TVs', route: '/tv-home/smart-tvs' },
      { name: 'Soundbars', route: '/tv-home/soundbars' },
      { name: 'Home Theaters', route: '/tv-home/home-theaters' },
      { name: 'Projetores', route: '/tv-home/projetores' },
    ]
  }
];

const Navbar = () => {
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
                            ring-1 ring-black ring-opacity-5 dark:ring-gray-700
                            transition-all duration-200 transform origin-top-right
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            z-[60]">
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
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                <User className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                <span className="flex-1">Dados da conta</span>
              </a>
              <a 
                href="/pedidos"
                onClick={(e) => handleAuthenticatedAction(e, '/pedidos')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                <ShoppingBag className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                <span className="flex-1">Meus pedidos</span>
              </a>
              <a 
                href="/trocas"
                onClick={(e) => handleAuthenticatedAction(e, '/trocas')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                <RefreshCcw className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                <span className="flex-1">Trocas e devoluções</span>
              </a>
              <a 
                href="/atendimento"
                onClick={(e) => handleAuthenticatedAction(e, '/atendimento')}
                className="group flex items-center px-4 py-2.5 text-[15px] text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
              >
                <MessageSquareMore className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                <span className="flex-1">Atendimento</span>
              </a>
            </div>
            <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2.5 text-[15px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-500 transition-colors duration-150"
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

  const renderUserMenuMobile = () => (
    <div className="sm:hidden relative" ref={userMenuRef}>
      <button
        onClick={() => {
          if (isAuthenticated) {
            setUserMenuOpen(!userMenuOpen);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                  border border-gray-200 dark:border-gray-700 rounded-lg
                  hover:border-indigo-600 dark:hover:border-indigo-400
                  transition-colors duration-150"
      >
        <User className="h-6 w-6" />
      </button>
      
      {isAuthenticated && userMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-gray-800 shadow-lg
                            ring-1 ring-black ring-opacity-5 dark:ring-gray-700
                            transform origin-top-right z-[60]">
          <div className="py-2">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || 'Usuário Teste'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'email@exemplo.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-1 py-1">
              <a 
                href="/conta"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/conta');
                  setUserMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors duration-150"
              >
                <User className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                Dados da conta
              </a>
              <a 
                href="/pedidos"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/pedidos');
                  setUserMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors duration-150"
              >
                <ShoppingBag className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                Meus pedidos
              </a>
              <a 
                href="/trocas"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/trocas');
                  setUserMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors duration-150"
              >
                <RefreshCw className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                Trocas e devoluções
              </a>
              <a 
                href="/atendimento"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/atendimento');
                  setUserMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-colors duration-150"
              >
                <MessageSquareMore className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500" />
                Atendimento
              </a>
            </div>

            {/* Logout */}
            <div className="px-1 py-1 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => {
                  logout();
                  setUserMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-500 transition-colors duration-150"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sair da conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  const renderSearchBarMobile = () => (
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

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-y-8 gap-x-4 px-4 py-6">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleHomeClick}>
            <button 
              className="text-4xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 
                hover:from-indigo-700 hover:to-violet-700 
                transition-all duration-200"
            >
              NEXUS
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="w-full h-11 pl-11 pr-4 text-[15px] text-gray-900 dark:text-white 
                        placeholder-gray-500 dark:placeholder-gray-400
                        bg-gray-100 dark:bg-gray-800 
                        hover:bg-gray-200/80 dark:hover:bg-gray-700
                        focus:bg-white dark:focus:bg-gray-800
                        rounded-full border-2 border-gray-200 dark:border-gray-700
                        focus:border-indigo-500 dark:focus:border-indigo-400
                        focus:ring-[3px] focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20
                        transition-all duration-200 ease-out"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 
                               group-hover:text-gray-600 dark:group-hover:text-gray-300 
                               group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400
                               transition-colors duration-200" />
              </div>
            </form>
          </div>

          {/* Right Section: User Menu, Cart, and Mobile Menu */}
          <div className="flex items-center gap-6">
            {/* Search Button - Mobile */}
            <button
              onClick={() => {
                setIsMenuOpen(true);
                setTimeout(() => {
                  const searchInput = document.querySelector('#mobile-search-input') as HTMLInputElement;
                  if (searchInput) searchInput.focus();
                }, 300);
              }}
              className="sm:hidden p-2.5 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                        border border-gray-200 dark:border-gray-700 rounded-lg
                        hover:border-indigo-600 dark:hover:border-indigo-400
                        transition-colors duration-150"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden sm:block relative group mr-6">
              {renderUserMenu()}
            </div>

            {/* User Menu Button - Mobile */}
            {renderUserMenuMobile()}

            {/* Cart - Desktop */}
            <div className="hidden sm:block">
              <button
                onClick={() => handleNavigation('/cart')}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Cart - Mobile */}
            <div className="sm:hidden">
              <button
                onClick={() => handleNavigation('/cart')}
                className="relative p-2.5 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                          border border-gray-200 dark:border-gray-700 rounded-lg
                          hover:border-indigo-600 dark:hover:border-indigo-400
                          transition-colors duration-150"
              >
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="sm:hidden p-2.5 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                        border border-gray-200 dark:border-gray-700 rounded-lg
                        hover:border-indigo-600 dark:hover:border-indigo-400
                        transition-colors duration-150"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="hidden sm:block border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(category.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1.5 py-2 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    onClick={() => handleNavigation(category.route + '?categoria=todos')}
                  >
                    <span className="text-slate-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {category.icon}
                    </span>
                    <span className="text-base sm:text-lg font-medium whitespace-nowrap">{category.name}</span>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                    ring-1 ring-black ring-opacity-5 dark:ring-gray-700
                    transition-all duration-200 transform origin-top-left
                    ${openDropdown === category.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
                    z-50`}
                  >
                    <div className="py-2">
                      {category.subcategories.map((sub) => (
                        <div key={sub.name} className="relative group/item">
                          {/* Barra roxa vertical */}
                          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-600 to-violet-600 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200" />
                          <button
                            className="w-full text-left px-4 py-3 text-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                            onClick={() => handleNavigation(sub.route)}
                          >
                            {sub.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMenuOpen ? 'fixed inset-0 z-50 bg-gray-900 bg-opacity-50' : 'hidden'}`}>
          <div className={`fixed inset-y-0 right-0 w-full max-w-[300px] bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Search Bar Mobile */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    className="w-full pl-10 pr-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-3">
                  {categories.map((category) => (
                    <div key={category.name} className="mb-2">
                      <button
                        className="flex items-center justify-between w-full px-3 py-2.5 text-left text-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                        onClick={() => handleNavigation(category.route + '?categoria=todos')}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-gray-400 dark:text-gray-500">
                            {category.icon}
                          </span>
                          <span className="text-lg font-medium">{category.name}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>

                      <div className="ml-9 mt-1">
                        {category.subcategories.map((sub) => (
                          <div key={sub.name} className="relative group/item -ml-9">
                            {/* Barra roxa vertical */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-600 to-violet-600 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200" />
                            <button
                              className="w-full text-left pl-12 py-2.5 text-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                              onClick={() => {
                                handleNavigation(sub.route);
                                setIsMenuOpen(false);
                              }}
                            >
                              {sub.name}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {isAuthenticated ? (
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {getFirstName(user?.name)}
                          </p>
                          <button
                            onClick={() => {
                              logout();
                              setIsMenuOpen(false);
                            }}
                            className="text-lg text-red-600 dark:text-red-400 hover:text-red-700"
                          >
                            Sair
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="text-lg text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium"
                      >
                        Entrar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </nav>
  );
};

export default Navbar;