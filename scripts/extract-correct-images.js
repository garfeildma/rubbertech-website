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

function extractImageUrl(html, productCode) {
  // Multiple patterns to find the correct image
  const imagePatterns = [
    // Featured image from JSON config
    /"featuredImage":"([^"]*\.jpg)"/i,
    // OG image meta tag
    /property="og:image"[^>]*content="([^"]*\.jpg)"/i,
    // Twitter image meta tag
    /name="twitter:image"[^>]*content="([^"]*\.jpg)"/i,
    // Image in gallery with product code
    new RegExp(`src="([^"]*${productCode.toLowerCase()}[^"]*\\.jpg)"`, 'i'),
    new RegExp(`href="([^"]*${productCode.toLowerCase()}[^"]*\\.jpg)"`, 'i'),
    // More flexible patterns
    new RegExp(`(https://rubbertechchina\\.com/wp-content/uploads/[^"]*${productCode.toLowerCase()}[^"]*\\.jpg)`, 'i'),
    new RegExp(`(https://rubbertechchina\\.com/wp-content/uploads/[^"]*\\d+-${productCode.toLowerCase()}[^"]*\\.jpg)`, 'i')
  ];

  for (const pattern of imagePatterns) {
    const match = html.match(pattern);
    if (match) {
      let imageUrl = match[1] || match[0];

      // Clean up the URL
      if (imageUrl.includes('\\')) {
        imageUrl = imageUrl.replace(/\\/g, '');
      }

      // Make sure it's a valid image URL
      if (imageUrl.includes('.jpg') && imageUrl.includes('rubbertechchina.com')) {
        return imageUrl;
      }
    }
  }

  return null;
}

async function extractCorrectImages() {
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

  console.log(`Extracting correct images for ${productUrls.length} products...`);

  const imageMapping = {};
  const batchSize = 3;

  for (let i = 0; i < productUrls.length; i += batchSize) {
    const batch = productUrls.slice(i, i + batchSize);

    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(productUrls.length/batchSize)} (${i + 1}-${Math.min(i + batchSize, productUrls.length)}/${productUrls.length})`);

    const batchPromises = batch.map(async (url, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 400)); // Delay between requests

        const urlMatch = url.match(/\/product\/([^\/]+)\//);
        if (!urlMatch) return null;

        const productCode = urlMatch[1].toUpperCase();
        const html = await fetchPage(url);
        const imageUrl = extractImageUrl(html, productCode);

        if (imageUrl) {
          imageMapping[productCode] = {
            productCode,
            imageUrl,
            thumbnailUrl: imageUrl.replace(/\.jpg$/i, '-300x300.jpg'),
            originalUrl: url
          };
          console.log(`  ✓ ${productCode}: ${imageUrl}`);
        } else {
          console.log(`  ✗ ${productCode}: No image found`);
          imageMapping[productCode] = {
            productCode,
            imageUrl: null,
            thumbnailUrl: null,
            originalUrl: url
          };
        }

        return imageMapping[productCode];
      } catch (error) {
        console.error(`  ✗ Error fetching ${url}:`, error.message);
        return null;
      }
    });

    await Promise.all(batchPromises);

    // Longer delay between batches
    if (i + batchSize < productUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  const totalProducts = Object.keys(imageMapping).length;
  const successfulImages = Object.values(imageMapping).filter(item => item.imageUrl).length;

  console.log(`\nExtracted images for ${totalProducts} products`);
  console.log(`Successful: ${successfulImages}, Failed: ${totalProducts - successfulImages}`);

  // Save the image mapping
  fs.writeFileSync('./image-mapping.json', JSON.stringify(imageMapping, null, 2));
  console.log('Image mapping saved to image-mapping.json');

  return imageMapping;
}

if (require.main === module) {
  extractCorrectImages();
}

module.exports = { extractCorrectImages };