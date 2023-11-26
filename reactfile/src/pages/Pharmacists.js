import React, { useEffect, useState } from 'react';
import { Grid, Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { viewPharmacist, pharamacistApproval, pharamacistRejection } from '../services/api';
import { AdminListItems } from '../components/ListItemsAdmin';

const PharmacistDetail = () => {
  const { id } = useParams();
  const [pharmacist, setPharma] = useState(null);
  const [error, setError] = useState(null);
  const [acceptClicked, setAcceptClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);

  useEffect(() => {
    viewPharmacist(id)
      .then((response) => {
        setPharma(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleAccept = async () => {
    try {
      await pharamacistApproval(id);
      setAcceptClicked(true);
    } catch (error) {
      console.error('Error accepting pharmacist:', error.message);
    }
  };

  const handleReject = async () => {
    try {
      await pharamacistRejection(id);
      setRejectClicked(true);
    } catch (error) {
      console.error('Error rejecting pharmacist:', error.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {AdminListItems}
      </Grid>
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ padding: '1rem' }}>
        <mainListItems pharmaDetails={pharmacist} />
        <div>
          <h1>Pharmacists Details</h1>
          {error && <div>Error fetching order details: {error}</div>}
          {!pharmacist && <div>Loading...</div>}
          {pharmacist && (
            <div>
              {/* Pharmacist details display */}
              <p>First Name: {pharmacist.firstName}</p>
              <p>Last Name: {pharmacist.lastName}</p>
              <p>Date of Birth: {pharmacist.dob}</p>
              <p>Education: {pharmacist.education}</p>
              <p>Gender: {pharmacist.gender}</p>
              <p>Affiliation: {pharmacist.affiliation}</p>

              {/* Display documents */}
              <h2>Documents</h2>
              <ul>
                {pharmacist.documents.map((document, index) => (
                  <li key={index}>
                    <p>Name: {document.name}</p>
                    <p>File: {document.file}</p>
                  </li>
                ))}
              </ul>

              {/* Accept and Reject Buttons */}
              {!acceptClicked && !rejectClicked && (
                <div>
                  <Button variant="contained" color="primary" onClick={handleAccept}>
                    Accept
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleReject}>
                    Reject
                  </Button>
                </div>
              )}

              {acceptClicked && <p>Pharmacist Accepted!</p>}
              {rejectClicked && <p>Pharmacist Rejected!</p>}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default PharmacistDetail;
