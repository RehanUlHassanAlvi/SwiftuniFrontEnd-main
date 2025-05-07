// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9963fe", // Your desired color
    },
    // You can also define other palette properties
  },
  typography: {
    fontFamily: "Noto Sans, Arial, sans-serif", // Set the default font family
  },
  // You can add more customization here like typography, breakpoints, etc.
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Remove box shadows from all buttons
          minHeight: 0, // Remove minimum height from buttons
          textTransform: "none", // Optionally remove uppercase transformation if desired
        },
      },
    },
  },
});

export default theme;
