import { useRouter } from 'next/router';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import TransformIcon from '@material-ui/icons/Transform';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Tooltip title={'Home'}>
          <IconButton onClick={() => router.push('/')}>
            <TransformIcon className={styles.headerHeadlineIcon} />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" className={styles.title}>
          SVG Sprite Generator
        </Typography>

        <div>
          <IconButton
            aria-label="Open menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => router.push('/faqs')}>FAQ</MenuItem>
            <MenuItem onClick={() => router.push('/attributes')}>SVG Attributes</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
