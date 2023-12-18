import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Menu,
} from "@mui/material";
import { getAllPharmacists, createChat, viewChats,getChat } from "../services/api";
import { mainListItems } from '../components/ListItems';
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import PatienttHeader from "../components/PatientHeader";

const NewChat = () => {
    const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState("");
  const [patientChats, setPatientChats] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isNewChatClicked, setNewChatClicked] = useState(false); // Add state to track if new chat button is clicked
  const navigate = useNavigate();
{/* Display Patient's Chats */}
<Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
  Your Chats
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
    onClick={() => handleChatClick(chat.pharma.id)}
  >
    <div>
      <Typography variant="h5">
        {`${chat.pharma.firstName} ${chat.pharma.lastName}`}
      </Typography>
      <Typography>{chat.lastMessage.messageText}</Typography>
    </div>
    <div style={{ marginBottom: "8px" }}>
      {/* Displaying the last message's timestamp in the desired format */}
      {chat.lastMessage.timeDate && (
        <Typography>
          {new Date(chat.lastMessage.timeDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}{" "}
          {new Date(chat.lastMessage.timeDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
      )}
    </div>
  </Paper>
))}

  const newChatButtonStyle = {
    backgroundColor: "#2196f3", // Blue color for the button
    color: "#fff", // White color for the text
    borderRadius: "50%", // Make it a circle
    marginLeft: "auto", // Move the button to the right
  };

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <PatienttHeader>
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {mainListItems} */}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        {/* Display Chat Button */}
        <IconButton
          style={newChatButtonStyle}
          aria-label="new-chat"
          onClick={handleMenuClick}
        >
          <AddIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          New Chat
        </Typography>

        {/* Display Pharmacist Dropdown */}
        <Menu
          id="new-chat-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>Select a Pharmacist</MenuItem>
          {pharmacists.map((pharmacist) => (
            <MenuItem key={pharmacist._id} onClick={() => handleCreateChat(pharmacist)}>
              {`${pharmacist.firstName} ${pharmacist.lastName}`}
            </MenuItem>
          ))}
        </Menu>

       {/* Display Patient's Chats */}
<Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
  Your Chats With Pharmacists
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
    onClick={() => handleChatClick(chat.pharma.id)}
  >
    <div>
      <Typography variant="h5">
        {`${chat.pharma.firstName} ${chat.pharma.lastName}`}
      </Typography>
      <Typography>{chat.lastMessage.messageText}</Typography>
    </div>
    <div>
      {/* Displaying the last message's timestamp in the desired format */}
      {chat.lastMessage.timeDate && (
        <Typography>
          {new Date(chat.lastMessage.timeDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}{" "}
          {new Date(chat.lastMessage.timeDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
      )}
    </div>
  </Paper>
))}
      </Grid>
    </Grid>
    </PatienttHeader>
  );
};

export default NewChat;
