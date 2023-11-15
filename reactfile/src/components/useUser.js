import React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUser } from '../App';

export const mainListItems = (
  <React.Fragment>
    {/* ... */}
    <ListItemButton component={Link} to={`/cart/${useUser()?._id}`}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="View Cart" />
    </ListItemButton>
    {/* ... */}
  </React.Fragment>
);