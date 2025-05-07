import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { FlexDiv } from "../../assets/styles/style";
import {
  ViewScoreHeader,
  Avatar,
  ViewScoreHeaderDiv,
  OverallScoreDisplay,
  OverallScoreText,
  OverallScoreDigit,
  ViewScoreHeaderText,
  ViewScoreTitle,
  ShareBtn,
  ShareBtnDiv,
  ViewScoreSubTitle,
  VSWhiteDiv,
  CircularProgDiv,
  SkillsBreakdownDiv,
  TestTypeText,
  TestTypeDiv,
  ViewScoreHeaderTest,
  CircularDiv,
  SkillsContainer,
  EndText,
  VerticalOverall,
  VerticalOverallDiv,
  VerticalOverallText,
  TestTypesDiv,
  TestImgAndTextDiv,
  Testext,
  TestScoresDiv,
  TestTypeImgs,
} from "./style";

import CircularScoreProgress from "../Writing/CircularScoreProgress";
import { ContentWrapper1, CircularProgText } from "../Writing/style";
import {
  CircularScoreProgressData1,
  CircularScoreProgressData2,
  skillsData,
  EnablingSkillsData, 
  testData,
} from "./data";
import LinearProgress from "./LinearProgress";
import SpeakingSvg from "../../assets/images/speakingsvg.svg";
import WritingSvg from "../../assets/images/writingsvg.svg";
import ReadingSvg from "../../assets/images/readingsvg.svg";
import ListeningSvg from "../../assets/images/listeningsvg.svg";
import ReadAloudSvg from "../../assets/images/readaloudsvg.svg";
import AI_Score from "../../assets/images/aiscoresvg.svg";
import EndTestScoreCard from "./EndTestScoreCard";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingModal from "../Common/LoadingModal";
import AnalyticsForMtScore from "./AnalyticsForMtScore";
import { Base_URL } from "../../Client/apiURL";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMockTestScore, formatDate, getOverallScore, returnScoringFunction, sendTest, splitCategories } from "./helperFunctions";


