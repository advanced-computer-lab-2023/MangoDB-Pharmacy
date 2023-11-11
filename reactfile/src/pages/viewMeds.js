import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { Link } from 'react-router-dom';
import { viewMeds, getAllMedicineUses, getMedicinesByUse } from "../services/api";
import { mainListItems } from '../components/ListItems';

const ViewMeds = () => {
  const [meds, setMeds] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUse, setSelectedUse] = useState('');
  const [medicineUses, setMedicineUses] = useState([]);

  useEffect(() => {
    getAllMedicineUses()
      .then((response) => {
        setMedicineUses(response.data.uses);
      })
      .catch((err) => {
        console.error(err.message);
      });

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

  const handleUseChange = async (e) => {
    setSelectedUse(e.target.value);

    if (e.target.value) {
      try {
        const response = await getMedicinesByUse(e.target.value);
        setMeds(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    } else {
      viewMeds()
        .then((response) => {
          setMeds(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {mainListItems}
      </Grid>

      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Medicines
        </Typography>

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
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "20px" }}
        />

        <Select
          label="Select Medicine Use"
          variant="outlined"
          value={selectedUse}
          onChange={handleUseChange}
          style={{ marginLeft: '1rem', minWidth: '150px' }}
        >
          <MenuItem value="">All Uses</MenuItem>
          {medicineUses.map((use) => (
            <MenuItem key={use} value={use}>{use}</MenuItem>
          ))}
        </Select>

        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds
              .filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((med) => (
                <Link to={`/medicine/${med._id}`} key={med._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper
                    style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {med.picture && (
                      <img
                        src={`http://localhost:4000/${med.picture}`}
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
  );
};

export default ViewMeds;
