import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { getPharmacistbyId, getChat, sendMessage } from "../services/api";
import { useParams } from 'react-router-dom';
import PatientHeader from '../components/PatientHeader';

const ChatPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [pharmacist, setPharmacist] = useState([]);
  const [messages, setMessages] = useState([]); // State to store messages
  const [initialScroll, setInitialScroll] = useState(true);

  useEffect(() => {
    // Fetch pharmacist details
    getPharmacistbyId(id)
      .then((response) => {
        setPharmacist(response.data);
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

  useEffect(() => {
    // Scroll to the last message when messages are updated only on initial load
    if (initialScroll) {
      const messagesContainer = document.getElementById('messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        setInitialScroll(false); // Disable automatic scrolling after the initial scroll
      }
    }
  }, [messages, initialScroll]);

  const fetchChatMessages = (pharmacistId) => {
    // Fetch chat messages for the given pharmacist
    getChat({ pharmacistId })
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
    // Call the sendMessage function to send a message
    sendMessage(message, id)
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

  // Define inline styles
  const styles = {
    youMessage: {
      backgroundColor: "#2196f3", // Blue color for "You" messages
      color: "#fff", // White text color
      borderRadius: "8px", // Rounded corners
      padding: "8px", // Padding for better appearance
      marginBottom: "8px", 
      textAlign: "right",
    },
    pharmacistMessage: {
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
    
      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10 }style={{ paddingLeft: "20rem" }}>
        {/* App Bar with Name */}
        <AppBar position="static" style={{ maxWidth: "840px" }}>
          <Toolbar>
            <Typography variant="h6">{pharmacist.firstName} {pharmacist.lastName}</Typography>
          </Toolbar>
        </AppBar>

        {/* Display Messages */}
        <Paper id="messages-container" elevation={3} style={{ padding: "1rem", height: "60vh", overflowY: "auto", width: "100%", maxWidth: "800px" }}>
          {messages.map((message) => (
            <div key={message._id} style={{ display: "flex", flexDirection: "column", alignItems: message.senderRole === 'patient' ? 'flex-end' : 'flex-start' }}>
              <div style={message.senderRole === 'patient' ? styles.youMessage : styles.pharmacistMessage}>
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
