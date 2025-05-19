import React from 'react';
import { ArrowLeft, Tag, Package2, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';
import { ApiResponse, apiService } from '@/utils/apiService';
import QuickAddCartForm from '@/app/components/form/QuickAddCartForm';
import Image from 'next/image';
import ProductSection from '@/app/components/ProductSection';

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const { data, error, loading }: ApiResponse<any> = await (async () => {
    await wait(1000);
    return apiService('http://localhost:3000/data.json');
  })();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const json = await res.json();

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="w-full animate-pulse space-y-8">
            <div className="h-8 w-1/4 rounded bg-gray-200"></div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="h-80 rounded bg-gray-200"></div>
              <div className="space-y-4">
                <div className="h-10 rounded bg-gray-200"></div>
                <div className="h-6 w-1/3 rounded bg-gray-200"></div>
                <div className="h-32 rounded bg-gray-200"></div>
                <div className="h-10 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!json) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Product Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            The product you are looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      {/* Breadcrumb */}
      <div className="container">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div>
            <Image
              src={
                json.images?.edges[0]?.node?.originalSrc ||
                'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800'
              }
              alt={json?.title}
              width={500}
              height={500}
              className="aspect-square h-auto w-full rounded-lg object-cover shadow-md"
            />
          </div>
          {/* uniqueProducts Info */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {json?.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {/* <span className="flex items-center">
                  <Package2 className="mr-1 h-4 w-4" />
                  SKU: {uniqueProducts.sku}
                </span> */}
                <span className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" />
                  {json?.category?.name || 'No Category'}
                </span>
              </div>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  ${json?.priceRange?.minVariantPrice?.amount}
                </span>
                {/* <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    uniqueProducts.status === 'in-stock'
                      ? 'bg-green-100 text-green-800'
                      : uniqueProducts.status === 'low-stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {uniqueProducts.status === 'in-stock'
                    ? 'In Stock'
                    : uniqueProducts.status === 'low-stock'
                      ? 'Low Stock'
                      : 'Out of Stock'}
                </span> */}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {json?.totalInventory || 0} units available
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: json?.descriptionHtml }}
              ></p>
            </div>
            <QuickAddCartForm product={json} />
            {/* 
            <div>
              <h2 className="mb-2 text-lg font-semibold">Key Features</h2>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                {Object.entries(uniqueProducts.features).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Specifications</h2>
              <div>
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Object.entries(
                      uniqueProducts.specifications as Record<string, string>,
                    ).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="mt-1 text-sm text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div> */}
          </div>
        </div>
      </div>
      {/* <ProductSection
        title="Related Products"
        subtitle=""
        data={data.products}
      /> */}
    </div>
  );
};

export default ProductDetails;
