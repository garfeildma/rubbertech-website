import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Want to import{' '}
              <span className="text-yellow-400">wheels</span>{' '}
              from China?
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed">
              The Wheels You Can Rely On - Premium quality wheels, wheelbarrows, 
              and rubber products manufactured with precision since 2012.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center bg-accent-400 text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-accent-300 transition-colors duration-200 text-lg"
              >
                View Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors duration-200 text-lg"
              >
                Start Your Project Now
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <Image
                src="/hero-wheels.jpg"
                alt="RubberTech Premium Wheels"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-accent-400 text-primary-900 p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">15,000</div>
              <div className="text-sm font-medium">Sets/Day</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-primary-900 p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">12+</div>
              <div className="text-sm font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}