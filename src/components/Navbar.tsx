import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, Laptop, Smartphone, Headphones, Camera, Gamepad, Tv } from 'lucide-react';

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
  const [justClicked, setJustClicked] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cartItemCount = 3;

  const handleMouseEnter = (categoryName: string) => {
    setJustClicked(false);
  };

  const handleMouseLeave = () => {
  };

  const handleSearchClick = () => {
    setIsOpen(true);
    setSearchFocused(true);
  };

  useEffect(() => {
    if (searchFocused && isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchFocused, isOpen]);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-800/50 transition-colors duration-300 relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link 
              to="/"
              className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 touch-manipulation
                lg:hover:from-indigo-700 lg:hover:to-violet-700 
                dark:from-indigo-500 dark:to-violet-500 
                lg:dark:hover:from-indigo-400 lg:dark:hover:to-violet-400 
                transition-all duration-300 min-w-[120px]"
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
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={category.route}
                  className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 py-2"
                  onClick={() => {
                    setJustClicked(true);
                  }}
                >
                  <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {category.icon}
                  </span>
                  <span className="text-base">{category.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>

                <div className={`absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-700/50 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none z-50
                              transition-all duration-200 transform origin-top-left
                              ${justClicked ? 'opacity-0 invisible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}
                >
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
                        <div className="ml-4 w-1 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 opacity-0 transform scale-y-0 group-hover/item:opacity-100 group-hover/item:scale-y-100 transition-all duration-200" />
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
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-6 py-3 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700
                         bg-white dark:bg-slate-800 
                         text-slate-900 dark:text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600/50
                         dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400/50
                         placeholder:text-slate-400 dark:placeholder:text-slate-500 
                         transition-all duration-300 text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            </div>

            <button className="p-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <User className="w-6 h-6" />
            </button>

            <div className="relative">
              <button className="p-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center lg:hidden gap-4">
            <button 
              className="p-2 text-slate-600 dark:text-slate-300 transition-colors duration-200 rounded-full touch-manipulation
                lg:hover:text-indigo-600 lg:dark:hover:text-indigo-400 lg:hover:bg-slate-100 lg:dark:hover:bg-slate-800
                active:bg-slate-100 dark:active:bg-slate-800"
              aria-label="Minha Conta"
            >
              <User className="w-6 h-6" />
            </button>

            <div className="relative">
              <button 
                className="p-2 text-slate-600 dark:text-slate-300 transition-colors duration-200 rounded-full touch-manipulation
                  lg:hover:text-indigo-600 lg:dark:hover:text-indigo-400 lg:hover:bg-slate-100 lg:dark:hover:bg-slate-800
                  active:bg-slate-100 dark:active:bg-slate-800"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 transition-colors duration-200 rounded-full touch-manipulation
                lg:hover:text-indigo-600 lg:dark:hover:text-indigo-400 lg:hover:bg-slate-100 lg:dark:hover:bg-slate-800
                active:bg-slate-100 dark:active:bg-slate-800"
              aria-expanded={isOpen}
              aria-label="Menu principal"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Panel */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-24 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-5 py-3 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700
                         bg-white dark:bg-slate-800 
                         text-slate-900 dark:text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600/50
                         dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400/50
                         placeholder:text-slate-400 dark:placeholder:text-slate-500 
                         transition-all duration-300 text-base"
                autoComplete="off"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-50 lg:hidden bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
          onClick={() => {
            setIsOpen(false);
            setSearchFocused(false);
          }}
        >
          <div
            className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-xl dark:shadow-slate-700/50 transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 h-20 border-b border-slate-200 dark:border-slate-800">
                <Link 
                  to="/"
                  className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchFocused(false);
                  }}
                >
                  NEXUS
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSearchFocused(false);
                  }}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Buscar produtos..."
                      className="w-full px-5 py-3 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700
                         bg-white dark:bg-slate-800 
                         text-slate-900 dark:text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600/50
                         dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400/50
                         placeholder:text-slate-400 dark:placeholder:text-slate-500 
                         transition-all duration-300 text-base"
                      autoComplete="off"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                  </div>
                </div>

                <div className="px-2 py-4">
                  {categories.map((category) => (
                    <div key={category.name} className="mb-2">
                      <Link
                        to={category.route}
                        className="flex items-center px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors duration-200"
                        onClick={() => {
                          setIsOpen(false);
                          setSearchFocused(false);
                        }}
                      >
                        <span className="text-slate-400 dark:text-slate-500 mr-3">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                      <div className="ml-12 mt-1 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.route}
                            className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors duration-200"
                            onClick={() => {
                              setIsOpen(false);
                              setSearchFocused(false);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors duration-200">
                    <User className="w-5 h-5" />
                    <span>Minha Conta</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors duration-200">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Carrinho</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;