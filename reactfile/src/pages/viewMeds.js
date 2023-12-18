import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from 'react-router-dom';
import { viewMeds, getAllMedicineUses, getMedicinesByUse } from "../services/api";
import { mainListItems } from '../components/ListItems';
import PatientHeader from "../components/PatientHeader";

const ViewMeds = () => {
  const [meds, setMeds] = useState([]);
  const [medicineUses, setMedicineUses] = useState([]);
  const [selectedUse, setSelectedUse] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 
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
        console.log (response);

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
          setMeds(response.data.medicines); // Corrected line
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

  return (
    <PatientHeader>
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {mainListItems} */}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ marginLeft: "-1.5rem" }}>
        <Typography variant="h4" gutterBottom>
          Medicines
        </Typography>

        {/* Display Medicine Uses */}
        <FormControl fullWidth margin="normal" sx={{ minWidth: 200 }}>
          <InputLabel id="medicineUseLabel">Select Medicine Use</InputLabel>
          <Select
            labelId="medicineUseLabel"
            id="medicineUse"
            value={selectedUse}
            onChange={handleUseChange}
          >
            <MenuItem value="">All Uses</MenuItem>
            {medicineUses.map((use, index) => (
              <MenuItem key={index} value={use}>{use}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Bar */}
        <TextField
          label="Search for Medicine Name"
          variant="outlined"
          fullWidth
          size="small"
          margin="normal"
          onChange={handleSearchChange}
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* You can add a search icon here if needed */}
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "20px" }}
        />

        {/* Display Medicines */}
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds
              .filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((med) => (
                <Link to={`/medicine/${med._id}`} key={med._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper 
                    style={{ width :"100%",paddingLeft: "5rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {med.picture && (
                      <img
                        src={`http://localhost:8000/${med.picture}`}
                        alt={med.name}
                        style={{ width: "50px", height: "50px", marginRight: "1rem" }}
                      />
                    )}
                    <div>
                      <Typography variant="h6">{med.name}</Typography>
                      <Typography>{med.description}</Typography>
                      <Typography variant="subtitle1">Price: {med.price}</Typography>
                    </div>
                  </Paper>
                </Link>
              ))}
          </div>
        )}
      </Grid>
    </Grid>
    </PatientHeader>
  );
};

export default ViewMeds;