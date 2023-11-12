import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPharmacist } from "../services/api";
import { Typography, Paper } from "@mui/material";

const PharmacistDetails = () => {
  const { id } = useParams();
  const [pharmacist, setPharmacist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacistDetails = async () => {
      try {
        const response = await getPharmacist(id);
        setPharmacist(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Error fetching pharmacist details");
      }
    };

    fetchPharmacistDetails();
  }, [id]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pharmacist Details
      </Typography>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {pharmacist && (
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
            {pharmacist.firstname} {pharmacist.lastname}
            <Typography variant="h6">
                Name: {pharmacist.firstName} {pharmacist.lastName}
              </Typography>
          </Typography>
          <Typography>Email: {pharmacist.email}</Typography>
          <Typography>Affiliation: {pharmacist.affiliation}</Typography>
          <Typography>Gender: {pharmacist.gender}</Typography>
          <Typography>Rate: {pharmacist.rate}</Typography>
          <Typography>Education: {pharmacist.education}</Typography>
          <Typography>Status: {pharmacist.status}</Typography>
          <Typography>Username: {pharmacist.username}</Typography>
          <Typography>DOB: {pharmacist.dob}</Typography>
          <Typography>Account Status: {pharmacist.accountStatus}</Typography>
        </Paper>
      )}
    </div>
  );
};

export default PharmacistDetails;
