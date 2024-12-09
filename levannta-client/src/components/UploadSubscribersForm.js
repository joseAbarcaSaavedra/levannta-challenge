import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { ApiProvider } from "../providers/ApiProvider";

const UploadSubscribersForm = () => {
  const [file, setFile] = useState(null);
  const [maxCreditAmount, setMaxCreditAmount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await ApiProvider.post("/portfolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setMaxCreditAmount(response.maxLoanAmount);
      setErrorMessage(null); // Limpiar errores si la solicitud es exitosa
    } catch (error) {
      console.error("Error uploading file:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Box>
      {!maxCreditAmount && (
        <Box>
          <Typography variant="h6">Actualizar suscriptores</Typography>
          <TextField
            type="file"
            fullWidth
            onChange={handleFileChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </Box>
      )}

      {maxCreditAmount !== null && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Max Credit Amount for this month: ${maxCreditAmount}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default UploadSubscribersForm;
