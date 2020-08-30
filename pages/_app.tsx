import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import React from 'react';
import '../styles/styles.scss';

/**
 * Contains global stylesheets
 */
const App = ({ Component, pageProps }: AppProps) => {
  return <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
}

export default App;
