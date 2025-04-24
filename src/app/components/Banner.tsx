import Link from 'next/link';
import React from 'react';
import Button from './ui/Button';

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-primary/30 to-white">
      <div className="container py-16">
        <div className="section-padding">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-2xl leading-tight font-bold text-secondary md:text-4xl lg:text-5xl">
                Everything You Need for Your Farm — Tools to Fresh Products
              </h1>
              <p className="max-w-lg text-xl text-gray-600">
                Shop high-quality farming tools and fresh agricultural products
                directly from verified sellers — all in one trusted platform.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="primary">
                  <Link href="/register" className="block px-4 py-2">
                    Start Managing
                  </Link>
                </Button>
                <Button variant="secondary">
                  <Link href="/products" className="block px-4 py-2">
                    Explore Products
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=600&h=550"
                alt="Farmer working in field"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-green-100 opacity-50"></div>
        <div className="absolute top-32 -left-16 h-32 w-32 rounded-full bg-green-100 opacity-50"></div>
      </div>
    </section>
  );
};

export default Banner;
