import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import PharmacistHeader from '../components/PharmacistHeader';

const WalletPharma = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Dummy data for three rows with different months
    const Transactions = [
      { date: '2023-01-01', amount: 10000, type: 'monthly salary' },
      { date: '2023-02-01', amount: 10000, type: 'monthly salary' },
      { date: '2023-03-01', amount: 10000, type: 'monthly salary' },
    ];

    setWallet({
      balance: 30000, // Total balance for the dummy data
      transactions: Transactions,
    });
  }, []);

  return (
    <PharmacistHeader>
    <Grid container spacing={3}>
      {/* Sidebar */}
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
      {/* {pharmacistListItems} */}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10}>
        <Typography variant="h4">Wallet Details</Typography>
        {wallet && (
          <>
            <Paper elevation={3}>
              <Typography variant="h5">Total Balance: {wallet.balance}</Typography>
            </Paper>
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
                        <TableCell style={{ color: 'green' }}>{`+${transaction.amount}`}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}
      </Grid>
    </Grid>
    </PharmacistHeader>
  );
};

export default WalletPharma;
