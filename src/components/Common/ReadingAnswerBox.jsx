import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  ReadingAnswerDiv,
  ReadingAnswerHeader,
  ReadingAnswerText,
} from "./Style";

const convertToNumberedString = (array, addIndex = true) => {
  return array
    .map((word, index) => (addIndex ? `${index + 1}.${word}` : word))
    .join(", ");
};

const ReadingAnswerBox = ({ answerText = null, addIndex = true, color }) => {
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
        <ReadingAnswerText color={color}>
          {convertToNumberedString(answerText, addIndex)}
        </ReadingAnswerText>
      </FlexDiv>
    </ReadingAnswerDiv>
  );
};

export default ReadingAnswerBox;
