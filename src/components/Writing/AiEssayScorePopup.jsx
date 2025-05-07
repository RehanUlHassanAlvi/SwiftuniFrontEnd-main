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
import { HtmlTooltip } from "./AiSummaryScorePopup";
import Typography from '@mui/material/Typography';
import { GRAMMAR_WORDS_TO_FILTER } from "../../constants/constants";

const columns = [
  { name: "Component", width: "40%" },
  { name: "Score", width: "10%" },
  { name: "Suggestion", width: "50%" },
];

export function calculateTotalScore(components) {
  let totalObtained = 0;

  components.forEach((component) => {
    const [obtained, total] = component.score.split("/").map(Number);
    totalObtained += obtained;
  });

  return totalObtained;
}

export const highlightWords = (text, words, indexes, tooltipHeading) => {
  let currentIndex = 0;
  const elements = [];

  for (let i = 0; i < indexes.length; i++) {
    // const word = words[i];
    const [start, end] = indexes[i];

    const beforeSpace = start > 0 && /\s/.test(text[start - 1]);
    const afterSpace = end < text.length && /\s/.test(text[end]);

    const adjustedStart = beforeSpace ? start - 1 : start;
    const adjustedEnd = afterSpace ? end + 1 : end;

    elements.push(text.substring(currentIndex, adjustedStart));

    elements.push(
      <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color="inherit"><span style={{fontWeight:'bold'}}>{tooltipHeading[i]['error_name']?`${tooltipHeading[i]['error_name']}`:''}</span></Typography>
          <div style={{width:'100%', height:'1px', margin:'2px 0px', backgroundColor:'black'}} />
          <Typography color="inherit">{tooltipHeading[i]['explanation']?`${tooltipHeading[i]['explanation']}`:''}</Typography>
          <Typography color="inherit">{tooltipHeading[i]['corrected']?`(${tooltipHeading[i]['corrected']})`:''}</Typography>
        </React.Fragment>
      }
    >
        <span
          style={{ color: "red", cursor: "pointer" }}
        >
          {text.substring(adjustedStart, adjustedEnd)}
        </span>
      </HtmlTooltip>
    );

    currentIndex = adjustedEnd;
  }

  elements.push(text.substring(currentIndex));

  return elements;
};

export const removeOverlappingIndexes = (data) => {
  const { reqIndex, exp } = data;
  const result = { reqIndex: [], exp: [] };
  const seen = new Set();

  reqIndex.forEach((indices, idx) => {
    const key = indices.join("-");
    if (!seen.has(key)) {
      seen.add(key);
      result.reqIndex.push(indices);
      result.exp.push(exp[idx]);
    }
  });

  return result;
};

export const findMistakeIndexes = (essay, mistakes, tmpTwoMistakes) => {
  const indexes = [];
  let mistakesIndexes = [];
  let explanationArr = [];

  let gramMistake = findGramMistakes(essay);
  tmpTwoMistakes.forEach((mistake) => {  

    const {phrase_with_mistake , exact_mistake_word, error_name, corrected, explanation} = mistake;
    let mistakeStrStartIndex = essay.indexOf(phrase_with_mistake);

    while (mistakeStrStartIndex !== -1) {
      const wordStartIndex =
        mistakeStrStartIndex + phrase_with_mistake.indexOf(exact_mistake_word);
      const wordEndIndex = wordStartIndex + exact_mistake_word.length - 1;
      if (
        exact_mistake_word !== "N/A" &&
        !explanation.includes("Missing period") &&
        !explanation.includes("Missing comma") &&
        !explanation.includes("(Unnecessary comma)") &&
        !explanation.includes("Capitalization error") &&
        !explanation.includes("(Punctuation error)") &&
        !explanation.includes("spelling")
      ) {
        let tmpExplanation = {
          error_name: error_name,
          explanation: explanation,
          corrected: corrected
        };
        indexes.push({
          exact_mistake_word,
          startIndex: wordStartIndex,
          endIndex: wordEndIndex,
          explanation:tmpExplanation
        });
        mistakesIndexes.push([wordStartIndex, wordEndIndex + 1]);
        explanationArr.push(tmpExplanation);
      }
      mistakeStrStartIndex = essay.indexOf(
        phrase_with_mistake,
        mistakeStrStartIndex + 1
      );
    }
  });


  let returnVal = {
    reqIndex: mistakesIndexes,
    exp: explanationArr,
  };

  gramMistake.forEach((mistake) => {
    returnVal.exp.push(mistake.message);
    returnVal.reqIndex.push([mistake.start, mistake.stop]);
  });

  const processedData = removeOverlappingIndexes(returnVal);

  return processedData;
};

