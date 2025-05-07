import React, { useState, useEffect } from "react";
import CheckIcon from "../../assets/images/tick_icon.svg";
import CrossIcon from "../../assets/images/cancel_icon.svg";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  HICMainDiv,
  HICCardContent,
  HICParagraphText,
  HICCorrectWord,
  HICWord,
} from "./styles";

const CheckIconStyle = {
  color: "green",
  marginRight: "5px",
};

const CrossIconStyle = {
  color: "red",
  marginRight: "5px",
};

const HighlightIncWordsCard = ({
  textValue,
  correctWords,
  incorrectWords,
  setSelectedAnswers,
  isSubmitted,
  setIsSubmitted,
  showAnswer,
}) => {
  const [selectedWords, setSelectedWords] = useState(new Map());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const answersArray = Array.from(selectedWords.values());
    setSelectedAnswers(answersArray);
  }, [selectedWords, setSelectedAnswers]);

  useEffect(() => {
    if (isSubmitted || showAnswer) {
      handleSubmit();
    } else {
      resetSubmission();
    }
  }, [isSubmitted, showAnswer]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetSubmission = () => {
    setSubmitted(false);
    setSelectedWords(new Map());
  };

  const toggleWordSelection = (word, index) => {
    if (submitted) return;
    setSelectedWords((prev) => {
      const newSelection = new Map(prev);
      const wordKey = `${word}-${index}`;
      if (newSelection.has(wordKey)) {
        newSelection.delete(wordKey);
      } else {
        newSelection.set(wordKey, word);
      }
      return newSelection;
    });
  };

  const words = textValue.split(/\s+/).map((word, index) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const wordKey = `${cleanWord}-${index}`;
    const isSelected = selectedWords.has(wordKey);
    const isIncorrect = incorrectWords.includes(cleanWord);
    const correctIndex = incorrectWords.indexOf(cleanWord);
    const displayCorrectWord =
      submitted && isIncorrect ? correctWords[correctIndex] : null;

    return (
      <React.Fragment key={index}>
        <HICWord
          onClick={() => toggleWordSelection(cleanWord, index)}
          isSelected={isSelected}
          isCorrect={submitted && isSelected && isIncorrect}
          isIncorrect={submitted && isIncorrect}
          submitted={submitted}
        >
          {submitted &&
            isIncorrect &&
            (isSelected ? (
              <CheckRoundedIcon style={CheckIconStyle} />
            ) : (
              <CloseRoundedIcon style={CrossIconStyle} />
            ))}
          <span className="wordText">{word}</span>
        </HICWord>
        {submitted && displayCorrectWord && (
          <HICCorrectWord>{correctWords[correctIndex]}</HICCorrectWord>
        )}
      </React.Fragment>
    );
  });

  return (
    <HICMainDiv>
      <HICCardContent submitted={submitted}>
        <HICParagraphText>{words}</HICParagraphText>
      </HICCardContent>
    </HICMainDiv>
  );
};

export default HighlightIncWordsCard;
