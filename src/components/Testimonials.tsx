import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/company';

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses worldwide for quality and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-6 bg-primary-600 text-white p-2 rounded-full">
                <Quote className="h-4 w-4" />
              </div>
              
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex items-center mb-4 pt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              )}

              {/* Testimonial Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3">
                  {testimonial.avatar && (
                    <div className="flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={`${testimonial.name} avatar`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    {testimonial.company && (
                      <div className="text-primary-600 font-medium text-sm">
                        {testimonial.company}
                      </div>
                    )}
                    {testimonial.location && (
                      <div className="text-gray-500 text-sm">
                        {testimonial.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}