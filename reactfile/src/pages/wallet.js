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
        
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Wallet Details</Typography>
        </Grid>
        {wallet && (
          <>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Typography variant="h5">Balance: {wallet.balance}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Typography variant="h5">Transactions:</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Type</TableCell>
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
    );
  };

export default WalletPage;