import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Factory, TrendingUp, Trophy, Users } from 'lucide-react';
import { companyInfo, companyMission, milestones } from '@/data/company';

export const metadata: Metadata = {
  title: 'About Us - RubberTech',
  description: `Learn about ${companyInfo.name}, a leading wheel manufacturer established in ${companyInfo.establishedYear}. Our mission: ${companyMission}`,
  keywords: 'about rubbertech, wheel manufacturer, company history, factory, qingdao, china',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About RubberTech
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
              {companyMission}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in {companyInfo.establishedYear}, {companyInfo.name} has grown from a small local manufacturer 
                to a trusted global supplier of premium wheels and rubber products. Located in {companyInfo.address.split(',')[1]}, 
                our modern facility spans {companyInfo.landArea} with building area that {companyInfo.buildingArea}.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Today, we operate at a daily capacity of {companyInfo.dailyCapacity}, serving customers worldwide 
                with our own brand &quot;{companyInfo.brand}&quot; and maintaining the highest standards of quality and innovation.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {new Date().getFullYear() - companyInfo.establishedYear}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Years of Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{companyInfo.dailyCapacity}</div>
                  <div className="text-sm text-gray-600 font-medium">Daily Production</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/about-factory.jpg"
                alt={`${companyInfo.name} Factory`}
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Factory className="h-8 w-8 text-primary-600" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">40,000m²</div>
                    <div className="text-sm text-gray-600">Factory Area</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our growth and development over the years
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <span className="text-primary-600 font-semibold">{milestone.month} {milestone.year}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our business and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer-focused</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize customer satisfaction and provide personalized service to meet your specific needs.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovative</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuously improving our products and processes with the latest technology and manufacturing techniques.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous quality control ensures every product meets international standards and customer expectations.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Building lasting partnerships with customers, suppliers, employees, and communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RubberTech for their wheel and rubber product needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}