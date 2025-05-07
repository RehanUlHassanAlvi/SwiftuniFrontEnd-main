import React, {useEffect} from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  CardHeader,
  CardHeaderText,
  HeaderText,
  EnableSkillsHeader,
  AiScoreSmallCard,
  AiScoreSmallCardHeader,
  UserResponseHeader,
  ContentWrapper1,
  WritingOutOfText,
  Flexed1,
  Flexed2,
  AiScoreParagraphText,
} from "../Writing/style";
import {
  ListeningPopupWrapper,
  EnableSkillsCard,
  ResponseCard,
  ResponseContentWrapper,
  ResponseContentWrapper2,
  UserResListsHeadingWFD,
  UserResLists,
} from "./styles";
import CircularScoreProgress from "../Writing/CircularScoreProgress";
import EnableSkillsScoreTable from "../Writing/EnableSkillsScoreTable";
import { useMediaQuery } from "@mui/material";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";

const colorIndexing = {
  correct: "#008000",
  incorrect: "#FF8743",
  missed: "#289EAE",
};

const tokenize = (text) => {
  const regex = /[\w']+|[.,!?;]/g;
  let tokens = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    tokens.push({
      word: match[0],
      index: match.index,
    });
  }
  return tokens;
};

const HighlightedResponse = ({
  userResponse,
  incorrectWords,
  missedWords,
  correctWords,
  correctResponse,
}) => {
  // Tokenize both correctResponse and userResponse
  const correctTokens = tokenize(correctResponse);
  const userTokens = tokenize(userResponse);

  // Alignment using the corrected algorithm
  let segments = [];
  let i = 0; // Index for correctTokens
  let j = 0; // Index for userTokens

  while (i < correctTokens.length || j < userTokens.length) {
    if (i < correctTokens.length && j < userTokens.length) {
      if (
        correctTokens[i].word.toLowerCase() ===
        userTokens[j].word.toLowerCase()
      ) {
        // Correct word
        segments.push({
          text: correctTokens[i].word,
          status: "correct",
        });
        i++;
        j++;
      } else if (missedWords.includes(correctTokens[i].word)) {
        // Missed word
        segments.push({
          text: correctTokens[i].word,
          status: "missed",
        });
        i++;
      } else if (incorrectWords.includes(userTokens[j].word)) {
        // Incorrect word
        segments.push({
          text: userTokens[j].word,
          status: "incorrect",
        });
        j++;
      } else {
        // Mismatch or extra word in user's response
        segments.push({
          text: userTokens[j].word,
          status: "incorrect",
        });
        j++;
      }
    } else if (i < correctTokens.length) {
      // Remaining words in correct answer (missed by user)
      segments.push({
        text: correctTokens[i].word,
        status: "missed",
      });
      i++;
    } else if (j < userTokens.length) {
      // Remaining words in user response (extra words)
      segments.push({
        text: userTokens[j].word,
        status: "incorrect",
      });
      j++;
    }
    // Add space after each word unless it's punctuation
    if (
      segments.length &&
      ![".", ",", "!", "?", ";"].includes(
        segments[segments.length - 1].text
      )
    ) {
      segments.push({
        text: " ",
        status: "normal",
      });
    }
  }

  // Render the segments
  const elements = segments.map((segment, index) => (
    <span
      key={`segment-${index}`}
      style={{ color: colorIndexing[segment.status] || "#000000" }}
    >
      {segment.text}
    </span>
  ));

  return <div>{elements}</div>;
};

function formatCorrectAnswer(answer) {
  // Ensure the answer is a string before proceeding
  if (Array.isArray(answer)) {
    answer = answer.join(" ");
  }

  if (typeof answer === "string") {
    // Add a period at the end if there isn't one
    if (!answer.endsWith(".")) {
      answer += ".";
    }
  }

  return answer;
}

