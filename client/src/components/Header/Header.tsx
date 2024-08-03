import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';


const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} md={1}>
            <Typography variant="h6">
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <HomeIcon />
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} md={9}>
            <Typography variant="h6" className={styles.logo}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <a href="#">LOGO</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="h6">
              <Link to="/locations" style={{ color: 'inherit', textDecoration: 'none' }}>
                Locations
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="h6">
              <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                About
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header