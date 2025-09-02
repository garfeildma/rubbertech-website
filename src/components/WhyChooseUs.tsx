import { CheckCircle, Users, Lightbulb, Shield, Heart } from 'lucide-react';
import { whyChooseUs } from '@/data/company';

const iconMap = {
  'Customer-focused': Users,
  'Innovative': Lightbulb, 
  'Quality Assured': Shield,
  'Strong Relationships': Heart,
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose RubberTech?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are committed to excellence in every aspect of our business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.title as keyof typeof iconMap] || CheckCircle;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}