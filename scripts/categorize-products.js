const fs = require('fs');

function categorizeProducts() {
  console.log('Loading products data...');

  let products = [];
  try {
    const data = fs.readFileSync('./products-data.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return;
  }

  console.log(`Categorizing ${products.length} products...`);

  // Define category mappings based on product code prefixes
  const categoryMapping = {
    'PR': 'Pneumatic Rubber Wheel',
    'PU': 'PU Wheel',
    'PVC': 'PVC Wheel',
    'SP': 'Semi-Pneumatic Rubber Wheel',
    'SPT': 'Trolley',
    'SR': 'Solid Wheel',
    'RT': 'Trolley',
    'WB': 'Wheelbarrow'
  };

  // Categorize products
  products.forEach(product => {
    const prefix = product.code.match(/^[A-Z]+/);
    if (prefix && categoryMapping[prefix[0]]) {
      product.category = categoryMapping[prefix[0]];
    } else {
      product.category = 'Uncategorized';
      console.log(`Unknown category for product: ${product.code}`);
    }

    // Clean up product name to remove the generic title
    const cleanName = product.name
      .replace(' - The Wheels you can rely on-RubberTech', '')
      .trim();

    if (cleanName && cleanName !== product.code) {
      product.name = cleanName;
    } else {
      product.name = product.code;
    }

    // Extract main product image (first one, usually the product image)
    if (product.images.length > 0) {
      product.mainImage = product.images.find(img =>
        img.includes(product.code.toLowerCase()) ||
        img.includes(product.code)
      ) || product.images[0];

      // Keep only product-specific images, filter out logo and generic images
      product.images = product.images.filter(img =>
        img.includes(product.code.toLowerCase()) ||
        img.includes(product.code) ||
        (!img.includes('cropped-RubberTech') && !img.includes('logo'))
      );
    }
  });

  // Group by category
  const byCategory = {};
  products.forEach(product => {
    const category = product.category;
    if (!byCategory[category]) {
      byCategory[category] = [];
    }
    byCategory[category].push(product);
  });

  console.log('\nProducts by category:');
  Object.keys(byCategory).forEach(category => {
    console.log(`  ${category}: ${byCategory[category].length} products`);
  });

  // Save categorized data
  fs.writeFileSync('./products-categorized.json', JSON.stringify(products, null, 2));
  fs.writeFileSync('./products-by-category.json', JSON.stringify(byCategory, null, 2));

  console.log('\nCategorized data saved to:');
  console.log('  - products-categorized.json (all products with categories)');
  console.log('  - products-by-category.json (grouped by category)');

  return byCategory;
}

if (require.main === module) {
  categorizeProducts();
}

module.exports = { categorizeProducts };