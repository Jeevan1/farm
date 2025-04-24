import React from 'react';
import Button from './ui/Button';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container">
        <h2 className="mx-auto mb-4 max-w-3xl text-center text-3xl font-bold md:text-4xl">
          Ready to Grow with AgroConnect?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-lg">
          Join thousands of farmers who are already using AgroConnect to manage
          their farms more efficiently and connect with trusted suppliers.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="secondary" className="bg-white text-primary">
            <Link href="/register" className="block px-4 py-2">
              Create Free Account
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hover:bg-dark border-white text-white"
          >
            <Link href="/join-seller" className="block px-4 py-2">
              Join as a Seller
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
