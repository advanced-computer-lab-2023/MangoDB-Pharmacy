// Medicine.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientHeader   from '../components/PatientHeader';
import { getMeds, addMedicineToCart, getAlternativeMedicines } from '../services/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [alternativeQuantities, setAlternativeQuantities] = useState({});
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] = useState(false);
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const [isPrescriptionRequiredSnackOpen, setIsPrescriptionRequiredSnackOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSoldOut, setSoldOut] = useState(false);




  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
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
          console.log('Item added to cart:', response.data);
          setIsSnackbarOpen(true);
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);
          const errorMessage = error.response?.data?.error || 'An error occurred';

          if (
            errorMessage.includes('This medicine requires a prescription')
          
          ) {
            setIsPrescriptionRequiredSnackOpen(true); // Open the prescription required snacker
          } 
          else if ( errorMessage.includes('Quantity not available') )
          {
            setSoldOut(true); // Open the prescription required snacker
              //alert(errorMessage);
          }
        });
    }
  };


  const handleViewAlternatives = () => {
    if (medicine) {
      console.log('Medicine data:', medicine);
      getAlternativeMedicines(medicine.name)
        .then((response) => {
          console.log('Received response:', response);
          setAlternativeMedicines(response.alternatives);
          setAlternativeQuantities(
            response.alternatives.reduce((quantities, alternative) => {
              quantities[alternative._id] = 1;
              return quantities;
            }, {})
          );
          setShowAlternatives(true);
        })
        .catch((error) => {
          console.error('Error fetching alternative medicines:', error);
        });
    }
  };

  const handleAddAlternativeToCart = (alternativeMedicine) => {
    addMedicineToCart(alternativeMedicine.name, alternativeQuantities[alternativeMedicine._id])
      .then((response) => {
        setIsAddedToCart(true);
        console.log('Alternative medicine added to cart:', response.data);
      })
      .catch((error) => {
        console.error('Error adding alternative medicine to cart:', error);
        const errorMessage = error.response?.data?.error || 'An error occurred';

        if (
          errorMessage.includes('Quantity not available') ||
          errorMessage.includes('This medicine requires a prescription')
        ) {
          setIsPrescriptionRequiredSnackOpen(true); // Open the prescription required snacker
        } else {
          //alert(errorMessage);
        }
      });
  };

  const handleIncreaseAlternativeQuantity = (alternativeId) => {
    setAlternativeQuantities((prevQuantities) => ({
      ...prevQuantities,
      [alternativeId]: prevQuantities[alternativeId] + 1,
    }));
  };

  const handleDecreaseAlternativeQuantity = (alternativeId) => {
    if (alternativeQuantities[alternativeId] > 1) {
      setAlternativeQuantities((prevQuantities) => ({
        ...prevQuantities,
        [alternativeId]: prevQuantities[alternativeId] - 1,
      }));
    }
  };

  return (
    <PatientHeader>
    <Grid container>
   

      {/* Main Content */}
      <Grid item xs={12} sm={9} style={{  paddingLeft: '25rem'}}>
        {error ? (
          <div>Error fetching medicine details: {error}</div>
        ) : (
          <Paper
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '2rem'
            }}
          >
            {medicine ? (
              <div>
                <Typography variant="h4" gutterBottom style={{paddingLeft : '6rem'}}>
                  {medicine.name}
                </Typography>
                <img
                  src={`http://localhost:8000/${medicine.picture}`}
                  alt={medicine.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    marginBottom: '1rem',
                    paddingLeft : '6rem'

                  }}
                />
                <Typography variant="body1" gutterBottom style={{paddingLeft : '6.5rem'}}>
                  Description: {medicine.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{paddingLeft : '8rem'}}>
                  Details: {medicine.details}
                </Typography>
                <Typography variant="subtitle1" gutterBottom style={{paddingLeft : '8rem'}}>
                  Price: {medicine.price}
                </Typography>
                <Typography variant="body2" gutterBottom style={{paddingLeft : '8rem'}}>
                  Uses: {medicine.use}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' ,paddingLeft : '6rem'}}>
                  <IconButton onClick={handleDecreaseQuantity}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" style={{ margin: '0 1rem'  }}>
                    {quantity}
                  </Typography>
                  <IconButton onClick={handleIncreaseQuantity}>
                    <AddIcon />
                  </IconButton>
                </div>
                <Button
                  variant="contained"
                  color={isAddedToCart ? 'secondary' : 'primary'}
                  onClick={handleAddToCart}
                  style={{marginRight : "40px"}}
                >
                  {isAddedToCart ? 'Add to Cart' : 'Add to Cart'}
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewAlternatives}
                  style={{ marginTop: '1rem' }}
  
                  
                >
                  View Alternatives
                </Button>

                {showAlternatives && (
                  <div style={{ marginTop: '1rem' }}>
                    <Typography variant="h5" gutterBottom>
                      Alternative Medicines:
                    </Typography>
                    {alternativeMedicines.length > 0 ? (
                      <ul>
                        {alternativeMedicines.map((alternative) => (
                          <li key={alternative._id}>
                            <div>
                              <Typography variant="h6" gutterBottom style={{paddingLeft : '4rem'}}>
                                {alternative.name}
                              </Typography>
                              <img
                                src={`http://localhost:8000/${alternative.picture}`}
                                alt={alternative.name}
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '150px',
                                  marginBottom: '0.5rem',
                                  paddingLeft : '3rem'
                                }}
                              />
                              <Typography variant="body1" gutterBottom style={{paddingLeft : '3rem'}}>
                                Description: {alternative.description}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom style={{paddingLeft : '4rem'}}>
                                Details: {alternative.details}
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom style={{paddingLeft : '4rem'}}>
                                Price: {alternative.price}
                              </Typography>
                              <Typography variant="body2" gutterBottom style={{paddingLeft : '4rem'}}>
                                Uses: {alternative.use}
                              </Typography>
                              <div style={{ display: 'flex', alignItems: 'center',paddingLeft : '3rem'}}>
                                <IconButton
                                  onClick={() => handleDecreaseAlternativeQuantity(alternative._id)}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <Typography variant="body2" style={{ margin: '0 1rem' }}>
                                  {alternativeQuantities[alternative._id]}
                                </Typography>
                                <IconButton
                                  onClick={() => handleIncreaseAlternativeQuantity(alternative._id)}
                                >
                                  <AddIcon />
                                </IconButton>
                              </div>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddAlternativeToCart(alternative)}
                                style={{ marginTop: '0.5rem',marginLeft: "3rem" }}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography>No alternative medicines found.</Typography>
                    )}
                  </div>
                )}

                {isAddedToCart && (
                <Snackbar
                  open={isAddedToCart}
                  autoHideDuration={3000} // Adjust the duration as needed
                  onClose={() => setIsAddedToCart(false)}
                >
                  <Alert onClose={() => setIsAddedToCart(false)} severity="success">
                    Product added to cart successfully!
                  </Alert>
                </Snackbar>
              )}

{isPrescriptionRequiredSnackOpen && (
            <Snackbar
              open={isPrescriptionRequiredSnackOpen}
              autoHideDuration={3000} // Adjust the duration as needed
              onClose={() => setIsPrescriptionRequiredSnackOpen(false)}
            >
              <Alert onClose={() => setIsPrescriptionRequiredSnackOpen(false)} severity="warning">
                This medicine requires a prescription. Please consult your doctor.
              </Alert>
            </Snackbar>
          )}
          {isSoldOut && (
            <Snackbar
              open={isSoldOut}
              autoHideDuration={3000} // Adjust the duration as needed
              onClose={() => setSoldOut(false)}
            >
              <Alert onClose={() => setSoldOut(false)} severity="warning">
                Sold Out! View alternatives.
              </Alert>
            </Snackbar>
          )}



              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Paper>
        )}
      </Grid>
    </Grid>
    </PatientHeader>
  );
};

export default Medicine;
