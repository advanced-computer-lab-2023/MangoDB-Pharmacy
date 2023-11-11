import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { mainListItems } from '../components/ListItems';
import { getMeds } from "../services/api";
import { addMedicineToCart } from "../services/api";

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Grid,
  Typography,
  Paper,
  Button,
} from '@mui/material';

const Medicine = () => {
  const { id } = useParams(); // Get the medicine ID from the URL
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    getMeds(id)
      .then((response) => {
        setMedicine(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart = () => {
    if (!isAddedToCart) {
      addMedicineToCart(medicine.name, quantity)
        .then((response) => {
          setIsAddedToCart(true);
  
          // Handle the response if needed
          console.log('Item added to cart:', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error adding item to cart:', error);
  
          // Check if the error response contains a quantity not available message
          if (error.response && error.response.data && error.response.data.error.includes('Quantity not available')) {
            // Display the error message to the user
            alert(error.response.data.error);
          }
        });
    } 
  };
  
  
  
  
  

  return (
    <Grid container>
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
          paddingTop: '2rem',
        }}
      >
        {mainListItems}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9}>
        {error ? (
          <div>Error fetching medicine details: {error}</div>
        ) : (
          <Paper
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {medicine ? (
              <div>
                <Typography variant="h4" gutterBottom>
                  {medicine.name}
                </Typography>
                <img
                  src={`http://localhost:4000/${medicine.picture}`}
                  alt={medicine.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    marginBottom: '1rem',
                  }}
                />
                <Typography variant="body1" gutterBottom>
                  Description: {medicine.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Details: {medicine.details}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Price: {medicine.price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Uses: {medicine.use}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handleDecreaseQuantity}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" style={{ margin: '0 1rem' }}>
                    {quantity}
                  </Typography>
                  <IconButton onClick={handleIncreaseQuantity}>
                    <AddIcon />
                  </IconButton>
                </div>
                <Button
                  variant="contained"
                  color={isAddedToCart ? "secondary" : "primary"}
                  onClick={handleAddToCart}
                >
                  {isAddedToCart ? "Add to Cart" : "Add to Cart"}
                </Button>

                {isAddedToCart && (
                  <Typography style={{ marginTop: '1rem', color: 'green' }}>
                    Product added to cart successfully!
                  </Typography>
                )}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Medicine;