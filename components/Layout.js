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
  Divider,
  ListItemText,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  InputBase,
  MenuItem} from '@mui/material';
  import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import classes from '../utils/classes';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Form from './Form'
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import axios from 'axios';
export default function Layout({title,description,children}) {
  const router = useRouter();
  const {state,dispatch}=useContext(Store)
  const {cart,userInfo}=state
  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
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
        Cookies.remove('shippinhAddress');
        Cookies.remove('paymentMethod');
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
      <Box display="flex" alignItems="center">
               <IconButton
                 edge="start"
                 aria-label="open drawer"
                 onClick={sidebarOpenHandler}
                 sx={classes.menuButton}
               >
                 <MenuOutlinedIcon sx={classes.navbarButton} />
               </IconButton>
               <NextLink href="/" passHref>
                 <Link>
                   <Typography sx={classes.brand}>Cleopatra</Typography>
                 </Link>
               </NextLink>
             </Box>
             <Drawer
               anchor="left"
               open={sidbarVisible}
               onClose={sidebarCloseHandler}
             >
               <List>
                 <ListItem>
                   <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between"
                   >
                     <Typography>Shopping by category</Typography>
                     <IconButton
                       aria-label="close"
                       onClick={sidebarCloseHandler}
                     >
                       <CancelOutlinedIcon />
                     </IconButton>
                   </Box>
                 </ListItem>
                 <Divider light />
                 {categories.map((category) => (
                   <NextLink
                     key={category}
                     href={`/search?category=${category}`}
                     passHref
                   >
                     <ListItem
                       button
                       component="a"
                       onClick={sidebarCloseHandler}
                     >
                       <ListItemText primary={category}></ListItemText>
                     </ListItem>
                   </NextLink>
                 ))}
               </List>
             </Drawer>
    
          <div sx={classes.searchSection}>
               <Form onSubmit={submitHandler} sx={classes.searchForm}>
                 <InputBase
                   name="query"
                   sx={classes.searchInput}
                   placeholder="Search products"
                   onChange={queryChangeHandler}
                 />
                 <IconButton
                   type="submit"
                   sx={classes.iconButton}
                   aria-label="search"
                 >
                   <SearchOutlinedIcon />
                 </IconButton>
               </Form>
             </div>
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