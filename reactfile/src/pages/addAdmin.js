import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AdminHeader from '../components/AdminHeader'; // Import the AdminHeader component


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const AddAdmin = ({ apiEndpoint, redirectPath }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [successOpen, setSuccessOpen] = useState(false);
  const [isNotFilled, setNotFilled] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
    message: "",
  });

  const handleClose = (event, reason) => {
    // If the Snackbar is closed by clicking the "x" or after the timeout
    if (reason === 'clickaway') {
      return;
    }

    setSuccessOpen(false);
 };

  const handleCreateAdmin = async () => {
   if (formData.firstName == "" || formData.lastName == "" || formData.email == "")
   {
    setNotFilled(true);
    return;
   }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8000/Admin/addAdmin`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setError(null);
        setSuccessOpen(true);
        alert(
					"Admin Created Successfully!" +
						"\nUsername: " +
						response.data.username +
						"\nPassword: " +
						response.data.password
				);

        // Redirect to home after 7 seconds
      setTimeout(() => {
        navigate("/DashboardAdmin");
      }, 3000);
      }
    } catch (error) {
      setState({
        open: true,
        Transition: SlideTransition,
        message: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateAdmin();
  };

  return (
    <AdminHeader>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Admin
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, paddingLeft: 2, paddingRight: 2 }} // Add padding here
          >
            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "1rem",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {error}
              </div>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Snackbar
              open={successOpen}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={3000}
              onClose={handleClose}
            >


              <Alert onClose={handleClose} severity="success">
                Admin Created Successfully!
              </Alert>
            </Snackbar>
            {isNotFilled && (
                <Snackbar
                  open={isNotFilled}
                  autoHideDuration={3000} // Adjust the duration as needed
                  onClose={() => setNotFilled(false)}
                >
                  <Alert onClose={() => setNotFilled(false)} severity="warning">
                    Please Fill Missing Text Fields!
                  </Alert>
                </Snackbar>
              )}
          </Box>
        </Box>
      </Container>
    </AdminHeader>
  );
};

export default AddAdmin;