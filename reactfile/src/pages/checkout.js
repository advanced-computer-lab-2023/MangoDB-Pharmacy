import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { addressesByPatientId, addAddress, viewCartItems,placeOrder,payment } from '../services/api';
import { mainListItems } from '../components/ListItems';
import { useParams } from 'react-router-dom';

const Checkout = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); 

  const [showAddAddress, setShowAddAddress] = useState(false);

  const fetchData = async () => {
    try {

      const fetchedCartItems = await viewCartItems();
      setCartItems(fetchedCartItems.data);
      console.log ("FETCHED DATA" ,fetchedCartItems.data )
      const fetchedAddresses = await addressesByPatientId();
      setAddresses(fetchedAddresses);

      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddAddress = async () => {
    try {
     
      if (!newAddress.trim()) {
        return;
      }

      await addAddress(newAddress);
      setNewAddress('');
      fetchData();
      setShowAddAddress(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddressSelect = (event) => {
    setSelectedAddress(event.target.value);
  };
  const handlePaymentMethodSelect = (event) => {
    setPaymentMethod(event.target.value);
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  const handlePlaceOrder = async () => {
    setTimeout( async () => {
      try {
        console.log (cartItems)
console.log(paymentMethod,selectedAddress);
const token = localStorage.getItem("token");
console.log("Token:", token);
        if (paymentMethod === 'visa-mastercard') {
          const items = cartItems.map(item => ({
            itemId : item.id,
            quantity: item.quantity,
            name:item.name,
            price:item.price/item.quantity
          }));
      const total =calculateTotalPrice()
          const response = await payment(items, total);
          if (response.status === 200) {
            const { url } = response.data;
        console.log('Checkout Session:', response.data);
        window.location = url;
            const orderId = await placeOrder( selectedAddress, paymentMethod);
            console.log('Order placed successfully! Order ID:', orderId);
          } else {
            console.error('Visa/Mastercard payment failed');
          }
        } else {
          const orderId = await placeOrder(selectedAddress, paymentMethod);
          console.log('Order placed successfully! Order ID:', orderId);
          if (paymentMethod === 'cash-on-delivery' || paymentMethod === 'wallet') {
            setShowSuccessMessage(true);
          }
        }
      } catch (err) {
        if (err.message.includes('Insufficient funds in the wallet')) {
          setErrorMessage('Insufficient funds in the wallet. Please choose a different payment method or add funds to your wallet.');
          return; 

        } else {
          setErrorMessage(err.message);
        }
      }
    }, 1000);
  };



  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        lg={2}
        xl={2}
        style={{
          background: '#f0f0f0',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        {mainListItems}
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        md={10}
        lg={10}
        xl={10}
        style={{ paddingLeft: '2rem' }}
      >
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        {cartItems.length > 0 && (
          <div>
            <Typography variant="h6">Cart Items:</Typography>
            {cartItems.map((item) => (
              <Paper
                key={item._id}
                style={{ padding: '1rem', marginBottom: '1rem' }}
              >
                <Typography variant="h6">{item.name}</Typography>
                {item.picture && (
                  <img
                    src={`http://localhost:4000/${item.picture}`}
                    alt={item.name}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography variant="subtitle1">
                  Price (Per Item): ${(item.price / item.quantity).toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Total Price: ${(item.price).toFixed(2)}
                </Typography>
              </Paper>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <Typography variant="h6" style={{ marginTop: '1rem' }}>
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </Typography>
        )}

        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
          <InputLabel id="address-select-label">Choose an Address</InputLabel>
          <Select
            labelId="address-select-label"
            id="address-select"
            value={selectedAddress}
            onChange={handleAddressSelect}
          >
            <MenuItem value="" disabled>
              Choose an Address
            </MenuItem>
            {addresses.map((address, index) => (
              <MenuItem key={index} value={address}>
                {address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!showAddAddress && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAddAddress(true)}
            style={{ marginBottom: '1rem' }}
          >
            Add Address
          </Button>
        )}

        {showAddAddress && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <TextField
              label="New Address"
              variant="outlined"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              style={{ marginRight: '1rem', flex: '1' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddAddress}>
              Add Address
            </Button>
          </div>
        )}

        {selectedAddress && (
          <Typography variant="body1" style={{ marginTop: '1rem' }}>
            You chose: {selectedAddress}
          </Typography>
        )}

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
        )}
        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
          <InputLabel id="payment-method-label">Choose Payment Method</InputLabel>
          <Select
            labelId="payment-method-label"
            id="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodSelect}
          >
            <MenuItem value="" disabled>
              Choose Payment Method
            </MenuItem>
            <MenuItem value="cash-on-delivery">Cash on Delivery</MenuItem>
            <MenuItem value="wallet">Wallet</MenuItem>
            <MenuItem value="visa-mastercard">Visa/Mastercard</MenuItem>
          </Select>
        </FormControl>
        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
        )}
        {/* {errorMessage && (
          <div style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</div>
        )} */}


        <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
        style={{ marginTop: '1rem' }}
      >
        Place an Order
      </Button>
      {(showSuccessMessage && (
        <Typography variant="body1" style={{ color: 'green', marginTop: '1rem' }}>
          Order placed successfully!
        </Typography>
      ) ) || (errorMessage &&  <Typography variant="body1" style={{ color: 'green', marginTop: '1rem' }}>
 Insufficient funds in the wallet. Please choose a different payment method or add funds to your wallet.   
  </Typography>) }
      </Grid>
    </Grid>
  );
};

export default Checkout;