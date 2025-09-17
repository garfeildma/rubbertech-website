const fs = require('fs');
const https = require('https');

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractProductDetails(html, url) {
  const product = {
    url: url,
    code: '',
    name: '',
    images: [],
    description: '',
    specifications: {},
    category: '',
    relatedProducts: []
  };

  // Extract product code from URL
  const urlMatch = url.match(/\/product\/([^\/]+)\//);
  if (urlMatch) {
    product.code = urlMatch[1].toUpperCase();
    product.name = urlMatch[1].toUpperCase();
  }

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1].replace(' – Rubber Tech', '').trim();
    if (title && title !== 'Rubber Tech') {
      product.name = title;
    }
  }

  // Extract main product image
  const imageMatches = html.match(/https:\/\/rubbertechchina\.com\/wp-content\/uploads\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/gi);
  if (imageMatches) {
    product.images = [...new Set(imageMatches)];
  }

  // Extract size/specifications from various patterns
  const sizePatterns = [
    /Size:\s*([^<\n]+)/i,
    /(\d+["'']?\s*x\s*\d+[^<\n]*)/g,
    /(\d+\.\d+\s*-\s*\d+)/g
  ];

  sizePatterns.forEach(pattern => {
    const matches = html.match(pattern);
    if (matches) {
      if (pattern.global) {
        matches.forEach(match => {
          if (!product.specifications.size) {
            product.specifications.size = match.trim();
          }
        });
      } else {
        product.specifications.size = matches[1].trim();
      }
    }
  });

  // Extract category from breadcrumbs or navigation
  const categoryPatterns = [
    /Pneumatic Rubber Wheel/i,
    /Semi-Pneumatic Rubber Wheel/i,
    /Solid Wheel/i,
    /PU Wheel/i,
    /PVC Wheel/i,
    /Wheelbarrow/i,
    /Trolley/i
  ];

  categoryPatterns.forEach(pattern => {
    if (pattern.test(html)) {
      product.category = pattern.source.replace(/[\\\/]/g, '').replace(/i$/, '');
    }
  });

  // Extract description from meta description or content
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (descMatch) {
    product.description = descMatch[1].trim();
  }

  // Extract related products
  const relatedMatches = html.match(/\/product\/([a-z0-9]+)\//gi);
  if (relatedMatches) {
    const related = relatedMatches
      .map(match => match.replace(/\/product\/|\/$/g, '').toUpperCase())
      .filter(code => code !== product.code && code.match(/^[A-Z0-9]+$/));
    product.relatedProducts = [...new Set(related)];
  }

  return product;
}

async function extractAllProducts() {
  console.log('Loading product URLs...');

  let productUrls = [];
  try {
    const urlsData = fs.readFileSync('./product-urls.json', 'utf8');
    productUrls = JSON.parse(urlsData);
  } catch (error) {
    console.error('Error loading product URLs:', error);
    return;
  }

  // Filter out non-product URLs
  productUrls = productUrls.filter(url =>
    url.includes('/product/') &&
    !url.includes('/page/') &&
    !url.includes('/feed/')
  );

  console.log(`Extracting details for ${productUrls.length} products...`);

  const allProducts = [];
  const batchSize = 5; // Process in small batches to be respectful

  for (let i = 0; i < productUrls.length; i += batchSize) {
    const batch = productUrls.slice(i, i + batchSize);

    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(productUrls.length/batchSize)} (${i + 1}-${Math.min(i + batchSize, productUrls.length)}/${productUrls.length})`);

    const batchPromises = batch.map(async (url, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 200)); // Stagger requests
        const html = await fetchPage(url);
        const product = extractProductDetails(html, url);
        console.log(`  ✓ ${product.code}: ${product.name}`);
        return product;
      } catch (error) {
        console.error(`  ✗ Error fetching ${url}:`, error.message);
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    allProducts.push(...batchResults.filter(p => p !== null));

    // Longer delay between batches
    if (i + batchSize < productUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\nSuccessfully extracted ${allProducts.length} products`);

  // Group by category
  const byCategory = {};
  allProducts.forEach(product => {
    const category = product.category || 'Uncategorized';
    if (!byCategory[category]) {
      byCategory[category] = [];
    }
    byCategory[category].push(product);
  });

  console.log('\nProducts by category:');
  Object.keys(byCategory).forEach(category => {
    console.log(`  ${category}: ${byCategory[category].length} products`);
  });

  // Save all products
  fs.writeFileSync('./products-data.json', JSON.stringify(allProducts, null, 2));
  fs.writeFileSync('./products-by-category.json', JSON.stringify(byCategory, null, 2));

  console.log('\nData saved to:');
  console.log('  - products-data.json (all products)');
  console.log('  - products-by-category.json (grouped by category)');

  return allProducts;
}

if (require.main === module) {
  extractAllProducts();
}

module.exports = { extractAllProducts };