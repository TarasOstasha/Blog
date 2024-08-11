import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { connect } from "react-redux";
import { RootState } from '../../store';
import { HeaderProps, UserData } from '../../interfaces';




const Header: React.FC<HeaderProps> = ({ userData }) => {
  if (!userData) return null;
  const { name } = userData;
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
          <Grid item xs={12} md={1}>
            <Typography variant="h6">
              { name }
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = ({ auth: { authData } }: RootState) => ({ userData: authData });



export default connect (mapStateToProps, null) (Header)