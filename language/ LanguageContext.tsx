// LanguageContext.tsx
import { setCurrentLanguage } from '@/components/language';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
    children: ReactNode;
  }

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');

  useEffect(() => {
    // Update the language in translations.ts when the context changes
    setCurrentLanguage(language);
  }, [language]);

  const value = { language, setLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
