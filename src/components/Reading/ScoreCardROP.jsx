import React, { useState, useEffect } from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  CardWrapperRE,
  CardHeader,
  CardHeaderText,
  HeaderText,
  EnableSkillsCardRE,
  EnableSkillsHeader,
  AiScoreSmallCard,
  AiScoreSmallCardHeader,
  UserResponseCard,
  UserResponseHeader,
  ContentWrapper1,
  TimeWrapper1,
  TimeDigitDiv,
  TimeDigit,
  TimeWrapper2,
  AiScoreParagraphCard,
  WritingOutOfText,
  Flexed1,
  Flexed2,
} from "../../components/Writing/style";
import CircularScoreProgress from "../../components/Writing/CircularScoreProgress";
import EnableSkillsScoreTable from "../../components/Writing/EnableSkillsScoreTable";
import { CorrectAnswerDiv, CorrectAnswerDivUserRes } from "./Style";
import { useMediaQuery } from "@mui/material";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";

const ScoreCardROP = ({
  close = () => {},
  dataKey,
  EnableSkills = null,
  SmallScoreCard,
  submissionResult,
  elapsedTime = null, 
  totalScore,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  // const totalScore = submissionResult.correctIndexes.length;
  

  const calculateWidth = (elements) => {
    const numElements = elements;
    if (numElements > 1) {
      return `${Math.floor(100 / numElements) - 1}%`;
    } else {
      return `${Math.floor(100 / numElements)}%`;
    }
  };

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return (
    <FlexDiv
      style={{ justifyContent: "center", zIndex: "1001", width: "100%" }}
    >
      <CardWrapperRE id="scorecard">
        <CardHeader>
          <CardHeaderText>Ai Score</CardHeaderText>
          <FlexDiv style={{ position: "absolute", right: "1rem" }}>
            <img
              src={CancelIcon}
              alt=""
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => close(false)}
            />
          </FlexDiv>
        </CardHeader>

        <Flexed1>
          {!isMobile && (
            <Flexed2>
              {SmallScoreCard.map((scoreCard, index) => (
                <AiScoreSmallCard
                  BorderColor={scoreCard.HeaderBgColor}
                  key={index}
                >
                  <AiScoreSmallCardHeader BgColor={scoreCard.HeaderBgColor}>
                    <HeaderText>{scoreCard.Heading}</HeaderText>
                  </AiScoreSmallCardHeader>
                  <ContentWrapper1>
                    <CircularScoreProgress
                      score={submissionResult.score > 0 ? submissionResult.score - 1 : submissionResult.score}
                      totalScore={totalScore}
                      progressColorFilled={scoreCard.progressColorFilled}
                      scoreColor={scoreCard.scoreColor}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>Out of {totalScore}</WritingOutOfText>
                  </ContentWrapper1>
                </AiScoreSmallCard>
              ))}
              {/* {elapsedTime !== null && ( */}
              {/* {elapsedTime && ( */}
              <AiScoreSmallCard>
                <AiScoreSmallCardHeader>
                  <HeaderText>Time</HeaderText>
                </AiScoreSmallCardHeader>
                <TimeWrapper1>
                  <TimeWrapper2>
                    <WritingOutOfText>Minute</WritingOutOfText>
                    <WritingOutOfText>Second</WritingOutOfText>
                  </TimeWrapper2>
                  <TimeWrapper2>
                    <TimeDigitDiv>
                      <TimeDigit>{minutesStr[0]}</TimeDigit>
                      <TimeDigit>{minutesStr[1]}</TimeDigit>
                    </TimeDigitDiv>
                    <TimeDigitDiv>
                      <TimeDigit>{secondsStr[0]}</TimeDigit>
                      <TimeDigit>{secondsStr[1]}</TimeDigit>
                    </TimeDigitDiv>
                  </TimeWrapper2>
                </TimeWrapper1>
              </AiScoreSmallCard>
              {/* )} */}
            </Flexed2>
          )}
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: "20px",
              width: isMobile ? "100%" : "90%",
            }}
          >
            <EnableSkillsCardRE>
              <EnableSkillsHeader>
                <HeaderText>Enabling Skills</HeaderText>
              </EnableSkillsHeader>
              <EnableSkillsScoreTable
                rows={
                  EnableSkills
                    ? EnableSkills
                    : [
                        {
                          component: "Blanks",
                          score: `${submissionResult.score}/${totalScore}`,
                          suggestion: "Excellent!",
                        },
                      ]
                }
                totScore={totalScore}
                obtainedScore={`${submissionResult.score}`}
              />
            </EnableSkillsCardRE>

            <FlexDiv
              style={{
                justifyContent: isMobile ? "center" : "space-between",
                width: "100%",
                flexDirection: isMobile ? "column" : "",
                gap: isMobile ? "20px" : "",
              }}
            >
              <UserResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                <UserResponseHeader>
                  <HeaderText>Correct Answer</HeaderText>
                </UserResponseHeader>
                <AiScoreParagraphCard>
                  <FlexDiv style={{ gap: "0.5rem" }}>
                    {submissionResult.correctIndexes.map((index) => (
                      <CorrectAnswerDiv key={index}>
                        {index + 1}{" "}
                      </CorrectAnswerDiv>
                    ))}
                  </FlexDiv>
                </AiScoreParagraphCard>
              </UserResponseCard>
              <UserResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                <UserResponseHeader>
                  <HeaderText>User's Response</HeaderText>
                </UserResponseHeader>
                <AiScoreParagraphCard>
                  <FlexDiv style={{ gap: "0.5rem" }}>
                    {submissionResult.userIndexes.map(
                      (index, userIndexPosition) => (
                        <CorrectAnswerDivUserRes 
                        isCorrect={submissionResult.correctIndexes[userIndexPosition] === index}
                          key={index}
                          // style={{
                          //   color:
                          //     submissionResult.correctIndexes[
                          //       userIndexPosition
                          //     ] === index
                          //       ? ""
                          //       : "#E8352B",
                          // }}
                        >
                          {index + 1}{" "}
                        </CorrectAnswerDivUserRes>
                      )
                    )}
                  </FlexDiv>
                </AiScoreParagraphCard>
              </UserResponseCard>
            </FlexDiv>
            {isMobile && (
              <FlexDiv
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                {SmallScoreCard.map((scoreCard, index) => (
                  <AiScoreSmallCard
                    BorderColor={scoreCard.HeaderBgColor}
                    key={index}
                    style={{
                      width: isMobile
                        ? calculateWidth(SmallScoreCard.length)
                        : "",
                    }}
                  >
                    <AiScoreSmallCardHeader BgColor={scoreCard.HeaderBgColor}>
                      <HeaderText>{scoreCard.Heading}</HeaderText>
                    </AiScoreSmallCardHeader>
                    <ContentWrapper1>
                      <CircularScoreProgress
                        score={submissionResult.score > 0 ? submissionResult.score - 1 : submissionResult.score}
                        totalScore={totalScore}
                        progressColorFilled={scoreCard.progressColorFilled}
                        scoreColor={scoreCard.scoreColor}
                        progressColorUnfilled={scoreCard.progressColorUnfilled}
                      />
                      <WritingOutOfText>Out of {totalScore}</WritingOutOfText>
                    </ContentWrapper1>
                  </AiScoreSmallCard>
                ))}
                {/* {elapsedTime !== null && ( */}
                {/* {elapsedTime && ( */}
                <AiScoreSmallCard>
                  <AiScoreSmallCardHeader>
                    <HeaderText>Time</HeaderText>
                  </AiScoreSmallCardHeader>
                  <TimeWrapper1>
                    <TimeWrapper2>
                      <WritingOutOfText>Minute</WritingOutOfText>
                      <WritingOutOfText>Second</WritingOutOfText>
                    </TimeWrapper2>
                    <TimeWrapper2>
                      <TimeDigitDiv>
                        <TimeDigit>{minutesStr[0]}</TimeDigit>
                        <TimeDigit>{minutesStr[1]}</TimeDigit>
                      </TimeDigitDiv>
                      <TimeDigitDiv>
                        <TimeDigit>{secondsStr[0]}</TimeDigit>
                        <TimeDigit>{secondsStr[1]}</TimeDigit>
                      </TimeDigitDiv>
                    </TimeWrapper2>
                  </TimeWrapper1>
                </AiScoreSmallCard>
                {/* )} */}
              </FlexDiv>
            )}
          </FlexDiv>
        </Flexed1>
      </CardWrapperRE>
    </FlexDiv>
  );
};

export default ScoreCardROP;
