import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { viewChatsPharma } from "../services/api";
import { pharmacistListItems } from '../components/ListItemsPharma';
import { useNavigate } from 'react-router-dom';

const NewChat = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState("");
  const [patientChats, setPatientChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    viewChatsPharma()
      .then((response) => {
        setPatientChats(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);


  const handleChatClick = (patient) => {
    navigate(`/chatPharmacistPatient/${patient}`);
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {pharmacistListItems}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
    
        {/* Display Pharmacist Dropdown */}
       

        {/* Display Patient's Chats */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Your Chats
        </Typography>
        {patientChats.map((chat) => (
          <Paper key={chat._id} style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
           onClick={() => handleChatClick(chat.patient.id)}>
            <div>
              <Typography variant="h6">{`${chat.patient.firstName} ${chat.patient.lastName}`}</Typography>
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
