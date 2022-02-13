import React, { useContext } from 'react';
import Head from 'next/head'
import { AppBar,Container,Link,Toolbar, Typography,Badge} from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import classes from '../utils/classes';
import { Store } from '../utils/Store';

export default function Layout({title,description,children}) {
  const {state}=useContext(Store)
  const {cart}=state
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
          mode:'light',
          primary: {
            main: '#f0c000',
          },
          secondary: {
            main: '#208080',
          },
        },
      });

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
        <div >
            <NextLink href={'/cart'} passHref>
                <Link >
                {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                    <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                    </Badge>
                  ) : (
                    <ShoppingCartOutlinedIcon ></ShoppingCartOutlinedIcon>
                  )}
                
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