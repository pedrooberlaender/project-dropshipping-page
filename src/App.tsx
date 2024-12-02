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

// Home page component
const HomePage = () => (
  <>
    <Hero />
    <FeaturedProducts />
    <InfoSection />
  </>
);

function App() {
  return (
    <Router>
      <NavigationProvider>
        <CartProvider>
          <ThemeProvider>
            <MenuProvider>
              <UserProvider>
                <AuthProvider>
                  <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
                    <FreeShippingBanner />
                    <Navbar />
                    <main className="flex-grow pb-16">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/eletronicos/*" element={<ElectronicsPage />} />
                        <Route path="/smartphones/*" element={<SmartphonesPage />} />
                        <Route path="/audio/*" element={<AudioPage />} />
                        <Route path="/produto/:productId" element={<ProductOffer />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/fotografia/*" element={<PhotographyPage />} />
                        <Route path="/games/*" element={<GamesPage />} />
                        <Route path="/tv-home/*" element={<TVHomePage />} />
                        <Route path="/conta" element={<AccountData />} />
                      </Routes>
                    </main>
                    <Footer />
                    <ThemeToggle />
                  </div>
                </AuthProvider>
              </UserProvider>
            </MenuProvider>
          </ThemeProvider>
        </CartProvider>
      </NavigationProvider>
    </Router>
  );
}

export default App;