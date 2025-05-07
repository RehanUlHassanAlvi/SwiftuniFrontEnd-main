import React, { useEffect, useState, useCallback } from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  AppearedDiv,
  Heading,
  MainLogo,
  NewDiv,
  PracticedDiv,
  PredictionDiv,
  QuestionNoDiv,
  RemainingTimeText,
  SerialNo,
  SmallImgs,
  SubHeading,
  TestDiv,
  BookMarkImg,
  BlinkText,
  RecordedText,
  RecordingImage,
  TimeCounterText,
} from "./Style";
import BookmarkUnfilled from "../../assets/images/Bookmark.svg";
import BookmarkFilled from "../../assets/images/save-icon.svg";
import { useMediaQuery } from "@mui/material";
import { ToolTipText } from "../notes/style";
import { Tooltip } from "@mui/material";
import Note from "../notes/Note";
import Appeared from "../AppearedCount/Appeared";
import DictionaryOpen from "../Dictionary/DictionaryOpen";
import RecordingIcon from "../../assets/images/recording-video-icon.svg";
import { Base_URL } from "../../Client/apiURL";
// import RecordingIcon from "../../assets/images/record.png";

const TestHeading = ({
  logo,
  heading,
  subheading,
  serialNo,
  questionName = null,
  addDictionary = true,
  isSubmitted,
  setElapsedTime,
  totalTestTime,
  triggerReset,
  timerMode = "incremental",
  testQuestionTableId,
  questionId,
  appearedCount,
  IsBookMarked,
  BookMarkedId,
  onBookmarkChange,
  dictionaryText,
  dictionaryArrayText,
  onCountdownComplete,
  isSpeakingTest,
  preTestCountdownTime = 3,
  isRecordingStarted = false,
  isRecordingStopped = false,
  isAudioPlayerComponent = false,
  isAudioCompleted = false,
  testAttemptedCount,
  isPrediction = false,
  isNew = false,
  // setIsRecordingStarted,
  // setAutoStartRecording,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [preTestCountdown, setPreTestCountdown] =
    useState(preTestCountdownTime);
  const [time, setTime] = useState(0);
  const [bookmark, setBookmark] = useState(IsBookMarked);
  // const [displayQuestionName, setDisplayQuestionName] = useState("loading");

  // useEffect(() => {
  //   const storedQuestionName = sessionStorage.getItem("SearchedQuestion_QuestionName");

  //   if (storedQuestionName) {
  //     setDisplayQuestionName(storedQuestionName);
  //     sessionStorage.removeItem("SearchedQuestion_QuestionName");
  //   } else {
  //     setDisplayQuestionName(questionName);
  //   }
  // }, [questionName]);

  useEffect(() => {
    if (isSpeakingTest && preTestCountdown === 0) {
      onCountdownComplete && onCountdownComplete();
    }
  }, [preTestCountdown, onCountdownComplete, isSpeakingTest]);

  useEffect(() => {
    if (isRecordingStarted) {
      setPreTestCountdown(0);
    } else if (preTestCountdown > 0) {
      const interval = setInterval(() => {
        setPreTestCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [preTestCountdown, isRecordingStarted]);

  const updateTime = useCallback(() => {
    setTime((prevTime) => {
      if (timerMode === "incremental") {
        return prevTime + 1;
      } else {
        return prevTime > 0 ? prevTime - 1 : 0;
      }
    });
  }, [timerMode]);

  useEffect(() => {
    let interval;
    if (isRecordingStarted && !isRecordingStopped) {
      interval = setInterval(updateTime, 1000);
    } else if (
      (preTestCountdown <= 0 || isRecordingStarted) &&
      !isSubmitted &&
      !isRecordingStopped
    ) {
      if (
        !isAudioPlayerComponent ||
        (isAudioPlayerComponent && isAudioCompleted)
      ) {
        interval = setInterval(updateTime, 1000);
      }
    }

    if (isRecordingStopped) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [
    preTestCountdown,
    isSubmitted,
    updateTime,
    isRecordingStopped,
    isRecordingStarted,
    isAudioPlayerComponent,
    isAudioCompleted,
  ]);

  useEffect(() => {
    if (isSubmitted || isRecordingStopped) {
      // clearInterval(interval);
      if (timerMode === "incremental") {
        setElapsedTime(time);
      } else {
        const elapsedDecrementalTime = totalTestTime - time;
        setElapsedTime(elapsedDecrementalTime);
      }
    }
  }, [
    isSubmitted,
    isRecordingStopped,
    setElapsedTime,
    time,
    timerMode,
    totalTestTime,
  ]);

  useEffect(() => {
    setPreTestCountdown(preTestCountdownTime);
    setTime(timerMode === "incremental" ? 0 : totalTestTime);
  }, [triggerReset, timerMode, totalTestTime]);

  const displayTime = () => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    setBookmark(IsBookMarked);
  }, [IsBookMarked]);

  const handleBookmarkClick = async () => {
    const endpoint = IsBookMarked
      ? `${Base_URL}/app/users/bookmarks?bookmark_id=${BookMarkedId}`
      : `${Base_URL}/app/users/bookmarks?test_question_id=${testQuestionTableId}`;

    const method = IsBookMarked ? "DELETE" : "GET";

    try {
      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.responseCode === 200) {
        onBookmarkChange(
          !IsBookMarked,
          method === "GET" ? responseData.response : null
        );
      } else {
        throw new Error("Failed to update bookmark");
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  return (
    <TestDiv>
      <FlexDiv
        style={{
          justifyContent: "flex-start",
          gap: "1.25rem",
          alignItems: "flex-start",
        }}
      >
        <MainLogo alt="" src={logo} />
        <div>
          <Heading>{heading}</Heading>
          <SubHeading>{subheading}</SubHeading>
        </div>
      </FlexDiv>
      <QuestionNoDiv>
        <FlexDiv
          style={{
            gap: isMobile ? "" : "1.25rem",
            flexDirection: isMobile ? "column" : "",
            alignItems: isMobile ? "flex-start" : "",
          }}
        >
          <SerialNo>{serialNo}</SerialNo>
          <SerialNo>{questionName}</SerialNo>
          {/* <SerialNo>{displayQuestionName}</SerialNo> */}
        </FlexDiv>
        <FlexDiv
          style={{
            gap: "0.63rem",
          }}
        >
          {addDictionary && (
            <DictionaryOpen
              paragraphText={dictionaryText}
              arrayText={dictionaryArrayText}
            />
          )}

          <Note testQuestionTableId={testQuestionTableId} />

          <Tooltip title={<ToolTipText>Bookmark</ToolTipText>} arrow>
            <BookMarkImg
              alt="Bookmark"
              src={bookmark ? BookmarkFilled : BookmarkUnfilled}
              onClick={handleBookmarkClick}
            />
          </Tooltip>

          <Appeared appearedCount={appearedCount} questionId={questionId} />
        </FlexDiv>
      </QuestionNoDiv>
      <FlexDiv
        style={{
          justifyContent: "space-between",
          marginTop: "1rem",
          alignItems: "center",
        }}
      >
        {questionId ? (
          <>
            <RemainingTimeText>
              {isSpeakingTest ? (
                isRecordingStarted && !isRecordingStopped ? (
                  <RecordingImage src={RecordingIcon} alt="Rec Icon" />
                ) : isRecordingStopped ? (
                  <RecordedText>Recorded</RecordedText>
                ) : preTestCountdown > 0 ? (
                  <>
                    Beginning in{" "}
                    <TimeCounterText>{preTestCountdown}</TimeCounterText> sec
                  </>
                ) : (
                  "Recording will start automatically after audio play or start manually."
                )
              ) : preTestCountdown > 0 ? (
                <>
                  Beginning in{" "}
                  <TimeCounterText>{preTestCountdown}</TimeCounterText> sec
                </>
              ) : (
                <>
                  Time: <TimeCounterText>{displayTime()}</TimeCounterText> sec
                </>
              )}
            </RemainingTimeText>
          </>
        ) : (
          <>
            <RemainingTimeText></RemainingTimeText>
          </>
        )}

        <FlexDiv
          style={{
            gap: "0.63rem",
          }}
        >
          {isNew && <NewDiv>New</NewDiv>}
          {isPrediction && <PredictionDiv>Prediction</PredictionDiv>}
          <PracticedDiv>Practiced ({testAttemptedCount})</PracticedDiv>
        </FlexDiv>
      </FlexDiv>
    </TestDiv>
  );
};

export default TestHeading;
