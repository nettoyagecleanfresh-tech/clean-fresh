import sharp from 'sharp';

async function compressLogo() {
  try {
    await sharp('public/logo.png')
      .resize(300) // 300px max width for email
      .png({ quality: 80 })
      .toFile('public/logo-email.png');
    console.log('Logo compressé avec succès dans public/logo-email.png');
  } catch (error) {
    console.error('Erreur de compression:', error);
  }
}

compressLogo();
