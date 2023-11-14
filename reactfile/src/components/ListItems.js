import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ReceiptIcon from '@mui/icons-material/Receipt';
// import { useParams } from 'react-router-dom';

import TodayIcon from '@mui/icons-material/Today';
import PeopleIcon from '@mui/icons-material/People';
// import LayersIcon from '@mui/icons-material/Layers';
import MedicationIcon from '@mui/icons-material/Medication';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewdoctors">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewappointments">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewprescriptions">
      <ListItemIcon>
        <MedicationIcon />
      </ListItemIcon>
      <ListItemText primary="Prescriptions" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewpackages">
      <ListItemIcon>
        <LoyaltyIcon />
      </ListItemIcon>
      <ListItemText primary="Packages" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewwallet">
      <ListItemIcon>
        <WalletIcon />
        
      </ListItemIcon>
      <ListItemText primary="Wallet" />
    </ListItemButton>

    <ListItemButton component={Link} to={"/viewMeds"}>
    <ListItemIcon>
    <LocalPharmacyIcon />
  </ListItemIcon>

      <ListItemText primary="Pharmacy" />
    </ListItemButton>



    <ListItemButton component={Link} to={`/cart/65538d9e4617ffa5e6fd6b7a`}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="View Cart" />
    </ListItemButton>

    <ListItemButton component={Link} to="/order">
    <ListItemIcon>
   <ReceiptIcon /> 
</ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>

    <ListItemButton component={Link} to="/viewprofile">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);