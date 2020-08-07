import { NextPage, NextPageContext } from 'next';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import Layout from '../components/Layout/Layout';
import Configuration from '../components/Configuration/Confuguration';

const Index: NextPage = () => {
  const handleChange = (e) => {
    console.log('Dropzone change', e);
  };

  return (
    <Layout>
      <div>
        <h2>Simply create a SVG symbols file by transforming your icons here</h2>
        <div>
          <DropzoneArea
            onChange={handleChange.bind(this)}
            acceptedFiles={['image/svg+xml']}
            maxFileSize={5000000}
            filesLimit={10000}
          />
        </div>
        <div>
          <Configuration />
        </div>
      </div>
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
