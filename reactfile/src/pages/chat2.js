import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { getDoctorbyId, getChat2, sendMessage2 } from "../services/api";
import { useParams } from 'react-router-dom';
import PharmacistHeader from "../components/PharmacistHeader"; // Import the AdminHeader component

const Chat2 = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [id]);

  const fetchChatMessages = (doctorId) => {
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
  const styles = {
    youMessage: {
      backgroundColor: "#2196f3",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px",
      marginBottom: "8px",
      textAlign: "right",
      maxWidth: "50%",
      marginLeft: "auto", // Move the blue box to the right
    },
    doctorMessage: {
      backgroundColor: "#4caf50",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px",
      marginBottom: "8px",
      textAlign: "left",
      maxWidth: "50%",
      marginRight: "auto", // Move the green box to the left
    },
  
  };

  return (
    <PharmacistHeader>

    <Grid container>
     

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "20rem" }}>
        {/* App Bar with Name */}
        <AppBar position="static" style={{ maxWidth: "840px" }}>
          <Toolbar>
            <Typography variant="h6">{doctor.firstName} {doctor.lastName} </Typography>
          </Toolbar>
        </AppBar>

        <Grid item xs={12}>
        <Paper id="messages-container" elevation={3} style={{ padding: "1rem", height: "60vh", overflowY: "auto", width: "100%", maxWidth: "800px" }}>
        {messages.map((message) => (
  <div key={message._id} style={message.senderRole === 'pharmacist' ? styles.youMessage : styles.doctorMessage}>
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
))}
          </Paper>
        </Grid>

        {/* Message Input and Send Button */}
        <Grid item xs={12}>
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
    </Grid>
    </PharmacistHeader>

  );
};

export default Chat2;
