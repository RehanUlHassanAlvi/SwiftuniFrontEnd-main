import React from "react";
import {
  TestCard2,
  TestCardHeader2,
  TestCardContent2,
  TestCardContentText2,
  TestCardContentDigit2,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";

const AnalyticsTestCard2 = ({
  headerName,
  imgSrc,
  color,
  QuestionsTotalTime,
  QuestionNames,
  QuestionTimes,
}) => {
  // const isPteCore = localStorage.getItem("pte-type") === "pte core";

  // console.log("QuestionNames: ", QuestionNames)
  // console.log("QuestionTimes: ", QuestionTimes)

  // const CORE_EXCLUDED_QUESTIONS = ["Re-tell Lecture", "Write Essay", "Highlight Correct Summary"];
  // const NON_CORE_EXCLUDED_QUESTIONS = ["Respond to a situation", "Write Email"];
  
  // const filteredQuestionNames = QuestionNames.filter((name) =>
  //   isPteCore
  //     ? !CORE_EXCLUDED_QUESTIONS.includes(name) 
  //     : !NON_CORE_EXCLUDED_QUESTIONS.includes(name) 
  // );
  
  // const filteredQuestionTimes = QuestionNames.map((name, index) =>
  //   isPteCore
  //     ? !CORE_EXCLUDED_QUESTIONS.includes(name)
  //       ? QuestionTimes[index]
  //       : null
  //     : !NON_CORE_EXCLUDED_QUESTIONS.includes(name) 
  //       ? QuestionTimes[index]
  //       : null
  // ).filter((time) => time !== null); 
  
  return (
    <TestCard2>
      <TestCardHeader2 style={{ backgroundColor: color }}>
        <FlexDiv style={{ gap: "0.38rem" }}>
          <img src={imgSrc} alt={headerName} />
          {headerName}
        </FlexDiv>
        {QuestionsTotalTime}
      </TestCardHeader2> 
      <TestCardContent2>
        {QuestionNames.map((name, index) => (
          <FlexDiv key={index} style={{justifyContent: "space-between", width: "90%"}}>
            <TestCardContentText2>{name}</TestCardContentText2>
            <TestCardContentDigit2> {QuestionTimes[index]}</TestCardContentDigit2>
          </FlexDiv>
        ))}
      </TestCardContent2>
    </TestCard2>
  );
};

export default AnalyticsTestCard2;
