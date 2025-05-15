import { useState } from 'react';
import { Edit, Trash2, Search, Plus, Eye } from 'lucide-react';
import { Product } from './form/ProductForm';
import ProductEditForm from './form/ProductEditForm';
import Link from 'next/link';

type ProductsListProps = {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onViewProduct: (product: Product) => void;
};

const ProductsList = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onViewProduct,
}: ProductsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
  };

  const handleEditSave = (updatedProduct: Omit<Product, 'id'>) => {
    if (editingProduct) {
      onEditProduct({
        id: editingProduct.id,
        ...updatedProduct,
      });
      setEditingProduct(null);
    }
  };

  if (editingProduct) {
    return (
      <ProductEditForm
        product={editingProduct}
        onSubmit={handleEditSave}
        onCancel={handleEditCancel}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Products</h2>
        <button
          onClick={onAddProduct}
          className="inline-flex items-center rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <input
          placeholder="Search products by name or SKU..."
          className="h-10 w-full rounded-md border px-3 pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <div className="w-full">
          <div className="border-b">
            <div className="grid grid-cols-6 px-4 py-3 text-sm font-medium text-gray-500">
              <div>Product</div>
              <div>Price</div>
              <div>Stock</div>
              <div>SKU</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
          </div>
          <div>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-6 border-b px-4 py-4 text-sm last:border-b-0"
                >
                  <div className="font-medium">
                    <Link
                      href={`/products/${product.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </div>
                  <div>${product.price.toFixed(2)}</div>
                  <div>{product.stock}</div>
                  <div>{product.sku}</div>
                  <div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        product.status === 'in-stock'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'low-stock'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status === 'in-stock'
                        ? 'In Stock'
                        : product.status === 'low-stock'
                          ? 'Low Stock'
                          : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-md p-2 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        className="rounded-md p-2 hover:bg-gray-100"
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-md p-2 text-red-500 hover:bg-red-100 hover:text-red-700"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
