import React, { useEffect, useState } from "react";
import { viewPharmacists } from "../services/api";
import { Typography, Paper, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const ViewPharmacists = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewPharmacists();
        setPharmacists(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching pharmacist data");
      }
    };

    fetchData();
  }, []);

  const handlePharmacistClick = (id) => {
    history.push(`/pharmacistDetails/${id}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pharmacists
      </Typography>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {pharmacists.length > 0 && (
        <div>
          {pharmacists.map((pharmacist) => (
            <Paper
              key={pharmacist._id}
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
                 <Typography variant="h6">
                Name: {pharmacist.firstName} {pharmacist.lastName}
              </Typography>
              <Typography variant="h6">{pharmacist.name}</Typography>
              <Typography>Email: {pharmacist.email}</Typography>
              <Typography>Affiliation: {pharmacist.affiliation}</Typography>
             
              <Button onClick={() => handlePharmacistClick(pharmacist._id)}>
                View Details
              </Button>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPharmacists;
