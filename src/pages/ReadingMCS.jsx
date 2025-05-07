import React, { useEffect, useState } from "react";
import TestHeading from "../components/Common/TestHeading";
import MCSLogo from "../assets/images/MCS_Logo.svg";
import { MCS_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { ModalStyleFlex, NavBlock, SWT_MCQCard_Div, SWT_QCard_Div } from "./Style";
import TextCardReadonly from "../components/Writing/TextCardReadonly";
import {
  MCQsComponentData,
  TextCardReadonlyData,
} from "../components/Writing/data";
import MCQsComponent from "../components/Writing/MCQsComponent";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import ReadingAnswerBox from "../components/Common/ReadingAnswerBox";
import ScorePopupReadingMCM from "../components/Reading/ScorePopupReadingMCM";
import {
  AiScorePopupReadingMCMAData,
  getSuggestion,
} from "../components/Reading/data";
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL } from "../Client/apiURL";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Multiple Choice, Single Answer";

const ReadingMCS = () => {
  // const [testQuestions, setTestQuestions] = useState([]);
  // const [questionId, setQuestionId] = useState();
  // const [questionsData, setQuestionsData] = useState(null);
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  // const [showAnswer, setShowAnswer] = useState(false);
  // const [scorecardOpen, setScorecardOpen] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [elapsedTime, setElapsedTime] = useState(0);
  // const [triggerReset, setTriggerReset] = useState(false);
  // const [enableSkillsData, setEnableSkillsData] = useState([]);
  // const [scoreDataSubmitted, setScoreDataSubmitted] = useState(false);
  // const [testQuestionTableId, setTestQuestionTableId] = useState();
  // const [myAttemptedQuestionsScore, setMyAttemptedQuestionsScore] = useState(null);
  // const [marksObtained, setMarksObtained] = useState(0);
  // const [correctAnswers, setCorrectAnswers] = useState([""]);
  // const [shouldOpenScorecard, setShouldOpenScorecard] = useState(false);
  // const [isScoreDataReadyForSubmit, setIsScoreDataReadyForSubmit] = useState(false);
  // const [lastScoreUpdate, setLastScoreUpdate] = useState(Date.now());
  // const [searchTerm, setSearchTerm] = useState("");
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState();
  // const [filterBookmarked, setFilterBookmarked] = useState(false);
  // const [filterPrediction, setFilterPrediction] = useState(false);
  // const [wantToSortDesc, setWantToSortDesc] = useState(false);
  // const [highFrequency, setHighFrequency] = useState(false);
  // const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [isBookmarked, setIsBookmarked] = useState(false);
  // const [bookmarkId, setBookmarkId] = useState(null);
  // const [isPracticed, setIsPracticed] = useState("all");
  // const [testAttemptedCount, setTestAttemptedCount] = useState(null);
  // const [isDataLoading, setIsDataLoading] = useState(false);
  // const [difficulty, setDifficulty] = useState(null);
  // const [sessionLoading, setSessionLoading] = useState(true);
  // const [pageReloaded, setPageReloaded] = useState(true);

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
    isPteCore,
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

  // const setIsDataLoading = (loadingState) => {
  //   setIsDataLoading(loadingState);
  // };

  // useEffect(() => {
  //   if (questionsData) {
  //     setIsDataLoading(false);
  //   }
  // }, [questionsData]);

  // const updateLocalQuestionBookmark = (
  //   testQuestionTableId,
  //   newBookmarkStatus,
  //   bookmarkId,
  // ) => {
  //   setTestQuestions((prevQuestions) => ({
  //     ...prevQuestions,
  //     response: prevQuestions.response.map((question) =>
  //       question.TestQuestionTableId === testQuestionTableId
  //         ? {
  //             ...question,
  //             IsBookMarked: newBookmarkStatus,
  //             BookMarkedId: newBookmarkStatus ? bookmarkId : null,
  //           }
  //         : question,
  //     ),
  //   }));
  // };

  // useEffect(() => {
  //   const question = testQuestions?.response?.find((q) => q.QuestionId === questionId);
  //   if (question) {
  //     setIsBookmarked(question.IsBookMarked);
  //     setBookmarkId(question.BookMarkedId);
  //     setTestAttemptedCount(question.TestAttemptedCount);
  //   }
  // }, [testQuestions, testQuestionTableId]);

  // const handleBookmarkChange = (newIsBookmarked, newBookmarkId) => {
  //   setIsBookmarked(newIsBookmarked);
  //   setBookmarkId(newBookmarkId);
  // };

  // useEffect(() => {
  //   if (
  //     testQuestions?.response &&
  //     testQuestions?.response.length > 0 &&
  //     currentQuestionIndex < testQuestions?.response.length
  //   ) {
  //     const question = testQuestions?.response[currentQuestionIndex];
  //     setQuestionId(question.QuestionId);
  //     setTestQuestionTableId(question.TestQuestionTableId);
  //   }
  // }, [testQuestions, currentQuestionIndex]);

// const handleNextQuestion = () => {
//   if (currentQuestionIndex < (testQuestions?.response?.length - 1 || 0)) {
//     const nextIndex = currentQuestionIndex + 1;
//     const nextQuestion = testQuestions?.response[nextIndex];
//     setCurrentQuestionIndex(nextIndex);
//     storeQuestionInSession(nextQuestion, nextIndex);
//   } else if (page < totalPages) {
//     sessionStorage.setItem("pendingIndex", "FIRST");
//     setPage(page + 1);
//   }
// };

// const handlePreviousQuestion = () => {
//   if (currentQuestionIndex > 0) {
//     const prevIndex = currentQuestionIndex - 1;
//     const prevQuestion = testQuestions?.response[prevIndex];
//     setCurrentQuestionIndex(prevIndex);
//     storeQuestionInSession(prevQuestion, prevIndex);
//   } else if (page > 1) {
//     sessionStorage.setItem("pendingIndex", "LAST");
//     setPage(page - 1);
//   }
// };

  // const handleMyAttemptedQuestionsScore = (score, openScorecard) => {
  //   setMyAttemptedQuestionsScore(score);
  //   if (openScorecard) {
  //     setShouldOpenScorecard(true);
  //   }
  // };

  // useEffect(() => {
  //   if (shouldOpenScorecard) {
  //     setScorecardOpen(true);
  //     setShouldOpenScorecard(false);
  //   }
  // }, [shouldOpenScorecard]);

  useEffect(() => {
    if (
      questionsData &&
      questionsData?.response.OptionNames &&
      questionsData?.response.AnswerNames
    ) {
      const correct = findMatchingLetters(
        questionsData?.response.OptionNames,
        questionsData?.response.AnswerNames,
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
    return score;
  }

  // const setSearchTerm = (newSearchTerm) => {
  //   setSearchTerm(newSearchTerm);
  // };

  // useEffect(() => {
  //   if (!pageReloaded) {
  //     setPage(1);
  //   }
  // }, [filterBookmarked, filterPrediction]);

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
          },
        );
        const data = await response.json();
        if (data.responseCode === 200) {
          setScoreDataSubmitted(true);
          setIsScoreDataReadyForSubmit(false);
          setLastScoreUpdate(Date.now());
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to submit score data:", error);
      }
    }

    const shouldSubmitScore = isScoreDataReadyForSubmit && enableSkillsData.length > 0 && elapsedTime && !scoreDataSubmitted;
    if (shouldSubmitScore) {
      submitScoreData();
    }
  }, [
    isScoreDataReadyForSubmit,
    enableSkillsData.length,
    scoreDataSubmitted,
    elapsedTime,
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

  // const calculateDaysDifference = (createdAt) => {
  //   const currentDate = new Date();
  //   const createdDate = new Date(createdAt);
  //   const timeDiff = currentDate - createdDate;
  //   const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  //   return daysDiff < 60;
  // };

  return (
    <>
      {isDataLoading && <LoadingModal />}
      {scorecardOpen && (
        <ModalStyleFlex>
          <ScorePopupReadingMCM
            EnableSkills={[
              {
                component: "Choice",
                score: `${markingFunction(findMatchingLetters(questionsData?.response.OptionNames, questionsData?.response.AnswerNames), selectedAnswers)} / 1`,
                suggestion: getSuggestion(markingFunction(findMatchingLetters(questionsData?.response.OptionNames, questionsData?.response.AnswerNames), selectedAnswers), 1),
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
            isOpen={scorecardOpen}
          />
        </ModalStyleFlex>
      )}

      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={MCSLogo}
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
        <FlexDiv style={{ width: "100%" }}>
          <FlexDiv style={{ flexDirection: "column", width: "100%", maxWidth: "1880px" }}>
            <TestHeading
              logo={MCSLogo}
              heading={"Multiple Choice, Single Answer"}
              subheading={MCS_Subheading}
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
                  "Choose option from the following:"
                }
                answers={
                  questionsData?.response?.OptionNames
                    ? questionsData?.response?.OptionNames.map(
                        (item, index) =>
                          `${String.fromCharCode(65 + index)}) ${item}`,
                      )
                    : []
                }
                render={MCQsComponentData[1].render}
                userSelectedAnswers={setSelectedAnswers}
              />
            </SWT_MCQCard_Div>

            <ButtonList
              onSubmit={() => {handleSubmission()}}
              onRedo={() => handleRedo()}
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
                  questionsData?.response.AnswerNames,
                )}
                addIndex={false}
              />
            )}

            <CommunityScore
              ai_score={false}
              bg="#AD826E"
              ScoreLetter="R"
              formateScore={false}
              totalScore={questionsData?.response?.AnswerNames.length || 1}
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

export default ReadingMCS;