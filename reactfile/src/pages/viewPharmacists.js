import React, { useEffect, useState } from "react";
import { viewPharmacists } from "../services/api";
import { Typography, Paper, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AdminListItems } from '../components/ListItemsAdmin'; 
import { Grid } from "@mui/material";



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
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {AdminListItems}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10}>
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
      </Grid>
    </Grid>
  );
};

export default ViewPharmacists;