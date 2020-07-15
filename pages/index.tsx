import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Layout from '../components/Layout/Layout';

const Index: NextPage = (props: any) => {

  return (
    <Layout>
      <h2>Simply create a SVG symbols file by dropping your icons here</h2>

      <textarea rows={20} cols={80}></textarea>
    </Layout>
  )
}

Index.getInitialProps = async (context: NextPageContext) => {
  const contextQuery = context.query;
  console.log('Render Index.tsx, context query =>', context.query);

  return {
    ...contextQuery,
    namespacesRequired: ['common', 'index']
  };
};

export default Index;
