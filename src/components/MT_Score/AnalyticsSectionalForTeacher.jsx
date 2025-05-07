import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { FlexDiv } from "../../assets/styles/style";
import {
  AnalyticsHeader,
  FeedbackHeaderTitle,
  WhiteDiv,
  CircleDiv,
  CircleScoresDiv,
  PointImg,
  ScoreDigit,
  PointAndScore,
  ImgAndLine,
} from "./style";
import ReadingImg from "../../assets/todaytaskcard/todaytaskimg1.svg";
import ListeningImg from "../../assets/todaytaskcard/todaytaskimg2.svg";
import WritingImg from "../../assets/todaytaskcard/todaytaskimg3.svg";
import SpeakingImg from "../../assets/todaytaskcard/todaytaskimg4.svg";
import DividerLine from "../../assets/images/dividersvg.svg";
import ReadingPoint from "../../assets/images/readingpoint.svg";
import WritingPoint from "../../assets/images/writingpoint.svg";
import ListeningPoint from "../../assets/images/listeningpoint.svg";
import SpeakingPoint from "../../assets/images/speakingpoint.svg";
import AnalyticsTestCard from "./AnalyticsTestCard";
import AnalyticsCircle from "./AnalyticsCircle";
import AnalyticsForMtScore from "./AnalyticsForMtScore";
import AnalyticsTestCard2 from "./AnalyticsTestCard2";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingModal from "../Common/LoadingModal";
import { PieChart } from "react-minimal-pie-chart";
import { Base_URL } from "../../Client/apiURL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AnalyticsForMtScoreSectional from "./AnalyticsForMtScoreSectional";
import { fetchMockTestScore, filterQuestionNames, getCountsByCategory, getListeningTimeTaken, getReadingTimeTaken, getSpeakingTimeTaken, getTotalListeningTimeTaken, getTotalReadingTimeTaken, getTotalSpeakingTimeTaken, getTotalTimeTaken, getTotalWritingTimeTaken, getWritingTimeTaken, splitCategories } from "./helperFunctions";
import { ListeningQuestionNames, ReadingQuestionNames, SpeakingQuestionNames, WritingQuestionNames } from "./data";


