'use client';
import { Filter, Search } from 'lucide-react';
import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Slider from './ui/Slider';
import Checkbox from './ui/Checkbox';
import ProductCard from './ui/ProductCard';

const Products = ({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  let maxPrice = 1000;

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((name) => name !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = products.filter((product) => {
    // Filter by search term
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by price range
    const matchesPrice =
      product.price >= priceRange && product.price <= maxPrice;

    // Filter by category
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  return (
    <div className="container py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full max-w-md md:w-auto md:flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search products..."
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
                max={1000}
                step={1}
                value={priceRange}
                onChange={(e: any) => setPriceRange(e.target.value)}
                className="mb-2"
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
                      onChange={() =>
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

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-gray-700">
                  Price Range
                </h4>
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange}</span>
                  <span>${maxPrice}+</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="mb-3 text-sm font-medium text-gray-700">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
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

              {/* Apply and Clear Buttons */}
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
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
