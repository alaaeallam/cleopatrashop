import React, { useContext } from 'react';
import Head from 'next/head'
import { AppBar,Container,Link,Toolbar, Typography,Switch } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import classes from '../utils/classes';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
export default function Layout({title,description,children}) {
  const {state,dispatch}=useContext(Store)
  const {darkMode}=state
    const theme = createTheme({
        typography: {
          h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
          h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
          body1: {
            fontWeight: 'normal',
          },
        },
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#f0c000',
          },
          secondary: {
            main: '#208080',
          },
        },
      });
      const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
      };
  return (
      <div> <Head>
      <title>{title?`${title}-Cleopatra Shop`:'Cleopatra Shop'}</title>
      {description && <meta name="description" content={description}></meta>}
  </Head>
  <ThemeProvider theme={theme}>
        <CssBaseline />
  <AppBar position='static' sx={classes.appbar}>
      <Toolbar sx={classes.toolbar}>
          <NextLink href={'/'}passHref>
              <Link> <Typography sx={classes.brand}>
         Cleopatra
         </Typography></Link>
          </NextLink>
        <div sx={classes.grow}></div>
        <div>
        <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
            <NextLink href={'/cart'} passHref>
                <Link>
                <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                </Link>
            </NextLink>
            <NextLink href={'/login'} passHref>
                <Link>
                <PersonOutlinedIcon></PersonOutlinedIcon>
                </Link>
            </NextLink>
        </div>
      </Toolbar>
  </AppBar>
  <Container sx={classes.main}>
      {children}
  </Container>
  <footer >
      <Typography sx={classes.footer}>All rights reserved Cleopatra Shop</Typography>
  </footer>
  </ThemeProvider>
  </div>
  )
}