// translations.ts
import translationsJson from "./language.json";

type Language = 'eng' | 'th' | 'id';
type Translations = {[key in Language]: { [key: string]: string };};

// Read datas from language.json
const translations: Translations = translationsJson;
let currentLanguage: Language = 'eng'; // Default language

export function setCurrentLanguage(language: Language): void {
   currentLanguage = language;
}

// translations.ts
// ...

export function translate(key: string, language?: Language): string {
   const lang = language || currentLanguage;
   const translation = translations[lang][key];

   if (!translation) {
      console.warn(`No translation found for key '${key}' in language '${lang}'`);
      return key;
   }

   return translation;
}

export const isTh = (): boolean => {
   return currentLanguage === 'th';
};
