import NextI18Next from 'next-i18next';

const nextI18Next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de']
});

export default nextI18Next;
export const { appWithTranslation, Link, i18n, withTranslation } = nextI18Next;
