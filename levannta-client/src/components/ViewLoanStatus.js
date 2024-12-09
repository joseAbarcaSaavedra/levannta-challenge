import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ApiProvider } from "../providers/ApiProvider";
import StatusTable from "./StatusTable";
const ViewLoanStatus = () => {
  const [loans, setLoans] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await ApiProvider.get("/loan-status");
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loan status:", error);
        setLoans(null);
      }
    };

    fetchLoans();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Estado de crédito</Typography>
      {loans ? (
        <Box>
          <StatusTable data={loans} />
        </Box>
      ) : (
        <Typography variant="body1">No loan requests found.</Typography>
      )}
    </Box>
  );
};

export default ViewLoanStatus;
