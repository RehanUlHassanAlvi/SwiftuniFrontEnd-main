import React, { useEffect, useState, useRef } from "react";
import { CircularProgress, useMediaQuery, Alert } from "@mui/material";
import { PurpleTextArea } from "../Style";
import { PurpleBtn, PurpleCopyPasteBtn } from "../../Common/Style";
import {
  Email,
  Essay,
  GetMocktestQuestion,
  MakeQuestionAttempted,
  Summary,
} from "../../../Client/request";
import { useNavigate } from "react-router-dom";
import useStopwatch from "../../../hooks/useStopwatch";
import { Snackbar } from "@mui/joy";
import { rearrangeArray } from "../../../pages/WriteEssay";
import SaveExitBtn from "../SaveExitBtn";

const guideline = {
  "Write Email":
    "Read a description of a situation. Then write an e-mail about the situation. You will have nine minutes. You should aim to write at least 100 words. Write using complete sentences.",
  "Write Essay":
    "You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words.",
  "Summarize Written Text":
    "Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.",
};

export default function WritingSectional({
  ExamId,
  quest,
  setStep,
  step,
  totalQuestions,
  MockTestAttemptID,
  questionsTime,
  startStopwatch,
  stopStopwatch,
  resetQuestionTimer,
  endTestAndTimeout,
  submitTriggerRef, 
}) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [Quest_data, setQuest_data] = useState();
  const [Loading, setLoading] = useState(true);
  const [disabled, setdisabled] = useState(true);
  const [NetworkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function formatText(text) {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line.split("\\n").map((sent, i) => (
          <p style={{ margin: "0px" }} key={i}>
            {" "}
            {sent}
          </p>
        ))}
        <br />
      </React.Fragment>
    ));
  }

  const handleExit = () => {
    navigate("/MockTest");
  };

  useEffect(() => {
    if (quest) {
      setLoading(true);
      GetMocktestQuestion(quest.QuestionId).then((res) => {
        if (res.data) {
          setQuest_data(res.data);
          setLoading(false);
          setValue("");
          setdisabled(false);
          startStopwatch();
        }
      });
    }
  }, [quest]);

  useEffect(() => {
    if (submitTriggerRef && submitTriggerRef.current) {
      handleNext();
      submitTriggerRef.current = false;
    }
  }, [submitTriggerRef.current]);

  const handleNext = () => {
    if (value.trim() === "") {
      return;
    }
    setdisabled(true);
    stopStopwatch();
    if (quest.SubCategory === "Write Essay") {
      let minor_aspect = Quest_data.MinorAspects.flat();
      minor_aspect = rearrangeArray(minor_aspect);
      let AI_payload = {
        essay: value,
        major_aspect: Quest_data.MajorAspects.flat(),
        minor_aspect: Quest_data.MinorAspects.flat(),
        question: Quest_data.QuestionStatement,
      };

      Essay(AI_payload).then((res) => {
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
            // if (step === totalQuestions) {
            //   const payload = {
            //     mock_test_attempt_id: MockTestAttemptID
            //       ? MockTestAttemptID
            //       : ExamId,
            //     end_time: new Date().toLocaleDateString(),
            //   };
            //   EndTest(payload).then((res) => {
            //     if (res) {
            //       navigate("/MockTest");
            //     }
            //   });
            // }
            if (step === totalQuestions) {
              endTestAndTimeout().then(() => {});
            }
          });
        }
      });
    } else if (quest.SubCategory === "Summarize Written Text") {
      let AI_payload = {
        passage: Quest_data.QuestionStatement,
        pte_type: "pte academic",
        summary: value,
      };

      Summary(AI_payload).then((res) => {
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
            all_times: JSON.stringify({ Category: quest.Category }),
            is_ptecore: false,
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
            // if (step === totalQuestions) {
            //   const payload = {
            //     mock_test_attempt_id: MockTestAttemptID
            //       ? MockTestAttemptID
            //       : ExamId,
            //     end_time: new Date().toLocaleDateString(),
            //   };
            //   EndTest(payload).then((res) => {
            //     if (res) {
            //       navigate("/MockTest");
            //     }
            //   });
            // }
            if (step === totalQuestions) {
              endTestAndTimeout().then(() => {});
            }
          });
        }
      });
    } else if (quest.SubCategory === "Write Email") {
      let AI_payload = {
        desc: Quest_data.QuestionStatement,
        email: value,
        major_aspect: Quest_data.MajorAspects.flat(),
        minor_aspect: Quest_data.MinorAspects.flat(),
      };

      Email(AI_payload).then((res) => {
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
            all_times: JSON.stringify({ Category: quest.Category }),
            is_ptecore: false,
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
              const payload = {
                mock_test_attempt_id: MockTestAttemptID
                  ? MockTestAttemptID
                  : ExamId,
                end_time: new Date().toLocaleDateString(),
              };
              EndTest(payload).then((res) => {
                if (res) {
                  navigate("/MockTest");
                }
              });
            }
          });
        }
      });
    }
    resetQuestionTimer();
    if (step !== totalQuestions) {
      setStep(step + 1);
    }
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
          {Loading ? (
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
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "28px",
                  userSelect: "none",
                }}
                onCopy={(e) => e.preventDefault()}
              >
                {" "}
                {formatText(quest.QuestionStatement)}
              </h5>

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
                <PurpleCopyPasteBtn onClick={handleCut}>Cut</PurpleCopyPasteBtn>
                <PurpleCopyPasteBtn onClick={handlePaste}>
                  Paste
                </PurpleCopyPasteBtn>
              </div>

              <div spellCheck={false} style={{ position: "relative" }}>
                <PurpleTextArea
                  ref={textAreaRef}
                  placeholder="Write here..."
                  value={value}
                  rows={16}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "25px",
                }}
              >
                <SaveExitBtn handleExit={handleExit} />
                {disabled ? (
                  <PurpleBtn disabled={true}>Loading...</PurpleBtn>
                ) : (
                  <PurpleBtn
                    onClick={handleNext}
                    disabled={value.trim() === "" ? true : false}
                  >
                    Next
                  </PurpleBtn>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
