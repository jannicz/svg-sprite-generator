import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FaqEntryModel } from '../../models/faqEntry.model';
import React from 'react';
import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from 'next/link';
import faqs from '../../assets/faq.json';
import PropTypes from 'prop-types';

const FaqPage: NextPage = (props: any) => {
  const router = useRouter();

  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href='/'>
          <a className={'breadcrumbLink'}>
            <HomeIcon className={'breadcrumbIcon'} />
            Home
          </a>
        </Link>
        <Link href='/faqs'>
          <a className={'breadcrumbLink'}>
            FAQs
          </a>
        </Link>
        <Typography color="textPrimary">
          FAQs
        </Typography>
      </Breadcrumbs>

      <Card style={{ padding: '20px', maxWidth: '500px' }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Question {router?.query?.id}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.entry.title}
          </Typography>
          <Typography variant="body2" component="p" style={{ padding: '20px 0 20px 0' }}>
            {props.entry.content}
            <br />
          </Typography>
          <Typography color="textSecondary">
            <time dateTime={props.entry.edited}>Edited: {props.editDate}</time>
          </Typography>
        </CardContent>
      </Card>

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
