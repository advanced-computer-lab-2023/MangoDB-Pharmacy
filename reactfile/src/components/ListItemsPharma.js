// PharmacistListItems.js
import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat"; 

// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const pharmacistListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

    
    <ListItemButton component={Link} to="/viewMedsPharma">
      <ListItemIcon>
        <LocalPharmacyIcon />
      </ListItemIcon>
      <ListItemText primary="View Medicines" />
    </ListItemButton>

    <ListItemButton component={Link} to="/sales">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="View Sales" />
    </ListItemButton>
    <ListItemButton component={Link} to="/walletPharma">
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary= "Wallet" />
    </ListItemButton>

    <ListItemButton component={Link} to="/changePasswordPharmacist">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Change Password" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/pharmacistChatDoctor">
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Chats With Doctors" />
    </ListItemButton>

    <ListItemButton component={Link} to="/viewPatientChats">
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Patient Chats" />
    </ListItemButton>

    <ListItemButton component={Link} to="/viewprofile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);
