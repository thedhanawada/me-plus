interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
}: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-bg-tertiary';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  ));

  return count === 1 ? skeletons[0] : <>{skeletons}</>;
};

// Pre-built skeleton patterns for common use cases
export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div className={`space-y-3 ${className}`}>
    <Skeleton className="aspect-[2/3] w-full" />
    <Skeleton className="h-4 w-3/4" variant="text" />
    <Skeleton className="h-3 w-1/2" variant="text" />
  </div>
);

export const SkeletonPhotoCard = ({ className = '' }: { className?: string }) => (
  <div className={`p-2 border border-border-primary rounded-lg ${className}`}>
    <Skeleton className="aspect-square w-full" />
  </div>
);

export const SkeletonText = ({
  lines = 3,
  className = ''
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        className="h-4"
        variant="text"
        width={i === lines - 1 ? '60%' : '100%'}
      />
    ))}
  </div>
);

export default Skeleton;
