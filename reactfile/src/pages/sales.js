import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AdminHeader from "../components/AdminHeader";
import { getDifMeds, getAllSales, getSalesByMonth, getSalesByMedicine } from '../services/api';

const ViewSales = () => {
  const [sales, setSales] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`
  );
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [medicineNames, setMedicineNames] = useState([]);

  const calculateTotalPrice = () => {
    let total = 0;
    sales.forEach((sale) => {
      total += sale.totalPrice;
    });
    return total;
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleMonthYearChange = (event) => {
    setSelectedMonthYear(event.target.value);
  };

  const handleMedicineChange = (event) => {
    setSelectedMedicine(event.target.value);
  };

  const fetchData = async () => {
    try {
      setIsPending(true);
      setError("");

      switch (filterType) {
        case "all":
          const allSalesResponse = await getAllSales();
          setSales(allSalesResponse.sales);
          break;
        case "month":
          if(selectedMonthYear){
          const salesByMonthResponse = await getSalesByMonth(selectedMonthYear);
          setSales(salesByMonthResponse.sales);}
          break;
        case "medicine":
          // Fetch data only when a medicine is selected
          if (selectedMedicine) {
            const salesByMedicineResponse = await getSalesByMedicine(selectedMedicine);
            setSales(salesByMedicineResponse.sales);
          }
          // If no specific medicine is selected, do not clear existing sales data
          break;
        default:
          break;
      }

      setIsPending(false);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    getDifMeds()
      .then((response) => {
        setMedicineNames(response.data.medicineNames);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [filterType, selectedYear, selectedMonth, selectedMonthYear, selectedMedicine]);

  return (
    <Grid container>
      <AdminHeader />

      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "20rem" }}>
        <Typography variant="h4" gutterBottom>
          Sales
        </Typography>

        <FormControl style={{ marginBottom: "1rem" }}>
          <InputLabel htmlFor="filter-type">Filter By:</InputLabel>
          <Select
            id="filter-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ width: 150, fontSize: 14 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="medicine">Medicine</MenuItem>
          </Select>
        </FormControl>

        {filterType === "month" && (
          <FormControl style={{ marginBottom: "1rem" }}>
            <InputLabel htmlFor="month-year">Month and Year:</InputLabel>
            <Select
              id="month-year"
              value={selectedMonthYear}
              onChange={handleMonthYearChange}
              style={{ minWidth: 150 }}
            >
              {Array.from({ length: new Date().getFullYear() - 1999 }, (_, yearIndex) => {
                const year = 2000 + yearIndex;
                return Array.from({ length: 12 }, (_, monthIndex) => {
                  const month = monthIndex + 1;
                  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
                  return (
                    <MenuItem key={`${year}-${formattedMonth}`} value={`${year}-${formattedMonth}`}>
                      {`${formattedMonth}/${year}`}
                    </MenuItem>
                  );
                });
              })}
            </Select>
          </FormControl>
        )}

        {filterType === "medicine" && (
          <FormControl style={{ marginBottom: "1rem" }}>
            <InputLabel htmlFor="medicine">Medicine Name:</InputLabel>
            <Select
              id="medicine"
              value={selectedMedicine}
              onChange={handleMedicineChange}
              style={{ minWidth: 150 }}
            >
              {medicineNames.map((medicineName) => (
                <MenuItem key={medicineName} value={medicineName}>
                  {medicineName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {sales &&
          sales.map((sale) => (
            <Paper key={sale.orderId} style={{ padding: "1rem", marginBottom: "1rem" }}>
              <Typography variant="h6">Sale ID: {sale.orderId}</Typography>
              <Typography>Date of Delivery: {new Date(sale.dateOfDelivery).toLocaleDateString()}</Typography>
              <Typography>Total Price: {sale.totalPrice}</Typography>
              <Typography variant="subtitle1">Order Details:</Typography>
              {sale.orderDetails && sale.orderDetails.length > 0 ? (
                sale.orderDetails.map((item, index) => (
                  <div key={index}>
                    <Typography>Medicine Name: {item.medicineName}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                  </div>
                ))
              ) : (
                <Typography>No order details available.</Typography>
              )}
            </Paper>
          ))}
        <Paper>
          <Typography variant="h5">Total Sales: {calculateTotalPrice()}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ViewSales;
