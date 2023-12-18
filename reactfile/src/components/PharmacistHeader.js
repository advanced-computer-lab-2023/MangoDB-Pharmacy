import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
export const PharmacistHeader = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const {  name, lastName, initials } = userData;

  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const [open, setOpen] = useState(true);


  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("token");

    // Redirect to the homepage
    navigate("/");
  };

  const MenuIcon = `${process.env.PUBLIC_URL}/icons/menu.svg`;
  const Logo = `${process.env.PUBLIC_URL}/icons/pharmacyLogo2.svg`;
  const Close = `${process.env.PUBLIC_URL}/icons/reject.svg`;
  const DashboardIcon = `${process.env.PUBLIC_URL}/icons/dashboard.svg`;
  const ProfileIcon = `${process.env.PUBLIC_URL}/icons/profile.svg`;
  const chatIcon = `${process.env.PUBLIC_URL}/icons/chat.svg`;
  const patientIcon = `${process.env.PUBLIC_URL}/icons/patient.svg`;
  const ReportsIcon = `${process.env.PUBLIC_URL}/icons/chart.svg`;
  const DoctorIcon = `${process.env.PUBLIC_URL}/icons/doctor.svg`;
  const pharmacyIcon = `${process.env.PUBLIC_URL}/icons/pharmacy.svg`;
  const WalletIcon = `${process.env.PUBLIC_URL}/icons/pharmacist.svg`;
  const profileIcon = `${process.env.PUBLIC_URL}/icons/profile.svg`;
  const PharmacyIcon = `${process.env.PUBLIC_URL}/icons/meds.svg`;
  const SettingsIcon = `${process.env.PUBLIC_URL}/icons/settings.svg`;
  const LogoutIcon = `${process.env.PUBLIC_URL}/icons/logout.svg`;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const logoutListItem = (
    <ListItem button onClick={handleLogout} sx={{ mb: 0 }}>
      <ListItemIcon>
        <img src={LogoutIcon} alt="Logout" style={{ width: 30, height: 30 }} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const list = () => (
    <Box
    sx={{
      width: "250px",
      p: 2,
      mt: 3,
      display: "flex",
      flexDirection: "column",
      position: "relative", // This will make your box a relative container
      height: "100%", // This will make your box take up the full height of the drawer
    }}
  >
    <Box
      sx={{
        mt: 6, // Adjust this value to position the button below the AppBar
        mb: 3,
        display: "flex",
        alignItems: "center", // This will align the items vertically
        cursor: "pointer", // This will change the cursor to a pointer when hovering over the text and icon
        justifyContent: "flex-end", // This will move the button to the right
      }}
      onClick={handleDrawerClose} // This will make the text do the same function as the icon
    >
      <IconButton sx={{ mr: 1, ml: 0, mt: 2 }}>
        <img
          src={Close}
          alt="Close"
          sx={{ mr: 3, ml: 0 }}
          style={{ width: 15, height: 15, color: "grey" }}
        />
        <Typography
          variant="body2"
          sx={{
            ml: 0.5,
            mr: 1,
            color: "grey",
            fontWeight: "bold",
          }}
        >
          Hide menu
        </Typography>
      </IconButton>
    </Box>

    <List sx={{ p: 0 }}>
    <ListItem button sx={{ pt: 0, pb: 1 }} component={Link} to="/DashboardPharma">
    <ListItemIcon>
      <img
        src={DashboardIcon}
        style={{ width: 30, height: 30 }}
        alt="Dashboard"
      />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
    </ListItem>

      

      <ListItem button sx={{ pt: 0, pb: 1 }}component={Link} to="/viewMedsPharma">
        <ListItemIcon>
          <img
            src={pharmacyIcon}
            style={{ width: 30, height: 30 }}
            alt="pharmacy"
          />
        </ListItemIcon>
        <ListItemText primary="Pharmacy" />
      </ListItem>


      {/* <Accordion
        sx={{
          boxShadow: "none",
          "&.Mui-expanded": { margin: 0 },
          "& .MuiAccordionDetails-root": {
            padding: "0 16px 0px",
          },
          border: "none",
          "&:before": {
            // This targets the pseudo-element that creates the line
            display: "none", // This removes the line
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ padding: "0 16px", border: 0 }}
        >
          <ListItemIcon>
            <img
              src={PersonIcon}
              style={{ width: 28, height: 28 }}
              alt="Manage Users"
            />
          </ListItemIcon>
          <Typography>Manage Users</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: "0 16px", alignItems: "center", border: 0 }}
        >
          <List sx={{ padding: "0px" }}>
            <ListItem button sx={{ padding: "0px 16px" }}>
              <ListItemIcon>
                <img
                  src={AddAdminIcon}
                  style={{ width: 25, height: 25 }}
                  alt="Add Admin"
                />
              </ListItemIcon>
              <ListItemText primary="Add Admin" />
            </ListItem>
            <ListItem button sx={{ pb: 1 }}>
              <ListItemIcon>
                <img
                  src={RemoveUserIcon}
                  style={{ width: 25, height: 25 }}
                  alt="Remove User"
                />
              </ListItemIcon>
              <ListItemText primary="Remove User" />
            </ListItem>
            
            <ListItem button sx={{ pb: 0 }} component={Link} to="/viewPatients">
            <ListItemIcon>
              <img
                src={PatientRegistrationIcon}
                alt="Patients"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="View Patients" />
          </ListItem>
          <ListItem button sx={{ pb: 0 }} component={Link} to="/viewPharmacists">
            <ListItemIcon>
              <img
                src={PharmacistRegistrationIcon}
                alt="Pharmacists"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="View Pharamcists" />
          </ListItem>
          </List>
        </AccordionDetails>
      </Accordion> */}
    </List>
    <Accordion
      sx={{
        boxShadow: "none",
        "&.Mui-expanded": { margin: 0 },
        "& .MuiAccordionDetails-root": {
          padding: "0 16px 0px",
        },
        border: "none",
        "&:before": {
          // This targets the pseudo-element that creates the line
          display: "none", // This removes the line
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ padding: "0 16px", border: 0 }}
      >
        <ListItemIcon>
          <img
            src={chatIcon}
            alt="Chat"
            style={{ width: 30, height: 30 }}
          />
        </ListItemIcon>
        
        <Typography>Chat</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 16px 0px" }}>
        <List sx={{ padding: "0px" }}>
          <ListItem button sx={{ pb: 1 }} component={Link} to="/pharmacistChatDoctor">
            <ListItemIcon>
              <img
                src={DoctorIcon}
                alt="Chat with a Doctor"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="Doctor" />
          </ListItem>

          <ListItem button sx={{ pb: 1 }}component={Link} to="/viewPatientChats">
            <ListItemIcon>
              <img
                src={patientIcon}
                alt="Chat with a Patient"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="Patient" />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>

    <List sx={{ padding: "0px" }}>
      <ListItem button sx={{ pb: 0 }} component={Link} to="/sales">
        <ListItemIcon>
          <img
            src={ReportsIcon}
            alt="Report a problem"
            style={{ width: 30, height: 30 }}
          />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItem>

      <ListItem button sx={{ pt: 0, pb: 1 }} component={Link} to="/changePasswordPharmacist">
        <ListItemIcon>
          <img
            src={profileIcon}
            style={{ width: 30, height: 30 }}
            alt="Profile"
          />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItem>
      {/* <ListItem button sx={{ pb: 0 }}>
        <ListItemIcon>
          <img
            src={SettingsIcon}
            alt="Settings"
            style={{ width: 30, height: 30 }}
          />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem> */}
    </List>
    <Box
      sx={{
        position: "absolute", // This will take your logout button out of the normal flow
        bottom: 0, // This will position your logout button at the bottom of the box
        width: "100%", // This will make your logout button take up the full width of the box
      }}
    >
      
      <ListItem button sx={{ mb: 5, padding: "5px 16px" }} component={Link} to="/">
        <ListItemIcon>
          <img
            src={LogoutIcon}
            alt="Logout"
            style={{ width: 25, height: 25 }}
            sx={{ pr: -2, mr: -2 }}
          />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  </Box>  );


 

  return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>

   
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 3 }}
            onClick={handleDrawerOpen}
          >
            <img
              src={MenuIcon}
              alt="Menu"
              style={{ width: 30, height: 30, filter: "invert(1)" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                ml: 2,
                fontWeight: "bold",
                scale: "110%",
                marginTop: "3px",
              }}
            >
              Menu
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <img
            src={Logo}
            alt="Logo"
            style={{
              height: 50,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <Typography>{/* User's name */}</Typography>
          <Notifications />
          <Avatar sx={{ marginRight: 1 }}>{initials}</Avatar>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginRight: -1, color: "#333" }}
          >
            {name } {lastName}
          </Typography>      
          <IconButton   onClick={() => setOpenProfileDrawer(!openProfileDrawer)}
            sx={{ mr: "12px" }}>
         
            {openProfileDrawer ? (
              <ArrowDropUpIcon fontSize="large" />
            ) : (
              <ArrowDropDownIcon fontSize="large" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={openProfileDrawer}
        onClose={() => setOpenProfileDrawer(false)}
        onOpen={() => setOpenProfileDrawer(true)}
        anchor="right" // This makes the drawer appear on the right
        sx={{
          "& .MuiDrawer-paper": {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            zIndex: (theme) => theme.zIndex.drawer - 1, // Decrease the z-index of the Drawer
            height: "23%", // Adjust this value to change the height of the drawer
            width: "15%",
          },
        }}
        variant="persistent" // This makes the drawer persistent
      >
        <List sx={{ mt: 12 }}>
         

          <ListItem button component={Link} to="/walletPharma">
            <ListItemIcon>
              <img
                src={WalletIcon}
                alt="Wallet"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="Wallet" />
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginRight: 2, color: "#333" }}
            >
            </Typography>
          </ListItem>

         
          {logoutListItem}
        </List>
      </SwipeableDrawer>

      <SwipeableDrawer
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            zIndex: (theme) => theme.zIndex.drawer - 1,
          },
        }}
        variant="persistent"
      >
        {list()}
      </SwipeableDrawer>
      <Box sx={{ paddingLeft: "2rem" }}>
        {children}
      </Box>
    </Box>
  );
};

export default PharmacistHeader; // Make sure to export the component as default

