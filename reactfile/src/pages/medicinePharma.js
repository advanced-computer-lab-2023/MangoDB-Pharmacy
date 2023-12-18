// pages/MedicinePharma.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pharmacistListItems } from '../components/ListItemsPharma';
import { getMeds, editMedPrice } from "../services/api";
import PharmacistHeader from "../components/PharmacistHeader";
import { Grid, Typography, Paper, Button, TextField } from '@mui/material';

const MedicinePharma = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

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

  useEffect(() => {
    // Update edited details and price when medicine details change
    if (medicine) {
      setEditedDetails(medicine.details);
      setEditedPrice(medicine.price);
    }
  }, [medicine]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = async () => {
    try {
      await editMedPrice(id, editedDetails, editedPrice);
      // Set medicine state based on the updated details
      const response = await getMeds(id);
      setMedicine(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error editing medicine:', error.message);
    }
  };

  const handleDetailsChange = (e) => {
    setEditedDetails(e.target.value);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  return (
    <PharmacistHeader>

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
        {/* {pharmacistListItems} */}
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
              marginTop : "2rem"
            }}
          >
            {medicine ? (
              <div>
                <Typography variant="h4" gutterBottom>
                  {medicine.name}
                </Typography>
                <img
                  src={`http://localhost:8000/${medicine.picture}`}
                  alt={medicine.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    marginBottom: '1rem',
                  }}
                />
                {editMode ? (
                  <>
                    <TextField
                      label="Details"
                      value={editedDetails}
                      onChange={handleDetailsChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Price"
                      value={editedPrice}
                      onChange={handlePriceChange}
                      fullWidth
                      margin="normal"
                    />
                    <Button onClick={handleCancelEdit} variant="outlined" color="secondary" style={{ marginTop: '1rem' }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary" style={{ marginTop: '1rem', marginLeft: "1rem" }}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" gutterBottom>
                      Description: {medicine.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Details: {medicine.details}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      quantity: {medicine.quantity}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Price: {medicine.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      sales: {medicine.sales}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Use: {medicine.use}
                    </Typography>
                    <Button onClick={handleEditClick} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                      Edit Medicine
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Paper>
        )}
      </Grid>
    </Grid>
    </PharmacistHeader>

  );
};

export default MedicinePharma;
