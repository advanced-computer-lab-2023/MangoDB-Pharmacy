import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { getPatientbyId, getChatPharmaPat, sendMessagePharma } from "../services/api";
import { useParams } from 'react-router-dom';
import { pharmacistListItems } from '../components/ListItemsPharma';
import PatientHeader from "../components/PharmacistHeader";
const ChatPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState([]);
  const [messages, setMessages] = useState([]); // State to store messages

  useEffect(() => {
    // Fetch pharmacist details
    getPatientbyId(id)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch chat messages when component mounts
    fetchChatMessages(id);

    // Set up interval to fetch messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchChatMessages(id);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [id]);

  const fetchChatMessages = (patientId) => {
    // Fetch chat messages for the given pharmacist
    getChatPharmaPat({ patientId })
      .then((response) => {
        // If there are messages in the response, update the state
        if (response.messages) {
          setMessages(response.messages);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error.message);
      });
  };

  const handleSend = () => {
    sendMessagePharma(message, id)
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error.message);
      });
  };
  const styles = {
    pharmacistMessage: {
      backgroundColor: "#2196f3",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px",
      marginBottom: "8px",
      textAlign: "right",
    },
    patientMessage: {
      backgroundColor: "#4caf50",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px",
      marginBottom: "8px",
      textAlign: "left",
    },
  };
  
  return (
    <PatientHeader>
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {pharmacistListItems} */}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10}>
        {/* App Bar with Name */}
        <AppBar position="static" style={{ maxWidth: "840px" }}>
          <Toolbar>
            <Typography variant="h6">{patient.firstName} {patient.lastName} </Typography>
          </Toolbar>
        </AppBar>

        {/* Display Messages */}
        <Paper id="messages-container" elevation={3} style={{ padding: "1rem", height: "60vh", overflowY: "auto", width: "100%", maxWidth: "800px" }}>
          {messages.map((message) => (
            <div key={message._id} style={{ display: "flex", flexDirection: "column", alignItems: message.senderRole === 'patient' ? 'flex-start' : 'flex-end' }}>
              <div style={message.senderRole === 'patient' ? styles.patientMessage : styles.pharmacistMessage}>
                <p>{message.messageText}</p>
                <p style={{ fontSize: "small", color: "rgba(0, 0, 0, 0.6)" }}>
      {new Date(message.timeDate).toLocaleTimeString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </p>
              </div>
            </div>
          ))}
        </Paper>

        {/* Message Input and Send Button */}
        <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem", maxWidth: "800px" }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                variant="outlined"
                label="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                fullWidth
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </PatientHeader>
  );
};
export default ChatPage;
