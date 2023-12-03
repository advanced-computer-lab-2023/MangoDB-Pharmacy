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
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  viewMeds,
  getAllMedicineUses,
  getMedicinesByUse,
} from "../services/api";
import { pharmacistListItems } from "../components/ListItemsPharma";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

const ViewMedsPharma = () => {
  const theme = useTheme();
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

    if (e.target.value) {
      getMedicinesByUse(e.target.value)
        .then((response) => {
          setMeds(response.data.medicines);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
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
        <Typography
          variant="h3"
          gutterBottom
          marginTop={"1rem"}
          color={theme.palette.secondary.main}
        >
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
                <Link
                  to={`/medicinePharma/${med._id}`}
                  key={med._id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Paper
                    style={{
                      padding: "1rem",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {med.picture && (
                      <img
                        src={`http://localhost:4000/${med.picture}`}
                        alt={med.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "1rem",
                          borderRadius: "3px",
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
              ))}
          </div>
        )}

        {/* Add Medicine Button */}
        <Grid item xs={12} style={{ marginTop: "2rem" }}>
          {/* Add Medicine Button */}
          <Button
            variant="contained"
            color="secondary"
            align="center"
            fullWidth
            style={{
              marginTop: "0.5rem",
              marginBottom: "1rem",
              padding: "1rem",
            }}
            component={Link} // Use Link component for navigation
            to="/addMed"
          >
            <AddIcon></AddIcon>
            Add Medicine
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewMedsPharma;
