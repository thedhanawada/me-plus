import { ReactNode } from 'react';
import { Inbox, ImageOff, Film, FolderOpen } from 'lucide-react';

type EmptyStateType = 'default' | 'photos' | 'media' | 'projects';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  action?: ReactNode;
}

const icons: Record<EmptyStateType, ReactNode> = {
  default: <Inbox className="w-12 h-12 text-text-muted" />,
  photos: <ImageOff className="w-12 h-12 text-text-muted" />,
  media: <Film className="w-12 h-12 text-text-muted" />,
  projects: <FolderOpen className="w-12 h-12 text-text-muted" />,
};

const defaultMessages: Record<EmptyStateType, { title: string; description: string }> = {
  default: {
    title: 'Nothing here yet',
    description: 'Check back later for updates.',
  },
  photos: {
    title: 'No photos found',
    description: 'The gallery is empty at the moment.',
  },
  media: {
    title: 'No media found',
    description: 'The watchlist is empty at the moment.',
  },
  projects: {
    title: 'No projects found',
    description: 'Check back later for new experiments.',
  },
};

const EmptyState = ({
  type = 'default',
  title,
  description,
  action,
}: EmptyStateProps) => {
  const defaults = defaultMessages[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 p-4 rounded-full bg-bg-secondary">
        {icons[type]}
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title || defaults.title}
      </h3>
      <p className="text-text-secondary max-w-sm mb-6">
        {description || defaults.description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
