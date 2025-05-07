import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

const AvgScoreCard = ({ borderRadius, backgroundColor, text, score = '00', flex, marginRight, isLoading }) => {
  const isSTab = useMediaQuery('(max-width:700px)')

  return (
    <Card
      sx={{
        display: "flex",
        height: "117px",
        padding:isSTab?'0px 50%':'0.4% 9.9%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent:'center',
        gap: "10px",
        borderRadius: isSTab?"16px":borderRadius || "16px",
        background: backgroundColor || "#996CFE",
        flex: flex || "0 0 0",
        marginRight:marginRight||'0px',
        boxShadow:'none'
      }}
    >
      <Typography
        sx={{
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Noto Sans",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "16px",
          letterSpacing: "-0.144px",
        }}
      >
        {text}
      </Typography>

      <Typography
        sx={{
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Noto Sans",
          fontSize: "32px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "38.871px",
        }}
      >
        {isLoading ? <>00</> : score || <>00</>}
      </Typography>
    </Card>
  );
};

export default AvgScoreCard;
