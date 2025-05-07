import React, { useState, useEffect } from "react";
import TestHeading from "../components/Common/TestHeading";
import WELogo from "../assets/images/WE_Logo.svg";
import { WE_Subheading } from "../components/Common/Data";
import { TextCardReadonlyData } from "../components/Writing/data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import TextCardReadonly from "../components/Writing/TextCardReadonly";
import TextAreaInput from "../components/Writing/TextAreaInput";
import { modalStyle, NavBlock, SWT_QCard_Div } from "./Style";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import { AiScoreCardWriteEssayData } from "../components/Writing/data";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL, Base_URL_AiScore } from "../Client/apiURL";
import AiEssayScorePopup from "../components/Writing/AiEssayScorePopup";
import { useTestQuestions } from "../context/TestQuestionContext";
// import { fetchData } from "../components/Common/Utils";

const questionname = "Write Essay";

export const rearrangeArray = (inputArray) => {
  let firstHalf = [];
  let secondHalf = [];

  inputArray.forEach((item) => {
    const words = item.split(" ");
    firstHalf.push(words[0]);

    if (words.length > 1) {
      secondHalf.push(words.slice(1).join(" "));
    }
  });

  return [...firstHalf, ...secondHalf];
};

const WriteEssay = () => {
  const [selectedAnswers, setSelectedAnswers] = useState("");
  const [resetCounter, setResetCounter] = useState(0);
  const [essayScore, setEssayScore] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalTestTime, setTotalTestTime] = useState(1200);
  const [calculatedScore, setCalculatedScore] = useState(0);

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

  const handleScoreCalculated = (score) => {
    setCalculatedScore(score);
    setIsScoreDataReadyForSubmit(true);
  };

  useEffect(() => {
    const selectedQuestion = testQuestions?.response?.find(
      (q) => q.QuestionId === questionId
    );
    if (selectedQuestion) {
      setTotalTestTime(selectedQuestion.TotalTime / 1000);
    }
  }, [questionId, testQuestions]);

  function canSubmit() {
    if (typeof selectedAnswers !== "string") {
      return true;
    }
    const wordCount = selectedAnswers
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return wordCount < 1;
  }

  const handleSubmit = async () => {
    if (selectedAnswers.trim() !== "" && questionsData) {
      setIsLoading(true);
      try {
        let major_aspect = questionsData?.response.MajorAspects;
        let minor_aspect = questionsData?.response.MinorAspects;

        if (major_aspect.length === 1) {
          major_aspect = [major_aspect[0]];
        }
        // major_aspect = major_aspect.flat();

        if (minor_aspect.length === 1) {
          minor_aspect = [minor_aspect[0]];
        }

        let tmpQuestion = questionsData?.response.QuestionStatement;
        // if(!(tmpQuestion.includes('Artificial intelligence is good in the teaching field'))){
        // minor_aspect = minor_aspect.flat();
        // minor_aspect = rearrangeArray(minor_aspect);
        // }

        const payload = {
          essay: selectedAnswers.replace(/"/g, ""),
          question: tmpQuestion,
          major_aspect: major_aspect,
          minor_aspect: minor_aspect,
        };

        let response;

        try {
          response = await fetch(`${Base_URL_AiScore}/essay`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } catch (error) {
          console.error("Fetch error:", error.message || error);
        }
        const data = await response.json();
        if (data) {
          if (data && !data["error"]) {
            setEssayScore(data);
            setIsSubmitted(true);
            setScorecardOpen(true);
          }
        } else {
          logout();
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch essay score:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    async function submitScoreData() {
      const userResponse = {
        selectedAnswers: selectedAnswers,
        enableSkillsData: essayScore,
      };

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained: calculatedScore,
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
      isScoreDataReadyForSubmit && !scoreDataSubmitted && elapsedTime;
    if (shouldSubmitScore) {
      submitScoreData();
    }
  }, [
    isScoreDataReadyForSubmit,
    scoreDataSubmitted,
    elapsedTime,
    calculatedScore,
  ]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("scorecard");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setScorecardOpen(false);
        // setSelectedAnswers("");
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
    setSelectedAnswers("");
    setShowAnswer(false);
    setScorecardOpen(false);
    setResetCounter((prev) => prev + 1);
    setElapsedTime(0);
    setIsSubmitted(false);
    setTotalTestTime(totalTestTime);
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

  return (
    <>
      {isDataLoading && <LoadingModal />}

      <div id="scorecardd">
        {scorecardOpen && (
          <Modal isOpen={scorecardOpen} style={modalStyle}>
            <AiEssayScorePopup
              key={"EssayPopup"}
              EnableSkillsScore={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .enableSkillsData
                  : essayScore
              }
              SmallScoreCard={AiScoreCardWriteEssayData[0].SmallScoreCard}
              UserResponse={
                myAttemptedQuestionsScore
                  ? {
                      textValue: JSON.parse(
                        myAttemptedQuestionsScore.UsersResponse
                      ).selectedAnswers,
                    }
                  : { textValue: selectedAnswers }
              }
              elapsedTime={
                myAttemptedQuestionsScore
                  ? myAttemptedQuestionsScore.TimeTaken
                  : elapsedTime
              }
              essay={true}
              pte_core={isPteCore}
              onScoreCalculated={handleScoreCalculated}
              close={setScorecardOpen}
              isOpen={scorecardOpen}
            />
          </Modal>
        )}
      </div>

      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={WELogo}
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
        <FlexDiv>
          <div style={{ maxWidth: "1780px" }}>
            <TestHeading
              logo={WELogo}
              heading={questionname}
              subheading={WE_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              isSubmitted={isSubmitted}
              timerMode="decremental"
              totalTestTime={totalTestTime}
              setElapsedTime={setElapsedTime}
              triggerReset={triggerReset}
              testQuestionTableId={testQuestionTableId}
              appearedCount={questionsData?.response?.AppearedCount}
              IsBookMarked={isBookmarked}
              BookMarkedId={bookmarkId}
              onBookmarkChange={handleBookmarkChange}
              questionId={questionId}
              dictionaryText={questionsData?.response?.QuestionStatement}
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            {questionsData && questionsData?.response && (
              <>
                <SWT_QCard_Div>
                  <TextCardReadonly
                    id={TextCardReadonlyData[0].id}
                    textValue={questionsData?.response?.QuestionStatement}
                  />
                </SWT_QCard_Div>
                <SWT_QCard_Div>
                  <TextAreaInput
                    key={`Text-area-input-${resetCounter}`}
                    setSelectedAnswers={setSelectedAnswers}
                    placeholder={"Type your essay here..."}
                    isDisabled={isSubmitted}
                  />
                </SWT_QCard_Div>
              </>
            )}

            <ButtonList
              onSubmit={() => {
                handleSubmit();
              }}
              onRedo={() => handleRedo()}
              canSubmit={canSubmit}
              isLoading={isLoading}
              renderAnswer={false}
              isSubmitted={isSubmitted}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              hasPrevious={currentQuestionIndex > 0 || page > 1}
              hasNext={currentQuestionIndex < (testQuestions?.response ? testQuestions?.response.length - 1 : 0) || page < totalPages}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />

            <CommunityScore
              ScoreLetter="W"
              bg="#FF5D5D"
              totalScore="90.00"
              testQuestionTableId={testQuestionTableId}
              onSelectMyScore={handleMyAttemptedQuestionsScore}
              lastScoreUpdate={lastScoreUpdate}
              testSubmissionInProcess={isLoading}
            />
          </div>
        </FlexDiv>
      </ScrollableDiv>
    </>
  );
};

export default WriteEssay;
