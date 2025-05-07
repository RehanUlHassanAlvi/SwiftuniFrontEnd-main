import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  CircularProgress,
  Modal,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { PurpleTextArea } from "../Style";
import Player from "./Player";
import Filler from "../../../assets/audios/filler_audio.mp3";
import TextWithInputs from "./TextWithInputs";
import { SWT_QCard_Div } from "../../../pages/Style";
import HighlightIncWordsCard from "../../Listening/HighlightIncWordsCard";
import { useNavigate } from "react-router-dom";
import { PurpleBtn, PurpleCopyPasteBtn } from "../../Common/Style";
import {
  EndTest,
  GetMocktestQuestion,
  MakeQuestionAttempted,
  SummarizeSpoken,
  WriteDictation,
} from "../../../Client/request";
import useStopwatch from "../../../hooks/useStopwatch";
import { Snackbar } from "@mui/joy";
import SaveExitBtn from "../SaveExitBtn";
import moment from "moment";
import useTimer from "../../../hooks/useTimer";

const guideline = {
  "Summarize Spoken Text":
    "You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50 - 70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture.",
  "Listening: Multiple Choice, Multiple Answers":
    "Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.",
  "Fill in the Blanks":
    "You will hear a recording. Type the missing words in each blank.",
  "Highlight Correct Summary":
    "You will hear a recording. Click on the paragraph that best relates to the recording.",
  "Listening: Multiple Choice, Single Answer":
    "Listen to the recording and answer the multiple-choice question by selecting the correct response. Only one response is correct.",
  "Select Missing Word":
    "You will hear a recording. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording.",
  "Highlight Incorrect Words":
    "You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker(s) said. Please click on the words that are different.",
  "Write from Dictation":
    "You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.",
};