const ViewScoreForTeacher = () => {
  const { userId, mockTestAttemptedId, typeOfTest } = useParams();
  const isTab = useMediaQuery("(max-width:1000px)");
  const isSTab = useMediaQuery("(max-width: 700px)");
  const circularData1 = CircularScoreProgressData1[0].CircularScoreProgress;
  const circularData2 = CircularScoreProgressData2[0].CircularScoreProgress;
  const [selectedTest, setSelectedTest] = useState("speaking");
  const [mockTestsResult, setMockTestsResult] = useState([]);
  const [listeningTests, setListeningTests] = useState([]);
  const [readingTests, setReadingTests] = useState([]);
  const [writingTests, setWritingTests] = useState([]);
  const [speakingTests, setSpeakingTests] = useState([]);
  const [testCounts, setTestCounts] = useState(null);
  const [speakingScore, setSpeakingScore] = useState(0);
  const [writingsScore, setWritingScore] = useState(0);
  const [readingsScore, setReadingScore] = useState(0);
  const [listeningsScore, setListeningScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mockTestType, setMockTestType] = useState("");

  const url = `${Base_URL}/app/admin/mock-tests/get-score?user_id=${userId}&mock_test_attempted_id=${mockTestAttemptedId}`;
  const withCredentials = false;
  
  useEffect(() => {
    const fetchAndHandleScoreData = async () => {
      const result = await fetchMockTestScore({
        url,
        setIsLoading,
        setMockTestsResult,
        setMockTestType,
        withCredentials,
      });

      if (result.success) {
        // toast.success(result.message);
        splitCategories(
          result.data, 
          setTestCounts, 
          setListeningTests, 
          setReadingTests, 
          setWritingTests, 
          setSpeakingTests,
        );
      } else {
        toast.error(result.message);
      }
    };
    
    fetchAndHandleScoreData();
  }, []);

  const handleTestClick = (type) => {
    if (selectedTest !== type) {
      setSelectedTest(type);
    }
  };

  return (
  mockTestsResult && mockTestsResult[0]?.MockTestName ?
    <>
      <FlexDiv
        style={{
          flexDirection: "column",
          // padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
          padding: isTab ? "0.5rem 1% 2rem" : "2rem 2% 2rem",
        }}
      >
        <ViewScoreHeader>
          <ViewScoreHeaderDiv>
            <Avatar src="" alt="" />
            <div>
              <ViewScoreTitle>
              SCORE REPORT
              </ViewScoreTitle>
              <ViewScoreHeaderTest>{mockTestsResult && mockTestsResult[0]?.MockTestName ? mockTestsResult[0]?.MockTestName :'Loading'}</ViewScoreHeaderTest>
              <ViewScoreHeaderText>{mockTestsResult && mockTestsResult[0]?.MockTestName ? formatDate(mockTestsResult[0]?.AttemptedAt) :'Loading'}</ViewScoreHeaderText>
              <ShareBtnDiv>
                <ShareBtn>Share</ShareBtn>
                {/* <ShareBtn onClick={() => navigate(`/mt-score-full-analytics/${id}`)}>Analytics</ShareBtn> */}
              </ShareBtnDiv>
            </div>
          </ViewScoreHeaderDiv>

          <OverallScoreDisplay>
            <OverallScoreText>Overall Score</OverallScoreText>
            <OverallScoreDigit>{getOverallScore(speakingScore, writingsScore, readingsScore, listeningsScore)}</OverallScoreDigit>
          </OverallScoreDisplay>
        </ViewScoreHeader>
        <VSWhiteDiv>
          <FlexDiv
            style={{
              padding: "1.5rem 1.5rem",
              flexDirection: "column",
              gap: "1.5rem",
              width: "97%",
            }}
          >
            <ViewScoreSubTitle>Communication Skills</ViewScoreSubTitle>
            <CircularProgDiv>
              <CircularDiv>
                {circularData2.map((progress, index) => (
                  <ContentWrapper1 key={index}>
                    <CircularScoreProgress
                      score={progress.key === "Writing"? writingsScore?writingsScore:10 :speakingScore?speakingScore:10}
                      totalScore={90}
                      progressColorFilled={progress.progressColorFilled}
                      progressColorUnfilled={progress.progressColorUnfilled}
                      scoreColor={progress.scoreColor}
                      circleSize={100}
                      fontSize={"1.5rem"}
                    />
                    <CircularProgText>{progress.Title}</CircularProgText>
                  </ContentWrapper1>
                ))}
              </CircularDiv>
              <CircularDiv>
              {circularData1.map((progress, index) => (
                  <ContentWrapper1 key={index}>
                    <CircularScoreProgress
                      score={progress.key === "Reading"? readingsScore?readingsScore:10 : listeningsScore?listeningsScore:10}
                      totalScore={90}
                      progressColorFilled={progress.progressColorFilled}
                      progressColorUnfilled={progress.progressColorUnfilled}
                      scoreColor={progress.scoreColor}
                      circleSize={100}
                      fontSize={"1.5rem"}
                    />
                    <CircularProgText>{progress.Title}</CircularProgText>
                  </ContentWrapper1>
                ))}
              </CircularDiv>
            </CircularProgDiv>
            <ViewScoreSubTitle>Skills Breakdown</ViewScoreSubTitle>
            <SkillsBreakdownDiv>
              {skillsData.map((skill) => (
                <SkillsContainer key={skill.title}>
                  <TestTypeDiv>
                    <TestTypeText>{skill.title}</TestTypeText>
                    <TestTypeText>{returnScoringFunction(skill.title, listeningsScore, readingsScore, writingsScore, speakingScore)}</TestTypeText>
                  </TestTypeDiv>
                  <LinearProgress
                    progressColor={skill.progressColor}
                    score={returnScoringFunction(skill.title, listeningsScore, readingsScore, writingsScore, speakingScore) + 10}
                  />
                </SkillsContainer>
              ))}

              {/* <ViewScoreSubTitle
                style={{ marginLeft: "1.88rem", padding: "1.5rem 0rem 0rem" }}
              >
                Enabling Skills
              </ViewScoreSubTitle>

              <VerticalOverallDiv>
                <VerticalOverallText>44 Overall</VerticalOverallText>
                <VerticalOverall />
              </VerticalOverallDiv> 

              {EnablingSkillsData.map((skill) => (
                <SkillsContainer key={skill.title}>
                  <TestTypeDiv>
                    <TestTypeText>{skill.title}</TestTypeText>
                    <TestTypeText>{getEnableSkillsScore(skill.skill)}</TestTypeText>
                  </TestTypeDiv>                  
                  <LinearProgress
                    progressColor={skill.progressColor}
                    score={getEnableSkillsScore(skill.skill)}
                  />
                </SkillsContainer>
              ))} */}

              <EndText>
                This scorecard has been generated solely on the basis of your
                performance in the above-mentioned mock test provided
                by SwiftUni. Please note that this score report cannot be used
                for applying to any university or for migration purposes.
              </EndText>
            </SkillsBreakdownDiv>

            <div style={{ width: "100%" }}>
              <TestTypesDiv>
                {["speaking", "writing", "reading", "listening"].map(
                  (test, index) => (
                    <TestImgAndTextDiv
                      key={index}
                      borderColor={
                        {
                          speaking: "#49D7F2",
                          writing: "#FF5D5D",
                          reading: "#AD826E",
                          listening: "#868EAF",
                        }[test]
                      }
                      isSelected={selectedTest === test}
                      onClick={() => handleTestClick(test)}
                      ZJIDFO
                    >
                      <TestTypeImgs
                        src={
                          {
                            speaking: SpeakingSvg,
                            writing: WritingSvg,
                            reading: ReadingSvg,
                            listening: ListeningSvg,
                          }[test]
                        }
                        alt={test.toUpperCase()}
                      />
                      {(!isSTab || selectedTest === test) && (
                        <Testext
                          textColor={
                            {
                              speaking: "#49D7F2",
                              writing: "#FF5D5D",
                              reading: "#AD826E",
                              listening: "#868EAF",
                            }[test]
                          }
                        >
                          {test.toUpperCase()}
                        </Testext>
                      )}
                    </TestImgAndTextDiv>
                  )
                )}
              </TestTypesDiv> 

              <TestScoresDiv>
                {selectedTest &&
                  testData[selectedTest].map((data, index) => (
                    <EndTestScoreCard key={index} data={data} tests={sendTest(selectedTest, listeningTests, readingTests, writingTests, speakingTests)} type={selectedTest}/>
                  ))}
              </TestScoresDiv>
            </div>
          </FlexDiv>
        </VSWhiteDiv>
      </FlexDiv>
      <AnalyticsForMtScore counts={testCounts} speakingTotScore={setSpeakingScore} writingTotScore={setWritingScore} readingTotScore={setReadingScore} listeningTotScore={setListeningScore} seen={false}/>
    </>
    :
    <>
    <FlexDiv style={{height:'100vh'}}>
      {isLoading ? ( <LoadingModal />) : (              
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#999",
            padding: "20px",
            fontWeight: "500",
          }}
        >
          Mock Test Score Not Found in Record.
        </div>)} 
    </FlexDiv>    
    </>
  );
};

export default ViewScoreForTeacher;
