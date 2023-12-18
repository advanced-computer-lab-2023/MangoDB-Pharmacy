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
} from "@mui/material";
import { addMed } from "../services/api";
import PharmaHeader from "../components/PharmacistHeader";

import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
const AddMed = () => {
  const addIcon = `${process.env.PUBLIC_URL}/icons/add.svg`;
  const uploadIcon = `${process.env.PUBLIC_URL}/icons/upload.svg`;
  const theme = useTheme();
  const [medicine, setMedicine] = useState({
    name: "",
    price: "",
    use: "",
    description: "",
    quantity: "",
    details: "",
    picture: null, // New field
    mainActiveIngredient: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPrice, setDialogPrice] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDialogChange = (event) => {
    setDialogPrice(event.target.value);
  };
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [missingField, setMissingField] = useState(false);
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
  const handleDialogSave = () => {
    // Add your save logic here
    setOpenDialog(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.values(medicine);
    if (values.includes("")) {
      setMissingField(true);
      return;
    }

    setIsPending(true);

    try {
      const formData = new FormData();

      // Append other fields to formData
      Object.entries(medicine).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await addMed(formData);
      setIsPending(false);
      //setSuccessOpen(true);
      setOpenSuccess(true);
      // Redirect to home after 7 seconds
      setTimeout(() => {
        navigate("/");
      }, 7000);
    } catch (error) {
      console.error("Error adding medicine:", error);
      setIsPending(false);
      //setErrorOpen(true);
      setOpenError(true);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    // Redirect to home after success if needed
    navigate("/");
  };

  return (
    <PharmaHeader>
    <Grid container>
  

      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={9}
        md={10}
        lg={10}
        xl={10}
        style={{ paddingLeft: "15rem" }}
      >
        <Grid container justifyContent="center" style={{ padding: "2rem" }}>
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={2} style={{ padding: "2rem" }}>
              <Typography
                variant="h4"
                sx={{ color: "secondary.main", paddingBottom: "1rem" }}
              >
                Add a medicine
              </Typography>

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
                          // style={{
                          //   color:
                          //     medicine.prescribed === "required"
                          //       ? theme.palette.secondary.dark
                          //       : "",
                          // }}
                        />
                      }
                      label="Prescribed"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        style={{
                          paddingTop: "0rem",
                          paddingBottom: "0.7rem",
                        }}
                      ></InputLabel>
                      <Button
                        variant="contained"
                        color="secondary"
                        component="label"
                        startIcon={
                          <img
                            src={uploadIcon}
                            alt="Upload Icon"
                            style={{ filter: "invert(1)" }}
                            width="20"
                            height="20"
                          />
                        }
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      >
                        Upload
                      </Button>
                      <Input
                        id="fileInput"
                        type="file"
                        name="picture"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <FormHelperText>(png or pdf)</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Main Active ingredient"
                      name="mainActiveIngredient"
                      value={medicine.mainActiveIngredient}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
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
                      width="20"
                      height="20"
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

                <Snackbar
                  open={openSuccess}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  autoHideDuration={6000}
                  onClose={() => setOpenSuccess(false)}
                >
                  <MuiAlert
                    onClose={() => setOpenSuccess(false)}
                    severity="success"
                    elevation={6}
                    variant="filled"
                  >
                    Medicine was successfully added. You will be redirected to
                    the home page shortly.
                  </MuiAlert>
                </Snackbar>

                <Snackbar
                  open={openError}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  autoHideDuration={6000}
                  onClose={() => setOpenError(false)}
                >
                  <MuiAlert
                    onClose={() => setOpenError(false)}
                    severity="success"
                    elevation={6}
                    variant="filled"
                  >
                    Succesful operation check your database.
                  </MuiAlert>
                </Snackbar>
                <Snackbar
                  open={missingField}
                  autoHideDuration={6000}
                  onClose={() => setMissingField(false)}
                >
                  <MuiAlert
                    onClose={() => setMissingField(false)}
                    severity="warning"
                    elevation={6}
                    variant="filled"
                  >
                    Please fill in all fields.
                  </MuiAlert>
                </Snackbar>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </PharmaHeader>
  );
};

export default AddMed;