import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AdminListItems } from '../components/ListItemsAdmin';

import { changePassword } from '../services/api';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
} from '@mui/material';

export default function ChangePasswordAdmin() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      console.log(response.data.message);
      handleClose(); // Close the dialog after a successful submission
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

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Reset Password | Admin</title>
        </Helmet>
      </HelmetProvider>

      <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {AdminListItems}
      </Grid>
        {/* Main Content */}
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          lg={10}
          xl={10}
          style={{ margin: "auto" }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginTop: "1rem" }}>
            Change Password
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle> 
              <Typography variant = "h5"> Change Password 
                </Typography></DialogTitle>
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
    </>
  );
}
