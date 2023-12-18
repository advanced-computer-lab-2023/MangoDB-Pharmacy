import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { getPharmacistbyId,deletePharma } from "../services/api";
import { Typography, Paper, Grid,Button ,Snackbar} from "@mui/material";
import { AdminListItems } from '../components/ListItemsAdmin';
import MuiAlert from "@mui/material/Alert";
import AdminHeader from "../components/AdminHeader"; // Import the AdminHeader component

const PharmacistDetails = () => {
  const { id } = useParams();
  const [pharmacist, setPharmacist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  useEffect(() => {
    const fetchPharmacistDetails = async () => {
      try {
        const response = await getPharmacistbyId(id);
        setPharmacist(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching pharmacist details");
      }
    };

    fetchPharmacistDetails();
  }, []);
  const handleRemovePharma = async () => {
    try {
      const response = await deletePharma(id);

      // Check if the response status is 200
      if (response.status === 200) {
        // Open the Snackbar on success
        setSnackbarOpen(true);

        // Automatically close the Snackbar after 3 seconds
        setTimeout(() => {
          setSnackbarOpen(false);

          // Navigate to the desired page
          navigate("/removeUsers");
        }, 3000);
      }
    } catch (error) {
      console.error("Error removing pharmacist:", error);
      // Add logic to handle the error if needed
    }
  };

  return (
    <Grid container>
      {/* Admin Header */}
      <AdminHeader />

      {/* Main content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "20rem", paddingRight: "2rem" }}>

        <div>
          <Typography variant="h4" gutterBottom>
            Pharmacist Details
          </Typography>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {pharmacist && (
            <Paper
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="h6">
                {pharmacist.firstname} {pharmacist.lastname}
                <Typography variant="h6">
                  Name: {pharmacist.firstName} {pharmacist.lastName}
                </Typography>
              </Typography>
              <Typography>Email: {pharmacist.email}</Typography>
              <Typography>Affiliation: {pharmacist.affiliation}</Typography>
              <Typography>Gender: {pharmacist.gender}</Typography>
              <Typography>Rate: {pharmacist.rate}</Typography>
              <Typography>Education: {pharmacist.education}</Typography>
              <Typography>Status: {pharmacist.status}</Typography>
              <Typography>Username: {pharmacist.username}</Typography>
              <Typography>DOB: {pharmacist.dob}</Typography>
              <Typography>
                Account Status: {pharmacist.accountStatus}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{
                  position: "absolute",
                  marginTop: "13rem",
                  left: "60rem"                }}
                onClick={handleRemovePharma}
              >
                REMOVE PHARMACIST
              </Button>
              <Snackbar
                open={snackbarOpen}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="success">
                  Pharmacist removed successfully !
                </Alert>
              </Snackbar>
            </Paper>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default PharmacistDetails;
