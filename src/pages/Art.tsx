import React, { useEffect, useState } from 'react';
import { Image as CloudinaryImage } from 'cloudinary-react';

interface CloudinaryResource {
  public_id: string;
}

const Art = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, let's use a static list of photos
    // In a production environment, you would typically have a backend API
    // that would securely fetch this list from Cloudinary
    const photos = [
      { id: '22', aspectRatio: '4/3' },
      { id: '472007649_1653285385584310_7880930838952272566_n_18050182676011288_qh9ysx', aspectRatio: '4/3' },
      { id: '471870504_470471162449468_1301845703334164529_n_18057795115760805_qk7ij7', aspectRatio: '4/3' },
      { id: '472028752_677524267977881_7782810903216877222_n_18052829000068831_kzj7dl', aspectRatio: '4/3' },
      { id: '471961629_1305187030687139_5087451783665427063_n_17962354376837477_pr1g66', aspectRatio: '4/3' },
      { id: '471848228_634245685604604_5320794688258876057_n_17913369978050780_wjnueu', aspectRatio: '4/3' },
      { id: '471507008_962068528601656_6075539269720940501_n_18052370966481944_kbj6gd', aspectRatio: '4/3' },
      { id: '471703857_2377874515912198_12434465591510404_n_17994608639727968_jahs5j', aspectRatio: '4/3' },
      { id: '471553046_1104895781177670_5300287396742135585_n_18066609328796010_d32nyy', aspectRatio: '4/3' },
      { id: '470305537_18053173805494713_1713032142419250645_n_17845625373372790_akqc6s', aspectRatio: '4/3' },
    ];
    
    setPhotos(photos.map(p => p.id));
    setLoading(false);
  }, []);
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight dark:text-gray-100">
            Photography
          </h1>
          <div className="text-xl text-gray-600 dark:text-gray-300">
            <p>A collection of moments.</p>
          </div>
        </section>

        {/* Photo Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">Loading photos...</div>
            ) : photos.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No photos found</div>
            ) : photos.map((photoId, index) => (
              <div key={photoId} className="relative aspect-square overflow-hidden rounded-lg p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300">
                <CloudinaryImage
                  cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'}
                  publicId={photoId}
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