export default function ListeningFull({
  ExamId,
  quest,
  setStep,
  step,
  totalQuestions,
  MockTestAttemptID,
  commulative,
  setCommulative,
  incrementSSTAttemptedCount,
  questionsTime,
  startStopwatch,
  stopStopwatch,
  resetQuestionTimer,
  endTestAndTimeout,

  sstCompleted,
  setSSTCompleted,
  isOnWelcomePage,
  listeningNonSSTTime,
  resetStopwatch,
  sstAttemptedCount,
  sstCount,
  submitTriggerRef,
}) {
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState();
  const [quest_data, setQuest_data] = useState();
  const [Loading, setLoading] = useState(true);
  const [DisabledButton, setDisabledButton] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [EndModal, setEndModal] = useState(false);
  const [NetworkError, setNetworkError] = useState(false);
  const [currentSentence, setCurrentSentence] = useState("");
  const { stopTimer } = useTimer();

  useEffect(() => {
    if (quest) {
      setLoading(true);
      GetMocktestQuestion(quest.QuestionId).then((res) => {
        if (res.data) {
          setQuest_data(res.data);
          setLoading(false);
          setValue("");
          setSelectedOptions([]);
          setSelectedAnswers([]);
          startStopwatch();
        }
      });
    }
  }, [quest]);

  const handleChangeMCQ = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      // Add the selected value if checked
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      // Remove the selected value if unchecked
      setSelectedOptions((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleExit = () => {
    navigate("/MockTest");
  };

  function getScore(questions, answers) {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i] &&
        answers[i] &&
        typeof questions[i] === "string" &&
        typeof answers[i] === "string" &&
        questions[i].toLowerCase() === answers[i].toLowerCase()
      ) {
        score++;
      }
    }
    return score;
  }

  function getScoreMCMA(correctAnswers, selectedAnswers) {
    const correctSelections = selectedAnswers.filter((answer) =>
      correctAnswers.includes(answer)
    ).length;
  
    const incorrectSelections = selectedAnswers.filter(
      (answer) => !correctAnswers.includes(answer)
    ).length;
  
    const score = correctSelections - incorrectSelections;
    return Math.max(0, score);
  }
  

  // useEffect(() => {
  //   if (quest.SubCategory === "Highlight Incorrect Words") {
  //     setSelectedAnswers([]);
  //   }
  // }, [quest.SubCategory]);

  useEffect(() => {
    if (isAudioPlaying) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (submitTriggerRef && submitTriggerRef.current) {
      handleNext();
      submitTriggerRef.current = false;
    }
  }, [submitTriggerRef.current]);

  const handleNext = () => {
    if (DisabledButton) return;
    stopStopwatch();
    setCommulative(commulative + questionsTime / 1000);

    if (quest.SubCategory === "Summarize Spoken Text") {
      let AI_payload = {
        passage: quest_data.QuestionStatement,
        summary: value,
        pte_type: "pte academic",
      };
      SummarizeSpoken(AI_payload).then((res) => {
        if (res.data) {
          let response = {
            QuestionId: quest.QuestionId,
            QuestionStatement: quest.QuestionStatement,
            QuestionName: quest.QuestionName,
            Category: quest.Category,
            SubCategory: quest.SubCategory,
            UserResponse: value,
            AI_response: JSON.stringify(res.data),
          };
          let payload = {
            mock_test_question_id: quest.MockTestQuestionTableId,
            marks_obtained: 100,
            user_response: JSON.stringify(response),
            time_taken: questionsTime / 1000,
            is_ptecore: false,
            all_times: JSON.stringify({ Category: quest.Category }),
            mock_test_attempt_id: MockTestAttemptID
              ? MockTestAttemptID
              : ExamId,
          };
          MakeQuestionAttempted(payload).then((res) => {
            if (!quest.IsAttempted) {
              quest.IsAttempted = true;
            }
            setValue("");
            if (res.error) {
              setNetworkError(true);
              setTimeout(() => {
                navigate("/Mocktest");
              }, 2000);
            }
            if (step === totalQuestions) {
              setEndModal(true);
              endTestAndTimeout().then(() => {
                setEndModal(false);
              });
            }
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    } else if (quest.SubCategory === "Fill in the Blanks") {
      let score = getScore(quest_data.AnswerNames, selectedOptions);
      let response = {
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.AnswerNames,
        selectedAnswers: selectedOptions,
        enableSkillsData: [
          {
            component: "Blanks",
            score: score + "/" + quest_data.AnswerNames.length,
            suggestion: "Excellent!",
          },
        ],
      };
      let payload = {
        is_ptecore: false,
        marks_obtained: score, 
        mock_test_question_id: quest.MockTestQuestionTableId,
        user_response: JSON.stringify(response),
        time_taken: questionsTime / 1000,
        all_times: JSON.stringify({
          Category: quest.Category,
          commulativeTime: commulative + questionsTime / 1000,
        }),
        mock_test_attempt_id: MockTestAttemptID ? MockTestAttemptID : ExamId,
      };
      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        if (res.error) {
          setNetworkError(true);
          setTimeout(() => {
            navigate("/Mocktest");
          }, 2000);
        }
        if (step === totalQuestions) {
          setEndModal(true);
          endTestAndTimeout().then(() => {
            setEndModal(false);
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    } else if ( quest.SubCategory === "Highlight Correct Summary" || quest.SubCategory === "Select Missing Word") {
      let score = getScore(quest_data.AnswerNames, [selectedOptions]);
      let response = {
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.AnswerNames,
        selectedAnswers: [selectedOptions],
        enableSkillsData: [
          {
            component: "Blanks",
            score: score + "/" + quest_data.AnswerNames.length,
            suggestion: "Excellent!",
          },
        ],
      };
      let payload = {
        is_ptecore: false,
        marks_obtained: score,
        mock_test_question_id: quest.MockTestQuestionTableId,
        user_response: JSON.stringify(response),
        time_taken: questionsTime / 1000,
        all_times: JSON.stringify({
          Category: quest.Category,
          commulativeTime: commulative + questionsTime / 1000,
        }),
        mock_test_attempt_id: MockTestAttemptID ? MockTestAttemptID : ExamId,
      };
      // console.log("score", score);
      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        if (res.error) {
          setNetworkError(true);
          setTimeout(() => {
            navigate("/Mocktest");
          }, 2000);
        }
        if (step === totalQuestions) {
          setEndModal(true);
          endTestAndTimeout().then(() => {
            setEndModal(false);
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    } else if (quest.SubCategory === "Highlight Incorrect Words") {
      let matchedAnswers = selectedAnswers.filter((answer) =>
        quest_data.OptionNames.includes(answer)
      );

      let unmatchedAnswers = selectedAnswers.filter(
        (answer) => !quest_data.OptionNames.includes(answer)
      );

      let score = matchedAnswers.length - unmatchedAnswers.length;
      score = score < 0 ? 0 : score;
      let response = {
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.OptionNames,
        selectedAnswers: selectedAnswers,
        enableSkillsData: [
          {
            component: "words",
            score: score + "/" + quest_data.OptionNames.length,
            suggestion: "Excellent!",
          },
        ],
      };
      let payload = {
        is_ptecore: false,
        marks_obtained: score,
        mock_test_question_id: quest.MockTestQuestionTableId,
        user_response: JSON.stringify(response),
        time_taken: questionsTime / 1000,
        all_times: JSON.stringify({
          Category: quest.Category,
          commulativeTime: commulative + questionsTime / 1000,
        }),
        mock_test_attempt_id: MockTestAttemptID ? MockTestAttemptID : ExamId,
      };
      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        if (step === totalQuestions) {
          setEndModal(true);
          endTestAndTimeout().then(() => {
            setEndModal(false);
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    } else if (quest.SubCategory === "Listening: Multiple Choice, Multiple Answers") {
      let score = getScoreMCMA(quest_data.AnswerNames, selectedOptions);
      let response = {
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.AnswerNames,
        selectedAnswers: selectedOptions,
        enableSkillsData: [
          {
            component: "Choice",
            score: score + "/" + quest_data.AnswerNames.length,
            suggestion: "Excellent!",
          },
        ],
      };
      let payload = {
        is_ptecore: false,
        marks_obtained: score,
        mock_test_question_id: quest.MockTestQuestionTableId,
        user_response: JSON.stringify(response),
        time_taken: questionsTime / 1000,
        all_times: JSON.stringify({
          Category: quest.Category,
          commulativeTime: commulative + questionsTime / 1000,
        }),
        mock_test_attempt_id: MockTestAttemptID ? MockTestAttemptID : ExamId,
      };
      // console.log("payload", payload);
      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        if (res.error) {
          setNetworkError(true);
          setTimeout(() => {
            navigate("/Mocktest");
          }, 2000);
        }
        if (step === totalQuestions) {
          setEndModal(true);
          endTestAndTimeout().then(() => {
            setEndModal(false);
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    } else if (quest.SubCategory === "Listening: Multiple Choice, Single Answer") {
      let score = getScore(quest_data.AnswerNames, [selectedOptions]);
      score = score !== quest_data.AnswerNames.length ? 0 : score;
      let response = {
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.AnswerNames,
        selectedAnswers: [selectedOptions],
        enableSkillsData: [
          {
            component: "Choice",
            score: score + "/" + quest_data.AnswerNames.length,
            suggestion: "Excellent!",
          },
        ],
      };
      let payload = {
        is_ptecore: false,
        marks_obtained: score,
        mock_test_question_id: quest.MockTestQuestionTableId,
        user_response: JSON.stringify(response),
        time_taken: questionsTime / 1000,
        all_times: JSON.stringify({
          Category: quest.Category,
          commulativeTime: commulative + questionsTime / 1000,
        }),
        mock_test_attempt_id: MockTestAttemptID ? MockTestAttemptID : ExamId,
      };
      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        if (res.error) {
          setNetworkError(true);
          setTimeout(() => {
            navigate("/Mocktest");
          }, 2000);
        }
        if (step === totalQuestions) {
          setEndModal(true);
          endTestAndTimeout().then(() => {
            setEndModal(false);
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    } else if (quest.SubCategory === "Write from Dictation") {
      let AI_payload = {
        correct_answer:
          typeof quest_data.AnswerNames === "string"
            ? quest_data.AnswerNames
            : quest_data.AnswerNames.join(" "),
        user_response: value,
      };
      WriteDictation(AI_payload).then((res) => {
        if (res.data) {
          let response = {
            QuestionId: quest.QuestionId,
            QuestionStatement: quest_data.AnswerNames,
            QuestionName: quest.QuestionName,
            Category: quest.Category,
            SubCategory: quest.SubCategory,
            UserResponse: value,
            AI_response: JSON.stringify(res.data),
          };
          let payload = {
            mock_test_question_id: quest.MockTestQuestionTableId,
            marks_obtained: 100,
            user_response: JSON.stringify(response),
            time_taken: questionsTime / 1000,
            is_ptecore: false,
            all_times: JSON.stringify({
              Category: quest.Category,
              commulativeTime: commulative + questionsTime / 1000,
            }),
            mock_test_attempt_id: MockTestAttemptID
              ? MockTestAttemptID
              : ExamId,
          };
          MakeQuestionAttempted(payload).then((res) => {
            if (!quest.IsAttempted) {
              quest.IsAttempted = true;
            }
            if (res.error) {
              setNetworkError(true);
              setTimeout(() => {
                navigate("/Mocktest");
              }, 2000);
            }
            setValue("");
            if (step === totalQuestions) {
              setEndModal(true);
              endTestAndTimeout().then(() => {
                setEndModal(false);
              });
            }
            // if (step === totalQuestions) {
            // const payload = {
            //   mock_test_attempt_id: MockTestAttemptID
            //     ? MockTestAttemptID
            //     : ExamId,
            //   end_time: new Date().toLocaleDateString(),
            // };
            // setEndModal(true);
            // EndTest(payload).then((res) => {
            //   if (res) {
            //     setEndModal(false);
            // // navigate("/MockTest");
            // navigate(`/mt-score-viewscore/${MockTestAttemptID ? MockTestAttemptID : ExamId}`);
            //   }
            // });
            // }
          });
        }
      });
      setDisabledButton(true);
      setQuest_data(null);
    }

    resetQuestionTimer();
    if (step !== totalQuestions) {
      if (quest.SubCategory === "Summarize Spoken Text") {
        // If no SST or already handled, skip but STILL move to next step
        if (sstCount === 0 || sstCompleted) {
          setStep(step + 1);
          return;
        }

        // If user has attempted all SST questions
        if (sstAttemptedCount + 1 === sstCount) {
          setSSTCompleted(true);
          console.log(`SST done. Resetting stopwatch to Non SST Time ${listeningNonSSTTime} minutes.`);
          resetStopwatch(moment.duration(listeningNonSSTTime, "minutes").asMilliseconds());
          setCommulative(0);
          stopTimer();
        }
        incrementSSTAttemptedCount(); 
        setStep(step + 1);
      } else {
        // Not Summarize Spoken Text → just proceed
        setStep(step + 1);
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeRadio = (e) => {
    setSelectedOptions(e.target.value);
  };

  useEffect(() => {
    const clearClipboard = () => {
      navigator.clipboard.writeText("").catch((error) => {
        console.error("Clipboard clear error:", error);
      });
    };

    const timer = setTimeout(() => {
      if (document.hasFocus()) {
        clearClipboard();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    const textArea = textAreaRef.current;
    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;

    if (selectionStart !== selectionEnd) {
      const selectedText = textArea.value.substring(
        selectionStart,
        selectionEnd
      );
      navigator.clipboard.writeText(selectedText);
    } else {
      setAlertMessage("Select the text to copy.");
      setShowAlert(true);
    }
  };

  const handleCut = () => {
    const textArea = textAreaRef.current;
    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;

    if (selectionStart !== selectionEnd) {
      const selectedText = textArea.value.substring(
        selectionStart,
        selectionEnd
      );
      navigator.clipboard.writeText(selectedText);

      const newValue =
        value.slice(0, selectionStart) + value.slice(selectionEnd);
      setValue(newValue);

      setTimeout(() => {
        textArea.setSelectionRange(selectionStart, selectionStart);
      }, 0);
    } else {
      setAlertMessage("Select the text to cut.");
      setShowAlert(true);
    }
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    const textArea = textAreaRef.current;

    if (!text) {
      setAlertMessage("Nothing to paste.");
      setShowAlert(true);
    } else {
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;
      const newValue =
        value.slice(0, selectionStart) + text + value.slice(selectionEnd);
      setValue(newValue);

      const newCursorPosition = selectionStart + text.length;
      setTimeout(() => {
        textArea.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    }
  };

  const style = {
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

  const sentences = [
    "Please wait while your result is being processed",
    "Compiling your result ...",
    "Almost there ...",
    "Adding final touches ...",
  ];

  useEffect(() => {
    const displayRandomText = () => {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setCurrentSentence(sentences[randomIndex]);
    };

    const intervalId = setInterval(displayRandomText, 1000);

    // Initial call to display text immediately on load
    displayRandomText();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [sentences]);

  return (
    <div style={{}}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        open={NetworkError}
        variant={"outlined"}
        color={"danger"}
        onClose={() => {
          setNetworkError(false);
        }}
      >
        Network Error
      </Snackbar>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
            margin: 0,
          },
        }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Modal open={EndModal} onClose={() => setEndModal(false)}>
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "15px 0px 30px 0px",
                }}
              >
                <CircularProgress />
              </div>
              <span style={{ fontWeight: 700 }}>{currentSentence}</span>
            </div>
          </div>
        </Box>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isLaptopTwo ? "1rem 5% 2rem" : "3rem 5% 2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            // height: "400px",
            width: "100%",
            borderRadius: "24px",
            position: "relative",
            overflow: "clip",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: "#e2e2ea",
              height: "13px",
              position: "absolute",
            }}
          ></div>
          <div
            style={{
              width: `${(step / totalQuestions) * 100}%`,
              backgroundColor: "#996cfe",
              height: "13px",
              position: "absolute",
            }}
          ></div>
          {Loading && quest_data === null ? (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "full",
                minHeight: "50vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            quest_data && (
              <div
                style={{
                  //   width: "100%",
                  height: "100%",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "32px",
                    userSelect: "none",
                  }}
                  onCopy={(e) => e.preventDefault()}
                >
                  {guideline[quest.SubCategory]}
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <Player
                    audioURL={
                      quest_data.AudioObjects[0]?.url ||
                      quest_data.AudioObjects[0]?.audio_url
                    }
                    Waiting={
                      quest.SubCategory === "Summarize Spoken Text" ? 10 : 3
                    }
                    setDisabledButton={setDisabledButton}
                    title={quest.SubCategory}
                    SubCategory={quest.SubCategory}
                    setIsAudioPlaying={setIsAudioPlaying}
                  />
                </div>

                {quest.SubCategory ===
                  "Listening: Multiple Choice, Single Answer" ||
                quest.SubCategory ===
                  "Listening: Multiple Choice, Multiple Answers" ||
                quest.SubCategory === "Highlight Correct Summary" ||
                quest.SubCategory === "Select Missing Word" ? (
                  <div
                    style={{
                      fontFamily: "Noto Sans",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    {quest_data.OptionText}
                    <div>
                      {quest_data?.OptionNames &&
                        quest_data.OptionNames.map((option, index) => {
                          const label = option; // Extracts 'a', 'b', 'c', etc.
                          return (
                            <div
                              key={index}
                              style={{
                                paddingTop: "15px",
                                fontSize: "17px",
                                fontWeight: 400,
                                display: "flex", // Ensures label and input are on the same line
                                alignItems: "center",
                                userSelect: "none",
                              }}
                              onCopy={(e) => e.preventDefault()}
                            >
                              <label
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  marginRight: "10px",
                                  userSelect: "none",
                                }}
                                onCopy={(e) => e.preventDefault()}
                              >
                                {quest.SubCategory ===
                                "Listening: Multiple Choice, Multiple Answers" ? (
                                  <input
                                    type="checkbox"
                                    value={label}
                                    checked={selectedOptions.includes(label)}
                                    onChange={handleChangeMCQ}
                                    style={{
                                      marginRight: "5px",
                                      marginTop: "7px",
                                    }}
                                  />
                                ) : (
                                  <input
                                    type="radio"
                                    name="options"
                                    value={label}
                                    checked={selectedOptions === label}
                                    onChange={handleChangeRadio}
                                    style={{
                                      marginRight: "5px",
                                      marginTop: "7px",
                                    }}
                                  />
                                )}
                                {option}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : null}
                {quest.SubCategory === "Fill in the Blanks" ? (
                  <div
                    style={{
                      userSelect: "none",
                    }}
                    onCopy={(e) => e.preventDefault()}
                  >
                    <TextWithInputs
                      text={quest_data.QuestionStatement}
                      setAnswers={setSelectedOptions}
                    />
                  </div>
                ) : quest.SubCategory === "Highlight Incorrect Words" ? (
                  <>
                    <div
                      style={{
                        userSelect: "none",
                      }}
                      onCopy={(e) => e.preventDefault()}
                    >
                      <HighlightIncWordsCard
                        textValue={quest_data.QuestionStatement}
                        incorrectWords={quest_data.OptionNames}
                        correctWords={quest_data.AnswerNames}
                        setSelectedAnswers={setSelectedAnswers}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                      />
                    </div>
                    {/* <div style={{ position: "relative" }}>
                    <PurpleTextArea
                      placeholder="Write here..."
                      value={value}
                      rows={10}
                      onChange={handleChange}
                    />
                    <p style={{ position: "absolute", bottom: 0, right: 15 }}>
                      {value.split(" ").length - 1} Words
                    </p>
                  </div> */}
                  </>
                ) : quest.SubCategory === "Write from Dictation" ||
                  quest.SubCategory === "Summarize Spoken Text" ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "0.4rem",
                        gap: "0.2rem",
                      }}
                    >
                      <PurpleCopyPasteBtn onClick={handleCopy}>
                        Copy
                      </PurpleCopyPasteBtn>
                      <PurpleCopyPasteBtn onClick={handleCut}>
                        Cut
                      </PurpleCopyPasteBtn>
                      <PurpleCopyPasteBtn onClick={handlePaste}>
                        Paste
                      </PurpleCopyPasteBtn>
                    </div>
                    <div spellCheck={false} style={{ position: "relative" }}>
                      <PurpleTextArea
                        ref={textAreaRef}
                        placeholder="Write here..."
                        value={value}
                        rows={10}
                        onChange={handleChange}
                      />
                      <p style={{ position: "absolute", bottom: 0, right: 15 }}>
                        {
                          value
                            .trim()
                            .split(/\s+/)
                            .filter((word) => word).length
                        }{" "}
                        Words
                      </p>
                    </div>
                  </>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "25px",
                  }}
                >
                  <SaveExitBtn handleExit={handleExit} />
                  <PurpleBtn
                    onClick={() => handleNext()}
                    disabled={DisabledButton}
                  >
                    Next
                  </PurpleBtn>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
