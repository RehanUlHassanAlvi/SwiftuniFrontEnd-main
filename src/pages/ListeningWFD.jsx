import React, { useEffect, useState, useRef } from "react";
import TestHeading from "../components/Common/TestHeading";
import LWFDLogo from "../assets/images/L_WFD_Logo.svg";
import { L_WFD_Subheading } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import { ModalStyleFlex, NavBlock, SWT_QCard_Div } from "./Style";
import AudioPlayer from "../components/Speaking/AudioPlayer";
import { FlexDiv } from "../assets/styles/style";
import TextAreaInput from "../components/Writing/TextAreaInput";
import SidePannel from "../components/Common/SidePannel";
import ReadingAnswerBox from "../components/Common/ReadingAnswerBox";
import { AiScorePopupListeningWFDData } from "../components/Listening/data";
import AiScorePopupListeningWFD from "../components/Listening/AiScorePopupListeningWFD";
import ShowScriptBox from "../components/Common/ShowScriptBox";
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL, Base_URL_AiScore } from "../Client/apiURL";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Write from Dictation";

const ListeningWFD = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wfdScore, setWfdScore] = useState({});
  const [wordCount, setWordCount] = useState(0);
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
    // difficulty,
    isEasy,
    filterBookmarked, 
    filterPrediction,
    searchTerm,
    questionname,
    sessionLoading
  ]);

  function canSubmit() {
    false;
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

  const handleSubmission = async () => {
    if (
      selectedAnswers &&
      typeof selectedAnswers === "string" &&
      selectedAnswers.trim() !== "" &&
      questionsData
    ) {
      setIsAudioPlayerDisabled(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsLoading(true);
      try {
        const correctAnswer =
          typeof questionsData?.response.AnswerNames === "string"
            ? questionsData?.response.AnswerNames
            : questionsData?.response.AnswerNames.join(" ");
        setCorrectAnswers(correctAnswer);
        const payload = {
          correct_answer: correctAnswer,
          user_response: selectedAnswers,
        };

        const response = await fetch(`${Base_URL_AiScore}/write_dictation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data) {
          setWfdScore(data);
          setIsSubmitted(true);
          setScorecardOpen(true);
          setIsScoreDataReadyForSubmit(true);
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
        correctAnswers: questionsData?.response?.AnswerNames,
        selectedAnswers: selectedAnswers,
        enableSkillsData: wfdScore,
      };

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained: wfdScore.writing_score,
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
  }, [isScoreDataReadyForSubmit, scoreDataSubmitted, elapsedTime]);

  const resetState = () => {
    setSelectedAnswers("");
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
    setIsAudioPlayerDisabled(false);
  };

  useEffect(() => {
    resetState();
  }, [questionId]);

  const handleRedo = () => {
    resetState();
  };

  useEffect(() => {
    const words = questionsData?.response?.AnswerNames.join(" ")
      .trim()
      .split(/\s+/);
    if (questionsData?.response?.AnswerNames !== undefined) {
      setWordCount(words.length);
    }
  }, [questionsData?.response?.AnswerNames]);

  return (
    <>
      {isDataLoading && <LoadingModal />}
      <div id="scorecardd">
        {scorecardOpen && (
          <ModalStyleFlex>
            <AiScorePopupListeningWFD
              key={questionId}
              wfdScore={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .enableSkillsData
                  : wfdScore
              }
              SmallScoreCard={AiScorePopupListeningWFDData[0].SmallScoreCard}
              correctAnswer={questionsData?.response?.AnswerNames}
              UserResponse={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .selectedAnswers
                  : selectedAnswers
              }
              elapsedTime={
                myAttemptedQuestionsScore
                  ? myAttemptedQuestionsScore.TimeTaken
                  : elapsedTime
              }
              close={setScorecardOpen}
              isOpen={scorecardOpen}
            />
          </ModalStyleFlex>
        )}
      </div>
      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={LWFDLogo}
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
        setIsEasy={setIsEasy}
        isEasy={isEasy}
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
              logo={LWFDLogo}
              heading={questionname}
              subheading={L_WFD_Subheading}
              serialNo={questionId ? "#" + questionId : "#000"}
              questionName={getQuestionName()}
              isSubmitted={isSubmitted}
              setElapsedTime={setElapsedTime}
              triggerReset={triggerReset}
              testQuestionTableId={testQuestionTableId}
              appearedCount={questionsData?.response?.AppearedCount}
              IsBookMarked={isBookmarked}
              BookMarkedId={bookmarkId}
              onBookmarkChange={handleBookmarkChange}
              questionId={questionId}
              dictionaryText={
                questionsData?.response?.AnswerNames &&
                Array.isArray(questionsData?.response.AnswerNames)
                  ? questionsData?.response.AnswerNames.join(",")
                  : ""
              }
              testAttemptedCount={testAttemptedCount}
              isPrediction={questionsData?.response?.Prediction}
              isNew={calculateDaysDifference(questionsData?.response?.CreatedAt)}
            />

            {questionsData && questionsData?.response && (
              <>
                <SWT_QCard_Div>
                  <AudioPlayer
                    AudioObjects={questionsData?.response.AudioObjects}
                    resetTrigger={triggerReset}
                    isAudioPlayerDisabled={isAudioPlayerDisabled}
                    audioRef={audioRef}
                  />
                </SWT_QCard_Div>
                <SWT_QCard_Div>
                  <TextAreaInput
                    key={`Text-area-input-${triggerReset}`}
                    placeholder={"Type your response here..."}
                    renderWC={false}
                    height={"200px"}
                    setSelectedAnswers={setSelectedAnswers}
                    isDisabled={isSubmitted}
                  />
                </SWT_QCard_Div>
              </>
            )}

            <ButtonList
              onSubmit={() => {handleSubmission()}}
              onRedo={() => handleRedo()}
              canSubmit={canSubmit}
              isLoading={isLoading}
              onAnswer={() => setShowAnswer(!showAnswer)}
              renderAnswer={true}
              renderScript={false}
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
                addIndex={false}
                color="#16161e)"
              />
            )}

            {/* {showAnswer && questionsData?.response?.QuestionStatement && (
              <ShowScriptBox
                answerText={questionsData?.response?.QuestionStatement}
              />
            )} */}

            <CommunityScore
              ScoreLetter="L"
              bg="#868EAF"
              totalScore={wordCount}
              WritingTotalScore="2"
              testQuestionTableId={testQuestionTableId}
              onSelectMyScore={handleMyAttemptedQuestionsScore}
              lastScoreUpdate={lastScoreUpdate}
              testSubmissionInProcess={isLoading}
            />
          </FlexDiv>
        </FlexDiv>
      </ScrollableDiv>
    </>
  );
};

export default ListeningWFD;
