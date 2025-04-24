'use client';
import { Filter, Search } from 'lucide-react';
import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import SellerCard from './ui/SellerCard';
import Link from 'next/link';
import Image from 'next/image';

const SellerSection = ({ sellers }: { sellers: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredSellers = sellers.filter(
    (seller: any) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.categories.some((category: string) =>
        category.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="pt-16">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full max-w-md md:w-auto md:flex-1">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search sellers by name, description, or category..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>
        {searchTerm === '' && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Featured Sellers
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {sellers
                .filter((seller: any) => seller.featured)
                .map((seller: any) => (
                  <SellerCard key={seller.id} seller={seller} />
                ))}
            </div>
          </div>
        )}
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {searchTerm ? 'Search Results' : 'All Verified Sellers'}
        </h2>

        {filteredSellers.length === 0 ? (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-lg text-gray-600">
              No sellers match your search criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSellers.map((seller: any) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        )}
      </div>
      <section className="section-padding mt-12 bg-primary py-16 text-white">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Want to sell your products on AgroConnect?
              </h2>
              <p className="mb-6 text-lg">
                Join our growing network of verified sellers and connect
                directly with farmers looking for quality agricultural products.
              </p>
              <div className="flex justify-start">
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <Link href="/join-seller" className="block px-2 py-1">
                    Apply to Become a Seller
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1595257841889-eca2678454e2?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
                alt="Farmers and sellers handshake"
                className="max-h-[700px] w-full rounded-lg object-cover shadow-xl"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerSection;
