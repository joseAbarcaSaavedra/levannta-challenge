import React from "react";
import { Modal, Box } from "@mui/material";

const CustomModal = ({ open, onClose, children }) => (
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
      {children}
    </Box>
  </Modal>
);

export default CustomModal;
