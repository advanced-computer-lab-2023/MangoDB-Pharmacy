import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { viewMeds } from "../services/api";
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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds.map((med) => (
              <div key={med._id}>
                <h3>{med.name}</h3>
                <p>{med.description}</p>
                <p>Price: {med.price}</p>
              </div>
            ))}
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default ViewMeds;
