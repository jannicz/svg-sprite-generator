import React from 'react';
import Header from '../Header/Header';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = props => {
  return (
    <>
      <Head>
        <title>SVG sprite generator</title>
      </Head>
      <Header></Header>
      <main>
        {props.children}
      </main>
      <footer>
        Copyright Jan Suwart, MIT license
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
