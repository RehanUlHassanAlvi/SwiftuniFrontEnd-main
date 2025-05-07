import React, { useState, useEffect } from "react";
import TestHeading from "../components/Common/TestHeading";
import ROPLogo from "../assets/images/ROP_Logo.svg";
import { ROP_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { ModalStyleFlex, NavBlock, SWT_QCard_Div } from "./Style";
import ReOrderParagraphs from "../components/Reading/ReOrderParagraphs";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import { useAuth } from "../authentication/Auth";
import { useNavigate } from "react-router-dom";
import { AiScorePopupReadingMCMAData, getSuggestion } from "../components/Reading/data";
import AiScorePopupReadingROP from "../components/Reading/AiScorePopupReadingROP";
import ReadingAnswerBoxROP from "../components/Reading/ReadingAnswerBoxROP";
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL } from "../Client/apiURL";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Re-order Paragraphs";

const ReadingROP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const [submissionResult, setSubmissionResult] = useState({
    userIndexes: [],
    correctIndexes: [],
    score: 0,
  });

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

  // useEffect(() => {
  //   if (
  //     questionsData &&
  //     questionsData?.response.OptionNames &&
  //     questionsData?.response.AnswerNames
  //   ) {
  //     const correct = findMatchingLetters(
  //       questionsData?.response.OptionNames,
  //       questionsData?.response.AnswerNames
  //     );
  //   }
  // }, [questionsData]);

  function canSubmit() {
    return false;
  }
  const calculateScoreAndIndexes = () => {
    if (!questionsData?.response?.AnswerNames || userOrder.length === 0)
      return { userIndexes: [], correctIndexes: [], score: 0 };
  
    const correctOrderIndexes = questionsData?.response.AnswerNames.map(
      (answer) => questionsData?.response.OptionNames.indexOf(answer)
    );
  
    let score = 0;
  
    const correctPairs = new Set(
      correctOrderIndexes.slice(0, correctOrderIndexes.length - 1).map((_, i) => 
        `${correctOrderIndexes[i]}-${correctOrderIndexes[i + 1]}`
      )
    );
  
    for (let i = 0; i < userOrder.length - 1; i++) {
      const userPair = `${userOrder[i]}-${userOrder[i + 1]}`;
      if (correctPairs.has(userPair)) {
        score += 1;
      }
    }
  
    return {
      userIndexes: userOrder,
      correctIndexes: correctOrderIndexes,
      score,
    };
  };

  useEffect(() => {
    async function submitScoreData() {
      const userResponse = {
        submissionResult: submissionResult,
      };

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained: submissionResult.score,
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
          handleFiltersAndFetch(questionname);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to submit score data:", error);
      }
    }

    const shouldSubmitScore = isScoreDataReadyForSubmit && !scoreDataSubmitted && elapsedTime;
    if (shouldSubmitScore) {
      submitScoreData();
    }
  }, [isScoreDataReadyForSubmit, scoreDataSubmitted, elapsedTime]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("scorecard");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setScorecardOpen(false);
        setElapsedTime(0);
        setMyAttemptedQuestionsScore(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const resetState = () => {
    setSelectedAnswers([]);
    setShowAnswer(false);
    setScorecardOpen(false);
    setIsSubmitted(false);
    setElapsedTime(0);
    setTriggerReset((prevState) => !prevState);
    setScoreDataSubmitted(false);
    setMyAttemptedQuestionsScore(null);
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
    const result = calculateScoreAndIndexes();
    setSubmissionResult(result);
    setIsScoreDataReadyForSubmit(true);
    setScorecardOpen(true);
  }

  return (
    <>
      {isDataLoading && <LoadingModal />}
      {scorecardOpen && (
        <ModalStyleFlex>
          <AiScorePopupReadingROP
            EnableSkills={[
              {
                component: "Pair",
                score: myAttemptedQuestionsScore
                  ? `${JSON.parse(myAttemptedQuestionsScore.UsersResponse).submissionResult.score}/${questionsData?.response?.AnswerNames.length - 1}`
                  : `${submissionResult.score}/${questionsData?.response?.AnswerNames.length - 1}`,
                  suggestion: getSuggestion(myAttemptedQuestionsScore ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).submissionResult.score : submissionResult.score, questionsData?.response?.AnswerNames.length - 1),
              },
            ]}
            SmallScoreCard={[AiScorePopupReadingMCMAData[0].SmallScoreCard[0]]}
            answerIsAList={false}
            submissionResult={
              myAttemptedQuestionsScore
                ? JSON.parse(myAttemptedQuestionsScore.UsersResponse).submissionResult
                : submissionResult
            }
            elapsedTime={
              myAttemptedQuestionsScore
                ? myAttemptedQuestionsScore.TimeTaken
                : elapsedTime
            }
            close={setScorecardOpen}
            totalScore={questionsData?.response?.AnswerNames.length - 1}
          />
        </ModalStyleFlex>
      )}
      
      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo = {ROPLogo}
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
            <TestHeading
              logo={ROPLogo}
              heading={questionname}
              subheading={ROP_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              remainTime={false}
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
              dictionaryArrayText={questionsData?.response?.OptionNames}
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            {questionsData && questionsData?.response && (
              <SWT_QCard_Div>
                <ReOrderParagraphs
                  OptionNames={questionsData?.response?.OptionNames}
                  setUserOrder={setUserOrder}
                  triggerReset={triggerReset}
                />
              </SWT_QCard_Div>
            )}

            <ButtonList
              onSubmit={() => {
                handleSubmission();
              }}
              onRedo={() => handleRedo()}
              onAnswer={() => setShowAnswer(!showAnswer)}
              canSubmit={canSubmit}
              isLoading={isLoading}
              isSubmitted={isSubmitted}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              hasPrevious={currentQuestionIndex > 0 || page > 1}
              hasNext={currentQuestionIndex < (testQuestions?.response ? testQuestions?.response.length - 1 : 0) || page < totalPages}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />

            {showAnswer && questionsData?.response?.AnswerNames && (
              <ReadingAnswerBoxROP
                answer={calculateScoreAndIndexes()
                  .correctIndexes.map((index) => index + 1)
                  .join(", ")}
                addIndex={false}
              />
            )}

            <CommunityScore
              formateScore={false}
              bg="#AD826E"
              ai_score={false}
              ScoreLetter="R"
              totalScore={questionsData?.response?.AnswerNames.length - 1}
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

export default ReadingROP;
