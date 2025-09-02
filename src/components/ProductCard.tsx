import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {product.name}
          </h3>
          {product.size && (
            <p className="text-primary-600 font-medium mb-2">
              {product.size}
            </p>
          )}
          {product.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-primary-600 font-medium group-hover:text-primary-700">
              View Details
            </span>
            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}