import React from "react";
import {
  ContainerDiv,
  TipsCard,
  TipsCardContentDiv,
  TipsCardLeftColor,
  TipsDiscr,
  TipsHeader,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";

const tipsData = [
  {
    header: "AI Study Tips",
    description:
      "Focus on the important questions: Speaking RA, RS, DI, RL Writing SWT, WE Reading RO, FIB-R, FIB-RW Listening SST, FIB-L, HIW, WFD Other non-important questions will not affect much of your scores.",
    color: "#996CFE",
  },
  {
    header: "Speaking",
    description:
      "Focus on the important questions: Speaking RA, RS, DI, RL Writing SWT, WE Reading RO, FIB-R, FIB-RW Listening SST, FIB-L, HIW, WFD Other non-important questions will not affect much of your scores.",
    color: "#66E0F7",
  },
  {
    header: "Writing",
    description:
      "Focus on the important questions: Speaking RA, RS, DI, RL Writing SWT, WE Reading RO, FIB-R, FIB-RW Listening SST, FIB-L, HIW, WFD Other non-important questions will not affect much of your scores.",
    color: "#FF5D5D",
  },
  {
    header: "Reading",
    description:
      "Focus on the important questions: Speaking RA, RS, DI, RL Writing SWT, WE Reading RO, FIB-R, FIB-RW Listening SST, FIB-L, HIW, WFD Other non-important questions will not affect much of your scores.",
    color: "#AD826E",
  },
  {
    header: "Listening",
    description:
      "Focus on the important questions: Speaking RA, RS, DI, RL Writing SWT, WE Reading RO, FIB-R, FIB-RW Listening SST, FIB-L, HIW, WFD Other non-important questions will not affect much of your scores.",
    color: "#868EAF",
  },
];

const AiStudyPlanTips = () => {
  return (
    <ContainerDiv>
      {tipsData.map((tip, index) => (
        <TipsCard key={index}>
          <TipsCardContentDiv>
            <TipsCardLeftColor bgColor={tip.color}></TipsCardLeftColor>
            <FlexDiv
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <TipsHeader color={tip.color}>{tip.header}</TipsHeader>
              <TipsDiscr>{tip.description}</TipsDiscr>
            </FlexDiv>
          </TipsCardContentDiv>
        </TipsCard>
      ))}
    </ContainerDiv>
  );
};

export default AiStudyPlanTips;
