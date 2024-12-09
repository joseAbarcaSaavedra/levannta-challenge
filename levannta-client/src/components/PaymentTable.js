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

const PaymentTable = ({ data }) => {
  console.log("data", data);
  const {
    dataValues: { active, installmentValue, paymentDates }
  } = data;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha de Pago</TableCell>
            <TableCell>Monto USD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentDates.map((item, key) => (
            <TableRow key={key}>
              <TableCell>{item}</TableCell>
              <TableCell>{installmentValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
