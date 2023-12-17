import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import { pharmacistListItems } from '../components/ListItemsPharma';
import { getDifMeds, getAllSales, getSalesByMonth, getSalesByMedicine } from '../services/api';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import PharmacistHeader from '../components/PharmacistHeader';


const ViewSales = () => {
  const [sales, setSales] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [medicineNames, setMedicineNames] = useState([]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

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
    const yearMonth = event.target.value.split("-");
    setSelectedYear(parseInt(yearMonth[0]));
    setSelectedMonth(parseInt(yearMonth[1]));
  };
  

  const handleMedicineChange = (event) => {
    setSelectedMedicine(event.target.value);
  };

  const handleShowSales = async () => {
    try {
      setIsPending(true);
      setError("");

      switch (filterType) {
        case "all":
          const allSalesResponse = await getAllSales();
          setSales(allSalesResponse.sales);
          break;
          case "month":
            const yearMonthString = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`;
            const salesByMonthResponse = await getSalesByMonth(yearMonthString);
            setSales(salesByMonthResponse.sales);
            break;
        case "medicine":
          const salesByMedicineResponse = await getSalesByMedicine(selectedMedicine);
          setSales(salesByMedicineResponse.sales);
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
    getDifMeds()
      .then((response) => {
        setMedicineNames(response.data.medicineNames);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <PharmacistHeader>
    <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* {pharmacistListItems} */}
      </Grid>

      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Sales
        </Typography>

        <FormControl component="fieldset" style={{ marginBottom: "1rem" }}>
  <FormLabel component="legend">Filter By:</FormLabel>
  <RadioGroup row aria-label="filter-type" name="filter-type" value={filterType} onChange={handleFilterTypeChange}>
    <FormControlLabel value="all" control={<Radio />} label="All" />
    <FormControlLabel value="month" control={<Radio />} label="Month" />
    {filterType === "month" && (
      <div>
        <InputLabel htmlFor="month-year">Month and Year</InputLabel>
        <Select
  value={`${selectedYear}-${selectedMonth}`}
  onChange={handleMonthChange}
  input={<Input id="month-year" />}
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

      </div>
    )}
            <FormControlLabel value="medicine" control={<Radio />} label="Medicine" />
            {filterType === "medicine" && (
              <Select value={selectedMedicine} onChange={handleMedicineChange}>
                {medicineNames.map((medicineName) => (
                  <MenuItem key={medicineName} value={medicineName}>
                    {medicineName}
                  </MenuItem>
                ))}
              </Select>
            )}
          </RadioGroup>
        </FormControl>

        <Button variant="contained" onClick={handleShowSales}>
          Show Sales
        </Button>

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

{/* <TableContainer component={Paper}></TableContainer>*/}

      </Grid>
    </Grid>
    </PharmacistHeader>
  );
};

export default ViewSales;
