import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { viewAllPatients } from "../services/api";

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await viewAllPatients();
        setPatients(response.data); // Assuming your API returns an array of patients
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Patients
      </Typography>
      <Grid container spacing={2}>
        {patients.map((patient) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h6">{patient.name}</Typography>
              <Typography>ID: {patient.id}</Typography>
              <Typography>Username: {patient.username}</Typography>
              <Typography>Email: {patient.email}</Typography>
              <Typography>Age: {patient.age}</Typography>
              <Typography>Mobile: {patient.mobile}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default ViewAllPatients;
