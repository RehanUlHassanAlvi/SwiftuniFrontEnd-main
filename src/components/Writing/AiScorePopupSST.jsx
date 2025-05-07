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
import CircularScoreProgress from "./CircularScoreProgress";
import EnableSkillsScoreTable from "./EnableSkillsScoreTable";
import InfoIcon from "../../assets/images/infoicon2.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { calculateTotalScore, findMistakeIndexes, highlightWords } from "./AiScorePopupWriting";

const columns = [
  { name: "Component", width: "40%" },
  { name: "Score", width: "10%" },
  { name: "Suggestion", width: "50%" },
];

const AiScorePopupSST = ({
  close,
  EnableSkillsScore,
  SmallScoreCard,
  UserResponse,
  essay = true,
  elapsedTime,
  grammarKeyName = "grammar mistakes",
  grammarIndexKeyName = "grammatical mistakes indices",
  mispelledIndex = "misspelled words indices",
  pte_core = false,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const isMobile = useMediaQuery("(max-width: 550px)");
  const paragraphs = UserResponse.textValue.split("\n");
  let grammarScoreCounter = 0;  
  const [totalObtainedScore, setTotalObtainedScore] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [tRows, setTRows] = useState([]);
  const [highWords, setHighWords] = useState([]);

  const englishVariant =
    EnableSkillsScore.accent === "en-us" ? "American" : "British";

  // const highlightMisspelledWords = (paragraph) => {
  //   const grammarMistakes = EnableSkillsScore[grammarKeyName] || [];
  //   const correctedWords = EnableSkillsScore["corrected words"] || {};

  //   const keys = Object.keys(correctedWords);

  //   const newArray = grammarMistakes.concat(keys);

  //   const grammarMistakesIndices = EnableSkillsScore[grammarIndexKeyName] || [];
  //   const misspelledIndices = EnableSkillsScore[mispelledIndex] || [];

  //   const merged = grammarMistakesIndices
  //     .map((range) => ({ type: "Grammar mistake", range }))
  //     .concat(
  //       misspelledIndices.map((range) => ({ type: "Spelling mistake", range }))
  //     );

  //   merged.sort((a, b) => a.range[0] - b.range[0]);

  //   const result = {
  //     header: merged.map((item) => item.type),
  //     index: merged.map((item) => item.range),
  //   };

  //   return highlightWords(
  //     UserResponse.textValue,
  //     newArray,
  //     result.index,
  //     result.header
  //   );
  // };

  const scoreKeyToComponentMapping = {
    content_score: { name: "Content", maxScore: essay ? 3 : 2 },
    development_structure_coherence_score: {
      name: "Development, Structure, and Coherence",
      maxScore: 2,
    },
    form_score: { name: "Form", maxScore: essay ? 2 : pte_core ? 2 : 2 },
    general_linguistic_range_score: {
      name: "General Linguistic Range",
      maxScore: 2,
    },
    grammar_score: { name: "Grammar", maxScore: 2 },
    spelling_score: { name: "Spelling", maxScore: 2 },
    vocab_range_score: { name: "Vocabulary Range", maxScore: 2 },
  };

  let tableRows = [];
  useEffect(() => {
    let spellingMistakeCount = 0;
    const highlightMistakes = () => {
      let tmpMistakes = Array.isArray(EnableSkillsScore?.['mistakes']) ? [...EnableSkillsScore['mistakes']] : [];
      const correctedWords = EnableSkillsScore['corrected words'];
  
      if (correctedWords && typeof correctedWords === 'object' && !Array.isArray(correctedWords)) {    
        Object.entries(EnableSkillsScore['corrected words']).forEach(([key, value]) => {
          let newMistake = {
            mistake_explanation: `Spelling Mistake: ${key} should be ${value}`,
            mistake_str: key,
            mistake_word: key        
          }
          spellingMistakeCount += 1;
          tmpMistakes.push(newMistake);
        });    
      }
      const val = findMistakeIndexes(UserResponse.textValue, tmpMistakes);
      if(val.reqIndex?.length){
        grammarScoreCounter = val.reqIndex.length - spellingMistakeCount;
      }
      const combinedArray = val.exp.map((exp, index) => ({
        exp,
        reqIndex: val.reqIndex[index]
      }));
      combinedArray.sort((a, b) => {
        if (a.reqIndex[0] < b.reqIndex[0]) return -1;
        if (a.reqIndex[0] > b.reqIndex[0]) return 1;
        return 0;
      });
      const sortedData = {
        exp: combinedArray.map(item => item.exp),
        reqIndex: combinedArray.map(item => item.reqIndex)
      };    
  
      let hW = highlightWords(
        UserResponse.textValue,
        [],
        sortedData?.reqIndex,
        sortedData?.exp
      );
      setHighWords(hW);
    }

    function mapScoresToTableRows(scores) {
      const excludeKeys = [
        "total_score",
        "comments",
        "corrected words",
        "accent",
      ];
  
      const normalizedComments = {};
      for (const key in scores.comments) {
        if (key === "spelling_score") {
          normalizedComments["spelling"] = scores.comments[key];
        } 
        else if (key === "Vocabulary") {
          normalizedComments["vocabulary range"] = scores.comments[key];
        } else {
          normalizedComments[key.toLowerCase()] = scores.comments[key];
        }
      }
  
      let objEnt = Object.entries(scores)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value]) => {
          const component = scoreKeyToComponentMapping[key];
          if (!component) return null;
          const score = `${value}/${component.maxScore}`;
          const suggestion =
            normalizedComments[component.name.toLowerCase()] || "Great!";
  
          return {
            component: component.name,
            score,
            suggestion,
          };
        })
        .filter((row) => row !== null);
        if(EnableSkillsScore['content_score'] === 0){
          setTotalObtainedScore(0)
          objEnt[2].score = `0/2`;  
        }else{
          grammarScoreCounter = 2 - (grammarScoreCounter*0.5);
          grammarScoreCounter = grammarScoreCounter>0? grammarScoreCounter : 0; 
          objEnt[2].score = `${grammarScoreCounter}/2`;
          let tmpScore = calculateTotalScore(objEnt);
          setTotalObtainedScore(tmpScore);
        }
        return objEnt;
    }
    highlightMistakes();
    tableRows = mapScoresToTableRows(EnableSkillsScore);
    setTRows(tableRows);
    setIsLoading(false);
  }, []);

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
        {loading?
          <></>
        :
        <>
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
                      score={totalObtainedScore}
                      totalScore={scoreCard.totalScore}
                      scoreColor={scoreCard.scoreColor}
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
                  <HeaderText>Summary</HeaderText>
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
              <EnableSkillsScoreTable rows={tRows} column={columns} />
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
                {highWords}
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
                  <HeaderText>Summary</HeaderText>
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
        </>
        }
      </CardWrapperRE>
    </FlexDiv>
  );
};

export default AiScorePopupSST;
