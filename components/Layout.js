import React, { useContext,useState } from 'react';
import Head from 'next/head'
import {  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Badge,
  Button,
  Menu,
  MenuItem} from '@mui/material';
  import { useRouter } from 'next/router';
  import Cookies from 'js-cookie';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import classes from '../utils/classes';
import { Store } from '../utils/Store';

export default function Layout({title,description,children}) {
  const router = useRouter();
  const {state,dispatch}=useContext(Store)
  const {cart,userInfo}=state
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
      const [anchorEl, setAnchorEl] = useState(null);
      const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
      };
      const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect) {
          router.push(redirect);
        }
      };
      const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
    
        router.push('/');
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
            {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    sx={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>

                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
            <NextLink href={'/login'} passHref>
                <Link>
                <PersonOutlinedIcon></PersonOutlinedIcon>
                </Link>
            </NextLink>
             )}
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