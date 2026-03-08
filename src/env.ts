export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;

if (!CLOUDINARY_CLOUD_NAME) {
  console.warn(
    '[me-plus] VITE_CLOUDINARY_CLOUD_NAME is not set. The photography page will not load images. See .env.example.'
  );
}
