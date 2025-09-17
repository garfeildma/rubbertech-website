const fs = require('fs');

function updateWithCorrectImages() {
  console.log('Loading image mapping and current products...');

  let imageMapping = {};
  let currentProducts = [];

  try {
    const mappingData = fs.readFileSync('./image-mapping.json', 'utf8');
    imageMapping = JSON.parse(mappingData);
  } catch (error) {
    console.error('Error loading image mapping:', error);
    return;
  }

  try {
    const productsData = fs.readFileSync('./products-cleaned-final.json', 'utf8');
    currentProducts = JSON.parse(productsData);
  } catch (error) {
    console.error('Error loading products:', error);
    return;
  }

  console.log(`Updating ${currentProducts.length} products with correct images...`);

  let imagesUpdated = 0;
  let imagesMissing = 0;

  const updatedProducts = currentProducts.map(product => {
    const productCode = product.name || product.id.toUpperCase();
    const mapping = imageMapping[productCode];

    if (mapping && mapping.imageUrl) {
      product.image = mapping.imageUrl;
      product.thumbnail = mapping.thumbnailUrl;
      imagesUpdated++;
      console.log(`  ✓ ${productCode}: ${mapping.imageUrl}`);
    } else {
      console.log(`  ✗ ${productCode}: No mapping found`);
      imagesMissing++;
    }

    return product;
  });

  console.log(`\nUpdated ${imagesUpdated} images, ${imagesMissing} missing`);

  // Generate new TypeScript file
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
export const products: Product[] = ${JSON.stringify(updatedProducts, null, 2)};

// 热销产品
export const hotSellingProducts = products.slice(0, 8);
`;

  // Create backup and update
  if (fs.existsSync('./src/data/products.ts')) {
    fs.copyFileSync('./src/data/products.ts', './src/data/products-backup-before-image-fix.ts');
    console.log('Created backup: src/data/products-backup-before-image-fix.ts');
  }

  fs.writeFileSync('./src/data/products.ts', tsContent);
  fs.writeFileSync('./products-with-correct-images.json', JSON.stringify(updatedProducts, null, 2));

  console.log('\nFiles updated:');
  console.log('  - src/data/products.ts (with correct images)');
  console.log('  - products-with-correct-images.json (backup)');

  return updatedProducts;
}

if (require.main === module) {
  updateWithCorrectImages();
}

module.exports = { updateWithCorrectImages };