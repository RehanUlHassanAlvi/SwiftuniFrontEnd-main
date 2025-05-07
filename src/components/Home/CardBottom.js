import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../assets/styles/style";

const CardBottom = ({
  imageSrc,
  text,
  text_borderColor,
  backgroundColor,
  url = "",
}) => {
  const isSTab = useMediaQuery("(max-width:860px)");
  const navigate = useNavigate();

  // const handleClick = () => {
  //   if (url !== "") {
  //     sessionStorage.removeItem('selectedQuestion');
  //     navigate(url);
  //   }
  // };
  const handleClick = () => {
    if (url !== "") {
      sessionStorage.removeItem('selectedQuestion');
      if (url === "https://swiftuni.com/pte-guide/") {
        window.open(url, "_blank");
      } else {
        navigate(url);
      }
    }
  };

  return (
    <Btn onClick={handleClick}>
      <Card
        sx={{
          display: "flex",
          width: "max-content",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          borderRadius: "16px",
          border: `1px solid ${text_borderColor}`,
          background: backgroundColor || "transparent",
          width: "100%",
          boxShadow: "none",
          height: "120px",
          padding: "0.4% 0px",
          cursor: "pointer",

          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <img
          src={imageSrc}
          alt="icon"
          style={{ width: "48px", height: "48px" }}
        />
        <Typography
          sx={{
            color: text_borderColor,
            fontFamily: "Noto Sans",
            fontSize: isSTab ? "16px" : "18px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "-0.162px",
          }}
        >
          {text}
        </Typography>
      </Card>
    </Btn>
  );
};

export default CardBottom;
