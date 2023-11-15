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

    <ListItemButton href='/admin'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary='Home' />
    </ListItemButton>

    <ListItemButton href='/admin/requested-doctors'>
      <ListItemIcon>
        <VaccinesIcon />
      </ListItemIcon>
      <ListItemText primary='Requested Doctors' />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary='User Management' />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LocalHospitalIcon />
      </ListItemIcon>
      <ListItemText primary='Health Packages' />
    </ListItemButton>
  </React.Fragment>
);