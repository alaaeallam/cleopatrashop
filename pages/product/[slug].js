
import { useRouter } from 'next/router';
import React from 'react';
import NextLink from 'next/link'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import data from '../../utils/data';
import Layout from '../../components/Layout'
import { Box,Button,Card,Grid,Link, List, ListItem, Typography } from '@mui/material';
import classes from '../../utils/classes';
import Image from 'next/image';
export default function ProductScreen() {
const router = useRouter()
const {slug}=router.query;
const product=data.products.find((a)=>a.slug===slug)
if(!product){
    return <Box>Product not found</Box>
}
  return (
     <Layout title={product.name} description={product.description}>
         <Box sx={classes.section}>
             <NextLink href={'/'} passHref>
                 <Link>
                 <ArrowBackOutlinedIcon fontSize='large' color='primary'>
                 </ArrowBackOutlinedIcon>
                 </Link>
             </NextLink>
         </Box>
         <Grid container spacing={1}>
             <Grid item md={6} xs={12}>
             <Image
            src={product.image}
            alt={product.description}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
             </Grid>
             <Grid item md={3} xs={12}>
                 <List>
                     <ListItem>
                         <Typography component='h1' variant='h1'>{product.name}</Typography>
                     </ListItem>
                     <ListItem>
                         <Typography>Category: {product.category}</Typography>
                         
                     </ListItem>
                     <ListItem><Typography>Brand: {product.brand}</Typography></ListItem>
                     <ListItem><Typography>Rating: {product.numReviews} reviews</Typography></ListItem>
                     <ListItem><Typography>Description: {product.description}</Typography></ListItem>
                 </List>
             </Grid>
             <Grid item md={3} xs={12}>
                 <Card >
                     <List>
                         <ListItem>
                             <Grid container>
                                 <Grid item xs={6}><Typography>Price </Typography></Grid>
                                 <Grid item xs={6}><Typography>{product.price}LE</Typography></Grid>
                             </Grid>
                         </ListItem>
                         <ListItem>
                             <Grid container>
                                 <Grid item xs={6}><Typography>Status </Typography></Grid>
                                 <Grid item xs={6}><Typography>{product.countInStock>0?'In stock':'Out of stock'}</Typography></Grid>
                             </Grid>
                         </ListItem>
                         <ListItem>
                             <Button fullWidth variant='contained' color='primary'>Add to Cart</Button>
                         </ListItem>
                     </List>
                 </Card>
             </Grid>
         </Grid>
     </Layout>

  )
}