const AiScorePopupListeningWFD = ({
  isOpen = false,
  close,
  dataKey,
  SmallScoreCard,
  UserResponse,
  correctAnswer,
  wfdScore,
}) => {
  const isMobile = useMediaQuery("(max-width:750px)");

  useEffect(() => {
    if (!isOpen) {
      // setWordCount(0);
      // setTotalObtainedScore(0);
      // setIsLoading(true);
      // setTRows([]);
      // setHighWords([]);
      // grammarScoreCounter = 0;
    }
  }, [isOpen]);

  const calculateWidth = (elements) => {
    const numElements = elements;
    if (numElements > 1) {
      return `${Math.floor(100 / numElements) - 1}%`;
    } else {
      return `${Math.floor(100 / numElements)}%`;
    }
  };

  return (
    <FlexDiv
      style={{ justifyContent: "center", zIndex: "1001", width: "100%" }}
    >
      <ListeningPopupWrapper id="scorecard">
        <CardHeader>
          <CardHeaderText>AI Score</CardHeaderText>
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
                      score={wfdScore.writing_score}
                      totalScore={wfdScore.total_score}
                      progressColorFilled={scoreCard.progressColorFilled}
                      scoreColor={scoreCard.scoreColor}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>
                      Out of {wfdScore.total_score}
                    </WritingOutOfText>
                  </ContentWrapper1>
                </AiScoreSmallCard>
              ))}
            </Flexed2>
          )}
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: "12px",
              width: isMobile ? "100%" : "90%",
            }}
          >
            <EnableSkillsCard>
              <EnableSkillsHeader>
                <HeaderText>Enabling Skills</HeaderText>
              </EnableSkillsHeader>
              <EnableSkillsScoreTable
                rows={[
                  {
                    component: "Words",
                    score: `${wfdScore.writing_score}/${wfdScore.total_score}`,
                    suggestion:
                      wfdScore.writing_score > 0
                        ? "Good attempt!"
                        : "Please try to improve your listening skills.",
                  },
                ]}
              />
            </EnableSkillsCard>
            <ResponseCard style={{ width: "100%" }}>
              <UserResponseHeader>
                <HeaderText>Correct Answer</HeaderText>
              </UserResponseHeader>
              <ResponseContentWrapper>
                <AiScoreParagraphText key={dataKey}>
                  {formatCorrectAnswer(correctAnswer)}
                </AiScoreParagraphText>
              </ResponseContentWrapper>
            </ResponseCard>
            <ResponseCard style={{ width: "100%" }}>
              <UserResponseHeader>
                <HeaderText>User's Response</HeaderText>
              </UserResponseHeader>
              <ResponseContentWrapper2>
                <AiScoreParagraphText key={dataKey}>
                  <HighlightedResponse
                    userResponse={UserResponse}
                    correctResponse={correctAnswer}
                    correctWords={wfdScore.correct_words}
                    missedWords={wfdScore.missed_words}
                    incorrectWords={wfdScore.incorrect_words}
                  />
                </AiScoreParagraphText>

                <FlexDiv
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <UserResLists>
                    <UserResListsHeadingWFD color={"#008000"}>
                      Correct Words
                    </UserResListsHeadingWFD>
                  </UserResLists>
                  <UserResLists>
                    <UserResListsHeadingWFD color={"#289EAE"}>
                      Missed Words
                    </UserResListsHeadingWFD>
                    {/* <div style={{ color: "#289EAE" }}>
                      {wfdScore.missed_words.join(", ")}
                    </div> */}
                  </UserResLists>
                  <UserResLists>
                    <UserResListsHeadingWFD color={"#FF8743"}>
                      Misspelt / Wrong Words
                    </UserResListsHeadingWFD>
                    {/* <div style={{ color: "#FF8743" }}>
                      {wfdScore.incorrect_words.join(", ")}
                    </div> */}
                  </UserResLists>
                </FlexDiv>
              </ResponseContentWrapper2>
            </ResponseCard>

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
                    <AiScoreSmallCardHeader
                      BgColor={scoreCard.HeaderBgColor}
                    >
                      <HeaderText>{scoreCard.Heading}</HeaderText>
                    </AiScoreSmallCardHeader>
                    <ContentWrapper1>
                      <CircularScoreProgress
                        score={wfdScore.writing_score}
                        totalScore={wfdScore.total_score}
                        progressColorFilled={scoreCard.progressColorFilled}
                        scoreColor={scoreCard.scoreColor}
                        progressColorUnfilled={
                          scoreCard.progressColorUnfilled
                        }
                      />
                      <WritingOutOfText>
                        Out of {wfdScore.total_score}
                      </WritingOutOfText>
                    </ContentWrapper1>
                  </AiScoreSmallCard>
                ))}
              </FlexDiv>
            )}
          </FlexDiv>
        </Flexed1>
      </ListeningPopupWrapper>
    </FlexDiv>
  );
};

export default AiScorePopupListeningWFD;
