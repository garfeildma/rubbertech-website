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

function extractFinalProductDetails(html, url) {
  const product = {
    url: url,
    code: '',
    name: '',
    image: '',
    thumbnail: '',
    description: '',
    specifications: {},
    category: '',
    size: ''
  };

  // Extract product code from URL
  const urlMatch = url.match(/\/product\/([^\/]+)\//);
  if (urlMatch) {
    product.code = urlMatch[1].toUpperCase();
    product.name = urlMatch[1].toUpperCase();
  }

  // Set category based on product code prefix
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

  // Extract main product image - look for featured image in meta or img tags
  const imagePatterns = [
    // Featured image from meta tags
    /"featuredImage":"([^"]*1-[^"]*\.jpg)"/i,
    /property="og:image"[^>]*content="([^"]*1-[^"]*\.jpg)"/i,
    // Direct image URLs
    new RegExp(`https://rubbertechchina\\.com/wp-content/uploads/[^"]*1-${product.code.toLowerCase()}[^"]*\\.jpg`, 'i'),
    new RegExp(`https://rubbertechchina\\.com/wp-content/uploads/[^"]*${product.code.toLowerCase()}[^"]*\\.jpg`, 'i'),
    new RegExp(`https://rubbertechchina\\.com/wp-content/uploads/[^"]*${product.code}[^"]*\\.jpg`, 'i')
  ];

  for (const pattern of imagePatterns) {
    let imageMatch;
    if (typeof pattern === 'string') {
      imageMatch = html.match(new RegExp(pattern, 'i'));
    } else {
      imageMatch = html.match(pattern);
    }

    if (imageMatch) {
      product.image = imageMatch[1] || imageMatch[0];
      if (product.image.includes('\\')) {
        product.image = product.image.replace(/\\/g, '');
      }
      product.thumbnail = product.image.replace(/\.jpg$/i, '-300x300.jpg');
      break;
    }
  }

  // Extract size from the Additional information table
  // Look for: <th>Size:</th><td><p>6"*2"</p>
  const sizeTableRegex = /<th[^>]*>Size:<\/th>\s*<td[^>]*><p>([^<]+)<\/p>/i;
  const sizeMatch = html.match(sizeTableRegex);

  if (sizeMatch && sizeMatch[1]) {
    // Decode HTML entities
    product.size = sizeMatch[1].trim().replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    product.specifications.size = product.size;
  }

  // Extract Item No from the table
  const itemNoRegex = /<th[^>]*>Item No\.:<\/th>\s*<td[^>]*><p>([^<]+)<\/p>/i;
  const itemNoMatch = html.match(itemNoRegex);

  if (itemNoMatch && itemNoMatch[1]) {
    product.specifications.itemNo = itemNoMatch[1].trim();
  } else {
    product.specifications.itemNo = product.code;
  }

  // Do NOT add descriptions or other specifications that don't exist on the original page
  // Keep it minimal and exactly matching the source

  return product;
}

async function processAllProducts() {
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

  console.log(`Processing ${productUrls.length} products...`);

  const allProducts = [];
  const batchSize = 5;

  for (let i = 0; i < productUrls.length; i += batchSize) {
    const batch = productUrls.slice(i, i + batchSize);

    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(productUrls.length/batchSize)} (${i + 1}-${Math.min(i + batchSize, productUrls.length)}/${productUrls.length})`);

    const batchPromises = batch.map(async (url, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 300));
        const html = await fetchPage(url);
        const product = extractFinalProductDetails(html, url);
        console.log(`  ✓ ${product.code}: ${product.size || 'No size found'}`);
        return product;
      } catch (error) {
        console.error(`  ✗ Error fetching ${url}:`, error.message);
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    allProducts.push(...batchResults.filter(p => p !== null));

    // Delay between batches
    if (i + batchSize < productUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\nSuccessfully processed ${allProducts.length} products`);

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

  // Convert to final TypeScript format
  const convertedProducts = allProducts.map(product => {
    const converted = {
      id: product.code.toLowerCase(),
      name: product.code,
      category: product.category,
      image: product.image,
      url: product.url
    };

    // Only add size if it exists
    if (product.size) {
      converted.size = product.size;
    }

    // Only add thumbnail if image exists
    if (product.thumbnail) {
      converted.thumbnail = product.thumbnail;
    }

    // Only add specifications if they exist
    if (Object.keys(product.specifications).length > 0) {
      converted.specifications = product.specifications;
    }

    // DO NOT add description - keep it minimal like the original

    return converted;
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

// 热销产品
export const hotSellingProducts = products.slice(0, 8);
`;

  // Save files
  fs.writeFileSync('./products-final-accurate.json', JSON.stringify(convertedProducts, null, 2));
  fs.writeFileSync('./src/data/products-accurate.ts', tsContent);

  console.log('\nFiles saved:');
  console.log('  - products-final-accurate.json');
  console.log('  - src/data/products-accurate.ts');

  return convertedProducts;
}

if (require.main === module) {
  processAllProducts();
}

module.exports = { processAllProducts, extractFinalProductDetails };