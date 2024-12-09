import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const DataTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Monto USD</TableCell>
          <TableCell>Año</TableCell>
          <TableCell>Mes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, key) => (
          <TableRow key={key}>
            <TableCell>{item.clientId}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.year}</TableCell>
            <TableCell>{item.month}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTable;
