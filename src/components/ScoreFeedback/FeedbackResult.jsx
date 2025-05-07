import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from "../Common/SeperatingHeader";
import {
  FeedbackCard,
  FeedbackCardContent,
  FeedbackCardLeftColor,
  FeedbackComment,
  FeedbackHeader,
  FeedbackOuterDiv,
  PurpleHeaderDiv,
  TargetScore,
  WhiteDiv,
} from "./Style";
import getFeedback from "./getFeedback"; 

const FeedbackResult = () => {
  const isTab = useMediaQuery("(max-width:1000px)");

  const location = useLocation();
  console.log(location);
  const { overall, speaking, writing, reading, listening, targetRange } =
    location.state || {};

  //   const getFeedback = (category, overallScore, score) => {
  //     const data = feedbackData[targetRange];
  //     if (!data) return "No feedback available";

  //     if (category === "overall") {
  //       const feedback = data.overall.find(f => overallScore >= f.min && overallScore <= f.max);
  //       return feedback ? feedback.message : "No feedback available";
  //     } else {
  //       const categoriesData = overallScore >= data.categoriesAchieved.minOverall ? data.categoriesAchieved : data.categories;
  //       if (category === "listening") {
  //         const feedback = categoriesData.listening.find(f => score >= f.min && score <= f.max);
  //         return feedback ? feedback.message : "No feedback available";
  //       } else {
  //         return categoriesData[category];
  //       }
  //     }
  //   };

  //   const feedbackInitialData = [
  //     { name: "Overall", score: overall, feedback: getFeedback("overall", overall, overall), color: "#996CFE" },
  //     { name: "Speaking", score: speaking, feedback: getFeedback("speaking", overall, speaking), color: "#66E0F7" },
  //     { name: "Writing", score: writing, feedback: getFeedback("writing", overall, writing), color: "#FF5D5D" },
  //     { name: "Reading", score: reading, feedback: getFeedback("reading", overall, reading), color: "#AD826E" },
  //     { name: "Listening", score: listening, feedback: getFeedback("listening", overall, listening), color: "#868EAF" },
  //   ];
  const feedbackInitialData = [
    {
      name: "Overall",
      score: overall,
      feedback: getFeedback("overall", overall, overall, targetRange),
      color: "#996CFE",
    },
    {
      name: "Speaking",
      score: speaking,
      feedback: getFeedback("speaking", overall, speaking, targetRange),
      color: "#66E0F7",
    },
    {
      name: "Writing",
      score: writing,
      feedback: getFeedback("writing", overall, writing, targetRange),
      color: "#FF5D5D",
    },
    {
      name: "Reading",
      score: reading,
      feedback: getFeedback("reading", overall, reading, targetRange),
      color: "#AD826E",
    },
    {
      name: "Listening",
      score: listening,
      feedback: getFeedback("listening", overall, listening, targetRange),
      color: "#868EAF",
    },
  ];

  return (
    <FlexDiv
      style={{
        flexDirection: "column",
        padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
      }}
    >
      <SeperatingHeader
        title="AI Score Feedback"
        displayText={true}
        text={
          "Score Feedback will provide you with analyzed feedback on your previous score (real exam or mock test) depicting the areas where you need to focus on to achieve your required score."
        }
      />
      <PurpleHeaderDiv style={{padding:''}}>AI Score Report Analysis</PurpleHeaderDiv>
      <WhiteDiv>
        <TargetScore>{targetRange}</TargetScore>
        <FeedbackOuterDiv>
          {feedbackInitialData.map((feedback, index) => (
            <FeedbackCard key={index}>
              <FeedbackCardContent>
                <FeedbackCardLeftColor
                  bgColor={feedback.color}
                ></FeedbackCardLeftColor>
                <FlexDiv
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <FeedbackHeader style={{fontSize:'1.25rem', margin:'1rem 0rem 0.5rem'}} color={feedback.color}>
                    {feedback.name}
                  </FeedbackHeader>
                  <FeedbackHeader style={{fontSize:'1rem', marginBottom:'0.5rem'}} color={feedback.color}>
                    Score: {feedback.score}
                  </FeedbackHeader>
                  <FeedbackComment style={{marginBottom:'0.5rem', marginRight:'0.25rem'}}>{feedback.feedback}</FeedbackComment>
                </FlexDiv>
              </FeedbackCardContent>
            </FeedbackCard>
          ))}
        </FeedbackOuterDiv>
      </WhiteDiv>
    </FlexDiv>
  );
};

export default FeedbackResult;
