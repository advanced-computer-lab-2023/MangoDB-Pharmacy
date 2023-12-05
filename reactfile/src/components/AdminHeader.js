import * as React from "react";
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

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

// import { ReactComponent as MenuIcon } from "../../public/icons/menu.svg";
// import { ReactComponent as Logo } from "../public/icons/pharmacyLogo.svg"; // replace with your actual path

export default function AdminHeader() {
  const [open, setOpen] = React.useState(false);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
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
              sx={{ color: "#fff", ml: 2, fontWeight: "bold", scale: "110%" }}
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
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                ml: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="p"
                fontSize={"1.3rem"}
                sx={{ color: "#064a5c", fontWeight: "medium" }}
              >
                Welcome,
              </Typography>
              <Typography
                variant="p"
                fontSize={"1.3rem"}
                sx={{ color: "#fff", fontWeight: "bold", pl: 1 }}
              >
                Admin
              </Typography>
            </Box>

            <Box sx={{ ml: 2, mr: 3 }}>
              <Avatar
                alt="Profile Picture"
                src={process.env.PUBLIC_URL + "/icons/pp1.png"}
                sx={{ width: 45, height: 45, border: "4px solid #15678D" }}
              />
            </Box>
          </Box>
        </Toolbar>

        <Drawer
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            width: "250px",
            flexShrink: 0,
            "& .MuiPaper-root": {
              borderRadius: "0 16px 16px 0",
            },
          }}
        >
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
                display: "flex",
                mt: 3,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4" sx={{ color: "#108cc6", ml: 1 }}>
                Menu
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer", // This will change the cursor to a pointer when hovering over the text and icon
                }}
                onClick={handleDrawerClose} // This will make the text do the same function as the icon
              >
                <IconButton sx={{ mr: 1, ml: 0 }}>
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
                    Close menu
                  </Typography>
                </IconButton>
              </Box>
            </Box>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <img
                    src={DashboardIcon}
                    style={{ width: 30, height: 30 }}
                    alt="Dashboard"
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img
                    src={ProfileIcon}
                    style={{ width: 30, height: 30 }}
                    alt="Profile"
                  />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <Accordion
                sx={{
                  boxShadow: "none",
                  "&.Mui-expanded": { margin: 0 },
                  "& .MuiAccordionDetails-root": {
                    padding: "0 16px 4px",
                  },
                  border: "none",
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
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={AddAdminIcon}
                          style={{ width: 25, height: 25 }}
                          alt="Add Admin"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Add Admin" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={RemoveUserIcon}
                          style={{ width: 25, height: 25 }}
                          alt="Remove User"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Remove User" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <img
                          src={UserInfoIcon}
                          style={{ width: 25, height: 25 }}
                          alt="Users Info"
                        />
                      </ListItemIcon>
                      <ListItemText sx={{ mb: 0 }} primary="Users Info" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </List>
            <Accordion
              sx={{
                boxShadow: "none", // This will remove the shadow
                "&.Mui-expanded": { margin: 0 },
                "& .MuiAccordionDetails-root": {
                  padding: "0 16px 8px", // This will reduce the space when the accordion expands
                },
                border: "none",
                borderTop: "none", // This will remove the top border
                borderBottom: "none", // This will remove the border
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
              <AccordionDetails sx={{ padding: "0 16px" }}>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <img
                        src={PharmacistRegistrationIcon}
                        alt="Pharmacist Registration"
                        style={{ width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Pharmacist Registration" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <img
                        src={PatientRegistrationIcon}
                        alt="Patient Registration"
                        style={{ width: 30, height: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Patient Registration" />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <img
                    src={PharmacyIcon}
                    alt="Pharmacy"
                    style={{ width: 30, height: 30 }}
                  />
                </ListItemIcon>
                <ListItemText primary="Pharmacy" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img
                    src={SettingsIcon}
                    alt="Settings"
                    style={{ width: 30, height: 30 }}
                  />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
            <Box
              sx={{
                position: "absolute", // This will take your logout button out of the normal flow
                bottom: 0, // This will position your logout button at the bottom of the box
                width: "100%", // This will make your logout button take up the full width of the box
              }}
            >
              <ListItem button sx={{ mb: 5 }}>
                <ListItemIcon>
                  <img
                    src={LogoutIcon}
                    alt="Logout"
                    style={{ width: 30, height: 30 }}
                  />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Box>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
}
