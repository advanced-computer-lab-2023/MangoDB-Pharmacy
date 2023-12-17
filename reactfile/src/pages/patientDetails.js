import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatient, deletePatient } from "../services/api";
import { Typography, Paper, Grid, Button, Snackbar } from "@mui/material";
import { AdminListItems } from '../components/ListItemsAdmin';
import MuiAlert from "@mui/material/Alert";
import AdminHeader from "../components/AdminHeader"; // Import the AdminHeader component

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await getPatient(id);
        setPatient(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching pharmacist details");
      }
    };

    fetchPatientDetails();
  }, [id]);

  const handleRemovePatient = async () => {
    try {
      const response = await deletePatient(id);

      // Check if the response status is 200
      if (response.status === 200) {
        // Open the Snackbar on success
        setSnackbarOpen(true);

        // Automatically close the Snackbar after 3 seconds
        setTimeout(() => {
          setSnackbarOpen(false);

          // Navigate to the desired page
          navigate("/viewPatients");
        }, 3000);
      }
    } catch (error) {
      console.error("Error removing patient:", error);
      // Add logic to handle the error if needed
    }
  };

  return (
    <Grid container>
           <AdminHeader />

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "20rem", paddingRight: "2rem" }}>
        <div>
          <Typography variant="h4" gutterBottom>
            Patient Details
          </Typography>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {patient && (
            <Paper
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="h5">
                {patient.firstname} {patient.lastname}
                <Typography variant="h5">
                  Name: {patient.firstName} {patient.lastName}
                </Typography>
              </Typography>
              <Typography>Email: {patient.email}</Typography>
              <Typography>Gender: {patient.gender}</Typography>
              <Typography>Mobile: {patient.mobile}</Typography>
              <Typography>
                Addresses: {patient.addresses && patient.addresses.join(", ")}
              </Typography>
              <Typography>Username: {patient.username}</Typography>
              <Typography>DOB: {patient.dob}</Typography>
              <Typography>Account Status: {patient.accountStatus}</Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ position: "absolute", marginTop: "10rem", left: "60rem" }}
                onClick={handleRemovePatient}
              >
                REMOVE PATIENT
              </Button>

              {/* Snackbar for success message */}
              <Snackbar
              open={snackbarOpen}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert  severity="success">
Patient removed successfully !
              </Alert>
            </Snackbar>
            </Paper>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default PatientDetails;
