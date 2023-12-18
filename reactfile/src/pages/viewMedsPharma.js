import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  viewMeds,
  getAllMedicineUses,
  getMedicinesByUse,
  addMed as addMedicineApi,
  archiveMedicine,
} from "../services/api";
import { pharmacistListItems } from "../components/ListItemsPharma";
import PharmacistHeader from "../components/PharmacistHeader";
const prescribedOptions = ["required", "not required"];

const ViewMedsPharma = () => {
  const [meds, setMeds] = useState([]);
  const [medicineUses, setMedicineUses] = useState([]);
  const [selectedUse, setSelectedUse] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [addMedicine, setAddMedicine] = useState({
    name: "",
    price: "",
    use: "",
    description: "",
    quantity: "",
    sales: "",
    details: "",
    prescribed: "",
  });

  const [isAddMedPending, setIsAddMedPending] = useState(false);
  const [addMedSuccessOpen, setAddMedSuccessOpen] = useState(false);
  const [addMedErrorOpen, setAddMedErrorOpen] = useState(false);

  const [addMedicineOpen, setAddMedicineOpen] = useState(false);

  const handleAddMedicineOpen = () => {
    setAddMedicineOpen(true);
  };

  const handleAddMedicineClose = () => {
    setAddMedicineOpen(false);
  };

  useEffect(() => {
    // Fetch medicine uses when the component mounts
    getAllMedicineUses()
      .then((response) => {
        setMedicineUses(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch medicine data
    viewMeds()
      .then((response) => {
        setMeds(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUseChange = (e) => {
    setSelectedUse(e.target.value);

    // Fetch medicines for the selected use
    if (e.target.value) {
      getMedicinesByUse(e.target.value)
        .then((response) => {
          setMeds(response.data.medicines);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      // If no use selected, fetch all medicines
      viewMeds()
        .then((response) => {
          setMeds(response.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddMedPending(true);

    try {
      const newMedicine = { ...addMedicine }; // Create a new object for the new medicine
      await addMedicineApi(newMedicine);
      setIsAddMedPending(false);
      setAddMedSuccessOpen(true);

      // Directly add the new medicine to the state
      setMeds((prevMeds) => [...prevMeds, newMedicine]);

      // Reset the form
      setAddMedicine({
        name: "",
        price: "",
        use: "",
        description: "",
        quantity: "",
        sales: "",
        details: "",
      });
    } catch (error) {
      console.error("Error adding medicine:", error);
      setIsAddMedPending(false);
      setAddMedErrorOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setAddMedSuccessOpen(false);
    // Redirect to home after success if needed
    viewMeds().then((response) => {
      setMeds(response.data);
    });
  };

  const handleErrorClose = () => {
    setAddMedErrorOpen(false);
  };

  const handleArchiveMedicine = async (medicineName) => {
    try {
      // Call the archiveMedicine function
      const response = await archiveMedicine(medicineName);
      console.log(response.data);

      // If archiving is successful, refetch the updated list of medicines
      viewMeds()
        .then((response) => {
          setMeds(response.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PharmacistHeader>
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
        {/* {pharmacistListItems} */}
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
        <Typography variant="h2" sx={{ pt: 5 }} gutterBottom>
          Medicines
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search for Medicine by Name"
          variant="outlined"
          fullWidth
          size="medium"
          margin="normal"
          onChange={handleSearchChange}
          value={searchTerm}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          sx={{ borderRadius: "10px", color: "secondary.main" }}
        />
        {/* Display Medicine Uses */}
        <FormControl
          fullWidth
          margin="normal"
          sx={{ minWidth: 200, maxHeight: 30, paddingBottom: "2rem" }}
        >
          <InputLabel id="medicineUseLabel">Select Medicine Use</InputLabel>
          <Select
            labelId="medicineUseLabel"
            id="medicineUse"
            value={selectedUse}
            onChange={handleUseChange}
          >
            <MenuItem value="">All Uses</MenuItem>
            {medicineUses.map((use, index) => (
              <MenuItem key={index} value={use}>
                {use}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display Medicines */}
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds
              .filter((med) =>
                med.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((med) => (
                <div key={med._id}>
                  <Link
                    to={`/medicinePharma/${med._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Paper
                      style={{
                        padding: "1rem",
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        width : "95%"
                      }}
                    >
                      {med.picture && (
                        <img
                          src={`http://localhost:8000/${med.picture}`}
                          alt={med.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "1rem",
                          }}
                        />
                      )}
                      <div>
                        <Typography variant="h6">{med.name}</Typography>
                        <Typography>{med.description}</Typography>
                        <Typography variant="subtitle1">
                          Price: {med.price}
                        </Typography>
                      </div>
                      
                    </Paper>
                  </Link>
                  {/* Archive Medicine Button */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleArchiveMedicine(med.name)}
                    style={{ marginLeft: "55rem", marginTop: "7px", marginBottom:"2rem", marginTop : "-5rem"  }}
                  >
                    Archive Medicine
                  </Button>
                </div>
              ))}
          </div>
        )}

       

        {/* Archived Medicines Button */}
        <Link to="/archivedMedicines" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "1rem" }}
          >
            view Archived Medicines
          </Button>
        </Link>

        {/* Add Medicine Dialog */}
        <Dialog open={addMedicineOpen} onClose={handleAddMedicineClose}>
          <DialogTitle>{"Add Medicine"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={addMedicine.name}
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
                    value={addMedicine.price}
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
                    value={addMedicine.use}
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
                    value={addMedicine.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="prescribed-label">Prescribed</InputLabel>
                    <Select
                      labelId="prescribed-label"
                      id="prescribed"
                      name="prescribed"
                      value={addMedicine.prescribed}
                      onChange={handleChange}
                      fullWidth
                      required
                    >
                      {prescribedOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    value={addMedicine.quantity}
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
                    value={addMedicine.sales}
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
                    value={addMedicine.details}
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
                {isAddMedPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Medicine Success Dialog */}
        <Dialog open={addMedSuccessOpen} onClose={handleSuccessClose}>
          <DialogTitle>{"Medicine Added Successfully"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Medicine was successfully added. You will be redirected to the
              home page shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Medicine Error Dialog */}
        <Dialog open={addMedErrorOpen} onClose={handleErrorClose}>
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
    </PharmacistHeader>
  );
};

export default ViewMedsPharma;