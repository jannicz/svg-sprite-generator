import { appWithTranslation } from '../i18n';
import { AppProps } from 'next/app';
import App from 'next/app';
import React from 'react';
import '../styles/styles.scss';

/**
 * Contains global stylesheets and initializes translations
 */
class MyApp extends App {
  render() {
    const { Component, pageProps }: AppProps = this.props;
    return <Component {...pageProps} />
  }
}

export default appWithTranslation(MyApp);
