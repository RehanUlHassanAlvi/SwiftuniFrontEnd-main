import React, { useState } from "react";
import { OuterDiv, StyledTextArea, WordCount } from "./style";
import useMediaQuery from "@mui/material/useMediaQuery";

const TextAreaInput = ({
  placeholder,
  renderWC,
  height,
  setSelectedAnswers,
  isDisabled = false,
}) => {
  const [textValue, setTextValue] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const isMobile = useMediaQuery("(max-width:450px)"); 
  const dynamicHeight = height || (isMobile ? "370px" : "350px");

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setTextValue(inputText);
    setSelectedAnswers(inputText);
    const words = inputText.trim().split(/\s+/); 
    setWordCount(words.length);
  };

  return (
    <>
      <OuterDiv>
        <StyledTextArea
          placeholder={placeholder || "Type your summary here..."}
          height={dynamicHeight}
          isMobile={isMobile}
          value={textValue}
          onChange={handleInputChange}
          disabled={isDisabled}
        />
      </OuterDiv>
      {(renderWC || renderWC === undefined) && (
        <WordCount>
          Word Count: {wordCount}
          <span>{/* word count error here */}</span>
        </WordCount>
      )}
    </>
  );
};

export default TextAreaInput;
