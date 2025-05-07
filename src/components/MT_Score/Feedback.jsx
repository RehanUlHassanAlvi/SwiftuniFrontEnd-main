import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { FlexDiv } from "../../assets/styles/style";
import {
  FeedbackHeader,
  FeedbackHeaderText,
  FeedbackHeaderTitle,
} from "./style";
import FeedbackCard from "./FeedbackCard";
import SetTargetPopup from "../Home/SetTargetPopup";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import getFeedback from "../ScoreFeedback/getFeedback";
import LoadingModal from "../Common/LoadingModal";
import { Base_URL } from "../../Client/apiURL";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { fetchMockTestScore, splitCategories } from "./helperFunctions";
import { useMockTestScore } from "../../context/MockTestScoreContext";

const modalStyle = {
  overlay: {
    zIndex: 1002,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: 'blur(5px)',
    background: "none",
  },
  content: {
    border: "none",
    background: "transparent",
    inset: "0px",
    padding: "20px 1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Feedback = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [mockTestsResult, setMockTestsResult] = useState([]);
  const [testCounts, setTestCounts] = useState(null);
  const isFirstRender = useRef(true);
  const [targetRange, setTargetRange] = useState("");
  const [scores, setScores] = useState({
    overall: null,
    listening: null,
    reading: null,
    writing: null,
    speaking: null,
  });
  const [feedback, setFeedback] = useState({
    overall: "",
    reading: "",
    writing: "",
    listening: "",
    speaking: "",
  });

    const [isLoading, setIsLoading] = useState(false);
    const [mockTestType, setMockTestType] = useState("");

    const {
      categoryScores,
      setCategoryScores,

      giveScores,
  
      getTotSpeakingScore,
      getTotReadingScore,
      getTotListeningScore,
      getTotWritingScore,
  
 } = useMockTestScore();

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
    getTargetRange();
  }, []);

  const getTargetRange = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${Base_URL}/app/users/get-examdate`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok && data.response) {
        const examTarget = JSON.parse(data.response.ExamTarget);

        if (examTarget && examTarget.examTargetRange) {
          let formattedRange = examTarget.examTargetRange.trim();

          if (formattedRange === "79+") {
            formattedRange = "79-90";
          } else {
            formattedRange = formattedRange.replace(/\s*-\s*/g, "-");
          }
          setTargetRange(formattedRange);
          const startValue = parseInt(formattedRange.split("-")[0]);
          setStartValue(startValue);
          setOpen(false);
        } else {
          setOpen(true);
        }
      } else {
        console.error("Failed to fetch target range: No data available.");
        setOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch exam date:", error);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSetTarget = (start, end) => {
    setTargetRange(`${start}-${end}`);
    setStartValue(start);
    setEndValue(end);
    setOpen(false);
  };

  useEffect(() => {
    if (!open && !isFirstRender.current) {
      setLoading(true);
      setTimeout(() => {
        updateScores(testCounts);
        setLoading(false);
      }, 2000);
    }
    isFirstRender.current = false;
  }, [open, mockTestsResult, targetRange, testCounts]);

  const updateScores = (testCounts) => {
    giveScores(testCounts);
    calculateTotalScores();
  };

  const calculateTotalScores = () => {
    const speakingScore = getTotSpeakingScore();
    const writingScore = getTotWritingScore();
    const readingScore = getTotReadingScore();
    const listeningScore = getTotListeningScore();

    let overall = (speakingScore + writingScore + readingScore + listeningScore) / 4;

    if (overall > 12) {
      overall -= overall > 40 ? 2 : 1;
    }

    setScores({
      overall: overall > 10 ? parseInt(overall) : 10,
      speaking: speakingScore,
      writing: writingScore,
      reading: readingScore,
      listening: listeningScore,
    });
  };

  useEffect(() => {
    if (scores.overall != null) {
      setFeedback({
        overall: getFeedback(
          "overall",
          scores.overall,
          scores.overall,
          targetRange
        ),
        reading: getFeedback(
          "reading",
          scores.overall,
          scores.reading,
          targetRange
        ),
        writing: getFeedback(
          "writing",
          scores.overall,
          scores.writing,
          targetRange
        ),
        listening: getFeedback(
          "listening",
          scores.overall,
          scores.listening,
          targetRange
        ),
        speaking: getFeedback(
          "speaking",
          scores.overall,
          scores.speaking,
          targetRange
        ),
      });
    }
  }, [scores, targetRange]);

  useEffect(() => {
    if (categoryScores.raTotal !== 0) {
      calculateTotalScores();
    }
  }, [categoryScores]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("targetcard");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (

    <>
       {loading && <LoadingModal />} 
      <FlexDiv
        style={{
          flexDirection: "column",
          padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
          gap: "1.25rem",
        }}
      >
        <FeedbackHeader>
          <FeedbackHeaderTitle>AI Score Report Analysis</FeedbackHeaderTitle>
          <FeedbackHeaderText>Target Score: {startValue}</FeedbackHeaderText>
          <FeedbackHeaderText>Report Analyzed</FeedbackHeaderText>
        </FeedbackHeader>
        <FeedbackCard score={scores.overall} text={feedback.overall} />
        <FeedbackCard
          title="Reading"
          bg="#AD826E"
          score={scores.reading}
          text={feedback.reading}
        />
        <FeedbackCard
          title="Writing"
          bg="#FF5D5D"
          score={scores.writing}
          text={feedback.writing}
        />
        <FeedbackCard
          title="Listening"
          bg="#868EAF"
          score={scores.listening}
          text={feedback.listening}
        />
        <FeedbackCard
          title="Speaking"
          bg="#49D7F2"
          score={scores.speaking}
          text={feedback.speaking}
        />
        {open && (
          <Modal isOpen={open} style={modalStyle}>
            <SetTargetPopup
              close={setOpen}
              startValue={startValue}
              endValue={endValue}
              handleSetTarget={handleSetTarget}
            />
          </Modal>
        )}
      </FlexDiv>
      </>

  );
};

export default Feedback;
