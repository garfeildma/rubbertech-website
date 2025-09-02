import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsGrid from '@/components/ProductsGrid';
import ProductsFilter from '@/components/ProductsFilter';

export const metadata: Metadata = {
  title: 'Products - RubberTech',
  description: 'Explore our complete range of high-quality wheels, wheelbarrows, and rubber products. Pneumatic wheels, PU wheels, solid wheels, and more.',
  keywords: 'rubber wheels, pneumatic wheels, PU wheels, solid wheels, wheelbarrows, industrial wheels',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Products
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discover our complete range of premium wheels and rubber products, 
              manufactured with precision and built to last.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="bg-white rounded-lg p-6 shadow-md animate-pulse h-64"></div>}>
                <ProductsFilter />
              </Suspense>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>}>
                <ProductsGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}