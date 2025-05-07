import React from "react";
import { FlexDiv } from "../../assets/styles/style";
import { MainOuterDiv } from "../Writing/style";
import {
  AiScorePopupSpeakingData,
  DescribeImageCardData,
  SpeakingReadAloudData,
} from "./data";
import DescribeImageCard from "./DescribeImageCard";
import AudioPlayer from "./AudioPlayer";
import SpeakingMicCard from "./SpeakingMicCard";
import QuestionCard from "./QuestionCard";
import AiScorePopupSpeaking from "./AiScorePopupSpeaking";
import ForgetPassowrd from "../Login/ForgetPassowrd";
import ResetPasswordSuccess from "../Login/ResetPasswordSuccess";
import ResetPassword from "../Login/ResetPassword";
import Sidebar from "../SideBar/SideBar";

const AllSpeakingComponents = () => {
  return (
    <>
      <MainOuterDiv>
        <FlexDiv style={{ margin: "0 10px", flexDirection: "column" }}>
          {/* <FlexDiv style={{ margin: "30px 0px" }}>
            <Sidebar />
          </FlexDiv> */}

          {/* <FlexDiv style={{ margin: "30px 0px" }}>
            <ResetPassword />
          </FlexDiv> */}

          {/* <FlexDiv style={{ margin: "30px 0px" }}>
            <ForgetPassowrd />
          </FlexDiv> */}

          {/* <FlexDiv style={{ margin: "30px 0px" }}>
            <ResetPasswordSuccess />
          </FlexDiv> */}

          <FlexDiv style={{ margin: "30px 0px" }}>
            <AiScorePopupSpeaking
              key={AiScorePopupSpeakingData[0].key}
              EnableSkills={AiScorePopupSpeakingData[0].EnableSkills}
              SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
              // UserResponse={AiScorePopupSpeakingData[0].UserResponse}
            />
          </FlexDiv>

          {/* <DescribeImageCard
            id={DescribeImageCardData[0].id}
            srcImage={DescribeImageCardData[0].srcImage}
          /> */}

          {/* <QuestionCard
            id={SpeakingReadAloudData[0].id}
            textValue={SpeakingReadAloudData[0].textValue}
          /> */}

          {/* <AudioPlayer /> */}

          {/* <SpeakingMicCard /> */}
        </FlexDiv>
      </MainOuterDiv>
    </>
  );
};

export default AllSpeakingComponents;
