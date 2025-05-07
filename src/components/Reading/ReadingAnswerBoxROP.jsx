import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  ReadingAnswerDiv,
  ReadingAnswerHeader,
  ReadingAnswerText,
} from "../Common/Style";

const ReadingAnswerBoxROP = ({ answer = null, addIndex = true }) => {
  return (
    <ReadingAnswerDiv>
      <FlexDiv
        style={{
          width: "100%",
          justifyContent: "flex-start",
          borderTop: "1px solid var(--White-Theme-Gray---2, #E2E2EA)",
          borderBottom: "1px solid var(--White-Theme-Gray---2, #E2E2EA)",
          padding: "20px 0px",
        }}
      >
        <ReadingAnswerHeader>Answer:</ReadingAnswerHeader>
        <ReadingAnswerText>{answer}</ReadingAnswerText>
      </FlexDiv>
    </ReadingAnswerDiv>
  );
};

export default ReadingAnswerBoxROP;
