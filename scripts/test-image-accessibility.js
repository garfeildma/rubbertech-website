const https = require('https');
const fs = require('fs');

async function testImageUrl(url) {
  return new Promise((resolve) => {
    const request = https.get(url, (response) => {
      resolve({
        url: url,
        status: response.statusCode,
        accessible: response.statusCode === 200
      });
    });

    request.on('error', (error) => {
      resolve({
        url: url,
        status: 'ERROR',
        accessible: false,
        error: error.message
      });
    });

    // Timeout after 10 seconds
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        url: url,
        status: 'TIMEOUT',
        accessible: false
      });
    });
  });
}

async function testImageAccessibility() {
  console.log('Loading products to test image accessibility...');

  let products = [];
  try {
    const data = fs.readFileSync('./products-with-correct-images.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return;
  }

  // Test a sample of images (first 20 for speed)
  const sampleProducts = products.slice(0, 20);
  const testResults = [];

  console.log(`Testing accessibility of ${sampleProducts.length} sample images...`);

  for (let i = 0; i < sampleProducts.length; i++) {
    const product = sampleProducts[i];
    console.log(`Testing ${i + 1}/${sampleProducts.length}: ${product.name}`);

    const result = await testImageUrl(product.image);
    testResults.push({
      productCode: product.name,
      productId: product.id,
      ...result
    });

    if (result.accessible) {
      console.log(`  ✓ ${result.status} - Accessible`);
    } else {
      console.log(`  ✗ ${result.status} - ${result.error || 'Not accessible'}`);
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const accessibleCount = testResults.filter(r => r.accessible).length;
  const notAccessibleCount = testResults.length - accessibleCount;

  console.log(`\nResults:`);
  console.log(`  ✓ Accessible: ${accessibleCount}/${testResults.length}`);
  console.log(`  ✗ Not Accessible: ${notAccessibleCount}/${testResults.length}`);

  if (notAccessibleCount > 0) {
    console.log('\nNot accessible images:');
    testResults
      .filter(r => !r.accessible)
      .forEach(r => console.log(`  - ${r.productCode}: ${r.url} (${r.status})`));
  }

  // Save test results
  fs.writeFileSync('./image-accessibility-test.json', JSON.stringify(testResults, null, 2));
  console.log('\nTest results saved to image-accessibility-test.json');

  return testResults;
}

if (require.main === module) {
  testImageAccessibility();
}

module.exports = { testImageAccessibility };