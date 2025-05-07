import React from "react";
import { useMediaQuery } from "@mui/material";
import { FlexDiv } from "../../assets/styles/style";
import {
  WhiteDiv,
  PTEScoreReport,
  PTEIntSS,
  PTEIntSSDesc,
  PTEGuideImage,
} from "./Style";
import PTEGuideImg from "../../assets/images/pte-guide-integrated-score.svg";

const PTEIntegratedScoring = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const isMobile = useMediaQuery("(max-width:450px)");
  return (
    <FlexDiv
      style={{
        flexDirection: "column",
        padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
      }}
    >
      <WhiteDiv>
        <FlexDiv
          style={{
            padding: isMobile ? "1rem" : "1.5rem",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <PTEScoreReport>PTE Score Report</PTEScoreReport>
          <PTEIntSS>PTE's Integrated Score System</PTEIntSS>
          <PTEIntSSDesc style={{ marginTop: "1.25rem" }}>
            PTE Integrated Score System: some question types of PTE test more
            than one section (listening, speaking, reading and writing). For
            example, Read Aloud (RA), the first question type in the Speaking
            Section, tests not only speaking but also reading. This scoring
            system brings more objectiveness and comprehensiveness.
          </PTEIntSSDesc>
          <PTEIntSSDesc style={{ marginTop: "0.75rem" }}>
            Below is a complete breakdown of PTE’s Integrated Score System by
            SwiftUni:
          </PTEIntSSDesc>
          <PTEGuideImage src={PTEGuideImg} alt="" />
        </FlexDiv>
      </WhiteDiv>
    </FlexDiv>
  );
};

export default PTEIntegratedScoring;
