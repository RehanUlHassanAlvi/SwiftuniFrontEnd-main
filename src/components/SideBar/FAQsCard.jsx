import React, { useState } from "react";
import { IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { FAQsCardContainer, FAQsQuestionText, FAQsAnswerText } from "./style";
import { Btn } from "../../assets/styles/style";

const FAQsCard = ({ question, answer }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <FAQsCardContainer>
      <Btn onClick={handleToggle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FAQsQuestionText>{question}</FAQsQuestionText>
          <IconButton
            style={{
              padding: "15px 0px",
              margin: "0",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleToggle}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
      </Btn>
      <Collapse in={isExpanded} style={{ width: "100%" }}>
        <FAQsAnswerText>{answer}</FAQsAnswerText>
      </Collapse>
    </FAQsCardContainer>
  );
};

export default FAQsCard;
