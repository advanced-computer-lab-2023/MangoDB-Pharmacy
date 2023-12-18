import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { viewChatsPharma } from "../services/api";
import { pharmacistListItems } from '../components/ListItemsPharma';
import { useNavigate } from 'react-router-dom';
import PharmacistHeader from "../components/PharmacistHeader";

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
    <PharmacistHeader>
      <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {pharmacistListItems} */}
      </Grid>
      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={9}
        md={10}
        lg={10}
        xl={10}
        style={{ paddingLeft: "2rem" }}
      >
        {/* ... (previous Chat Button and Pharmacist Dropdown code) */}
        {/* Display Patient's Chats */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Your Patient Chats
        </Typography>
        {patientChats.map((chat) => (
          <Paper
            key={chat._id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex", // Use flex container
              justifyContent: "space-between", // Space between name, last message, and timestamp
              width: "50%",
              height: "10%",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleChatClick(chat.patient.id)}
          >
            <div>
              <Typography variant="h5">
                {`${chat.patient.firstName} ${chat.patient.lastName}`}
              </Typography>
              <Typography>{chat.lastMessage.messageText}</Typography>
            </div>
            <div style={{ marginTop: "8px" }}>
              {/* Displaying the last message's timestamp in the desired format */}
              {chat.lastMessage.timeDate && (
                <Typography>
                  {new Date(chat.lastMessage.timeDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}{" "}
                  {new Date(chat.lastMessage.timeDate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </Typography>
              )}
            </div>
          </Paper>
        ))}
      </Grid>
    </Grid>
    </PharmacistHeader>
  );
};

export default NewChat;