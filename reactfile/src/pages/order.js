import { Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { viewAllOrders } from "../services/api";
// import List from '@mui/material/List';
import { mainListItems } from '../components/ListItems';
import { Link } from 'react-router-dom';
import PatienttHeader from "../components/PatientHeader";

const Orders = () => {
//   const id = '653853e1af653f0d70d44763';
  const [orders, setOrders] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    viewAllOrders()
      .then((response) => {
        setOrders(response.data);  // Corrected variable name
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  return (
    <PatienttHeader>
    <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {mainListItems} */}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>

        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {orders && (
          <div>
            {orders.map((order) => (
              <Link to={`/orderDetails/${order._id}`} key={order._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper
                  style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  <div>
                    <Typography variant="subtitle1">Order ID: {order._id}</Typography>
                    <Typography variant="subtitle1">Order Status: {order.status}</Typography>
                    <Typography variant="subtitle1">Total Price: {order.totalPrice}</Typography>
                    <Typography variant="subtitle1">Date Of Order: {order.dateOfOrder}</Typography>
                  </div>
                </Paper>
              </Link>
            ))}
          </div>
        )}
      </Grid>
    </Grid>
    </PatienttHeader>
  );
};

export default Orders;