'use client';
import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import ProductCard from './ui/ProductCard';
import Button from './ui/Button';
import Link from 'next/link';
import Pagination from './Pagination';

const ProductSection = ({
  title,
  subtitle,
  data,
  className = '',
}: {
  title: string;
  subtitle: string;
  data: any;
  className?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <SectionHeading title={title} subtitle={subtitle} />
        {data?.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-gray-600">No products found</p>
          </div>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data
                ?.slice((currentPage - 1) * 4, currentPage * 4)
                ?.map((product: any, index: number) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
            <div className="mt-12">
              <Pagination
                totalItems={data?.length}
                itemsPerPage={4}
                onPageChange={(page) => handlePageChange(page)}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
