import React from 'react';
import { AppProps } from 'next/app';
import '../styles/styles.scss';

/**
 * Contains global stylesheets
 */
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;
