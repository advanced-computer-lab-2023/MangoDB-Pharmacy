import { Grid, Paper, Typography, Avatar, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { viewMeds } from "../services/api";
import "../index.css";

const ViewMeds = () => {
  const [meds, setMeds] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    viewMeds()
      .then((response) => {
        setMeds(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2>Medicines</h2>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds.map((med) => (
              <Paper key={med._id} elevation={3} style={styles.paper}>
                <Grid container spacing={2}>
                  <Grid item style={styles.avatarContainer}>
                    <Avatar
                      alt={med.name}
                      src={med.picture || "/images/med.png"}
                      style={styles.avatar}
                    />
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item style={styles.contentContainer}>
                    <Typography variant="h6" gutterBottom>
                      {med.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {med.use && `(${med.use})`}
                    </Typography>
                    <Typography variant="body1">{med.description}</Typography>
                    <Typography variant="body1" color="primary">
                      Price: {med.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        )}
      </Grid>
    </Grid>
  );
};

const styles = {
  paper: {
    margin: "1rem auto",
    padding: "1rem",
    borderRadius: "15px",
    width: "70%", // Adjusted width
    display: "flex",
    alignItems: "center", // Center the whole div
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "1rem", // Add padding to the right of the avatar
  },
  avatar: {
    width: "80px", // Adjusted size
    height: "80px", // Adjusted size
  },
  contentContainer: {
    flex: 1, // Take remaining space
    paddingLeft: "1rem",
    textAlign: "left", // Align text to the left
  },
};
export default ViewMeds;