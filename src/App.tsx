import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FreeShippingBanner from './components/FreeShippingBanner';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { ThemeToggle } from './components/ThemeToggle';
import { NavigationProvider } from './contexts/NavigationContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MenuProvider } from './contexts/MenuContext';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavbarProvider } from './contexts/NavbarContext';
import { OrderProvider } from './contexts/OrderContext';

// Pages
import ElectronicsPage from './pages/ElectronicsPage';
import SmartphonesPage from './pages/SmartphonesPage';
import AudioPage from './pages/AudioPage';
import ProductOffer from './pages/ProductOffer';
import Cart from './pages/Cart';
import PhotographyPage from './pages/PhotographyPage';
import GamesPage from './pages/GamesPage';
import TVHomePage from './pages/TVHomePage';
import { AccountData } from './pages/AccountData';
import RegisterPage from './pages/RegisterPage';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';
import AtendimentoPage from './pages/AtendimentoPage';
import TrocasDevolucoesPage from './pages/TrocasDevolucoesPage';
import MeusPedidos from './pages/MeusPedidos';

// Home page component
const HomePage = () => (
  <>
    <Hero />
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <FeaturedProducts />
      <InfoSection />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <MenuProvider>
              <UserProvider>
                <NavigationProvider>
                  <NavbarProvider>
                    <OrderProvider>
                      <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
                        <FreeShippingBanner />
                        <Navbar />
                        <main className="w-full">
                          <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/eletronicos/*" element={<ElectronicsPage />} />
                            <Route path="/smartphones/*" element={<SmartphonesPage />} />
                            <Route path="/audio/*" element={<AudioPage />} />
                            <Route path="/produto/:productId" element={<ProductOffer />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/fotografia/*" element={<PhotographyPage />} />
                            <Route path="/games/*" element={<GamesPage />} />
                            <Route path="/tv-home/*" element={<TVHomePage />} />
                            <Route path="/conta" element={<AccountData />} />
                            <Route path="/pesquisa" element={<SearchResults />} />
                            <Route path="/atendimento" element={<AtendimentoPage />} />
                            <Route path="/trocas-devolucoes" element={<TrocasDevolucoesPage />} />
                            <Route path="/pedidos" element={<MeusPedidos />} />
                          </Routes>
                        </main>
                        <Footer />
                        <ThemeToggle />
                      </div>
                    </OrderProvider>
                  </NavbarProvider>
                </NavigationProvider>
              </UserProvider>
            </MenuProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;