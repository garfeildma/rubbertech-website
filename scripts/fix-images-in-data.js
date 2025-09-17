const fs = require('fs');

function fixImagesInData() {
  console.log('Loading products data to fix images...');

  let products = [];
  try {
    const data = fs.readFileSync('./products-final-accurate.json', 'utf8');
    products = JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return;
  }

  console.log(`Fixing images for ${products.length} products...`);

  let imagesFixed = 0;

  const fixedProducts = products.map(product => {
    if (!product.image || product.image.trim() === '') {
      // Generate image URL based on product code pattern
      const baseImageUrl = `https://rubbertechchina.com/wp-content/uploads/2021/02`;
      const code = product.name || product.code || product.id.toUpperCase();

      // Map specific patterns based on product codes
      let imageNumber = '';
      if (code.startsWith('PR06')) {
        imageNumber = '1';
      } else if (code.startsWith('PR08')) {
        imageNumber = '2';
      } else if (code.startsWith('PR10')) {
        imageNumber = code === 'PR1007' ? '2' : '8';
      } else if (code.startsWith('PR12')) {
        imageNumber = '14';
      } else if (code.startsWith('PR13')) {
        imageNumber = '15';
      } else if (code.startsWith('PR14')) {
        imageNumber = '16';
      } else if (code.startsWith('PR16')) {
        imageNumber = '17';
      } else if (code.startsWith('PU')) {
        imageNumber = '32';
      } else if (code.startsWith('PVC')) {
        imageNumber = '46';
      } else if (code.startsWith('SP')) {
        imageNumber = '58';
      } else if (code.startsWith('SPT')) {
        imageNumber = '60';
      } else if (code.startsWith('SR')) {
        imageNumber = '64';
      } else if (code.startsWith('RT')) {
        imageNumber = '89';
      } else if (code.startsWith('WB')) {
        imageNumber = '116';
      } else {
        imageNumber = '1'; // Default
      }

      product.image = `${baseImageUrl}/${imageNumber}-${code}.jpg`;
      product.thumbnail = `${baseImageUrl}/${imageNumber}-${code}-300x300.jpg`;
      imagesFixed++;
    }

    return product;
  });

  console.log(`Fixed images for ${imagesFixed} products`);

  // Save the fixed data
  fs.writeFileSync('./products-final-accurate-fixed.json', JSON.stringify(fixedProducts, null, 2));

  console.log('Fixed data saved to products-final-accurate-fixed.json');

  return fixedProducts;
}

if (require.main === module) {
  fixImagesInData();
}

module.exports = { fixImagesInData };