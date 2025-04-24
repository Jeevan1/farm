import { Facebook, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="h mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={150}
                height={50}
                className="mr-2"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Empowering farmers with digital tools and trusted connections to
              grow sustainably.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="hover:text-agro-primary text-gray-500 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="hover:text-agro-primary text-gray-500 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="hover:text-agro-primary text-gray-500 transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Tools & Products
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Verified Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/join-seller"
                  className="hover:text-agro-primary text-gray-600 transition-colors"
                >
                  Join as a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">123 Farming Avenue,</li>
              <li className="text-gray-600">Agricultural District</li>
              <li className="text-gray-600">Email: info@agroconnect.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AgroConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
