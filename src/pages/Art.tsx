import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-12 relative inline-block">
            <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-xl"></span>
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 animate-text-shine">
                Photography
              </span>
            </span>
          </h1>
          <p className="text-xl text-zinc-400 font-light mb-2">
            A collection of moments
          </p>
          <p className="text-sm text-zinc-500 font-light">
            Images served through{' '}
            <a 
              href="https://cloudinary.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Cloudinary API
            </a>
          </p>
        </motion.div>

        {/* Art Gallery Wall */}
        <div className="max-w-[2000px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {loading ? (
            <div className="col-span-full text-center text-zinc-400">Loading photos...</div>
          ) : photos.length === 0 ? (
            <div className="col-span-full text-center text-zinc-400">No photos found</div>
          ) : photos.map((photoId, index) => (
            <motion.div
              key={photoId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative bg-zinc-900/50 p-4 rounded-lg backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 rounded-lg"></div>
                <div className="relative">
                  {/* Frame effect */}
                  <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
                  <div className="absolute inset-[2px] border border-black/50 rounded-lg"></div>
                  <CloudinaryImage
                    cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
                    publicId={photoId}
                    className="w-full rounded-lg shadow-xl"
                    loading="lazy"
                    width="800"
                    crop="fill"
                    quality="auto"
                    fetchFormat="auto"
                  />
                  {/* Subtle shadow overlay */}
                  <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none"></div>
                </div>
                {/* Caption area - can be used for photo details later */}
                <div className="mt-3 px-1">
                  <div className="h-1 w-12 bg-gradient-to-r from-white/10 to-transparent rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Loading and error states handled above */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Art;
