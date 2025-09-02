import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { companyInfo } from '@/data/company';
import { navigationItems } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-primary-400 mb-4">
              RubberTech
            </div>
            <p className="text-gray-300 mb-4">
              The Wheels you can rely on - Leading manufacturer of high-quality wheels, wheelbarrows, and rubber products since 2012.
            </p>
            <div className="text-sm text-gray-400">
              Brand: {companyInfo.brand}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/products?category=pneumatic" className="hover:text-primary-400 transition-colors">Pneumatic Wheels</Link></li>
              <li><Link href="/products?category=pu" className="hover:text-primary-400 transition-colors">PU Wheels</Link></li>
              <li><Link href="/products?category=solid" className="hover:text-primary-400 transition-colors">Solid Wheels</Link></li>
              <li><Link href="/products?category=wheelbarrow" className="hover:text-primary-400 transition-colors">Wheelbarrows</Link></li>
              <li><Link href="/products?category=trolley" className="hover:text-primary-400 transition-colors">Hand Trolleys</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  {companyInfo.address}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <p className="text-gray-300">
                  {companyInfo.phone}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <p className="text-gray-300">
                  {companyInfo.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="text-gray-400 text-sm">
              Daily Capacity: {companyInfo.dailyCapacity} | Est. {companyInfo.establishedYear}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}