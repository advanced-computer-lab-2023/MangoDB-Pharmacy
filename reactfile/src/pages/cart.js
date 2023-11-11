// src/pages/ViewCartItems.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { mainListItems } from '../components/ListItems';
import { viewCartItems, changeCartItemAmount, removeCartItems } from '../services/api';
import { useParams } from 'react-router-dom';

const ViewCartItems = () => {
  const { id } = useParams();

  const [cartItems, setCartItems] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [quantityByMedicine, setQuantityByMedicine] = useState({}); // Separate state for quantity by medicine

  const handleQuantityChange = (medicineName, change) => {
    const currentQuantity = quantityByMedicine[medicineName] || 1;
    const newQuantity = currentQuantity + change;
    setQuantityByMedicine((prev) => ({ ...prev, [medicineName]: newQuantity < 1 ? 1 : newQuantity }));
  };

  const handleUpdateQuantity = async (medicineName) => {
    try {
      const updatedQuantity = quantityByMedicine[medicineName] || 1;
      await changeCartItemAmount(id, medicineName, updatedQuantity);
      // Fetch updated cart items after changing quantity
      const response = await viewCartItems(id);
      setCartItems(response.data);
      setQuantityByMedicine((prev) => ({ ...prev, [medicineName]: 1 })); // Set quantity back to 1
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveItem = async (medicineName) => {
    try {
      await removeCartItems(id, medicineName);
      // Fetch updated cart items after removing item
      const response = await viewCartItems(id);
      setCartItems(response.data);
      setQuantityByMedicine((prev) => ({ ...prev, [medicineName]: 1 })); // Set quantity back to 1
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    viewCartItems(id)
      .then((response) => {
        setCartItems(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [id, quantityByMedicine]);

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {mainListItems}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Medicines
        </Typography>

        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {cartItems && (
          <div>
            {cartItems.map((item) => (
              <Paper key={item._id} style={{ padding: "1rem", marginBottom: "1rem" }}>
                <Typography variant="h6">{item.name}</Typography>
                {/* Display the image */}
                {item.picture && <img src={`http://localhost:4000/${item.picture}`} alt={item.name} style={{ width: '100px', height: '100px' }} />}
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography variant="subtitle1">Price: {item.price}</Typography>
                {/* Plus and Minus buttons for selecting quantity */}
                <Button variant="outlined" onClick={() => handleQuantityChange(item.name, -1)}>-</Button>
                <span style={{ margin: "0 0.5rem" }}>{quantityByMedicine[item.name] || 1}</span>
                <Button variant="outlined" onClick={() => handleQuantityChange(item.name, 1)}>+</Button>
                {/* Space between "+" button and "Update Quantity" button */}
                &nbsp;
                {/* Button to update quantity */}
                <Button
                  variant="contained"
                  onClick={() => handleUpdateQuantity(item.name)}
                >
                  Update Quantity
                </Button>
                {/* Space between "Update Quantity" button and "Remove Item" button */}
                &nbsp;
                {/* Button to remove item */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveItem(item.name)}
                >
                  Remove Item
                </Button>
              </Paper>
            ))}
          </div>
        )}

        {/* Checkout button at the bottom */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
          style={{ marginTop: '1rem' }}
        >
          Checkout
        </Button>
      </Grid>
    </Grid>
  );
};

export default ViewCartItems;
