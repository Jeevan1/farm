'use client';
import { Filter, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Slider from './ui/Slider';
import Checkbox from './ui/Checkbox';
import ProductCard from './ui/ProductCard';
import { apiService } from '@/utils/apiService';

const Products = ({
  products,
  categories,
}: {
  products: {
    products: any[];
    hasNextPage: boolean;
    endCursor: string | null;
  };
  categories: any[];
}) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const endCursorRef = useRef(filteredProducts?.endCursor);
  const hasNextPageRef = useRef(filteredProducts?.hasNextPage);

  const maxPrice = 1000;

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const fetchProducts = async (
    cursor: string | null = null,
    reset = false,
    currentSearch = searchTerm,
    currentPrice = priceRange,
    currentCategories = selectedCategories,
  ) => {
    setLoading(true);

    const cursorParam = cursor ? `&after=${cursor}` : '';
    const queryParam = currentSearch ? `&query=${currentSearch}` : '';
    const priceParam = currentPrice ? `&minPrice=${currentPrice}` : '';
    const categoriesParam =
      currentCategories.length > 0
        ? `&categories=${currentCategories.join(',')}`
        : '';

    const { data } = await apiService<any>(
      `/product?first=30${cursorParam}${queryParam}${priceParam}${categoriesParam}`,
    );

    if (reset || !cursor) {
      setFilteredProducts(data);
    } else {
      setFilteredProducts((prev) => ({
        ...data,
        products: [...prev.products, ...data.products],
      }));
    }

    setLoading(false);
  };

  // Keep cursor refs updated
  useEffect(() => {
    endCursorRef.current = filteredProducts?.endCursor;
    hasNextPageRef.current = filteredProducts?.hasNextPage;
  }, [filteredProducts]);

  // Re-fetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(null, true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [priceRange, searchTerm, selectedCategories]);

  // Infinite scroll
  useEffect(() => {
    const ref = loaderRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPageRef.current && !loading) {
          fetchProducts(
            endCursorRef.current,
            false,
            searchTerm,
            priceRange,
            selectedCategories,
          );
        }
      },
      { rootMargin: '100px' },
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [searchTerm, priceRange, selectedCategories, loading]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  return (
    <div className="container py-16">
      {/* Search and Filter Toggle */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md md:w-auto md:flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search products?..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          className="flex cursor-pointer items-center gap-2 px-4 py-1 md:hidden"
          onClick={toggleMobileFilters}
        >
          <Filter size={16} />
          Filters
        </Button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <div className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-32 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Filters
            </h3>

            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium text-gray-700">
                Price Range
              </h4>
              <Slider
                max={maxPrice}
                step={1}
                value={priceRange}
                onChange={(e: any) => setPriceRange(e.target.value)}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange}</span>
                <span>${maxPrice}+</span>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-700">
                Categories
              </h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(
                        category.name.toLowerCase(),
                      )}
                      onCheckedChange={() =>
                        toggleCategory(category.name.toLowerCase())
                      }
                      className="text-agro-primary"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 cursor-pointer text-sm text-gray-600"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full py-1"
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange(0);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMobileFilters}
                  className="px-3 py-1 text-gray-500"
                >
                  Close
                </Button>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-gray-700">
                  Price Range
                </h4>
                <Slider
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onChange={(e: any) => setPriceRange(e.target.value)}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange}</span>
                  <span>${maxPrice}+</span>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-700">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(
                          category.name.toLowerCase(),
                        )}
                        onCheckedChange={() =>
                          toggleCategory(category.name.toLowerCase())
                        }
                        className="text-agro-primary"
                      />
                      <label
                        htmlFor={`mobile-category-${category.id}`}
                        className="ml-2 cursor-pointer pt-0.5 text-sm text-gray-600"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button
                  className="bg-agro-primary hover:bg-agro-dark w-full"
                  onClick={toggleMobileFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange(0);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {loading && !filteredProducts?.products?.length ? (
            <div className="flex items-center justify-center">
              <div className="w-full animate-pulse space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                      <div className="h-48 rounded bg-gray-200"></div>
                      <div className="h-10 rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts?.products?.length === 0 && !loading ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-lg text-gray-600">
                No products match your filters.
              </p>
              <Button
                variant="outline"
                className="mt-4 px-4 py-1"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange(0);
                  setSearchTerm('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts?.products?.map((product: any, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>

              <div ref={loaderRef} className="mt-8 flex justify-center">
                {loading && (
                  <div className="w-full animate-pulse space-y-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                          <div className="h-48 rounded bg-gray-200"></div>
                          <div className="h-10 rounded bg-gray-200"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
