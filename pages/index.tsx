import { NextPage, NextPageContext } from 'next';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styles from './Index.module.scss';
import Layout from '../components/Layout/Layout';
import Configuration from '../components/Configuration/Confuguration';
import Dropzone from '../components/Dropzone/Dropzone';

const Index: NextPage = () => {

  return (
    <Layout>
      <div className={styles.index}>
        <Grid container spacing={3} justify={'center'} alignItems={'flex-start'}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2">
              Transform your SVG icons into a sprite by uploading them here
            </Typography>
          </Grid>

          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Paper className={styles.dropzone}>
              <Dropzone />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={5} md={4} lg={3}>
            <Paper className={styles.controls}>
              <Configuration />
            </Paper>
          </Grid>
        </Grid>
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
