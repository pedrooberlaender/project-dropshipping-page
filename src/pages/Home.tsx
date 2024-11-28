import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { InfoSection } from '../components/InfoSection';
import { Footer } from '../components/Footer';
import CustomerReviews from '../components/CustomerReviews/CustomerReviews';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <CustomerReviews />
      <InfoSection />
      <Footer />
    </div>
  );
}