import React from "react";
import { Paper, Typography, Grid, Button, Box } from "@mui/material";
import PatienttHeader from "./PatientHeader";
import { useNavigate } from "react-router-dom";

// Import your icons
const Icon1 = `${process.env.PUBLIC_URL}/icons/profile.svg`;
const Icon2 = `${process.env.PUBLIC_URL}/icons/pharmacy.svg`;
const Icon3 = `${process.env.PUBLIC_URL}/icons/cart.svg`;
const Icon4 = `${process.env.PUBLIC_URL}/icons/chat.svg`;
const Icon5 = `${process.env.PUBLIC_URL}/icons/orders.svg`;
const Icon6 = `${process.env.PUBLIC_URL}/icons/wallet.svg`;



const Dashboard = () => {
  // Define your data
  const navigate = useNavigate();
  const papers = [
    {
      icon: Icon1,
      title: "Change Password",
      description: "Edit Password",
      cta: "View",
    },
    {
      icon: Icon2,
      title: "Pharmacy",
      description: "View all meds",
      cta: "View",
    },
    {
      icon: Icon3,
      title: "Cart",
      description: "Add, Edit , Checkout cart",
      cta: "View",
    },
    {
      icon: Icon4,
      title: "Chat",
      description: "Chat with doctors",
      cta: "Chat",
    },
    {
      icon: Icon5,
      title: "Orders",
      description: "View past and upcoming orders",
      cta: "View",
    },
    {
      icon: Icon6,
      title: "Wallet",
      description: "View wallet balance",
      cta: "View",
    },
  ];

  return (
     <PatienttHeader>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ p: 2, width: 1200, height: 600, pl: 5 ,marginBottom:'10rem', marginLeft: "14rem" }} >
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
      navigate("/changePasswordPatient");
    } else if (index === 1) {
      navigate("/viewMeds");
    } else if (index === 2) {
      navigate("/cart");
    } else if (index === 3) {
      navigate("/newChat");
    } else if (index === 4) {
      navigate("/order");
    } else if (index === 5) {
      navigate("/wallet");
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
    </PatienttHeader>
  );
};

export default Dashboard;
