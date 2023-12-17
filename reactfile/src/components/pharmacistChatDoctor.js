import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { getAllDoctors, createChat2, viewChats2, getChat } from "../services/api";
import { mainListItems } from '../components/ListItems';
import { useNavigate } from 'react-router-dom';

const PharmacistChatDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [pharmacistChats, setPharmacistChats] = useState([]);
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

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {mainListItems} */}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          PHARMACIST CHAT WITH DOCTORS
        </Typography>

        {/* Display Doctor Dropdown */}
        <FormControl fullWidth margin="normal" sx={{ minWidth: 200 }}>
          <InputLabel id="doctorLabel">Select Doctor</InputLabel>
          <Select
            labelId="doctorLabel"
            id="doctor"
            value={selectedDoctor}
            onChange={handleDoctorChange}
          >
            <MenuItem value="">Select a Doctor</MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor._id} value={doctor._id}>
                <Button onClick={() => handleCreateChat(doctor)} style={{ color: "black" }}>
                  {`${doctor.firstName} ${doctor.lastName}`}
                </Button>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Display Pharmacist's Chats */}
        <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
          Your Chats
        </Typography>
        {pharmacistChats.map((chat) => (
          <Paper key={chat._id} style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
           onClick={() => handleChatClick(chat.doctor.id)}>
            <div>
              <Typography variant="h6">{`${chat.doctor.firstName} ${chat.doctor.lastName}`}</Typography>
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

export default PharmacistChatDoctor;
