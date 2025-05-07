import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  ReadingAnswerDiv,
  ReadingAnswerHeader,
  ReadingAnswerText,
} from "./Style";

const SpeakingASQAnswerBox = ({ Question, Answer, addIndex = true }) => {
  const convertToNumberedString = (array, addIndex = true) => {
    return array
      .map((word, index) => (addIndex ? `${index + 1}.${word}` : word))
      .join(", ");
  };

  return (
    <ReadingAnswerDiv>
      <FlexDiv
        style={{
          width: "100%",
          justifyContent: "flex-start",
          flexDirection: "column",
          borderTop: "1px solid var(--White-Theme-Gray---2, #E2E2EA)",
          borderBottom: "1px solid var(--White-Theme-Gray---2, #E2E2EA)",
          padding: "20px 0px",
        }}
      >
        <FlexDiv
          style={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <ReadingAnswerHeader style={{ width: "5.2rem" }}>
            Question:{" "}
          </ReadingAnswerHeader>
          <ReadingAnswerText>{Question}</ReadingAnswerText>
        </FlexDiv>
        <FlexDiv
          style={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <ReadingAnswerHeader style={{ width: "5.2rem" }}>
            Answer:{" "}
          </ReadingAnswerHeader>
          <ReadingAnswerText>
            {/* {Answer} */}
            {convertToNumberedString(Answer, addIndex)}
            </ReadingAnswerText>
        </FlexDiv>
      </FlexDiv>
    </ReadingAnswerDiv>
  );
};

export default SpeakingASQAnswerBox;
