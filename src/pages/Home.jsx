import React, { useEffect, useState } from "react";
import TestProgress from "../components/Home/TestProgress";
import { FlexDiv } from "../assets/styles/style";
import AverageScore from "../components/Home/AverageScore";
import AiStudyPlan from "../components/Home/AiStudyPlan";
import Navbar from "../components/Navbar/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "../components/Home/Footer";
import BrowserNotSupported from "./BrowserNotSupported";
import PortalAnnouncements from "../components/Home/PortalAnnouncements";
import LastFourMockTestsAverageScore from "../components/MT_Score/LastFourMockTestsAverageScore";
import { NavBlock, ScrollableContainer } from "./Style";

const isNotChrome = () => {
  const userAgent = navigator.userAgent;
  return !/Chrome/.test(userAgent) || /OPR|Edge/.test(userAgent);
};

const Home = () => {
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  const [open, setOpen] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminBarExists, setAdminBarExists] = useState(false);
  const [barExists, setBarExists] = useState(false);
  const [averageScores, setAverageScores] = useState({ speakingAverage: 0, writingAverage: 0, readingAverage: 0, listeningAverage: 0, overallAverage: 0 });
  
  useEffect(() => {
    setOpen(isNotChrome());
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const portalId = userData?.PortalId || 0;
    setShowFooter(portalId === 1);
  }, []);

  return (
    <>
      <PortalAnnouncements setBarExists={setBarExists} setAdminBarExists={setAdminBarExists}/>
      <BrowserNotSupported open={open} close={setOpen} />
      <Navbar />
      <NavBlock />
      {!isSmallScreen && ( 
        <ScrollableContainer 
          style={{
            height: isLaptopTwo 
              ? `calc(100vh - 1.5rem${adminBarExists ? ' - 2.5rem' : ''}${barExists ? ' - 2.5rem' : ''})`
              : `calc(100vh - 5rem${adminBarExists ? ' - 2.5rem' : ''}${barExists ? ' - 2.5rem' : ''})`,
          }}
        >
          <FlexDiv style={{ padding: isLaptopTwo ? "1rem 3% 0rem" : "1.5rem 3% 0rem" }}>
            <AiStudyPlan />
          </FlexDiv>

          <LastFourMockTestsAverageScore setIsLoading={setIsLoading} setAverageScores={setAverageScores} />

          <div style={{ padding: "0rem 3% 0rem" }}>
            <AverageScore isLoading={isLoading} averageScores={averageScores}/>
          </div>

          <FlexDiv style={{ padding: "1.5rem 3%" }}>
            <TestProgress />
          </FlexDiv>

          {showFooter && (
            <FlexDiv style={{ padding: "0rem 3% 0rem", background: "white" }}>
              <Footer />
            </FlexDiv>
          )}
        </ScrollableContainer>
      )}

      {isSmallScreen && ( 
        <>
          <FlexDiv style={{ padding: isLaptopTwo ? "1.5rem 3% 0rem" : "6.5rem 3% 0rem" }}>
            <AiStudyPlan />
          </FlexDiv>

          <LastFourMockTestsAverageScore setIsLoading={setIsLoading} setAverageScores={setAverageScores} />

          <div style={{ padding: "0rem 3% 0rem" }}>
            <AverageScore isLoading={isLoading} averageScores={averageScores}/>
          </div>

          <FlexDiv style={{ padding: "1.5rem 3%" }}>
            <TestProgress />
          </FlexDiv>

          {showFooter && (
            <FlexDiv style={{ padding: "0rem 3% 0rem", background: "white" }}>
              <Footer />
            </FlexDiv>
          )}
        </>
      )}
    </>
  );
};

export default Home;