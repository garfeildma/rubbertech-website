const fs = require('fs');

function fixHtmlEntities() {
  console.log('Fixing HTML entities in products.ts...');

  let content = '';
  try {
    content = fs.readFileSync('./src/data/products.ts', 'utf8');
  } catch (error) {
    console.error('Error reading products.ts:', error);
    return;
  }

  // Fix HTML entities inside string values only (not JSON structure quotes)
  const fixedContent = content
    .replace(/"([^"]*?)&quot;([^"]*?)"/g, (match, before, after) => {
      return `"${before}"${after}"`;
    })
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  // Write back the fixed content
  fs.writeFileSync('./src/data/products.ts', fixedContent);

  console.log('Fixed HTML entities in products.ts');
}

if (require.main === module) {
  fixHtmlEntities();
}

module.exports = { fixHtmlEntities };