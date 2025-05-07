import React, { useEffect, useState, useRef } from "react";
import TestHeading from "../components/Common/TestHeading";
import RALogo from "../assets/images/S_RA_Logo.svg";
import { S_RA_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { modalStyle, NavBlock, ScrollableContainer, SWT_MCQCard_Div, SWT_QCard_Div } from "./Style";
import { AiScorePopupSpeakingData } from "../components/Speaking/data";
import SpeakingMicCard from "../components/Speaking/SpeakingMicCard";
import QuestionCard from "../components/Speaking/QuestionCard";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import { useAuth } from "../authentication/Auth";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { ScrollableContainerDiv, ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import axios from "axios";
import AiScorePopupSpeakingRA from "../components/Speaking/AiScorePopupSpeakingRA";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL, Base_URL_AiScore } from "../Client/apiURL";
import TestHeadingRA from "../components/Common/TestHeadingRA";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Read Aloud";

const SpeakingRA = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState("");
  const [resetTrigger, setResetTrigger] = useState(false);
  const [raScore, setRAScore] = useState("");
  const [totalTestTime, setTotalTestTime] = useState(40000);
  
  const {
    fetchData,
    handleFiltersAndFetch,
    testQuestions,
    setTestQuestions,
    questionsData,
    setQuestionsData,
    isDataLoading,
    setIsDataLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    wantToSortDesc,
    setWantToSortDesc,
    highFrequency,
    setHighFrequency,
    isPracticed,
    setIsPracticed,
    difficulty,
    setDifficulty,
    isEasy,
    setIsEasy,
    filterBookmarked,
    setFilterBookmarked,
    filterPrediction,
    setFilterPrediction,
    searchTerm,
    setSearchTerm,
    sessionLoading,
    setSessionLoading,
    setPageReloaded,
    pageReloaded,
    questionId,
    setQuestionId,
    testQuestionTableId,
    setTestQuestionTableId,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    isBookmarked,
    setIsBookmarked,
    bookmarkId,
    setBookmarkId,
    testAttemptedCount,
    setTestAttemptedCount,
    storeQuestionInSession,
    handleNextQuestion,
    handlePreviousQuestion,
    calculateDaysDifference,
    updateLocalQuestionBookmark,
    handleBookmarkChange,
    handleMyAttemptedQuestionsScore,
    setMyAttemptedQuestionsScore,
    myAttemptedQuestionsScore,
    setShouldOpenScorecard,
    shouldOpenScorecard,
    setScorecardOpen,
    scorecardOpen,
    setIsSidePanelOpen,
    isSidePanelOpen,
    // setSelectedAnswers,
    // selectedAnswers,
    setShowAnswer,
    showAnswer,
    setIsSubmitted,
    isSubmitted,
    elapsedTime,
    setElapsedTime,
    triggerReset,
    setTriggerReset,
    setEnableSkillsData,
    enableSkillsData,
    setScoreDataSubmitted,
    scoreDataSubmitted,
    marksObtained,
    setMarksObtained,
    correctAnswers,
    setCorrectAnswers,
    isScoreDataReadyForSubmit,
    setIsScoreDataReadyForSubmit,
    lastScoreUpdate,
    setLastScoreUpdate,
    isPteCore,

    getSignedURL,
    uploadAudioFile,
    handleAudioCompletion,
    handleRecordingStart,
    handleRecordingStop,
    handleSetRecordedWavFile,
    handleSetCanSubmit,
    getQuestionName,

    audioRef,
    isAudioCompleted,
    setIsAudioCompleted,
    isRecordingStarted,
    setIsRecordingStarted,
    isRecordingStopped,
    setIsRecordingStopped,
    isAudioPlayerDisabled,
    setIsAudioPlayerDisabled,
    recordedWavFile,
    setRecordedWavFile,
    canSubmit,
    setCanSubmit,
    recordedAudio,
    setRecordedAudio,
    autoStartRecording,
    setAutoStartRecording,
    audioURL,
    setAudioURL,
    urlLoading,
    setUrlLoading,
    isLoading,
    setIsLoading,
  } = useTestQuestions();

  useEffect(() => {
    handleFiltersAndFetch(questionname);
  }, [
    page,
    wantToSortDesc, 
    highFrequency, 
    isPracticed, 
    difficulty, 
    filterBookmarked, 
    filterPrediction,
    searchTerm,
    questionname,
    sessionLoading
  ]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("scorecard");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setScorecardOpen(false);
        setElapsedTime(0);
        setEnableSkillsData([]);
        setMyAttemptedQuestionsScore(null);
        setMarksObtained(0);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!recordedWavFile) {
      console.error("No audio file to upload");
      setIsLoading(false);
      return;
    }

    try {
      // Upload the audio first
      const signedUrlRes = await getSignedURL();
      if (!signedUrlRes || signedUrlRes.responseCode !== 200) {
        console.error("Failed to get signed URL");
        setIsLoading(false);
        return;
      }

      const uploadSuccess = await uploadAudioFile(
        signedUrlRes.response,
        recordedWavFile
      );
      if (!uploadSuccess) {
        console.error("Failed to upload audio file");
        setIsLoading(false);
        return;
      }

      setAudioURL(`https://swift-uni-user-images.s3.us-east-1.amazonaws.com/${signedUrlRes.key}`);

      if (questionsData && recordedWavFile) {
        const file = new File([recordedWavFile], "audiofile.wav", {
          type: "audio/wav",
          lastModified: new Date(),
        });

        const formData = new FormData();
        formData.append("audiofile", file);
        formData.append("script", questionsData?.response?.QuestionStatement);
        formData.append("user_response", selectedAnswers);

        const response = await fetch(`${Base_URL_AiScore}/readaloud`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok && data) {
          setRAScore(data);
          setIsSubmitted(true);
          setScorecardOpen(true);
          setIsScoreDataReadyForSubmit(true);
        } else {
          logout();
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function submitScoreData() {
      const userResponse = {
        correctAnswers: questionsData?.response?.QuestionStatement,
        selectedAnswers: selectedAnswers,
        raScore: raScore,
        audioURL: audioURL,
      };

        

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained:
        (raScore.content_score +
          raScore.pronounciation_score +
          raScore.fluency_score) > 0 ? Math.round(    (raScore.content_score +
            raScore.pronounciation_score +
            raScore.fluency_score) / 3) : 0,
        user_response: JSON.stringify(userResponse),
        time_taken: elapsedTime,
        is_ptecore: false,
      };

      try {
        const response = await fetch(
          `${Base_URL}/app/users/attempted-questions/add`,
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        if (data.responseCode === 200) {
          setScoreDataSubmitted(true);
          setIsScoreDataReadyForSubmit(false);
          setLastScoreUpdate(Date.now());
          // fetchData();
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to submit score data:", error);
      }
    }

    const shouldSubmitScore =
      isScoreDataReadyForSubmit &&
      !scoreDataSubmitted &&
      elapsedTime &&
      audioURL;
    if (shouldSubmitScore) {
      submitScoreData();
    }
  }, [isScoreDataReadyForSubmit, scoreDataSubmitted, elapsedTime, audioURL]);

  const resetState = () => {
    setSelectedAnswers([]);
    // setShowScript(false);
    setScorecardOpen(false);
    setCanSubmit(false);
    setElapsedTime(0);
    setIsSubmitted(false);
    setTotalTestTime(totalTestTime);
    setEnableSkillsData([]);
    setScoreDataSubmitted(false);
    setMyAttemptedQuestionsScore(null);
    setMarksObtained(0);
    setShouldOpenScorecard(false);
    setResetTrigger((prevState) => !prevState);
    setRecordedAudio("");
    setIsRecordingStopped(false);
    setIsRecordingStarted(false);
    setAudioURL("");
    setIsAudioPlayerDisabled(false);
    setAutoStartRecording(false);
  };

  useEffect(() => {
    resetState();
  }, [questionId]);

  const handleRedo = () => {
    resetState();
  };

  return (
    <>
      {isDataLoading && <LoadingModal />}
      <div id="scorecardd">
        {scorecardOpen && questionsData?.response && (
          <Modal isOpen={scorecardOpen} style={modalStyle}>
            <AiScorePopupSpeakingRA
              key={AiScorePopupSpeakingData[0].key}
              SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
              enableSkillsScore={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).raScore
                  : raScore
              }
              allData={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).raScore
                  : raScore
              }
              UserResponse={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .selectedAnswers
                  : selectedAnswers
              }
              recordedAudio={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).audioURL
                  : audioURL
              }
              OriginalText={questionsData?.response.QuestionStatement}
              elapsedTime={
                myAttemptedQuestionsScore
                  ? myAttemptedQuestionsScore.TimeTaken
                  : elapsedTime
              }
              close={setScorecardOpen}
              contentTotalScore={5}
              totalScore={15}
              two={true}
            />
          </Modal>
        )}
      </div>
      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={RALogo}
        testQuestions={testQuestions?.response || []}
        totalTestQuestions = {testQuestions.totalQuestions}
        questionId={questionId}
        setQuestionId={setQuestionId}
        testQuestionTableId={testQuestionTableId}
        setTestQuestionTableId={setTestQuestionTableId}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterBookmarked={filterBookmarked}
        setFilterBookmarked={setFilterBookmarked}
        filterPrediction={filterPrediction}
        setFilterPrediction={setFilterPrediction}
        // difficulty={difficulty}
        // setDifficulty={setDifficulty}
        // isEasy={isEasy}
        // setIsEasy={setIsEasy}
        highFrequency={highFrequency}
        setHighFrequency={setHighFrequency}
        isPracticed={isPracticed}
        setIsPracticed={setIsPracticed}
        wantToSortDesc={wantToSortDesc}
        setWantToSortDesc={setWantToSortDesc}
        isDataLoading={isDataLoading}
        setIsDataLoading={setIsDataLoading}
        setSelectedAnswers={setSelectedAnswers}
        setTriggerReset={setResetTrigger}
        onToggle={setIsSidePanelOpen}
        updateLocalQuestionBookmark={updateLocalQuestionBookmark}
        // setAutoStartRecording={setAutoStartRecording}
        setQuestionsData={setQuestionsData}
        handleFiltersAndFetch={handleFiltersAndFetch}
        storeQuestionInSession={storeQuestionInSession}
      />

      <Navbar />
      <NavBlock />
      <ScrollableDiv>
        <FlexDiv style={{ width: "100%" }}>
          <FlexDiv
            style={{ flexDirection: "column", width: "100%", maxWidth: "1880px" }}
          >
            <TestHeadingRA
              logo={RALogo}
              heading={questionname}
              subheading={S_RA_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              isSubmitted={isSubmitted}
              totalTestTime={totalTestTime}
              setElapsedTime={setElapsedTime}
              triggerReset={resetTrigger}
              testQuestionTableId={testQuestionTableId}
              appearedCount={questionsData?.response?.AppearedCount}
              IsBookMarked={isBookmarked}
              BookMarkedId={bookmarkId}
              onBookmarkChange={handleBookmarkChange}
              questionId={questionId}
              dictionaryText={questionsData?.response?.QuestionStatement}
              onCountdownComplete={() => setAutoStartRecording(true)}
              isSpeakingTest={true}
              isRecordingStarted={isRecordingStarted}
              isRecordingStopped={isRecordingStopped}
              preTestCountdownTime="35"
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
              setIsRecordingStarted={setIsRecordingStarted}
              setAutoStartRecording={setAutoStartRecording}
            />

            <SWT_QCard_Div>
              {questionsData && questionsData?.response && (
                <QuestionCard
                  id={questionId}
                  textValue={questionsData?.response.QuestionStatement}
                />
              )}
            </SWT_QCard_Div>

            <SWT_MCQCard_Div>
              <SpeakingMicCard
                key={`reset-recording-component-${resetTrigger}`}
                setSelectedAnswers={setSelectedAnswers}
                resetTrigger={resetTrigger}
                setCanSubmit={handleSetCanSubmit}
                setRecordedAudio={setRecordedAudio}
                setRecordedWavFile={handleSetRecordedWavFile}
                autoStartRecording={autoStartRecording}
                resetAutoStart={() => setAutoStartRecording(false)}
                handleRecordingStop={handleRecordingStop}
                handleRecordingStart={handleRecordingStart}
                totalTestTime={totalTestTime}
              />
            </SWT_MCQCard_Div>

            <ButtonList
              onSubmit={() => {handleSubmit()}}
              onRedo={() => handleRedo()}
              // canSubmit={canSubmit}
              canSubmit={() => !canSubmit}
              isLoading={isLoading}
              urlLoading={urlLoading}
              isSubmitted={isSubmitted}
              renderAnswer={false}
              // renderScript={true}
              // onScript={() => setShowScript(!showScript)}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              hasPrevious={currentQuestionIndex > 0 || page > 1}
              hasNext={currentQuestionIndex < (testQuestions?.response ? testQuestions?.response.length - 1 : 0) || page < totalPages}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />

            {/* {showScript && questionsData?.response?.QuestionStatement && (
              <ShowScriptBox
                answerText={questionsData?.response?.QuestionStatement}
              />
            )} */}

            <CommunityScore
              testQuestionTableId={testQuestionTableId}
              onSelectMyScore={handleMyAttemptedQuestionsScore}
              lastScoreUpdate={lastScoreUpdate}
              renderDownloadIcon={true}
              ScoreLetter="S"
              bg="#49D7F2"
              totalScore="90.00"
              testSubmissionInProcess={isLoading}
            />
          </FlexDiv>
        </FlexDiv>
      </ScrollableDiv>
    </>
  );
};

export default SpeakingRA;
