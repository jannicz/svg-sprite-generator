import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { NextPage } from 'next';

const Header: NextPage = () => {
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

export default Header;
