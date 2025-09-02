import { companyInfo } from '@/data/company';

interface StructuredDataProps {
  type: 'organization' | 'product' | 'article';
  data?: {
    name?: string;
    description?: string;
    category?: string;
    image?: string;
    title?: string;
    excerpt?: string;
    publishDate?: string;
    slug?: string;
    [key: string]: unknown;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case 'organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: companyInfo.name,
        url: 'https://rubbertechchina.com',
        logo: 'https://rubbertechchina.com/logo.png',
        description: 'Leading manufacturer of high-quality wheels, wheelbarrows, and rubber products since 2012.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Qingdao',
          addressRegion: 'Shandong',
          addressCountry: 'China',
          streetAddress: companyInfo.address
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: companyInfo.phone,
          contactType: 'customer service',
          email: companyInfo.email
        },
        foundingDate: companyInfo.establishedYear.toString(),
        numberOfEmployees: '100+',
        industry: 'Manufacturing'
      };
      break;

    case 'product':
      if (data) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description || `High-quality ${data.category?.toLowerCase() || 'product'} ${data.name}`,
          category: data.category,
          image: `https://rubbertechchina.com${data.image}`,
          manufacturer: {
            '@type': 'Organization',
            name: companyInfo.name,
            url: 'https://rubbertechchina.com'
          },
          brand: {
            '@type': 'Brand',
            name: companyInfo.brand
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            seller: {
              '@type': 'Organization',
              name: companyInfo.name
            }
          }
        };
      }
      break;

    case 'article':
      if (data) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.excerpt,
          image: data.image ? `https://rubbertechchina.com${data.image}` : undefined,
          datePublished: data.publishDate,
          dateModified: data.publishDate,
          author: {
            '@type': 'Organization',
            name: companyInfo.name,
            url: 'https://rubbertechchina.com'
          },
          publisher: {
            '@type': 'Organization',
            name: companyInfo.name,
            url: 'https://rubbertechchina.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://rubbertechchina.com/logo.png'
            }
          }
        };
      }
      break;

    default:
      return null;
  }

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}