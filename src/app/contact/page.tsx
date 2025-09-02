import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Factory, Globe } from 'lucide-react';
import { companyInfo } from '@/data/company';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - RubberTech',
  description: `Contact ${companyInfo.name} for high-quality wheels and rubber products. Phone: ${companyInfo.phone}, Email: ${companyInfo.email}`,
  keywords: 'contact rubbertech, wheel manufacturer contact, qingdao rubber factory, wheel supplier china',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
              Ready to start your project? Get in touch with our team for quotes, 
              product information, and custom solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Factory Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone & Fax</h3>
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM (CST)</p>
                      <p>Saturday: 9:00 AM - 5:00 PM (CST)</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Factory className="h-4 w-4 text-primary-600" />
                    <span className="text-gray-600">Est. {companyInfo.establishedYear}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">Brand: {companyInfo.brand}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-600">{companyInfo.landArea}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-600">{companyInfo.dailyCapacity}/day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose RubberTech?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers worldwide who trust us for their wheel and rubber product needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-lg p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Factory className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Large-Scale Production
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Daily capacity of {companyInfo.dailyCapacity} ensures we can handle orders of any size, 
                from small quantities to bulk shipments.
              </p>
            </div>

            <div className="text-center bg-white rounded-lg p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Global Shipping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Established export department with experience shipping to customers 
                worldwide. Fast, reliable delivery with proper documentation.
              </p>
            </div>

            <div className="text-center bg-white rounded-lg p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Responsive Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated team responds quickly to inquiries and provides 
                expert advice on product selection and custom requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}