import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper } from "@mui/material";

import { useParams } from 'react-router-dom';
import { viewOrderDetails,cancelOrder } from '../services/api';
import { mainListItems } from '../components/ListItems';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

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
    // Assuming you have an API function to cancel an order
    cancelOrder(id)
      .then((response) => {
        alert(response.data.message); // Display the response message to the user
        // You can also update the order status in the state or fetch the updated order details
      })
      .catch((err) => {
        alert('Error cancelling order');
      });
  };


  return (
    
    <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {mainListItems}
      </Grid>
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ padding: '1rem' }}>
        <mainListItems orderDetails={orderDetails} />
        <div>
          <h1>Order Details</h1>
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
                    <img src={`http://localhost:4000/${item.picture}`} alt={item.medicineName} style={{ maxWidth: '100px' }} />
                  )}
                  {item.medicineName && (
                    <p>Medicine Name: {item.medicineName}</p>
                  )}
                  {item.quantity && (
                    <p>Quantity: {item.quantity}</p>
                  )}
                </div>
              ))}
              <button onClick={handleCancelOrder}>Cancel</button>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
export default OrderDetails;
