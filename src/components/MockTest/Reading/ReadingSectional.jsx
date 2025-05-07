import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Modal, useMediaQuery } from "@mui/material";
import { PurpleTextArea } from "../Style";
import { SWT_QCard_Div } from "../../../pages/Style";
import ReOrderParagraphs from "../../Reading/ReOrderParagraphs";
import FillBlanksCard from "../../Reading/FillBlanksCard";
import ReadingAndWritingBlanks from "../../Reading/ReadingAndWritingBlanks";
import { PurpleBtn } from "../../Common/Style";
import {
  EndTest,
  GetMocktestQuestion,
  MakeQuestionAttempted,
} from "../../../Client/request";
import { useNavigate } from "react-router-dom";
import useStopwatch from "../../../hooks/useStopwatchSectional";
import { Snackbar } from "@mui/joy";
import {
  FillBlanksCardData,
  ReadingAndWritingBlanksData,
} from "../../Reading/data";
import SaveExitBtn from "../SaveExitBtn";

const guideline = {
  "Reading & Writing: Fill in the Blanks":
    "Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.",
  "Multiple Choice, Multiple Answers":
    "Read the text and answer the question by selecting all the correct responses. You will need to select more than one response.",
  "Re-order Paragraphs":
    "The text boxes in the have been placed in random order. Restore the original order by dragging the text boxes up or down inside the panel.",
  "Reading: Fill in the Blanks":
    "In the text below some words are missing. Drag words from the box below to the appropriate place in the text. To undo an answer choice, drag the word back to the box below the text or drag thw word into another blank place.",
  "Multiple Choice, Single Answer":
    "Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct.",
};

function formatText(text) {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}

