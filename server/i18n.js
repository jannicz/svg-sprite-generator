const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;

const localeSubpathVariations = {
  none: {},
  foreign: {
    de: 'de',
  },
  all: {
    en: 'en',
    de: 'de',
  },
};

const nextI18Next = new NextI18Next({
  localeSubpaths: localeSubpathVariations[localeSubpaths],
  defaultLanguage: 'en',
  otherLanguages: ['de']
});

module.exports = nextI18Next;
