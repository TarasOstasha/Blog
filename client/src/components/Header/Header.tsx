import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { HeaderProps, UserData } from '../../interfaces';
//import { getUserDataThunk } from '../../store/slices/authSlice';

const Header: React.FC<HeaderProps> = ({ userData }) => {
  //const Header: React.FC = () => {
  console.log(userData, 'userData header');
  // if (!userData) return null;
  // const { name } = userData;

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
          <Grid item xs={6} md={8}>
            <Typography variant="h6" className={styles.logo}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                LOGO
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="h6">
              <Link
                to="/locations"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Locations
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="h6">
              <Link
                to="/about"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                About
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            {userData ? (
              <Typography variant="h6">{userData.name}</Typography>
            ) : (
              <Typography variant="h6">
                <Link
                  to="/login"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Login
                </Link>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ auth: { authData } }: RootState) => ({
  userData: authData[0],
});

export default connect(mapStateToProps, null)(Header);

//export default Header;
