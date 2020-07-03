import { withRouter } from 'next/router'
import React from 'react';
import Link from 'next/link';
import faqs from '../../assets/faq.json';

const Faq = (props) => {
  // Access the injected router (export default withRouter())
  const { router } = props;

  return (
    <>
      <h1>FAQ</h1>
      <Link href='/faqs'>
        <a>Back to FAQ List</a>
      </Link>
      <h2>{props.entry.title}</h2>
      <p>{props.entry.content}</p>
      <pre>FAQ nr: {router?.query?.id}</pre>
    </>
  )
}

Faq.getInitialProps = ({ query, req }) => {
  const queryId = query.id;

  // Executed both on server and on client side, depending who first
  console.log('Can be executed both on server and on client side, id =>', queryId);

  if (req) {
    console.log('Only executed on server side', req.url);
  }

  return {
    entry: faqs[queryId]
  };
}

// Before 6.x the url property got injected into every
// Page component. Now inject the Next router object into
// pages and all their descending components.
export default withRouter(Faq);
