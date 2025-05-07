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
import { fetchMockTestScore, formatDate, returnScoringFunction, sendTest, splitCategories } from "./helperFunctions";


const ViewScoreSectionalForTeacher = () => {
  const { userId, mockTestAttemptedId, typeOfTest } = useParams();
  const isTab = useMediaQuery("(max-width:1000px)");
  const isSTab = useMediaQuery("(max-width: 700px)");
  const circularData1 = CircularScoreProgressData1[0].CircularScoreProgress;
  const circularData2 = CircularScoreProgressData2[0].CircularScoreProgress;
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
  const [selectedTest, setSelectedTest] = useState(mockTestType.toLowerCase());

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
        splitCategories(
          result.data, 
          setTestCounts,
          setListeningTests, 
          setReadingTests, 
          setWritingTests, 
          setSpeakingTests 
        );
      } else {
        toast.error(result.message);
      }
    };

    fetchAndHandleScoreData();
  }, []);

  const testTypeColors = {
    speaking: "#49D7F2",
    writing: "#FF5D5D",
    reading: "#AD826E",
    listening: "#868EAF",
  };
  const headerBackgroundColor = typeOfTest ? testTypeColors[typeOfTest.toLowerCase()] || "#996cfe" : "#996cfe";
  
  const handleTestClick = (type) => {
    if (selectedTest !== type) {
      setSelectedTest(type);
    }
  };

  useEffect(() => {
    if (mockTestType) {
      setSelectedTest(mockTestType.toLowerCase());
    }
  }, [mockTestType]);

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
        <ViewScoreHeader style={{ backgroundColor: headerBackgroundColor }}>
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
                {/* <ShareBtn onClick={() => navigate(`/mt-score-sectional-analytics/${id}`)}>Analytics</ShareBtn> */}
              </ShareBtnDiv>
            </div>
          </ViewScoreHeaderDiv>
        {/* 
          <OverallScoreDisplay style={{maxHeight: '7.5rem'}}>
            <OverallScoreText style={{fontSize: '1.2rem'}}>{typeOfTest}</OverallScoreText>

            {mockTestType === "Reading" && (
              <OverallScoreDigit style={{ color: headerBackgroundColor }}>{readingsScore || 10}</OverallScoreDigit>
            )}

            {mockTestType === "Listening" && (
              <OverallScoreDigit style={{ color: headerBackgroundColor }}>{listeningsScore || 10}</OverallScoreDigit>
            )}

            {mockTestType === "Writing" && (
              <OverallScoreDigit style={{ color: headerBackgroundColor }}>{writingsScore || 10}</OverallScoreDigit>
            )}

            {mockTestType === "Speaking" && (
              <OverallScoreDigit style={{ color: headerBackgroundColor }}>{speakingScore || 10}</OverallScoreDigit>
            )}
          </OverallScoreDisplay> */}
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
            {mockTestType === "Speaking" && (
                <CircularDiv>
                {circularData2
                    .filter((progress) => progress.key === "Speaking") // Filter data for "Speaking"
                    .map((progress, index) => (
                    <ContentWrapper1 key={index}>
                        <CircularScoreProgress
                        score={speakingScore || 10}
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
            )}

            {mockTestType === "Writing" && (
                <CircularDiv>
                {circularData2
                    .filter((progress) => progress.key === "Writing") // Filter data for "Writing"
                    .map((progress, index) => (
                    <ContentWrapper1 key={index}>
                        <CircularScoreProgress
                        score={writingsScore || 10}
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
            )}

            {mockTestType === "Reading" && (
                <CircularDiv>
                {circularData1
                    .filter((progress) => progress.key === "Reading") // Filter data for "Reading"
                    .map((progress, index) => (
                    <ContentWrapper1 key={index}>
                        <CircularScoreProgress
                        score={readingsScore || 10}
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
            )}

            {mockTestType === "Listening" && (
                <CircularDiv>
                {circularData1
                    .filter((progress) => progress.key === "Listening") // Filter data for "Listening"
                    .map((progress, index) => (
                    <ContentWrapper1 key={index}>
                        <CircularScoreProgress
                        score={listeningsScore || 10}
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
            )}
            </CircularProgDiv>
            <ViewScoreSubTitle>Skills Breakdown</ViewScoreSubTitle>
            <SkillsBreakdownDiv>
              {/* {skillsData.map((skill) => (
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
              ))} */}

            {skillsData
            .filter((skill) => skill.title === mockTestType) 
            .map((skill) => (
                <SkillsContainer key={skill.title}>
                <TestTypeDiv>
                    <TestTypeText>{skill.title}</TestTypeText>
                    <TestTypeText>{returnScoringFunction(skill.title, listeningsScore, readingsScore, writingsScore, speakingScore)}</TestTypeText>
                </TestTypeDiv>
                <LinearProgress
                    progressColor={headerBackgroundColor}
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
                {mockTestType === "Speaking" && (<>
                  {[ "speaking" ].map(
                    (test, index) => (
                      <TestImgAndTextDiv
                        style={{ width: '100%'}}
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
                </>)}

                {mockTestType === "Writing" && (<>
                  {["writing", "reading", "listening"].map(
                    (test, index) => (
                      <TestImgAndTextDiv
                      style={{ width: '33%'}}
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
                </>)}

                {mockTestType === "Reading" && (<>
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
                </>)}

                {mockTestType === "Listening" && (<>
                  {[ "listening", "speaking" ].map(
                    (test, index) => (
                      <TestImgAndTextDiv
                        style={{ width: '50%'}}
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
                </>)}
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

export default ViewScoreSectionalForTeacher;
