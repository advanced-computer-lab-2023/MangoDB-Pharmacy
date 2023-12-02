import React, { useEffect, useState } from "react";
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { getAllPharmacists, createChat } from "../services/api";
import { mainListItems } from '../components/ListItems';
import { useNavigate } from 'react-router-dom';

const NewChat = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState("");
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  useEffect(() => {
    getAllPharmacists()
      .then((response) => {
        setPharmacists(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handlePharmacistChange = (e) => {
    setSelectedPharmacist(e.target.value);
  };

  const handleCreateChat = (pharmacist) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(pharmacist);

    createChat(pharmacist.firstName, pharmacist.lastName)
      .then(() => {
        // Navigate to the ChatPage with the selected pharmacist's name
        navigate(`/chat/${pharmacist._id}`);  // Use navigate instead of history.push
      })
      .catch((error) => {
        console.error("Error creating chat:", error.message);
      });
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {mainListItems}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Select Pharmacist
        </Typography>

        {/* Display Pharmacist Dropdown */}
        <FormControl fullWidth margin="normal" sx={{ minWidth: 200 }}>
          <InputLabel id="pharmacistLabel">Select Pharmacist</InputLabel>
          <Select
            labelId="pharmacistLabel"
            id="pharmacist"
            value={selectedPharmacist}
            onChange={handlePharmacistChange}
          >
            <MenuItem value="">Select a Pharmacist</MenuItem>
            {pharmacists.map((pharmacist) => (
              <MenuItem key={pharmacist._id} value={pharmacist._id}>
                <Button onClick={() => handleCreateChat(pharmacist)}>
                  {`${pharmacist.firstName} ${pharmacist.lastName}`}
                </Button>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default NewChat;
