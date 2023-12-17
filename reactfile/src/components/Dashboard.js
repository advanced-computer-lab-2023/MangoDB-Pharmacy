import React from "react";
import { Paper, Typography, Grid, Button, Box } from "@mui/material";

// Import your icons
const Icon1 = `${process.env.PUBLIC_URL}/icons/profile.svg`;
const Icon2 = `${process.env.PUBLIC_URL}/icons/pharmacy.svg`;
const Icon3 = `${process.env.PUBLIC_URL}/icons/cart.svg`;
const Icon4 = `${process.env.PUBLIC_URL}/icons/chat.svg`;
const Icon5 = `${process.env.PUBLIC_URL}/icons/orders.svg`;
const Icon6 = `${process.env.PUBLIC_URL}/icons/wallet.svg`;

const Dashboard = () => {
  // Define your data
  const papers = [
    {
      icon: Icon1,
      title: "Profile",
      description: "View/Edit Profile",
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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {/* <DoctorsTable /> */}
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {/* <Deposits /> */}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* <Orders /> */}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
