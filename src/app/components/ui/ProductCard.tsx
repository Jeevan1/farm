import React from 'react';
import Button from './Button';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{product.name}</h3>
        <p className="mb-2 text-sm text-gray-600">{product.description}</p>
        <div className="flex flex-wrap items-center justify-between">
          <span className="text-agro-primary font-semibold">
            ${product.price}
          </span>
          <Button variant="primary" size="sm">
            <Link href="/products" className="block px-2 py-2 text-xs">
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
