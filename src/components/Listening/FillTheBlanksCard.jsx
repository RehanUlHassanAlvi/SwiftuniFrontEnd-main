import React, { useState, useEffect, useRef } from "react";
import {
  FillingWordsOuterDiv,
  FillingWordsMainDiv,
  FillingWordsParagraphText,
  FillingWordsBlankBox,
  FillingWordsInputBox,
} from "../../components/Reading/Style";

const inputStyles = {
  border: "none",
  outline: "none",
  textAlign: "center",
  fontSize: "15px",
  fontWeight: "700",
  background: "transparent",
};

const FillTheBlanksCard = ({ textValue, setSelectedAnswers }) => {
  const [answers, setAnswers] = useState(() => {
    return textValue
      .split(" ")
      .filter((word) => word.includes("#~#~#"))
      .map(() => "");
  });

  useEffect(() => {
    const newInitialAnswers = textValue
      .split(" ")
      .filter((word) => word.includes("#~#~#"))
      .map(() => "");

    setAnswers(newInitialAnswers);
  }, [textValue]);

  useEffect(() => {
    setSelectedAnswers(answers);
  }, [answers, setSelectedAnswers]);

  const handleInputChange = (index) => (event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <form>
      <FillingWordsOuterDiv>
        <FillingWordsMainDiv>
          <FillingWordsParagraphText>
            {textValue.split(" ").map((word, wordIndex) => {
              if (word.includes("#~#~#")) {
                const blankIndex =
                  textValue
                    .split(" ")
                    .filter((w, i) => w.includes("#~#~#") && i <= wordIndex)
                    .length - 1;
                return (
                  <FillingWordsBlankBox key={wordIndex} className="blank-box">
                    <FillingWordsInputBox>
                      <input
                        type="text"
                        name={`blank_${blankIndex}`}
                        style={inputStyles}
                        autoComplete="off"
                        value={answers[blankIndex]}
                        onChange={handleInputChange(blankIndex)}
                      />
                    </FillingWordsInputBox>
                  </FillingWordsBlankBox>
                );
              } else {
                return <span key={wordIndex}>{word} </span>;
              }
            })}
          </FillingWordsParagraphText>
        </FillingWordsMainDiv>
      </FillingWordsOuterDiv>
    </form>
  );
};

export default FillTheBlanksCard;
