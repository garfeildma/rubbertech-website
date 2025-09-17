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

function extractProductUrls(html) {
  const productUrlRegex = /href="(https:\/\/rubbertechchina\.com\/product\/[^"]+)"/g;
  const urls = [];
  let match;

  while ((match = productUrlRegex.exec(html)) !== null) {
    if (!urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }

  return urls;
}

function extractProductInfo(html) {
  const productCodeRegex = /<h2[^>]*class="[^"]*woocommerce-loop-product__title[^"]*"[^>]*>([^<]+)<\/h2>/g;
  const products = [];
  let match;

  while ((match = productCodeRegex.exec(html)) !== null) {
    products.push(match[1].trim());
  }

  return products;
}

async function scrapeAllProducts() {
  console.log('Starting product scraping...');
  const allProductUrls = [];
  const allProducts = [];

  for (let page = 1; page <= 16; page++) {
    console.log(`Fetching page ${page}/16...`);

    try {
      const url = page === 1
        ? 'https://rubbertechchina.com/product/'
        : `https://rubbertechchina.com/product/page/${page}/`;

      const html = await fetchPage(url);
      const urls = extractProductUrls(html);
      const products = extractProductInfo(html);

      allProductUrls.push(...urls);
      allProducts.push(...products);

      console.log(`Page ${page}: Found ${urls.length} product URLs`);

      // Add delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  }

  console.log(`Total products found: ${allProductUrls.length}`);

  // Save URLs to file
  fs.writeFileSync('./product-urls.json', JSON.stringify(allProductUrls, null, 2));
  console.log('Product URLs saved to product-urls.json');

  return allProductUrls;
}

if (require.main === module) {
  scrapeAllProducts();
}

module.exports = { scrapeAllProducts };