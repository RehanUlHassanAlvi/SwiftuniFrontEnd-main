import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import { ReadingAnswerHeader, ScriptText } from "./Style";
import { Box } from "@mui/material";

const StatementBox = ({ answerText = "", searchText = "", explanation = false }) => {
  const formatText = (text) => {
    return text.replace(/\\n/g, " ").replace(/%\{option_name\}/g, " [ - - - ] ");
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim() || searchTerm.length <= 2) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", fontWeight: "bold", borderRadius: '0.3rem' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Box style={{ width: "95%" }}>
      <ReadingAnswerHeader style={{ fontSize: "1.125rem", fontWeight: "500" }}>
        {explanation ? "Explanation:" : "Statement:"}
      </ReadingAnswerHeader>
      <FlexDiv
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--White-Theme-Gray---2, #E2E2EA)",
          padding: "0px 0px 30px 0px",
        }}
      >
        <ScriptText style={{ textAlign: "justify" }}>
          {highlightSearchTerm(formatText(answerText), searchText)}
        </ScriptText>
      </FlexDiv>
    </Box>
  );
};

export default StatementBox;

