import React, { useEffect, useState } from "react";
import { viewPatients, viewPharmacists } from "../services/api";
import { Typography, Paper, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminHeader from '../components/AdminHeader';

const RemoveUsers = () => {
  const [patients, setPatients] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await viewPatients();
        const pharmacistsResponse = await viewPharmacists();

        setPatients(patientsResponse.data);
        setPharmacists(pharmacistsResponse.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handlePatientClick = (id) => {
    navigate(`/patientDetails/${id}`);
  };

  const handlePharmacistClick = (id) => {
    // Handle pharmacist click logic
    navigate(`/pharmacistDetails/${id}`);
  };

  return (
    <Grid container>
      <AdminHeader />

      <Grid container item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "20rem", paddingRight: "2rem" }}>
        {/* Patients */}
        <Grid item xs={12} md={6} sx={{ paddingRight: 2 }}>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {patients.length > 0 && (
            <div>
              {patients.map((patient) => (
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
                  <Typography>Email: {patient.email}</Typography>
                  <Typography>Username: {patient.username}</Typography>

                  <Button onClick={() => handlePatientClick(patient._id)}>
                    View Details
                  </Button>
                </Paper>
              ))}
            </div>
          )}
        </Grid>

        {/* Pharmacists */}
        <Grid item xs={12} md={6} sx={{ paddingLeft: 2 }}>
          <Typography variant="h4" gutterBottom>
            Pharmacists
          </Typography>

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
                  <Typography>Email: {pharmacist.email}</Typography>
                  <Typography>Username: {pharmacist.username}</Typography>

                  <Button onClick={() => handlePharmacistClick(pharmacist._id)}>
                    View Details
                  </Button>
                </Paper>
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RemoveUsers;