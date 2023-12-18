import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { getAllDoctors, createChat2, viewChats2 } from "../services/api";
import { pharmacistListItems } from '../components/ListItemsPharma';
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import PharmacistHeader from "../components/PharmacistHeader";

const PharmacistChatDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [pharmacistChats, setPharmacistChats] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDoctors()
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });

    // Fetch pharmacist's chats when the component mounts
    viewChats2()
      .then((response) => {
        setPharmacistChats(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleCreateChat = (doctor) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(doctor);

    createChat2(doctor.firstName, doctor.lastName)
      .then(() => {
        navigate(`/chat2/${doctor._id}`);
      })
      .catch((error) => {
        console.error("Error creating chat:", error.message);
      });
  };

  const handleChatClick = (doctorId) => {
    navigate(`/chat2/${doctorId}`);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <PharmacistHeader>
    <Grid container>
      {/* Sidebar */}
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        lg={2}
        xl={2}
        style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}
      >
       
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
        {/* Display Chat Button */}
        <IconButton
          aria-label="new-chat"
          onClick={handleMenuClick}
          style={{
            backgroundColor: "#2196f3", // Blue color for the button
            color: "#fff", // White color for the text
            borderRadius: "50%", // Make it a circle
            marginRight: "1rem", // Add margin for spacing
            marginTop: "1rem"
          }}
        >
          <AddIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom >
          New Chat
        </Typography>

        {/* Display Doctor Dropdown */}
        <Menu
          id="doctor-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>Select a Doctor</MenuItem>
          {doctors.map((doctor) => (
            <MenuItem key={doctor._id} onClick={() => handleCreateChat(doctor)}>
              {`${doctor.firstName} ${doctor.lastName}`}
            </MenuItem>
          ))}
        </Menu>

        {/* Display Pharmacist's Chats */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Your Doctor Chats
        </Typography>
        {pharmacistChats.map((chat) => (
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
            onClick={() => handleChatClick(chat.doctor.id)}
          >
            <div>
              <Typography variant="h5">{`${chat.doctor.firstName} ${chat.doctor.lastName}`}</Typography>
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
    </PharmacistHeader>
  );
};

export default PharmacistChatDoctor;
