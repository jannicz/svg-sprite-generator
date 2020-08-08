import { NextPage } from 'next';
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';
import Head from 'next/head';
import faqs from '../assets/faq.json';
import Layout from '../components/Layout/Layout';
import Paper from '@material-ui/core/Paper';

const FaqsPage: NextPage = () => {
  const faqList = Object.values(faqs);

  return (
    <Layout>
      <Head>
        <title>SVG sprite generator - FAQ section</title>
      </Head>

      <Breadcrumbs aria-label="breadcrumb">
        <Link href='/'>
          <a className={'breadcrumbLink'}>
            <HomeIcon className={'breadcrumbIcon'} />
            Home
          </a>
        </Link>
        <Typography color="textPrimary">
          FAQs
        </Typography>
      </Breadcrumbs>

      <Paper style={{ padding: '20px' }}>
        <Typography variant="h4" component="h2">
          FAQ
        </Typography>

        <List component="nav">
          {
            faqList.map((e, i) =>
              i > 0 ?
              <ListItem key={i} divider>
                <Link href='/faq/[id]' as={'/faq/' + i}>
                  <a>{e.title}</a>
                </Link>
              </ListItem> : null
            )
          }
        </List>
      </Paper>
    </Layout>
  );
}

export default FaqsPage;
