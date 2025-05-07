import React, { useState, useEffect } from "react";
import TestHeading from "../components/Common/TestHeading";
import FIBLogo from "../assets/images/FIB_Logo.svg";
import { RW_FIB_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { ModalStyleFlex, NavBlock, SWT_QCard_Div } from "./Style";
import { ReadingAndWritingBlanksData } from "../components/Reading/data";
import ReadingAndWritingBlanks from "../components/Reading/ReadingAndWritingBlanks";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import { useAuth } from "../authentication/Auth";
import { useNavigate } from "react-router-dom";
import ReadingAnswerBox from "../components/Common/ReadingAnswerBox";
import AiScorePopupReading from "../components/Reading/AiScorePopupReading";
import { AiScorePopupReadingMCMAData } from "../components/Reading/data";
import Modal from "react-modal";
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL } from "../Client/apiURL";
import ShowScriptBox from "../components/Common/ShowScriptBox";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Reading & Writing: Fill in the Blanks";

const ReadingWFIB = () => {
  const [showScript, setShowScript] = useState(false);
  const [normalizedText, setNormalizedText] = useState("");;
  
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
        ""
      );
      // .replace(/#~#~#\./g, " .")
      // .replace(/\.#~#~#/g, ". ");

      setNormalizedText(newText);
    }
  }, [questionsData]);

  function canSubmit() {
    return selectedAnswers.some((answer) => !answer.trim());
  }

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
    setScorecardOpen(false);
    setIsSubmitted(false);
    setElapsedTime(0);
    setTriggerReset((prevState) => !prevState);
    setShowScript(false);
    setEnableSkillsData([]);
    setScoreDataSubmitted(false);
    setMyAttemptedQuestionsScore(null);
    setMarksObtained(0);
    setShouldOpenScorecard(false);
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
  }

  return (
    <>
      {isDataLoading && <LoadingModal />}
      {scorecardOpen && (
        <ModalStyleFlex>
          <AiScorePopupReading
            key={AiScorePopupReadingMCMAData[0].key}
            SmallScoreCard={AiScorePopupReadingMCMAData[0].SmallScoreCard}
            CorrectAnswers={questionsData?.response?.AnswerNames}
            selectedAnswers={selectedAnswers}
            elapsedTime={elapsedTime}
            setEnableSkillsData={setEnableSkillsData}
            myAttemptedQuestionsScore={myAttemptedQuestionsScore}
            setMarksObtained={setMarksObtained}
            questionOptions={questionsData?.response?.OptionNames}
            close={setScorecardOpen}
          />
        </ModalStyleFlex>
      )}

      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={FIBLogo}
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
              logo={FIBLogo}
              heading={"Reading & Writing Blanks"}
              subheading={RW_FIB_Subheading}
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

            <SWT_QCard_Div>
              {questionsData && questionsData?.response && (
                <ReadingAndWritingBlanks
                  key={`reading-and-writing-blanks-${triggerReset}`}
                  id={ReadingAndWritingBlanksData[0].id}
                  textValue={questionsData?.response?.QuestionStatement}
                  dropDownOptions={questionsData?.response?.OptionNames}
                  setSelectedAnswers={setSelectedAnswers}
                />
              )}
            </SWT_QCard_Div>

            <ButtonList
              onSubmit={() => {
                handleSubmission();
              }}
              onRedo={() => handleRedo()}
              renderScript={questionsData?.response?.OptionText}
              explanation={true}
              onAnswer={() => setShowAnswer(!showAnswer)}
              onScript={() => setShowScript(!showScript)}
              canSubmit={canSubmit}
              isSubmitted={isSubmitted}
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

            {showScript && questionsData?.response?.OptionText && (
              <ShowScriptBox
                answerText={questionsData?.response?.OptionText}
                explanation={true}
              />
            )}

            <CommunityScore
              ai_score={false}
              bg="#AD826E"
              ScoreLetter="R"
              formateScore={false}
              totalScore={questionsData?.response?.AnswerNames.length}
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

export default ReadingWFIB;
