import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import { MainOuterDiv } from "../Writing/style";
import {
  HighlightIncWordsCardData,
  FillTheBlanksCardData,
  AiScoreCardSSTData,
  AiScorePopupReadingWFDData,
} from "./data";
import HighlightIncWordsCard from "./HighlightIncWordsCard";
import FillTheBlanksCard from "./FillTheBlanksCard";
import AiScoreCardSST from "./AiScoreCardSST";
import AiScorePopupListeningWFD from "./AiScorePopupListeningWFD";

const HighlightIncWords = () => {
  return (
    <>
      <MainOuterDiv>
        <FlexDiv style={{ margin: "0 10px", flexDirection: "column" }}>
          <FlexDiv style={{ margin: "30px 0px" }}>
            <AiScorePopupListeningWFD
              key={AiScorePopupReadingWFDData[0].key}
              EnableSkills={AiScorePopupReadingWFDData[0].EnableSkills}
              SmallScoreCard={AiScorePopupReadingWFDData[0].SmallScoreCard}
              UserResponse={AiScorePopupReadingWFDData[0].UserResponse}
            />
          </FlexDiv>

          {/* <FlexDiv style={{ margin: "30px 0px" }}>
            <AiScoreCardSST
              key={AiScoreCardSSTData[0].id}
              EnableSkills={AiScoreCardSSTData[0].EnableSkills}
              WritingScore={AiScoreCardSSTData[0].WritingData}
              UserResponse={AiScoreCardSSTData[0].UserResponseData}
            />
          </FlexDiv> */}

          {/* <FlexDiv>
            <HighlightIncWordsCard
              id={HighlightIncWordsCardData[0].id}
              textValue={HighlightIncWordsCardData[0].textValue}
              incorrectWords={HighlightIncWordsCardData[0].incorrectWords}
              correctWords={HighlightIncWordsCardData[0].correctWords}
            />
          </FlexDiv> */}

          {/* <FlexDiv>
            <FillTheBlanksCard
              id={FillTheBlanksCardData[0].id}
              textValue={FillTheBlanksCardData[0].textValue}
              correctFillingWords={FillTheBlanksCardData[0].correctFillingWords}
            />
          </FlexDiv> */}
        </FlexDiv>
      </MainOuterDiv>
    </>
  );
};

export default HighlightIncWords;
