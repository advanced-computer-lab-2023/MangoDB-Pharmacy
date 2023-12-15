import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { getDoctorbyId, getChat2, sendMessage2 } from "../services/api";
import { useParams } from 'react-router-dom';

const Chat2 = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("heyyyyyy" ,id);
    // Fetch doctor details
    getDoctorbyId(id)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch chat messages when component mounts
    fetchChatMessages(id);

    // Set up interval to fetch messages every 5 seconds
    const intervalId = setInterval(() => {
      fetchChatMessages(id);
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [id]);

  const fetchChatMessages = (doctorId) => {
    console.log("heyeyeyeyeyey" + doctorId)
    // Fetch chat messages for the given doctor
    getChat2({ doctorId })
      .then((response) => {
        if (response.messages) {
          setMessages(response.messages);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat messages:", error.message);
      });
  };

  const handleSend = () => {
    // Call the sendMessage function to send a message
    sendMessage2(message, id)
      .then((response) => {
        // Update the state with the sent message
        setMessages((prevMessages) => [...prevMessages, response.data]);
        // Clear the message input
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
          <Typography variant="h6">{doctor.firstName}</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "1rem", minHeight: "60vh" }}>
          {/* Display Messages */}
          {messages.map((message) => (
            <div key={message._id}>
              <p>{message.senderRole === 'pharmacist' ? 'Pharmacist' : 'Doctor'}:</p>
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

export default Chat2;
