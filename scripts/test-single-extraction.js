const { extractFinalProductDetails } = require('./extract-final-accurate.js');
const fs = require('fs');

// Test with the saved HTML
const html = fs.readFileSync('./pr0601-debug.html', 'utf8');
const product = extractFinalProductDetails(html, 'https://rubbertechchina.com/product/pr0601/');

console.log('PR0601 Extraction Test:');
console.log(JSON.stringify(product, null, 2));