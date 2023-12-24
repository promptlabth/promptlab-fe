// LanguageContext.tsx
import { setCurrentLanguage } from '@/languages/language';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tones } from '@/models/tones';
import { ListTones } from '@/api/ToneAPI';
import { getLocation } from '@/api/GetGeoLocaltion';

// Define the available language options
export type Language = 'eng' | 'th' | 'id';


// Define the type of the LanguageContext
// @Attribute
// language: Represents the current language handled by this context. It is a string value that can be either 'en' (English) or 'th' (Thai).
// setLanguage: A function that is used to update the language. It takes a language string as an argument and does not return any value.
interface LanguageContextType {
   language: Language;
   setLanguage: (language: Language) => void;
   tones: Tones[];
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
   const [tones, setTones] = useState<Tones[]>([]);

   const getTones = async () => {
      const result = await ListTones(language);
      if (result) {
         setTones(result)
         // console.log("tones",result)
      }
   }

   useEffect(() => {
      const fetchLocationAndSetLanguage = async () => {
         try {
            const locationLanguage = await getLocation();
            //   setLanguage(locationLanguage);
            setCurrentLanguage(locationLanguage);
            getTones();

         } catch (error) {
            // Set a default language when error occurs
            setLanguage('eng');
            console.log(error);
         }
      };

      fetchLocationAndSetLanguage();
   }, [language]);


   // Create a value object to be passed to the LanguageContext.Provider
   const value = {
      language,
      setLanguage,
      tones
   };

   // Render the LanguageContext.Provider with the provided children
   return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
