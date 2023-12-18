import React from "react";
import { Paper, Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminHeader from '../components/AdminHeader'; 

// Import your icons
const Profile = `${process.env.PUBLIC_URL}/icons/profile.svg`;
const Pharmacy = `${process.env.PUBLIC_URL}/icons/pharmacy.svg`;
const Sales = `${process.env.PUBLIC_URL}/icons/orders.svg`;
const addMember = `${process.env.PUBLIC_URL}/icons/addMember.svg`;
const remove = `${process.env.PUBLIC_URL}/icons/remove.svg`;
const Requests = `${process.env.PUBLIC_URL}/icons/ticket.svg`;

const DashboardAdmin = () => {
  // Define your data
  const navigate = useNavigate();
  const papers = [
    {
      icon: Profile,
      title: "Profile",
      description: "View/Edit Profile",
      cta: "View",
    },
    {
      icon: Pharmacy,
      title: "Pharmacy",
      description: "View all meds",
      cta: "View",
    },
    {
      icon: Sales,
      title: "Sales",
      description: "View sales report of meds",
      cta: "View",
    },
    {
      icon: addMember,
      title: "Add admin",
      description: "Add an admin to the system",
      cta: "Add",
    },
    {
      icon: remove,
      title: "Remove users",
      description: "Remove patient/pharmacist",
      cta: "Remove",
    },
    {
      icon: Requests,
      title: "Requests",
      description: "View requests of pharmacists",
      cta: "View",
    },
  ];

  return (
    <AdminHeader>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        paddingLeft: "14%",
        paddingUp: "100%", 
      }}
    >
      <Paper sx={{ p: 2, width: 1200, height: 600, pl: 5, marginBottom:'10rem' }}>
        <Typography variant="h2" align="left" sx={{ pb: 10, pl: 4, pt: 5 }}>
          Dashboard
        </Typography>
        <Grid container spacing={5}>
          {papers.map((paper, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Paper
                sx={{
                  p: 2,

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 250,
                  m: 3,
                }}
              >
                <img
                  src={paper.icon}
                  alt={paper.title}
                  width="40"
                  height="40"
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {paper.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ pb: -1 }}
                >
                  {paper.description}
                </Typography>
                <Button 
  variant="contained" 
  color="primary"
  onClick={() => {
    if (index === 0) {
      navigate("/profile");
    } else if (index === 1) {
      navigate("/viewMedsAdmin");
    } else if (index === 2) {
      navigate("/salesAdmin");
    } else if (index === 3) {
      navigate("/addadmin");
    } else if (index === 4) {
      navigate("/removeUsers");
    } else if (index === 5) {
      navigate("/requestedPharma");
    }
  }}
>
  {paper.cta}
</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
    </AdminHeader>
  );
};

export default DashboardAdmin;
