import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { pharmacistReg as PharmacistRegService } from "../services/api";

const PharmacistReg = () => {
  const [pharmacist, setPharmacist] = useState({
    // Pharmacist Model Fields
    rate: "",
    affiliation: "",
    education: "",
    status: "pending",

    // User Model Fields
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    userType: "pharmacist",
    accountStatus: "active",

    // New field for address
    addresses: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const history = useHistory();

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    history.push("/"); // Redirect to the login page after successful registration
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      await PharmacistRegService(pharmacist);
      setIsPending(false);
      setSuccessOpen(true);

      // Redirect to home after 7 seconds
      setTimeout(() => {
        history.push("/");
      }, 4000);
    } catch (error) {
      console.error("Error adding pharmacist:", error);
      setIsPending(false);
      setErrorOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacist((prevPharmacist) => ({
      ...prevPharmacist,
      [name]: value,
    }));
  };

  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <h2>Register As Pharmacist</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                "firstName",
                "lastName",
                "username",
                "email",
                "password",
                "mobile",
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  {field === "password" ? (
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      type="password" // Set type to "password"
                      value={pharmacist[field]}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  ) : (
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={pharmacist[field]}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  )}
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={pharmacist.dob}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={pharmacist.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="addresses"
                  value={pharmacist.addresses}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              {["rate", "affiliation", "education"].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={pharmacist[field]}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              ))}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                style={{ marginTop: "2rem" }}
              >
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </Grid>
          </form>
          {/* Success dialog */}
          <Dialog open={successOpen} onClose={handleSuccessClose}>
            <DialogTitle>{"Pharmacist Registered Successfully"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Pharmacist registration was successful. You will be redirected
                to the home page shortly.
              </DialogContentText>
            </DialogContent>{" "}
            <DialogActions>
              <Button onClick={handleSuccessClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          {/* Error dialog */}
          <Dialog open={errorOpen} onClose={handleErrorClose}>
            <DialogTitle>{"Failed to Register Pharmacist"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Pharmacist registration failed. Please try again.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleErrorClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PharmacistReg;