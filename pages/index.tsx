import { NextPage, NextPageContext } from 'next';
import { withTranslation, i18n, } from '../i18n';
import { WithTranslation } from 'next-i18next';
import React from 'react';
import Layout from '../components/Layout/Layout';
import PropTypes from 'prop-types';

const Index: NextPage = (props: any) => {
  const t = props.t;

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'de' : 'en';
    console.log('changing language from', i18n.language, 'to', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Layout>
      <h2>{t('index:headline')}</h2>

      <button type='button' onClick={changeLanguage}>
        {t('language')}
      </button>

      <textarea rows={20} cols={80}></textarea>
    </Layout>
  )
}

Index.propTypes = {
  t: PropTypes.func.isRequired
}

Index.getInitialProps = async (context: NextPageContext) => {
  const contextQuery = context.query;
  console.log('Render Index.tsx, context query =>', context.query);

  return {
    ...contextQuery,
    namespacesRequired: ['common', 'index']
  };
};

export default withTranslation('common')(Index);
