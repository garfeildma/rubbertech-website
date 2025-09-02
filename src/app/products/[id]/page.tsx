import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { products } from '@/data/products';
import { companyInfo } from '@/data/company';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  return products.find(product => product.id === id);
}

async function getRelatedProducts(productId: string, category: string, limit: number = 4) {
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, limit);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found - RubberTech',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - ${product.category} | RubberTech`,
    description: product.description || `High-quality ${product.category.toLowerCase()} ${product.name} from RubberTech. Professional grade wheels and rubber products.`,
    keywords: `${product.name}, ${product.category}, rubber wheel, industrial wheel, ${product.size}`,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/products" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-4">
                <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {product.size && (
                <div className="text-xl text-primary-600 font-semibold mb-6">
                  Size: {product.size}
                </div>
              )}

              {product.description && (
                <div className="text-gray-700 text-lg mb-8 leading-relaxed">
                  {product.description}
                </div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-200 pb-2 last:border-b-0">
                          <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="text-sm text-gray-900 font-semibold">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Interested in this product?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Get Quote
                  </Link>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="inline-flex items-center justify-center border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  Contact us for pricing, bulk orders, and custom specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}