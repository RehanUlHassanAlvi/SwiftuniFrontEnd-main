import React, { useState, useEffect } from "react";
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
  Flexed2,
  AiScoreParagraphText,
  Flexed3,
  ToggleIconWrapper,
} from "../Writing/style";
import {
  ListeningPopupWrapper,
  EnableSkillsCard,
  ResponseCard,
  ResponseContentWrapper,
  ResponseContentWrapper2,
  UserResListsHeading,
  UserResList,
  PopupTWs,
} from "../Listening/styles";
import CircularScoreProgress from "../Writing/CircularScoreProgress";
import EnableSkillsScoreTable from "../Writing/EnableSkillsScoreTable";
import { useMediaQuery } from "@mui/material";
import GreenEclipse from "../../assets/images/GreenEllipse0.svg";
import RedEclipse from "../../assets/images/RedEllipse0.svg";
import YellowEclipse from "../../assets/images/YellowElipse.svg";
import nlp from "compromise";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Collapse } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { GlobalAudioPlayerStyles } from "./styles";
import CircularProgress from "../Login/CircularLoader";

// function countWordsInOriginalText(Text = "") {
//   if (typeof Text !== "string") return 0;
//   const cleanedText = Text.trim().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
//   if (cleanedText === "") return 0;
//   const wordsArray = cleanedText.split(" ");
//   return wordsArray.length;
// }

function countWordsInOriginalText(Text = "") {
  console.log("Text for counting words: ", Text);
  if (typeof Text !== "string") return 0;
  const cleanedText = Text?.trim()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ");
  if (cleanedText === "") return 0;
  const wordsArray = cleanedText.split(" ");
  const filteredWordsArray = wordsArray.filter((word) => word.length > 0);
  return filteredWordsArray.length;
}

function normalizeText(text) {
  let doc = nlp(text);
  doc.verbs().toInfinitive();
  doc.nouns().toSingular();
  return doc.text().toLowerCase();
}

function generateFeedbackArray(numWords, score) {
  const feedbackArray = [];
  let numAverage, numBad;

  switch (score) {
    case 5:
      return Array(numWords).fill("good");
    case 4:
      numAverage = Math.floor(numWords / 5);
      numBad = 0;
      break;
    case 3:
      numAverage = Math.floor(numWords / 5) + 1;
      numBad = 0;
      break;
    case 2:
      numAverage = Math.floor(numWords / 5) + 2;
      numBad = 1;
      break;
    case 1:
      numAverage = Math.floor(numWords / 5) + 2;
      numBad = 3;
      break;
    case 0:
      numAverage = 2;
      numBad = numWords - numAverage;
      break;
    default:
      return Array(numWords).fill("good");
  }

  let numGood = numWords - numAverage - numBad;

  // Fill the feedbackArray with the correct amounts of 'good', 'bad', and 'average'
  for (let i = 0; i < numGood; i++) {
    feedbackArray.push("good");
  }
  for (let i = 0; i < numAverage; i++) {
    feedbackArray.push("average");
  }
  for (let i = 0; i < numBad; i++) {
    feedbackArray.push("bad");
  }

  // Shuffle the array to randomize the placement
  for (let i = feedbackArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [feedbackArray[i], feedbackArray[j]] = [feedbackArray[j], feedbackArray[i]];
  }

  return feedbackArray;
}

const getColor = (stat) => {
  if (stat === "good") {
    return "green";
  } else if (stat === "average") {
    return "#dbdb25";
  } else {
    return "red";
  }
};

function highlightResponse(
  userResponse,
  correctWordIndices,
  incorrectWordIndices
) {
  if (typeof userResponse !== "string") {
    console.error(
      "highlightResponse called with non-string userResponse",
      userResponse
    );
    return { highlightedText: "", score: 0 };
  }

  const combinedIndices = [
    ...correctWordIndices.map((indices) => ({ indices, correct: true })),
    ...incorrectWordIndices.map((indices) => ({ indices, correct: false })),
  ];

  combinedIndices.sort((a, b) => a.indices[0] - b.indices[0]);

  const highlightedWords = [];
  let currentIndex = 0;

  combinedIndices.forEach(({ indices: [start, end], correct }) => {
    if (currentIndex < start) {
      highlightedWords.push(userResponse.slice(currentIndex, start));
    }
    highlightedWords.push(
      `<span style="color: ${correct ? "green" : "red"};">${userResponse.slice(
        start,
        end
      )}</span>`
    );
    currentIndex = end;
  });

  if (currentIndex < userResponse.length) {
    highlightedWords.push(userResponse.slice(currentIndex));
  }

  return { highlightedText: highlightedWords.join(" "), score: 0 };
}

