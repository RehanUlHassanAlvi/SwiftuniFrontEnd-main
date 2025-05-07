import React, { useState, useEffect } from "react";
import { FlexDiv } from "../../assets/styles/style";
import {
  SPMainDiv,
  SPHeading,
  SPToogleIcon,
  SPParentDiv,
  StyledArrowForwardIosIcon,
} from "./Style";
import RALogo from "../../assets/images/SP_RA_Logo.svg";
import SearchBar from "./SearchBar";
import AllBookmarkPrediction from "./AllBookmark";
import SPTopicsCard from "./SPTopicsCard";
import { useAuth } from "../../authentication/Auth";
import Pagination from "./Pagination";
import { Base_URL } from "../../Client/apiURL";
import { formatQuestionHeading } from "./Utils";

const SidePannel = ({
  heading,
  logo = null,
  testQuestions,
  totalTestQuestions = 0,
  questionId,
  setQuestionId,
  testQuestionTableId,
  setTestQuestionTableId,
  page,
  setPage,
  totalPages,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  searchTerm,
  setSearchTerm,
  filterBookmarked,
  setFilterBookmarked,
  filterPrediction,
  setFilterPrediction,
  difficulty,
  setDifficulty,
  isEasy,
  setIsEasy,
  highFrequency,
  setHighFrequency,
  isPracticed,
  setIsPracticed,
  wantToSortDesc,
  setWantToSortDesc,
  // isDataLoading,
  setIsDataLoading,
  setSelectedAnswers,
  setTriggerReset,
  onToggle,
  updateLocalQuestionBookmark,
  setAutoStartRecording,
  setQuestionsData,
  handleFiltersAndFetch,
  storeQuestionInSession,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const toggleSidePanel = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    if (onToggle) {
      onToggle(newOpenState);
    }
  };

  useEffect(() => {
    const fetchQuestionData = async () => {
      // setQuestionsData(null);
      // setSelectedAnswers([]);

      if (setIsDataLoading) {
        setIsDataLoading(true);
      }

      const storedQuestion = JSON.parse(sessionStorage.getItem("storedQuestion"));

      let activeQuestionId = storedQuestion?.questionId || questionId;
      let activeTestQuestionTableId = storedQuestion?.testQuestionTableId || testQuestionTableId;

      try {
        const response = await fetch(
          `${Base_URL}/app/users/test-questions/get-question-with-options?question_id=${activeQuestionId}&test_question_id=${activeTestQuestionTableId}`,
          { credentials: "include" }
        );

        const data = await response.json();

        if (data?.responseCode === 200 && data?.response) {
          setQuestionsData(data);
          setSelectedAnswers(Array(data?.response?.AnswerNames?.length).fill(""));

          sessionStorage.removeItem("SearchedQuestion_QuestionId");

        } else if (data?.responseCode && data?.responseCode === 501) {
          logout();
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch test questions:", error);
      } finally {
        if (setIsDataLoading) {
          setIsDataLoading(false);
        }
      }
    };

    if (questionId && testQuestionTableId) {
      fetchQuestionData();
    }
  }, [questionId, testQuestionTableId]);

  return (
    <>
      <SPParentDiv>
        <SPMainDiv isOpen={isOpen}>
          <SPToogleIcon onClick={toggleSidePanel}>
            <StyledArrowForwardIosIcon isOpen={isOpen} />
          </SPToogleIcon>
          <FlexDiv style={{ justifyContent: "space-between", gap: "15px" }}>
            <FlexDiv
              style={{
                justifyContent: "flex-start",
                gap: "1.25rem",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                style={{ width: "45px", height: "45px" }}
                src={logo ? logo : RALogo}
              />
              <div>
                <SPHeading>{formatQuestionHeading(heading)}</SPHeading>
              </div>
            </FlexDiv>
            <FlexDiv>
              <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </FlexDiv>
          </FlexDiv>

          <FlexDiv>
            <AllBookmarkPrediction
              QuestionsCount={totalTestQuestions}
              onFilterChange={setFilterBookmarked}
              filterBookmarked={filterBookmarked}
              onPredictionChange={setFilterPrediction}
              filterPrediction={filterPrediction}
            />
          </FlexDiv>

          <SPTopicsCard
            testQuestions={testQuestions}
            questionId={questionId}
            setQuestionId={setQuestionId}
            toggleSidePanel={toggleSidePanel}
            setTriggerReset={setTriggerReset}
            setTestQuestionTableId={setTestQuestionTableId}
            wantToSortDesc={wantToSortDesc}
            setWantToSortDesc={setWantToSortDesc}
            highFrequency={highFrequency}
            setHighFrequency={setHighFrequency}
            isPracticed={isPracticed}
            setIsPracticed={setIsPracticed}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
            setIsEasy={setIsEasy}
            isEasy={isEasy}
            heading={heading}
            updateLocalQuestionBookmark={updateLocalQuestionBookmark}
            setAutoStartRecording={setAutoStartRecording}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            handleFiltersAndFetch={handleFiltersAndFetch}
            storeQuestionInSession={storeQuestionInSession}
          />

          {testQuestions.length > 0 &&
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          }
        </SPMainDiv>
      </SPParentDiv>
    </>
  );
};

export default SidePannel;
