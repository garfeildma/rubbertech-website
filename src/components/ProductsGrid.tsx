'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductsGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');

  // Filter products by category
  let filteredProducts = products;
  if (category) {
    const categoryName = category.toLowerCase().replace(/\s+/g, '');
    filteredProducts = products.filter(product => 
      product.category.toLowerCase().replace(/\s+/g, '') === categoryName
    );
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'size':
        return (a.size || '').localeCompare(b.size || '');
      default:
        return 0;
    }
  });

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No products found</div>
        <p className="text-gray-400">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}