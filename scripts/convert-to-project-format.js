const fs = require('fs');

function generateProductDescription(product) {
  const categoryDescriptions = {
    'Pneumatic Rubber Wheel': 'High-quality pneumatic rubber wheel featuring excellent shock absorption and smooth rolling performance. Perfect for wheelbarrows, carts, and light industrial applications where comfort and mobility are essential.',
    'PU Wheel': 'Durable polyurethane wheel designed for smooth operation and long-lasting performance. Ideal for industrial carts, equipment, and material handling applications requiring quiet operation and floor protection.',
    'PVC Wheel': 'Lightweight and chemical-resistant PVC wheel offering excellent durability and smooth rolling. Perfect for medical equipment, furniture, and light-duty applications in corrosive environments.',
    'Semi-Pneumatic Rubber Wheel': 'Semi-pneumatic rubber wheel combining the benefits of solid and pneumatic wheels. Provides cushioning while maintaining puncture resistance, ideal for rough terrain applications.',
    'Solid Wheel': 'Heavy-duty solid wheel designed for maximum durability and load capacity. Puncture-proof and maintenance-free, perfect for industrial applications and rough working conditions.',
    'Trolley': 'Professional-grade trolley wheel engineered for smooth movement and heavy load capacity. Designed for warehouse, industrial, and commercial material handling applications.',
    'Wheelbarrow': 'Robust wheelbarrow wheel built for outdoor and construction use. Features excellent traction and durability for handling heavy loads over various terrains.'
  };

  return categoryDescriptions[product.category] || `High-quality ${product.category.toLowerCase()} ${product.code} designed for industrial and commercial applications.`;
}

function extractSpecifications(product) {
  const specs = {
    itemNo: product.code
  };

  if (product.specifications && product.specifications.size && typeof product.specifications.size === 'string') {
    // Clean up size field - remove any HTML artifacts or invalid characters
    specs.size = product.specifications.size.replace(/[{}]/g, '').trim();
  }

  // Add default specifications based on category
  switch (product.category) {
    case 'Pneumatic Rubber Wheel':
      specs.material = 'Rubber tire with steel rim';
      specs.type = 'Pneumatic (Air-filled)';
      specs.bearingType = 'Ball bearing';
      specs.rimMaterial = 'Galvanized steel';
      specs.temperature = '-30°C to +80°C';
      break;
    case 'PU Wheel':
      specs.material = 'Polyurethane';
      specs.type = 'Solid';
      specs.bearingType = 'Ball bearing';
      specs.temperature = '-20°C to +70°C';
      break;
    case 'PVC Wheel':
      specs.material = 'PVC';
      specs.type = 'Solid';
      specs.bearingType = 'Plain bearing';
      specs.temperature = '-10°C to +60°C';
      break;
    case 'Semi-Pneumatic Rubber Wheel':
      specs.material = 'Rubber with foam fill';
      specs.type = 'Semi-pneumatic';
      specs.bearingType = 'Ball bearing';
      specs.temperature = '-30°C to +80°C';
      break;
    case 'Solid Wheel':
      specs.material = 'Solid rubber';
      specs.type = 'Solid';
      specs.bearingType = 'Ball bearing';
      specs.temperature = '-40°C to +100°C';
      break;
    case 'Trolley':
      specs.material = 'Steel/Rubber';
      specs.type = 'Industrial';
      specs.bearingType = 'Ball bearing';
      specs.swivel = 'Available';
      break;
    case 'Wheelbarrow':
      specs.material = 'Rubber/Steel';
      specs.type = 'Heavy-duty';
      specs.bearingType = 'Ball bearing';
      specs.tread = 'Deep tread pattern';
      break;
  }

  return specs;
}

function convertProducts() {
  console.log('Loading categorized products...');

  let products = [];
  try {
    const data = fs.readFileSync('./products-categorized.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return;
  }

  console.log(`Converting ${products.length} products to project format...`);

  const convertedProducts = products.map(product => {
    const converted = {
      id: product.code.toLowerCase(),
      name: product.code,
      category: product.category,
      image: product.mainImage || (product.images && product.images[0]) || '',
      url: product.url,
      description: generateProductDescription(product),
      specifications: extractSpecifications(product)
    };

    // Add size if available
    if (product.specifications && product.specifications.size) {
      converted.size = product.specifications.size;
    }

    // Add thumbnail if available
    if (product.images && product.images.length > 1) {
      const thumbnailImage = product.images.find(img =>
        img.includes('300x300') || img.includes('150x150')
      );
      if (thumbnailImage) {
        converted.thumbnail = thumbnailImage;
      }
    }

    return converted;
  });

  // Sort by category and then by name
  convertedProducts.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  // Generate TypeScript file content
  const tsContent = `import { Product } from '@/types';

// 产品分类
export const productCategories = [
  "PU Wheel",
  "PVC Wheel",
  "Pneumatic Rubber Wheel",
  "Semi-Pneumatic Rubber Wheel",
  "Solid Wheel",
  "Trolley",
  "Wheelbarrow"
];

// 所有产品数据
export const products: Product[] = ${JSON.stringify(convertedProducts, null, 2)};
`;

  // Save the converted products
  fs.writeFileSync('./src/data/products-new.ts', tsContent);
  fs.writeFileSync('./products-converted.json', JSON.stringify(convertedProducts, null, 2));

  console.log(`\nConverted ${convertedProducts.length} products successfully!`);

  // Show summary by category
  const categoryCount = {};
  convertedProducts.forEach(product => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
  });

  console.log('\nProducts by category:');
  Object.keys(categoryCount).forEach(category => {
    console.log(`  ${category}: ${categoryCount[category]} products`);
  });

  console.log('\nFiles generated:');
  console.log('  - src/data/products-new.ts (TypeScript file ready for integration)');
  console.log('  - products-converted.json (JSON format for reference)');

  return convertedProducts;
}

if (require.main === module) {
  convertProducts();
}

module.exports = { convertProducts };