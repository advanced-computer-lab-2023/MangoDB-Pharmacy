import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { getPatientbyId, getChatPharmaPat, sendMessagePharma } from "../services/api";
import { useParams } from 'react-router-dom';

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

  return (
    <Grid container>
      {/* App Bar with Name */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{patient.firstName}</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "1rem", minHeight: "60vh" }}>
          {/* Display Messages */}
          {messages.map((message) => (
            <div key={message._id}>
              <p>{message.senderRole === 'pharmacist' ? 'You' : 'Patient'}:</p>
              <p>{message.messageText}</p>
              <p>{new Date(message.timeDate).toLocaleString()}</p>
            </div>
          ))}
        </Paper>
      </Grid>

      {/* Message Input and Send Button */}
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem" }}>
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
  );
};

export default ChatPage;
