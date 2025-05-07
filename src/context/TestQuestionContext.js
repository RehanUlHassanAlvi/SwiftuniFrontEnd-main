import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { Base_URL } from "../Client/apiURL";
import { useAuth } from "../authentication/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestQuestionContext = createContext();

export const TestQuestionProvider = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isPteCore = localStorage.getItem("pte-type") === "pte core";
  const [testQuestions, setTestQuestions] = useState([]);
  const [questionsData, setQuestionsData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [wantToSortDesc, setWantToSortDesc] = useState(false);
  const [highFrequency, setHighFrequency] = useState(false);
  const [filterBookmarked, setFilterBookmarked] = useState(false);
  const [filterPrediction, setFilterPrediction] = useState(false);
  const [isPracticed, setIsPracticed] = useState("all");
  const [difficulty, setDifficulty] = useState(null);
  const [isEasy, setIsEasy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionId, setQuestionId] = useState();
  const [testQuestionTableId, setTestQuestionTableId] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [testAttemptedCount, setTestAttemptedCount] = useState(null);
  const [myAttemptedQuestionsScore, setMyAttemptedQuestionsScore] = useState(null);
  const [shouldOpenScorecard, setShouldOpenScorecard] = useState(false);
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [pageReloaded, setPageReloaded] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [triggerReset, setTriggerReset] = useState(false);
  const [enableSkillsData, setEnableSkillsData] = useState([]);
  const [scoreDataSubmitted, setScoreDataSubmitted] = useState(false);
  const [marksObtained, setMarksObtained] = useState(0);
  const [isScoreDataReadyForSubmit, setIsScoreDataReadyForSubmit] = useState(false);
  const [lastScoreUpdate, setLastScoreUpdate] = useState(Date.now());

  const audioRef = useRef(null);
  const [isAudioCompleted, setIsAudioCompleted] = useState(false);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const [isRecordingStopped, setIsRecordingStopped] = useState(false);
  const [isAudioPlayerDisabled, setIsAudioPlayerDisabled] = useState(false);
  const [recordedWavFile, setRecordedWavFile] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState("");
  const [autoStartRecording, setAutoStartRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const getStoredQuestion = () => {
    try {
      return JSON.parse(sessionStorage.getItem("storedQuestion")) || {};
    } catch {
      return {};
    }
  };

  const storeFiltersInSession = () => {
    const storedQuestion = getStoredQuestion();
    if (storedQuestion?.currentPath === window.location.pathname) {
      sessionStorage.setItem("storedQuestion", JSON.stringify({
        ...storedQuestion,
        filters: {
          page,
          sorting: wantToSortDesc,
          frequency: highFrequency,
          practiced: isPracticed,
          difficulty,
          bookmarked: filterBookmarked,
          prediction: filterPrediction,
          searchTerm
        }
      }));
    }
  };

  const loadSessionFilters = () => {
    return new Promise((resolve) => {
      const storedQuestion = getStoredQuestion();
      if (storedQuestion?.currentPath === window.location.pathname) {
        if (storedQuestion.filters) {
          setPage(storedQuestion.filters.page || 1);
          setWantToSortDesc(storedQuestion.filters.sorting || false);
          setHighFrequency(storedQuestion.filters.frequency || false);
          setIsPracticed(storedQuestion.filters.practiced || "all");
          setDifficulty(storedQuestion.filters.difficulty || null);
          setIsEasy(storedQuestion.filters.isEasy || null);
          setFilterBookmarked(storedQuestion.filters.bookmarked || false);
          setFilterPrediction(storedQuestion.filters.prediction || false);
          setSearchTerm(storedQuestion.filters.searchTerm || "");
        }
      }
      resolve();
    });
  };

  const setCurrentQuestion = (question, index) => {
    storeQuestionInSession(question, index);
    setCurrentQuestionIndex(index);
    setQuestionId(question.QuestionId);
    setTestQuestionTableId(question.TestQuestionTableId);
  };
  
  const fetchData = useCallback(async (questionname) => {
    // setQuestionsData(null);
    // setTestQuestions([]);

    const storedQuestion = getStoredQuestion();
    const pendingIndex = sessionStorage.getItem("pendingIndex");

    const encodedQuestionName = encodeURIComponent(questionname);
    const SearchedQuestion = sessionStorage.getItem("SearchedQuestion_QuestionId");
    const searchQueryParam = SearchedQuestion ? `&search_name=${encodeURIComponent(SearchedQuestion)}` : searchTerm ? `&search_name=${encodeURIComponent(searchTerm)}` : "";
    const highFrequencyParam = highFrequency ? `&high_frequency=true` : "";
    const sortDescParam = wantToSortDesc ? "asc" : "desc";
    const isPracticedParam = isPracticed === "all" ? "" : `&is_practiced=${isPracticed}`;
    const isPredictionParam = filterPrediction ? `&prediction=${filterPrediction}` : `&prediction=${false}`;

    let difficultyParam = "";
    if (questionname === 'Write From Dictation' || questionname === 'Repeat Sentence') {
        difficultyParam = isEasy === true || isEasy === false ? `&easy=${isEasy}` : "";
    } else if (questionname === 'Read Aloud' || questionname === 'Re-tell Lecture' || questionname === 'Respond to a situation') {
        difficultyParam = "";
    } else {
        difficultyParam = difficulty != null ? `&difficulty_level=${difficulty}` : "";
    }

    const queryParams = `test_name=${encodedQuestionName}&page=${page}&bookmarked=${filterBookmarked}&is_ptecore=${isPteCore}&order_by=${sortDescParam}${highFrequencyParam}${isPracticedParam}${searchQueryParam}${isPredictionParam}${difficultyParam}`;

    try {
      const url = `${Base_URL}/app/users/test-questions/get-by-name?${queryParams}`;
      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.responseCode === 501) {
        logout();
        navigate("/login");
        return;
      }

      if (!data?.response?.length) {
        setQuestionsData(null);
        setTestQuestions([]);
        return;
      }

      setTestQuestions(data);
      setTotalPages(Math.ceil((data.totalQuestions || 1) / 8));

      if (pendingIndex && data?.response?.length > 0) {
        const newIndex = pendingIndex === "LAST" ? data.response.length - 1 : 0;
        setCurrentQuestion(data.response[newIndex], newIndex);
        sessionStorage.removeItem("pendingIndex");
        return;
      }

      if (storedQuestion?.questionId && storedQuestion.currentPath === window.location.pathname) {
        const foundIndex = data.response.findIndex(q => q.QuestionId === storedQuestion.questionId);
        if (foundIndex >= 0) {
          setCurrentQuestion(data.response[foundIndex], foundIndex);
          return;
        }
      }

      setCurrentQuestion(data.response[0], 0);
    } catch (error) {
      console.error("Failed to fetch test questions:", error);
    } finally {
      setIsDataLoading(false);
    }
  });

  const storeQuestionInSession = (question, index) => {
    const data = {
      questionId: question.QuestionId,
      testQuestionTableId: question.TestQuestionTableId,
      currentQuestionIndex: index,
      currentPath: window.location.pathname,
      filters: {
        page,
        sorting: wantToSortDesc,
        frequency: highFrequency,
        practiced: isPracticed,
        difficulty,
        isEasy,
        bookmarked: filterBookmarked,
        prediction: filterPrediction,
        searchTerm,
      }
    };
    sessionStorage.setItem("storedQuestion", JSON.stringify(data));
  };

  const handleFiltersAndFetch = async (testName) => {
    if (!pageReloaded) {
      storeFiltersInSession();
    }

    if (sessionLoading) {
      await loadSessionFilters();
      setSessionLoading(false);
      setPageReloaded(false);
    }

    if (!sessionLoading) {
      await fetchData(testName);
    }
  };

  useEffect(() => {
    if (questionsData) {
      setIsDataLoading(false);
    }
  }, [questionsData]);

  function getQuestionName() {
    const questionTemp = testQuestions?.response?.find(
      (q) => q.QuestionId === questionId
    );
    if (questionTemp) {
      return questionTemp.QuestionName;
    } else {
      return "loading";
    }
  }

  const updateLocalQuestionBookmark = (
    testQuestionTableId,
    newBookmarkStatus,
    bookmarkId,
  ) => {
    setTestQuestions((prevQuestions) => ({
      ...prevQuestions,
      response: prevQuestions.response.map((question) =>
        question.TestQuestionTableId === testQuestionTableId
          ? {
              ...question,
              IsBookMarked: newBookmarkStatus,
              BookMarkedId: newBookmarkStatus ? bookmarkId : null,
            }
          : question,
      ),
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (testQuestions?.response?.length - 1 || 0)) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = testQuestions?.response[nextIndex];
      setCurrentQuestionIndex(nextIndex);
      storeQuestionInSession(nextQuestion, nextIndex);
    } else if (page < totalPages) {
      sessionStorage.setItem("pendingIndex", "FIRST");
      setPage(page + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      const prevQuestion = testQuestions?.response[prevIndex];
      setCurrentQuestionIndex(prevIndex);
      storeQuestionInSession(prevQuestion, prevIndex);
    } else if (page > 1) {
      sessionStorage.setItem("pendingIndex", "LAST");
      setPage(page - 1);
    }
  };

  const handleMyAttemptedQuestionsScore = (score, openScorecard) => {
    setMyAttemptedQuestionsScore(score);
    if (openScorecard) {
      setShouldOpenScorecard(true);
    }
  };

  useEffect(() => {
    if (shouldOpenScorecard) {
      setScorecardOpen(true);
      setShouldOpenScorecard(false);
    }
  }, [shouldOpenScorecard]);

  useEffect(() => {
    const question = testQuestions?.response?.find((q) => q.QuestionId === questionId);
    if (question) {
      setIsBookmarked(question.IsBookMarked);
      setBookmarkId(question.BookMarkedId);
      setTestAttemptedCount(question.TestAttemptedCount);
    }
  }, [testQuestions, testQuestionTableId]);

  const handleBookmarkChange = (newIsBookmarked, newBookmarkId) => {
    setIsBookmarked(newIsBookmarked);
    setBookmarkId(newBookmarkId);
  };

  useEffect(() => {
    if (
      testQuestions?.response &&
      testQuestions?.response.length > 0 &&
      currentQuestionIndex < testQuestions?.response.length
    ) {
      const question = testQuestions?.response[currentQuestionIndex];
      setQuestionId(question.QuestionId);
      setTestQuestionTableId(question.TestQuestionTableId);
    }
  }, [testQuestions, currentQuestionIndex]);

  useEffect(() => {
    if (!pageReloaded) {
      setPage(1);
    }
  }, [filterBookmarked, filterPrediction]);

  const calculateDaysDifference = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = currentDate - createdDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff < 60;
  };

  const getSignedURL = async () => {
    const config = {
      method: "get",
      url: `${Base_URL}/app/users/mock-attempted-questions/signed-url`,
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error getting signed URL:", error);
      return { error: error.message };
    }
  };

  const uploadAudioFile = async (signedUrl, file) => {
    try {
      const res = await axios.put(signedUrl, file, {
        withCredentials: false,
        headers: {
          "Content-Type": file.type,
        },
      });
      return res.status === 200;
    } catch (error) {
      console.error("Error uploading audio file:", error);
      return false;
    }
  };

  const handleAudioCompletion = () => {
    setIsAudioCompleted(true);
  };

  const handleRecordingStart = () => {
    setIsRecordingStarted(true);
    setIsAudioPlayerDisabled(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleRecordingStop = () => {
    setIsRecordingStopped(true);
  };

  const handleSetRecordedWavFile = (file) => {
    setRecordedWavFile(file);
  };

  const handleSetCanSubmit = (status) => {
    setCanSubmit(status);
  };

  useEffect(() => {
    if (!questionsData?.response?.QuestionImage) {
      setIsDataLoading(false);
    }
  }, [questionsData]);

  const resetAllStates = useCallback(() => {
    setTestQuestions([]);
    setQuestionsData(null);
    // setSelectedAnswers([]);
    setCorrectAnswers([""]);
    setPage(1);
    setTotalPages(undefined);
    setWantToSortDesc(false);
    setHighFrequency(false);
    setFilterBookmarked(false);
    setFilterPrediction(false);
    setIsPracticed("all");
    setDifficulty(null);
    setIsEasy(null);
    setSearchTerm("");
    setQuestionId(undefined);
    setTestQuestionTableId(undefined);
    setCurrentQuestionIndex(0);
    setIsBookmarked(false);
    setBookmarkId(null);
    setTestAttemptedCount(null);
    setMyAttemptedQuestionsScore(null);
    setShouldOpenScorecard(false);
    setScorecardOpen(false);
    setIsSidePanelOpen(false);
    setIsDataLoading(false);
    setSessionLoading(true);
    setPageReloaded(true);
    setShowAnswer(false);
    setIsSubmitted(false);
    setElapsedTime(0);
    setTriggerReset(false);
    setEnableSkillsData([]);
    setScoreDataSubmitted(false);
    setMarksObtained(0);
    setIsScoreDataReadyForSubmit(false);
    setLastScoreUpdate(Date.now());
    
    setIsAudioCompleted(false);
    setIsRecordingStarted(false);
    setIsRecordingStopped(false);
    setIsAudioPlayerDisabled(false);
    setRecordedWavFile(null);
    setCanSubmit(false);
    setRecordedAudio("");
    setAutoStartRecording(false);
    setAudioURL("");
    setUrlLoading(false);
    setIsLoading(false);
  
    sessionStorage.removeItem("storedQuestion");
    sessionStorage.removeItem("pendingIndex");
    sessionStorage.removeItem("SearchedQuestion_QuestionId");
  }, []);

  return (
    <TestQuestionContext.Provider
      value={{
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
        testAttemptedCount,
        setTestAttemptedCount,
        bookmarkId,
        setBookmarkId,
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

        resetAllStates,
      }}
    >
      {children}
    </TestQuestionContext.Provider>
  );
};

export const useTestQuestions = () => useContext(TestQuestionContext);
