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
// import AnalyticsCircle from "./AnalyticsCircle";
import AnalyticsForMtScore from "./AnalyticsForMtScore";
import AnalyticsTestCard2 from "./AnalyticsTestCard2";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingModal from "../Common/LoadingModal";
import { PieChart } from "react-minimal-pie-chart";
import { Base_URL } from "../../Client/apiURL";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { fetchMockTestScore, filterQuestionNames, getCountsByCategory, getListeningTimeTaken, getReadingTimeTaken, getSpeakingTimeTaken, getTotalListeningTimeTaken, getTotalReadingTimeTaken, getTotalSpeakingTimeTaken, getTotalTimeTaken, getTotalWritingTimeTaken, getWritingTimeTaken, splitCategories } from "./helperFunctions";
import { ListeningQuestionNames, ReadingQuestionNames, SpeakingQuestionNames, WritingQuestionNames } from "./data";


const Analytics = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();
  const [mockTestsResult, setMockTestsResult] = useState(null);
  const [testCounts, setTestCounts] = useState(null);
  const [testCountsNew, setTestCountsNew] = useState({
    speaking: { attempted: 0, total: 0 },
    writing: { attempted: 0, total: 0 },
    reading: { attempted: 0, total: 0 },
    listening: { attempted: 0, total: 0 },
  });
  const globalTotal = Object.values(testCountsNew).reduce((acc, cat) => acc + cat.total, 0);
  const globalAttempted = Object.values(testCountsNew).reduce((acc, cat) => acc + cat.attempted, 0);
  const [speakingScore, setSpeakingScore] = useState(0);
  const [writingsScore, setWritingScore] = useState(0);
  const [readingsScore, setReadingScore] = useState(0);
  const [listeningsScore, setListeningScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mockTestType, setMockTestType] = useState("");
  const [filteredSpeakingQuestions, setFilteredSpeakingQuestions] = useState([]);
  const [filteredWritingQuestions, setFilteredWritingQuestions] = useState([]);
  const [filteredReadingQuestions, setFilteredReadingQuestions] = useState([]);
  const [filteredListeningQuestions, setFilteredListeningQuestions] = useState([]);

  const url = `${Base_URL}/app/users/mock-test-attempts/get-score?mock_test_attempted_id=${id}`;
  const withCredentials = true;

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
        );
      } else {
        navigate("/mt-score");
        toast.error(result.message);
      }
    };

    fetchAndHandleScoreData();
  }, []);

  useEffect(() => {
    if (mockTestsResult) {
      setFilteredSpeakingQuestions(filterQuestionNames(SpeakingQuestionNames, mockTestsResult));
      setFilteredWritingQuestions(filterQuestionNames(WritingQuestionNames, mockTestsResult));
      setFilteredReadingQuestions(filterQuestionNames(ReadingQuestionNames, mockTestsResult));
      setFilteredListeningQuestions(filterQuestionNames(ListeningQuestionNames, mockTestsResult));
    }
  }, [mockTestsResult]);
  
  return mockTestsResult && mockTestsResult[0]?.MockTestName &&
   filteredSpeakingQuestions && filteredWritingQuestions && filteredReadingQuestions && filteredListeningQuestions ? (
    <>
      <FlexDiv
        style={{
          flexDirection: "column",
          padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
        }}
      >
        <AnalyticsHeader>
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
                {/* <AnalyticsCircle /> */}
                <PieChart
                  label={({ dataEntry }) => dataEntry.title}
                  labelStyle={{
                    fill: "white",
                    fontSize: "6px",
                    fontFamily: "Helvetica Neue,sans-serif",
                    textShadow: "1px 1px 5px #000",
                  }}
                  labelPosition={65}
                  lineWidth={58}
                  data={[
                    {
                      title: "Reading",
                      value: readingsScore ? readingsScore : 0,
                      color: "#AD826E",
                    },
                    {
                      title: "Listening",
                      value: listeningsScore ? listeningsScore : 0,
                      color: "#868EAF",
                    },
                    {
                      title: "Speaking",
                      value: speakingScore ? speakingScore : 0,
                      color: "#49D7F2",
                    },
                    {
                      title: "Writing",
                      value: writingsScore ? writingsScore : 0,
                      color: "#FF5D5D",
                    },
                  ]}
                />
                <ImgAndLine>
                  <img
                    src={DividerLine}
                    alt=""
                    style={{ width: isMobile ? "" : "100%" }}
                  />
                  <CircleScoresDiv>
                    <PointAndScore>
                      <PointImg src={SpeakingPoint} alt="" />
                      <ScoreDigit color={"#49D7F2"}>
                        {speakingScore ? speakingScore : 0}
                      </ScoreDigit>
                    </PointAndScore>
                    <PointAndScore>
                      <PointImg src={WritingPoint} alt="" />
                      <ScoreDigit color={"#FF5D5D"}>
                        {writingsScore ? writingsScore : 0}
                      </ScoreDigit>
                    </PointAndScore>
                    <PointAndScore>
                      <PointImg src={ReadingPoint} alt="" />
                      <ScoreDigit color={"#AD826E"}>
                        {readingsScore ? readingsScore : 0}
                      </ScoreDigit>
                    </PointAndScore>
                    <PointAndScore>
                      <PointImg src={ListeningPoint} alt="" />
                      <ScoreDigit color={"#868EAF"}>
                        {listeningsScore ? listeningsScore : 0}
                      </ScoreDigit>
                    </PointAndScore>
                  </CircleScoresDiv>
                </ImgAndLine>
              </CircleDiv>
            </FlexDiv>
            <FlexDiv
              style={{ flexDirection: "column", gap: "1.25rem", width: "95%" }}
            >
              <FlexDiv
                style={{
                  flexDirection: isMobile ? "column" : "row",
                  gap: "1.25rem",
                  width: "100%",
                  justifyContent: isTab ? "center" : "flex-start",
                }}
              >
                <AnalyticsTestCard
                  headerName="Speaking"
                  imgSrc={SpeakingImg}
                  color="#49D7F2"
                  score={speakingScore ? speakingScore : 0}
                  // questions={`${speakingTests.length}/${speakingTests.length}`}
                  questions={`${testCountsNew?.speaking.attempted || 0}/${testCountsNew?.speaking.total || 0}`}
                />
                <AnalyticsTestCard
                  headerName="Writing"
                  imgSrc={WritingImg}
                  color="#FF5D5D"
                  score={writingsScore ? writingsScore : 0}
                  // questions={`${writingTests.length}/${writingTests.length}`}
                  questions={`${testCountsNew?.writing.attempted || 0}/${testCountsNew?.writing.total || 0}`}
                />
              </FlexDiv>

              <FlexDiv
                style={{
                  flexDirection: isMobile ? "column" : "row",
                  gap: "1.25rem",
                  width: "100%",
                  justifyContent: isTab ? "center" : "flex-start",
                }}
              >
                <AnalyticsTestCard
                  headerName="Reading"
                  imgSrc={ReadingImg}
                  color="#AD826E"
                  score={readingsScore ? readingsScore : 0}
                  // questions={`${readingTests.length}/${readingTests.length}`}
                  questions={`${testCountsNew?.reading.attempted || 0}/${testCountsNew?.reading.total || 0}`}
                />
                <AnalyticsTestCard
                  headerName="Listening"
                  imgSrc={ListeningImg}
                  color="#868EAF"
                  score={listeningsScore ? listeningsScore : 0}
                  // questions={`${listeningTests.length}/${listeningTests.length}`}
                  questions={`${testCountsNew?.listening.attempted || 0}/${testCountsNew?.listening.total || 0}`}
                />
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <FlexDiv style={{ width: isMobile ? "95%" : "100%" }}>
            <AnalyticsForMtScore
              counts={testCounts}
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
          padding: isTab ? "0rem 2% 2rem" : "0rem 3% 2rem",
        }}
      >
        <AnalyticsHeader>
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
                headerName="Reading"
                imgSrc={ReadingImg}
                color="#AD826E"
                QuestionsTotalTime={getTotalReadingTimeTaken(filteredReadingQuestions)}
                QuestionNames={filteredReadingQuestions}
                QuestionTimes={getReadingTimeTaken(filteredReadingQuestions)}
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
          </FlexDiv>
        </WhiteDiv>
      </FlexDiv>
    </>
  ) : (
    <FlexDiv style={{ height: "100vh" }}>
      <LoadingModal />
    </FlexDiv>
  );
};

export default Analytics;
