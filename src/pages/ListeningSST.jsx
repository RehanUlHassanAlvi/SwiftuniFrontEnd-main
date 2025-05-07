import React, { useEffect, useState, useRef } from "react";
import TestHeading from "../components/Common/TestHeading";
import SSTLogo from "../assets/images/SST_Logo.svg";
import { SST_Subheading, SST_Subheading_Core } from "../components/Common/Data";
import Navbar from "../components/Navbar/Navbar";
import { modalStyle, NavBlock, SWT_QCard_Div } from "./Style";
import TextAreaInput from "../components/Writing/TextAreaInput";
import ButtonList from "../components/Common/ButtonList";
import CommunityScore from "../components/Common/CommunityScore";
import AudioPlayer from "../components/Speaking/AudioPlayer";
import { FlexDiv } from "../assets/styles/style";
import SidePannel from "../components/Common/SidePannel";
import { AiScorePopupListeningSSTData } from "../components/Listening/data";
import Modal from "react-modal";
import ShowScriptBox from "../components/Common/ShowScriptBox";
Modal.setAppElement("#root");
import { ScrollableDiv, SidePannelBackdrop } from "../components/Common/Style";
import LoadingModal from "../components/Common/LoadingModal";
import { Base_URL, Base_URL_AiScore } from "../Client/apiURL";
import AiSummaryScorePopup from "../components/Writing/AiSummaryScorePopup";
import { useTestQuestions } from "../context/TestQuestionContext";

const questionname = "Summarize Spoken Text";

const ListeningSST = () => {
  const pteType = localStorage.getItem("pte-type") || "pte academic";
  const [showScript, setShowScript] = useState(false);
  const [SummaryScore, setSummaryScore] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalTestTime, setTotalTestTime] = useState(localStorage.getItem("pte-type") === "pte core" ? 480 : 600);
  const [normalizedText, setNormalizedText] = useState("");
  const [calculatedScore, setCalculatedScore] = useState(0);
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

  useEffect(() => {
    const selectedQuestion = testQuestions?.response?.find(
      (q) => q.QuestionId === questionId
    );
    if (selectedQuestion) {
      // setTotalTestTime(selectedQuestion.TotalTime / 1000);
      setTotalTestTime(600);
    }
  }, [questionId, testQuestions]);

  function canSubmit() {
    return false;
  }

  const handleSubmit = async () => {
    if (selectedAnswers.trim() !== "" && questionsData) {
      setIsAudioPlayerDisabled(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsLoading(true);

      try {
        const payload = {
          passage: questionsData?.response.QuestionStatement,
          summary: selectedAnswers,
          pte_type: pteType,
        };
        const response = await fetch(`${Base_URL_AiScore}/summarizespoken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data) {
          setSummaryScore(data);
          setIsSubmitted(true);
          setScorecardOpen(true);
          // setIsScoreDataReadyForSubmit(true);
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
        enableSkillsData: SummaryScore,
      };

      const payload = {
        test_question_id: testQuestionTableId,
        marks_obtained: calculatedScore,
        user_response: JSON.stringify(userResponse),
        time_taken: elapsedTime,
        is_ptecore: isPteCore,
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

  const resetState = () => {
    setSelectedAnswers("");
    setShowScript(false);
    setScorecardOpen(false);
    setElapsedTime(0);
    setIsSubmitted(false);
    setTotalTestTime(totalTestTime);
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

  return (
    <>
      {isDataLoading && <LoadingModal />}
      <div id="scorecardd">
        {scorecardOpen && (
          <Modal isOpen={scorecardOpen} style={modalStyle}>
            <AiSummaryScorePopup
              key={"SummaryPopup"}
              EnableSkillsScore={
                myAttemptedQuestionsScore
                  ? JSON.parse(myAttemptedQuestionsScore.UsersResponse)
                      .enableSkillsData
                  : SummaryScore
              }
              SmallScoreCard={AiScorePopupListeningSSTData[0].SmallScoreCard}
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
              grammarKeyName={isPteCore ? "grammatical mistakes" : "grammatical Mistakes"}
              grammarIndexKeyName="grammatical mistakes indices"
              mispelledIndex="misspelled words indices"
              summaryST={true}
              pte_core={isPteCore}
              onScoreCalculated={handleScoreCalculated}
              close={setScorecardOpen}
              isOpen={scorecardOpen}
              reqIndexNum={2}
              essay={false}
            />
          </Modal>
        )}
      </div>

      {isSidePanelOpen && <SidePannelBackdrop isOpen={isSidePanelOpen} />}
      <SidePannel
        heading={questionname}
        logo={SSTLogo}
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
              logo={SSTLogo}
              heading={questionname}
              subheading={isPteCore ? SST_Subheading_Core : SST_Subheading}
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
              dictionaryText={normalizedText}
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
                    // renderWC={false}
                    // height={"200px"}
                    setSelectedAnswers={setSelectedAnswers}
                    isDisabled={isSubmitted}
                  />
                </SWT_QCard_Div>
              </>
            )}

            <ButtonList
              onSubmit={() => {handleSubmit()}}
              onRedo={() => handleRedo()}
              onScript={() => setShowScript(!showScript)}
              canSubmit={canSubmit}
              isLoading={isLoading}
              renderAnswer={false}
              renderScript={true}
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
              is_ptecore={isPteCore}
              ScoreLetter="L"
              bg="#868EAF"
              totalScore="10"
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

export default ListeningSST;
