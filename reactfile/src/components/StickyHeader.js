import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function StickyHeader() {
  const [open, setOpen] = React.useState(false);

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Company Logo
          </Typography>

          <Avatar
            alt="Profile Picture"
            src={process.env.PUBLIC_URL + "/images/pp.png"}
            sx={{ width: 45, height: 45 }}
            padding="0rem3rem"
          />
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
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h4" sx={{ color: "#108cc6" }}>
              Menu
            </Typography>
            <List>
              <ListItem button>
                <ListItemText primary="Section 1" />
              </ListItem>
              <Accordion
                sx={{ boxShadow: "none", "&.Mui-expanded": { margin: 0 } }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ padding: "0 16px" }}
                >
                  <Typography>Section 2</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0 16px" }}>
                  <List>
                    <ListItem button>
                      <ListItemText primary="Page 1" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Page 2" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
}