function highlightResponseTwo(
  userResponse,
  correctWordIndices,
  incorrectWordIndices,
  allData = []
) {
  if (typeof userResponse !== "string") {
    console.error(
      "highlightResponse called with non-string userResponse",
      userResponse
    );
    return { highlightedText: "", score: 0 };
  }

  const combinedIndices = [
    ...correctWordIndices.map((indices) => ({ indices, correct: true })),
    ...incorrectWordIndices.map((indices) => ({ indices, correct: false })),
  ];

  combinedIndices.sort((a, b) => a.indices[0] - b.indices[0]);

  const highlightedWords = [];
  let currentIndex = 0;

  const pronounScore = allData.pronunciation_score
    ? allData.pronunciation_score
    : allData.pronounciation_score;
  const colors = generateFeedbackArray(combinedIndices.length, pronounScore);
  let counter = 0;
  combinedIndices.forEach(({ indices: [start, end], correct }) => {
    if (currentIndex < start) {
      highlightedWords.push(userResponse.slice(currentIndex, start));
    }
    highlightedWords.push(
      `<span style="color: ${
        correct ? getColor(colors[counter]) : "red"
      };">${userResponse.slice(start, end)}</span>`
    );
    counter += 1;
    currentIndex = end;
  });

  if (currentIndex < userResponse.length) {
    highlightedWords.push(userResponse.slice(currentIndex));
  }

  return { highlightedText: highlightedWords.join(" "), score: 0 };
}

const highlightResponseThree = (userResponse, allData) => {
  userResponse = typeof userResponse === 'string' ? userResponse : '';
  let words = userResponse?.trim().split(/\s+/).filter((word) => word.length > 0);
  let wordLen = words.length;
  const pronounScore = allData?.pronunciation_score
    ? allData?.pronunciation_score
    : allData?.pronounciation_score;
  const colors = generateFeedbackArray(wordLen, pronounScore);
  let counter = 0;
  const highlightedWords = [];
  words.forEach((word) => {
    highlightedWords.push(
      `<span style="color: ${getColor(colors[counter])};">${word}</span>`
    );
    highlightedWords.push(" ");
    counter += 1;
  });
  return { highlightedText: highlightedWords.join(" "), score: 0 };
};

