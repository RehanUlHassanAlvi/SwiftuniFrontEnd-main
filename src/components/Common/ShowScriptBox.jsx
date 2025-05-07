import React from "react";
import { ExplanationContainer, ExplanationParagraph, FlexDiv } from "../../assets/styles/style";
import { ReadingAnswerDiv, ReadingAnswerHeader, ScriptText } from "./Style";

const ShowScriptBox = ({ answerText = "", explanation = false }) => {

  const formatText = (text) => {
    let formattedText = text.replace(/%\{option_name\}/g, " [ - - - ] ");
    
    return formattedText.split('\n')
      .filter(line => line.trim() !== '')
      .map((line, index) => (
        <ExplanationParagraph key={index}>{line}</ExplanationParagraph>
      ));
  };

  return (
    <ReadingAnswerDiv>
      <ExplanationContainer>
        <ReadingAnswerHeader>{explanation ? "Explanation:" : "Script:"}</ReadingAnswerHeader>
        <ScriptText>{formatText(answerText)}</ScriptText>
      </ExplanationContainer>
    </ReadingAnswerDiv>
  );
};

export default ShowScriptBox;