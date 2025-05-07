import React from "react";
import {
  TestCard,
  TestCardHeader,
  TestCardContent,
  TestCardContentText,
  TestCardContentDigit,
} from "./style";

const AnalyticsTestCard = ({ headerName, imgSrc, color, score, questions }) => {
  return (
    <TestCard>
      <TestCardHeader style={{ backgroundColor: color }}>
        <img src={imgSrc} alt={headerName} />
        {headerName}
      </TestCardHeader>
      <TestCardContent>
        <div>
          <TestCardContentText>Score</TestCardContentText>
          <TestCardContentDigit>{score}</TestCardContentDigit>
        </div>
        <div>
          <TestCardContentText>Attempted Questions</TestCardContentText>
          <TestCardContentDigit>{questions}</TestCardContentDigit>
        </div>
      </TestCardContent>
    </TestCard>
  );
};

export default AnalyticsTestCard;
