import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog - RubberTech',
  description: 'Read the latest articles about wheels, rubber products, manufacturing insights, and industry tips from RubberTech experts.',
  keywords: 'wheel maintenance, tire repair, rubber manufacturing, industrial wheels blog, wheelbarrow tips',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              RubberTech Blog
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
              Insights, tips, and updates from our wheel and rubber manufacturing experts. 
              Stay informed about industry trends and product maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Featured Image */}
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={post.image || '/blog/default.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
                      >
                        Read Full Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Subscribe to our newsletter for the latest industry insights, product updates, and maintenance tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-primary-200 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}