import React from "react";
import Snackbar from "@mui/material/Snackbar"; // Ensure you're using the correct Snackbar component
import Alert from "@mui/material/Alert"; // Using Alert for styled content inside Snackbar

export default function SnackbarAlertPTE({
  open,
  setOpen,
  variant = "filled",  // "filled" is one of the valid variants for Alert
  severity = "info",   // Use "severity" instead of "color"
  message = "Alert",
  fromTop = "14px",
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
      open={open}
      onClose={handleClose}
      style={{
        zIndex: 10000,
        top: fromTop,
      }}
    >
      <Alert onClose={handleClose} severity={severity} variant={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
}
