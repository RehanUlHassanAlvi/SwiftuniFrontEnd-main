import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const TextWithInputs = ({ text, setAnswers }) => {
  // Replace newline characters with <br/> tags
  const textWithLineBreaks = text.replace(/\\n/g, "<br/>");

  // Split the text by '%{option_name}' to handle rendering
  const parts = textWithLineBreaks.split("%{option_name}");

  // Initialize the input values array with empty strings for each input field
  const [inputValues, setInputValues] = useState(
    Array(parts.length - 1).fill("")
  );

  useEffect(() => {
    setAnswers(inputValues);
  }, [inputValues, setAnswers]);

  // Function to handle input changes
  const handleInputChange = (value, index) => {
    const newValues = [...inputValues];
    newValues[index] = value; // Update the correct index
    setInputValues(newValues);
  };

  return (
    <div
      style={{ fontFamily: "Noto Sans", fontSize: "18px", lineHeight: "44px" }}
      spellCheck={false}
    >
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {parse(part)}
          {index < parts.length - 1 && (
            <input
              type="text"
              value={inputValues[index]}
              onChange={(e) => handleInputChange(e.target.value, index)}
              style={{
                backgroundColor: "rgba(217, 217, 217, 0.20)",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.30)",
                padding: "5px 10px",
                fontFamily: "Noto Sans",
                fontSize: "18px",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextWithInputs;
