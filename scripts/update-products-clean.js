const fs = require('fs');

function cleanProducts() {
  console.log('Loading accurate products data...');

  let products = [];
  try {
    const data = fs.readFileSync('./products-final-accurate-fixed.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return;
  }

  console.log(`Processing ${products.length} products for clean format...`);

  // Convert to final clean format
  const cleanedProducts = products.map(product => {
    const cleaned = {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      url: product.url
    };

    // Only add size if it exists and is valid
    if (product.size && product.size.trim() && !product.size.includes('No size found')) {
      // Fix HTML entities in size
      cleaned.size = product.size.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }

    // Only add thumbnail if image exists
    if (product.thumbnail && product.image) {
      cleaned.thumbnail = product.thumbnail;
    }

    // Only add specifications if they exist and have meaningful data
    if (product.specifications && Object.keys(product.specifications).length > 0) {
      // Clean specifications - only include if size exists
      const cleanSpecs = {};
      if (product.specifications.itemNo) {
        cleanSpecs.itemNo = product.specifications.itemNo;
      }
      if (product.specifications.size && product.specifications.size.trim() && !product.specifications.size.includes('No size found')) {
        cleanSpecs.size = product.specifications.size.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      }

      if (Object.keys(cleanSpecs).length > 0) {
        cleaned.specifications = cleanSpecs;
      }
    }

    return cleaned;
  });

  // Filter out products without images
  const validProducts = cleanedProducts.filter(product => product.image && product.image.trim());

  console.log(`Filtered ${validProducts.length} valid products (from ${cleanedProducts.length})`);

  // Sort by category then by ID
  validProducts.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.id.localeCompare(b.id);
  });

  // Group by category for summary
  const byCategory = {};
  validProducts.forEach(product => {
    if (!byCategory[product.category]) {
      byCategory[product.category] = [];
    }
    byCategory[product.category].push(product);
  });

  console.log('\nValid products by category:');
  Object.keys(byCategory).forEach(category => {
    console.log(`  ${category}: ${byCategory[category].length} products`);
  });

  // Generate final TypeScript file
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
export const products: Product[] = ${JSON.stringify(validProducts, null, 2)};

// 热销产品
export const hotSellingProducts = products.slice(0, 8);
`;

  // Create backup and update
  if (fs.existsSync('./src/data/products.ts')) {
    fs.copyFileSync('./src/data/products.ts', './src/data/products-backup-final.ts');
    console.log('Created backup: src/data/products-backup-final.ts');
  }

  fs.writeFileSync('./src/data/products.ts', tsContent);
  fs.writeFileSync('./products-cleaned-final.json', JSON.stringify(validProducts, null, 2));

  console.log('\nFiles updated:');
  console.log('  - src/data/products.ts (replaced with accurate data)');
  console.log('  - products-cleaned-final.json (cleaned data for reference)');
  console.log(`\nTotal products: ${validProducts.length}`);

  return validProducts;
}

if (require.main === module) {
  cleanProducts();
}

module.exports = { cleanProducts };