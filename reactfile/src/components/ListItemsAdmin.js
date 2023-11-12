import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import TodayIcon from '@mui/icons-material/Today';
import PeopleIcon from '@mui/icons-material/People';
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
    

    <ListItemButton component={Link} to="/viewprofile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);