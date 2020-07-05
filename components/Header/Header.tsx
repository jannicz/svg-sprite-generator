import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';

const Header = props => {
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
            <Link href='/faqs'>
              <a>FAQ</a>
            </Link>
          </li>
          <li>Demo</li>
          <li>License</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
