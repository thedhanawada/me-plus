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
      { id: '471848228_634245685604604_5320794688258876057_n_17913369978050780_wjnueu', aspectRatio: '4/3' },
      { id: '471961629_1305187030687139_5087451783665427063_n_17962354376837477_pr1g66', aspectRatio: '4/3' },
      { id: '471507008_962068528601656_6075539269720940501_n_18052370966481944_kbj6gd', aspectRatio: '4/3' },
      { id: '471472709_27990740777239594_6469774170371940177_n_18033254411524063_dpeexs', aspectRatio: '4/3' },
      { id: '470975125_1280941889820214_1268483907759615960_n_18262480012265170_mdjkkz', aspectRatio: '4/3' },
      { id: '470974844_859495799459959_3787070871998235827_n_18368639380138075_tnawnv', aspectRatio: '4/3' },
      { id: '470684195_18053453462494713_8166586720672144739_n_18080153713584429_obf9h1', aspectRatio: '4/3' },
      { id: '470684195_18053453462494713_8166586720672144739_n_17962651307717004_kghomk', aspectRatio: '4/3' },
      { id: '472123967_507389138437295_7147050760239808910_n_18056923354780192_d1vvn3', aspectRatio: '4/3' },
      { id: 'IMG_3993_knzvrb', aspectRatio: '4/3' },
      { id: '469592455_18052571543494713_1260971431337253769_n_17963527553830419_ovs4lq', aspectRatio: '4/3' },
      { id: '469592455_18052571543494713_1260971431337253769_n_17884397715179153_n8wl07', aspectRatio: '4/3' },

      { id: '469586787_18052479011494713_5751425294506957218_n_17924592792000832_ilangx', aspectRatio: '4/3' },
      { id: 'IMG_3973_wvbdt9', aspectRatio: '4/3' },

    ];
    
    setPhotos(photos.map(p => p.id));
    setLoading(false);
  }, []);
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Photography
          </h1>
          <div className="text-xl text-gray-600">
            <p>A collection of moments.</p>
          </div>
        </section>

        {/* Photo Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-gray-500">Loading photos...</div>
            ) : photos.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No photos found</div>
            ) : photos.map((photoId, index) => (
              <div key={photoId} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <CloudinaryImage
                  cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
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