export const findGramMistakes = (passage) => {

  if (!passage || typeof passage !== "string") return returnValueType ? 0 : [];
  
  const mistakes = [];
  let temp_mistake_explanation;

  const addMistake = (word, start, stop, message) => {
    if(!GRAMMAR_WORDS_TO_FILTER[word]){
      mistakes.push({ word, start, stop, message });
    }
  };

  // Check if the first word of the passage starts with a lowercase letter
  const firstWordMatch = passage.match(/^\s*[a-z]+\b/);
  if (firstWordMatch) {
    temp_mistake_explanation = {
      error_name: 'Grammar Error',
      explanation: `The first word of the passage should start with a capital letter.`,
    };    
    addMistake(
      firstWordMatch[0].trim(),
      firstWordMatch.index,
      firstWordMatch.index + firstWordMatch[0].trim().length,
      temp_mistake_explanation
    );
  }

  // Check if words after a period start with a capital letter
  const sentenceEndings = passage.matchAll(/[.?!]\s+[a-z]+\b/g);
  for (const match of sentenceEndings) {
    const wordStartIndex = match.index + match[0].search(/[a-z]/);
    const word = match[0].slice(match[0].search(/[a-z]/)).trim();
    temp_mistake_explanation = {
      error_name: 'Grammar Error',
      explanation: `The first word after a period should start with a capital letter.`,
    };    
    addMistake(
      word,
      wordStartIndex,
      wordStartIndex + word.length,
      temp_mistake_explanation
    );
  }

  // Check for spaces before periods
  const spaceBeforePeriodMatches = [...passage.matchAll(/\s+[.?!]/g)];
  spaceBeforePeriodMatches.forEach((match) => {
    temp_mistake_explanation = {
      error_name: 'Grammar Error',
      explanation: `There should not be a space before a period.`,
    };
    addMistake(
      match[0].trim(),
      match.index + match[0].search(/[.?!]/),
      match.index + match[0].search(/[.?!]/) + 1,
      temp_mistake_explanation
    );
  });

  // Check for spaces before commas
  const spaceBeforeCommaMatches = [...passage.matchAll(/\s+,/g)];
  spaceBeforeCommaMatches.forEach((match) => {
    temp_mistake_explanation = {
      error_name: 'Grammar Error',
      explanation: `There should not be a space before a comma.`,
    };    
    addMistake(
      match[0].trim(),
      match.index + match[0].search(/,/),
      match.index + match[0].search(/,/) + 1,
      temp_mistake_explanation
    );
  });

  // Check for more than one space before a word
  const multipleSpacesBeforeWordMatches = [
    ...passage.matchAll(/ {2,}[a-zA-Z]+\b/g),
  ];
  multipleSpacesBeforeWordMatches.forEach((match) => {
    const wordStartIndex = match.index + match[0].search(/[a-zA-Z]/);
    const word = match[0].slice(match[0].search(/[a-zA-Z]/)).trim();
    temp_mistake_explanation = {
      error_name: 'Grammar Error',
      explanation: `There should not be more than one space before a word.`,
    };    
    addMistake(
      word,
      wordStartIndex,
      wordStartIndex + word.length,
      temp_mistake_explanation
    );
  });

  // Check if the passage ends with a period
  if (!/[.?!]$/.test(passage)) {
    const lastWordMatch = passage.match(/\b[a-zA-Z]+$/);
    if (lastWordMatch) {
      temp_mistake_explanation = {
        error_name: 'Grammar Error',
        explanation: `The passage should end with a period.`,
      };      
      addMistake(
        lastWordMatch[0],
        lastWordMatch.index,
        lastWordMatch.index + lastWordMatch[0].length,
        temp_mistake_explanation
      );
    }
  }

  let incorrectCapitalization = passage.match(/\b(?!AI\b)[a-zA-Z]*[A-Z][a-zA-Z]*\b/g);
  let words = incorrectCapitalization
    ? incorrectCapitalization.filter(
        (word) => word.slice(1).toLowerCase() !== word.slice(1)
      )
    : [];
  words.forEach((word, index) => {
    const wordStartIndex = passage.indexOf(
      word,
      index === 0
        ? 0
        : passage.indexOf(words[index - 1]) + words[index - 1].length
    );
    temp_mistake_explanation = {
      error_name: 'Grammar Error',
      explanation: `This word should not be capitalized.`,
    };
    addMistake(
      word,
      wordStartIndex,
      wordStartIndex + word.length,
      temp_mistake_explanation
    );
  });

  return mistakes;
};

