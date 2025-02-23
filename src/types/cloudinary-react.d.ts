declare module 'cloudinary-react' {
  import { Component } from 'react';

  interface CloudinaryContextProps {
    cloudName: string;
    children: React.ReactNode;
  }

  interface ImageProps {
    cloudName?: string;
    publicId: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    crop?: string;
    quality?: string;
    loading?: 'lazy' | 'eager';
    fetchFormat?: string;
  }

  export class CloudinaryContext extends Component<CloudinaryContextProps> {}
  export class Image extends Component<ImageProps> {}
}
