import React from "react";
import Snackbar from "@mui/joy/Snackbar";

export default function SnackbarAlert({
  open,
  setOpen,
  variant,
  color,
  message,
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
      variant={variant}
      color={color}
      onClose={handleClose}
      style={{
        zIndex: 10000,
        top: fromTop,
      }}
    >
      {message}
    </Snackbar>
  );
}
