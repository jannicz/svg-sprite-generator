import React from 'react';
import Layout from '../components/Layout/Layout';
import attributeTable from '../assets/attributes.json';
import { withRouter } from 'next/router';

const AttributePage = (props) => {
  return (
    <Layout>
      <h2>Which Attributes should be stripped?</h2>

      {
        props.table.map((row, i) => {
          return <p key={i}>{JSON.stringify(row)}</p>
        })
      }
    </Layout>
  );
}

// A page containing getInitialProps renders at runtime
AttributePage.getInitialProps = async ({ query, req }) => {
  // Req only exists on server side
  if (req) {
    console.log('AttributePage - executed on server side', req.url);

    return {
      table: attributeTable
    }
  }

  // Window only exists on client side
  if (typeof window !== 'undefined') {
    const response = await fetch('/api/svg').then(res => res.json());

    console.log('AttributePage - executed on client side', response);

    return {
      table: response
    };
  }

};

export default withRouter(AttributePage);
