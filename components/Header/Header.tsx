import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsIcon from '@material-ui/icons/Settings';
import TransformIcon from '@material-ui/icons/Transform';
import styles from './Header.module.scss';
import Link from 'next/link';

const Header = () => {

  return (
    <div className={styles.header}>
      <Typography variant="h1">
        <Link href='/'>
          <a aria-label="Home">
            <TransformIcon className={styles.headerHeadlineIcon} />
            <span>SVG Sprite Generator</span>
          </a>
        </Link>
      </Typography>

      <div className={styles.headerLinks}>
        <Link href='/faqs'>
          <a aria-label="FAQ">
            <Tooltip title={'See FAQ'}>
              <QuestionAnswerIcon />
            </Tooltip>
          </a>
        </Link>
        <Link href='/attributes'>
          <a aria-label="Attributes that can be stripped">
            <Tooltip title={'Attributes that can be stripped'}>
              <SettingsIcon />
            </Tooltip>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
