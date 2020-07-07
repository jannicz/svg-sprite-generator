import React from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.scss';

/**
 * Contains global stylesheets
 */
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.array
};

export default App;
