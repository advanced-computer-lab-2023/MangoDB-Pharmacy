import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from "@mui/icons-material/People";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import TodayIcon from '@mui/icons-material/Today';
// import LayersIcon from '@mui/icons-material/Layers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const AdminListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>



    
    <ListItemButton component={Link} to="/viewMedsAdmin">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="View Medicines" />
    </ListItemButton>


    <ListItemButton component={Link} to="/salesAdmin">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="View Sales" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/viewPatients">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="View Patients" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewPharmacists">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="View Pharmacists" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/requestedPharma">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Requested Pharmacists" />
    </ListItemButton>

    <ListItemButton component={Link} to="/changePasswordAdmin">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Change Password" />
    </ListItemButton>

  </React.Fragment>
);



