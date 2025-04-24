'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={150}
                  height={50}
                  className="mr-2"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/products"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              Tools & Products
            </Link>
            <Link
              href="/sellers"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              Sellers
            </Link>
            <Link
              href="/contact"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/join-seller"
              className="hover:text-agro-primary text-gray-700 transition-colors"
            >
              Join as Seller
            </Link>
            <Link href="/signin">
              <button className="hover:text-agro-primary text-gray-700">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="hover:text-agro-primary text-gray-700">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="hover:text-agro-primary inline-flex items-center justify-center rounded-md p-2 text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute w-full bg-white shadow-lg md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <Link
              href="/"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/services"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              href="/products"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Tools & Products
            </Link>
            <Link
              href="/sellers"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Sellers
            </Link>
            <Link
              href="/contact"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              href="/join-seller"
              className="hover:text-agro-primary block px-3 py-2 text-gray-700 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Join as Seller
            </Link>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <Link
                href="/signin"
                className="hover:text-agro-primary mb-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-center text-gray-700 hover:bg-gray-50"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-agro-primary hover:bg-agro-dark block w-full rounded-md px-3 py-2 text-center text-white"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
