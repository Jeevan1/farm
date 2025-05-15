'use client';
import { useState } from 'react';
import ProductForm, { Product } from './form/ProductForm';
import ProductsList from './ProductList';

// Sample initial products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Fertilizer - Premium Blend',
    description:
      'High-quality organic fertilizer for all types of plants and gardens.',
    price: 24.99,
    stock: 45,
    sku: 'F-ORG-001',
    category: 'fertilizer',
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Garden Tools Set - Essentials',
    description:
      'Complete set of essential garden tools for everyday gardening tasks.',
    price: 89.99,
    stock: 12,
    sku: 'T-SET-002',
    category: 'tools',
    status: 'in-stock',
  },
  {
    id: '3',
    name: 'Irrigation System - Drip Line Kit',
    description:
      'Efficient drip irrigation system for water conservation in your garden.',
    price: 149.99,
    stock: 5,
    sku: 'I-DRP-003',
    category: 'equipment',
    status: 'low-stock',
  },
];

const DashboardProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined,
  );
  const [mode, setMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');

  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setMode('add');
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setCurrentProduct(product);
    setMode('view');
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, you would call an API to delete the product
    setProducts(products.filter((product) => product.id !== productId));
    // toast.success("Product deleted successfully");
  };

  const handleFormSubmit = (productData: Omit<Product, 'id'>) => {
    if (mode === 'edit' && currentProduct) {
      // In a real app, you would call an API to update the product
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? { ...productData, id: currentProduct.id }
            : p,
        ),
      );
      //   toast.success("Product updated successfully");
    } else {
      // In a real app, you would call an API to create the product
      const newProduct: Product = {
        ...productData,
        id: `${Date.now()}`, // Generate a temporary ID
      };
      setProducts([...products, newProduct]);
      //   toast.success("Product added successfully");
    }
    setIsFormOpen(false);
    setMode('list');
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setMode('list');
  };

  return (
    <div className="space-y-6">
      {!isFormOpen ? (
        <ProductsList
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onViewProduct={handleViewProduct}
        />
      ) : (
        <ProductForm
          product={currentProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      {mode === 'view' && currentProduct && (
        <div className="mt-4">
          <div className="pt-6">
            <h2 className="mb-4 text-xl font-bold">{currentProduct.name}</h2>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-muted-foreground text-sm">Description</p>
                <p>{currentProduct.description}</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Price</p>
                    <p>${currentProduct.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Stock</p>
                    <p>{currentProduct.stock} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">SKU</p>
                    <p>{currentProduct.sku}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Category</p>
                    <p className="capitalize">{currentProduct.category}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => handleEditProduct(currentProduct)}
              >
                Edit this product
              </button>
              <button
                className="text-sm text-red-600 hover:text-red-800"
                onClick={() => {
                  handleDeleteProduct(currentProduct.id);
                  setMode('list');
                }}
              >
                Delete this product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
