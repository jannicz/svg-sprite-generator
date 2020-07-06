import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import faqs from '../assets/faq.json';
import Layout from '../components/Layout/Layout';

const FaqsPage = () => {
  const faqList = Object.values(faqs);

  return (
    <Layout>
      <Head>
        <title>SVG sprite generator - FAQ section</title>
      </Head>

      <Link href='/'>
        <a>Back to Index</a>
      </Link>

      <h2>FAQ</h2>

      <ul>
        {
          faqList.map((e, i) =>
            i > 0 ?
            <li key={i}>
              <Link href='/faq/[id]' as={'/faq/' + i}>
                <a>{e.title}</a>
              </Link>
            </li> : null
          )
        }
      </ul>
    </Layout>
  );
}

export default FaqsPage;
