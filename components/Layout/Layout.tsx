import React from 'react';
import Header from '../Header/Header';
import Head from 'next/head';

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

export default Layout;
