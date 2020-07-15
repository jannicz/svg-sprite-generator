import { AppProps } from 'next/app';
import React from 'react';
import '../styles/styles.scss';

/**
 * Contains global stylesheets
 */
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;
