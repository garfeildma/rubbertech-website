const fs = require('fs');

function cleanSpecifications(specs) {
  const cleaned = {};

  Object.entries(specs).forEach(([key, value]) => {
    // Clean HTML entities
    let cleanValue = value.toString()
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    // Clean property names and improve them
    let cleanKey = key;

    // Handle specific property name fixes
    if (key === 'loadCapacitykgs') {
      cleanKey = 'loadCapacity';
      cleanValue = cleanValue + ' kgs';
    } else if (key === 'waterCapacityl') {
      cleanKey = 'waterCapacity';
      cleanValue = cleanValue + ' L';
    } else if (key === 'sandCapacitycbf') {
      cleanKey = 'sandCapacity';
      cleanValue = cleanValue + ' cbf';
    } else if (key === 'wheel') {
      cleanKey = 'wheelSize';
    } else if (key === 'lhcabhmm') {
      cleanKey = 'dimensions';
      cleanValue = cleanValue + ' mm (L*H*C*A*B*h)';
    } else if (key === 'bodySize') {
      cleanKey = 'bodySize';
      // Keep bodySize as is for trolleys
    }

    cleaned[cleanKey] = cleanValue;
  });

  return cleaned;
}

function updateWBandRTProducts() {
  console.log('Loading current products and WB/RT specifications...');

  let currentProducts = [];
  let wbRtSpecs = {};

  try {
    const productsData = fs.readFileSync('./src/data/products.ts', 'utf8');

    // Extract the products array from TypeScript file
    const arrayMatch = productsData.match(/export const products: Product\[\] = (\[[\s\S]*?\]);/);
    if (arrayMatch) {
      // Parse the JSON part
      currentProducts = JSON.parse(arrayMatch[1]);
    } else {
      throw new Error('Could not parse products from TypeScript file');
    }
  } catch (error) {
    console.error('Error loading current products:', error);
    return;
  }

  try {
    const specsData = fs.readFileSync('./wb-rt-specifications.json', 'utf8');
    wbRtSpecs = JSON.parse(specsData);
  } catch (error) {
    console.error('Error loading WB/RT specifications:', error);
    return;
  }

  console.log(`Updating ${currentProducts.length} products with WB/RT specifications...`);

  let updatedCount = 0;

  const updatedProducts = currentProducts.map(product => {
    const productCode = product.name;

    if ((productCode.startsWith('WB') || productCode.startsWith('RT')) && wbRtSpecs[productCode]) {
      const newSpecs = cleanSpecifications(wbRtSpecs[productCode].specifications);

      // Merge with existing specifications
      product.specifications = {
        ...product.specifications,
        ...newSpecs
      };

      updatedCount++;
      console.log(`  ✓ ${productCode}: Updated with ${Object.keys(newSpecs).length} specifications`);
    }

    return product;
  });

  console.log(`\nUpdated ${updatedCount} products with detailed specifications`);

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
    fs.copyFileSync('./src/data/products.ts', './src/data/products-backup-before-wb-rt-update.ts');
    console.log('Created backup: src/data/products-backup-before-wb-rt-update.ts');
  }

  fs.writeFileSync('./src/data/products.ts', tsContent);
  fs.writeFileSync('./products-with-wb-rt-specs.json', JSON.stringify(updatedProducts, null, 2));

  console.log('\nFiles updated:');
  console.log('  - src/data/products.ts (with WB/RT specifications)');
  console.log('  - products-with-wb-rt-specs.json (backup)');

  // Show examples of updated specifications
  console.log('\nExample updated specifications:');
  const examples = updatedProducts.filter(p => p.name === 'WB2206' || p.name === 'RT0102');
  examples.forEach(product => {
    console.log(`\n${product.name}:`);
    Object.entries(product.specifications).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
  });

  return updatedProducts;
}

if (require.main === module) {
  updateWBandRTProducts();
}

module.exports = { updateWBandRTProducts };