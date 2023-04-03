// translations.ts
import translationsJson from '../language/language.json';

type Language = 'en' | 'th';
type Translations = {
  [key in Language]: { [key: string]: string };
};

const translations: Translations = translationsJson;
let currentLanguage: Language = 'en'; // Default language

export function setCurrentLanguage(language: Language): void {
  currentLanguage = language;
}

// translations.ts
// ...

export function t(key: string, language?: Language): string {
  const lang = language || currentLanguage;
  const translation = translations[lang][key];

  if (!translation) {
    console.warn(`No translation found for key '${key}' in language '${lang}'`);
    return key;
  }

  return translation;
}

// ...


export const isTh = (): boolean => {
  return currentLanguage === 'th';
};
