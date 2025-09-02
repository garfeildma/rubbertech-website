import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

async function getRelatedPosts(currentSlug: string, limit: number = 3) {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - RubberTech Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | RubberTech Blog`,
    description: post.excerpt,
    keywords: 'wheel maintenance, tire repair, rubber manufacturing, industrial wheels',
    authors: [{ name: 'RubberTech' }],
    openGraph: {
      title: `${post.title} | RubberTech Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      images: post.image ? [`https://rubbertechchina.com${post.image}`] : [],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative h-64 lg:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={post.image || '/blog/default.jpg'}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Published by <span className="font-medium text-gray-900">RubberTech Team</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/contact"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Have questions? Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || '/blog/default.jpg'}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(relatedPost.publishDate)}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary-600 transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}