import React, {useState} from "react";
import {
  EndScoreCard,
  EndScoreImgDiv,
  EndScoreQuestionText,
  EndScoreIdText,
  EndScoreScoresDiv,
  MyWorkBlueDiv,
  MyWorkBlueDivImg,
  MyWorkBlueDivText,
  MyWorkSmallBlueDiv,
  MyWorkBlueDivAi,
  MyWorkSmallBlueDivAi,
  FlexDivForBlueDivsOnly,
  BlueDivsQText,
  EndScoreCardText,
  EndScoreQuestionSubCat,
  BlueDivsQTextSubCat,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";
import ReadAloudSvg from "../../assets/images/readaloudsvg.svg";
import AI_Score from "../../assets/images/aiscoresvg.svg";
import ReadingSvg from "../../assets/images/reading.svg";
import WritingSvg from "../../assets/images/writing.svg";
import ListenSvg from "../../assets/images/listening.svg";
import ScoreCard from './ScoreCard';
import { v4 as uuidv4 } from 'uuid';
import { findGramMistakes, findMistakeIndexes } from "../Writing/AiSummaryScorePopup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { shortNamesMap } from "./data";

const typeMap = {
  'reading': 'Reading',
  'writing': 'Writing',
  'listening': 'Listening',
  'speaking': 'Speaking'
}

const pteType = localStorage.getItem("pte-type") || "pte academic";
const is_ptecore = pteType === "pte academic" ? false : true;


const EndTestScoreCard = ({ data, tests, type}) => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const [selectedTestData, setSelectedTestData] = useState(null);

  const handleOpenScoreCard = (testData) => {
    setSelectedTestData(testData);
    setScorecardOpen(true);
  };

  const handleCloseScoreCard = () => {
    setScorecardOpen(false);
    setSelectedTestData(null);
  };

  const getData = () => tests.filter(test => test.UserResponse.Category === typeMap[type]);

  const getType = (color = false) => {
    const typeMap = {
      reading: { color: '#AD826E', svg: ReadingSvg },
      writing: { color: '#FF5D5D', svg: WritingSvg },
      listening: { color: '#868EAF', svg: ListenSvg },
      default: { color: '#49d7f2', svg: ReadAloudSvg }
    };
  
    const typeData = typeMap[type] || typeMap.default;
    return color ? typeData.color : typeData.svg;
  };

  function getFirstLetters(input) {
    const words = input.split(' ');
    const firstLetters = words.map(word => word.charAt(0)).join('');
    return firstLetters.length > 4 ? firstLetters.toUpperCase().slice(-3) : firstLetters.toUpperCase();
  }

  const getScoreToShowOutside = (data) => {
    if (!data) return 0;
    if (!data.UserResponse) return 0;

    if (type === 'speaking') {
      if (data.UserResponse.SubCategory === "Read Aloud") {
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { content_score: 0, fluency_score: 0, pronounciation_score: 0 };
        const totalScore = (res?.content_score || 0) + (res?.fluency_score || 0) + (res?.pronounciation_score || 0);
        const adjustedScore = Math.round(totalScore / 3); // Round and divide by 3
        return `${adjustedScore}/90`;
      } else if (data.UserResponse.SubCategory === "Repeat Sentence") {
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { content_score: 0, fluency_score: 0, pronunciation_score: 0 };
        const totalScore = (res?.content_score || 0) + (res?.fluency_score || 0) + (res?.pronunciation_score || 0);
        const adjustedScore = Math.round(totalScore / 3); // Round and divide by 3
        return `${adjustedScore}/90`;
      } else if (data.UserResponse.SubCategory === "Describe Image") {
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { content_score: 0, fluency_score: 0, pronounciation_score: 0 };
        const totalScore = (res?.content_score || 0) + (res?.fluency_score || 0) + (res?.pronounciation_score || 0);
        const adjustedScore = Math.round(totalScore / 3); // Round and divide by 3
        return `${adjustedScore}/90`;
      } else if (data.UserResponse.SubCategory === "Re-tell Lecture") {
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { content_score: 0, fluency_score: 0, pronounciation_score: 0 };
        const totalScore = (res?.content_score || 0) + (res?.fluency_score || 0) + (res?.pronounciation_score || 0);
        const adjustedScore = Math.round(totalScore / 3); // Round and divide by 3
        return `${adjustedScore}/90`;
      } else if (data.UserResponse.SubCategory === "Respond to a situation") {
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { appropriacy_score: 0, fluency_score: 0, pronunciation_score: 0 };
        const totalScore = (res?.appropriacy_score || 0) + (res?.fluency_score || 0) + (res?.pronunciation_score || 0);
        const adjustedScore = Math.round(totalScore / 3); // Round and divide by 3
        return `${adjustedScore}/90`;
      } else if (data.UserResponse.SubCategory === "Answer Short Question") {
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { content_score: 0, fluency_score: 0, pronunciation_score: 0 };
        const totalScore = (res?.content_score || 0) + (res?.fluency_score || 0) + (res?.pronunciation_score || 0);
        const adjustedScore = Math.round(totalScore / 3); // Round and divide by 3
        return `${adjustedScore}/1`; // Keeping the original denominator for this case
      } else {
        return 0;
      }
    }
    
    else if(type === 'writing'){
      if (data.UserResponse.SubCategory === "Write Essay"){
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : {
          spelling_score: 0,
          content_score: 0,
          vocab_range_score: 0,
          form_score: 0,
          development_structure_coherence_score: 0,
          general_linguistic_range_score: 0,
          "temp_mistakes": { mistakes: [] },
          "corrected words": {}
        };
        let totalSumScore = res.spelling_score + res.content_score + res.vocab_range_score + res.form_score + res.development_structure_coherence_score + res.general_linguistic_range_score;
        let gramMistakes = 2;
        if((res.content_score + res.form_score) === 0){
          gramMistakes = 0;
          totalSumScore = 0;
        }else{       
          let tmpTwoMistakes = res?.["temp_mistakes"]["mistakes"] ? res?.["temp_mistakes"]["mistakes"] : [];
          let correctedWords = res["corrected words"];
          let userRes = data.UserResponse;                  
          if (correctedWords && typeof correctedWords === "object" && !Array.isArray(correctedWords)) {
            Object.entries(res["corrected words"]).forEach(
              ([key, value]) => {
                let newMistake = {
                  explanation: `Incorrect: ${key}`,
                  error_name: 'Spellings Mistake',
                  corrected: `Correct: ${value}`,
                  phrase_with_mistake: key,
                  exact_mistake_word: key,
                  incorrect: key
                };
                tmpTwoMistakes.push(newMistake);
              }
            );
          } 
          const val = findMistakeIndexes(userRes.UserResponse, [], tmpTwoMistakes);
          if(val.reqIndex?.length){
            let spellcount = Object.keys(res['corrected words']).length;
            let tmpOne = val.reqIndex?.length - spellcount;
            gramMistakes = gramMistakes - (tmpOne * 0.5);
          }
          totalSumScore = gramMistakes > 0 ? totalSumScore + gramMistakes : totalSumScore
        }
        return `${totalSumScore > 0 ? totalSumScore.toFixed(1) : 0}/15`;
      } else if (data.UserResponse.SubCategory === "Summarize Written Text"){
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : {
          content_score: 0,
          vocab_range_score: 0,
          form_score: 0,
          "temp_mistakes": { mistakes: [] },
          "corrected words": {}
        };
        let tmpRes = findGramMistakes(data.UserResponse.UserResponse, true);
        let totalSumScore = res.content_score + res.vocab_range_score + res.form_score;
        let gramMistakes;
        if((res.content_score + res.form_score) === 0){
          gramMistakes = 0;
          totalSumScore = 0;
        }else{          
          gramMistakes =  res.temp_mistakes?.mistakes && Array.isArray(res.temp_mistakes.mistakes) ? res.temp_mistakes?.mistakes.length : 0;
          gramMistakes += Object.keys(res['corrected words']).length;
          gramMistakes += tmpRes;
          gramMistakes = 2 - (gramMistakes * 0.5);
          totalSumScore = gramMistakes > 0 ? totalSumScore + gramMistakes : totalSumScore;
        }
        return `${totalSumScore > 0 ? totalSumScore : 0}/7`;
      } else if (data.UserResponse.SubCategory === "Write Email"){
        let res = data?.UserResponse?.AI_response ? JSON.parse(data?.UserResponse?.AI_response) : {
          content_score: 0,
          vocab_range_score: 0,
          form_score: 0,
          spelling_score: 0,
          grammar_score: 2,
          development_structure_coherence_score: 0,
          general_linguistic_range_score: 0,
          email_convention_score: 0,
          organization_score: 0,
          "temp_mistakes": { mistakes: [] },
          "corrected words": {}
        };
        
        let userRes = data.UserResponse;
        let tmpTwoMistakes = res?.["temp_mistakes"]["mistakes"] ? res?.["temp_mistakes"]["mistakes"] : [];
        let correctedWords = res["corrected words"];
        
        if (correctedWords && typeof correctedWords === "object" && !Array.isArray(correctedWords)) {
          Object.entries(res["corrected words"]).forEach(([key, value]) => {
            let newMistake = {
              explanation: `Incorrect: ${key}`,
              error_name: 'Spellings Mistake',
              corrected: `Correct: ${value}`,
              phrase_with_mistake: key,
              exact_mistake_word: key,
              incorrect: key
            };
            tmpTwoMistakes.push(newMistake);
          });
        }
        
        const val = findMistakeIndexes(userRes.UserResponse, [], tmpTwoMistakes);             
        let grammarMistakes = 0;
        let adjustedGrammarScore = 2;
        
        if (val.reqIndex?.length) {
          const spellingMistakeCount = Object.keys(res["corrected words"] || {}).length;
          grammarMistakes = val.reqIndex.length - spellingMistakeCount;
          
          adjustedGrammarScore = Math.max(0, 2 - grammarMistakes * 0.5);
        }
        
        const components = [
          { key: "content_score", value: res.content_score },
          { key: "vocab_range_score", value: res.vocab_range_score },
          { key: "form_score", value: res.form_score },
          { key: "spelling_score", value: res.spelling_score },
          { key: "grammar_score", value: adjustedGrammarScore },
          { key: "development_structure_coherence_score", value: res.development_structure_coherence_score },
          { key: "general_linguistic_range_score", value: res.general_linguistic_range_score },
          { key: "email_convention_score", value: res.email_convention_score },
          { key: "organization_score", value: res.organization_score }
        ];
        
        let totalSumScore = components.reduce((sum, component) => sum + component.value, 0);
        
        if (res.content_score === 0) {
          totalSumScore = 0;
        }
        
        totalSumScore = Math.max(0, Math.min(totalSumScore, 15));
        totalSumScore = Math.round(totalSumScore * 10) / 10;
        
        return `${totalSumScore}/15`;
      } else {
         return 0;
      }
    } 
       
    else if(type === 'reading'){
      if (data.UserResponse.SubCategory === "Multiple Choice, Multiple Answers"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;       
      } else if (data.UserResponse.SubCategory === "Reading & Writing: Fill in the Blanks"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;
      } else if (data.UserResponse.SubCategory === "Reading: Fill in the Blanks"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;
      } else if (data.UserResponse.SubCategory === "Multiple Choice, Single Answer"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;       
      } else if (data.UserResponse.SubCategory === "Re-order Paragraphs"){
        let obtainedScore = data?.UserResponse?.submissionResult?.score || 0;
        let totalScore = data?.UserResponse?.submissionResult?.correctIndexes?.length - 1 || 0;
        return `${obtainedScore}/${totalScore}`;
      } else {
        return 0;
      }
    }else{ // listening
      if (data.UserResponse.SubCategory === "Fill in the Blanks"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;
      } else if (data.UserResponse.SubCategory === "Listening: Multiple Choice, Single Answer"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;
      } else if (data.UserResponse.SubCategory === "Highlight Correct Summary"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;       
      } else if (data.UserResponse.SubCategory === "Select Missing Word"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;       
      } else if (data.UserResponse.SubCategory === "Highlight Incorrect Words"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;       
      } else if (data.UserResponse.SubCategory === "Listening: Multiple Choice, Multiple Answers"){
        return data.UserResponse.enableSkillsData?.[0]?.score || 0;
      } else if (data.UserResponse.SubCategory === "Summarize Spoken Text"){
        let res = data?.UserResponse?.AI_response ? JSON.parse(data?.UserResponse?.AI_response) : {
          content_score: 0,
          vocab_range_score: 0,
          form_score: 0,
          spelling_score: 0,
          "temp_mistakes": { mistakes: [] },
          "corrected words": {}
        };
        let userRes = data.UserResponse;
        let tmpTwoMistakes = res?.["temp_mistakes"]["mistakes"] ? res?.["temp_mistakes"]["mistakes"] : [];
        let correctedWords = res["corrected words"];

        if (correctedWords && typeof correctedWords === "object" && !Array.isArray(correctedWords)) {
          Object.entries(res["corrected words"]).forEach(([key, value]) => {
            let newMistake = {
              explanation: `Incorrect: ${key}`,
              error_name: 'Spellings Mistake',
              corrected: `Correct: ${value}`,
              phrase_with_mistake: key,
              exact_mistake_word: key,
              incorrect: key
            };
            tmpTwoMistakes.push(newMistake);
          });
        }

        const val = findMistakeIndexes(userRes.UserResponse, [], tmpTwoMistakes);             

        let grammarMistakes = 0;
        let adjustedGrammarScore = 0;

        if (val.reqIndex?.length) {
          if (res['spelling_score']) {
            grammarMistakes = val.reqIndex.length - (2 - res['spelling_score']);
          } else {
            grammarMistakes = val.reqIndex.length;
          }
        }

        adjustedGrammarScore =  Math.max(0, 2 - grammarMistakes * 0.5);
        adjustedGrammarScore = adjustedGrammarScore > 0 ? adjustedGrammarScore : 0;

        const components = [
          { key: "content_score", value: res.content_score },
          { key: "vocab_range_score", value: res.vocab_range_score },
          { key: "form_score", value: res.form_score },
          { key: "spelling_score", value: res.spelling_score },
          { key: "grammar_score", value: adjustedGrammarScore },
        ];

        let totalSumScore = components.reduce((sum, component) => sum + component.value, 0);
        totalSumScore = Math.max(0, Math.min(totalSumScore, 10));
        totalSumScore = Math.round(totalSumScore * 10) / 10;

        if (res.content_score === 0) {
          totalSumScore = 0;
        }

        return `${totalSumScore}/10`;
      } else if (data.UserResponse.SubCategory === "Write from Dictation"){
        let res = data.UserResponse.AI_response ? JSON.parse(data.UserResponse.AI_response) : { writing_score: 0, total_score: 0 };
        return `${res.writing_score}/${res.total_score}`;
      } else {
         return 0;
      }
    }
  }
  
  const isAI = (data) => !!data.UserResponse?.AI_response;

  const getShortName = (subcategory) => {
    return shortNamesMap[subcategory] || 'Test';
  };

  return (
    <>
      {tests && getData().map((test) => (
      <EndScoreCard key={uuidv4()}>
          {/* <EndScoreCardText style={{marginLeft:getFirstLetters(test.UserResponse.SubCategory).length>2? '1.5rem' :'', fontSize:getFirstLetters(test.UserResponse.SubCategory).length>2?'16px':''}}>{getFirstLetters(test.UserResponse.SubCategory)}</EndScoreCardText>  */}
        <EndScoreImgDiv>
          <FlexDiv style={{position:'relative'}}>
          <img src={getType()} alt=""  />
          <EndScoreCardText style={{fontSize: getShortName(test.UserResponse.SubCategory).length > 2 ? '16px' : '20px'}}>
            {getShortName(test.UserResponse.SubCategory)}
          </EndScoreCardText>
          </FlexDiv>
          <FlexDiv style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <EndScoreIdText style={{color: getType(true)}}>{test.UserResponse ? '#' + test.UserResponse.QuestionId : '0'}</EndScoreIdText>
            <FlexDiv style={{ flexDirection: isTab ? "column" : "row" , alignItems: "flex-start", gap: isTab ? "0rem" : "0.5rem" }}>
            <EndScoreQuestionText>{test.UserResponse ? test.UserResponse.QuestionName : 'loading'}</EndScoreQuestionText>
            {/* <EndScoreQuestionSubCat>({test.UserResponse ? test.UserResponse.SubCategory : ''})</EndScoreQuestionSubCat> */}
            <BlueDivsQTextSubCat style={{color: getType(true)}}>({test.UserResponse ? test.UserResponse.SubCategory : ''})</BlueDivsQTextSubCat>
            </FlexDiv>
          </FlexDiv>
        </EndScoreImgDiv>

        <EndScoreScoresDiv>
          {/* <BlueDivsQText style={{color: getType(true)}}>{data.questionText}</BlueDivsQText> */}
        <FlexDivForBlueDivsOnly>  
        {test.UserResponse?.IsAttempted === false || test.UserResponse?.autoAttemptedLastOnTimeUp ? ( 
          <EndScoreQuestionText style={{color: getType(true) }}>
            Not Attempted
          </EndScoreQuestionText>
          ) : (
            isAI(test) ? (
              <>
                <MyWorkBlueDiv
                  color={data.color}
                  background={"#FFFFFF"}
                  borderColor={data.color}
                >
                  <MyWorkSmallBlueDiv background={data.color}>
                    {type[0]}
                  </MyWorkSmallBlueDiv>
                  <MyWorkBlueDivText color={data.color}>
                    {getScoreToShowOutside(test)}
                  </MyWorkBlueDivText>
                </MyWorkBlueDiv>

                <MyWorkBlueDivAi
                  style={{ backgroundColor: data.color, border: `1px solid ${data.color}` }}
                  onClick={() => handleOpenScoreCard(test)} // Open AI scorecard
                >
                  <MyWorkSmallBlueDivAi>
                    <MyWorkBlueDivImg alt="" src={AI_Score} />
                  </MyWorkSmallBlueDivAi>
                  <MyWorkBlueDivText>AI SCORE</MyWorkBlueDivText>
                </MyWorkBlueDivAi>
              </>
            ) : (
              <>
                <MyWorkBlueDiv
                  color={data.color}
                  background={"#FFFFFF"}
                  borderColor={data.color}
                  onClick={() => handleOpenScoreCard(test)} // Open non-AI scorecard
                >
                  <MyWorkSmallBlueDiv background={data.color}>
                    {type[0]}
                  </MyWorkSmallBlueDiv>
                  <MyWorkBlueDivText color={data.color}>
                    {getScoreToShowOutside(test)}
                  </MyWorkBlueDivText>
                </MyWorkBlueDiv>
              </>
            )
          )}
          </FlexDivForBlueDivsOnly>
        </EndScoreScoresDiv>
      </EndScoreCard>
    ))}


       {selectedTestData && (
        <ScoreCard
          isOpen={scorecardOpen}
          close={handleCloseScoreCard}
          testData={selectedTestData}
          category={type}
          testType={selectedTestData.UserResponse.SubCategory}
          pteType={pteType}
        />
      )}
  </>
  );
};

export default EndTestScoreCard;
