import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, useMediaQuery, Modal, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/joy";
import RecordingComponent from "./RecordingComponent";
import Filler from "../../../assets/audios/filler_audio.mp3";
import { PurpleBtn } from "../../Common/Style";
import SaveExitBtn from "../SaveExitBtn";

import {
  AnswerShortQuestion,
  DescribeImage,
  EndTest,
  GetMocktestQuestion,
  MakeQuestionAttempted,
  ReadAloud,
  RepeatSentence,
  RespondToSituation,
  RetellLecture,
} from "../../../Client/request";
import { Base_URL } from "../../../Client/apiURL";
import axios from "axios";

const guideline = {
  "Read Aloud": "Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.",
  "Repeat Sentence": "You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.",
  "Describe Image": "Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing. You will have 40 seconds to give your response.",
  "Re-tell Lecture": "You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words. You will have 40 seconds to give your response. You may also see an image sometimes.",
  "Respond to a situation": "Listen to and read a description of a situation. You will have 20 seconds to think about your answer. Then you will hear a beep. You will have 15 seconds to answer the question. Please answer as completely as you can.",
  "Answer Short Question": "You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.",
};

export default function SpeakingSectional({
  ExamId,
  quest,
  step,
  setStep,
  MockTestAttemptID,
  totalQuestions,
  commulative,
  setCommulative,
  questionsTime,
  startStopwatch,
  stopStopwatch,
  resetQuestionTimer,
  mockTestType,
  mockTestTypeId,
  endTestAndTimeout,
}) {
  const [Loading, setLoading] = useState(true);
  const [ImageLoading, setImageLoading] = useState(true);
  const [questData, setQuestData] = useState(null);
  const [recordedAudioFile, setRecordedAudioFile] = useState(null);
  const [recordedWavFile, setRecordedWavFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [tempTranscript, setTempTranscript] = useState("");
  const [DisabledButton, setDisabledButton] = useState(true);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [NetworkError, setNetworkError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [EndModal, setEndModal] = useState(false);
  const [currentSentence, setCurrentSentence] = useState("");

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();

  const isLaptopTwo = useMediaQuery("(max-width:1000px)");
  const isLaptopOne = useMediaQuery("(max-width:1400px)");

  useEffect(() => {
    if (quest) {
      setLoading(true);
      setTranscript("");
      GetMocktestQuestion(quest.QuestionId).then((res) => {
        if (res.data) {
          setQuestData(res.data);
          setLoading(false);
          startStopwatch();
        }
      });
    }
  }, [quest]);

  useEffect(() => {
    if (recordedAudioFile && recordedAudioFile.size > 0 && !transcriptLoading) {
      if (step !== totalQuestions) {
        setStep(step + 1);
      }
      setLoading(true);
  
      const timeSpent = questionsTime / 1000;
      const updatedCommulative = commulative + timeSpent;
      setCommulative(updatedCommulative);
  
      const payload = {
        mock_test_question_id: quest.MockTestQuestionTableId,
        marks_obtained: 100,
        user_response: JSON.stringify({
          mockTestType: mockTestType,
          mockTestTypeId: mockTestTypeId,
          QuestionId: quest.QuestionId,
          QuestionStatement: quest.QuestionStatement,
          QuestionName: quest.QuestionName,
          Category: quest.Category,
          SubCategory: quest.SubCategory,
          UserResponse: tempTranscript || "",
        }),
        time_taken: timeSpent,
        all_times: JSON.stringify({
          Category: quest.Category,
          commulativeTime: updatedCommulative,
        }),
        is_ptecore: false,
        mock_test_attempt_id: MockTestAttemptID || ExamId,
      };
  
      const questionHandlers = {
        "Read Aloud": () =>
          ReadAloud({
            audiofile: recordedAudioFile,
            script: questData.QuestionStatement,
            user_response: tempTranscript,
          }),
        "Repeat Sentence": () =>
          RepeatSentence({
            audiofile: recordedAudioFile,
            correct_text: questData.QuestionStatement,
            user_text: tempTranscript,
          }),
        "Describe Image": () =>
          DescribeImage({
            audiofile: recordedAudioFile,
            user_text: tempTranscript,
            major_aspects: JSON.stringify(questData.MajorAspects.flat()),
            minor_aspects: JSON.stringify(questData.MinorAspects.flat()),
          }),
        "Re-tell Lecture": () =>
          RetellLecture({
            audiofile: recordedAudioFile,
            script: questData.QuestionStatement,
            user_response: tempTranscript,
          }),
        "Respond to a situation": () =>
          RespondToSituation({
            audiofile: recordedAudioFile,
            user_text: tempTranscript,
            major_aspects: JSON.stringify(questData.MajorAspects.flat()),
            minor_aspects: JSON.stringify(questData.MinorAspects.flat()),
          }),
        "Answer Short Question": () =>
          AnswerShortQuestion({
            question: questData.QuestionStatement,
            user_answer: tempTranscript,
            answer_list: questData.OptionNames,
          }),
      };
  
      if (questionHandlers[quest.SubCategory]) {
        questionHandlers[quest.SubCategory]().then(async (res) => {
          if (res.data) {
 
            if (!recordedWavFile) {
              console.error("No audio file found to generate url. Continuing...");
            }

            const signedUrlRes = await getSignedURL();
            if (!signedUrlRes || signedUrlRes.responseCode !== 200) {
              console.error("Failed to get signed URL. Continuing...");
            }
      
            const uploadSuccess = await uploadAudioFile(
              signedUrlRes.response,
              recordedWavFile
            );
      
            if (!uploadSuccess) {
              console.error("Failed to upload audio file");
            }
      
            const usersRecordingURL = `https://swift-uni-user-images.s3.us-east-1.amazonaws.com/${signedUrlRes.key}`;

            payload.user_response = JSON.stringify({
              ...JSON.parse(payload.user_response),
              AI_response: JSON.stringify(res.data),
              audio_url: usersRecordingURL || null,
            });
  
            MakeQuestionAttempted(payload).then((res) => {
              if (!quest.IsAttempted) {
                quest.IsAttempted = true;
              }
              setRecordedAudioFile(null);
              if (res.error) {
                setNetworkError(true);
                setTimeout(() => navigate("/MockTest"), 2000);
              }
              // if (step === totalQuestions) {
              //   EndTest({
              //     mock_test_attempt_id: MockTestAttemptID || ExamId,
              //     end_time: new Date().toLocaleDateString(),
              //   }).then(() => navigate("/MockTest"));
              // }
              if (step === totalQuestions) {
                setEndModal(true);
                endTestAndTimeout().then(() => {
                  setEndModal(false);
                });
              }
            });
          }
        });
      }
  
      resetQuestionTimer();
      setQuestData(null);
    }
  }, [recordedAudioFile, transcriptLoading]);

  function formatText(text) {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  const handleNext = () => {
    if (DisabledButton) return;
    if (audioRef.current) audioRef.current.pause();

    setClicked((prev) => !prev);
    setTempTranscript(transcript);
    setDisabledButton(true);
    stopStopwatch();
  };

  const handleExit = () => {
    if (audioRef.current) audioRef.current.pause();
  navigate("/MockTest");
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
    "Please wait your Speaking test result is being processed",
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

  const handleRecordedWavBlob = (file) => {
    setRecordedWavFile(file);
  };

  const getSignedURL = async () => {
    const config = {
      method: "get",
      url: `${Base_URL}/app/users/mock-attempted-questions/signed-url`,
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error getting signed URL:", error);
      return { error: error.message };
    }
  };

  const uploadAudioFile = async (signedUrl, file) => {
    try {
      const res = await axios.put(signedUrl, file, {
        withCredentials: false,
        headers: {
          "Content-Type": file.type,
        },
      });
      return res.status === 200;
    } catch (error) {
      console.error("Error uploading audio file:", error);
      return false;
    }
  };

  // ----------------- Render ----------------- //
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        open={NetworkError}
        color="danger"
        onClose={() => setNetworkError(false)}
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
            width: "100%",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Progress Bar */}
          <div style={{ backgroundColor: "#e2e2ea", height: "13px" }}></div>
          <div
            style={{
              width: `${(step / totalQuestions) * 100}%`,
              backgroundColor: "#996cfe",
              height: "13px",
            }}
          ></div>

          {Loading ? (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                minHeight: "50vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div style={{ padding: "20px", marginTop: "20px" }}>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: "32px",
                }}
              >
                {guideline[quest.SubCategory]}
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: isLaptopOne ? "column" : "row",
                }}
              >
                {quest.SubCategory === "Describe Image" && (
                  <div
                    style={{
                      minWidth: isLaptopOne ? "100px" : "627px",
                      minHeight: isLaptopOne ? "100px" : "536px",
                      backgroundColor: "rgba(153, 108, 254, 0.10)",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {ImageLoading && <CircularProgress />}
                    <img
                      src={questData?.QuestionImage}
                      alt="img"
                      onLoad={() => setImageLoading(false)}
                      style={{
                        maxWidth: "80%",
                        maxHeight: "90%",
                        display: ImageLoading ? "none" : "block",
                      }}
                    />
                  </div>
                )}

                {questData.QuestionImage && quest.SubCategory === "Re-tell Lecture" && (
                  <div
                    style={{
                      minWidth: isLaptopOne ? "100px" : "627px",
                      minHeight: isLaptopOne ? "100px" : "536px",
                      maxWidth: "800px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(153, 108, 254, 0.10)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center", 
                      justifyContent: "center", 
                    }}
                  >
                    {ImageLoading && <CircularProgress />}
                    <img
                      src={questData.QuestionImage}
                      alt="img"
                      onLoad={() => {
                        setImageLoading(false);
                      }}
                      style={{
                        maxWidth: "80%", 
                        maxHeight: "90%",
                        display: ImageLoading ? "hidden" : "block",
                      }}
                    />
                  </div>
                )}

                <div style={{ width: isLaptopOne ? "100%" : "40%" }}>
                  {questData && (
                    <RecordingComponent
                      callNext={handleNext}
                      setTempTranscript={setTempTranscript}
                      clicked={clicked}
                      step={step}
                      transcript={transcript}
                      setRecordedAudioFile={setRecordedAudioFile}
                      handleRecordedWavBlob={handleRecordedWavBlob}
                      setTranscript={setTranscript}
                      Beginning={
                        quest.SubCategory === "Read Aloud"
                        ? 0
                        : quest.SubCategory === "Answer Short Question"
                        ? 3
                        : quest.SubCategory === "Describe Image"
                        ? 0
                        : quest.SubCategory === "Re-tell Lecture"
                        ? 3
                        : quest.SubCategory === "Respond to a situation"
                        ? 3
                        : quest.SubCategory === "Repeat Sentence"
                        ? 3
                        : 0
                      }
                      Waiting={
                        quest.SubCategory === "Read Aloud"
                        ? 35
                        : quest.SubCategory === "Answer Short Question"
                        ? 2
                        : quest.SubCategory === "Describe Image"
                        ? 25
                        : quest.SubCategory === "Re-tell Lecture"
                        ? 10
                        : quest.SubCategory === "Respond to a situation"
                        ? 20
                        : quest.SubCategory === "Repeat Sentence"
                        ? 2
                        : 0
                      }
                      RecordingTime={
                        quest.SubCategory === "Read Aloud"
                        ? 40
                        : quest.SubCategory === "Answer Short Question"
                        ? 7
                        : quest.SubCategory === "Re-tell Lecture"
                        ? 40
                        : quest.SubCategory === "Repeat Sentence"
                        ? 15
                        : quest.SubCategory === "Respond to a situation"
                        ? 15
                        : quest.SubCategory === "Describe Image"
                        ? 40
                        : 0
                      }
                      audio={
                        quest.SubCategory === "Describe Image" ||
                        quest.SubCategory === "Read Aloud"
                          ? null
                          : questData.AudioObjects[0]?.audio_url || questData.AudioObjects[0]?.url || Filler
                      }
                      MicAudioRef={audioRef}
                      setDisabledButton={setDisabledButton}
                      mediaRecorderRef={mediaRecorderRef}
                      setTranscriptLoading={setTranscriptLoading}
                    />
                  )}
                </div>
              </div>

              {(quest.SubCategory === "Read Aloud" || quest.SubCategory === "Respond to a situation") && questData?.QuestionStatement && (
                <h5 style={{ fontSize: "18px", fontWeight: 400, lineHeight: "28px" }}>
                  {formatText(questData.QuestionStatement)}
                </h5>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "45px",
                }}
              >
                <SaveExitBtn handleExit={handleExit} />
                <PurpleBtn onClick={handleNext} disabled={DisabledButton}>
                  Next
                </PurpleBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}