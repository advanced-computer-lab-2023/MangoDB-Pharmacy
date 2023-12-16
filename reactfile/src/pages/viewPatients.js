import React, { useEffect, useState } from "react";
import { viewPatients } from "../services/api";
import { Typography, Paper, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminListItems } from '../components/ListItemsAdmin';
import AdminHeader from '../components/AdminHeader'; // Import the AdminHeader component

const ViewPatients = () => {
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewPatients();
        setPatient(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching patient data");
      }
    };

    fetchData();
  }, []);

  const handlePatientClick = (id) => {
    navigate(`/patientDetails/${id}`);
  };

  return (
    <Grid container>
      {/* Include the AdminHeader component */}
      <AdminHeader />

   

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "20rem", paddingRight: "2rem" }}>
        <div>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {patient.length > 0 && (
            <div>
              {patient.map((patient) => (
                <Paper
                  key={patient._id}
                  style={{
                    padding: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Typography variant="h6">
                    Name: {patient.firstName} {patient.lastName}
                  </Typography>
                  <Typography variant="h6">{patient.name}</Typography>
                  <Typography>Email: {patient.email}</Typography>
                  <Typography>Username: {patient.username}</Typography>

                  <Button onClick={() => handlePatientClick(patient._id)}>
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

export default ViewPatients;
