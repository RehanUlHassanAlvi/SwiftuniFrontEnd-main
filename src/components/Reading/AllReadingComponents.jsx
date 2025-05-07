import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import { MainOuterDiv } from "../Writing/style";
import {
  AiScorePopupReadingMCMAData,
  FillBlanksCardData,
  ReadingAndWritingBlanksData,
  ReOrderParagraphsData,
} from "./data";
import FillBlanksCard from "./FillBlanksCard";

const AllReadingComponents = () => {
  return (
    <>
      <MainOuterDiv>
        {" "}
        <FlexDiv style={{ margin: "0 100px", flexDirection: "column" }}>
          {/* <FlexDiv style={{ margin: "30px 0px" }}>
            <AiScorePopupReading
              key={AiScorePopupReadingMCMAData[0].key}
              EnableSkills={AiScorePopupReadingMCMAData[0].EnableSkills}
              SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
              UserResponse={AiScorePopupReadingMCMAData[0].UserResponse}
            />
          </FlexDiv> */}
          <FlexDiv>
            <FillBlanksCard
              id={FillBlanksCardData[0].id}
              textValue={FillBlanksCardData[0].textValue}
              fillingWords={FillBlanksCardData[0].fillingWords}
            />
          </FlexDiv>
          <FlexDiv style={{ marginTop: "30px" }}>
            {/* <ReadingAndWritingBlanks
              id={ReadingAndWritingBlanksData[0].id}
              textValue={ReadingAndWritingBlanksData[0].textValue}
              dropDownOptions={ReadingAndWritingBlanksData[0].dropDownOptions}
            /> */}
          </FlexDiv>
          <FlexDiv style={{ marginTop: "30px" }}>
            {/* <ReOrderParagraphs ReOrderParagraphsData={ReOrderParagraphsData} /> */}
          </FlexDiv>
        </FlexDiv>
      </MainOuterDiv>
    </>
  );
};

export default AllReadingComponents;
