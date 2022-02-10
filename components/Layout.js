import { AppBar ,Container,Toolbar, Typography} from '@mui/material'
import Head from 'next/head'
import React from 'react'
import classes from '../utils/classes'
function Layout({children}) {
  return (
      <div>
    <Head>
        <title>Cleopatra Shop</title>
    </Head>
    <AppBar position='static' sx={classes.appbar}>
        <Toolbar  sx={classes.toolbar}>
            <Typography>Cleopatra Shop</Typography>
        </Toolbar>
    </AppBar>
    <Container sx={classes.main}>{children}</Container>
    <footer><Typography sx={classes.footer}>All rights reserved Cleopatra Shop</Typography></footer>
    </div>
  )
}

export default Layout