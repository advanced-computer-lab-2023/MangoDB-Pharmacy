import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../services/api";
import { Typography, Paper, Grid } from "@mui/material";
import { AdminListItems } from '../components/ListItemsAdmin'; 

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await getPatient(id);
        setPatient(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching pharmacist details");
      }
    };

    fetchPatientDetails();
  }, [id]);

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
            Patient Details
          </Typography>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {patient && (
            <Paper
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="h6">
                {patient.firstname} {patient.lastname}
                <Typography variant="h6">
                  Name: {patient.firstName} {patient.lastName}
                </Typography>
              </Typography>
              <Typography>Email: {patient.email}</Typography>
              <Typography>Gender: {patient.gender}</Typography>
              <Typography>Mobile: {patient.mobile}</Typography>
              <Typography>
                Addresses: {patient.addresses && patient.addresses.join(", ")}
              </Typography>
              <Typography>Username: {patient.username}</Typography>
              <Typography>DOB: {patient.dob}</Typography>
              <Typography>Account Status: {patient.accountStatus}</Typography>
            </Paper>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default PatientDetails;
