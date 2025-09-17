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

function extractExactProductDetails(html, url) {
  const product = {
    url: url,
    code: '',
    name: '',
    images: [],
    description: '',
    specifications: {},
    category: '',
    relatedProducts: [],
    size: ''
  };

  // Extract product code from URL
  const urlMatch = url.match(/\/product\/([^\/]+)\//);
  if (urlMatch) {
    product.code = urlMatch[1].toUpperCase();
    product.name = urlMatch[1].toUpperCase();
  }

  // Extract category from navigation or content
  const categoryPatterns = [
    { pattern: /Pneumatic\s+Rubber\s+Wheel/i, category: 'Pneumatic Rubber Wheel' },
    { pattern: /Semi-Pneumatic\s+Rubber\s+Wheel/i, category: 'Semi-Pneumatic Rubber Wheel' },
    { pattern: /Solid\s+Wheel/i, category: 'Solid Wheel' },
    { pattern: /PU\s+Wheel/i, category: 'PU Wheel' },
    { pattern: /PVC\s+Wheel/i, category: 'PVC Wheel' },
    { pattern: /Wheelbarrow/i, category: 'Wheelbarrow' },
    { pattern: /Trolley/i, category: 'Trolley' }
  ];

  // Set category based on product code prefix as fallback
  const prefix = product.code.match(/^[A-Z]+/);
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

  if (prefix && categoryMapping[prefix[0]]) {
    product.category = categoryMapping[prefix[0]];
  }

  // Extract main product image - look for product-specific image
  const imageRegex = new RegExp(`https://rubbertechchina\\.com/wp-content/uploads/[^"]*${product.code.toLowerCase()}[^"]*\\.jpg`, 'i');
  const imageMatch = html.match(imageRegex);
  if (imageMatch) {
    product.images = [imageMatch[0]];
  }

  // Extract size information more precisely
  const sizePatterns = [
    /Size:\s*([^<\n\r]+)/i,
    /(\d+["']?\s*[x×]\s*\d+[^<\n\r]*)/g,
    /(\d+\.\d+\s*-\s*\d+)/g
  ];

  for (const pattern of sizePatterns) {
    const match = html.match(pattern);
    if (match) {
      if (pattern.global) {
        // For global patterns, find the most relevant match
        for (const m of match) {
          if (m.includes('"') || m.includes('x') || m.includes('×')) {
            product.size = m.trim();
            break;
          }
        }
      } else {
        product.size = match[1].trim();
      }
      if (product.size) break;
    }
  }

  // Extract related products from the page
  const relatedProductRegex = /\/product\/([a-z0-9-]+)\//gi;
  const relatedMatches = [...html.matchAll(relatedProductRegex)];
  const related = relatedMatches
    .map(match => match[1].toUpperCase())
    .filter(code => code !== product.code && code.match(/^[A-Z0-9]+$/))
    .slice(0, 4); // Limit to 4 related products

  product.relatedProducts = [...new Set(related)];

  // Only add specifications that are explicitly mentioned on the page
  if (product.size) {
    product.specifications.size = product.size;
  }

  // Do NOT add descriptions or specifications that aren't on the original page
  // Keep it minimal and accurate to the source

  return product;
}

async function extractAccurateProducts() {
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

  console.log(`Extracting accurate details for ${productUrls.length} products...`);

  const allProducts = [];
  const batchSize = 3; // Smaller batches for more careful extraction

  for (let i = 0; i < Math.min(20, productUrls.length); i += batchSize) { // Test with first 20 products
    const batch = productUrls.slice(i, i + batchSize);

    console.log(`Processing batch ${Math.floor(i/batchSize) + 1} (${i + 1}-${Math.min(i + batchSize, 20)})`);

    const batchPromises = batch.map(async (url, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 500)); // Longer delay
        const html = await fetchPage(url);
        const product = extractExactProductDetails(html, url);
        console.log(`  ✓ ${product.code}: Size: "${product.size}"`);
        return product;
      } catch (error) {
        console.error(`  ✗ Error fetching ${url}:`, error.message);
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    allProducts.push(...batchResults.filter(p => p !== null));

    // Longer delay between batches
    if (i + batchSize < 20) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log(`\nExtracted accurate data for ${allProducts.length} products`);

  // Save sample data for verification
  fs.writeFileSync('./products-accurate-sample.json', JSON.stringify(allProducts, null, 2));

  console.log('Sample data saved to products-accurate-sample.json');
  console.log('\nFirst few products:');
  allProducts.slice(0, 5).forEach(p => {
    console.log(`${p.code}: Size="${p.size}", Category="${p.category}"`);
  });

  return allProducts;
}

if (require.main === module) {
  extractAccurateProducts();
}

module.exports = { extractAccurateProducts };