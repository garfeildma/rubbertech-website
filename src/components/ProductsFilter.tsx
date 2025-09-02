'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { productCategories } from '@/data/products';

export default function ProductsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy && sortBy !== 'default') params.set('sort', sortBy);
    
    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [selectedCategory, sortBy, router]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Products</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`block w-full text-left px-3 py-2 rounded transition-colors ${
              !selectedCategory 
                ? 'bg-primary-100 text-primary-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Products
          </button>
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category.toLowerCase().replace(/\s+/g, ''))}
              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                selectedCategory === category.toLowerCase().replace(/\s+/g, '') 
                  ? 'bg-primary-100 text-primary-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="default">Default</option>
          <option value="name">Name (A-Z)</option>
          <option value="category">Category</option>
          <option value="size">Size</option>
        </select>
      </div>
    </div>
  );
}