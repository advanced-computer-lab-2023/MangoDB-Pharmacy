import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { getAllPharmacists, createChat, viewChats,getChat } from "../services/api";
import { mainListItems } from '../components/ListItems';
import { useNavigate } from 'react-router-dom';

const NewChat = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState("");
  const [patientChats, setPatientChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPharmacists()
      .then((response) => {
        setPharmacists(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch patient's chats when the component mounts
    viewChats()
      .then((response) => {
        setPatientChats(response.data);
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
        navigate(`/chat/${pharmacist._id}`);
      })
      .catch((error) => {
        console.error("Error creating chat:", error.message);
      });
  };

  const handleChatClick = (pharmacistId) => {
    navigate(`/chat/${pharmacistId}`);
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
NEW CHAT        
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
                <Button onClick={() => handleCreateChat(pharmacist)} style={{ color: "black" }}>
                  {`${pharmacist.firstName} ${pharmacist.lastName}`}
                </Button>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display Patient's Chats */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Your Chats
        </Typography>
        {patientChats.map((chat) => (
          <Paper key={chat._id} style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
           onClick={() => handleChatClick(chat.pharma.id)}>
            <div>
              <Typography variant="h6">{`${chat.pharma.firstName} ${chat.pharma.lastName}`}</Typography>
              <ul>
                {chat.lastMessage}
              </ul>
            </div>
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
};

export default NewChat;
