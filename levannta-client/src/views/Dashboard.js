import React, { useState, useEffect } from "react";
import DataTable from "../components/Table";
import DynamicModal from "../components/DynamicModal";
import { Box, Button, Typography } from "@mui/material";
import { ApiProvider } from "../providers/ApiProvider";

const COMPANY_ID = "company-1";
const Dashboard = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOpenModal = (option) => {
    setSelectedOption(option);
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await ApiProvider.get(
          `/company/${COMPANY_ID}/subscriptions`
        );
        console.log("data", data);
        setSubscribers(data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h4">Levannta Admin</Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("upload")}
          >
            Upload Subscribers
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenModal("viewStatus")}
          >
            View Loan Status
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenModal("requestLoan")}
          >
            Request Loan
          </Button>
          <DynamicModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            selectedOption={selectedOption}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >
        <Typography variant="h5">Listado de suscripciones activas</Typography>
      </Box>
      <DataTable data={subscribers} />
    </Box>
  );
};

export default Dashboard;
