import React from 'react';
import Banner from '../components/Banner';
import ProductSection from '../components/ProductSection';
import { ApiResponse, apiService } from '@/utils/apiService';
import ServiceSection from '../components/ServiceSection';
import CTASection from '../components/CTASection';

const HomePage = async () => {
  const { data, error, loading }: ApiResponse<any> = await apiService(
    'http://localhost:3000/data.json',
  );
  return (
    <div className="">
      <Banner />
      <ProductSection
        title="Featured Products"
        subtitle="Discover the best farming tools and fresh agricultural products."
        data={data.products}
      />
      <ProductSection
        title={'Best Selling Products'}
        subtitle="Discover the best farming tools and fresh agricultural products."
        data={data.products}
        className="bg-primary/10"
      />

      <ProductSection
        title={'Seeds'}
        subtitle="Discover the best farming tools and fresh agricultural products."
        data={(data.products || []).filter(
          (product: any) => product.category === 'seeds',
        )}
      />
      <ServiceSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
