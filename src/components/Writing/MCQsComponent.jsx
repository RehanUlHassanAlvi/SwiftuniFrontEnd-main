import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const MCQsAreaStyles = {
  padding: "0px 0px 0.2rem 0px",
};

const listStyle = {
  padding: 0,
  margin: 0,
};

const labelStyles = {
  flex: 1,
};

const questionStyles = {
  fontFamily: "Noto Sans",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "27px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#000000A6",
};

const answerStyles = {
  fontFamily: "Noto Sans",
  fontSize: "17px",
  fontWeight: 400,
  lineHeight: "27px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#000000A6",
  listStyleType: "none",
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

function convertToAlphabets(indexArray) {
  const sortedIndexes = [...indexArray].sort((a, b) => a - b); // Sort the indexes
  const alphabetsArray = sortedIndexes.map((index) =>
    String.fromCharCode(65 + index)
  );
  return alphabetsArray;
}

const MCQsComponent = ({
  question,
  answers,
  render,
  userSelectedAnswers = [],
}) => {
  const isMobile = useMediaQuery("(max-width:450px)");

  const mainDivStyles = {
    width: "100%",
    height: isMobile ? "auto" : "max-content",
  };

  const radioStyle = {
    width: render === "multiple" ? "18px" : "14px",
    height: render === "multiple" ? "18px" : "14px",
    marginRight: isMobile ? "12px" : "15px",
    verticalAlign: "middle",
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleSingleAnswerSelection = (index) => {
    setSelectedAnswer(index);
    userSelectedAnswers([String.fromCharCode(65 + index)]);
  };

  const handleMultipleAnswerSelection = (index) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    if (updatedSelectedAnswers.includes(index)) {
      updatedSelectedAnswers.splice(updatedSelectedAnswers.indexOf(index), 1);
    } else {
      updatedSelectedAnswers.push(index);
    }
    setSelectedAnswers(updatedSelectedAnswers);
    userSelectedAnswers(convertToAlphabets(updatedSelectedAnswers));
  };

  return (
    <div style={mainDivStyles}>
      <div style={MCQsAreaStyles}>
        <p style={questionStyles}>
          {question}
        </p>
        <ul style={listStyle}>
          {answers.map((answer, index) => (
            <li key={index} style={answerStyles}>
              <input
                style={radioStyle}
                type={render === "multiple" ? "checkbox" : "radio"}
                name="answer"
                id={`answer-${index}`}
                checked={
                  render === "multiple"
                    ? selectedAnswers.includes(index)
                    : selectedAnswer === index
                }
                onChange={() =>
                  render === "multiple"
                    ? handleMultipleAnswerSelection(index)
                    : handleSingleAnswerSelection(index)
                }
              />
              <label htmlFor={`answer-${index}`} style={labelStyles}>
                {answer}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MCQsComponent;
