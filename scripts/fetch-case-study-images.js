import fetch from 'node-fetch';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    await fs.writeFile(filename, buffer);
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return false;
  }
}

async function processLogo(inputPath, outputPath, size = 400) {
  try {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(outputPath);
    console.log(`Processed ${outputPath} successfully`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function createAccountingIcon(outputPath) {
  try {
    // Create a simple accounting-themed icon
    const size = 400;
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white"/>
        <circle cx="200" cy="200" r="180" fill="#f0f0f0"/>
        <text x="200" y="220" font-family="Arial" font-size="240" text-anchor="middle" fill="#666">$</text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    console.log('Created accounting icon successfully');
  } catch (error) {
    console.error('Error creating accounting icon:', error);
  }
}

async function main() {
  const outputDir = 'client/public/case-studies';
  
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Process Platinum Travel logo
  await processLogo('Untitled design (1).png', `${outputDir}/platinum-travel.png`);
  
  // Download and process NBX Expo logo
  await downloadImage('https://nbxexpo.com/wp-content/uploads/2023/05/NBX-logo-PNG.png', `${outputDir}/nbx-temp.png`);
  await processLogo(`${outputDir}/nbx-temp.png`, `${outputDir}/nbx-expo.jpg`);
  
  // Download and process Enso Brands logo
  await downloadImage('https://ensobrands.com/wp-content/uploads/2023/02/enso-logo.png', `${outputDir}/enso-temp.png`);
  await processLogo(`${outputDir}/enso-temp.png`, `${outputDir}/enso-brands.jpg`);
  
  // Create accounting icon
  await createAccountingIcon(`${outputDir}/accounting-software.jpg`);
  
  // Clean up temporary files
  try {
    await fs.unlink(`${outputDir}/nbx-temp.png`);
    await fs.unlink(`${outputDir}/enso-temp.png`);
  } catch (error) {
    console.error('Error cleaning up temp files:', error);
  }
}

main().catch(console.error);
