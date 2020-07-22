import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Link } from '../../i18n';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { FaqEntryModel } from '../../models/faqEntry.model';
import faqs from '../../assets/faq.json';
import styles from './id.module.scss';
import PropTypes from 'prop-types';

const FaqPage: NextPage = (props: any) => {
  const router = useRouter();

  return (
    <Layout>
      <Link href='/faqs'>
        <a>Back to FAQ List</a>
      </Link>

      <h2>FAQ <small>({router?.query?.id})</small></h2>

      <h3 className={styles.heading}>{props.entry.title}</h3>
      <p className={styles.content}>{props.entry.content}</p>
      <time dateTime={props.entry.edited}>Edited: {props.editDate}</time>
    </Layout>
  )
}

// A page containing getInitialProps (shows lambda during build) renders at runtime
FaqPage.getInitialProps = async ({ query, req }) => {
  // The "query" containing the id exists on both client and server side
  const queryId: number = query.id ? Number(query.id) : 0;
  const faqEntry: FaqEntryModel = faqs[queryId];
  console.log('FaqPage.getInitialProps query.id =>', query.id);

  // Async import inside the component creates a separate bundle for moment.js
  // See https://v8.dev/features/dynamic-import
  const moment = (
    await import('moment')
    // Reference the default export in a dynamic import
  ).default;

  moment.locale('en');
  // moment.locale('de');

  const lastEdited = moment(faqEntry.edited).startOf('day').fromNow();

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
    entry: faqEntry,
    editDate: lastEdited
  } as { entry: FaqEntryModel, editDate: string };
}

FaqPage.propTypes = {
  entry: PropTypes.object,
  editDate: PropTypes.string
};

export default FaqPage;
