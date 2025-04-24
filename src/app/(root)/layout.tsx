import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Home - FarmMart',
  description: 'Your Farming Companion',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
