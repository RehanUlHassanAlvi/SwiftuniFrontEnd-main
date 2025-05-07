import React from "react";
import TestProgress from "../components/Home/TestProgress";
import { FlexDiv } from "../assets/styles/style";
import AverageScore from "../components/Home/AverageScore";
import AiStudyPlan from "../components/Home/AiStudyPlan";
import Navbar from "../components/Navbar/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import AiStudyPlanTips from "../components/AiStudyPlan/AiStudyPlanTips";

const AiStudyPlanPage = () => {
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");

  return (
    <>
      <Navbar />
      <FlexDiv
        style={{ padding: isLaptopTwo ? "1.5rem 3% 0rem" : "6.5rem 3% 0rem" }}
      >
        <AiStudyPlan />
      </FlexDiv>
      <div
        style={{ padding: isLaptopTwo ? "1.5rem 3% 1rem" : "2.5rem 3% 1rem" }}
      >
        <AiStudyPlanTips />
      </div>
    </>
  );
};

export default AiStudyPlanPage;
