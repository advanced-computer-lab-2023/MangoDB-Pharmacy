import React from "react";
import { Paper, Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PharmacistHeader from '../components/PharmacistHeader';
// Import your icons
const Icon1 = `${process.env.PUBLIC_URL}/icons/profile.svg`;
const Icon2 = `${process.env.PUBLIC_URL}/icons/pharmacy.svg`;
const Icon3 = `${process.env.PUBLIC_URL}/icons/add.svg`;
const Icon4 = `${process.env.PUBLIC_URL}/icons/chat.svg`;
const Icon5 = `${process.env.PUBLIC_URL}/icons/orders.svg`;
const Icon6 = `${process.env.PUBLIC_URL}/icons/wallet.svg`;

const DashboardPharma = () => {
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
      title: "Add Medicine",
      description: "Add medicine to pharmacy",
      cta: "Add",
    },
    {
      icon: Icon4,
      title: "Chat",
      description: "Chat with doctors",
      cta: "Chat",
    },
    {
      icon: Icon5,
      title: "Sales",
      description: "View sales report of meds",
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
    <PharmacistHeader>
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
      <Paper sx={{ p: 2, width: 1200, height: 600, pl: 5 ,marginBottom:'10rem'}}>
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
      navigate("/changePasswordPharmacist");
    } else if (index === 1) {
      navigate("/viewMedsPharma");
    } else if (index === 2) {
      navigate("/addMed");
    } else if (index === 3) {
      navigate("/newChat");
    } else if (index === 4) {
      navigate("/sales");
    } else if (index === 5) {
      navigate("/walletPharma");
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
    </PharmacistHeader>
  );
};

export default DashboardPharma;