export default function ReadingSectional({
  ExamId,
  quest,
  setStep,
  step,
  totalQuestions,
  MockTestAttemptID,
  commulative,
  setCommulative,
  mockTestType,
  mockTestTypeId,
  questionsTime,
  startStopwatch,
  stopStopwatch,
  resetQuestionTimer,
  submitTriggerRef,
  questions,
}) {
  const [payload, setPayload] = useState({});
  const isLaptopTwo = useMediaQuery("(max-width:1000px)");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [SelectedAnswers, setSelectedAnswers] = useState([]);
  const [UO, setUO] = useState([]);
  const [modifiedTextValue, setModifiedTextValue] = useState("");
  const [textAnswers, setTextAnswers] = useState([""]);
  const [quest_data, setQuest_data] = useState();
  const [loading, setLoading] = useState(true);
  const [EndModal, setEndModal] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [NetworkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  const [completedAnswers, setCompletedAnswers] = useState({});
  const [currentSentence, setCurrentSentence] = useState("");

  useEffect(() => {
    if (quest_data && quest_data.QuestionStatement) {
      let newText = quest_data.QuestionStatement.replace(
        /%\{option_name\}/g,
        "#~#~#"
      )
        .replace(/#~#~#\./g, "#~#~# .")
        .replace(/\.#~#~#/g, ". #~#~#");

      setModifiedTextValue(newText);
    }
  }, [quest, quest_data]);

  useEffect(() => {
    console.log("textAnswers:", textAnswers);
    console.log("quest_data.AnswerNames:", quest_data?.AnswerNames);
  }, [textAnswers, quest_data]);

  useEffect(() => {
    let shouldDisable = false;

    // Check conditions based on question type
    if (quest.SubCategory === "Multiple Choice, Single Answer") {
      shouldDisable = selectedOptions.length === 0; // disable if no option selected
    } else if (quest.SubCategory === "Multiple Choice, Multiple Answers") {
      shouldDisable = selectedOptions.length === 0; // disable if no option selected
    } else if (quest.SubCategory === "Reading: Fill in the Blanks") {
      // Check if all blanks are filled for 'Reading: Fill in the Blanks'
      shouldDisable =
        !quest_data ||
        SelectedAnswers.length !== quest_data?.AnswerNames?.length ||
        SelectedAnswers.includes(null);
    } else if (quest.SubCategory === "Reading & Writing: Fill in the Blanks") {
      // Check if all dropdowns are selected for 'Reading & Writing: Fill in the Blanks'
      shouldDisable =
        !quest_data ||
        textAnswers.length !== quest_data?.AnswerNames?.length ||
        textAnswers.includes("");
    }

    console.log(
      "should Disable reading Next Btn: ",
      shouldDisable ? "Yes" : "No"
    );

    setdisabled(shouldDisable);
  }, [
    completedAnswers,
    selectedOptions,
    SelectedAnswers,
    textAnswers,
    quest,
    quest_data,
  ]);

  useEffect(() => {
    // console.log("payload", payload);
    // console.log("selectedoptions", selectedOptions);
    // console.log("selected", selectedOptions);
  }, [payload, selectedOptions, SelectedAnswers]);

  const handleChangeRadio = (e) => {
    setSelectedOptions(e.target.value);
  };

  const handleChange = (event) => {
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

  function getScore(questions, answers, option = 1) {
    // console.log("question", questions);
    // console.log("asnwers", answers);
    if (option === 1) {
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i] !== undefined && answers[i] !== undefined) {
          // console.log("questions[i]", questions[i]);
          // console.log("answers[i]", answers[i]);
          if (
            typeof questions[i] === "string" &&
            typeof answers[i] === "string" &&
            questions[i].toLowerCase() === answers[i].toLowerCase()
          ) {
            score++;
          } else if (questions[i] === answers[i]) {
            // console.log("type",typeof questions[i]);
            // console.log("op1",questions[i]);
            // console.log("op2",answers[i]);
            score++;
          }
        }
      }
      return score;
    } else if (option === 2) {
      let score = 0;
      questions.forEach((correctAnswer) => {
        const isCorrect = answers.includes(correctAnswer);
        if (isCorrect) {
          score += 1;
        }
      });
      answers.forEach((answer) => {
        const isCorrect = questions.includes(answer);
        if (!isCorrect) {
          score = Math.max(0, score - 1);
        }
      });
      return score;
    }
  }

  useEffect(() => {
    if (submitTriggerRef && submitTriggerRef.current) {

      if (!disabled) {
        handleNext(); 
      }

      forceSubmitLastReadingQuestion();

      submitTriggerRef.current = false;
    }
  }, [submitTriggerRef.current]);

  const handleNext = () => {
    if (disabled) {
      return;
    }
    if (step === totalQuestions) {
      setdisabled(true);
    }
    stopStopwatch();
    setCommulative(commulative + questionsTime / 1000);
    // console.log("elpased time", questionsTime / 1000);
    if (quest.SubCategory === "Reading & Writing: Fill in the Blanks") {
      const score = getScore(quest_data.AnswerNames, textAnswers);
      let response = {
        mockTestType: mockTestType,
        mockTestTypeId: mockTestTypeId,
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.AnswerNames,
        selectedAnswers: textAnswers,
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
        // setdisabled(false);
        setSelectedAnswers([]);
        setTextAnswers([""]);
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
          setEndModal(true);
          EndTest(payload).then((res) => {
            if (res) {
              setEndModal(false);
              navigate("/MockTest");
              // navigate(`/mt-score-viewscore-sectional/${MockTestAttemptID ? MockTestAttemptID : ExamId}`);
            }
          });
        }
      });
    } else if (quest.SubCategory === "Multiple Choice, Multiple Answers") {
      let score = getScore(quest_data.AnswerNames, selectedOptions, 2);
      let response = {
        mockTestType: mockTestType,
        mockTestTypeId: mockTestTypeId,
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

      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        // setdisabled(false);
        setSelectedOptions([]);
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
          setEndModal(true);
          EndTest(payload).then((res) => {
            if (res) {
              setEndModal(false);
              navigate("/MockTest");
              // navigate(`/mt-score-viewscore-sectional/${MockTestAttemptID ? MockTestAttemptID : ExamId}`);
            }
          });
        }
      });
    } else if (quest.SubCategory === "Re-order Paragraphs") {
      const index_arr = quest_data.AnswerNames.map((ans) =>
        quest_data.OptionNames.indexOf(ans)
      );
      let score = getScore(index_arr, UO, 1);
      let response = {
        mockTestType: mockTestType,
        mockTestTypeId: mockTestTypeId,
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        submissionResult: {
          userIndexes: UO,
          correctIndexes: index_arr,
          score: score,
        },
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

      // console.log("score",payload);
      MakeQuestionAttempted(payload).then((res) => {
        if (!quest.IsAttempted) {
          quest.IsAttempted = true;
        }
        // setdisabled(false);
        setUO();
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
          setEndModal(true);
          EndTest(payload).then((res) => {
            if (res) {
              setEndModal(false);
              navigate("/MockTest");
              // navigate(`/mt-score-viewscore-sectional/${MockTestAttemptID ? MockTestAttemptID : ExamId}`);
            }
          });
        }
      });
    } else if (quest.SubCategory === "Reading: Fill in the Blanks") {
      let score = getScore(quest_data.AnswerNames, SelectedAnswers);
      let response = {
        mockTestType: mockTestType,
        mockTestTypeId: mockTestTypeId,
        QuestionId: quest.QuestionId,
        QuestionStatement: quest.QuestionStatement,
        QuestionName: quest.QuestionName,
        Category: quest.Category,
        SubCategory: quest.SubCategory,
        correctAnswers: quest_data.AnswerNames,
        selectedAnswers: SelectedAnswers,
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
        // setdisabled(false);
        setSelectedAnswers([]);
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
          setEndModal(true);
          EndTest(payload).then((res) => {
            if (res) {
              setEndModal(false);
              navigate("/MockTest");
              // navigate(`/mt-score-viewscore-sectional/${MockTestAttemptID ? MockTestAttemptID : ExamId}`);
            }
          });
        }
      });
    } else if (quest.SubCategory === "Multiple Choice, Single Answer") {
      let score = getScore(quest_data.AnswerNames, [selectedOptions]);
      let response = {
        mockTestType: mockTestType,
        mockTestTypeId: mockTestTypeId,
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
        // setdisabled(false);
        setSelectedOptions([]);
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
          setEndModal(true);
          EndTest(payload).then((res) => {
            if (res) {
              setEndModal(false);
              navigate("/MockTest");
              // navigate(`/mt-score-viewscore-sectional/${MockTestAttemptID ? MockTestAttemptID : ExamId}`);
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

  const forceSubmitLastReadingQuestion = () => {
    const readingQuestions = questions.filter((q) => q.Category === "Reading");
    if (!readingQuestions.length) return;

    const lastReadingQ = readingQuestions[readingQuestions.length - 1];

    if (lastReadingQ.QuestionId === quest.QuestionId && disabled) {
      return;
    }

    GetMocktestQuestion(lastReadingQ.QuestionId).then((res) => {
      if (res.data) {
        console.log("Successfully fetched last reading question from server.");

        const fakeScore = -100;

        const forcedUserResponse = {
          QuestionId: lastReadingQ.QuestionId,
          QuestionName: lastReadingQ.QuestionName,
          Category: lastReadingQ.Category,
          SubCategory: lastReadingQ.SubCategory,
          autoAttemptedLastOnTimeUp: true,
        };

        const forcedPayload = {
          is_ptecore: false,
          marks_obtained: fakeScore,
          mock_test_question_id: lastReadingQ.MockTestQuestionTableId,
          user_response: JSON.stringify(forcedUserResponse),
          time_taken: 0,
          all_times: JSON.stringify({
            Category: lastReadingQ.Category,
            commulativeTime: commulative + questionsTime / 1000,
          }),
          mock_test_attempt_id: MockTestAttemptID ? MockTestAttemptID : ExamId,
        };

        MakeQuestionAttempted(forcedPayload)
          .then((response) => {
            console.log("Successfully forced submission of last Reading question.", response);
            lastReadingQ.IsAttempted = true;
          })
          .catch((err) => {
            console.error("Error forcibly submitting last Reading question: ", err);
          });
      }
    });
  };

  useEffect(() => {
    if (quest) {
      setLoading(true);
      GetMocktestQuestion(quest.QuestionId).then((res) => {
        if (res.data) {
          setQuest_data(res.data);
          setLoading(false);
          console.log("Starting stopwatch for reading Question.");
          startStopwatch();
        }
      });
    }
  }, [quest]);

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

    const intervalId = setInterval(displayRandomText, 2000);

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
          {loading ? (
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
              {quest.SubCategory === "Re-order Paragraphs" ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    userSelect: "none",
                  }}
                  onCopy={(e) => e.preventDefault()}
                >
                  <ReOrderParagraphs
                    // key={`re-order-paragraph-${quest.num}`}
                    OptionNames={quest_data.OptionNames}
                    setUserOrder={setUO}
                  />
                </div>
              ) : quest.SubCategory === "Reading: Fill in the Blanks" ? (
                <div
                  style={{
                    userSelect: "none",
                  }}
                  onCopy={(e) => e.preventDefault()}
                >
                  <FillBlanksCard
                    id={FillBlanksCardData[0].id}
                    textValue={modifiedTextValue}
                    fillingWords={quest_data.OptionNames}
                    setSelectedAnswers={setSelectedAnswers}
                  />
                </div>
              ) : quest.SubCategory ===
                "Reading & Writing: Fill in the Blanks" ? (
                <div
                  style={{
                    userSelect: "none",
                  }}
                  onCopy={(e) => e.preventDefault()}
                >
                  <ReadingAndWritingBlanks
                    id={ReadingAndWritingBlanksData[0].id}
                    textValue={quest_data.QuestionStatement}
                    dropDownOptions={quest_data.OptionNames}
                    setSelectedAnswers={setTextAnswers}
                  />
                </div>
              ) : null}

              {(quest.SubCategory === "Multiple Choice, Multiple Answers" ||
                quest.SubCategory === "Multiple Choice, Single Answer") && (
                <div
                  style={{
                    fontFamily: "Noto Sans",
                    fontSize: "18px",
                    fontWeight: 500,
                    userSelect: "none",
                  }}
                  onCopy={(e) => e.preventDefault()}
                >
                  {quest_data.QuestionStatement}
                  <div>
                    {quest_data.OptionNames.map((option, index) => {
                      const label = option; // Extracts 'a', 'b', 'c', etc.
                      return (
                        <div
                          key={index}
                          style={{
                            paddingTop: "15px",
                            fontSize: "17px",
                            fontWeight: 400,
                          }}
                        >
                          <label>
                            {quest.SubCategory ===
                            "Multiple Choice, Single Answer" ? (
                              <input
                                type="radio"
                                name="options"
                                value={label}
                                checked={selectedOptions === label}
                                onChange={handleChangeRadio}
                              />
                            ) : (
                              <input
                                type="checkbox"
                                value={label}
                                checked={selectedOptions.includes(label)}
                                onChange={handleChange}
                              />
                            )}
                            {option}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "25px",
                }}
              >
                <SaveExitBtn handleExit={handleExit} />
                {disabled && step === totalQuestions ? (
                  <PurpleBtn disabled={true}>Loading...</PurpleBtn>
                ) : (
                  <PurpleBtn
                    onClick={() => {
                      if (!disabled) handleNext(); // Only execute handleNext if the button is not disabled
                    }}
                    // disabled={
                    //   quest.SubCategory === "Reading: Fill in the Blanks" &&
                    //   SelectedAnswers.length !== quest_data.AnswerNames.length
                    //     ? true
                    //     : false
                    // }
                    disabled={
                      disabled ||
                      (quest.SubCategory === "Re-order Paragraphs" && false)
                    }
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
