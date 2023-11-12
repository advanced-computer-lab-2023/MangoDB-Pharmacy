import React, { useEffect, useState } from "react";
import { viewPatients } from "../services/api";
import { Typography, Paper, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const ViewPatients = () => {
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

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
    history.push(`/patientDetails/${id}`);
  };

  return (
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
              <Typography>Affiliation: {patient.affiliation}</Typography>
             
              <Button onClick={() => handlePatientClick(patient._id)}>
                View Details
              </Button>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPatients;
