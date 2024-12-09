import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { ApiProvider } from "../providers/ApiProvider";
import PaymentTable from "./PaymentTable";
const RequestLoanForm = () => {
  const [amount, setAmount] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    try {
      const response = await ApiProvider.post("/apply-loan", {
        amount: parseInt(amount)
      });
      setResponseMessage(response);
      setErrorMessage(null);
    } catch (error) {
      setResponseMessage(null);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Captura el mensaje de error del servidor
        setErrorMessage(error.response.data.message);
      } else {
        // Mensaje genérico si no hay respuesta del servidor
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      console.error("Error applying for loan:", error);
    }
  };

  return (
    <Box>
      {!responseMessage && (
        <Box>
          <Typography variant="h6">Solicitar crédito</Typography>
          <TextField
            type="number"
            label="Monto"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Request Loan
          </Button>
        </Box>
      )}
      {responseMessage && (
        <Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Solicitud aprobada. Detalles del préstamo:
          </Typography>
          <PaymentTable data={responseMessage} />
        </Box>
      )}
      {errorMessage && (
        <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default RequestLoanForm;
