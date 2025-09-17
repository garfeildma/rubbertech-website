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

function extractWheelbarrowSpecs(html) {
  const specs = {};

  // Extract all table rows from Additional information section
  const tableRegex = /<tr[^>]*class="[^"]*woocommerce-product-attributes-item[^"]*"[^>]*>(.*?)<\/tr>/gs;
  const matches = html.match(tableRegex);

  if (matches) {
    matches.forEach(match => {
      // Extract label and value from each row
      const labelMatch = match.match(/<th[^>]*class="[^"]*woocommerce-product-attributes-item__label[^"]*"[^>]*>([^<]+):<\/th>/);
      const valueMatch = match.match(/<td[^>]*class="[^"]*woocommerce-product-attributes-item__value[^"]*"[^>]*><p>([^<]+)<\/p>/);

      if (labelMatch && valueMatch) {
        const label = labelMatch[1].trim();
        const value = valueMatch[1].trim();

        // Convert labels to camelCase property names
        let propName = label.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s(.)/g, (match, letter) => letter.toUpperCase());

        // Handle special cases
        if (propName === 'itemno') propName = 'itemNo';
        if (propName === 'loadcapacity') propName = 'loadCapacity';
        if (propName === 'watercapacity') propName = 'waterCapacity';
        if (propName === 'sandcapacity') propName = 'sandCapacity';
        if (propName === 'wheelsize') propName = 'wheelSize';

        specs[propName] = value;
      }
    });
  }

  return specs;
}

function extractTrolleySpecs(html) {
  const specs = {};

  // Extract all table rows from Additional information section
  const tableRegex = /<tr[^>]*class="[^"]*woocommerce-product-attributes-item[^"]*"[^>]*>(.*?)<\/tr>/gs;
  const matches = html.match(tableRegex);

  if (matches) {
    matches.forEach(match => {
      // Extract label and value from each row
      const labelMatch = match.match(/<th[^>]*class="[^"]*woocommerce-product-attributes-item__label[^"]*"[^>]*>([^<]+):<\/th>/);
      const valueMatch = match.match(/<td[^>]*class="[^"]*woocommerce-product-attributes-item__value[^"]*"[^>]*><p>([^<]+)<\/p>/);

      if (labelMatch && valueMatch) {
        const label = labelMatch[1].trim();
        const value = valueMatch[1].trim();

        // Convert labels to camelCase property names
        let propName = label.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s(.)/g, (match, letter) => letter.toUpperCase());

        // Handle special cases
        if (propName === 'itemno') propName = 'itemNo';
        if (propName === 'loadcapacity') propName = 'loadCapacity';
        if (propName === 'bodysize') propName = 'bodySize';

        specs[propName] = value;
      }
    });
  }

  return specs;
}

async function extractWBandRTSpecs() {
  console.log('Loading product URLs for WB and RT products...');

  let productUrls = [];
  try {
    const urlsData = fs.readFileSync('./product-urls.json', 'utf8');
    productUrls = JSON.parse(urlsData);
  } catch (error) {
    console.error('Error loading product URLs:', error);
    return;
  }

  // Filter for WB and RT products only
  const wbRtUrls = productUrls.filter(url => {
    const match = url.match(/\/product\/([^\/]+)\//);
    if (match) {
      const productCode = match[1].toUpperCase();
      return productCode.startsWith('WB') || productCode.startsWith('RT');
    }
    return false;
  });

  console.log(`Extracting specifications for ${wbRtUrls.length} WB and RT products...`);

  const extractedSpecs = {};
  const batchSize = 3;

  for (let i = 0; i < wbRtUrls.length; i += batchSize) {
    const batch = wbRtUrls.slice(i, i + batchSize);

    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(wbRtUrls.length/batchSize)} (${i + 1}-${Math.min(i + batchSize, wbRtUrls.length)}/${wbRtUrls.length})`);

    const batchPromises = batch.map(async (url, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 400));

        const urlMatch = url.match(/\/product\/([^\/]+)\//);
        if (!urlMatch) return null;

        const productCode = urlMatch[1].toUpperCase();
        const html = await fetchPage(url);

        let specs;
        if (productCode.startsWith('WB')) {
          specs = extractWheelbarrowSpecs(html);
        } else if (productCode.startsWith('RT')) {
          specs = extractTrolleySpecs(html);
        }

        if (specs && Object.keys(specs).length > 0) {
          extractedSpecs[productCode] = {
            productCode,
            url,
            specifications: specs
          };
          console.log(`  ✓ ${productCode}: ${Object.keys(specs).length} specs found`);
        } else {
          console.log(`  ✗ ${productCode}: No specs found`);
        }

        return extractedSpecs[productCode];
      } catch (error) {
        console.error(`  ✗ Error fetching ${url}:`, error.message);
        return null;
      }
    });

    await Promise.all(batchPromises);

    // Delay between batches
    if (i + batchSize < wbRtUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  const totalProducts = Object.keys(extractedSpecs).length;
  console.log(`\nExtracted specifications for ${totalProducts} products`);

  // Save the specifications
  fs.writeFileSync('./wb-rt-specifications.json', JSON.stringify(extractedSpecs, null, 2));
  console.log('Specifications saved to wb-rt-specifications.json');

  // Show some examples
  console.log('\nExample specifications:');
  Object.values(extractedSpecs).slice(0, 3).forEach(item => {
    console.log(`\n${item.productCode}:`);
    Object.entries(item.specifications).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
  });

  return extractedSpecs;
}

if (require.main === module) {
  extractWBandRTSpecs();
}

module.exports = { extractWBandRTSpecs };