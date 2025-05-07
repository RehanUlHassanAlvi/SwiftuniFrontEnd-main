import React, { useEffect, useState } from "react";
import TestHeading from "../components/Common/TestHeading";
import Logo from "../assets/images/S_ASQ_Logo.svg";
import { S_ASQ_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { modalStyle, NavBlock, SWT_MCQCard_Div, SWT_QCard_Div } from "./Style";
import { AiScorePopupSpeakingData } from "../components/Speaking/data";
import SpeakingMicCard from "../components/Speaking/SpeakingMicCard";
import AudioPlayer from "../components/Speaking/AudioPlayer";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import AiScorePopupSpeakingASQ from "../components/Speaking/AiScorePopupSpeakingASQ";
import Modal from "react-modal";
import SpeakingASQAnswerBox from "../components/Common/SpeakingASQAnswerBox";
Modal.setAppElement("#root");
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL, Base_URL_AiScore } from "../Client/apiURL";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Answer Short Question";

const SpeakingASQ = () => {
  const [selectedAnswers, setSelectedAnswers] = useState("");
  const [resetTrigger, setResetTrigger] = useState(false);
  const [asqScore, setASQScore] = useState("");
  const [totalTestTime, setTotalTestTime] = useState(7000);

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

      if (questionsData) {
        const payload = {
          question: questionsData?.response?.QuestionStatement || "",
          answer_list: questionsData?.response?.OptionNames,
          user_answer: Array.isArray(selectedAnswers) ? selectedAnswers.join(" ") : selectedAnswers,
        };
        const response = await fetch(
          `${Base_URL_AiScore}/answershortquestions`,
          {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (response.ok && data) {
          setASQScore(data);
          setIsSubmitted(true);
          setScorecardOpen(true);
          setIsScoreDataReadyForSubmit(true);
        } else {
          // logout();
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
        correctAnswers: questionsData?.response?.QuestionStatement || "Correct Answer",
        selectedAnswers: selectedAnswers,
        asqScore: asqScore,
        audioURL: audioURL,
      };

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained: asqScore.content_score,
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
    setSelectedAnswers("");
    setShowAnswer(false);
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
    setIsAudioCompleted(false);
    setAudioURL("");
    setIsAudioPlayerDisabled(false);
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
        {scorecardOpen && (
          <Modal isOpen={scorecardOpen} style={modalStyle}>
            <AiScorePopupSpeakingASQ
              key={AiScorePopupSpeakingData[0].key}
              SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
              enableSkillsScore={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).asqScore
                  : asqScore
              }
              UserResponse={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).selectedAnswers
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
            />
          </Modal>
        )}
      </div>

      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={Logo}
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
        difficulty={difficulty}
        setDifficulty={setDifficulty}
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
          <FlexDiv style={{ flexDirection: "column", width: "100%", maxWidth: "1880px" }}>
            <TestHeading
              key={`test-heading-${resetTrigger}`}
              logo={Logo}
              heading={questionname}
              subheading={S_ASQ_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              isSubmitted={isSubmitted}
              // remainTime={false}
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
              preTestCountdownTime="3"
              isAudioPlayerComponent={true}
              isAudioCompleted={isAudioCompleted}
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            <SWT_QCard_Div>
              {questionsData && questionsData?.response && (
                <AudioPlayer
                  AudioObjects={questionsData?.response.AudioObjects}
                  onAudioComplete={handleAudioCompletion}
                  resetTrigger={resetTrigger}
                  isAudioPlayerDisabled={isAudioPlayerDisabled}
                  audioRef={audioRef}
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
                isAudioPlayerComponent={true}
                isAudioCompleted={isAudioCompleted}
              />
            </SWT_MCQCard_Div>

            <ButtonList
              onSubmit={() => {handleSubmit()}}
              onRedo={() => handleRedo()}
              isLoading={isLoading}
              urlLoading={urlLoading}
              isSubmitted={isSubmitted}
              canSubmit={() => !canSubmit}
              onAnswer={() => setShowAnswer(!showAnswer)}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              hasPrevious={currentQuestionIndex > 0 || page > 1}
              hasNext={currentQuestionIndex < (testQuestions?.response ? testQuestions?.response.length - 1 : 0) || page < totalPages}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />

            {showAnswer && questionsData?.response?.AnswerNames && (
              <SpeakingASQAnswerBox
                Question={questionsData?.response?.QuestionStatement}
                Answer={questionsData?.response?.AnswerNames}
              />
            )}

            <CommunityScore
              testQuestionTableId={testQuestionTableId}
              onSelectMyScore={handleMyAttemptedQuestionsScore}
              lastScoreUpdate={lastScoreUpdate}
              renderDownloadIcon={true}
              ScoreLetter="S"
              bg="#49D7F2"
              totalScore="01.00"
              testSubmissionInProcess={isLoading}
            />
          </FlexDiv>
        </FlexDiv>
      </ScrollableDiv>
    </>
  );
};

export default SpeakingASQ;
