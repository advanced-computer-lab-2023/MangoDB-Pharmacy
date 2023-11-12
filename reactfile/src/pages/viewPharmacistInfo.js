import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Paper, CircularProgress } from "@mui/material";
import { viewPharmacistInfo } from "../services/api";

const ViewPharmacistInfo = () => {
  const id = "652a72266cf3e6389454261a";
  const [pharmacist, setPharmacist] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPharmacistInfo = async () => {
      try {
        const response = await viewPharmacistInfo(id);
        setPharmacist(response.data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error fetching pharmacist information");
        setIsPending(false);
      }
    };

    fetchPharmacistInfo();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      {isPending && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {pharmacist && (
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
          <Typography variant="h4" gutterBottom>
            Pharmacist Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>User Type:</strong> {pharmacist.userType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>First Name:</strong> {pharmacist.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Last Name:</strong> {pharmacist.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Email:</strong> {pharmacist.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Username:</strong> {pharmacist.username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {pharmacist.dob}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Account Status:</strong> {pharmacist.accountStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Rate:</strong> {pharmacist.rate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Affiliation:</strong> {pharmacist.affiliation}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Education:</strong> {pharmacist.education}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Status:</strong> {pharmacist.status}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};
export default ViewPharmacistInfo;
