import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import React, { useEffect } from 'react';
import '../styles/styles.scss';

/**
 * Contains global stylesheets
 */
const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import('svg-icon-sprite');
  }, []);

  return <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
}

export default App;
