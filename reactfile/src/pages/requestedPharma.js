import * as React from 'react';
import { Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getPendingPharma } from "../services/api";
import { AdminHeader } from '../components/AdminHeader';
import { Link } from 'react-router-dom';

const Requests = () => {
  const [pharma, setPharma] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPendingPharma()
      .then((response) => {
        setPharma(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  return (
    <Grid container>
      {/* AdminHeader Component with Appbar and Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} sx={{ paddingLeft: "20rem", paddingRight: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Requested Pharmacists
        </Typography>

        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {pharma && (
          <div>
            {pharma.map((pharma) => (
              <Link to={`/Pharamcists/${pharma._id}`} key={pharma._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper
                  style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  <div>
                    <Typography variant="subtitle1">FirstName : {pharma.firstName}</Typography>
                    <Typography variant="subtitle1">Last Name: {pharma.lastName}</Typography>
                    <Typography variant="subtitle1">Date Of Birth: {pharma.dob}</Typography>
                  </div>
                </Paper>
               </Link>
            ))}
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Requests;
