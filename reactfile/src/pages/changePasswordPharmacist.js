import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PharmacistHeader from '../components/PharmacistHeader';
import { changePassword3 } from '../services/api';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPharmacist() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const [redirectTimer, setRedirectTimer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await changePassword3({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      console.log(response.data.message);
      setSuccessSnackbarOpen(true);

      // Redirect after 3 seconds
      const timer = setTimeout(() => {
        navigate("/changePasswordPharmacist");
      }, 3000);

      setRedirectTimer(timer);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };

  useEffect(() => {
    return () => {
      // Clear the redirect timer when the component unmounts
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [redirectTimer]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Reset Password | Admin</title>
        </Helmet>
      </HelmetProvider>
      <PharmacistHeader>
      <Grid container>
        {/* Main Content */}
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          lg={10}
          xl={10}
          style={{ paddingLeft: "20rem" }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Change Password
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h5"> Change Password </Typography>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  type="password"
                  name="oldPassword"
                  label="Old Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={oldPassword}
                  onChange={handleChange}
                  required
                />
                <TextField
                  type="password"
                  name="newPassword"
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
      </PharmacistHeader>

      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
      >
        <MuiAlert
          onClose={handleSuccessSnackbarClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Password change successful. 
        </MuiAlert>
      </Snackbar>
    </>
  );
}