const AnalyticsSectionalForTeacher = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { userId, mockTestAttemptedId, typeOfTest } = useParams();
  const [mockTestsResult, setMockTestsResult] = useState([]);
  const [testCounts, setTestCounts] = useState(null);

  const [testCountsNew, setTestCountsNew] = useState({
    speaking: { attempted: 0, total: 0 },
    writing: { attempted: 0, total: 0 },
    reading: { attempted: 0, total: 0 },
    listening: { attempted: 0, total: 0 },
  });
  const globalTotal = Object.values(testCountsNew).reduce((acc, cat) => acc + cat.total, 0);
  const globalAttempted = Object.values(testCountsNew).reduce((acc, cat) => acc + cat.attempted, 0);
  // const pieData = [
  //   { title: "Speaking",   value: testCountsNew.speaking.total,   color: "#49D7F2" },
  //   { title: "Writing",    value: testCountsNew.writing.total,    color: "#FF5D5D" },
  //   { title: "Reading",    value: testCountsNew.reading.total,    color: "#AD826E" },
  //   { title: "Listening",  value: testCountsNew.listening.total,  color: "#868EAF" },
  // ].filter((entry) => entry.value > 0);
  const pieData = [
    { title: "Speaking",   value: testCountsNew.speaking.attempted,   color: "#49D7F2" },
    { title: "Writing",    value: testCountsNew.writing.attempted,    color: "#FF5D5D" },
    { title: "Reading",    value: testCountsNew.reading.attempted,    color: "#AD826E" },
    { title: "Listening",  value: testCountsNew.listening.attempted,  color: "#868EAF" },
  ].filter((entry) => entry.value > 0);
  const [speakingScore, setSpeakingScore] = useState(0);
  const [writingsScore, setWritingScore] = useState(0);
  const [readingsScore, setReadingScore] = useState(0);
  const [listeningsScore, setListeningScore] = useState(0);
  const [testTimings, setTestTimings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mockTestType, setMockTestType] = useState("");
  const [filteredSpeakingQuestions, setFilteredSpeakingQuestions] = useState([]);
  const [filteredWritingQuestions, setFilteredWritingQuestions] = useState([]);
  const [filteredReadingQuestions, setFilteredReadingQuestions] = useState([]);
  const [filteredListeningQuestions, setFilteredListeningQuestions] = useState([]);

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
        setTestCountsNew(getCountsByCategory(result.data));
        splitCategories(
          result.data, 
          setTestCounts,
          setTestTimings,
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

  useEffect(() => {
    if (mockTestsResult) {
      setFilteredSpeakingQuestions(filterQuestionNames(SpeakingQuestionNames, mockTestsResult));
      setFilteredWritingQuestions(filterQuestionNames(WritingQuestionNames, mockTestsResult));
      setFilteredReadingQuestions(filterQuestionNames(ReadingQuestionNames, mockTestsResult));
      setFilteredListeningQuestions(filterQuestionNames(ListeningQuestionNames, mockTestsResult));
    }
  }, [mockTestsResult]);
  
  return mockTestsResult && mockTestsResult[0]?.MockTestName &&
   (filteredSpeakingQuestions || filteredWritingQuestions || filteredReadingQuestions || filteredListeningQuestions) ? (
    <>
      <FlexDiv
        style={{
          flexDirection: "column",
          // padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
          padding: isTab ? "0.5rem 1% 2rem" : "2rem 2% 2rem",
        }}
      >
        <AnalyticsHeader  style={{ backgroundColor: headerBackgroundColor }}>
          <FeedbackHeaderTitle>
            ANALYTICS: <span>{mockTestsResult[0]?.MockTestName}</span>
          </FeedbackHeaderTitle>
        </AnalyticsHeader>
        <WhiteDiv>
          <FlexDiv
            style={{
              padding: "2.5rem 0rem 0rem ",
              width: "96%",
              flexDirection: isTab ? "column" : "row",
              gap: "1.52rem",
            }}
          >
            <FlexDiv
              style={{
                justifyContent: isTab ? "center" : "flex-end",
                width: "50%",
              }}
            >
              <CircleDiv>
                <PieChart
                  label={({ dataEntry }) => {
                    const percent = globalTotal
                      ? ((dataEntry.value / globalTotal) * 100).toFixed(1)
                      : 0;
                    return `${percent}% ${dataEntry.title}`;
                  }}
                  labelStyle={{
                    fill: "white",
                    fontSize: "5px",
                    fontFamily: "Helvetica Neue, sans-serif",
                    textShadow: "1px 1px 4px #000000AA",
                    pointerEvents: "none",
                  }}
                  labelPosition={60}
                  lineWidth={60}
                  radius={50}
                  data={pieData}
                />

                <ImgAndLine>
                  <img
                    src={DividerLine}
                    alt=""
                    style={{ width: isMobile ? "" : "100%" }}
                  />

                  <CircleScoresDiv style={{ justifyContent: "center" }}>
                    {mockTestType === "Speaking" && (
                      <PointAndScore>
                        <PointImg src={SpeakingPoint} alt="" />
                        <ScoreDigit color={"#49D7F2"}>
                        {globalAttempted || 0} Questions Attempted
                        </ScoreDigit>
                      </PointAndScore>
                    )}
                    {mockTestType === "Writing" && (
                      <PointAndScore>
                        <PointImg src={WritingPoint} alt="" />
                        <ScoreDigit color={"#FF5D5D"}>
                        {globalAttempted || 0} Questions Attempted
                        </ScoreDigit>
                      </PointAndScore>
                    )}
                    {mockTestType === "Reading" && (
                      <PointAndScore>
                        <PointImg src={ReadingPoint} alt="" />
                        <ScoreDigit color={"#AD826E"}>
                        {globalAttempted || 0} Questions Attempted
                        </ScoreDigit>
                      </PointAndScore>
                    )}
                    {mockTestType === "Listening" && (
                      <PointAndScore>
                        <PointImg src={ListeningPoint} alt="" />
                        <ScoreDigit color={"#868EAF"}>
                        {globalAttempted || 0} Questions Attempted
                        </ScoreDigit>
                      </PointAndScore>
                    )}
                  </CircleScoresDiv>

                </ImgAndLine>
              </CircleDiv>
            </FlexDiv>
            <FlexDiv
              style={{ flexDirection: "column", gap: "1.25rem", width: "50%" }}
            >
              <FlexDiv
                style={{
                  flexDirection: isMobile ? "column" : "row",
                  gap: "1.25rem",
                  width: "100%",
                  justifyContent: isTab ? "center" : "flex-start",
                }}
              >
                {mockTestType === "Speaking" && (
                  <AnalyticsTestCard
                    headerName="Speaking"
                    imgSrc={SpeakingImg}
                    color="#49D7F2"
                    score={speakingScore || 0}
                    questions={`${globalAttempted || 0}/${globalTotal || 0}`}
                  />
                )}
                {mockTestType === "Writing" && (
                  <AnalyticsTestCard
                    headerName="Writing"
                    imgSrc={WritingImg}
                    color="#FF5D5D"
                    score={writingsScore || 0}
                    questions={`${globalAttempted || 0}/${globalTotal || 0}`}
                  />
                )}
                {mockTestType === "Reading" && (
                  <AnalyticsTestCard
                    headerName="Reading"
                    imgSrc={ReadingImg}
                    color="#AD826E"
                    score={readingsScore || 0}
                    questions={`${globalAttempted || 0}/${globalTotal || 0}`}
                  />
                )}
                {mockTestType === "Listening" && (
                  <AnalyticsTestCard
                    headerName="Listening"
                    imgSrc={ListeningImg}
                    color="#868EAF"
                    score={listeningsScore || 0}
                    questions={`${globalAttempted || 0}/${globalTotal || 0}`}
                  />
                )}
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <FlexDiv style={{ width: isMobile ? "95%" : "100%" }}>
            <AnalyticsForMtScoreSectional
              counts={testCounts}
              mockTestType={mockTestType}
              speakingTotScore={setSpeakingScore}
              writingTotScore={setWritingScore}
              readingTotScore={setReadingScore}
              listeningTotScore={setListeningScore}
            />
          </FlexDiv>
        </WhiteDiv>
      </FlexDiv>
      <FlexDiv
        style={{
          flexDirection: "column",
          padding: isTab ? "0rem 1% 2rem" : "0rem 2% 2rem",
        }}
      >
        <AnalyticsHeader  style={{ backgroundColor: headerBackgroundColor }}>
          <FeedbackHeaderTitle>
            TIME TAKEN: <span>{getTotalTimeTaken(filteredSpeakingQuestions, filteredWritingQuestions, filteredReadingQuestions, filteredListeningQuestions)}</span>{" "}
          </FeedbackHeaderTitle>
        </AnalyticsHeader>
        <WhiteDiv>
          <FlexDiv
            style={{
              flexDirection: "column",
              gap: "1.25rem",
              width: "92%",
              padding: "2.5rem 0rem",
             
            }}
          >
            {mockTestType === "Speaking" && (
              <>
                <FlexDiv
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: "1.25rem",
                    width: "100%",
                    alignItems: "flex-start",
                  
                  }}
                >
                  <AnalyticsTestCard2
                    headerName="Speaking"
                    imgSrc={SpeakingImg}
                    color="#49D7F2"
                    QuestionsTotalTime={getTotalSpeakingTimeTaken(filteredSpeakingQuestions)}
                    QuestionNames={filteredSpeakingQuestions}
                    QuestionTimes={getSpeakingTimeTaken(filteredSpeakingQuestions)}
                  />
                </FlexDiv>
              </>
            )}

            {mockTestType === "Writing" && (
              <>
                <FlexDiv
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: "1.25rem",
                    width: "100%",
                    alignItems: "flex-start",
                    justifyContent: "left",
                  }}
                >
                  <AnalyticsTestCard2
                    headerName="Writing"
                    imgSrc={WritingImg}
                    color="#FF5D5D"
                    QuestionsTotalTime={getTotalWritingTimeTaken(filteredWritingQuestions)}
                    QuestionNames={filteredWritingQuestions}
                    QuestionTimes={getWritingTimeTaken(filteredWritingQuestions)}
                  />

                  <AnalyticsTestCard2
                    headerName="Reading"
                    imgSrc={ReadingImg}
                    color="#AD826E"
                    QuestionsTotalTime={getTotalReadingTimeTaken(filteredReadingQuestions)}
                    QuestionNames={filteredReadingQuestions}
                    QuestionTimes={getReadingTimeTaken(filteredReadingQuestions)}
                  />

                </FlexDiv>

                <FlexDiv
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: "1.25rem",
                    width: "100%",
                    alignItems: "flex-start",
                    justifyContent: "left",
                  }}
                >
                  <AnalyticsTestCard2
                    headerName="Listening"
                    imgSrc={ListeningImg}
                    color="#868EAF"
                    QuestionsTotalTime={getTotalListeningTimeTaken(filteredListeningQuestions)}
                    QuestionNames={filteredListeningQuestions.map(question => question.replace("Listening: ", ""))}
                    QuestionTimes={getListeningTimeTaken(filteredListeningQuestions)}
                  />
                </FlexDiv>
              </>
            )}

            {mockTestType === "Reading" && (
              <>
                <FlexDiv
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: "1.25rem",
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <AnalyticsTestCard2
                    headerName="Reading"
                    imgSrc={ReadingImg}
                    color="#AD826E"
                    QuestionsTotalTime={getTotalReadingTimeTaken(filteredReadingQuestions)}
                    QuestionNames={filteredReadingQuestions}
                    QuestionTimes={getReadingTimeTaken(filteredReadingQuestions)}
                  />
                  <AnalyticsTestCard2
                    headerName="Writing"
                    imgSrc={WritingImg}
                    color="#FF5D5D"
                    QuestionsTotalTime={getTotalWritingTimeTaken(filteredWritingQuestions)}
                    QuestionNames={filteredWritingQuestions}
                    QuestionTimes={getWritingTimeTaken(filteredWritingQuestions)}
                  />
                </FlexDiv>

                <FlexDiv
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: "1.25rem",
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                <AnalyticsTestCard2
                    headerName="Speaking"
                    imgSrc={SpeakingImg}
                    color="#49D7F2"
                    QuestionsTotalTime={getTotalSpeakingTimeTaken(filteredSpeakingQuestions)}
                    QuestionNames={filteredSpeakingQuestions}
                    QuestionTimes={getSpeakingTimeTaken(filteredSpeakingQuestions)}
                  />
                  <AnalyticsTestCard2
                    headerName="Listening"
                    imgSrc={ListeningImg}
                    color="#868EAF"
                    QuestionsTotalTime={getTotalListeningTimeTaken(filteredListeningQuestions)}
                    QuestionNames={filteredListeningQuestions.map(question => question.replace("Listening: ", ""))}
                    QuestionTimes={getListeningTimeTaken(filteredListeningQuestions)}
                  />
                </FlexDiv>
              </>
            )}

            {mockTestType === "Listening" && (
              <>
                <FlexDiv
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    gap: "1.25rem",
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                <AnalyticsTestCard2
                    headerName="Listening"
                    imgSrc={ListeningImg}
                    color="#868EAF"
                    QuestionsTotalTime={getTotalListeningTimeTaken(filteredListeningQuestions)}
                    QuestionNames={filteredListeningQuestions.map(question => question.replace("Listening: ", ""))}
                    QuestionTimes={getListeningTimeTaken(filteredListeningQuestions)}
                  />
                  <AnalyticsTestCard2
                    headerName="Speaking"
                    imgSrc={SpeakingImg}
                    color="#49D7F2"
                    QuestionsTotalTime={getTotalSpeakingTimeTaken(filteredSpeakingQuestions)}
                    QuestionNames={filteredSpeakingQuestions}
                    QuestionTimes={getSpeakingTimeTaken(filteredSpeakingQuestions)}
                  />
                </FlexDiv>
              </>
            )}
          </FlexDiv>
        </WhiteDiv>
      </FlexDiv>
    </>
  ) : (
    <FlexDiv style={{ height: "100vh" }}>
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
  );
};

export default AnalyticsSectionalForTeacher;
