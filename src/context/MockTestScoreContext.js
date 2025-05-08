import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { Base_URL } from "../Client/apiURL";
import { useAuth } from "../authentication/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodayTaskImg1 from "../assets/todaytaskcard/todaytaskimg1.svg";
import TodayTaskImg2 from "../assets/todaytaskcard/todaytaskimg2.svg";
import TodayTaskImg3 from "../assets/todaytaskcard/todaytaskimg3.svg";
import TodayTaskImg4 from "../assets/todaytaskcard/todaytaskimg4.svg";
import { MergedTestsForScoring, MergedTestsForScoringCore } from "../components/MT_Score/data";
import { findGramMistakes } from "../components/Writing/AiSummaryScorePopup";

const MockTestScoreContext = createContext();

export const MockTestScoreProvider = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isPteCore = localStorage.getItem("pte-type") === "pte core";
  const [scores, setScores] = useState({
    raTotal: 0, 
    raObtain: 0,
    rsTotal: 0,
    rsObtain: 0,
    diTotal: 0,
    diObtain: 0,
    rlTotal: 0,
    rlObtain: 0,
    rtsTotal: 0,
    rtsObtain: 0,
    asqTotal: 0,
    asqObtain: 0,

    swtTotal: 0,
    swtObtain: 0,
    weTotal: 0,
    weObtain: 0,
    ewTotal: 0,
    ewObtain: 0,

    rwfibTotal: 0,
    rwfibObtain: 0,    
    rfibTotal: 0,
    rfibObtain: 0,
    mcmaTotal: 0,
    mcmaObtain: 0,
    mcsaTotal: 0,
    mcsaObtain: 0,
    ropTotal: 0,
    ropObtain: 0,

    sstTotal: 0,
    sstObtain: 0,
    lmcmaTotal: 0,
    lmcmaObtain: 0,
    lmcsaTotal: 0,
    lmcsaObtain: 0,
    hiwTotal: 0,
    hiwObtain: 0,
    fibTotal: 0,
    fibObtain: 0,
    wfdTotal: 0,
    wfdObtain: 0,
    hcsTotal: 0,
    hcsObtain: 0,
    smwTotal: 0,
    smwObtain: 0
  });

  const [categoryScores, setCategoryScores] = useState({
    raTotal: 0,
    raObtain: 0,
    rsTotal: 0,
    rsObtain: 0,
    diTotal: 0,
    diObtain: 0,
    rlTotal: 0,
    rlObtain: 0,
    asqTotal: 0,
    asqObtain: 0,

    swtTotal: 0,
    swtObtain: 0,
    weTotal: 0,
    weObtain: 0,
    ewTotal: 0,
    ewObtain: 0,

    rwfibTotal: 0,
    rwfibObtain: 0,
    rfibTotal: 0,
    rfibObtain: 0,
    mcmaTotal: 0,
    mcmaObtain: 0,
    mcsaTotal: 0,
    mcsaObtain: 0,
    ropTotal: 0,
    ropObtain: 0,
    
    sstTotal: 0,
    sstObtain: 0,
    lmcmaTotal: 0,
    lmcmaObtain: 0,
    lmcsaTotal: 0,
    lmcsaObtain: 0,
    hiwTotal: 0,
    hiwObtain: 0,
    fibTotal: 0,
    fibObtain: 0,
    wfdTotal: 0,
    wfdObtain: 0,
    hcsTotal: 0,
    hcsObtain: 0,
    smwTotal: 0,
    smwObtain: 0,
  });

  const giveScores = (counts) => {
    let totalMark = {
        'Read Aloud': 0,
        'Repeat Sentence': 0,
        "Describe Image": 0,
        "Re-tell Lecture": 0,
        "Respond to a situation": 0,
        'Answer Short Question': 0,

        'Summarize Written Text': 0,
        "Write Essay": 0,
        "Write Email": 0,

        'Reading & Writing: Fill in the Blanks': 0,
        'Reading: Fill in the Blanks': 0,
        'Multiple Choice, Multiple Answers': 0,
        'Multiple Choice, Single Answer': 0,
        'Re-order Paragraphs': 0,

        'Summarize Spoken Text': 0,
        'Listening: Multiple Choice, Multiple Answers': 0,
        'Listening: Multiple Choice, Single Answer': 0,
        'Highlight Incorrect Words': 0,
        'Fill in the Blanks': 0,
        'Write from Dictation': 0,
        'Highlight Correct Summary': 0,
        'Select Missing Word': 0      
    };

    let obtainMark = {
        'Read Aloud': 0,
        'Repeat Sentence': 0,
        "Describe Image": 0,
        "Re-tell Lecture": 0,
        "Respond to a situation": 0,
        'Answer Short Question': 0,

        'Summarize Written Text': 0,
        "Write Essay": 0,
        "Write Email": 0,

        'Reading & Writing: Fill in the Blanks': 0,
        'Reading: Fill in the Blanks': 0,
        'Multiple Choice, Multiple Answers': 0,
        'Multiple Choice, Single Answer': 0,
        'Re-order Paragraphs': 0,

        'Summarize Spoken Text': 0,
        'Listening: Multiple Choice, Multiple Answers': 0,
        'Listening: Multiple Choice, Single Answer': 0,
        'Highlight Incorrect Words': 0,
        'Fill in the Blanks': 0,
        'Write from Dictation': 0,
        'Highlight Correct Summary': 0,
        'Select Missing Word': 0
    };    

    counts.forEach(test => {
        test.forEach(result => {
            let userResponseRaw = result['UserResponse'];
            let userResponse = null;

            if (typeof userResponseRaw === 'string') {
                try { 
                  userResponse = JSON.parse(userResponseRaw);
                } catch (e) {
                    console.error("Error parsing UserResponse:", e);
                    return;
                }
            } else if (typeof userResponseRaw === 'object' && userResponseRaw !== null) {
                userResponse = userResponseRaw;
            }

            if (userResponse && userResponse.hasOwnProperty('IsAttempted') && userResponse['IsAttempted'] === false) {
                return;
            }

            if (!userResponse) {
                return;
            }

            switch(userResponse['SubCategory']) {
                case 'Read Aloud': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Read Aloud:", e);
                        break;
                    }
                    totalMark['Read Aloud'] += 90;
                    let pronounScore  = tmp.pronunciation_score !== undefined ? tmp.pronunciation_score : tmp.pronounciation_score || 0;
                    let obtain = (tmp.content_score || 0) + (tmp.fluency_score || 0) + pronounScore;
                    obtainMark['Read Aloud'] += Math.round(obtain / 3);
                    break;
                }
                case 'Repeat Sentence': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Repeat Sentence:", e);
                        break;
                    }
                    totalMark['Repeat Sentence'] += 90;
                    let pronounScore  = tmp.pronunciation_score !== undefined ? tmp.pronunciation_score : tmp.pronounciation_score || 0;
                    let obtain = (tmp.content_score || 0) + (tmp.fluency_score || 0) + pronounScore;
                    obtainMark['Repeat Sentence'] += Math.round(obtain / 3);
                    break;
                }
                case 'Describe Image': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Describe Image:", e);
                        break;
                    }
                    totalMark["Describe Image"] += 90;
                    let obtain = (tmp.content_score || 0) + (tmp.fluency_score || 0) + (tmp.pronounciation_score || 0);
                    obtainMark["Describe Image"] += Math.round(obtain / 3);
                    break;
                }
                case 'Re-tell Lecture': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Re-tell Lecture:", e);
                        break;
                    }
                    totalMark["Re-tell Lecture"] += 90;
                    let obtain = (tmp.content_score || 0) + (tmp.fluency_score || 0) + (tmp.pronounciation_score || 0);
                    obtainMark["Re-tell Lecture"] += Math.round(obtain / 3);
                    break;
                }
                case 'Respond to a situation': {
                  let tmp = null;
                  try {
                      tmp = JSON.parse(userResponse['AI_response']);
                  } catch (e) {
                      console.error("Error parsing AI_response for Respond to a situation:", e);
                      break;
                  }
                  totalMark["Respond to a situation"] += 90;
                  let obtain = (tmp.appropriacy_score || 0) + (tmp.fluency_score || 0) + (tmp.pronunciation_score || 0);
                  obtainMark["Respond to a situation"] += Math.round(obtain / 3);
                  break;
              }
                case 'Answer Short Question': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Answer Short Question:", e);
                        break;
                    }
                    totalMark["Answer Short Question"] += 1;
                    obtainMark["Answer Short Question"] += (tmp['content_score'] || 0);
                    break;
                }
                case 'Summarize Written Text': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Summarize Written Text:", e);
                        break;
                    }
                    totalMark["Summarize Written Text"] += 8;

                    let obtTmpScore = (tmp.content_score || 0) + (tmp.vocab_range_score || 0) + (tmp.form_score || 0);
                    let tmpRes = findGramMistakes(userResponse['UserResponse'], true);          
                    let gramMistakes = 0;
                    if(tmp.content_score > 0){
                        gramMistakes = (tmp.temp_mistakes?.mistakes && Array.isArray(tmp.temp_mistakes.mistakes)) ? tmp.temp_mistakes.mistakes.length : 0;
                        gramMistakes += Object.keys(tmp['corrected words'] || {}).length;
                        gramMistakes += tmpRes;          
                        gramMistakes = 2 - (gramMistakes * 0.5);
                    }
                    obtTmpScore = gramMistakes > 0 ? obtTmpScore + gramMistakes : obtTmpScore;

                    // if content score is zero it means user should have no score obtained
                    if (tmp.content_score === 0) {
                      obtTmpScore = 0;
                    }
                    obtainMark["Summarize Written Text"] += obtTmpScore;
                    break;
                }
                case 'Write Essay': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Write Essay:", e);
                        break;
                    }
                    totalMark["Write Essay"] += 15;
                    let obtTmpScore = (tmp.content_score || 0) + (tmp.vocab_range_score || 0) + (tmp.form_score || 0);
                    let tmpRes = findGramMistakes(userResponse['UserResponse'], true);          
                    let gramMistakes = 0;
                    if(tmp.content_score > 0){
                        gramMistakes = (tmp.temp_mistakes?.mistakes && Array.isArray(tmp.temp_mistakes.mistakes)) ? tmp.temp_mistakes.mistakes.length : 0;
                        gramMistakes += Object.keys(tmp['corrected words'] || {}).length;
                        gramMistakes += tmpRes;          
                        gramMistakes = 2 - (gramMistakes * 0.5);
                    }
                    obtTmpScore = gramMistakes > 0 ? obtTmpScore + gramMistakes : obtTmpScore;

                    // if content score is zero it means user should have no score obtained
                    if (tmp.content_score === 0) {
                      obtTmpScore = 0;
                    }
                    obtainMark["Write Essay"] += obtTmpScore;
                    break;
                }
                case 'Write Email': {
                    let tmp = null;
                    try {
                        tmp = JSON.parse(userResponse['AI_response']);
                    } catch (e) {
                        console.error("Error parsing AI_response for Write Email:", e);
                        break;
                    }
                    totalMark["Write Email"] += 15;
                    let obtTmpScore = (tmp.content_score || 0) + (tmp.vocab_range_score || 0) + (tmp.form_score || 0);
                    let tmpRes = findGramMistakes(userResponse['UserResponse'], true);          
                    let gramMistakes = 0;
                    if(tmp.content_score > 0){
                        gramMistakes = (tmp.temp_mistakes?.mistakes && Array.isArray(tmp.temp_mistakes.mistakes)) ? tmp.temp_mistakes.mistakes.length : 0;
                        gramMistakes += Object.keys(tmp['corrected words'] || {}).length;
                        gramMistakes += tmpRes;          
                        gramMistakes = 2 - (gramMistakes * 0.5);
                    }
                    obtTmpScore = gramMistakes > 0 ? obtTmpScore + gramMistakes : obtTmpScore;

                    // if content score is zero it means user should have no score obtained
                    if (tmp.content_score === 0) {
                      obtTmpScore = 0;
                    }
                    obtainMark["Write Email"] += obtTmpScore;
                    break;
                }
                case 'Summarize Spoken Text': {
                  let tmp = null;
                  try {
                      tmp = JSON.parse(userResponse['AI_response']);
                  } catch (e) {
                      console.error("Error parsing AI_response for Summarize Spoken Text:", e);
                      break;
                  }
                  totalMark["Summarize Spoken Text"] += 10;
                  let totalSumScore = (tmp.content_score || 0) + (tmp.vocab_range_score || 0) + (tmp.form_score || 0) + (tmp.spelling_score || 0);
                  let gramMistakes = 0;
                  if(tmp.content_score > 0){
                      gramMistakes = (tmp.temp_mistakes?.mistakes && Array.isArray(tmp.temp_mistakes.mistakes)) ? tmp.temp_mistakes.mistakes.length : 0;
                      gramMistakes = 2 - (gramMistakes * 0.5);
                  }
                  totalSumScore = gramMistakes > 0 ? totalSumScore + gramMistakes : totalSumScore;

                  // if content score is zero it means user should have no score obtained
                  if (tmp.content_score === 0) {
                    totalSumScore = 0;
                  }
                  obtainMark["Summarize Spoken Text"] += totalSumScore;
                  break;
                }
                case 'Write from Dictation': {
                  // Assuming AI_response contains 'total_score' and 'writing_score'
                  if (userResponse['AI_response']) {
                      let tmp = null;
                      try {
                          tmp = JSON.parse(userResponse['AI_response']);
                      } catch (e) {
                          console.error("Error parsing AI_response for Write from Dictation:", e);
                          break;
                      }
                      totalMark['Write from Dictation'] += tmp.total_score || 0;
                      obtainMark['Write from Dictation'] += tmp.writing_score || 0;
                  }
                  break;
                }
                case 'Reading & Writing: Fill in the Blanks': {
                    // For this subcategory, 'UserResponse' is already an object with necessary fields
                    let tmp = userResponse;
                    if (tmp.correctAnswers && Array.isArray(tmp.correctAnswers)) {
                        totalMark['Reading & Writing: Fill in the Blanks'] += tmp.correctAnswers.length;
                    }
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        obtainMark['Reading & Writing: Fill in the Blanks'] += score;
                    }
                    break;
                }
                case 'Reading: Fill in the Blanks': {
                    let tmp = userResponse;
                    
                    // Check if correctAnswers exists and has length
                    if (tmp.correctAnswers && Array.isArray(tmp.correctAnswers)) {
                        totalMark['Reading: Fill in the Blanks'] += tmp.correctAnswers.length;
                    }
                
                    // Check if enableSkillsData exists and is an array with at least one item
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0; // Use fallback value of 0 if score is invalid
                        obtainMark['Reading: Fill in the Blanks'] += score;
                    }
                    break;
                }
                case 'Multiple Choice, Multiple Answers': {
                    let tmp = userResponse;
                    if (tmp.correctAnswers && Array.isArray(tmp.correctAnswers)) {
                        totalMark['Multiple Choice, Multiple Answers'] += tmp.correctAnswers.length;
                    }
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        obtainMark['Multiple Choice, Multiple Answers'] += score;
                    }
                    break;
                }
                case 'Multiple Choice, Single Answer': {
                    let tmp = userResponse;
                    // Check if enableSkillsData exists and is an array with at least one item
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0; // Fallback value 0
                        totalMark['Multiple Choice, Single Answer'] += 1;  // Assuming each answer gets a mark of 1
                        obtainMark['Multiple Choice, Single Answer'] += score;
                    }
                    break;
                }
                case 'Re-order Paragraphs': {
                    let tmp = userResponse['submissionResult'];
                    if (tmp && tmp.correctIndexes && Array.isArray(tmp.correctIndexes)) {
                        totalMark['Re-order Paragraphs'] += tmp.correctIndexes.length;
                    }
                    if (tmp && typeof tmp.score === 'number') {
                        obtainMark['Re-order Paragraphs'] += tmp.score;
                    }
                    break;
                }
                case 'Listening: Multiple Choice, Multiple Answers': {
                    let tmp = userResponse;
                    if (tmp.correctAnswers && Array.isArray(tmp.correctAnswers)) {
                        totalMark['Listening: Multiple Choice, Multiple Answers'] += tmp.correctAnswers.length;
                    }
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        obtainMark['Listening: Multiple Choice, Multiple Answers'] += score;
                    }
                    break;
                }
                case 'Listening: Multiple Choice, Single Answer': {
                    let tmp = userResponse;
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        totalMark['Listening: Multiple Choice, Single Answer'] += 1;
                        obtainMark['Listening: Multiple Choice, Single Answer'] += score;
                    }
                    break;
                }
                case 'Highlight Incorrect Words': {
                    let tmp = userResponse;
                    if (tmp.correctAnswers && Array.isArray(tmp.correctAnswers)) {
                        totalMark['Highlight Incorrect Words'] += tmp.correctAnswers.length;
                    }
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        obtainMark['Highlight Incorrect Words'] += score;
                    }
                    break;
                }
                case 'Fill in the Blanks': {
                    let tmp = userResponse;
                    if (tmp.correctAnswers && Array.isArray(tmp.correctAnswers)) {
                        totalMark['Fill in the Blanks'] += tmp.correctAnswers.length;
                    }
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        obtainMark['Fill in the Blanks'] += score;
                    }
                    break;
                }
                case 'Highlight Correct Summary': {
                    let tmp = userResponse;
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        totalMark['Highlight Correct Summary'] += 1;
                        obtainMark['Highlight Correct Summary'] += score;
                    }
                    break;
                }
                case 'Select Missing Word': {
                    let tmp = userResponse;
                    if (tmp.enableSkillsData && Array.isArray(tmp.enableSkillsData) && tmp.enableSkillsData.length > 0) {
                        let scoreStr = tmp.enableSkillsData[0]['score'] || '0/0';
                        let score = parseInt(scoreStr.split('/')[0]) || 0;
                        totalMark['Select Missing Word'] += 1;
                        obtainMark['Select Missing Word'] += score;
                    }
                    break;
                }
                default: {
                    console.warn(`Unhandled SubCategory: ${subCategory}`);
                    break;
                }
            }
        });
    });

    // This is being used in AnalyticsForMtScore
    setScores({
        raTotal: totalMark['Read Aloud'],
        raObtain: obtainMark['Read Aloud'],
        rsTotal: totalMark['Repeat Sentence'],
        rsObtain: obtainMark['Repeat Sentence'],
        diTotal: totalMark["Describe Image"],
        diObtain: obtainMark["Describe Image"],
        rlTotal: totalMark["Re-tell Lecture"],
        rlObtain: obtainMark["Re-tell Lecture"],
        rtsTotal: totalMark["Respond to a situation"],
        rtsObtain: obtainMark["Respond to a situation"],
        asqTotal: totalMark["Answer Short Question"],
        asqObtain: obtainMark["Answer Short Question"],

        swtTotal: totalMark["Summarize Written Text"],
        swtObtain: obtainMark["Summarize Written Text"],
        weTotal: totalMark["Write Essay"],
        weObtain: obtainMark["Write Essay"],
        ewTotal: totalMark["Write Email"],
        ewObtain: obtainMark["Write Email"],        

        rwfibTotal: totalMark['Reading & Writing: Fill in the Blanks'],
        rwfibObtain: obtainMark['Reading & Writing: Fill in the Blanks'],
        mcmaTotal: totalMark['Multiple Choice, Multiple Answers'],
        mcmaObtain: obtainMark['Multiple Choice, Multiple Answers'],
        ropTotal: totalMark['Re-order Paragraphs'],
        ropObtain: obtainMark['Re-order Paragraphs'],
        rfibTotal: totalMark['Reading: Fill in the Blanks'],
        rfibObtain: obtainMark['Reading: Fill in the Blanks'],
        mcsaTotal: totalMark['Multiple Choice, Single Answer'], 
        mcsaObtain: obtainMark['Multiple Choice, Single Answer'],

        sstTotal: totalMark['Summarize Spoken Text'],
        sstObtain: obtainMark['Summarize Spoken Text'],
        lmcmaTotal: totalMark['Listening: Multiple Choice, Multiple Answers'],
        lmcmaObtain: obtainMark['Listening: Multiple Choice, Multiple Answers'],
        lmcsaTotal: totalMark['Listening: Multiple Choice, Single Answer'],
        lmcsaObtain: obtainMark['Listening: Multiple Choice, Single Answer'],
        hiwTotal: totalMark['Highlight Incorrect Words'],
        hiwObtain: obtainMark['Highlight Incorrect Words'],
        fibTotal: totalMark['Fill in the Blanks'],
        fibObtain: obtainMark['Fill in the Blanks'],
        hcsTotal: totalMark['Highlight Correct Summary'],
        hcsObtain: obtainMark['Highlight Correct Summary'],
        smwTotal: totalMark['Select Missing Word'],
        smwObtain: obtainMark['Select Missing Word'],
        mcsaTotal: totalMark['Multiple Choice, Single Answer'], 
        mcsaObtain: obtainMark['Multiple Choice, Single Answer'],
    });

    // This is being used in Feedbacks
    setCategoryScores({
      raTotal: totalMark['Read Aloud'],
      raObtain: obtainMark['Read Aloud'],
      rsTotal: totalMark['Repeat Sentence'],
      rsObtain: obtainMark['Repeat Sentence'],
      diTotal: totalMark["Describe Image"],
      diObtain: obtainMark["Describe Image"],
      rlTotal: totalMark["Re-tell Lecture"],
      rlObtain: obtainMark["Re-tell Lecture"],
      rtsTotal: totalMark["Respond to a situation"],
      rtsObtain: obtainMark["Respond to a situation"],
      asqTotal: totalMark["Answer Short Question"],
      asqObtain: obtainMark["Answer Short Question"],

      swtTotal: totalMark["Summarize Written Text"],
      swtObtain: obtainMark["Summarize Written Text"],
      weTotal: totalMark["Write Essay"],
      weObtain: obtainMark["Write Essay"],
      ewTotal: totalMark["Write Email"],
      ewObtain: obtainMark["Write Email"],        

      rwfibTotal: totalMark['Reading & Writing: Fill in the Blanks'],
      rwfibObtain: obtainMark['Reading & Writing: Fill in the Blanks'],
      mcmaTotal: totalMark['Multiple Choice, Multiple Answers'],
      mcmaObtain: obtainMark['Multiple Choice, Multiple Answers'],
      ropTotal: totalMark['Re-order Paragraphs'],
      ropObtain: obtainMark['Re-order Paragraphs'],
      rfibTotal: totalMark['Reading: Fill in the Blanks'],
      rfibObtain: obtainMark['Reading: Fill in the Blanks'],
      mcsaTotal: totalMark['Multiple Choice, Single Answer'], 
      mcsaObtain: obtainMark['Multiple Choice, Single Answer'],

      sstTotal: totalMark['Summarize Spoken Text'],
      sstObtain: obtainMark['Summarize Spoken Text'],
      lmcmaTotal: totalMark['Listening: Multiple Choice, Multiple Answers'],
      lmcmaObtain: obtainMark['Listening: Multiple Choice, Multiple Answers'],
      lmcsaTotal: totalMark['Listening: Multiple Choice, Single Answer'],
      lmcsaObtain: obtainMark['Listening: Multiple Choice, Single Answer'],
      hiwTotal: totalMark['Highlight Incorrect Words'],
      hiwObtain: obtainMark['Highlight Incorrect Words'],
      fibTotal: totalMark['Fill in the Blanks'],
      fibObtain: obtainMark['Fill in the Blanks'],
      hcsTotal: totalMark['Highlight Correct Summary'],
      hcsObtain: obtainMark['Highlight Correct Summary'],
      smwTotal: totalMark['Select Missing Word'],
      smwObtain: obtainMark['Select Missing Word'],
      mcsaTotal: totalMark['Multiple Choice, Single Answer'], 
      mcsaObtain: obtainMark['Multiple Choice, Single Answer'],
    });
  }

  //--------------------------------------//

  const getSpeakingTotal = (keyName) => {
    const keyPercentages = isPteCore ? {
      'Read Aloud': 33,
      'Repeat Sentence': 30,
      'Describe Image': 22,
      'Respond to a situation': 10,
      'Answer Short Question': 5
    } : {
      'Read Aloud': 33,
      'Repeat Sentence': 30,
      'Describe Image': 22,
      'Re-tell Lecture': 10,
      'Answer Short Question': 5
    };
    return (keyPercentages[keyName]*0.9).toFixed(1);
  }

  const getSpeakingObtained = (keyName) => {
    let total = getSpeakingTotal(keyName);
    let ra = scores['raObtain']/scores['raTotal'] * total;
    let rs = scores['rsObtain']/scores['rsTotal'] * total;
    let di = scores['diObtain']/scores['diTotal'] * total;
    let rl = isPteCore ? 0 : scores['rlObtain']/scores['rlTotal'] * total;
    let rts = isPteCore ? scores['rtsObtain']/scores['rtsTotal'] * total : 0;
    let asq = scores['asqObtain']/scores['asqTotal'] * total;

    const key = isPteCore ? {
      'Read Aloud': ra,
      'Repeat Sentence': rs,
      'Describe Image': di,
      'Respond to a situation': rts,
      'Answer Short Question': asq
    } : {
      'Read Aloud': ra,
      'Repeat Sentence': rs,
      'Describe Image': di,
      'Re-tell Lecture': rl,
      'Answer Short Question': asq
    };

    let res = key[keyName];
    if (isNaN(res)){
      res = 0;
    }
    return (typeof(res) === 'number')?res.toFixed(1):res;    
  }  

  const getWritingTotal = (keyName) => {  
    const keyPercentages = isPteCore ? {
      'Summarize Written Text': 6.0,
      'Write Email': 17.0,
      'Reading & Writing: Fill in the Blanks': 25.0,
      'Summarize Spoken Text': 6.0,
      'Write from Dictation': 28.0,
      'Fill in the Blanks': 18.0
    } : {
      'Summarize Written Text': 6.0,
      'Write Essay': 17.0,
      'Reading & Writing: Fill in the Blanks': 25.0,
      'Summarize Spoken Text': 6.0,
      'Write from Dictation': 28.0,
      'Fill in the Blanks': 18.0
    };  
    return (keyPercentages[keyName]*0.9).toFixed(1);    
  }

  const getWritingObtain = (keyName) => {
    let total = getWritingTotal(keyName);
    let swt = scores['swtObtain']/scores['swtTotal'] * total;
    let we = isPteCore ? 0 : scores['weObtain']/scores['weTotal'] * total;
    let ew = isPteCore ? scores['ewObtain']/scores['ewTotal'] * total : 0;
    let rwfib = scores['rwfibObtain']/scores['rwfibTotal'] * total;
    let sst = scores['sstObtain']/scores['sstTotal'] * total;
    let wfd = scores['wfdObtain']/scores['wfdTotal'] * total;
    let fib = scores['fibObtain']/scores['fibTotal'] * total;

    const key = isPteCore ? {
      'Summarize Written Text': swt,
      'Write Email': ew,
      'Reading & Writing: Fill in the Blanks': rwfib,
      'Summarize Spoken Text': sst,
      'Write from Dictation': wfd,
      'Fill in the Blanks': fib
    } : {
      'Summarize Written Text': swt,
      'Write Essay': we,
      'Reading & Writing: Fill in the Blanks': rwfib,
      'Summarize Spoken Text': sst,
      'Write from Dictation': wfd,
      'Fill in the Blanks': fib
    };

    let res = key[keyName];
    if (isNaN(res)){
      res = 0;
    }    
    return (typeof(res) === 'number')?res.toFixed(1):res;    
  }  

  const getReadingTotal = (keyName) => {
    const keyPercentages = isPteCore ? {
      'Read Aloud': 27,
      'Summarize Written Text': 4,
      'Reading & Writing: Fill in the Blanks': 30,
      'Reading: Fill in the Blanks': 20,
      'Multiple Choice, Multiple Answers': 2,
      'Multiple Choice, Single Answer': 1,
      'Re-order Paragraphs': 7,
      'Highlight Incorrect Words': 9
    } : {
      'Read Aloud': 27,
      'Summarize Written Text': 4,
      'Reading & Writing: Fill in the Blanks': 29,
      'Reading: Fill in the Blanks': 20,
      'Multiple Choice, Multiple Answers': 2,
      'Multiple Choice, Single Answer': 1,
      'Re-order Paragraphs': 7,
      'Highlight Correct Summary': 1,
      'Highlight Incorrect Words': 9
    };
    return (keyPercentages[keyName]*0.9).toFixed(1);
    
  }

  const getReadingObtain = (keyName) => {
    let total = getReadingTotal(keyName);
    let ra = scores['raObtain']/scores['raTotal'] * total;
    let swt = scores['swtObtain']/scores['swtTotal'] * total;
    let fibrw = scores['rwfibObtain']/scores['rwfibTotal'] * total;
    let rfib = scores['rfibObtain']/scores['rfibTotal'] * total;
    let mcma = scores['mcmaObtain']/scores['mcmaTotal'] * total;
    let mcsa = scores['mcsaObtain']/scores['mcsaTotal'] * total;
    let rop = scores['ropObtain']/scores['ropTotal'] * total;
    let hcs = isPteCore ? 0 : scores['hcsObtain']/scores['hcsTotal'] * total;
    let hiw = scores['hiwObtain']/scores['hiwTotal'] * total;

    const key = isPteCore ? {
      'Read Aloud': ra,
      'Summarize Written Text': swt,
      'Reading & Writing: Fill in the Blanks': fibrw,
      'Reading: Fill in the Blanks': rfib,
      'Multiple Choice, Multiple Answers': mcma,
      'Multiple Choice, Single Answer':mcsa,
      'Re-order Paragraphs': rop,
      'Highlight Incorrect Words': hiw
    } : {
      'Read Aloud': ra,
      'Summarize Written Text': swt,
      'Reading & Writing: Fill in the Blanks': fibrw,
      'Reading: Fill in the Blanks': rfib,
      'Multiple Choice, Multiple Answers': mcma,
      'Multiple Choice, Single Answer':mcsa,
      'Re-order Paragraphs': rop,
      'Highlight Correct Summary': hcs,
      'Highlight Incorrect Words': hiw
    };

    let res = key[keyName];
    if (isNaN(res)){
      res = 0;
    }    
    return (typeof(res) === 'number')?res.toFixed(1):res;    
  }  

  const getListenTotal = (keyName) => {
    const keyPercentages = isPteCore ? {
      'Summarize Spoken Text': 6,
      'Multiple Choice, Multiple Answers': 2,
      'Multiple Choice, Single Answer': 1,
      'Highlight Incorrect Words': 16,
      'Fill in the Blanks': 12,
      'Write from Dictation': 25,
      'Select Missing Word': 1,
      'Repeat Sentence': 23,
      'Respond to a situation': 10,
      'Answer Short Question': 4
    } : {
      'Summarize Spoken Text': 6,
      'Multiple Choice, Multiple Answers': 2,
      'Multiple Choice, Single Answer': 1,
      'Highlight Incorrect Words': 16,
      'Fill in the Blanks': 12,
      'Write from Dictation': 25,
      'Highlight Correct Summary': 1,
      'Select Missing Word': 1,
      'Repeat Sentence': 23,
      'Re-tell Lecture': 9,
      'Answer Short Question': 4
    };
    return (keyPercentages[keyName]*0.9).toFixed(1);
  }

  const getListenObtain = (keyName) => {
    let total = getListenTotal(keyName);
    let sst = scores['sstObtain']/scores['sstTotal'] * total;
    let mcma = scores['lmcmaObtain']/scores['lmcmaTotal'] * total;
    let mcsa = scores['lmcsaObtain']/scores['lmcsaTotal'] * total;
    let hiw  = scores['hiwObtain']/scores['hiwTotal'] * total;
    let fib = scores['fibObtain']/scores['fibTotal'] * total;
    let wfd = scores['wfdObtain']/scores['wfdTotal'] * total;
    let hcs = isPteCore ? 0 : scores['hcsObtain']/scores['hcsTotal'] * total;
    let smw  = scores['smwObtain']/scores['smwTotal'] * total;
    let rs  = scores['rsObtain']/scores['rsTotal'] * total;
    let rl = isPteCore ? 0 : scores['rlObtain']/scores['rlTotal'] * total;
    let rts = isPteCore ? scores['rtsObtain']/scores['rtsTotal'] * total : 0;
    let asq  = scores['asqObtain']/scores['asqTotal'] * total;

    const key = isPteCore ? {
      'Summarize Spoken Text': sst,
       'Multiple Choice, Multiple Answers': mcma,
       'Multiple Choice, Single Answer': mcsa,
       'Highlight Incorrect Words': hiw,
       'Fill in the Blanks': fib,
       'Write from Dictation': wfd,
       'Select Missing Word': smw,
       'Repeat Sentence': rs,
       'Respond to a situation': rts,
       'Answer Short Question': asq
    } : {
      'Summarize Spoken Text': sst,
       'Multiple Choice, Multiple Answers': mcma,
       'Multiple Choice, Single Answer': mcsa,
       'Highlight Incorrect Words': hiw,
       'Fill in the Blanks': fib,
       'Write from Dictation': wfd,
       'Highlight Correct Summary': hcs,
       'Select Missing Word': smw,
       'Repeat Sentence': rs,
       'Re-tell Lecture': rl,
       'Answer Short Question': asq
    };
    let res = key[keyName];
    if (isNaN(res)){
      res = 0;
    }    
    return (typeof(res) === 'number')?res.toFixed(1):res;    
  }

  //--------------------------------------//

  const getTotSpeakingScore = () => {
    let tempTotal = 0;
    const speakingTests = isPteCore ? MergedTestsForScoringCore['Speaking'] : MergedTestsForScoring['Speaking'];
    speakingTests.forEach(test => {
      let tmp = parseFloat(getSpeakingObtained(test));
      tempTotal += tmp;
    })
    tempTotal = Math.round(tempTotal);
    tempTotal = tempTotal<10? 10 : tempTotal 
    return tempTotal
  }

  const getTotWritingScore = () => {
    let tempTotal = 0;
    const writingTests = isPteCore ? MergedTestsForScoringCore['Writing'] : MergedTestsForScoring['Writing'];
    writingTests.forEach(test => {
      let tmp = parseFloat(getWritingObtain(test));
      tempTotal += tmp;
    })
    tempTotal = Math.round(tempTotal);
    tempTotal = tempTotal<10? 10 : tempTotal; 
    return tempTotal
  }

  const getTotReadingScore = () => {
    let tempTotal = 0;
    const readingTests = isPteCore ? MergedTestsForScoringCore['Reading'] : MergedTestsForScoring['Reading'];
    readingTests.forEach(test => {
      let tmp = parseFloat(getReadingObtain(test));
      tempTotal += tmp;
    })
    tempTotal = Math.round(tempTotal);
    tempTotal = tempTotal<10? 10 : tempTotal;
    return tempTotal
  }

  const getTotListeningScore = () => {
    let tempTotal = 0;
    const listeningTests = isPteCore ? MergedTestsForScoringCore['Listening'] : MergedTestsForScoring['Listening'];
    listeningTests.forEach(test => {
      let tmp = parseFloat(getListenObtain(test));
      tempTotal += tmp;
    })
    tempTotal = Math.round(tempTotal);
    tempTotal = tempTotal<10? 10 : tempTotal;
    return tempTotal
  }

  const getSpeakingData = (counts) => {
    return {
      id: 1,
      imageSrc: TodayTaskImg4,
      titleText: "Speaking",
      titleTextColor: "#49D7F2",
      marksTextColor: "#66E0F7CC",
      barBgColor: "rgba(73, 215, 242, 0.2)",
      categoriesData: isPteCore ? [
        {
          CategoryName: "Read Aloud",
          TotalCount: counts ? getSpeakingTotal('Read Aloud') : 0,
          attemptedcount: counts ? getSpeakingObtained('Read Aloud') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Repeat Sentence",
          TotalCount: counts ? getSpeakingTotal('Repeat Sentence') : 0,
          attemptedcount: counts ? getSpeakingObtained('Repeat Sentence') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Describe Image",
          TotalCount: counts ? getSpeakingTotal('Describe Image') : 0,
          attemptedcount: counts ? getSpeakingObtained('Describe Image') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Respond to a Situation",
          TotalCount: counts ? getSpeakingTotal('Respond to a situation') : 0,
          attemptedcount: counts ? getSpeakingObtained('Respond to a situation') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Answer Short Question",
          TotalCount: counts ? getSpeakingTotal('Answer Short Question') : 0,
          attemptedcount: counts ? getSpeakingObtained('Answer Short Question') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
      ] : [
        // Academic version
        {
          CategoryName: "Read Aloud",
          TotalCount: counts ? getSpeakingTotal('Read Aloud') : 0,
          attemptedcount: counts ? getSpeakingObtained('Read Aloud') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Repeat Sentence",
          TotalCount: counts ? getSpeakingTotal('Repeat Sentence') : 0,
          attemptedcount: counts ? getSpeakingObtained('Repeat Sentence') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Describe Image",
          TotalCount: counts ? getSpeakingTotal('Describe Image') : 0,
          attemptedcount: counts ? getSpeakingObtained('Describe Image') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Re-Tell Lecture",
          TotalCount: counts ? getSpeakingTotal('Re-tell Lecture') : 0,
          attemptedcount: counts ? getSpeakingObtained('Re-tell Lecture') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Answer Short Question",
          TotalCount: counts ? getSpeakingTotal('Answer Short Question') : 0,
          attemptedcount: counts ? getSpeakingObtained('Answer Short Question') : 0,
          totalProgress: "0",
          chunkCount: "10",
        },
      ]
    };
  };
  
  const getWritingData = (counts) => {
    return {
      id: 3,
      imageSrc: TodayTaskImg3,
      titleText: "Writing",
      titleTextColor: "#FF5D5D",
      marksTextColor: "#FF5D5DCC",
      barBgColor: "rgba(255, 93, 93, 0.2)",
      categoriesData: isPteCore ? [
        {
          CategoryName: "Summarize Written Text",
          TotalCount: counts ? getWritingTotal("Summarize Written Text") : 0,
          attemptedcount: counts ? getWritingObtain("Summarize Written Text") : 0,
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Write Email",
          TotalCount: counts ? getWritingTotal("Write Email") : 0,
          attemptedcount: counts ? getWritingObtain("Write Email") : 0,
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Reading & Writing: Fill in the Blanks",
          TotalCount: counts ? getWritingTotal("Reading & Writing: Fill in the Blanks") : 0,
          attemptedcount: counts ? getWritingObtain("Reading & Writing: Fill in the Blanks") : 0,
          totalProgress: "80",
          chunkCount: "10",
        },
        {
          CategoryName: "Summarize Spoken Text",
          TotalCount: counts ? getWritingTotal("Summarize Spoken Text") : 0,
          attemptedcount: counts ? getWritingObtain("Summarize Spoken Text") : 0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Fill in the Blanks",
          TotalCount: counts ? getWritingTotal("Fill in the Blanks") : 0,
          attemptedcount: counts ? getWritingObtain("Fill in the Blanks") : 0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Write from Dictation",
          TotalCount: counts ? getWritingTotal("Write from Dictation") : 0,
          attemptedcount: counts ? getWritingObtain("Write from Dictation") : 0,
          totalProgress: "40",
          chunkCount: "10",
        },
      ] : [
        {
          CategoryName: "Summarize Written Text",
          TotalCount: counts ? getWritingTotal("Summarize Written Text") : 0,
          attemptedcount: counts ? getWritingObtain("Summarize Written Text") : 0,
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Write Essay",
          TotalCount: counts ? getWritingTotal("Write Essay") : 0,
          attemptedcount: counts ? getWritingObtain("Write Essay") : 0,
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Reading & Writing: Fill in the Blanks",
          TotalCount: counts ? getWritingTotal("Reading & Writing: Fill in the Blanks") : 0,
          attemptedcount: counts ? getWritingObtain("Reading & Writing: Fill in the Blanks") : 0,
          totalProgress: "80",
          chunkCount: "10",
        },
        {
          CategoryName: "Summarize Spoken Text",
          TotalCount: counts ? getWritingTotal("Summarize Spoken Text") : 0,
          attemptedcount: counts ? getWritingObtain("Summarize Spoken Text") : 0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Fill in the Blanks",
          TotalCount: counts ? getWritingTotal("Fill in the Blanks") : 0,
          attemptedcount: counts ? getWritingObtain("Fill in the Blanks") : 0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Write from Dictation",
          TotalCount: counts ? getWritingTotal("Write from Dictation") : 0,
          attemptedcount: counts ? getWritingObtain("Write from Dictation") : 0,
          totalProgress: "40",
          chunkCount: "10",
        },
      ]
    };
  };

  const getReadingData = (counts) => {
    return {
      id: 3,
      imageSrc: TodayTaskImg1,
      titleText: "Reading",
      titleTextColor: "#AD826E",
      marksTextColor: "#AD826ECC",
      barBgColor: "rgba(173, 130, 110, 0.2)",
      categoriesData: isPteCore ? [
        // Core reading items
        {
          CategoryName: "Read Aloud",
          TotalCount: counts?getReadingTotal('Read Aloud'):0,
          attemptedcount: counts?getReadingObtain('Read Aloud'):0,
          totalProgress: "0",
          chunkCount: "10",
        },      
        {
          CategoryName: "Summarize Written Text",
          TotalCount: counts?getReadingTotal("Summarize Written Text"):0,
          attemptedcount: counts?getReadingObtain("Summarize Written Text"):0,
          totalProgress: "0",
          chunkCount: "10",
        },      
        {
          CategoryName: "Reading & Writing: Fill in the Blanks",
          TotalCount: counts?getReadingTotal("Reading & Writing: Fill in the Blanks"):0,
          attemptedcount: counts?getReadingObtain("Reading & Writing: Fill in the Blanks"):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Reading: Fill in the Blanks",
          TotalCount: counts?getReadingTotal('Reading: Fill in the Blanks'):0,
          attemptedcount: counts?getReadingObtain('Reading: Fill in the Blanks'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: counts?getReadingTotal('Multiple Choice, Multiple Answers'):0,
          attemptedcount: counts?getReadingObtain('Multiple Choice, Multiple Answers'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Re-order Paragraphs",
          TotalCount: counts?getReadingTotal('Re-order Paragraphs'):0,
          attemptedcount: counts?getReadingObtain('Re-order Paragraphs'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: counts?getReadingTotal('Multiple Choice, Single Answer'):0,
          attemptedcount: counts?getReadingObtain('Multiple Choice, Single Answer'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Incorrect Words",
          TotalCount: counts?getReadingTotal('Highlight Incorrect Words'):0,
          attemptedcount: counts?getReadingObtain('Highlight Incorrect Words'):0,
          totalProgress: "0",
          chunkCount: "10",
        },   
      ] : [
        // Academic reading items
        {
          CategoryName: "Read Aloud",
          TotalCount: counts?getReadingTotal('Read Aloud'):0,
          attemptedcount: counts?getReadingObtain('Read Aloud'):0,
          totalProgress: "0",
          chunkCount: "10",
        },      
        {
          CategoryName: "Summarize Written Text",
          TotalCount: counts?getReadingTotal("Summarize Written Text"):0,
          attemptedcount: counts?getReadingObtain("Summarize Written Text"):0,
          totalProgress: "0",
          chunkCount: "10",
        },      
        {
          CategoryName: "Reading & Writing: Fill in the Blanks",
          TotalCount: counts?getReadingTotal("Reading & Writing: Fill in the Blanks"):0,
          attemptedcount: counts?getReadingObtain("Reading & Writing: Fill in the Blanks"):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Reading: Fill in the Blanks",
          TotalCount: counts?getReadingTotal('Reading: Fill in the Blanks'):0,
          attemptedcount: counts?getReadingObtain('Reading: Fill in the Blanks'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: counts?getReadingTotal('Multiple Choice, Multiple Answers'):0,
          attemptedcount: counts?getReadingObtain('Multiple Choice, Multiple Answers'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Re-order Paragraphs",
          TotalCount: counts?getReadingTotal('Re-order Paragraphs'):0,
          attemptedcount: counts?getReadingObtain('Re-order Paragraphs'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: counts?getReadingTotal('Multiple Choice, Single Answer'):0,
          attemptedcount: counts?getReadingObtain('Multiple Choice, Single Answer'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Correct Summary",
          TotalCount: counts?getReadingTotal('Highlight Correct Summary'):0,
          attemptedcount: counts?getReadingObtain('Highlight Correct Summary'):0,
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Incorrect Words",
          TotalCount: counts?getReadingTotal('Highlight Incorrect Words'):0,
          attemptedcount: counts?getReadingObtain('Highlight Incorrect Words'):0,
          totalProgress: "0",
          chunkCount: "10",
        },   
      ]
    };
  };

  const getListeningData = (counts) => {
    return {
      id: 2,
      imageSrc: TodayTaskImg2,
      titleText: "Listening",
      titleTextColor: "#868EAF",
      marksTextColor: "#868EAFCC",
      barBgColor: "rgba(134, 142, 175, 0.2)",
      categoriesData: isPteCore ? [
        // Core listening items
        {
          CategoryName: "Summarize Spoken Text",
          TotalCount: counts?getListenTotal("Summarize Spoken Text"):0,
          attemptedcount: counts?getListenObtain("Summarize Spoken Text"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: counts?getListenTotal("Multiple Choice, Multiple Answers"):0,
          attemptedcount: counts?getListenObtain("Multiple Choice, Multiple Answers"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: counts?getListenTotal("Multiple Choice, Single Answer"):0,
          attemptedcount: counts?getListenObtain("Multiple Choice, Single Answer"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Incorrect Words",
          TotalCount: counts?getListenTotal("Highlight Incorrect Words"):0,
          attemptedcount: counts?getListenObtain("Highlight Incorrect Words"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Fill in the Blanks",
          TotalCount: counts?getListenTotal("Fill in the Blanks"):0,
          attemptedcount: counts?getListenObtain("Fill in the Blanks"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Write from Dictation",
          TotalCount: counts?getListenTotal("Write from Dictation"):0,
          attemptedcount: counts?getListenObtain("Write from Dictation"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Select Missing Word",
          TotalCount: counts?getListenTotal("Select Missing Word"):0,
          attemptedcount: counts?getListenObtain("Select Missing Word"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Repeat Sentence",
          TotalCount: counts?getListenTotal("Repeat Sentence"):0,
          attemptedcount: counts?getListenObtain('Repeat Sentence'):0,
          totalProgress: "70",
          chunkCount: "10",
        },   
        {
          CategoryName: "Respond to a Situation",
          TotalCount: counts?getListenTotal("Respond to a situation"):0,
          attemptedcount: counts?getListenObtain('Respond to a situation'):0,
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Answer Short Question",
          TotalCount: counts?getListenTotal("Answer Short Question"):0,
          attemptedcount: counts?getListenObtain('Answer Short Question'):0,
          totalProgress: "80",
          chunkCount: "10",
        },         
      ] : [
        // Academic listening items
        {
          CategoryName: "Summarize Spoken Text",
          TotalCount: counts?getListenTotal("Summarize Spoken Text"):0,
          attemptedcount: counts?getListenObtain("Summarize Spoken Text"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: counts?getListenTotal("Multiple Choice, Multiple Answers"):0,
          attemptedcount: counts?getListenObtain("Multiple Choice, Multiple Answers"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: counts?getListenTotal("Multiple Choice, Single Answer"):0,
          attemptedcount: counts?getListenObtain("Multiple Choice, Single Answer"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Incorrect Words",
          TotalCount: counts?getListenTotal("Highlight Incorrect Words"):0,
          attemptedcount: counts?getListenObtain("Highlight Incorrect Words"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Fill in the Blanks",
          TotalCount: counts?getListenTotal("Fill in the Blanks"):0,
          attemptedcount: counts?getListenObtain("Fill in the Blanks"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Write from Dictation",
          TotalCount: counts?getListenTotal("Write from Dictation"):0,
          attemptedcount: counts?getListenObtain("Write from Dictation"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Correct Summary",
          TotalCount: counts?getListenTotal("Highlight Correct Summary"):0,
          attemptedcount: counts?getListenObtain("Highlight Correct Summary"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Select Missing Word",
          TotalCount: counts?getListenTotal("Select Missing Word"):0,
          attemptedcount: counts?getListenObtain("Select Missing Word"):0,
          totalProgress: "40",
          chunkCount: "10",
        },
        {
          CategoryName: "Repeat Sentence",
          TotalCount: counts?getListenTotal("Repeat Sentence"):0,
          attemptedcount: counts?getListenObtain('Repeat Sentence'):0,
          totalProgress: "70",
          chunkCount: "10",
        },   
        {
          CategoryName: "Re-Tell Lecture",
          TotalCount: counts?getListenTotal("Re-tell Lecture"):0,
          attemptedcount: counts?getListenObtain('Re-tell Lecture'):0,
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Answer Short Question",
          TotalCount: counts?getListenTotal("Answer Short Question"):0,
          attemptedcount: counts?getListenObtain('Answer Short Question'):0,
          totalProgress: "80",
          chunkCount: "10",
        },         
      ]
    };
  };

  return (
    <MockTestScoreContext.Provider
      value={{
        scores,
        setScores,
        categoryScores,
        setCategoryScores,

        giveScores,

        getSpeakingTotal,
        getSpeakingObtained,
        getWritingTotal,
        getWritingObtain,
        getReadingTotal,
        getReadingObtain,
        getListenTotal,
        getListenObtain,

        getTotSpeakingScore,
        getTotWritingScore,
        getTotReadingScore,
        getTotListeningScore,

        getSpeakingData,
        getWritingData,
        getReadingData,
        getListeningData,
      }}
    >
      {children}
    </MockTestScoreContext.Provider>
  );
};

export const useMockTestScore = () => useContext(MockTestScoreContext);
