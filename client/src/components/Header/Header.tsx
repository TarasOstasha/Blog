import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setAuthData, logout } from '../../store/slices/authSlice'; //'./store/slices/authSlice';
//import { HeaderProps, MyToken } from '../../interfaces';
//import { getUserDataThunk } from '../../store/slices/authSlice';

interface HeaderProps {
  userName: string | undefined;
  setAuthData: (token: MyToken) => void;
  logOut: () => void;
}

interface MyToken {
  id: number;
  name: string;
  email: string;
  exp: number;
  iat: number;
}

const Header: React.FC<HeaderProps> = ({ userName, setAuthData, logOut }) => {
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    if (token) {
      try {
        if (token.split('.').length !== 3) {
          throw new Error('Invalid token format');
        }
        const decodedToken = jwtDecode<MyToken>(token);
        console.log('Decoded token:', decodedToken);
        setAuthData(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authToken');
      }
    }
  }, [setAuthData]);

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
          <Grid item xs={6} md={7}>
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
            {userName ? (
              <>
                <Typography variant="h6">{userName}</Typography>
              </>
            ) : (
              <>
                <Typography variant="h6">
                  <Link
                    to="/login"
                    style={{
                      cursor: 'pointer',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography
              variant="h6"
              onClick={logOut}
              style={{
                cursor: 'pointer',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Logout
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ auth: { authData } }: RootState) => ({
  userName: authData?.name || null, // Access name directly from authData
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setAuthData: (token: MyToken) => dispatch(setAuthData(token)),
  logOut: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

//export default Header;
