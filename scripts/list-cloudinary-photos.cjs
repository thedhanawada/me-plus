const cloudinary = require('cloudinary').v2;

// Configure from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listPhotos() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500
    });

    console.log('Found', result.resources.length, 'photos:\n');

    result.resources.forEach(photo => {
      console.log(`ID: ${photo.public_id}`);
      console.log(`   Size: ${photo.width} × ${photo.height}`);
      console.log(`   Format: ${photo.format}`);
      console.log('');
    });

    // Output as JSON for easy copy
    console.log('\n--- JSON for code ---\n');
    const photoList = result.resources.map(p => ({
      id: p.public_id,
      width: p.width,
      height: p.height
    }));
    console.log(JSON.stringify(photoList, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

listPhotos();
