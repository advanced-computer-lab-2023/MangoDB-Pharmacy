import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMeds } from "../services/api";
import AdminHeader from '../components/AdminHeader';


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
    <AdminHeader>
    <Grid container>
     

      {/* Main Content */}
      <Grid item xs={12} sm={9} style={{  paddingLeft: '25rem'}}>
        {error ? (
          <div>Error fetching medicine details: {error}</div>
        ) : (
          <Paper
          style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '2rem',
            width: '100%',
            paddingTop: "3rem",
            marginTop: "3rem"

          }}
          >
            {medicine ? (
              <div>
                <Typography variant="h4" gutterBottom style={{paddingLeft : '1.2rem'}}>
                  {medicine.name}
                </Typography>
                <img
                  src={`http://localhost:8000/${medicine.picture}`}
                  alt={medicine.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    marginBottom: '1rem',
                    paddingLeft : '1.2rem'

                  }}
                />
                <Typography variant="body1" gutterBottom style={{paddingLeft : '1.6rem'}}>
                      Description: {medicine.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom style={{paddingLeft : '3rem'}}>
                      Details: {medicine.details}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{paddingLeft : '3rem'}}>
                      quantity: {medicine.quantity}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom style={{paddingLeft : '3rem'}}>
                      Price: {medicine.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{paddingLeft : '3rem'}}>
                      sales: {medicine.sales}
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{paddingLeft : '3.5rem'}}>
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
    </AdminHeader>
  );
};

export default MedicineAdmin;
