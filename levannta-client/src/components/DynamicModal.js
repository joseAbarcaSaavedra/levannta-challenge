import React from "react";
import { Modal, Box } from "@mui/material";
import UploadSubscribersForm from "./UploadSubscribersForm";
import ViewLoanStatus from "./ViewLoanStatus";
import RequestLoanForm from "./RequestLoanForm";

const DynamicModal = ({ open, onClose, selectedOption }) => {
  const renderContent = () => {
    switch (selectedOption) {
      case "upload":
        return <UploadSubscribersForm />;
      case "viewStatus":
        return <ViewLoanStatus />;
      case "requestLoan":
        return <RequestLoanForm />;
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400
        }}
      >
        {renderContent()}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
