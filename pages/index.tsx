import { NextPage } from 'next';
import React from 'react';
import Layout from '../components/Layout/Layout';

import { appWithTranslation } from '../server/i18n.js';

const Index: NextPage = () => {
  console.log('Render Index.tsx');

  return (
    <Layout>
      <h2>Simply create a SVG symbols file by dropping your icons here</h2>

      <textarea rows={20} cols={80}></textarea>
    </Layout>
  )
}

export default Index;
