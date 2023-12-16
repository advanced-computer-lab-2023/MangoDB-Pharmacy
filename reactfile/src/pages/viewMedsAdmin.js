// ViewMedsAdmin.js

import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from 'react-router-dom';
import { viewMeds, getAllMedicineUses, getMedicinesByUse } from "../services/api";
import AdminHeader from '../components/AdminHeader';
import SearchIcon from "@mui/icons-material/Search"; // Import the SearchIcon from Material-UI icons
import IconButton from "@mui/material/IconButton";

const ViewMedsAdmin = () => {
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

  return (
    <AdminHeader>
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "15rem", paddingRight: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Medicines
        </Typography>

        {/* Display Medicine Uses */}
        <FormControl fullWidth margin="normal" sx={{ width: 550 }}>
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
  <IconButton>
          <SearchIcon />
        </IconButton>              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "12px", marginBottom: "1rem" }}
        />

        {/* Display Medicines */}
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds
              .filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((med) => (
                <Link to={`/medicineAdmin/${med._id}`} key={med._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper
                    style={{ padding: "0.5rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {med.picture && (
                      <img
                        src={`http://localhost:8000/${med.picture}`}
                        alt={med.name}
                        style={{ width: "40px", height: "40px", marginRight: "0.5rem" }}
                      />
                    )}
                    <div>
                      <Typography variant="h6" sx={{ fontSize: "1rem" }}>{med.name}</Typography>
                      <Typography sx={{ fontSize: "0.8rem" }}>{med.description}</Typography>
                      <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>Price: {med.price}</Typography>
                    </div>
                  </Paper>
                </Link>
              ))}
          </div>
        )}
      </Grid>
    </AdminHeader>
  );
};

export default ViewMedsAdmin;
