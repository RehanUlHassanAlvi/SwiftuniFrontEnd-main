import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularLoader({ size = 25, color = "#FFFFFF" }) {
  return (
    <CircularProgress
      sx={{
        color: color,
        alignSelf: "center",
        justifySelf: "center",
      }}
      size={size}
      disableShrink
    />
  );
}
