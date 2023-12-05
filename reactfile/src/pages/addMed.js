import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Snackbar,
  FormControlLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { addMed } from "../services/api";
import { pharmacistListItems } from "../components/ListItemsPharma";

import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
const AddMed = () => {
  const addIcon = `${process.env.PUBLIC_URL}/icons/add.svg`;
  const [medicine, setMedicine] = useState({
    name: "",
    price: "",
    use: "",
    description: "",
    quantity: "",
    sales: "",
    details: "",
    prescribed: "", // New field
    picture: null, // New field
  });

  const [isPending, setIsPending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setMedicine((prevMedicine) => ({
        ...prevMedicine,
        [name]: files[0], // Assuming only one file is selected
      }));
    } else {
      setMedicine((prevMedicine) => ({
        ...prevMedicine,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData();

      // Append other fields to formData
      Object.entries(medicine).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await addMed(formData);
      setIsPending(false);
      setSuccessOpen(true);

      // Redirect to home after 7 seconds
      setTimeout(() => {
        navigate("/");
      }, 7000);
    } catch (error) {
      console.error("Error adding medicine:", error);
      setIsPending(false);
      setErrorOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    // Redirect to home after success if needed
    navigate("/");
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        lg={2}
        xl={2}
        style={{
          background: "#f0f0f0",
          minHeight: "100vh",
          paddingTop: "2rem",
        }}
      >
        {pharmacistListItems}
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={9}
        md={10}
        lg={10}
        xl={10}
        style={{ paddingLeft: "2rem" }}
      >
        <Grid container justifyContent="center" style={{ padding: "2rem" }}>
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} style={{ padding: "2rem" }}>
              <Typography variant="h3">Add a medicine</Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={medicine.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Price"
                      name="price"
                      value={medicine.price}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Use"
                      name="use"
                      value={medicine.use}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Description"
                      name="description"
                      value={medicine.description}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Quantity"
                      name="quantity"
                      value={medicine.quantity}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Sales"
                      name="sales"
                      value={medicine.sales}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Details"
                      name="details"
                      value={medicine.details}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" height="100%">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={medicine.prescribed === "required"}
                            onChange={(event) =>
                              handleChange({
                                target: {
                                  name: "prescribed",
                                  value: event.target.checked
                                    ? "required"
                                    : "not required",
                                },
                              })
                            }
                          />
                        }
                        label="Prescribed"
                        labelPlacement="center"
                        sx={{
                          p: "0px 0px 0px 40px",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Upload Picture (png or pdf)</InputLabel>
                      <Input
                        type="file"
                        name="picture"
                        onChange={handleChange}
                        style={{ marginBottom: "1rem" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  startIcon={
                    <img
                      src={addIcon}
                      alt="Add Icon"
                      style={{ filter: "invert(1)", marginRight: "0px" }}
                      width="18"
                      height="18"
                    />
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add"
                  )}
                </Button>
              </form>
            </Paper>
          </Grid>

          <Dialog open={successOpen} onClose={handleSuccessClose}>
            <DialogTitle>{"Medicine Added Successfully"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Medicine was successfully added. You will be redirected to the
                home page shortly.
              </DialogContentText>
            </DialogContent>{" "}
            <DialogActions>
              <Button onClick={handleSuccessClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={errorOpen} onClose={handleErrorClose}>
            <DialogTitle>{"Probably worked"}</DialogTitle>
            <DialogContent>
              <DialogContentText>Check db for a surprise 😉</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleErrorClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddMed;
