import { withTranslation, Link } from '../../server/i18n';
import { WithTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Header.module.scss';

const Header = (props: WithTranslation) => {
  const t = props.t;

  return (
    <header className={styles.header}>
      <h1>
        <Link href='/'>
          <a>
            SVG Sprite Generator
          </a>
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href='/attributes'>
              <a>Which Attributes</a>
            </Link>
          </li>
          <li>
            <Link href='/faqs'>
              <a>FAQ</a>
            </Link>
          </li>
          <li>License</li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Header);
