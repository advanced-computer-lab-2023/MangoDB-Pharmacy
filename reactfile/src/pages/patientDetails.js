import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../services/api";
import { Typography, Paper } from "@mui/material";

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
          <Typography>Affiliation: {patient.affiliation}</Typography>
          <Typography>Gender: {patient.gender}</Typography>
          <Typography>Rate: {patient.mobile}</Typography>
          <Typography>Education: {patient.addresses}</Typography>
          <Typography>Username: {patient.username}</Typography>
          <Typography>DOB: {patient.dob}</Typography>
          <Typography>Account Status: {patient.accountStatus}</Typography>
        </Paper>
      )}
    </div>
  );
};

export default PatientDetails;