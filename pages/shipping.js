import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';

import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

import Form from '../components/Form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const { location } = shippingAddress;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('mobile', shippingAddress.mobile);
    setValue('city', shippingAddress.city);
  }, []);

  const submitHandler = ({ fullName, address, mobile, city }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, mobile,location },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, mobile,location })
    );
    router.push('/payment');
  };
  const chooseLocationHandler = () => {
    const fullName = getValues('fullName');
    const address = getValues('address');
    const city = getValues('city');
    const mobile = getValues('mobile');

    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, mobile  },
    });
    Cookies.set('shippingAddress', 
    JSON.stringify({
      fullName,
      address,
      city,
      mobile,
      location,
    }));
    router.push('/map');
  };
  return (
    <Layout title={'Shipping Address'}>
      <CheckoutWizard activeStep={1} />
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component={'h1'} variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Fulll Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name llength is more than one'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'address llength is more than one'
                        : 'Address  is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 11,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  error={Boolean(errors.mobile)}
                  helperText={
                    errors.mobile
                      ? errors.mobile === 'minLength'
                        ? 'Mobile Number llength is more than one'
                        : 'Mobile Number is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City llength is more than one'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
             <Button
               variant="contained"
               type="button"
               onClick={chooseLocationHandler}
             >
               Choose on map
             </Button>
             <Typography>
               {location.lat && `${location.lat}, ${location.lat}`}
             </Typography>
           </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
