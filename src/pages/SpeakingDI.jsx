import React, { useEffect, useState, useRef } from "react";
import TestHeading from "../components/Common/TestHeading";
import DILogo from "../assets/images/S_DI_Logo.svg";
import { S_DI_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { modalStyle, NavBlock, SWT_MCQCard_Div, SWT_QCard_Div } from "./Style";
import { DescribeImageCardData } from "../components/Speaking/data";
import SpeakingMicCard from "../components/Speaking/SpeakingMicCard";
import DescribeImageCard from "../components/Speaking/DescribeImageCard";
import { FlexDiv } from "../assets/styles/style";
import { useAuth } from "../authentication/Auth";
import SidePannel from "../components/Common/SidePannel";
import Modal from "react-modal";
// import ShowScriptBox from "../components/Common/ShowScriptBox";
import AiScorePopupSpeaking from "../components/Speaking/AiScorePopupSpeaking";
import { AiScorePopupSpeakingData } from "../components/Speaking/data";
Modal.setAppElement("#root");
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import axios from "axios";
import LoadingModal from "../components/Common/LoadingModal";
import AiScorePopupSpeakingDI from "../components/Speaking/AiScorePopupSpeakingDI";
import { Base_URL, Base_URL_AiScore } from "../Client/apiURL";
import ShowScriptBox from "../components/Common/ShowScriptBox";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Describe Image";

const SpeakingDI = () => {
  const { logout } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState("");
  const [showScript, setShowScript] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [describeImageScore, setDescribeImageScore] = useState("");
  const [SummaryScore, setSummaryScore] = useState({});
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
    isEasy,
    filterBookmarked, 
    filterPrediction,
    searchTerm,
    questionname,
    sessionLoading
  ]);

  const handleImageLoad = () => {
    setIsDataLoading(false);
  };

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
          lastModified: Date.now,
        });

        let major_aspect = questionsData?.response.MajorAspects;
        let minor_aspect = questionsData?.response.MinorAspects;
        if (major_aspect.length === 1) {
          major_aspect = [major_aspect[0]];
        }

        if (minor_aspect.length === 1) {
          minor_aspect = [minor_aspect[0]];
        }

        const formData = new FormData();
        formData.append("audiofile", file);
        formData.append("user_text", selectedAnswers);
        formData.append("major_aspects", JSON.stringify(major_aspect));
        formData.append("minor_aspects", JSON.stringify(minor_aspect));

        const response = await fetch(
            `${Base_URL_AiScore}/describeimage`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok && data) {
          setDescribeImageScore(data);
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
        describeImageScore: describeImageScore,
        audioURL: audioURL,
      };

      if (describeImageScore.pronunciation_score === undefined) {
        describeImageScore.pronunciation_score =
          describeImageScore.pronounciation_score;
      }

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained:
          describeImageScore.content_score +
          describeImageScore.pronunciation_score +
          describeImageScore.fluency_score,
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
    setShowScript(false);
    setCanSubmit(false);
    setScorecardOpen(false);
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
    setAutoStartRecording(false);
    setAudioURL("");
    setIsAudioPlayerDisabled(false);
  };

  useEffect(() => {
    resetState();
  }, [questionId]);

  const handleRedo = () => {
    resetState();
  };

  useEffect(() => {
    setAutoStartRecording(false);
  }, [questionId, resetTrigger]);

  return (
    <>
      {isDataLoading && <LoadingModal />}
      <div id="scorecardd">
        {scorecardOpen && (
          <Modal isOpen={scorecardOpen} style={modalStyle}>
            <AiScorePopupSpeakingDI
              key={AiScorePopupSpeakingData[0].key}
              SmallScoreCard={AiScorePopupSpeakingData[0].SmallScoreCard}
              totalScore={15}
              contentTotalScore={5}
              enableSkillsScore={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .describeImageScore
                  : describeImageScore
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
              show={true}
              text={selectedAnswers}
              close={setScorecardOpen}
              three={true}
              allData={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .describeImageScore
                  : describeImageScore
              }
            />
          </Modal>
        )}
      </div>
      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={DILogo}
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
        setAutoStartRecording={setAutoStartRecording}
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
            <TestHeading
              logo={DILogo}
              heading={questionname}
              subheading={S_DI_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              // remainTime={false}
              addDictionary={false}
              isSubmitted={isSubmitted}
              // timerMode="decremental"
              totalTestTime={totalTestTime}
              setElapsedTime={setElapsedTime}
              triggerReset={resetTrigger}
              testQuestionTableId={testQuestionTableId}
              appearedCount={questionsData?.response?.AppearedCount}
              IsBookMarked={isBookmarked}
              BookMarkedId={bookmarkId}
              onBookmarkChange={handleBookmarkChange}
              questionId={questionId}
              onCountdownComplete={() => setAutoStartRecording(true)}
              isSpeakingTest={true}
              isRecordingStarted={isRecordingStarted}
              isRecordingStopped={isRecordingStopped}
              preTestCountdownTime="25"
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            {questionsData && questionsData?.response && (
              <>
                <SWT_QCard_Div>
                  <DescribeImageCard
                    id={DescribeImageCardData[0].id}
                    srcImage={questionsData?.response.QuestionImage}
                    onImageLoad={handleImageLoad}
                  />
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
              </>
            )}

            <ButtonList
              onSubmit={() => {handleSubmit()}}
              onRedo={() => handleRedo()}
              onScript={() => setShowScript(!showScript)}
              canSubmit={() => !canSubmit}
              isLoading={isLoading}
              urlLoading={urlLoading}
              renderAnswer={false}
              renderScript={ questionsData?.response?.QuestionStatement === "Describe Image" ? false : true}
              isSubmitted={isSubmitted}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              hasPrevious={currentQuestionIndex > 0 || page > 1}
              hasNext={currentQuestionIndex < (testQuestions?.response ? testQuestions?.response.length - 1 : 0) || page < totalPages}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
            {showScript && questionsData?.response?.QuestionStatement && (
              <ShowScriptBox
                answerText={questionsData?.response?.QuestionStatement}
              />
            )}
            <CommunityScore
              testQuestionTableId={testQuestionTableId}
              onSelectMyScore={handleMyAttemptedQuestionsScore}
              lastScoreUpdate={lastScoreUpdate}
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

export default SpeakingDI;
