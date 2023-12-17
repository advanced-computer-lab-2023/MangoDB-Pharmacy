import { Grid, Typography, Paper ,Snackbar} from "@mui/material";
import { useEffect, useState } from "react";
import { viewAllOrders } from "../services/api";
// import List from '@mui/material/List';
import { mainListItems } from '../components/ListItems';
import { Link } from 'react-router-dom';
import PatienttHeader from "../components/PatientHeader";
import MuiAlert from "@mui/material/Alert";

const Orders = () => {
//   const id = '653853e1af653f0d70d44763';
  const [orders, setOrders] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [showNoOrdersSnackbar, setShowNoOrdersSnackbar] = useState(false);

  useEffect(() => {
    viewAllOrders()
      .then((response) => {
        if (response.data.length === 0) {
          // No orders found, show Snackbar
          setShowNoOrdersSnackbar(true);
        } else {
          setOrders(response.data);
        }
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  const handleSnackbarClose = () => {
    setShowNoOrdersSnackbar(false);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
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
                    <Typography variant="subtitle1">Date Of Order: {formatDate(order.dateOfOrder)}</Typography>
                  </div>
                </Paper>
              </Link>
            ))}
          </div>
        )}
         <Snackbar
            open={showNoOrdersSnackbar}
            autoHideDuration={3000} // Adjust the duration as needed
            onClose={handleSnackbarClose}
          >
            <MuiAlert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
              No orders to show for the patient.
            </MuiAlert>
          </Snackbar>
      </Grid>
    </Grid>
    </PatienttHeader>
  );
};

export default Orders;