import { useAppStore } from '../store/appStore';
import { getTranslation, formatString } from '../locales/i18n';

export function useI18n() {
  const language = useAppStore((state) => state.language);

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const translation = getTranslation(language, key);
    if (variables) {
      return formatString(translation, variables);
    }
    return translation;
  };

  return { t, language };
}
