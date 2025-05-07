import React, { useEffect, useState } from "react";
import TestHeading from "../components/Common/TestHeading";
import MCMLogo from "../assets/images/MCM_Logo.svg";
import { MCM_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { modalStyle, ModalStyleFlex, NavBlock, SWT_MCQCard_Div, SWT_QCard_Div } from "./Style";
import TextCardReadonly from "../components/Writing/TextCardReadonly";
import { MCQsComponentData, TextCardReadonlyData } from "../components/Writing/data";
import MCQsComponent from "../components/Writing/MCQsComponent";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import ReadingAnswerBox from "../components/Common/ReadingAnswerBox";
import ScorePopupReadingMCM from "../components/Reading/ScorePopupReadingMCM";
import { AiScorePopupReadingMCMAData, getSuggestion } from "../components/Reading/data";
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL } from "../Client/apiURL";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Multiple Choice, Multiple Answers";

const ReadingMCM = () => {
  const [totalScore, setTotalScore] = useState(0);

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
    if (
      questionsData &&
      questionsData?.response.OptionNames &&
      questionsData?.response.AnswerNames
    ) {
      const correct = findMatchingLetters(
        questionsData?.response.OptionNames,
        questionsData?.response.AnswerNames
      );
      setCorrectAnswers(correct);
    }
  }, [questionsData]);

  const findMatchingLetters = (bigArray, smallArray) => {
    const matchingLetters = [];

    for (let i = 0; i < bigArray.length; i++) {
      if (smallArray.includes(bigArray[i])) {
        matchingLetters.push(String.fromCharCode(65 + i));
      }
    }
    return matchingLetters;
  };

  function canSubmit() {
    return !(
      Array.isArray(selectedAnswers) &&
      selectedAnswers?.length > 0 &&
      selectedAnswers.some((value) => value !== "")
    );
  }

  function markingFunction(answerList, userAnswers) {
    let score = 0;
    answerList.forEach((correctAnswer) => {
      const isCorrect = userAnswers.includes(correctAnswer);
      if (isCorrect) {
        score += 1;
      }
    });
    userAnswers.forEach((answer) => {
      const isCorrect = answerList.includes(answer);
      if (!isCorrect) {
        score = Math.max(0, score - 1);
      }
    });
    return score;
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
        correctAnswers: correctAnswers,
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

    const shouldSubmitScore = isScoreDataReadyForSubmit && enableSkillsData.length > 0 && !scoreDataSubmitted;
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
    setEnableSkillsData([]);
    setScoreDataSubmitted(false);
    setMyAttemptedQuestionsScore(null);
    setMarksObtained(0);
    setShouldOpenScorecard(false);
    setTotalScore(0);
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
          <ScorePopupReadingMCM
            EnableSkills={[
              {
                component: "Choice",
                score: `${markingFunction(findMatchingLetters(questionsData?.response.OptionNames,questionsData?.response.AnswerNames),selectedAnswers)}/${questionsData?.response?.AnswerNames?.length}`,
                suggestion: getSuggestion( markingFunction(findMatchingLetters(questionsData?.response.OptionNames,questionsData?.response.AnswerNames),selectedAnswers), questionsData?.response?.AnswerNames?.length ),
              },
            ]}
            SmallScoreCard={[AiScorePopupReadingMCMAData[0].SmallScoreCard[0]]}
            CorrectAnswers={findMatchingLetters(questionsData?.response.OptionNames, questionsData?.response.AnswerNames)}
            selectedAnswers={selectedAnswers}
            answerIsAList={false}
            markingFunction={markingFunction}
            elapsedTime={elapsedTime}
            setEnableSkillsData={setEnableSkillsData}
            myAttemptedQuestionsScore={myAttemptedQuestionsScore}
            setMarksObtained={setMarksObtained}
            questionOptions={questionsData?.response.OptionNames}
            close={setScorecardOpen}
          />
        </ModalStyleFlex>
      )}
      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo = {MCMLogo}
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
        <FlexDiv
          style={{
            width: "100%",
            // overflowY: scorecardOpen ? "hidden" : "",
            // height: scorecardOpen ? "100vh" : "",
          }}
        >
          <FlexDiv
            style={{ flexDirection: "column", width: "100%", maxWidth: "1880px" }}
          >
            <TestHeading
              logo={MCMLogo}
              heading={"Multiple Choice, Multiple Answers"}
              subheading={MCM_Subheading}
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
              dictionaryText={questionsData?.response?.QuestionStatement}
              dictionaryArrayText={questionsData?.response?.OptionNames}
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            <SWT_QCard_Div>
              <TextCardReadonly
                id={TextCardReadonlyData[4].id}
                textValue={
                  questionsData?.response?.QuestionStatement
                    ? questionsData?.response?.QuestionStatement
                    : ""
                }
              />
            </SWT_QCard_Div>

            <SWT_MCQCard_Div>
              <MCQsComponent
                key={`mcq-component-${triggerReset}`}
                id={MCQsComponentData[0].id}
                question={
                  questionsData?.response?.OptionText ||
                  "Choose options from the following:"
                }
                answers={
                  questionsData?.response?.OptionNames
                    ? questionsData?.response?.OptionNames.map(
                        (item, index) =>
                          `${String.fromCharCode(65 + index)}) ${item}`
                      )
                    : []
                }
                render={MCQsComponentData[0].render}
                userSelectedAnswers={setSelectedAnswers}
              />
            </SWT_MCQCard_Div>

            <ButtonList
              onSubmit={handleSubmission}
              onRedo={handleRedo}
              onAnswer={() => setShowAnswer(!showAnswer)}
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
                answerText={findMatchingLetters(
                  questionsData?.response.OptionNames,
                  questionsData?.response.AnswerNames
                )}
                addIndex={false}
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

export default ReadingMCM;
