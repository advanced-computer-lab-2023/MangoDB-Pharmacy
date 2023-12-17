import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminListItems } from '../components/ListItemsAdmin';
import { getMeds } from "../services/api";

import {
  Grid,
  Typography,
  Paper,
} from '@mui/material';

const MedicineAdmin = () => {
  const { id } = useParams(); // Get the medicine ID from the URL
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState(null);

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
        {AdminListItems}
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
                  src={`http://localhost:8000/${medicine.picture}`}
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

export default MedicineAdmin;
