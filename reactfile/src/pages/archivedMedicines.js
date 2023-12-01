import React, { useEffect, useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { viewArchivedMeds, unarchiveMedicine } from "../services/api";
import { pharmacistListItems } from "../components/ListItemsPharma";  // Import the sidebar component

const ArchivedMedicines = () => {
  const [archivedMeds, setArchivedMeds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    viewArchivedMeds()
      .then((response) => {
        setArchivedMeds(response.data);
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem", width: "20%" }}>
        {pharmacistListItems}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Archived Medicines
        </Typography>

        {error && <div>{error}</div>}
        {archivedMeds && (
          <div>
            {archivedMeds.map((archivedMed) => (
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
  );
};

export default ArchivedMedicines;
