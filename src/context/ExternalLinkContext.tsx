import { createContext, useState, useCallback, ReactNode } from 'react';

interface ExternalLinkContextType {
  showModal: (url: string) => void;
  hideModal: () => void;
  pendingUrl: string | null;
  isOpen: boolean;
}

export const ExternalLinkContext = createContext<ExternalLinkContextType | undefined>(undefined);

interface ExternalLinkProviderProps {
  children: ReactNode;
}

export const ExternalLinkProvider = ({ children }: ExternalLinkProviderProps) => {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = useCallback((url: string) => {
    setPendingUrl(url);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
    // Clear URL after animation completes
    setTimeout(() => setPendingUrl(null), 200);
  }, []);

  return (
    <ExternalLinkContext.Provider value={{ showModal, hideModal, pendingUrl, isOpen }}>
      {children}
    </ExternalLinkContext.Provider>
  );
};
