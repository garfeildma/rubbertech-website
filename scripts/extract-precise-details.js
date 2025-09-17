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

function extractPreciseProductDetails(html, url) {
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

  // Extract main product image - look for the main product image
  const imagePattern = new RegExp(`https://rubbertechchina\\.com/wp-content/uploads/[^"]*/${product.code.toLowerCase()}[^"]*\\.jpg`, 'i');
  const imageMatch = html.match(imagePattern);
  if (imageMatch) {
    product.image = imageMatch[0];
  } else {
    // Fallback: look for any image with the product code
    const fallbackPattern = new RegExp(`https://rubbertechchina\\.com/wp-content/uploads/[^"]*${product.code}[^"]*\\.jpg`, 'i');
    const fallbackMatch = html.match(fallbackPattern);
    if (fallbackMatch) {
      product.image = fallbackMatch[0];
    }
  }

  // Extract thumbnail (300x300 version)
  if (product.image) {
    const thumbnailUrl = product.image.replace(/\.jpg$/i, '-300x300.jpg');
    product.thumbnail = thumbnailUrl;
  }

  // Extract size from "Additional information" section
  // Look for patterns like: Size:\s*\n\s*6"*2"
  const sizePatterns = [
    /Size:\s*[\r\n]+\s*([^<\r\n]+)/i,
    /Size:\s*([^<\r\n]+)/i,
    /Size[:\s]+([^<\r\n]+)/i
  ];

  for (const pattern of sizePatterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const size = match[1].trim().replace(/\s+/g, ' ');
      // Only accept sizes that look like actual dimensions
      if (size.match(/\d+["'']?\s*[\*x×]\s*\d+/)) {
        product.size = size;
        break;
      }
    }
  }

  // If no size found with the above patterns, try more specific patterns
  if (!product.size) {
    const dimensionPatterns = [
      /(\d+["'']?\s*[\*x×]\s*\d+[^<\r\n]*)/g,
      /(\d+\.\d+\s*-\s*\d+)/g
    ];

    for (const pattern of dimensionPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        // Find the most relevant match - should contain quotes or dimensions
        for (const match of matches) {
          if (match.includes('"') || match.includes("'") || match.includes('*') || match.includes('x')) {
            product.size = match.trim();
            break;
          }
        }
        if (product.size) break;
      }
    }
  }

  // Only add specifications that are explicitly found
  if (product.size) {
    product.specifications.size = product.size;
  }

  // Add item number
  product.specifications.itemNo = product.code;

  // Don't add any descriptions or extra specifications not found on the page

  return product;
}

async function testSingleProduct() {
  console.log('Testing single product: PR0601');

  try {
    const html = await fetchPage('https://rubbertechchina.com/product/pr0601/');
    const product = extractPreciseProductDetails(html, 'https://rubbertechchina.com/product/pr0601/');

    console.log('Extracted product details:');
    console.log(JSON.stringify(product, null, 2));

    // Also save the raw HTML for debugging
    fs.writeFileSync('./pr0601-debug.html', html);
    console.log('Raw HTML saved to pr0601-debug.html for debugging');

  } catch (error) {
    console.error('Error:', error);
  }
}

if (require.main === module) {
  testSingleProduct();
}

module.exports = { extractPreciseProductDetails };