import React, { useEffect, useState } from 'react';
import { Grid, Button } from "@mui/material";
import { useParams ,useNavigate,Link} from 'react-router-dom';
import { viewPharmacist, pharamacistApproval, pharamacistRejection } from '../services/api';
import AdminHeader from "../components/AdminHeader"; // Import the AdminHeader component
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const PharmacistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pharmacist, setPharma] = useState(null);
  const [error, setError] = useState(null);
  const [acceptClicked, setAcceptClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect(() => {
    viewPharmacist(id)
      .then((response) => {
        console.log (response)
        setPharma(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleAccept = async () => {
    try {
      await pharamacistApproval(id);
      setAcceptClicked(true);
      handleSnackbarOpen('Pharmacist Accepted!');
      setTimeout(() => {
        setSnackbarOpen(false);

        // Navigate to the desired page
        navigate("/viewPharmacists");
      }, 3000);
    } catch (error) {
      console.error('Error accepting pharmacist:', error.message);
    }
  };
  
  const handleReject = async () => {
    try {
      await pharamacistRejection(id);
      setRejectClicked(true);
      handleSnackbarOpen('Pharmacist Rejected!');
      setTimeout(() => {
        setSnackbarOpen(false);

        // Navigate to the desired page
        navigate("/requestedPharma");
      }, 3000);
    } catch (error) {
      console.error('Error rejecting pharmacist:', error.message);
    }
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }  
  
  return (
    <Grid container>
                 <AdminHeader />

                 <Grid item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "20rem", paddingRight: "2rem" }}>
        <mainListItems pharmaDetails={pharmacist} />
        <div>
          <h1>Pharmacists Details</h1>
          {error && <div>Error fetching order details: {error}</div>}
          {!pharmacist && <div>Loading...</div>}
          {pharmacist && (
            <div>
              {/* Pharmacist details display */}
              <p>First Name: {pharmacist.firstName}</p>
              <p>Last Name: {pharmacist.lastName}</p>
              <p>Date of Birth: {pharmacist.dob}</p>
              <p>Education: {pharmacist.education}</p>
              <p>Gender: {pharmacist.gender}</p>
              <p>Affiliation: {pharmacist.affiliation}</p>

              {/* Display documents */}
              <h2>Documents</h2>
            <ul>
              {pharmacist.documents.map((document, index) => (
                <li key={index}>
                  <p>File: <Link to={`http://localhost:8000/backend/uploads/${document.name}`} target="_blank">{document.name}</Link></p>
                </li>
              ))}
            </ul>

              {/* Accept and Reject Buttons */}
              {!acceptClicked && !rejectClicked && (
                <div>
                  <Button variant="contained" color="primary" onClick={handleAccept} sx={{ marginRight: "20px" }}>
                    Accept
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleReject}>
                    Reject
                  </Button>

                </div>
              )}

            </div>
          )}
        </div>
        <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleSnackbarClose}
    severity="success"
  >
    {snackbarMessage}
  </MuiAlert>
</Snackbar>
      </Grid>
    </Grid>
  );
};

export default PharmacistDetail;