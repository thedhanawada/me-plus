import { useState } from 'react';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { photos, type Photo } from '../data';
import Skeleton from '../components/Skeleton';

const PhotoSkeleton = ({ photo }: { photo: Photo }) => {
  const aspectRatio = photo.width / photo.height;
  return (
    <div
      className="w-full max-w-4xl mx-auto"
      style={{ aspectRatio: aspectRatio }}
    >
      <Skeleton className="w-full h-full" />
    </div>
  );
};

const PhotoItem = ({ photo }: { photo: Photo }) => {
  const [loaded, setLoaded] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const aspectRatio = photo.width / photo.height;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!loaded && <PhotoSkeleton photo={photo} />}
      <div
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0 absolute'}`}
        style={{ aspectRatio: aspectRatio }}
      >
        <CloudinaryImage
          cloudName={cloudName}
          publicId={photo.id}
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
          width="1200"
          quality="auto"
          fetchFormat="auto"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

const Art = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
        <section>
          <h1 className="text-fluid-4xl font-bold mb-content leading-tight">
            Photos
          </h1>
        </section>

        <section className="space-y-16">
          {photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Art;
