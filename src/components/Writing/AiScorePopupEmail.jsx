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
import { Tooltip } from "@mui/material";

const columns = [
  { name: "Component", width: "40%" },
  { name: "Score", width: "10%" },
  { name: "Suggestion", width: "50%" },
];

export function calculateTotalScore(components) {
  let totalObtained = 0;

  components.forEach(component => {
    const [obtained, total] = component.score.split('/').map(Number);
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

    elements.push(
      text.substring(currentIndex, adjustedStart)        
    );

    elements.push(
      <Tooltip title={`${tooltipHeading[i]}`}>
        <span
          style={{ color: "red", cursor: "pointer" }}
          // dangerouslySetInnerHTML={{
          //   __html: text.substring(adjustedStart, adjustedEnd),
          // }}
        >
          {text.substring(adjustedStart, adjustedEnd)}
        </span>
      </Tooltip>
    );

    currentIndex = adjustedEnd;
  }

  elements.push(
      text.substring(currentIndex)      
  );

  return elements;
};

export const removeOverlappingIndexes = (data) => {
  const { reqIndex, exp } = data;
  const result = { reqIndex: [], exp: [] };
  const seen = new Set();

  reqIndex.forEach((indices, idx) => {
    const key = indices.join('-');
    if (!seen.has(key)) {
      seen.add(key);
      result.reqIndex.push(indices);
      result.exp.push(exp[idx]);
    }
  });

  return result;
};

export const findMistakeIndexes = (essay, mistakes) => {
  const indexes = [];
  let mistakesIndexes = [];
  let explanation = [];

  let gramMistake = findGramMistakes(essay);

  mistakes.forEach(mistake => {
    const { mistake_str, mistake_word, mistake_explanation } = mistake;
    let mistakeStrStartIndex = essay.indexOf(mistake_str);
    
    while (mistakeStrStartIndex !== -1) {
      const mistakeStrEndIndex = mistakeStrStartIndex + mistake_str.length - 1;
      const wordStartIndex = mistakeStrStartIndex + mistake_str.indexOf(mistake_word);
      const wordEndIndex = wordStartIndex + mistake_word.length - 1;
      if(mistake_word!=="N/A" && !mistake_explanation.includes('Missing period') && !mistake_explanation.includes('Missing comma') && !mistake_explanation.includes("(Unnecessary comma)") && !mistake_explanation.includes('Capitalization error') && !mistake_explanation.includes("(Punctuation error)") && !mistake_explanation.includes("(Missing colon)")){
        indexes.push({ mistake_word, startIndex: wordStartIndex, endIndex: wordEndIndex, mistake_explanation });
        mistakesIndexes.push([wordStartIndex, wordEndIndex+1]);
        explanation.push(mistake_explanation);
      }
      mistakeStrStartIndex = essay.indexOf(mistake_str, mistakeStrStartIndex + 1);
    }
  });

  let returnVal = {
    reqIndex: mistakesIndexes,
    exp: explanation
  }

  gramMistake.forEach(mistake => {
    returnVal.exp.push(mistake.message);
    returnVal.reqIndex.push([mistake.start, mistake.stop])
  })

  const processedData = removeOverlappingIndexes(returnVal);

  return processedData;
};

export const findGramMistakes = (passage) => {

  if (!passage || typeof passage !== "string") return returnValueType ? 0 : [];
  
  const mistakes = [];

  const addMistake = (word, start, stop, message) => {
    mistakes.push({ word, start, stop, message });
  };

  // Check if the first word of the passage starts with a lowercase letter
  const firstWordMatch = passage.match(/^\s*[a-z]+\b/);
  if (firstWordMatch) {
    addMistake(firstWordMatch[0].trim(), firstWordMatch.index, firstWordMatch.index + firstWordMatch[0].trim().length, "Grammar Error:The first word of the passage should start with a capital letter.");
  }

  // Check if words after a period start with a capital letter
  const sentenceEndings = passage.matchAll(/[.?!]\s+[a-z]+\b/g);
  for (const match of sentenceEndings) {
    const wordStartIndex = match.index + match[0].search(/[a-z]/);
    const word = match[0].slice(match[0].search(/[a-z]/)).trim();
    addMistake(word, wordStartIndex, wordStartIndex + word.length, "Grammar Error:The first word after a period should start with a capital letter.");
  }

  // Check for spaces before periods
  const spaceBeforePeriodMatches = [...passage.matchAll(/\s+[.?!]/g)];
  spaceBeforePeriodMatches.forEach((match) => {
    addMistake(match[0].trim(), match.index + match[0].search(/[.?!]/), match.index + match[0].search(/[.?!]/) + 1, "Grammar Error:There should not be a space before a period.");
  });

  // Check for spaces before commas
  const spaceBeforeCommaMatches = [...passage.matchAll(/\s+,/g)];
  spaceBeforeCommaMatches.forEach((match) => {
    addMistake(match[0].trim(), match.index + match[0].search(/,/), match.index + match[0].search(/,/) + 1, "Grammar Error:There should not be a space before a comma.");
  });

  // Check for more than one space before a word
  const multipleSpacesBeforeWordMatches = [...passage.matchAll(/ {2,}[a-zA-Z]+\b/g)];
  multipleSpacesBeforeWordMatches.forEach((match) => {
    const wordStartIndex = match.index + match[0].search(/[a-zA-Z]/);
    const word = match[0].slice(match[0].search(/[a-zA-Z]/)).trim();
    addMistake(word, wordStartIndex, wordStartIndex + word.length, "Grammar Error:There should not be more than one space before a word.");
  });

  let incorrectCapitalization = passage.match(/\b[a-zA-Z]*[A-Z][a-zA-Z]*\b/g);
  let words = incorrectCapitalization ? incorrectCapitalization.filter(word => word.slice(1).toLowerCase() !== word.slice(1)) : [];
  words.forEach((word, index) => {
    const wordStartIndex = passage.indexOf(word, index === 0 ? 0 : passage.indexOf(words[index - 1]) + words[index - 1].length);
    addMistake(word, wordStartIndex, wordStartIndex + word.length, "Grammar Error:This word should not be capitalized.");
  });

  return mistakes;
};

const AiScorePopupEmail = ({
  close,
  EnableSkillsScore,
  SmallScoreCard,
  UserResponse,
  elapsedTime,
  grammarKeyName = "grammar mistakes",
  grammarIndexKeyName = "grammatical mistakes indices",
  mispelledIndex = "misspelled Indices",
  summary = false,
  onScoreCalculated,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const isMobile = useMediaQuery("(max-width: 550px)");
  const [textValue, setTextValue] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const paragraphs = UserResponse.textValue.split("\n");
  let grammarScoreCounter = 0;  
  const [totalObtainedScore, setTotalObtainedScore] = useState(EnableSkillsScore.total_score);
  const [loading, setIsLoading] = useState(true);
  const [tRows, setTRows] = useState([]);
  const [highWords, setHighWords] = useState([]);

  // useEffect(() => {
  //   if (typeof UserResponse.textValue === "string") {
  //     console.log("Text for counting words: ", UserResponse);
  //     const words = UserResponse.textValue.trim().split(/\s+/).filter(word => word.length > 0);
  //     setWordCount(words.length);
  //   } else {
  //     setWordCount(0);
  //   }
  // }, [UserResponse]);

  useEffect(() => {
    if (typeof UserResponse.textValue === "string") {
      console.log("Text for counting words: ", UserResponse);
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

  const highlightMisspelledWords = (paragraph) => {
    const grammarMistakes = EnableSkillsScore[grammarKeyName] || [];
    const correctedWords = EnableSkillsScore["corrected words"] || {};

    const keys = Object.keys(correctedWords);

    const newArray = grammarMistakes.concat(keys);

    const grammarMistakesIndices = EnableSkillsScore[grammarIndexKeyName] || [];
    const misspelledIndices = EnableSkillsScore[mispelledIndex] || [];

    const merged = grammarMistakesIndices
      .map((range) => ({ type: "Grammar mistake", range }))
      .concat(
        misspelledIndices.map((range) => ({ type: "Spelling mistake", range }))
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
    content_score: { name: "Content", maxScore: summary ? 2 : 3 },
    development_structure_coherence_score: { name: "Development, Structure, and Coherence", maxScore: 2 },
    form_score: { name: "Form", maxScore: summary ? 1 : 2 },
    general_linguistic_range_score: { name: "General Linguistic Range", maxScore: 2 },
    grammar_score: { name: "Grammar", maxScore: 2 },
    spelling_score: { name: "Spelling", maxScore: 2 },
    vocab_range_score: { name: "Vocabulary Range", maxScore: 2 },
    email_convention_score: { name: "Email Convention", maxScore: 2 },
    organization_score: { name: "Organization", maxScore: 2 }
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

    
    const normalizeCommentKeys = (comments) => {
      const keyMappings = {
        'content_score': ['content', 'content score'],
        'development_structure_coherence_score': ['development structure coherence', 'development structure coherence score'],
        'form_score': ['form', 'form score'],
        'general_linguistic_range_score': ['general linguistic range', 'general linguistic range score'],
        'grammar_score': ['grammar', 'grammar score'],
        'spelling_score': ['spelling', 'spelling score'],
        'vocab_range_score': ['vocab', 'vocab score', 'vocabulary', 'vocabulary score'],
        'email_convention_score': ['email convention', 'email convention score'],
        'organization_score': ['organization', 'organization score']
      };
    
      const normalizedComments = {};
      Object.keys(comments).forEach(commentKey => {
        for (const scoreKey in keyMappings) {
          if (keyMappings[scoreKey].includes(commentKey.toLowerCase().replace(/_/g, ' '))) {
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
    "total_score", "comments", "corrected words", "accent",
  ];

  // Use filter to remove entries where component is not found in the mapping
  let entries = Object.entries(scores)
    .filter(([key]) => key.includes('_score') && !excludeKeys.includes(key))
    .map(([key, value]) => {
      const component = scoreKeyToComponentMapping[key];
      if (!component) {
        return null; 
      }
      
      let score = `${value}/${component.maxScore}`;


            // If content score is zero, all scores to zero
            if (scores['content_score'] === 0) {
              score = `0/${component.maxScore}`;
            } else if (key === 'grammar_score') {
              let adjustedScore = Math.max(0, 2 - (grammarScoreCounter * 0.5));
              adjustedScore = adjustedScore > 0 ? adjustedScore : 0; 
              score = `${adjustedScore}/${component.maxScore}`;
            }

      const suggestion = normalizedComments[key] || "Great!";
      return {
        component: component.name,
        score,
        suggestion,
      };
    });


  entries = entries.filter(entry => entry !== null);


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
                  <LoremContentText>Total Words:</LoremContentText>
                  <LoremContentText>{wordCount}</LoremContentText>
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
                <LoremContentText>Total Words:</LoremContentText>
                <LoremContentText>{wordCount}</LoremContentText>
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

export default AiScorePopupEmail;
