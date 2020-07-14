const NextI18Next = require('next-i18next').default
const localeSubpaths = require('../next.config.js').publicRuntimeConfig.localeSubpaths;

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

module.exports = new NextI18Next({
  otherLanguages: ['de'],
  localeSubpaths: localeSubpathVariations[localeSubpaths]
});
