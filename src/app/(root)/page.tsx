import React from 'react';
import Banner from '../components/Banner';
import ProductSection from '../components/ProductSection';
import { ApiResponse, apiService } from '@/utils/apiService';
import ServiceSection from '../components/ServiceSection';
import CTASection from '../components/CTASection';

const HomePage = async () => {
  const { data, error, loading }: ApiResponse<any> = await apiService(
    '/collections/498464588096',
  );

  const {
    data: collection,
    error: collectionError,
    loading: collectionLoading,
  }: ApiResponse<any> = await apiService('/collections/498095128896');

  return (
    <div className="">
      <Banner />
      <ProductSection
        title={data?.title}
        subtitle={data?.description}
        data={data?.products?.edges}
      />
      <ProductSection
        title={collection?.title}
        subtitle={collection?.description}
        data={collection?.products?.edges}
        className="bg-primary/10"
      />

      <ProductSection
        title={'Seeds'}
        subtitle="Discover the best farming tools and fresh agricultural products."
        data={data?.products?.edges}
      />
      {/* <ServiceSection />
      <CTASection /> */}
    </div>
  );
};

export default HomePage;
