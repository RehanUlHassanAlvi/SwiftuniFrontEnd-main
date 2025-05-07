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
  ListStyles,
} from "../../components/Writing/style";
import CircularScoreProgress from "../../components/Writing/CircularScoreProgress";
import EnableSkillsScoreTable from "../../components/Writing/EnableSkillsScoreTable";
import InfoIcon from "../../assets/images/infoicon2.svg";
import { CorrectAnswerDiv } from "./Style";
import { useMediaQuery } from "@mui/material";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { getSuggestion } from "./data";

const AiScorePopupReading = ({
  close,
  EnableSkills = null,
  SmallScoreCard,
  CorrectAnswers,
  selectedAnswers,
  answerIsAList = true,
  markingFunction = null,
  checkHIW = false,
  elapsedTime = null,
  setEnableSkillsData,
  setMarksObtained = null,
  myAttemptedQuestionsScore = null,
  questionOptions = null,
}) => {
  // console.log("CorrectAnswers:  ", CorrectAnswers);
  const isMobile = useMediaQuery("(max-width:550px)");
  const [localCorrectAnswers, setLocalCorrectAnswers] = useState([]);
  const [localSelectedAnswers, setLocalSelectedAnswers] = useState([]);
  const [localQuestionOptions, setLocalQuestionOptions] = useState([]);
  const [localElapsedTime, setLocalElapsedTime] = useState(0);
  const [localEnableSkills, setLocalEnableSkills] = useState([]);
  const [localObtainedScore, setLocalObtainedScore] = useState(0);

  const conditionalCheckAnswer = (index) => {
    const correctAnswer = (
      myAttemptedQuestionsScore ? localSelectedAnswers : selectedAnswers
    )[index];
    const userAnswer = CorrectAnswers[index];
    const isCorrect = checkHIW ? checkAnswerHIW(index) : checkAnswer(index);
    // console.log(`Index: ${index}, User Response: ${userAnswer}, Correct Answer: ${correctAnswer}, Is Correct: ${isCorrect}`);
    return isCorrect;
  };

  const checkAnswer = (index) => {
    return (
      CorrectAnswers[index] ===
      (myAttemptedQuestionsScore ? localSelectedAnswers : selectedAnswers)[
        index
      ]
    );
  };

  const checkAnswerHIW = (index) => {
    const CorrectAnswersWord = CorrectAnswers[index];
    return selectedAnswers.includes(CorrectAnswersWord)
      ? CorrectAnswersWord
      : null;
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
    let count = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (CorrectAnswers[i] === selectedAnswers[i]) {
        count++;
      }
    }
    return count;
  };

  const minutes = Math.floor(localElapsedTime / 60);
  const seconds = localElapsedTime % 60;
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  useEffect(() => {
    const defaultEnableSkills = {
      component: "Blanks",
      score: `${totalCorrect()} / ${CorrectAnswers.length}`,
      suggestion: getSuggestion(totalCorrect(), CorrectAnswers.length),
    };

    if (EnableSkills && EnableSkills.length > 0) {
      if (setEnableSkillsData) {
        setEnableSkillsData(EnableSkills);
      }
    } else {
      if (setEnableSkillsData) {
        setEnableSkillsData([defaultEnableSkills]);
      }
    }
  }, [EnableSkills, CorrectAnswers]);

  useEffect(() => {
    const calculatedScore = markingFunction
      ? markingFunction(CorrectAnswers, selectedAnswers)
      : totalCorrect();

    if (setMarksObtained) {
      setMarksObtained(calculatedScore);
    }
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
                    {answerIsAList ? (
                      <ul>
                        {localCorrectAnswers.map((response) => (
                          <>
                            <ListStyles key={response}>{response}</ListStyles>
                          </>
                        ))}
                      </ul>
                    ) : (
                      <FlexDiv style={{ gap: "0.5rem" }}>
                        {localCorrectAnswers.map((response) => (
                          <CorrectAnswerDiv key={response}>
                            {response}
                          </CorrectAnswerDiv>
                        ))}
                      </FlexDiv>
                    )}
                  </AiScoreParagraphCard>
                </ResponseCard>
              ) : (
                <ResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                  <ResponseHeader>
                    <HeaderText>Correct Answer</HeaderText>
                  </ResponseHeader>
                  <AiScoreParagraphCard>
                    {answerIsAList ? (
                      <ul>
                        {CorrectAnswers.map((response) => (
                          <>
                            <ListStyles key={response}>{response}</ListStyles>
                          </>
                        ))}
                      </ul>
                    ) : (
                      <FlexDiv style={{ gap: "0.5rem" }}>
                        {CorrectAnswers.map((response) => (
                          <CorrectAnswerDiv>{response}</CorrectAnswerDiv>
                        ))}
                      </FlexDiv>
                    )}
                  </AiScoreParagraphCard>
                </ResponseCard>
              )}

              <ResponseCard style={{ width: isMobile ? "100%" : "49%" }}>
                <ResponseHeader>
                  <HeaderText>User's Response</HeaderText>
                </ResponseHeader>
                <AiScoreParagraphCard>
                  {answerIsAList ? (
                    <ul>
                      {CorrectAnswers.map((_, index) => (
                        <ListStyles
                          key={index}
                          style={{
                            color: conditionalCheckAnswer(index)
                              ? "green"
                              : "#E8352B",
                          }}
                        >
                          {(myAttemptedQuestionsScore
                            ? localSelectedAnswers
                            : selectedAnswers)[index] || <span>&nbsp;</span>}
                        </ListStyles>
                      ))}
                    </ul>
                  ) : (
                    <FlexDiv style={{ gap: "0.5rem" }}>
                      {CorrectAnswers.map((_, index) => (
                        <CorrectAnswerDiv
                          key={index}
                          // style={{
                          //   color:
                          //     (myAttemptedQuestionsScore
                          //       ? localSelectedAnswers
                          //       : selectedAnswers)[index] &&
                          //     conditionalCheckAnswer(index)
                          //       ? ""
                          //       : "#E8352B",
                          // }}
                          style={{
                            background: (myAttemptedQuestionsScore ? localSelectedAnswers : selectedAnswers)[index] && conditionalCheckAnswer(index)
                              ? "#996cfe" 
                              : "#E8352B",
                          }}
                        >
                          {(myAttemptedQuestionsScore
                            ? localSelectedAnswers
                            : selectedAnswers)[index] || <span>-</span>}
                        </CorrectAnswerDiv>
                      ))}
                    </FlexDiv>
                  )}
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

export default AiScorePopupReading;
