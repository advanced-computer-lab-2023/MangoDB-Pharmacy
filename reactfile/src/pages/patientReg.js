import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
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
  Typography,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { patientReg as PatientRegService } from "../services/api";

const PatientReg = () => {
  const [patient, setPatient] = useState({
    // Patient Model Fields
    gender: "",
    mobile: "",
    addresses: [],
    emergency: { name: "", mobile: "" },
    family: [],
    cart: [],

    // User Model Fields
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    userType: "patient",
    accountStatus: "active",
  });

  const [isPending, setIsPending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();
  const [warningOpen, setWarningOpen] = React.useState(false);

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    navigate("/"); // Redirect to the login page after successful registration
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      await PatientRegService(patient);
      setIsPending(false);
      setSuccessOpen(true);

      // Redirect to home after 7 seconds
      setTimeout(() => {
        navigate("/");
      }, 7000);
    } catch (error) {
      console.error("Error adding patient:", error);
      setIsPending(false);
      setErrorOpen(true);
    }
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      emergency: { ...prevPatient.emergency, [name]: value },
    }));
  };

  const handleFamilyChange = (index, e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => {
      const updatedFamily = [...prevPatient.family];
      updatedFamily[index] = { ...updatedFamily[index], [name]: value };
      return { ...prevPatient, family: updatedFamily };
    });
  };

  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={3}
          sx={{ maxWidth: "80%", margin: "auto" }}
          style={{ padding: "2rem" }}
        >
          <Typography variant="h3" sx={{ pb: "1rem" }}>
            Register as a patient
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={patient.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={patient.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  name="username"
                  value={patient.username}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={patient.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Tooltip
                  title="Your password must be at least 8 characters long, contain at least one number and have a mix of uppercase and lowercase letters."
                  placement="right"
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10], // Adjust these values as needed
                        },
                      },
                    ],
                  }}
                >
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    sx={{ maxWidth: "100%", margin: "auto" }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={patient.dob}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  type="tel"
                  name="mobile"
                  value={patient.mobile}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth margin="normal">
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-select"
                    name="gender"
                    value={patient.gender}
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
                  value={patient.addresses}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Emergency Contact Name"
                  name="name"
                  value={patient.emergency.name}
                  onChange={handleEmergencyChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Emergency Contact Mobile"
                  name="mobile"
                  value={patient.emergency.mobile}
                  onChange={handleEmergencyChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>

              {patient.family.map((familyMember, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    label={`Family Member ${index + 1} Name`}
                    name="name"
                    value={familyMember.name}
                    onChange={(e) => handleFamilyChange(index, e)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              ))}
            </Grid>
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
            <Grid item xs sx={{ pt: 3 }}>
              <Typography variant="body2">Already registered?</Typography>
              <Link href="/login" variant="body2" sx={{ color: "#15678d" }}>
                Login
              </Link>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Patient registration was successful. You will be redirected to the
          home page shortly.
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Patient registration failed. Please try again.
        </Alert>
      </Snackbar>

      <Snackbar
        open={warningOpen} // You need to control this state variable
        autoHideDuration={6000}
        onClose={handleWarningClose} // And this function
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleWarningClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          A field is missing or a username is taken. Please check your input.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PatientReg;
