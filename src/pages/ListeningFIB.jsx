import React, { useEffect, useState, useRef } from "react";
import TestHeading from "../components/Common/TestHeading";
import LFIBLogo from "../assets/images/L_FIB_Logo.svg";
import { L_FIB_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { ModalStyleFlex, NavBlock, SWT_QCard_Div } from "./Style";
import AudioPlayer from "../components/Speaking/AudioPlayer";
import FillTheBlanksCard from "../components/Listening/FillTheBlanksCard";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import ReadingAnswerBox from "../components/Common/ReadingAnswerBox";
import AiScorePopupReading from "../components/Reading/AiScorePopupReading";
import { AiScorePopupListeningFIBData } from "../components/Listening/data";
import ShowScriptBox from "../components/Common/ShowScriptBox";
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL } from "../Client/apiURL";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Fill in the Blanks";

const ListeningFIB = () => {
  const [showScript, setShowScript] = useState(false);
  const [modifiedTextValue, setModifiedTextValue] = useState("");
  const [normalizedText, setNormalizedText] = useState("");
  const [isAudioPlayerDisabled, setIsAudioPlayerDisabled] = useState(false);
  const audioRef = useRef(null);

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
    setSelectedAnswers,
    selectedAnswers,
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
    getQuestionName,
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
    if (questionsData?.response?.QuestionStatement) {
      let newText = questionsData?.response.QuestionStatement.replace(
        /%\{option_name\}/g,
        "#~#~#"
      )
        .replace(/#~#~#\./g, "#~#~# .")
        .replace(/\.#~#~#/g, ". #~#~#");

      setModifiedTextValue(newText);
    }
  }, [questionsData]);

  useEffect(() => {
    if (questionsData?.response?.QuestionStatement) {
      let newText = questionsData?.response.QuestionStatement.replace(
        /%\{option_name\}/g,
        ""
      ).replace(/\\n/g, "");
      // .replace(/#~#~#\./g, " .")
      // .replace(/\.#~#~#/g, ". ");

      setNormalizedText(newText);
    }
  }, [questionsData]);

  function canSubmit() {
    const answerNames = questionsData?.response?.AnswerNames;
    const ansLen = answerNames?.length;

    if (!answerNames || selectedAnswers.length !== ansLen) {
      return true;
    }

    return !selectedAnswers.every((ans) => ans != null && ans.trim() !== "");
  }

  useEffect(() => {
    if (questionsData?.response?.AnswerNames) {
      setSelectedAnswers(Array(questionsData?.response.AnswerNames.length).fill(""));
    }
  }, [questionsData]);

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

  useEffect(() => {
    async function submitScoreData() {
      const userResponse = {
        correctAnswers: questionsData?.response?.AnswerNames,
        selectedAnswers: selectedAnswers,
        enableSkillsData: enableSkillsData,
      };

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained: marksObtained,
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
      enableSkillsData.length > 0 &&
      !scoreDataSubmitted;
    if (shouldSubmitScore) {
      submitScoreData();
    }
  }, [isScoreDataReadyForSubmit, enableSkillsData.length, scoreDataSubmitted]);

  const resetState = () => {
    setSelectedAnswers([]);
    setShowAnswer(false);
    setShowScript(false);
    setScorecardOpen(false);
    setIsSubmitted(false);
    setElapsedTime(0);
    setTriggerReset((prevState) => !prevState);
    setEnableSkillsData([]);
    setScoreDataSubmitted(false);
    setMyAttemptedQuestionsScore(null);
    setMarksObtained(0);
    setShouldOpenScorecard(false);
    setIsAudioPlayerDisabled(false);
  };

  useEffect(() => {
    resetState();
  }, [questionId]);

  const handleRedo = () => {
    resetState();
  };

  function handleSubmission() {
    setIsSubmitted(true);
    setScorecardOpen(true);
    setIsScoreDataReadyForSubmit(true);
    setIsAudioPlayerDisabled(true);
    if (audioRef.current) {audioRef.current.pause();}}

  return (
    <>
      {isDataLoading && <LoadingModal />}
      {scorecardOpen && (
        <ModalStyleFlex>
          <AiScorePopupReading
            key={AiScorePopupListeningFIBData[0].key}
            SmallScoreCard={AiScorePopupListeningFIBData[0].SmallScoreCard}
            CorrectAnswers={questionsData?.response?.AnswerNames}
            selectedAnswers={selectedAnswers}
            elapsedTime={elapsedTime}
            setEnableSkillsData={setEnableSkillsData}
            myAttemptedQuestionsScore={myAttemptedQuestionsScore}
            setMarksObtained={setMarksObtained}
            questionOptions={questionsData?.response.AnswerNames}
            close={setScorecardOpen}
          />
        </ModalStyleFlex>
      )}

      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={LFIBLogo}
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
        highFrequency={highFrequency}
        setHighFrequency={setHighFrequency}
        isPracticed={isPracticed}
        setIsPracticed={setIsPracticed}
        wantToSortDesc={wantToSortDesc}
        setWantToSortDesc={setWantToSortDesc}
        isDataLoading={isDataLoading}
        setIsDataLoading={setIsDataLoading}
        setSelectedAnswers={setSelectedAnswers}
        setTriggerReset={setTriggerReset}
        onToggle={setIsSidePanelOpen}
        updateLocalQuestionBookmark={updateLocalQuestionBookmark}
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
              logo={LFIBLogo}
              heading={questionname}
              subheading={L_FIB_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              onTestSubmit={handleSubmission}
              isSubmitted={isSubmitted}
              setElapsedTime={setElapsedTime}
              triggerReset={triggerReset}
              testQuestionTableId={testQuestionTableId}
              appearedCount={questionsData?.response?.AppearedCount}
              IsBookMarked={isBookmarked}
              BookMarkedId={bookmarkId}
              onBookmarkChange={handleBookmarkChange}
              questionId={questionId}
              dictionaryText={normalizedText}
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            {questionsData && questionsData?.response && (
              <SWT_QCard_Div>
                <AudioPlayer
                  AudioObjects={questionsData?.response.AudioObjects}
                  resetTrigger={triggerReset}
                  isAudioPlayerDisabled={isAudioPlayerDisabled}
                  audioRef={audioRef}
                />
              </SWT_QCard_Div>
            )}

            <SWT_QCard_Div>
              {questionsData && questionsData?.response && (
                <FillTheBlanksCard
                  key={`fill-in-the-blanks-${triggerReset}`}
                  id={questionId}
                  textValue={modifiedTextValue}
                  correctFillingWords={questionsData?.response.AnswerNames}
                  setSelectedAnswers={setSelectedAnswers}
                />
              )}
            </SWT_QCard_Div>

            <ButtonList
              onSubmit={() => {handleSubmission()}}
              onRedo={() => handleRedo()}
              canSubmit={canSubmit}
              isSubmitted={isSubmitted}
              // renderScript={true}
              onAnswer={() => setShowAnswer(!showAnswer)}
              // onScript={() => setShowScript(!showScript)}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              hasPrevious={currentQuestionIndex > 0 || page > 1}
              hasNext={currentQuestionIndex < (testQuestions?.response ? testQuestions?.response.length - 1 : 0) || page < totalPages}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />

            {showAnswer && questionsData?.response?.AnswerNames && (
              <ReadingAnswerBox
                answerText={questionsData?.response?.AnswerNames}
              />
            )}

            {/* {showScript && questionsData?.response?.QuestionStatement && (
              <ShowScriptBox
                answerText={questionsData?.response?.QuestionStatement}
              />
            )} */}

            <CommunityScore
              ScoreLetter="L"
              bg="#868EAF"
              formateScore={false}
              totalScore={questionsData?.response?.AnswerNames.length}
              WritingTotalScore="2"
              ai_score={false}
              testQuestionTableId={testQuestionTableId}
              onSelectMyScore={handleMyAttemptedQuestionsScore}
              lastScoreUpdate={lastScoreUpdate}
            />
          </FlexDiv>
        </FlexDiv>
      </ScrollableDiv>
    </>
  );
};

export default ListeningFIB;