const AiScorePopupSpeakingRTL = ({
  close,
  dataKey,
  // EnableSkills = null,
  SmallScoreCard,
  UserResponse = "",
  OriginalText = "",
  recordedAudio,
  elapsedTime = null,
  enableSkillsScore = {},
  // contentTotalScore = 3,
  contentTotalScore=90,
  // totalScore = 13,
  totalScore = 90,
  show = true,
  text = "",
  allData = [],
  two = false,
  three = false,
}) => {
  const isMobile = useMediaQuery("(max-width:750px)");
  const [totalWords, setTotalWords] = useState(0);
  const [score, setScore] = useState(0);
  const [highlightedText, setHighlightedText] = useState("");
  const [expanded, setExpanded] = useState(false);

  if (enableSkillsScore.pronunciation_score === undefined) {
    enableSkillsScore.pronunciation_score =
      enableSkillsScore.pronounciation_score;
  }

  useEffect(() => {
    let newHighlightedText = UserResponse;
    let highlightedWords = "";

    if (
      UserResponse &&
      enableSkillsScore.correct_indices &&
      enableSkillsScore.incorrect_indices
    ) {
      if (two) {
        const { highlightedText } = highlightResponseTwo(
          UserResponse,
          enableSkillsScore.correct_indices,
          enableSkillsScore.incorrect_indices,
          allData
        );
        newHighlightedText = highlightedText;
      } else {
        const { highlightedText } = highlightResponse(
          UserResponse,
          enableSkillsScore.correct_indices,
          enableSkillsScore.incorrect_indices
        );
        newHighlightedText = highlightedText;
      }
    } else if (
      UserResponse &&
      enableSkillsScore.matched_indices &&
      enableSkillsScore.mismatched_indices
    ) {
      if (two) {
        const { highlightedText } = highlightResponseTwo(
          UserResponse,
          enableSkillsScore.matched_indices,
          enableSkillsScore.mismatched_indices,
          allData
        );
        newHighlightedText = highlightedText;
      } else {
        const { highlightedText } = highlightResponse(
          UserResponse,
          enableSkillsScore.matched_indices,
          enableSkillsScore.mismatched_indices
        );
        newHighlightedText = highlightedText;
      }
    } else if (UserResponse) {
      if (three) {
        const { highlightedText } = highlightResponseThree(
          UserResponse,
          allData
        );
        newHighlightedText = highlightedText;
      }
    }

    setHighlightedText(newHighlightedText);

    const newScore =
      (enableSkillsScore.content_score || 0) +
      (enableSkillsScore.pronunciation_score || 0) +
      (enableSkillsScore.fluency_score || 0);
    setScore(newScore);

    const parser = new DOMParser();
    const doc = parser.parseFromString(newHighlightedText, "text/html");
    const spanElements = doc.getElementsByTagName("span");
    for (let span of spanElements) {
      highlightedWords += span.textContent + " ";
    }
    const highlightedWordCount = countWordsInOriginalText(highlightedWords);
    setTotalWords(highlightedWordCount);

    // const totalWordsCount = countWordsInOriginalText(UserResponse);
    // setTotalWords(totalWordsCount);
  }, [UserResponse, enableSkillsScore]);

  const calculateWidth = (elements) => {
    const numElements = elements;
    if (numElements > 1) {
      return `${Math.floor(100 / numElements) - 1}%`;
    } else {
      return `${Math.floor(100 / numElements)}%`;
    }
  };

  const fluency = () => {
    return enableSkillsScore.fluency_score;
  };

  // const fluencySuggestions = enableSkillsScore.comments.filter(comment => comment.includes("Fluency"));
  const fluencySuggestions = enableSkillsScore.comments;
  let fluencySuggestion;
  if (Array.isArray(fluencySuggestions)) {
    fluencySuggestion = fluencySuggestions.join("\n");
  } else {
    fluencySuggestion = [
      "Spoken Content is below the required threshold.",
    ].join("\n");
  }

  const EnableSkills = [
    {
      component: "Content",
      score: `${enableSkillsScore.content_score ?? 0}/90`,
      suggestion:
        enableSkillsScore.content_score === 0
          ? "Content is insufficient. Try to add more relevant details to improve the score."
          : "Too few words are repeated. Try to aim for at least 50%",
    },
    {
      component: "Pronunciation",
      // score: `${enableSkillsScore.pronunciation_score ?? 0}/5`,
       score: `${enableSkillsScore.pronunciation_score ?? 0}/90`,

      suggestion:
        enableSkillsScore.pronunciation_score === 0
          ? "Pronunciation needs improvement. \nPractice enunciating words more clearly."
          : `A clear speech with correct pronunciation\nA smooth tone, without frequent stresses\nA continuous speech.`,
    },
    {
      component: "Fluency",
      // score: `${fluency() ?? 0}/5`,
      score: `${fluency() ?? 0}/90`,
      suggestion:
        fluency() === 0
          ? "Fluency is lacking. Try to speak more smoothly without long pauses."
          : fluencySuggestion,
    },
  ];

  // const EnableSkills = [
  //   {
  //     component: "Content",
  //     score: `${enableSkillsScore.content_score ?? 0}/${contentTotalScore}`,
  //     suggestion: "Too few words are repeated. Try to aim for at least 50%",
  //   },
  //   {
  //     component: "Pronunciation",
  //     score: `${enableSkillsScore.pronunciation_score ?? 0}/5`,
  //     suggestion: `A clear speech with correct pronunciation\nA smooth tone, without frequent stresses\n A continuous speech.`,
  //   },
  //   {
  //     component: "Fluency",
  //     score: `${fluency() ?? 0}/5`,
  //     suggestion: fluencySuggestion,
  //   },
  // ];

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const CustomAudioPlayer = ({ src }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    if (!src) {
      return (
        <FlexDiv
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            fontSize: "16px",
            color: "#555",
          }}
        >
          No Audio Available
        </FlexDiv>
      );
    }

    return (
      <>
        <GlobalAudioPlayerStyles />
        {isLoading && (
          <FlexDiv
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              gap: "5px",
            }}
          >
            <CircularProgress color={"black"} />
            <FlexDiv
              style={{
                textAlign: "center",
                fontSize: "16px",
                color: "#555",
              }}
            >
              Loading audio...
            </FlexDiv>
          </FlexDiv>
        )}
        <AudioPlayer
          src={src}
          onPlay={(e) => console.log("onPlay")}
          onCanPlayThrough={handleCanPlayThrough}
          customAdditionalControls={[]}
          style={{
            borderRadius: "0.5rem",
            background: "rgba(153, 108, 254, 0.10)",
            display: isLoading ? "none" : "block",
          }}
        />
      </>
    );
  };

  return (
    <FlexDiv
      style={{ justifyContent: "center", zIndex: "1001", width: "100%" }}
    >
      <ListeningPopupWrapper id="scorecard">
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

        <Flexed3>
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
                      score={score > 0 ? Math.round(score / 3) : 0}
                      totalScore={90}
                      progressColorFilled={scoreCard.progressColorFilled}
                      scoreColor={scoreCard.scoreColor}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>Out of 90</WritingOutOfText>
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
                // column={columns}
                rows={EnableSkills}
                obtainedScore={score}
                isList={true}
              />
            </EnableSkillsCard>
          </FlexDiv>
        </Flexed3>
        <FlexDiv
          style={{
            flexDirection: "column",
            gap: "20px",
            width: isMobile ? "97%" : "96%",
            alignSelf: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            <CustomAudioPlayer src={recordedAudio} />
          </div>
          <ResponseCard style={{ width: "100%" }}>
            <UserResponseHeader>
              <HeaderText>AI Speech Recognition</HeaderText>
            </UserResponseHeader>
            <ResponseContentWrapper2>
              {show ? (
                highlightedText && typeof highlightedText === "string" && highlightedText?.trim() !== "" ? (
                  <AiScoreParagraphText key={dataKey}>
                    <div
                      dangerouslySetInnerHTML={{ __html: highlightedText }}
                    />
                  </AiScoreParagraphText>
                ) : (
                  <FlexDiv style={{ width: "100%", gap: "0px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%", // Ensure full height is utilized
                        color: "#007BFF", // Informational blue color
                        fontStyle: "italic", // Informational style
                        fontWeight: "bold", // Bold for emphasis
                        padding: "10px",
                        // backgroundColor: "#f0f8ff", // Light blue background for emphasis
                        borderRadius: "5px",
                        textAlign: "center",
                      }}
                    >
                      No User Speech
                    </div>
                    {/* <div>
                    🤐
                  </div> */}
                    <div>🔇</div>
                  </FlexDiv>
                )
              ) : text && text?.trim() !== "" ? (
                <AiScoreParagraphText key={dataKey}>
                  {text}
                </AiScoreParagraphText>
              ) : (
                <FlexDiv style={{ width: "100%", gap: "0px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%", // Ensure full height is utilized
                      color: "#007BFF", // Informational blue color
                      fontStyle: "italic", // Informational style
                      fontWeight: "bold", // Bold for emphasis
                      padding: "10px",
                      // backgroundColor: "#f0f8ff", // Light blue background for emphasis
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    No User Speech
                  </div>
                  {/* <div>
                    🤐
                  </div> */}
                  <div>🔇</div>
                </FlexDiv>
              )}
              <FlexDiv
                style={{
                  width: "100%",
                  alignItems: "flex-start",
                  flexDirection: "row",
                  justifyContent: "flex-between",
                  gap: "20px",
                }}
              >
                <FlexDiv
                  style={{ justifyContent: "flex-start", width: "100%" }}
                >
                  <PopupTWs>
                    Total: {totalWords} {totalWords === 1 ? "word" : "words"}
                  </PopupTWs>
                </FlexDiv>
                {show && (
                  <FlexDiv
                    style={{
                      width: "100%",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      gap: "30px",
                    }}
                  >
                    <UserResList>
                      <img src={GreenEclipse} alt="" />
                      <UserResListsHeading>Good</UserResListsHeading>
                    </UserResList>
                    <UserResList>
                      <img src={YellowEclipse} alt="" />
                      <UserResListsHeading>Average</UserResListsHeading>
                    </UserResList>
                    <UserResList>
                      <img src={RedEclipse} alt="" />
                      <UserResListsHeading>Bad / Missing</UserResListsHeading>
                    </UserResList>
                  </FlexDiv>
                )}
              </FlexDiv>
            </ResponseContentWrapper2>
          </ResponseCard>

          <ResponseCard style={{ width: "100%" }}>
            <UserResponseHeader onClick={handleToggle}>
              <HeaderText>Annotation</HeaderText>
              <ToggleIconWrapper>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ToggleIconWrapper>
            </UserResponseHeader>
            <Collapse in={expanded}>
              <ResponseContentWrapper expanded={expanded}>
                <AiScoreParagraphText>
                  <div>
                    The Overall Score Prediction is based only on your current
                    response.
                  </div>
                  <span>A low score could be due to below reasons:</span>
                  <div>
                    <span>Microphone:</span> A good microphone & how it is
                    positioned plays an important role.
                  </div>
                  <div>
                    <span>Browser:</span> Any browser other than Google Chrome
                    may affect your score.
                  </div>
                  <div>
                    <span>Pauses:</span> Your response must not contain pauses
                    that are for 2 or more seconds in length.
                  </div>
                </AiScoreParagraphText>
              </ResponseContentWrapper>
            </Collapse>
          </ResponseCard>

          {isMobile && (
            <FlexDiv style={{ width: "100%", justifyContent: "space-between" }}>
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
                    score={score > 0 ? Math.round(score / 3) : 0}
                    totalScore={90}
                      progressColorFilled={scoreCard.progressColorFilled}
                      scoreColor={scoreCard.scoreColor}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>Out of 90</WritingOutOfText>
                  </ContentWrapper1>
                </AiScoreSmallCard>
              ))}
            </FlexDiv>
          )}
        </FlexDiv>
      </ListeningPopupWrapper>
    </FlexDiv>
  );
};

export default AiScorePopupSpeakingRTL;
