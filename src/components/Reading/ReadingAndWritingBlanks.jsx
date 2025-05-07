import React, { useState, useEffect } from "react";
import {
  RRBOuterDiv,
  RRBMainDiv,
  RRBParagraph,
  RRBFormControl,
  RRBSelect,
  RRBMenuItem,
} from "./Style";
 
const ReadingAndWritingBlanks = ({
  textValue,
  dropDownOptions,
  setSelectedAnswers,
}) => {
  const [filledText, setFilledText] = useState(textValue);
  const [selectedValues, setSelectedValues] = useState(
    Array(dropDownOptions?.length)?.fill("")
  );

  const replaceWithDropdown = (textValue, dropDownOptions) => {
    const parts = textValue.split("%{option_name}");
    let result = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(<span key={`text-${i}`}>{parts[i]}</span>);
      if(dropDownOptions){
      if (i < dropDownOptions.length) {
        const options = dropDownOptions[i];
        result.push(
          <RRBFormControl
            key={`dropdown-${i}`}
            sx={{ ml: 1, mr: 1, minWidth: 120, verticalAlign: "middle" }}
          >
            <RRBSelect
              value={selectedValues[i]}
              onChange={(e) => handleDropdownChange(e, i)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              renderValue={(selected) => {
                if (!selected) {
                  return <RRBMenuItem>Select Answer</RRBMenuItem>;
                }
                return selected;
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              {options.map((option, index) => (
                <RRBMenuItem key={index} value={option}>
                  {option}
                </RRBMenuItem>
              ))}
            </RRBSelect>
          </RRBFormControl>
        );
      }}
    }
    return result;
  };

  const handleDropdownChange = (event, index) => {
    const newValues = [...selectedValues];
    newValues[index] = event.target.value;
    setSelectedValues(newValues);
    setSelectedAnswers((prevState) => {
      const updatedAnswers = [...prevState];
      updatedAnswers[index] = event.target.value;
      return updatedAnswers;
    });
  };

  useEffect(() => {
    if(dropDownOptions){
      setSelectedValues(Array(dropDownOptions.length).fill(""));
    }
  }, [dropDownOptions]);

  return (
    <RRBOuterDiv>
      <RRBMainDiv>
        <RRBParagraph variant="body1">
          {replaceWithDropdown(textValue, dropDownOptions)}
        </RRBParagraph>
      </RRBMainDiv>
    </RRBOuterDiv>
  );
};

export default ReadingAndWritingBlanks;
