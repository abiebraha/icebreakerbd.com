import sharp from 'sharp';

try {
  await sharp('IMG_1733.jpeg')
    .resize(400, 400, {
      fit: 'cover',
      position: 'center'
    })
    .removeAlpha()
    .png()
    .toFile('client/public/abe-profile.png');
  
  console.log('Image processed successfully');
} catch (error) {
  console.error('Error processing image:', error);
}
