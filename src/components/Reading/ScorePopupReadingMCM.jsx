import React, { useEffect, useState } from "react";
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
  UserResponseCard as ResponseCard,
  UserResponseHeader as ResponseHeader,
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
import { getSuggestion } from "./data";

const ScorePopupReadingMCM = ({
  isOpen = false,
  close,
  EnableSkills = null,
  SmallScoreCard,
  CorrectAnswers,
  selectedAnswers,
  markingFunction = null,
  elapsedTime = null,
  setEnableSkillsData,
  setMarksObtained = null,
  myAttemptedQuestionsScore = null,
  questionOptions = null,
}) => {
  const isMobile = useMediaQuery("(max-width:550px)");
  const [localCorrectAnswers, setLocalCorrectAnswers] = useState([]);
  const [localSelectedAnswers, setLocalSelectedAnswers] = useState([]);
  const [localQuestionOptions, setLocalQuestionOptions] = useState([]);
  const [localElapsedTime, setLocalElapsedTime] = useState(0);
  const [localEnableSkills, setLocalEnableSkills] = useState([]);
  const [localObtainedScore, setLocalObtainedScore] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      // setLocalCorrectAnswers([]);
      // setLocalSelectedAnswers([]);
      // setLocalQuestionOptions([]);
      // setLocalElapsedTime(0);
      // setLocalEnableSkills([]);
      // setLocalObtainedScore(0);
    }
  }, [isOpen]);


  const displayUserResponses = () => {
    const responses = myAttemptedQuestionsScore
      ? localSelectedAnswers
      : selectedAnswers;
    return responses.map((response, index) => {
      const isCorrect = checkAnswer(response);
      const style = isCorrect ? {} : { color: "#fff" }; //  #E8352B red

      return (
        <CorrectAnswerDivUserRes key={index} style={style} isCorrect={isCorrect}>
          {response}
        </CorrectAnswerDivUserRes>
      );
    });
  };

  const checkAnswer = (answer) => {
    return CorrectAnswers.includes(answer);
  };

  const calculateWidth = (elements) => {
    const numElements = elements;
    if (numElements > 1) {
      return `${Math.floor(100 / numElements) - 1}%`;
    } else {
      return `${Math.floor(100 / numElements)}%`;
    }
  };

  const totalCorrect = () => {
    const responses = myAttemptedQuestionsScore
      ? localSelectedAnswers
      : selectedAnswers;
    return responses.reduce(
      (acc, response) => acc + (checkAnswer(response) ? 1 : 0),
      0
    );
  };

  const minutes = Math.floor(localElapsedTime / 60);
  const seconds = localElapsedTime % 60;
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  useEffect(() => {
    const defaultEnableSkills = {
      component: "Blanks",
      score: `${totalCorrect()}/${CorrectAnswers.length}`,
      suggestion: getSuggestion(totalCorrect(), CorrectAnswers.length),
    };

    if (EnableSkills && EnableSkills.length > 0) {
      setEnableSkillsData(EnableSkills);
    } else {
      setEnableSkillsData([defaultEnableSkills]);
    }
  }, [EnableSkills, CorrectAnswers]);

  useEffect(() => {
    const calculatedScore = markingFunction
      ? markingFunction(CorrectAnswers, selectedAnswers)
      : totalCorrect();
    setMarksObtained(calculatedScore);
  }, [CorrectAnswers, selectedAnswers, markingFunction]);

  useEffect(() => {
    if (myAttemptedQuestionsScore) {
      const userData = JSON.parse(myAttemptedQuestionsScore.UsersResponse);
      setLocalCorrectAnswers(userData.correctAnswers);
      setLocalSelectedAnswers(userData.selectedAnswers);
      // setLocalQuestionOptions(myAttemptedQuestionsScore.OptionNames);
      setLocalQuestionOptions(questionOptions);
      setLocalElapsedTime(myAttemptedQuestionsScore.TimeTaken);
      setLocalEnableSkills(userData.enableSkillsData);
      setLocalObtainedScore(myAttemptedQuestionsScore.MarksObtained);
    }
  }, [myAttemptedQuestionsScore]);

  useEffect(() => {
    if (myAttemptedQuestionsScore) {
      setLocalObtainedScore(myAttemptedQuestionsScore.MarksObtained);
    } else {
      const score = markingFunction
        ? markingFunction(CorrectAnswers, selectedAnswers)
        : totalCorrect();
      setLocalObtainedScore(score);
    }
  }, [
    myAttemptedQuestionsScore,
    CorrectAnswers,
    selectedAnswers,
    markingFunction,
  ]);

  useEffect(() => {
    if (elapsedTime) {
      setLocalElapsedTime(elapsedTime);
    }
  }, [elapsedTime]);

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
                      score={localObtainedScore}
                      totalScore={CorrectAnswers.length}
                      progressColorFilled={scoreCard.progressColorFilled}
                      scoreColor={scoreCard.scoreColor}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>
                      Out of {CorrectAnswers.length}
                    </WritingOutOfText>
                  </ContentWrapper1>
                </AiScoreSmallCard>
              ))}
              {localElapsedTime !== null && (
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
              )}
            </Flexed2>
          )}
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: "20px",
              width: isMobile ? "100%" : "90%",
            }}
          >
            {myAttemptedQuestionsScore ? (
              <EnableSkillsCardRE>
                <EnableSkillsScoreTable
                  rows={localEnableSkills}
                  totScore={localQuestionOptions.length}
                  obtainedScore={localObtainedScore}
                />
              </EnableSkillsCardRE>
            ) : (
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
                            score: `${totalCorrect()}/${CorrectAnswers.length}`,
                            suggestion: getSuggestion(totalCorrect(), CorrectAnswers.length),
                          },
                        ]
                  }
                  totScore={CorrectAnswers.length}
                  obtainedScore={
                    markingFunction
                      ? markingFunction(CorrectAnswers, selectedAnswers)
                      : totalCorrect()
                  }
                />
              </EnableSkillsCardRE>
            )}
            <FlexDiv
              style={{
                justifyContent: isMobile ? "center" : "space-between",
                width: "100%",
                flexDirection: isMobile ? "column" : "",
                gap: isMobile ? "20px" : "",
                alignItems: "flex-start",
              }}
            >
              {myAttemptedQuestionsScore ? (
                <ResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                  <ResponseHeader>
                    <HeaderText>Correct Answer</HeaderText>
                  </ResponseHeader>
                  <AiScoreParagraphCard>
                    <FlexDiv style={{ gap: "0.5rem" }}>
                      {localCorrectAnswers.map((response) => (
                        <CorrectAnswerDiv key={response}>
                          {response}
                        </CorrectAnswerDiv>
                      ))}
                    </FlexDiv>
                  </AiScoreParagraphCard>
                </ResponseCard>
              ) : (
                <ResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                  <ResponseHeader>
                    <HeaderText>Correct Answer</HeaderText>
                  </ResponseHeader>
                  <AiScoreParagraphCard>
                    <FlexDiv style={{ gap: "0.5rem" }}>
                      {CorrectAnswers.map((response) => (
                        <CorrectAnswerDiv>{response}</CorrectAnswerDiv>
                      ))}
                    </FlexDiv>
                  </AiScoreParagraphCard>
                </ResponseCard>
              )}

              <ResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                <ResponseHeader>
                  <HeaderText>User's Response</HeaderText>
                </ResponseHeader>
                <AiScoreParagraphCard>
                  <FlexDiv style={{ gap: "0.5rem" }}>
                    {displayUserResponses()}
                  </FlexDiv>
                </AiScoreParagraphCard>
              </ResponseCard>
            </FlexDiv>
            {isMobile && (
              <FlexDiv
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ width: "100%" }}>
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
                          score={localObtainedScore}
                          totalScore={CorrectAnswers.length}
                          progressColorFilled={scoreCard.progressColorFilled}
                          scoreColor={scoreCard.scoreColor}
                          progressColorUnfilled={
                            scoreCard.progressColorUnfilled
                          }
                        />
                        <WritingOutOfText>
                          Out of {CorrectAnswers.length}
                        </WritingOutOfText>
                      </ContentWrapper1>
                    </AiScoreSmallCard>
                  ))}
                </div>
                <div style={{ width: "100%" }}>
                  {localElapsedTime !== null && (
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
                  )}
                </div>
              </FlexDiv>
            )}
          </FlexDiv>
        </Flexed1>
      </CardWrapperRE>
    </FlexDiv>
  );
};

export default ScorePopupReadingMCM;




