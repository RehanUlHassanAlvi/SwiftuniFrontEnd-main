import React, {useState, useEffect} from "react";
import { useMockTestScore } from "../../context/MockTestScoreContext";

const CalculateMockTestsCategoryWiseScoresChild = ({counts = null, speakingTotScore, writingTotScore, readingTotScore, listeningTotScore}) => {

  const {
    scores, 
    setScores,

    giveScores,

    getTotSpeakingScore,
    getTotReadingScore,
    getTotListeningScore,
    getTotWritingScore,
 } = useMockTestScore();

  useEffect(() => {
    giveScores(counts);
  }, [counts]);

  useEffect(() => {
    if (speakingTotScore) speakingTotScore(getTotSpeakingScore());
    if (readingTotScore) readingTotScore(getTotReadingScore());
    if (listeningTotScore) listeningTotScore(getTotListeningScore());
    if (writingTotScore) writingTotScore(getTotWritingScore());
  }, [scores]);
};

export default CalculateMockTestsCategoryWiseScoresChild;
