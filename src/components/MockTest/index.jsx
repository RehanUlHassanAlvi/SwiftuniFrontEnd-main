
import { Box, CircularProgress, Modal, useMediaQuery } from "@mui/material";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/joy";
import moment from "moment";
import { CLOCK, CLOCKRED, QUESTIONS } from "../../constants/Mocktests";
import SwiftUniLogo from "../../assets/images/swiftuniLogoo.svg";
import {
  EndTest,
  GetAllMocktestQuestion,
  GetPendingMocktestQuestion,
  Timeout,
} from "../../Client/request";
import Speaking from "./Speaking/SpeakingFull";
import Writing from "./Writing/WritingFull";
import Reading from "./Reading/ReadingFull";
import Listening from "./Listening/ListeningFull";
import Welcome from "./Welcome";
import RemainingTime from "./RemainingTime";
import useStopwatch from "../../hooks/useStopwatch";
import useTimer from "../../hooks/useTimer";
import CompatibilityModal from "./CompatibilityModal";
import toast from "react-hot-toast";
import { BlinkingClockWrapper } from "./Style";
import WelcomeWriting from "./WelcomeWriting";

export default function MockTestFull() {
  const location = useLocation();
  const { Exam } = location.state || {};
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(1);
  // const [open, setOpen] = useState(true);
  const [open, setOpen] = useState(!Exam.ResumeTestId);
  const [startingCategory, setStartingCategory] = useState(null);
  const [MockTestAttemptID, setMockTestAttemptID] = useState();
  const [snackbarModel, setsnackbarModel] = useState(false);
  const [Endloader, setEndloader] = useState(false);
  const [timeoutModel, setTimeoutModel] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showRemainingTime, setShowRemainingTime] = useState(null);

  const [prevElapsedTime, setPrevElapsedTime] = useState(0);
  const [isPrevElapsedTimeAdded, setIsPrevElapsedTimeAdded] = useState(false);
  const [commulative, setCommulative] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);

  // Listening
  const [listeningNonSSTTime, setListeningNonSSTTime] = useState(null);
  const [sstAttemptedCount, setSSTAttemptedCount] = useState(0);
  const [sstCount, setSSTCount] = useState(0);
  const [sstCompleted, setSSTCompleted] = useState(false);

  // Are we resuming an existing test?
  const [isResuming, setIsResuming] = useState(false);

  // Current Category
  // const [currentCategory, setCurrentCategory] = useState(
  //   questions.length > 0 ? questions[0].Category : null
  // );

  // Whether user is on a "welcome" page for a category
  const [isOnWelcomePage, setIsOnWelcomePage] = useState(true);
  const [toastShown, setToastShown] = useState(false);

  // Media Queries
  const isMobile = useMediaQuery("(max-width:450px)");
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");

  const submitTriggerRef = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STOPWATCH & TIMER HOOKS
  // ─────────────────────────────────────────────────────────────────────────────
  const {
    elapsedTime, // category-level timing
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    // resetElapsedTime,
    addTime,
    questionsTime, // question-level timing
    resetQuestionTimer,
  } = useStopwatch();

  // ─────────────────────────────────────────────────────────────────────────────
  // MOCK TEST TIME LIMITS (example values)
  // ─────────────────────────────────────────────────────────────────────────────
  const individualTimes = JSON.parse(Exam.IndividualTimes);
  const {
    speaking_time,
    writing_time,
    reading_time,
    listening_time,
  } = individualTimes;

  const speakingTime = speaking_time;
  const writingTime = writing_time;
  const readingTime = reading_time;
  const listeningTime = listening_time;

  // const speakingTime = 1;   // in minutes
  // const writingTime = 1;    // in minutes
  // const readingTime = 1;    // in minutes
  // const listeningTime = 12; // in minutes

  const totalSpeakingWritingTime = speakingTime + writingTime;

  // ─────────────────────────────────────────────────────────────────────────────
  // GUARDS
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!Exam) {
      toast.error("Redirecting...");
      navigate("/MockTest");
    }
  }, [Exam, navigate]);

  if (!Exam) {
    return null;
  }

  // Show "Test started / resumed" toast once after leaving welcome page
  useEffect(() => {
    if (!isOnWelcomePage && !toastShown) {
      setTimeout(() => {
        if (Exam.ResumeTestId) {
          toast.success("Test resumed. Good luck!");
        } else {
          toast.success("Test started. Good luck!");
        }
      }, 200);
      setToastShown(true);
    }
  }, [isOnWelcomePage, toastShown]);

  // ─────────────────────────────────────────────────────────────────────────────
  // STYLE - MODALS
  // ─────────────────────────────────────────────────────────────────────────────
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "background.paper",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.12)",
    borderRadius: "24px",
    p: isMobile ? 2 : 4,
    height: "80vh",
    overflowY: "auto",
  };

  const styleTestEndModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    outline: "none",
    p: 4,
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // LOGGING/DEBUG
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    console.log(`Total SST Questions: ${sstCount}`);
    console.log(`Attempted SST Questions: ${sstAttemptedCount}`);
  }, [sstCount, sstAttemptedCount]);

  useEffect(() => {
    console.log("Step:", step);
  }, [step]);

  useEffect(() => {
    console.log("Is Test Started:", isTestStarted);
  }, [isTestStarted]);

  useEffect(() => {
    console.log("showRemainingTime:", showRemainingTime);
  }, [showRemainingTime]);

  // ─────────────────────────────────────────────────────────────────────────────
  // FETCH QUESTIONS ON MOUNT
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (Exam.ResumeTestId) {
      setOpen(false);
      setIsResuming(true);
      GetPendingMocktestQuestion({ id: Exam.ResumeTestId }).then((res) => {
        if (res.responseCode === 200) {
          const pendingQuestions = res?.response || [];
          setQuestions(pendingQuestions);

          if (pendingQuestions.length > 0) {
            const sstQuestions = pendingQuestions.filter((q) => q.Category === "Listening" && q.SubCategory === "Summarize Spoken Text");
            const totalSSTCount = sstQuestions.length;
            setSSTCount(totalSSTCount);
      
            const listeningSstQsTime = totalSSTCount * 10;
            const listeningNonSstQsTime = listeningTime - listeningSstQsTime;
            setListeningNonSSTTime(listeningNonSstQsTime);
      
            const attemptedSSTCount = sstQuestions.filter((q) => q.IsAttempted).length;
            setSSTAttemptedCount(attemptedSSTCount);
          }

          let resumeIndex = -1; 

          // ─────────────────────────────────────────────────────────────────────────────
          // Find the first unattempted question
          // ─────────────────────────────────────────────────────────────────────────────
          // let resumeIndex = -1;
          // resumeIndex = pendingQuestions.findIndex((q) => !q.IsAttempted);


          // ─────────────────────────────────────────────────────────────────────────────
          // Find the first unattempted question by reverse array logic to skip the initial unattempted questions
          // ─────────────────────────────────────────────────────────────────────────────
          const reversed = pendingQuestions.slice().reverse();
          // Step 1: Find the last attempted question
          const lastAttemptedIndex = reversed.findIndex((q) => q.IsAttempted);
          // Step 2: Find the first unattempted question after the last attempted one
          if (lastAttemptedIndex !== -1) {
            // Map the last attempted index back to the original array
            const lastAttemptedOriginalIndex = pendingQuestions.length - 1 - lastAttemptedIndex;
            // Start searching for the next unattempted question after the last attempted
            resumeIndex = pendingQuestions.findIndex((q, index) => index > lastAttemptedOriginalIndex && !q.IsAttempted);
          } else {
            // Edge case: If no question has been attempted, find the first unattempted question
            resumeIndex = pendingQuestions.findIndex((q) => !q.IsAttempted);
          }


          if (resumeIndex === -1) {
            console.log("All questions have been attempted already!");
            return;
          }

          const resumeQ = pendingQuestions[resumeIndex];
          const resumeCategory = resumeQ.Category;

          setStep(resumeIndex + 1);

          const categoryQs = pendingQuestions.filter(
            (q) => q.Category === resumeCategory
          );

          let lastAttemptedQuestion;
          if (resumeCategory === "Listening") {
            const listeningExclSST = categoryQs.filter((q) => q.SubCategory !== "Summarize Spoken Text");
            lastAttemptedQuestion = listeningExclSST
              .slice()
              .reverse()
              .find((q) => q.IsAttempted);
          } else {
            lastAttemptedQuestion = categoryQs
              .slice()
              .reverse()
              .find((q) => q.IsAttempted);
          }

          const allTimes = lastAttemptedQuestion?.AllTimes
            ? JSON.parse(lastAttemptedQuestion.AllTimes)
            : null;

          const cumulativeTime = allTimes?.commulativeTime || 0;

          console.log("Cumulative Elapsed Time for Current Category:", cumulativeTime);

          if (cumulativeTime > 0) {
            setPrevElapsedTime(cumulativeTime);
          }

          switch (resumeCategory) {
            case "Speaking":
              setStartingCategory(1);
              break;
            case "Writing":
              setStartingCategory(2);
              break;
            case "Reading":
              setStartingCategory(3);
              break;
            case "Listening":
              setStartingCategory(4);
              break;
            default:
              break;
          }
        }
      });
    } else {
      GetAllMocktestQuestion({ id: Exam.MockTestId }).then((res) => {
        if (res?.responseCode === 200) {
          setMockTestAttemptID(res.response.MockTestAttemptId);
  
          const fetchedQuestions = res?.response?.obj || [];
          const initializedQuestions = fetchedQuestions.map((q) => ({
            ...q,
            IsAttempted: false,
          }));

          if (initializedQuestions.length > 0) {
            setQuestions(initializedQuestions);

            const sstQuestions = initializedQuestions.filter((q) => q.Category === "Listening" && q.SubCategory === "Summarize Spoken Text");
            const totalSSTCount = sstQuestions.length;
            setSSTCount(totalSSTCount);
        
            const listeningSstQsTime = totalSSTCount * 10;
            const listeningNonSstQsTime = listeningTime - listeningSstQsTime;
            setListeningNonSSTTime(listeningNonSstQsTime);

            const firstQ = initializedQuestions[0];
            const newCategory = firstQ?.Category;

            switch (newCategory) {
              case "Speaking":
                setStartingCategory(1);
                break;
              case "Writing":
                setStartingCategory(2);
                break;
              case "Reading":
                setStartingCategory(3);
                break;
              case "Listening":
                setStartingCategory(4);
                break;
              default:
                break;
            }
          }
        } else if (res.responseCode === 400) {
          setsnackbarModel(true);
          setTimeout(() => navigate("/MockTest"), 1000);
        }
      });
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // DETECT CATEGORY CHANGE => RESET STOPWATCH IF NEEDED
  // ─────────────────────────────────────────────────────────────────────────────
  const handleAddElapsedTime = (category) => {
    if (prevElapsedTime > 0 && !isPrevElapsedTimeAdded) {
      console.log(`Adding Prev Elapsed Time for ${category}:`, prevElapsedTime);
      addTime(prevElapsedTime); 
      setCommulative((prev) => prev + prevElapsedTime);
      setIsPrevElapsedTimeAdded(true);
    }
  };

  const previousCategoryRef = useRef(null);

  useEffect(() => {
    if (questions.length === 0 || step <= 0) return;
    const newQ = questions[step - 1];
    const newCategory = newQ?.Category;
    const newSubCategory = newQ?.SubCategory;

    // If we are still in "resuming" mode, skip category-change logic
    if (isResuming) return;

    if (previousCategoryRef.current === null) {
      // First loaded question
      previousCategoryRef.current = newCategory;
      // If we have leftover time from "resuming," add it
      if (newCategory !== "Listening" || (newCategory === "Listening" && newSubCategory !== "Summarize Spoken Text")) {
        handleAddElapsedTime(newCategory);
      }
      return;
    }

    // If the category changed
    if (newCategory && newCategory !== previousCategoryRef.current) {
      console.log(`Category changed from ${previousCategoryRef.current} to ${newCategory}.`);

      const newTimeLimit = getTimeLimit(newQ);
      resetStopwatch(moment.duration(newTimeLimit, "minutes").asMilliseconds());
      setCommulative(0);

      setIsPrevElapsedTimeAdded(false);
      setPrevElapsedTime(0);

      if (newCategory !== "Listening" || (newCategory === "Listening" && newSubCategory !== "Summarize Spoken Text")) {
        handleAddElapsedTime(newCategory);
      }

      previousCategoryRef.current = newCategory;
      // setCurrentCategory(newCategory);
    }
  }, [step, questions, isResuming]);

  // Once we’re done “resuming” (i.e. step > 0?), we can start the stopwatch
  useEffect(() => {
    if (isResuming && step > 0) {
      console.log("Resumption complete. Stopping the 'resuming' flag...");
      setIsResuming(false);
    }
  }, [isResuming, step]);

  // ─────────────────────────────────────────────────────────────────────────────
  // START CATEGORY-LEVEL TIMER
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isTestStarted) {
      startStopwatch();
      setIsTestStarted(false);
    }
  }, [isTestStarted]);

  // ─────────────────────────────────────────────────────────────────────────────
  // CALCULATE Summarize Spoken Text COUNT
  // ─────────────────────────────────────────────────────────────────────────────
  
  // useEffect(() => {
  //   if (questions.length > 0) {
  //     const sstQuestions = questions.filter((q) => q.Category === "Listening" && q.SubCategory === "Summarize Spoken Text");
  //     const totalSSTCount = sstQuestions.length;
  //     setSSTCount(totalSSTCount);

  //     // Each Summarize Spoken Text = 10 minutes
  //     const listeningSstQsTime = totalSSTCount * 10;
  //     const listeningNonSstQsTime = listeningTime - listeningSstQsTime;
  //     setListeningNonSSTTime(listeningNonSstQsTime);

  //     const attemptedSSTCount = sstQuestions.filter((q) => q.IsAttempted).length;
  //     setSSTAttemptedCount(attemptedSSTCount);
  //   }
  // }, [questions, listeningTime]);

  // ─────────────────────────────────────────────────────────────────────────────
  // TIME LIMIT HELPER
  // ─────────────────────────────────────────────────────────────────────────────
  const getTimeLimit = (question) => {
    if (!question) return 0;
    const category = question.Category;
    const subCategory = question.SubCategory;

    switch (category) {
      case "Speaking":
        return speakingTime + 10; // added 10 extra minutes only for the cases of delays in speaking submissions etc. it will not effect the timings of questions attempts which are static and predifined already
      case "Writing":
        return writingTime;
      case "Reading":
        return readingTime;
      case "Listening":
        if (subCategory === "Summarize Spoken Text") {
          return sstCount * 10; // Each Summarize Spoken Text = 10 minutes
        } else if (listeningNonSSTTime !== null) {
          return listeningNonSSTTime;
        } else {
          console.error("listeningNonSSTTime is not yet updated. Using static 20 minutes");
          return 20; // Default fallback time
        }
      
      default:
        return 0;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // WATCH ELAPSED TIME => CHECK IF TIME UP
  // ─────────────────────────────────────────────────────────────────────────────
  const categoryTimeUpRef = useRef(false);

  useEffect(() => {
    if (questions.length === 0 || step <= 0) return;
    if (categoryTimeUpRef.current) return; // prevent double-firing

    const question = questions[step - 1];
    const category = question?.Category;
    const subCategory = question?.SubCategory;

    const timeLimit = getTimeLimit(question);
    const timeLimitMs = moment.duration(timeLimit, "minutes").asMilliseconds();

    if (elapsedTime >= timeLimitMs && subCategory !== "Summarize Spoken Text") {
      if (category === 'Reading' || category === 'Listening') {
        submitTriggerRef.current = true; // Signal auto-submit the question which user is attempting
      }
      // Mark time up only once
      categoryTimeUpRef.current = true;
      onCategoryTimeUp(category);
    }
  }, [elapsedTime, step, questions]);

  // Handler for category time up
  const onCategoryTimeUp = (expiredCategory) => {
    setSnackbarMessage(`Time's up for ${expiredCategory}.`);
    setTimeoutModel(true);

    setTimeout(() => {
      if (expiredCategory === "Listening") {
        toast.success("No more questions! Ending the test.");
        endTestAndTimeout();
      } else {
        moveToNextCategory(expiredCategory);
      }
    }, 2000);

  };

  const moveToNextCategory = (justExpiredCat) => {
    if (justExpiredCat === "Listening") {
      toast.success("No more questions! Ending the test.");
      endTestAndTimeout();
      return;
    }
    // Find the next step that has a different category
    const nextStepIndex = questions.findIndex((q, index) => index >= step && q.Category !== justExpiredCat);
    if (nextStepIndex !== -1) {
      const nextCategory = questions[nextStepIndex]?.Category;
      setStep(nextStepIndex + 1);
      // setCurrentCategory(nextCategory);

      // Also update the "welcome" startingCategory
      switch (nextCategory) {
        case "Speaking":
          setStartingCategory(1);
          break;
        case "Writing":
          setStartingCategory(2);
          break;
        case "Reading":
          setStartingCategory(3);
          break;
        case "Listening":
          setStartingCategory(4);
          break;
        default:
          break;
      }

      resetStopwatch(moment.duration(getTimeLimit(questions[nextStepIndex]), "minutes").asMilliseconds());
      setCommulative(0);
      categoryTimeUpRef.current = false;
      categoryTimeUpRef.current = false;
    } else {
      toast.success("No more questions! Ending the test.");
      endTestAndTimeout();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // END TEST + TIMEOUT
  // ─────────────────────────────────────────────────────────────────────────────
  const endTestAndTimeout = () => {
    return new Promise((resolve) => {
      // Gather ALL unattempted
      const unattempted = questions.filter((q) => !q.IsAttempted);

      const payload = {
        mock_test_attempt_id: MockTestAttemptID
          ? MockTestAttemptID
          : Exam.ResumeTestId,
        is_ptecore: false,
        response_obj: JSON.stringify(unattempted),
      };
      Timeout(payload);

      const Endpayload = {
        mock_test_attempt_id: MockTestAttemptID
          ? MockTestAttemptID
          : Exam.ResumeTestId,
        end_time: new Date().toLocaleDateString(),
      };

      EndTest(Endpayload)
        .then((res) => {
          if (res.data) {
            console.log("Test ended and Timeout handled.");
            navigate(`/mt-score-viewscore/${MockTestAttemptID ? MockTestAttemptID : Exam.ResumeTestId}`);
            resolve();
          } else {
            resolve();
          }
        })
        .catch((error) => {
          console.error("Error ending test:", error);
          resolve();
        });
    });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // HANDLE SUB-QUESTION TIMERS (e.g., Summarize Spoken Text)
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (questions.length === 0 || step <= 0) return;
    const currentQuestion = questions[step - 1];
    const currentCategory = currentQuestion?.Category;
    const currentSubCategory = currentQuestion?.SubCategory;

    if (currentCategory === "Writing") {
      let timeDuration = 0;
      if (currentSubCategory === "Write Essay") timeDuration = 20;
      else if (currentSubCategory === "Summarize Written Text") timeDuration = 10;
      else if (currentSubCategory === "Write Email") timeDuration = 9;
      setShowRemainingTime(timeDuration);
    } else if (
      currentCategory === "Listening" &&
      currentSubCategory === "Summarize Spoken Text"
    ) {
      setShowRemainingTime(10); // Each Summarize Spoken Text = 10 minutes
    } else {
      setShowRemainingTime(null);
    }
  }, [step, questions]);

  // ─────────────────────────────────────────────────────────────────────────────
  // DETECT IF CURRENT PAGE IS A WELCOME PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (questions.length === 0 || step <= 0) return;
    const currentCat = questions[step - 1]?.Category;
    const isWelcomePg =
      (currentCat === "Speaking" && startingCategory === 1) ||
      (currentCat === "Writing" && startingCategory === 2) ||
      (currentCat === "Reading" && startingCategory === 3) ||
      (currentCat === "Listening" && startingCategory === 4);
    setIsOnWelcomePage(isWelcomePg);
  }, [step, startingCategory, questions]);

  // ─────────────────────────────────────────────────────────────────────────────
  // TIME FORMATTERS
  // ─────────────────────────────────────────────────────────────────────────────
  const formatElapsedTime = (ms) => {
    return ms >= 3600000
      ? moment.utc(ms).format("HH:mm:ss")
      : moment.utc(ms).format("mm:ss");
  };

  const getFormattedTotalTime = (question) => {
    if (!question) return 0;
    const category = question.Category;
    const subCategory = question.SubCategory;

    let totalMinutes = 0;
    switch (category) {
      case "Speaking":
        totalMinutes = speakingTime;
        break;
      case "Writing":
        totalMinutes = writingTime;
        break;
      case "Reading":
        totalMinutes = readingTime;
        break;
      case "Listening":
        totalMinutes = listeningNonSSTTime;
        break;
      default:
        totalMinutes = 0;
        break;
    }
    const totalMs = totalMinutes * 60 * 1000;
    return totalMs >= 3600000
      ? moment.utc(totalMs).format("HH:mm:ss")
      : moment.utc(totalMs).format("mm:ss");
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        open={timeoutModel}
        variant="solid"
        color="danger"
        onClose={() => setTimeoutModel(false)}
      >
        {snackbarMessage}
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        open={snackbarModel}
        variant="soft"
        color="danger"
        onClose={() => setsnackbarModel(false)}
      >
        You have already started this test !!
      </Snackbar>

      {/* COMPATIBILITY MODAL */}
      <Modal
        open={open}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(3px)",
        }}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          setOpen(false);
        }}
      >
        <Box sx={style}>
          <CompatibilityModal setOpen={setOpen} test={Exam} />
        </Box>
      </Modal>

      {/* HEADER */}
      {questions.length > 0 && (
        <div
          style={{
            padding: isLaptopTwo ? "15px 10px" : "5px 100px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <img src={SwiftUniLogo} alt="logo" />
            {!isMobile && <h1>Mock Test</h1>}
          </div>

          {/* <span>
            {formatElapsedTime(elapsedTime)} /{" "}
            {getFormattedTotalTime(questions[step - 1])}
          </span> */}

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              {CLOCK}
              {showRemainingTime ? (
                <RemainingTime
                  showRemainingTime={showRemainingTime}
                  setShowRemainingTime={setShowRemainingTime}
                  Category={questions[step - 1].Category}
                  step={step}
                  questions={questions}
                  isOnWelcomePage={isOnWelcomePage}
                  submitTriggerRef={submitTriggerRef}
                />
              ) : (
                <span>
                  {formatElapsedTime(elapsedTime)} /{" "}
                  {getFormattedTotalTime(questions[step - 1])}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {QUESTIONS}
              <span>
                {step} of {questions.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* BODY */}
      {Endloader ? (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            width: "100vw",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : questions.length > 0 ? (
        <>
          {/* SPEAKING */}
          {questions[step - 1].Category === "Speaking" ? (
            startingCategory === 1 ? (
              <Welcome
                Exam={Exam.MockTestName}
                startingCategory={startingCategory}
                setNextStartingCategory={setStartingCategory}
                part={1}
                name={"Speaking & Writing"}
                totalTime={totalSpeakingWritingTime}
                speakingTime={speakingTime}
                writingTime={writingTime}
                setIsTestStarted={setIsTestStarted}
                isResuming={!!Exam.ResumeTestId}
                questions={questions}
                step={step}
              />
            ) : (
              <Speaking
                ExamId={Exam.ResumeTestId}
                quest={questions[step - 1]}
                step={step}
                setStep={setStep}
                MockTestAttemptID={MockTestAttemptID}
                totalQuestions={questions.length}
                commulative={commulative}
                setCommulative={setCommulative}
                questionsTime={questionsTime}
                startStopwatch={startStopwatch}
                stopStopwatch={stopStopwatch}
                resetQuestionTimer={resetQuestionTimer}
              />
            )
          ) : null}

          {/* WRITING */}
          {questions[step - 1].Category === "Writing" ? (
            startingCategory === 2 ? (
              <WelcomeWriting
                Exam={Exam.MockTestName}
                startingCategory={startingCategory}
                setNextStartingCategory={setStartingCategory}
                name={"Writing"}
                writingTime={writingTime}
                setIsTestStarted={setIsTestStarted}
                isResuming={!!Exam.ResumeTestId}
                questions={questions}
                step={step}
              />
            ) : (
              <Writing
                ExamId={Exam.ResumeTestId}
                quest={questions[step - 1]}
                step={step}
                setStep={setStep}
                MockTestAttemptID={MockTestAttemptID}
                totalQuestions={questions.length}
                commulative={commulative}
                setCommulative={setCommulative}
                questionsTime={questionsTime}
                startStopwatch={startStopwatch}
                stopStopwatch={stopStopwatch}
                resetQuestionTimer={resetQuestionTimer}

                endTestAndTimeout={endTestAndTimeout}
                submitTriggerRef={submitTriggerRef}
              />
            )
          ) : null}

          {/* READING */}
          {questions[step - 1].Category === "Reading" ? (
            startingCategory === 3 ? (
              <Welcome
                Exam={Exam.MockTestName}
                startingCategory={startingCategory}
                setNextStartingCategory={setStartingCategory}
                part={2}
                name={"Reading"}
                totalTime={readingTime}
                setIsTestStarted={setIsTestStarted}
                isResuming={!!Exam.ResumeTestId}
                questions={questions}
                step={step}
              />
            ) : (
              <Reading
                ExamId={Exam.ResumeTestId}
                quest={questions[step - 1]}
                step={step}
                setStep={setStep}
                MockTestAttemptID={MockTestAttemptID}
                totalQuestions={questions.length}
                commulative={commulative}
                setCommulative={setCommulative}
                questionsTime={questionsTime}
                startStopwatch={startStopwatch}
                stopStopwatch={stopStopwatch}
                resetQuestionTimer={resetQuestionTimer}
                submitTriggerRef={submitTriggerRef}
                questions={questions}
              />
            )
          ) : null}

          {/* LISTENING */}
          {questions[step - 1].Category === "Listening" ? (
            startingCategory === 4 ? (
              <Welcome
                Exam={Exam.MockTestName}
                startingCategory={startingCategory}
                setNextStartingCategory={setStartingCategory}
                part={3}
                name={"Listening"}
                totalTime={listeningTime}
                listeningNonSSTTime={listeningNonSSTTime}
                summarizeSpokenTextTime={sstCount * 10}
                setIsTestStarted={setIsTestStarted}
                isResuming={!!Exam.ResumeTestId}
                questions={questions}
                step={step}
              />
            ) : (
              <Listening
                ExamId={Exam.ResumeTestId}
                quest={questions[step - 1]}
                step={step}
                setStep={setStep}
                MockTestAttemptID={MockTestAttemptID}
                totalQuestions={questions.length}
                commulative={commulative}
                setCommulative={setCommulative}
                incrementSSTAttemptedCount={() =>setSSTAttemptedCount((prev) => prev + 1)}
                questionsTime={questionsTime}
                startStopwatch={startStopwatch}
                stopStopwatch={stopStopwatch}
                resetQuestionTimer={resetQuestionTimer}
                endTestAndTimeout={endTestAndTimeout}
                sstCompleted={sstCompleted}
                setSSTCompleted={setSSTCompleted}
                isOnWelcomePage={isOnWelcomePage}
                listeningNonSSTTime={listeningNonSSTTime}
                resetStopwatch={resetStopwatch}
                sstAttemptedCount={sstAttemptedCount}
                sstCount={sstCount}
                submitTriggerRef={submitTriggerRef}
              />
            )
          ) : null}
        </>
      ) : null}
    </div>
  );
}
