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

const StatusTable = ({ data }) => {
  const { status, loans } = data;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Crédito</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Fecha de solicitud</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((item, key) => (
            <TableRow key={key}>
              <TableCell>{item.loanId}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.active ? "Activo" : "No activo"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatusTable;
