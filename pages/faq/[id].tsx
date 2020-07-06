import { withRouter } from 'next/router'
import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import faqs from '../../assets/faq.json';
import styles from './id.module.scss';

const FaqPage = (props) => {
  // Access the injected router (export default withRouter())
  const { router } = props;

  return (
    <Layout>
      <Link href='/faqs'>
        <a>Back to FAQ List</a>
      </Link>

      <h2>FAQ <small>({router?.query?.id})</small></h2>

      <h3 className={styles.heading}>{props.entry.title}</h3>
      <p className={styles.content}>{props.entry.content}</p>
    </Layout>
  )
}

// A page containing getInitialProps (shows lambda during build) renders at runtime
FaqPage.getInitialProps = ({ query, req }) => {
  const faqEntry = faqs[query.id] || faqs[0];

  // Executed both on server and on client side, depending who first
  console.log('Can be executed both on server and on client side, id =>', query.id);

  // Req only exists on server side
  if (req) {
    console.log('Only executed on server side', req.url);
  }

  // Window only exists on client side (this would be removed in a client prod bundle)
  if (typeof window !== 'undefined') {
    console.log('Only executed on client side', !!window);
  }

  return {
    entry: faqEntry
  };
}

// Before 6.x the url property got injected into every
// Page component. Now inject the Next router object into
// pages and all their descending components.
export default withRouter(FaqPage);
