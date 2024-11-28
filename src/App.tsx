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

// Pages
import ElectronicsPage from './pages/ElectronicsPage';
import ProductOffer from './pages/ProductOffer';

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
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          <FreeShippingBanner />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/eletronicos/*" element={<ElectronicsPage />} />
              <Route path="/produto/:productId" element={<ProductOffer />} />
            </Routes>
          </main>
          <Footer />
          <ThemeToggle />
        </div>
      </NavigationProvider>
    </Router>
  );
}

export default App;