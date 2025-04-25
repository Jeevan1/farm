import HeroSection from '@/app/components/HeroSection';
import Products from '@/app/components/Products';
import { ApiResponse, apiService } from '@/utils/apiService';
import React from 'react';

const ProductsPage = async () => {
  const { data, error, loading }: ApiResponse<any> =
    await apiService('/data.json');
  return (
    <div>
      <HeroSection
        title="Tools and Products"
        subtitle="Discover the best farming tools and fresh agricultural products."
      />
      <div className="">
        <Products products={data.products} categories={data.categories} />
      </div>
    </div>
  );
};

export default ProductsPage;
