import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { viewArchivedMeds, unarchiveMedicine } from "../services/api";
import PharmacistHeader from "../components/PharmacistHeader";

const ArchivedMedicines = () => {
  const [archivedMeds, setArchivedMeds] = useState([]);
  const [filteredArchivedMeds, setFilteredArchivedMeds] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    viewArchivedMeds()
      .then((response) => {
        setArchivedMeds(response.data);
        setFilteredArchivedMeds(response.data); // Initialize with all medicines
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleUnarchive = async (medicineName) => {
    try {
      const response = await unarchiveMedicine(medicineName);
      console.log(response.data);

      const updatedArchivedMeds = await viewArchivedMeds();
      setArchivedMeds(updatedArchivedMeds.data);
      setFilteredArchivedMeds(updatedArchivedMeds.data); // Update filtered medicines
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter medicines based on search term
    const filteredMeds = archivedMeds.filter((med) =>
      med.name.toLowerCase().includes(searchTerm)
    );
    setFilteredArchivedMeds(filteredMeds);
  };

  return (
    <PharmacistHeader>

    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      

      {/* Main Content */}
      <div style={{ flex: 1, paddingLeft: "20rem" }}>
        <Typography variant="h4" gutterBottom>
          Archived Medicines
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search for Medicine Name"
          variant="outlined"
          fullWidth
          size="small"
          margin="normal"
          onChange={handleSearchChange}
          value={searchTerm}
        />

        {error && <div>{error}</div>}
        {filteredArchivedMeds && (
          <div>
            {filteredArchivedMeds.map((archivedMed) => (
              <Paper
                key={archivedMed._id}
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="h6">{archivedMed.name}</Typography>
                  <Typography>{archivedMed.description}</Typography>
                  <Typography variant="subtitle1">Price: {archivedMed.price}</Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUnarchive(archivedMed.name)}
                >
                  Unarchive Medicine
                </Button>
              </Paper>
            ))}
          </div>
        )}
      </div>
    </div>
    </PharmacistHeader>

  );
};

export default ArchivedMedicines;
