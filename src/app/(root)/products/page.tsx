import HeroSection from '@/app/components/HeroSection';
import Products from '@/app/components/Products';
import { ApiResponse, apiService } from '@/utils/apiService';
import React from 'react';

export const metadata = {
  title: 'Products',
  description:
    'Discover the best farming tools and fresh agricultural products.',
};

const ProductsPage = async () => {
  const { data, error, loading }: ApiResponse<any> =
    await apiService('/product?first=30');
  return (
    <div>
      <HeroSection
        title="Tools and Products"
        subtitle="Discover the best farming tools and fresh agricultural products."
      />
      <div className="">
        <Products products={data} categories={data?.categories || []} />
      </div>
    </div>
  );
};

export default ProductsPage;
