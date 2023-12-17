import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { viewWallet } from '../services/api';
import { useParams } from 'react-router-dom';
import { alpha } from "@mui/system";
import PatienttHeader from '../components/PatientHeader';

const WalletPage = () => {
    const [wallet, setWallet] = useState(null);
  
    useEffect(() => {
      const fetchWallet = async () => {
        try {
          const response = await viewWallet();
          setWallet(response.data);
        } catch (error) {
          console.error('Error fetching wallet:', error);
        }
      };
  
      fetchWallet();
    }, []);
  
    const renderModifiedAmount = (amount, type) => {
      if (type === "order payment") {
        return <span style={{ color: 'red' }}>-{amount}</span>;
      } else if (type === "order canceled") {
        return <span style={{ color: 'green' }}>+{amount}</span>;
      } else {
        return amount;
      }
    };
  
    return (
        <PatienttHeader>
      <Grid container spacing={3} style={{ paddingLeft: '15rem' }}>
        <Grid item xs={12} paddingTop = "30" >
          
          <Typography variant="h3">Wallet Details</Typography>
        </Grid>
        {wallet && (
          <>
            <Grid item xs={12} >
              <Paper elevation={3}  sx={{ width: '70%'  }} >
                <Typography variant="h5" style={{ padding: "10px" }} >Balance: {wallet.balance}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ width: '100%' }}>
              <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead sx={{ backgroundColor: alpha("#A2E4F5", 0.3) }}>
                    
                      <TableRow>
                      <TableCell><Typography variant='subtitle1' fontWeight='bold'>Date</Typography></TableCell>
                      <TableCell><Typography variant='subtitle1' fontWeight='bold'>Amount</Typography></TableCell>
                      <TableCell><Typography variant='subtitle1' fontWeight='bold'>Type</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wallet.transactions.map((transaction) => (
                        <TableRow key={transaction.date}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            {renderModifiedAmount(transaction.amount, transaction.type)}
                          </TableCell>
                          <TableCell>{transaction.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
      </PatienttHeader>
    );
  };

export default WalletPage;