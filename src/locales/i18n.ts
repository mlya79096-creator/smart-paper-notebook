import ar from './ar.json';
import en from './en.json';

export type Language = 'ar' | 'en';

export const translations = {
  ar,
  en,
} as const;

export type TranslationKey = keyof typeof ar;

export const defaultLanguage: Language = 'en';

export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

export function formatString(template: string, variables: Record<string, string | number>): string {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return String(variables[key] ?? match);
  });
}
