import HeroSection from '@/app/components/HeroSection';
import SellerSection from '@/app/components/SellerSection';
import { ApiResponse, apiService } from '@/utils/apiService';
import React from 'react';

const SellersPage = async () => {
  const { data, error, loading }: ApiResponse<any> =
    await apiService('/data.json');
  return (
    <div className="">
      <HeroSection
        title=" Verified Sellers"
        subtitle="Discover the best farming tools and fresh agricultural products."
      />
      <div className="">
        <SellerSection sellers={data.sellers} />
      </div>
    </div>
  );
};

export default SellersPage;
