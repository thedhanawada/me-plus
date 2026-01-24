import React, { useEffect, useState } from 'react';
import { Image as CloudinaryImage } from 'cloudinary-react';

interface Photo {
  id: string;
  alt: string;
}

const Art = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    // For now, let's use a static list of photos
    // In a production environment, you would typically have a backend API
    // that would securely fetch this list from Cloudinary
    const photoList = [
      { id: '22', alt: 'Photography by N.R Dhanawada' },
      { id: '472007649_1653285385584310_7880930838952272566_n_18050182676011288_qh9ysx', alt: 'Photography by N.R Dhanawada' },
      { id: '471870504_470471162449468_1301845703334164529_n_18057795115760805_qk7ij7', alt: 'Photography by N.R Dhanawada' },
      { id: '472028752_677524267977881_7782810903216877222_n_18052829000068831_kzj7dl', alt: 'Photography by N.R Dhanawada' },
      { id: '471961629_1305187030687139_5087451783665427063_n_17962354376837477_pr1g66', alt: 'Photography by N.R Dhanawada' },
      { id: '471848228_634245685604604_5320794688258876057_n_17913369978050780_wjnueu', alt: 'Photography by N.R Dhanawada' },
      { id: '471507008_962068528601656_6075539269720940501_n_18052370966481944_kbj6gd', alt: 'Photography by N.R Dhanawada' },
      { id: '471703857_2377874515912198_12434465591510404_n_17994608639727968_jahs5j', alt: 'Photography by N.R Dhanawada' },
      { id: '471553046_1104895781177670_5300287396742135585_n_18066609328796010_d32nyy', alt: 'Photography by N.R Dhanawada' },
      { id: '470305537_18053173805494713_1713032142419250645_n_17845625373372790_akqc6s', alt: 'Photography by N.R Dhanawada' },
    ];

    setPhotos(photoList);
    setLoading(false);
  }, []);

  if (!cloudName) {
    return (
      <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Configuration error: Cloudinary cloud name is not configured.</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-content leading-tight">
            Photography
          </h1>
          <div className="text-xl text-text-secondary">
            <p>A collection of moments.</p>
          </div>
        </section>

        {/* Photo Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-content">
            {loading ? (
              <div className="col-span-full text-center text-text-tertiary">Loading photos...</div>
            ) : photos.length === 0 ? (
              <div className="col-span-full text-center text-text-tertiary">No photos found</div>
            ) : photos.map((photo, index) => (
              <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg p-2 border border-border-primary bg-bg-primary shadow-lg hover:shadow-2xl transition-all duration-default">
                <CloudinaryImage
                  cloudName={cloudName}
                  publicId={photo.id}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  width="800"
                  crop="fill"
                  quality="auto"
                  fetchFormat="auto"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Art;
