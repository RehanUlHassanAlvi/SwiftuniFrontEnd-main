import React, { useEffect } from "react";
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
  LoremCard,
  LoremHeader,
  LoremContentText,
  UserResponseCard,
  UserResponseHeader,
  ContentWrapper1,
  ContentWrapper2,
  AiScoreParagraphCard,
  AiScoreParagraphText,
  WritingOutOfText,
  Flexed1,
  Flexed2,
} from "./style";
import { highlightWords } from "./data";
import CircularScoreProgress from "./CircularScoreProgress";
import EnableSkillsScoreTable from "./EnableSkillsScoreTable";
import InfoIcon from "../../assets/images/infoicon2.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";

const columns = [
  { name: "Component", width: "40%" },
  { name: "Score", width: "10%" },
  { name: "Suggestion", width: "50%" },
];

const EmailScorePopup = ({
  EnableSkillsScore,
  SmallScoreCard,
  UserResponse,
  essay = true,
  elapsedTime,
  setEnableSkills,
  grammarKeyName = "grammar mistakes",
  grammarIndexKeyName = "grammatical mistakes indices",
  mispelledIndex = "misspelled Indices",
}) => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const isMobile = useMediaQuery("(max-width: 550px)");
  const paragraphs = UserResponse.textValue.split("\n");

  const englishVariant =
    EnableSkillsScore.accent === "en-us" ? "American" : "British";

  const highlightMisspelledWords = (paragraph) => {
    const array = EnableSkillsScore[grammarKeyName];
    const object = EnableSkillsScore["corrected words"];
    if (!array && !object) return paragraph;

    const keys = Object.keys(object);

    const newArray = array.concat(keys);

    const merged = EnableSkillsScore[grammarIndexKeyName]
      .map((range) => ({ type: "Grammar mistake", range }))
      .concat(
        EnableSkillsScore[mispelledIndex].map((range) => ({
          type: "Spelling mistake",
          range,
        }))
      );

    merged.sort((a, b) => a.range[0] - b.range[0]);

    const result = {
      header: merged.map((item) => item.type),
      index: merged.map((item) => item.range),
    };

    return highlightWords(
      UserResponse.textValue,
      newArray,
      result.index,
      result.header
    );
  };

  const scoreKeyToComponentMapping = {
    content_score: { name: "Content", maxScore: 3 },
    organization_score: {
      name: "Organization",
      maxScore: 2,
    },
    form_score: { name: "Form", maxScore: essay ? 2 : pte_core ? 2 : 1 },
    email_convention_score: {
      name: "Email Convention Score",
      maxScore: 2,
    },
    grammar_score: { name: "Grammar", maxScore: 2 },
    spelling_score: { name: "Spelling", maxScore: 2 },
    vocab_range_score: { name: "Vocabulary Range", maxScore: 2 },
  };

  function mapScoresToTableRows(scores) {
    const excludeKeys = [
      "total_score",
      "comments",
      "corrected words",
      "accent",
      "misspelled Indices",
      "grammatical mistakes indices",
    ];

    return Object.entries(scores)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([key, value]) => {
        const component = scoreKeyToComponentMapping[key];
        if (!component) return null;
        const score = `${value}/${component.maxScore}`;
        const suggestion = scores.comments[key] || "Great!";

        return {
          component: component.name,
          score,
          suggestion,
        };
      })
      .filter((row) => row !== null);
  }

  const tableRows = mapScoresToTableRows(EnableSkillsScore);

  useEffect(() => {
    if (tableRows) {
      setEnableSkills(tableRows);
    }
  }, [tableRows]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <FlexDiv style={{ justifyContent: "center", zIndex: "1001" }}>
      <CardWrapperRE
        id="scorecard"
        style={{ paddingBottom: "0px", height: "max-content" }}
      >
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
            <Flexed2
              style={{
                width: isSmallScreen ? "30%" : "20%",
                alignItems: "flex-start",
              }}
            >
              {SmallScoreCard.map((scoreCard, index) => (
                <AiScoreSmallCard
                  BorderColor={scoreCard.HeaderBgColor}
                  key={index}
                  style={{ width: "100%" }}
                >
                  <AiScoreSmallCardHeader BgColor={scoreCard.HeaderBgColor}>
                    <HeaderText>{scoreCard.Heading}</HeaderText>
                  </AiScoreSmallCardHeader>
                  <ContentWrapper1>
                    <CircularScoreProgress
                      score={EnableSkillsScore.total_score}
                      totalScore={scoreCard.totalScore}
                      progressColorFilled={scoreCard.progressColorFilled}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>
                      Out of {scoreCard.totalScore}
                    </WritingOutOfText>
                  </ContentWrapper1>
                </AiScoreSmallCard>
              ))}
              <LoremCard style={{ width: "100%" }}>
                <LoremHeader>
                  <HeaderText>Lorem</HeaderText>
                </LoremHeader>
                <ContentWrapper2>
                  <LoremContentText>Total:</LoremContentText>
                  <LoremContentText>
                    {EnableSkillsScore.total_score}
                  </LoremContentText>
                </ContentWrapper2>
                <ContentWrapper2>
                  <LoremContentText>Time:</LoremContentText>
                  <LoremContentText>{formatTime(elapsedTime)}</LoremContentText>
                </ContentWrapper2>
                <ContentWrapper2>
                  <LoremContentText>English:</LoremContentText>
                  <FlexDiv>
                    <LoremContentText>{englishVariant}</LoremContentText>
                    <img src={InfoIcon} alt="" style={{ marginLeft: "5px" }} />
                  </FlexDiv>
                </ContentWrapper2>
              </LoremCard>
            </Flexed2>
          )}

          <FlexDiv
            style={{
              width: isSmallScreen ? "100%" : "80%",
            }}
          >
            <EnableSkillsCardRE>
              <EnableSkillsHeader>
                <HeaderText>Enable Skills</HeaderText>
              </EnableSkillsHeader>
              <EnableSkillsScoreTable rows={tableRows} column={columns} />
            </EnableSkillsCardRE>
          </FlexDiv>
        </Flexed1>

        <FlexDiv>
          <UserResponseCard>
            <UserResponseHeader>
              <HeaderText>User's Response</HeaderText>
            </UserResponseHeader>
            <AiScoreParagraphCard>
              <AiScoreParagraphText style={{ whiteSpace: "pre-wrap" }}>
                {highlightMisspelledWords(UserResponse.textValue)}
              </AiScoreParagraphText>
            </AiScoreParagraphCard>
          </UserResponseCard>
        </FlexDiv>

        <Flexed1 style={{ marginBottom: "1rem" }}>
          {isMobile && (
            <Flexed2
              style={{
                width: isSmallScreen ? (isMobile ? "48%" : "30%") : "20%",
                alignItems: "flex-start",
              }}
            >
              {SmallScoreCard.map((scoreCard, index) => (
                <AiScoreSmallCard
                  BorderColor={scoreCard.HeaderBgColor}
                  key={index}
                  style={{ width: "100%" }}
                >
                  <AiScoreSmallCardHeader BgColor={scoreCard.HeaderBgColor}>
                    <HeaderText>{scoreCard.Heading}</HeaderText>
                  </AiScoreSmallCardHeader>
                  <ContentWrapper1>
                    <CircularScoreProgress
                      score={EnableSkillsScore.total_score}
                      totalScore={scoreCard.totalScore}
                      progressColorFilled={scoreCard.progressColorFilled}
                      progressColorUnfilled={scoreCard.progressColorUnfilled}
                    />
                    <WritingOutOfText>
                      Out of {scoreCard.totalScore}
                    </WritingOutOfText>
                  </ContentWrapper1>
                </AiScoreSmallCard>
              ))}
              <LoremCard style={{ width: "100%" }}>
                <LoremHeader>
                  <HeaderText>Lorem</HeaderText>
                </LoremHeader>
                <ContentWrapper2>
                  <LoremContentText>Total:</LoremContentText>
                  <LoremContentText>
                    {EnableSkillsScore.total_score}
                  </LoremContentText>
                </ContentWrapper2>
                <ContentWrapper2>
                  <LoremContentText>Time:</LoremContentText>
                  <LoremContentText>{formatTime(elapsedTime)}</LoremContentText>
                </ContentWrapper2>
                <ContentWrapper2>
                  <LoremContentText>English:</LoremContentText>
                  <FlexDiv>
                    <LoremContentText>{englishVariant}</LoremContentText>
                    <img src={InfoIcon} alt="" style={{ marginLeft: "5px" }} />
                  </FlexDiv>
                </ContentWrapper2>
              </LoremCard>
            </Flexed2>
          )}
        </Flexed1>
      </CardWrapperRE>
    </FlexDiv>
  );
};

export default EmailScorePopup;
