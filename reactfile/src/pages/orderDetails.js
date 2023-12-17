import React, { useEffect, useState } from 'react';
// import {Typography, Paper } from "@mui/material";
import { Grid ,Button, Typography}  from "@mui/material";
import { useParams } from 'react-router-dom';
import { viewOrderDetails,cancelOrder } from '../services/api';
import  Patientheader  from '../components/PatientHeader';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  useEffect(() => {
      viewOrderDetails(id)
        .then((response) => {
          setOrderDetails(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
   
  }, [id]);

  console.log(orderDetails);

  const handleCancelOrder = () => {

    const token = localStorage.getItem("token");
    cancelOrder(id)
      .then((response) => {
        setIsCancelClicked(true); // Set the flag to indicate that the cancel button has been clicked

        alert(response.data.message); // Display the response message to the user
        // You can also update the order status in the state or fetch the updated order details
      })
      .catch((err) => {
        alert('Error cancelling order');
      });
  };


  return (
   <Patientheader>
    <Grid container>
 
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: '20rem' }}>
        <mainListItems orderDetails={orderDetails} />
        <div>
          <Typography variant = "h4" > Order Details</Typography>

          {error && <div>Error fetching order details: {error}</div>}
          {!orderDetails && <div>Loading...</div>}
          {orderDetails && (
            <div>
              <p>Status: {orderDetails.status}</p>
              <p>Date of Order: {orderDetails.dateOfOrder}</p>
              <p>Date of Delivery: {orderDetails.dateOfDelivery}</p>
              <p>Delivery Address: {orderDetails.deliveryAddress}</p>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Total Price: {orderDetails.totalPrice}</p>
              {orderDetails.orderdetails && orderDetails.orderdetails.map((item, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                  {item.picture && (
                    <img src={`http://localhost:8000/${item.picture}`} alt={item.medicineName} style={{ maxWidth: '100px' }} />
                  )}
                  {item.medicineName && (
                    <p>Medicine Name: {item.medicineName}</p>
                  )}
                  {item.quantity && (
                    <p>Quantity: {item.quantity}</p>
                  )}
                </div>
              ))}
            </div>
            
          )}
           <Button
        onClick={handleCancelOrder}
        disabled={isCancelClicked}
        variant={isCancelClicked ? 'contained' : 'outlined'}
      >
        {isCancelClicked ? 'Canceled' : 'Cancel'}
      </Button>

        </div>
       

      </Grid>

    </Grid>
    </Patientheader> 
  );
};
export default OrderDetails;
