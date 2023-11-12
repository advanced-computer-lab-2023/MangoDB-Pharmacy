// EditMed.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
} from "@mui/material";
import { editMed } from "../services/api";

const EditMed = () => {
  const [medicine, setMedicine] = useState({
    id: "",
    price: "",
    details: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const history = useHistory();

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    history.push("/"); // Redirect to the home page after successful update
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      await editMed(medicine);

      setIsPending(false);
      setSuccessOpen(true);

      // Redirect to home after 7 seconds
      setTimeout(() => {
        history.push("/");
      }, 4000);
    } catch (error) {
      console.error("Error editing medicine:", error.message);
      setIsPending(false);
      setErrorOpen(true);
    }
  };

  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <h2>Edit Medicine</h2>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Include the ID field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID"
                  name="id"
                  value={medicine.id}
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
                  label="Details"
                  name="details"
                  value={medicine.details}
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
              style={{ marginTop: "2rem" }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Edit"
              )}
            </Button>
          </form>
        </Paper>
      </Grid>

      <Dialog open={successOpen} onClose={handleSuccessClose}>
        <DialogTitle>{"Medicine Updated Successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Succesfully updated</DialogContentText>
        </DialogContent>{" "}
        <DialogActions>
          <Button onClick={handleSuccessClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* Error Dialog */}
      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>{"Failed to Update Medicine"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Failed to update. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EditMed;