const AiEssayScorePopup = ({
  isOpen = false,
  close,
  EnableSkillsScore,
  SmallScoreCard,
  UserResponse,
  elapsedTime,
  summaryWT = false,
  summaryST = false,
  onScoreCalculated,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const isMobile = useMediaQuery("(max-width: 550px)");
  const [wordCount, setWordCount] = useState(0);
  let grammarScoreCounter = 0;
  const [totalObtainedScore, setTotalObtainedScore] = useState(EnableSkillsScore.total_score);
  const [loading, setIsLoading] = useState(true);
  const [tRows, setTRows] = useState([]);
  const [highWords, setHighWords] = useState([]);

    useEffect(() => {
      if (!isOpen) {
        setWordCount(0);
        setTotalObtainedScore(0);
        setIsLoading(true);
        setTRows([]);
        setHighWords([]);
        grammarScoreCounter = 0;
      }
    }, [isOpen]);

  useEffect(() => {
    if (typeof UserResponse.textValue === "string") {
      // Trim and replace all types of dashes (en dash, em dash) with a space, then split by spaces
      const cleanedText = UserResponse.textValue
        .trim()
        .replace(/[–—]/g, " ") // Replace en dash (–) and em dash (—) with space
        .replace(/[^\w\s]/g, "") // Remove any other special characters
        .replace(/\s+/g, " "); // Replace multiple spaces with a single space
      
      // Split by spaces and filter out empty strings
      const words = cleanedText.split(" ").filter(word => word.length > 0);
      
      setWordCount(words.length);
    } else {
      setWordCount(0); // If it's not a string, set the word count to 0
    }
  }, [UserResponse]);
  
  const englishVariant =
    EnableSkillsScore.accent === "en-us" ? "American" : "British";

  const scoreKeyToComponentMapping = {
    content_score: {
      name: "Content",
      maxScore: summaryWT || summaryST ? 2 : 3,
    },
    development_structure_coherence_score: {
      name: "Development, Structure, and Coherence",
      maxScore: 2,
    },
    form_score: { name: "Form", maxScore: summaryWT ? 1 : 2 },
    general_linguistic_range_score: {
      name: "General Linguistic Range",
      maxScore: 2,
    },
    grammar_score: { name: "Grammar", maxScore: 2 },
    spelling_score: { name: "Spelling", maxScore: 2 },
    vocab_range_score: { name: "Vocabulary Range", maxScore: 2 },
    email_convention_score: { name: "Email Convention", maxScore: 2 },
    organization_score: { name: "Organization", maxScore: 2 },
  };

  useEffect(() => {
    let spellingMistakeCount = 0;
    const highlightMistakes = () => {
      let tmpMistakes = Array.isArray(EnableSkillsScore?.["mistakes"])
        ? [...EnableSkillsScore["mistakes"]]
        : [];
      let tmpTwoMistakes;
      if(EnableSkillsScore?.["temp_mistakes"] && EnableSkillsScore?.["temp_mistakes"]["mistakes"]){
        tmpTwoMistakes = EnableSkillsScore?.["temp_mistakes"]["mistakes"]
        ? EnableSkillsScore?.["temp_mistakes"]["mistakes"]
        : [];      
      }else{
        tmpTwoMistakes = EnableSkillsScore?.["temp_mistakes"]["errors"]
        ? EnableSkillsScore?.["temp_mistakes"]["errors"]
        : [];
      }
      const correctedWords = EnableSkillsScore["corrected words"];

      if (
        correctedWords &&
        typeof correctedWords === "object" &&
        !Array.isArray(correctedWords)
      ) {
        Object.entries(correctedWords).forEach(
          ([key, value]) => {
            let newMistake = {
              explanation: `Incorrect: ${key}`,
              error_name: 'Spellings Mistake',
              corrected: `Correct: ${value}`,
              phrase_with_mistake: key,
              exact_mistake_word: key,
              incorrect: key
            };
            spellingMistakeCount += 1;
            tmpTwoMistakes.push(newMistake);
          }
        );
      }

      const val = findMistakeIndexes(UserResponse.textValue, tmpMistakes, tmpTwoMistakes);

      if (val.reqIndex?.length) {
        grammarScoreCounter = val.reqIndex.length - spellingMistakeCount;
      }
      const combinedArray = val.exp.map((exp, index) => ({
        exp,
        reqIndex: val.reqIndex[index],
      }));
      combinedArray.sort((a, b) => {
        if (a.reqIndex[0] < b.reqIndex[0]) return -1;
        if (a.reqIndex[0] > b.reqIndex[0]) return 1;
        return 0;
      });
      const sortedData = {
        exp: combinedArray.map((item) => item.exp),
        reqIndex: combinedArray.map((item) => item.reqIndex),
      };

      let hW = highlightWords(
        UserResponse.textValue,
        [],
        sortedData?.reqIndex,
        sortedData?.exp
      );
      setHighWords(hW);
    };

    const normalizeCommentKeys = (comments) => {
      const keyMappings = {
        content_score: ["content", "content score"],
        development_structure_coherence_score: [
          "development structure coherence",
          "development structure coherence score",
        ],
        form_score: ["form", "form score"],
        general_linguistic_range_score: [
          "general linguistic range",
          "general linguistic range score",
        ],
        grammar_score: ["grammar", "grammar score"],
        spelling_score: ["spelling", "spelling score"],
        vocab_range_score: [
          "vocab",
          "vocab score",
          "vocabulary",
          "vocabulary score",
        ],
        email_convention_score: ["email convention", "email convention score"],
        organization_score: ["organization", "organization score"],
      };

      const normalizedComments = {};
      Object.keys(comments).forEach((commentKey) => {
        for (const scoreKey in keyMappings) {
          if (
            keyMappings[scoreKey].includes(
              commentKey.toLowerCase().replace(/_/g, " ")
            )
          ) {
            normalizedComments[scoreKey] = comments[commentKey];
            break;
          }
        }
      });
      return normalizedComments;
    };

    const mapScoresToTableRows = (scores) => {
      const normalizedComments = normalizeCommentKeys(scores.comments);

      const excludeKeys = [
        "total_score",
        "comments",
        "corrected words",
        "accent",
      ];

      // Use filter to remove entries where component is not found in the mapping
      let entries = Object.entries(scores)
        .filter(([key]) => key.includes("_score") && !excludeKeys.includes(key))
        .map(([key, value]) => {
          const component = scoreKeyToComponentMapping[key];
          if (!component) {
            return null;
          }

          let score = `${value}/${component.maxScore}`;
          let individualComment = "Great";

          if (scores["content_score"] === 0) {
            score = `0/${component.maxScore}`;
            individualComment = "Keep practicing! you'll see improvement.";
          } else if (key === "grammar_score") {
            let adjustedScore = Math.max(0, 2 - grammarScoreCounter * 0.5);
            adjustedScore = adjustedScore > 0 ? adjustedScore : 0;
            score = `${adjustedScore}/${component.maxScore}`;
            individualComment =
              adjustedScore === 0
                ? "Keep practicing! you'll see improvement."
                : "Great";
          } else if (value === 0) {
            individualComment = "Keep practicing! you'll see improvement.";
          }

          const suggestion = normalizedComments[key] || individualComment;

          return {
            component: component.name,
            score,
            suggestion,
          };
        });

      entries = entries.filter((entry) => entry !== null);


      let totalScore = calculateTotalScore(entries);
      setTotalObtainedScore(totalScore);
      onScoreCalculated(totalScore);
      return entries;
    };

    highlightMistakes();
    let tableRows = mapScoresToTableRows(EnableSkillsScore);
    setTRows(tableRows);
    setIsLoading(false);
  }, [EnableSkillsScore, UserResponse.textValue]);

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
        {loading ? (
          <></>
        ) : (
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
                        {totalObtainedScore >= 0 && (
                          <CircularScoreProgress
                            score={totalObtainedScore}
                            totalScore={scoreCard.totalScore}
                            progressColorFilled={scoreCard.progressColorFilled}
                            progressColorUnfilled={
                              scoreCard.progressColorUnfilled
                            }
                          />
                        )}

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
                      <LoremContentText>Total Words:</LoremContentText>
                      <LoremContentText>{wordCount}</LoremContentText>
                    </ContentWrapper2>
                    <ContentWrapper2>
                      <LoremContentText>Time:</LoremContentText>
                      <LoremContentText>
                        {formatTime(elapsedTime)}
                      </LoremContentText>
                    </ContentWrapper2>
                    <ContentWrapper2>
                      <LoremContentText>English:</LoremContentText>
                      <FlexDiv>
                        <LoremContentText>{englishVariant}</LoremContentText>
                        <img
                          src={InfoIcon}
                          alt=""
                          style={{ marginLeft: "5px" }}
                        />
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
                        {totalObtainedScore >= 0 && (
                          <CircularScoreProgress
                            score={EnableSkillsScore.total_score}
                            totalScore={scoreCard.totalScore}
                            progressColorFilled={scoreCard.progressColorFilled}
                            progressColorUnfilled={
                              scoreCard.progressColorUnfilled
                            }
                          />
                        )}

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
                      <LoremContentText>Total Words:</LoremContentText>
                      <LoremContentText>{wordCount}</LoremContentText>
                    </ContentWrapper2>
                    <ContentWrapper2>
                      <LoremContentText>Time:</LoremContentText>
                      <LoremContentText>
                        {formatTime(elapsedTime)}
                      </LoremContentText>
                    </ContentWrapper2>
                    <ContentWrapper2>
                      <LoremContentText>English:</LoremContentText>
                      <FlexDiv>
                        <LoremContentText>{englishVariant}</LoremContentText>
                        <img
                          src={InfoIcon}
                          alt=""
                          style={{ marginLeft: "5px" }}
                        />
                      </FlexDiv>
                    </ContentWrapper2>
                  </LoremCard>
                </Flexed2>
              )}
            </Flexed1>
          </>
        )}
      </CardWrapperRE>
    </FlexDiv>
  );
};

export default AiEssayScorePopup;
