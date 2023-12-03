import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon" },
  { id: 2, lastName: "Lannister", firstName: "Cersei" },
  { id: 3, lastName: "Stark", firstName: "Arya" },
  // more data...
];

export default function DataTable() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              rowHeight={40} // Adjust this value to your liking
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
