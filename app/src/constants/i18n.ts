export const SUPPORTED_LANGS = ['de', 'en', 'ru'] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const isSupportedLang = (value: string | undefined): value is SupportedLang =>
  !!value && SUPPORTED_LANGS.includes(value as SupportedLang);
