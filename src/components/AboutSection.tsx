import Image from 'next/image';
import Link from 'next/link';
import { Factory, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { companyInfo, companyMission } from '@/data/company';

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              About RubberTech
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {companyMission}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Date().getFullYear() - companyInfo.establishedYear}+
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {companyInfo.dailyCapacity}
                  </div>
                  <div className="text-sm text-gray-600">Daily Capacity</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Factory className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">40,000</div>
                  <div className="text-sm text-gray-600">Square Meters</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">RT</div>
                  <div className="text-sm text-gray-600">Own Brand</div>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Learn More About Us
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <Image
                src="/about-factory.jpg"
                alt="RubberTech Factory"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-4 -left-4 bg-primary-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Established</div>
              <div className="text-2xl font-bold">{companyInfo.establishedYear}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}