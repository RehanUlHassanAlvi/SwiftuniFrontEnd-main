import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import { MainOuterDiv } from "./style";
import {
  TextCardReadonlyData,
  MCQsComponentData,
  AiScoreCardSWTData,
  AiScoreCardWriteEssayData,
  AiScoreCardWriteEmailData,
} from "./data";
import TextCardReadonly from "./TextCardReadonly";
import TextAreaInput from "./TextAreaInput";
import MCQsComponent from "./MCQsComponent";
import AiScorePopupWriting from "./AiScorePopupWriting";

const SummarizeWrittenText = () => {
  return (
    <>
      <MainOuterDiv>
        {" "}
        <FlexDiv
          style={{
            margin: "0 20px",
            // "@media (max-width: 450px)": {
            //   margin: "0 10px",
            // },
          }}
        >
          <FlexDiv style={{ flexDirection: "column" }}>
            {/* <FlexDiv style={{ margin: "30px 0px" }}>
              <AiScorePopupWriting
                key={AiScoreCardSWTData[0].key}
                EnableSkills={AiScoreCardSWTData[0].EnableSkills}
                SmallScoreCard={AiScoreCardSWTData[0].SmallScoreCard}
                UserResponse={AiScoreCardSWTData[0].UserResponse}
              />
            </FlexDiv>

            <FlexDiv style={{ margin: "30px 0px" }}>
              <AiScorePopupWriting
                key={AiScoreCardWriteEssayData[0].key}
                EnableSkills={AiScoreCardWriteEssayData[0].EnableSkills}
                SmallScoreCard={AiScoreCardWriteEssayData[0].SmallScoreCard}
                UserResponse={AiScoreCardWriteEssayData[0].UserResponse}
              />
            </FlexDiv>

            <FlexDiv style={{ margin: "30px 0px" }}>
              <AiScorePopupWriting
                key={AiScoreCardWriteEmailData[0].key}
                EnableSkills={AiScoreCardWriteEmailData[0].EnableSkills}
                SmallScoreCard={AiScoreCardWriteEmailData[0].SmallScoreCard}
                UserResponse={AiScoreCardWriteEmailData[0].UserResponse}
              />
            </FlexDiv> */}

            {/* Summary text area */}
            <TextCardReadonly
              id={TextCardReadonlyData[0].id}
              textValue={TextCardReadonlyData[0].textValue}
            />

            {/* Summary input area */}
            <TextAreaInput />

            {/* MCQs component */}
            <MCQsComponent
              id={MCQsComponentData[0].id}
              question={MCQsComponentData[0].question}
              answers={MCQsComponentData[0].answers}
              render={MCQsComponentData[0].render}
            />
          </FlexDiv>
        </FlexDiv>
      </MainOuterDiv>
    </>
  );
};

export default SummarizeWrittenText;
