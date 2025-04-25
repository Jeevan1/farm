import HeroSection from '@/app/components/HeroSection';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';
import React from 'react';

const ServicesPage = () => {
  return (
    <div>
      <HeroSection
        title="Our Services"
        subtitle="Discover the best farming tools and fresh agricultural products."
      />
      <div className="container">
        <div className="py-16">
          <section className="section-padding">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    Comprehensive Farm Management Solutions
                  </h2>
                  <p className="mb-4 text-gray-600">
                    AgroConnect provides a suite of digital tools designed
                    specifically for the needs of modern farmers. Our platform
                    helps you manage every aspect of your farm operations while
                    connecting you with trusted suppliers.
                  </p>
                  <p className="mb-4 text-gray-600">
                    Whether you're running a small family farm or a large
                    agricultural operation, our services can be customized to
                    meet your specific needs and help you achieve greater
                    efficiency and productivity.
                  </p>
                  <Button className="mt-2 h-10" position="start">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
                    alt="Farmer using tablet in field"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
