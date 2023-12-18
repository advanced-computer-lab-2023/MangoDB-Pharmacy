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

export const AdminHeader = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { name, lastName, initials } = userData;

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
  const PersonIcon = `${process.env.PUBLIC_URL}/icons/person.svg`;
  const AddAdminIcon = `${process.env.PUBLIC_URL}/icons/add.svg`;
  const RemoveUserIcon = `${process.env.PUBLIC_URL}/icons/remove.svg`;
  const UserInfoIcon = `${process.env.PUBLIC_URL}/icons/info.svg`;
  const RequestsIcon = `${process.env.PUBLIC_URL}/icons/ticket.svg`;
  const PharmacistRegistrationIcon = `${process.env.PUBLIC_URL}/icons/pharmacist.svg`;
  const PatientRegistrationIcon = `${process.env.PUBLIC_URL}/icons/patient.svg`;
  const PharmacyIcon = `${process.env.PUBLIC_URL}/icons/meds.svg`;
  const SettingsIcon = `${process.env.PUBLIC_URL}/icons/settings.svg`;
  const LogoutIcon = `${process.env.PUBLIC_URL}/icons/logout.svg`;
  const ChartIcon = `${process.env.PUBLIC_URL}/icons/chart.svg`;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
        position: "relative",
        height: "100%",
      }}
    >
      <Box
        sx={{
          mt: 6,
          mb: 3,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "flex-end",
        }}
        onClick={handleDrawerClose}
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
        <ListItem
          button
          sx={{ pt: 0, pb: 1 }}
          component={Link}
          to="/DashboardAdmin"
        >
          <ListItemIcon>
            <img
              src={DashboardIcon}
              style={{ width: 30, height: 30 }}
              alt="Dashboard"
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Accordion
          sx={{
            boxShadow: "none",
            "&.Mui-expanded": { margin: 0 },
            "& .MuiAccordionDetails-root": {
              padding: "0 16px 0px",
            },
            border: "none",
            "&:before": {
              display: "none",
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
              <ListItem
                button
                sx={{ padding: "0px 16px" }}
                component={Link}
                to="/addadmin"
              >
                <ListItemIcon>
                  <img
                    src={AddAdminIcon}
                    style={{ width: 25, height: 25 }}
                    alt="Add Admin"
                  />
                </ListItemIcon>
                <ListItemText primary="Add Admin" />
              </ListItem>
              <ListItem
                button
                sx={{ pb: 1 }}
                component={Link}
                to="/removeUsers"
              >
                <ListItemIcon>
                  <img
                    src={RemoveUserIcon}
                    style={{ width: 25, height: 25 }}
                    alt="Remove User"
                  />
                </ListItemIcon>
                <ListItemText primary="Remove User" />
              </ListItem>

              <ListItem
                button
                sx={{ pb: 0 }}
                component={Link}
                to="/viewPatients"
              >
                <ListItemIcon>
                  <img
                    src={PatientRegistrationIcon}
                    alt="Patients"
                    style={{ width: 30, height: 30 }}
                  />
                </ListItemIcon>
                <ListItemText primary="View Patients" />
              </ListItem>
              <ListItem
                button
                sx={{ pb: 0 }}
                component={Link}
                to="/viewPharmacists"
              >
                <ListItemIcon>
                  <img
                    src={PharmacistRegistrationIcon}
                    alt="Pharmacists"
                    style={{ width: 30, height: 30 }}
                  />
                </ListItemIcon>
                <ListItemText primary="View Pharmacists" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Added Sales list item */}

        <Accordion
          sx={{
            boxShadow: "none",
            "&.Mui-expanded": { margin: 0 },
            "& .MuiAccordionDetails-root": {
              padding: "0 16px 0px",
            },
            border: "none",
            "&:before": {
              display: "none",
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
                src={RequestsIcon}
                alt="Requests"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <Typography>Requests</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0 16px 0px" }}>
            <List sx={{ padding: "0px" }}>
              <ListItem
                button
                sx={{ pb: 1 }}
                component={Link}
                to="/requestedPharma"
              >
                <ListItemIcon>
                  <img
                    src={PharmacistRegistrationIcon}
                    alt="Pharmacist Registration"
                    style={{ width: 30, height: 30 }}
                  />
                </ListItemIcon>
                <ListItemText primary="Pharmacist Registration" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <List sx={{ padding: "0px" }}>
          <ListItem button sx={{ pb: 0 }} component={Link} to="/viewMedsAdmin">
            <ListItemIcon>
              <img
                src={PharmacyIcon}
                alt="Pharmacy"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="Pharmacy" />
          </ListItem>
         
        </List>
        <List sx={{ padding: "0px" }}>
          <ListItem button sx={{ pb: 0 }} component={Link} to="/salesAdmin">
            <ListItemIcon>
              <img
                src={ChartIcon}
                alt="Chart"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItem>
        </List>
      </List>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {logoutBottomListItem}
      </Box>
    </Box>
  );

  const logoutListItem = (
    <ListItem button onClick={handleLogout} sx={{ mb: 0 }}>
      <ListItemIcon>
        <img src={LogoutIcon} alt="Logout" style={{ width: 30, height: 30 }} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );

  const logoutBottomListItem = (
    <ListItem button onClick={handleLogout} sx={{ mb: 5, padding: "5px 16px" }}>
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
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
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
          <Avatar sx={{ marginRight: 1 }}>{initials}</Avatar>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginRight: -1, color: "#333" }}
          >
            {name} {lastName}
          </Typography>
          <IconButton
            onClick={() => setOpenProfileDrawer(!openProfileDrawer)}
            sx={{ mr: "12px" }}
          >
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
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            zIndex: (theme) => theme.zIndex.drawer - 1,
            height: "18%",
            width: "15%",
          },
        }}
        variant="persistent"
      >
        <List sx={{ mt: 12 }}>
          {" "}
          {/* Add a top margin to the List */}
          <ListItem button>
            <ListItemIcon>
              <img
                src={ProfileIcon}
                alt="Profile"
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
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
      <Box sx={{ paddingLeft: "2rem" }}>{children}</Box>
    </Box>
  );
};

export default AdminHeader; // Make sure to export the component as default
