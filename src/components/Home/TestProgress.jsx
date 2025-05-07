import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AnalyticDivOne,
  MainDiv,
  RefreshDiv,
  RefreshDivText,
  RefreshImg,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";
import Refresh from "../../assets/images/refreshimg.svg";
import AnalyticsCard1 from "./AnalyticsCard1";
import { CardBottomData } from "./data";
import { useMediaQuery } from "@mui/material";
import AnalyticsCard2 from "./AnalyticsCard2";
import CardBottom from "../Home/CardBottom";
import CircularLoader from "../Login/CircularLoader";

import TodayTaskImg1 from "../../assets/todaytaskcard/todaytaskimg1.svg";
import TodayTaskImg2 from "../../assets/todaytaskcard/todaytaskimg2.svg";
import TodayTaskImg3 from "../../assets/todaytaskcard/todaytaskimg3.svg";
import TodayTaskImg4 from "../../assets/todaytaskcard/todaytaskimg4.svg";
import MockTestImg from "../../assets/todaytaskcard/mocktestimg.svg";
import LoadingModal from "../Common/LoadingModal";
import { useAuth } from "../../authentication/Auth";
import { Base_URL } from "../../Client/apiURL";
import axios from "axios";

const getInitialAnalyticsStaticData = (pteType) => {
  const analyticsBaseData = {
    speaking: {
      id: 1,
      imageSrc: TodayTaskImg4,
      titleText: "Speaking",
      titleTextColor: "#49D7F2",
      marksTextColor: "#66E0F7CC",
      barBgColor: "rgba(73, 215, 242, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Read Aloud",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Repeat Sentence",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Describe Image",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Re-Tell Lecture",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Answer Short Question",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    },
    listening: {
      id: 2,
      imageSrc: TodayTaskImg2,
      titleText: "Listening",
      titleTextColor: "#868EAF",
      marksTextColor: "#868EAFCC",
      barBgColor: "rgba(134, 142, 175, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Summarize Spoken Text",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Incorrect Words",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Fill in the Blanks",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Write from Dictation",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Correct Summary",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Select Missing Word",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    },
    writing: {
      id: 3,
      imageSrc: TodayTaskImg3,
      titleText: "Writing",
      titleTextColor: "#FF5D5D",
      marksTextColor: "#FF5D5DCC",
      barBgColor: "rgba(255, 93, 93, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Summarize Written Text",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Write Essay",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    },
    reading: {
      id: 4,
      imageSrc: TodayTaskImg1,
      titleText: "Reading",
      titleTextColor: "#AD826E",
      marksTextColor: "#AD826ECC",
      barBgColor: "rgba(173, 130, 110, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Reading & Writing: Fill in the Blanks",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Reading: Fill in the Blanks",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Re-order Paragraphs",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    },
    // mockTest: {
    //   id: 5,
    //   imageSrc: MockTestImg,
    //   titleText: "Mock Test",
    //   titleTextColor: "#FD3C65",
    //   marksTextColor: "#FD3C65CC",
    //   barBgColor: "rgba(253, 60, 101, 0.2)",
    //   totalQuestions: 15,
    //   totalAttemptedQuestions: 8,
    //   categoriesData: [
    //     {
    //       CategoryName: "Full Mock Tests",
    //       TotalCount: "A",
    //       attemptedcount: "N",
    //       totalProgress: "90",
    //       chunkCount: "10",
    //     },

    //     {
    //       CategoryName: "Sectional Mock Tests",
    //       TotalCount: "A",
    //       attemptedcount: "N",
    //       totalProgress: "90",
    //       chunkCount: "10",
    //     },
    //   ],
    // },
  };

  if (pteType === "pte core") {
    analyticsBaseData.speaking = {
      id: 1,
      imageSrc: TodayTaskImg4,
      titleText: "Speaking",
      titleTextColor: "#49D7F2",
      marksTextColor: "#66E0F7CC",
      barBgColor: "rgba(73, 215, 242, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Read Aloud",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Repeat Sentence",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Describe Image",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Respond to a Situation",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "50",
          chunkCount: "10",
        },
        {
          CategoryName: "Answer Short Question",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    };
    analyticsBaseData.listening = {
      id: 2,
      imageSrc: TodayTaskImg2,
      titleText: "Listening",
      titleTextColor: "#868EAF",
      marksTextColor: "#868EAFCC",
      barBgColor: "rgba(134, 142, 175, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Summarize Spoken Text",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Highlight Incorrect Words",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Fill in the Blanks",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Write from Dictation",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Select Missing Word",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    };
    analyticsBaseData.writing = {
      id: 3,
      imageSrc: TodayTaskImg3,
      titleText: "Writing",
      titleTextColor: "#FF5D5D",
      marksTextColor: "#FF5D5DCC",
      barBgColor: "rgba(255, 93, 93, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Summarize Written Text",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Write Email",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    };
    analyticsBaseData.reading = {
      id: 4,
      imageSrc: TodayTaskImg1,
      titleText: "Reading",
      titleTextColor: "#AD826E",
      marksTextColor: "#AD826ECC",
      barBgColor: "rgba(173, 130, 110, 0.2)",
      totalQuestions: 15,
      totalAttemptedQuestions: 8,
      categoriesData: [
        {
          CategoryName: "Reading & Writing: Fill in the Blanks",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Reading: Fill in the Blanks",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Multiple Answers",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Re-order Paragraphs",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
        {
          CategoryName: "Multiple Choice, Single Answer",
          TotalCount: "0",
          attemptedcount: "0",
          totalProgress: "0",
          chunkCount: "10",
        },
      ],
    };
    // analyticsBaseData.mockTest = {
    //   id: 5,
    //   imageSrc: MockTestImg,
    //   titleText: "Mock Test",
    //   titleTextColor: "#FD3C65",
    //   marksTextColor: "#FD3C65CC",
    //   barBgColor: "rgba(253, 60, 101, 0.2)",
    //   totalQuestions: 15,
    //   totalAttemptedQuestions: 8,
    //   categoriesData: [
    //     {
    //       CategoryName: "Full Mock Tests",
    //       TotalCount: "A",
    //       attemptedcount: "N",
    //       totalProgress: "90",
    //       chunkCount: "10",
    //     },

    //     {
    //       CategoryName: "Sectional Mock Tests",
    //       TotalCount: "A",
    //       attemptedcount: "N",
    //       totalProgress: "90",
    //       chunkCount: "10",
    //     },
    //   ],
    // };
  }

  return analyticsBaseData;
};

const calculatePercentage = (attempted, total) => {
  if (total === 0) return "0%";
  
  const rawPercentage = (attempted / total) * 100;
  
  if (rawPercentage > 0 && rawPercentage < 1) {
    return "<1%";
  }
  
  if (rawPercentage >= 1 && rawPercentage < 100) {
    return `${Math.round(rawPercentage)}%`;
  }
  
  return `${Math.round(rawPercentage)}%`;
};

const TestProgress = ({userId = null, pteType = localStorage.getItem("pte-type") || "pte academic"}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isTab = useMediaQuery("(max-width:700px)");
  const isMobile = useMediaQuery("(max-width:450px)");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  // const [pteType, setPteType] = useState(localStorage.getItem("pte-type") || "pte academic");
  const [analyticsStaticData, setAnalyticsStaticData] = useState(getInitialAnalyticsStaticData(pteType));
  const [analyticsMockTestData, setAnalyticsMockTestData] = useState(null);
  const [analyticsMockTestResponse, setAnalyticsMockTestResponse] = useState(null);
  const [analyticsCard1Data, setAnalyticsCard1Data] = useState([]);
  const [questionsAnalysis, setQuestionsAnalysis] = useState(null);

  const normalizeName = (name) => {
    return name
      .toLowerCase()
      .replace(/[-: ]+/g, "")
      .replace(/^listening|reading|writing|speaking/, "")
      .replace("retell", "retell");
  };

  useEffect(() => {
    setAnalyticsStaticData(getInitialAnalyticsStaticData(pteType));
  }, [pteType]);

  const updateAnalyticsStaticData = (data) => {
    setAnalyticsStaticData((prevState) => {
      const analysis = data.Analysis
        ? data.Analysis.user_analysis
        : data.user_analysis;

      if (!analysis) {
        console.error("No analysis data found, returning previous state");
        return prevState;
      }

      const updatedData = { ...prevState };
      for (const section in analysis) {
        if (updatedData[section.toLowerCase()]) {
          const sectionData = analysis[section];
          const tests = sectionData.Tests;

          updatedData[section.toLowerCase()].totalQuestions =
            sectionData["Total Questions"];
          updatedData[section.toLowerCase()].totalAttemptedQuestions =
            sectionData["Total Attempted Questions"];

          updatedData[section.toLowerCase()].categoriesData = updatedData[
            section.toLowerCase()
          ].categoriesData.map((category) => {
            const matchingCategoryKey = Object.keys(tests).find(
              (testKey) =>
                normalizeName(testKey) === normalizeName(category.CategoryName)
            );
            if (matchingCategoryKey) {
              const matchingCategory = tests[matchingCategoryKey];
              return {
                ...category,
                TotalCount: matchingCategory.TotalCount,
                attemptedcount: matchingCategory.attemptedcount,
              };
            }
            return category;
          });
        }
      }
      return updatedData;
    });
  };

  const fetchData = async (url) => {
    // setIsLoading(true);
    try {
      let fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      };

      if (!userId) {
        fetchConfig.credentials = "include";
      }

      const response = await fetch(url, fetchConfig);
      const data = await response.json();

      if (data.responseCode === 200 && data.response) {
        updateAnalyticsStaticData(data.response);
        if (data.response.LastUpdated) {
          setLastUpdated(data.response.LastUpdated);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (analyticsMockTestResponse) {
      setAnalyticsMockTestData({
        id: 5,
        imageSrc: MockTestImg,
        titleText: "Mock Test",
        titleTextColor: "#FD3C65",
        marksTextColor: "#FD3C65CC",
        barBgColor: "rgba(253, 60, 101, 0.2)",
        totalQuestions: analyticsMockTestResponse?.["Full Mock Tests"]?.total + analyticsMockTestResponse?.["Sectional Mock Tests"]?.total || 0,
        totalAttemptedQuestions: analyticsMockTestResponse?.["Full Mock Tests"]?.attempted + analyticsMockTestResponse?.["Sectional Mock Tests"]?.attempted || 0,
        categoriesData: [
          {
            CategoryName: "Full Mock Tests",
            TotalCount: analyticsMockTestResponse?.["Full Mock Tests"]?.total || "0",
            attemptedcount: analyticsMockTestResponse?.["Full Mock Tests"]?.attempted || "0",
            totalProgress: "90",
            chunkCount: "10",
          },
          {
            CategoryName: "Sectional Mock Tests",
            TotalCount: analyticsMockTestResponse?.["Sectional Mock Tests"]?.total || "0",
            attemptedcount: analyticsMockTestResponse?.["Sectional Mock Tests"]?.attempted || "0",
            totalProgress: "90",
            chunkCount: "10",
          },
        ],
      });
    }
  }, [analyticsMockTestResponse]);

  useEffect(() => {
    if (questionsAnalysis) {
      setAnalyticsCard1Data(
        [{
          id: 1,
          count: questionsAnalysis?.predictedQuestions?.total || "0",
          attempted: questionsAnalysis?.predictedQuestions?.attempted || "0",
          TextColor: "#FD3C65",
          percentage: calculatePercentage(
            questionsAnalysis?.predictedQuestions?.attempted || 0,
            questionsAnalysis?.predictedQuestions?.total || 1
          ),
          percentageBackgroundColor: "rgba(253, 60, 101, 0.10)",
          Question: "Prediction Questions",
          totalProgress: "60",
          chunkCount: "6",
          borderRadius: "10px 0px 0px 10px",
          marginBottom: true,
        },
        {
          id: 2,
          count: questionsAnalysis?.speakingQuestions?.total || "0",
          attempted: questionsAnalysis?.speakingQuestions?.attempted || "0",
          TextColor: "#49D7F2",
          percentage: calculatePercentage(
            questionsAnalysis?.speakingQuestions?.attempted || 0,
            questionsAnalysis?.speakingQuestions?.total || 1
          ),
          percentageBackgroundColor: "rgba(73, 215, 242, 0.10)",
          Question: "Speaking Questions",
          totalProgress: "60",
          chunkCount: "6",
          borderRadius: "0px",
          marginBottom: true,
        },
        {
          id: 3,
          count: questionsAnalysis?.writingQuestions?.total || "0",
          attempted: questionsAnalysis?.writingQuestions?.attempted || "0",
          TextColor: "#FF5D5D",
          percentage: calculatePercentage(
            questionsAnalysis?.writingQuestions?.attempted || 0,
            questionsAnalysis?.writingQuestions?.total || 1
          ),
          percentageBackgroundColor: "rgba(255, 93, 93, 0.10)",
          Question: "Writing Questions",
          totalProgress: "60",
          chunkCount: "6",
          borderRadius: "0px",
          marginBottom: true,
        },
        {
          id: 4,
          count: questionsAnalysis?.readingQuestions?.total || "0",
          attempted: questionsAnalysis?.readingQuestions?.attempted || "0",
          TextColor: "#AD826E",
          percentage: calculatePercentage(
            questionsAnalysis?.readingQuestions?.attempted || 0,
            questionsAnalysis?.readingQuestions?.total || 1
          ),
          percentageBackgroundColor: "rgba(173, 130, 110, 0.10)",
          Question: "Reading Questions",
          totalProgress: "60",
          chunkCount: "6",
          borderRadius: "0px",
          marginBottom: true,
        },
        {
          id: 5,
          count: questionsAnalysis?.listeningQuestions?.total || "0",
          attempted: questionsAnalysis?.listeningQuestions?.attempted || "0",
          TextColor: "#868EAF",
          percentage: calculatePercentage(
            questionsAnalysis?.listeningQuestions?.attempted || 0,
            questionsAnalysis?.listeningQuestions?.total || 1
          ),
          percentageBackgroundColor: "rgba(134, 142, 175, 0.10)",
          Question: "Listening Questions",
          totalProgress: "60",
          chunkCount: "6",
          borderRadius: "0px 10px 10px 0px",
        }])
    }
  }, [questionsAnalysis]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const is_ptecore = pteType === "pte academic" ? false : true;
        let url = ``;
        let fetchConfig = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        };
  
        if (userId) {
          url = `${Base_URL}/app/admin/dashboard-questions-analysis?is_ptecore=${is_ptecore}&user_id=${userId}`;
        } else {
          url = `${Base_URL}/app/users/dashboard-questions-analysis?is_ptecore=${is_ptecore}`;
          fetchConfig.credentials = "include";
        }
  
        const response = await fetch(url, fetchConfig);
        const data = await response.json();
        if (data.responseCode === 200) {
          if (isMounted) {
            setQuestionsAnalysis(data.response.get_question_counts_by_user);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard questions analysis:", error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [pteType]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
        try {
          {userId && setIsRefreshLoading(true)}
          const is_ptecore = pteType === "pte academic" ? false : true;
          let url = ``;
          let fetchConfig = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          };
    
          if (userId) {
            url = `${Base_URL}/app/admin/dashboard-mock-test-analysis?is_ptecore=${is_ptecore}&user_id=${userId}`;
          } else {
            url = `${Base_URL}/app/users/dashboard-mock-test-analysis?is_ptecore=${is_ptecore}`;
            fetchConfig.credentials = "include";
          }
    
          const response = await fetch(url, fetchConfig);
          const data = await response.json();
          if (data.responseCode === 200) {
            if (isMounted) {
              setAnalyticsMockTestResponse(data.response.get_mock_test_counts_by_user);
            }
            {userId && setIsRefreshLoading(false)}
          }
        } catch (error) {
          {userId && setIsRefreshLoading(false)}
          console.error("Error fetching dashboard questions analysis:", error);
        };
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [pteType]);

  useEffect(() => {
    const is_ptecore = pteType === "pte academic" ? false : true;
    let url = ``;
    if (userId) {
      url = `${Base_URL}/app/admin/user-analysis?is_ptecore=${is_ptecore}&user_id=${userId}`;
    } else {
      url = `${Base_URL}/app/users/stored-analysis?is_ptecore=${is_ptecore}`;
    }

    fetchData(url);
  }, [pteType]);

  const handleRefresh = async () => {
    const is_ptecore = pteType === "pte academic" ? false : true;
    const url = `${Base_URL}/app/users/user-analysis?is_ptecore=${is_ptecore}`;

    setIsRefreshLoading(true);
    setIsLoading(true);

    const headers = {
      method: "GET",
      "Content-Type": "application/json",
      credentials: "include",
    };

    try {
      const response = await fetch(url, headers);
      const data = await response.json();
      if (data.responseCode === 200 && data.response) {
        updateAnalyticsStaticData(data.response);
        setLastUpdated(new Date().toISOString());
      } else if (data.responseCode === 501) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRefreshLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <FlexDiv style={{ width: "100%", flexDirection: "column", maxWidth: "1680px" }}>
      {(isRefreshLoading) && <LoadingModal />}
      <MainDiv>
        <FlexDiv
          style={{
            justifyContent: "space-between",
            display: userId ? "none" : "flex",
          }}
        >
          <RefreshDiv onClick={handleRefresh}>
            {isLoading ? (
              <FlexDiv style={{ gap: "0.5rem" }}>
                <CircularLoader disableShrink size={18} color={"#996cfe"} />
                <RefreshDivText>Refreshing...</RefreshDivText>
              </FlexDiv>
            ) : (
              <>
                <RefreshImg alt="" src={Refresh} />
                <RefreshDivText>Refresh Analytics</RefreshDivText>
              </>
            )}
          </RefreshDiv>
          <RefreshDiv
            style={{
              border: isTab ? "none" : "",
            }}
          >
            {/* <RefreshDivText
              style={{
                fontWeight: "400",
                textAlign: "right",
              }}
            >
              Last updated on{" "}
              {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "N/A"}
            </RefreshDivText> */}
            <RefreshDivText style={{ fontWeight: "400", textAlign: "right" }}>
              Last updated on{" "}
              {lastUpdated
                ? new Date(lastUpdated).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })
                : "N/A"}
            </RefreshDivText>
          </RefreshDiv>
        </FlexDiv>
        
        {!isTab ? (
          <>
            <FlexDiv
              style={{
                marginTop: "20px",
              }}
            >
              {questionsAnalysis && analyticsCard1Data.map((data, index) => (
                <AnalyticsCard1
                  key={data.id}
                  count={data.count}
                  attempted={data.attempted}
                  TextColor={data.TextColor}
                  percentage={data.percentage}
                  percentageBackgroundColor={data.percentageBackgroundColor}
                  Question={data.Question}
                  totalProgress={data.totalProgress}
                  chunkCount={data.chunkCount}
                  borderRadius={data.borderRadius}
                />
              ))}
            </FlexDiv>
            <FlexDiv
              style={{
                marginTop: "20px",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <FlexDiv
                style={{ flexDirection: "column", gap: "14px", width: "100%" }}
              >
                {/* SPEAKING */}
                <AnalyticsCard2
                  key={analyticsStaticData.speaking.id}
                  imageSrc={analyticsStaticData.speaking.imageSrc}
                  titleText={analyticsStaticData.speaking.titleText}
                  titleTextColor={analyticsStaticData.speaking.titleTextColor}
                  marksTextColor={analyticsStaticData.speaking.marksTextColor}
                  barBgColor={analyticsStaticData.speaking.barBgColor}
                  categoriesData={analyticsStaticData.speaking.categoriesData}
                  totalProgress={analyticsStaticData.speaking.totalProgress}
                  chunkCount={analyticsStaticData.speaking.chunkCount}
                  widthOne={"35px"}
                />
                <AnalyticsCard2
                  key={analyticsStaticData.listening.id}
                  imageSrc={analyticsStaticData.listening.imageSrc}
                  titleText={analyticsStaticData.listening.titleText}
                  titleTextColor={analyticsStaticData.listening.titleTextColor}
                  marksTextColor={analyticsStaticData.listening.marksTextColor}
                  barBgColor={analyticsStaticData.listening.barBgColor}
                  categoriesData={analyticsStaticData.listening.categoriesData}
                  totalProgress={analyticsStaticData.listening.totalProgress}
                  chunkCount={analyticsStaticData.listening.chunkCount}
                  widthOne={"35px"}
                />
              </FlexDiv>
              <AnalyticDivOne>
                <AnalyticsCard2
                  key={analyticsStaticData.writing.id}
                  imageSrc={analyticsStaticData.writing.imageSrc}
                  titleText={analyticsStaticData.writing.titleText}
                  titleTextColor={analyticsStaticData.writing.titleTextColor}
                  marksTextColor={analyticsStaticData.writing.marksTextColor}
                  barBgColor={analyticsStaticData.writing.barBgColor}
                  categoriesData={analyticsStaticData.writing.categoriesData}
                  totalProgress={analyticsStaticData.writing.totalProgress}
                  chunkCount={analyticsStaticData.writing.chunkCount}
                  widthOne={"35px"}
                />
                <AnalyticsCard2
                  key={analyticsStaticData.reading.id}
                  imageSrc={analyticsStaticData.reading.imageSrc}
                  titleText={analyticsStaticData.reading.titleText}
                  titleTextColor={analyticsStaticData.reading.titleTextColor}
                  marksTextColor={analyticsStaticData.reading.marksTextColor}
                  barBgColor={analyticsStaticData.reading.barBgColor}
                  categoriesData={analyticsStaticData.reading.categoriesData}
                  totalProgress={analyticsStaticData.reading.totalProgress}
                  chunkCount={analyticsStaticData.reading.chunkCount}
                  widthOne={"35px"}
                />
                {analyticsMockTestData && Object.keys(analyticsMockTestData).length > 0 && (
                  <AnalyticsCard2
                    key={analyticsMockTestData.id}
                    imageSrc={analyticsMockTestData.imageSrc}
                    titleText={analyticsMockTestData.titleText}
                    titleTextColor={analyticsMockTestData.titleTextColor}
                    marksTextColor={analyticsMockTestData.marksTextColor}
                    barBgColor={analyticsMockTestData.barBgColor}
                    categoriesData={analyticsMockTestData.categoriesData}
                    totalProgress={analyticsMockTestData.categoriesData[0].totalProgress}
                    chunkCount={analyticsMockTestData.categoriesData[0].chunkCount}
                    widthOne={"35px"}
                  />
                )}
              </AnalyticDivOne>
            </FlexDiv>
            <FlexDiv
              style={{
                flexDirection: "column",
                gap: "16px",
                marginTop: "1.5rem",
                display: userId ? "none" : "flex",
              }}
            >
              <FlexDiv
                style={{
                  // justifyContent:'space-between',
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <CardBottom
                  key={CardBottomData[0].id}
                  imageSrc={CardBottomData[0].imageSrc}
                  text={CardBottomData[0].text}
                  text_borderColor={CardBottomData[0].text_borderColor}
                  backgroundColor={CardBottomData[0].backgroundColor}
                  url={CardBottomData[0].url}
                />
                <CardBottom
                  key={CardBottomData[1].id}
                  imageSrc={CardBottomData[1].imageSrc}
                  text={CardBottomData[1].text}
                  text_borderColor={CardBottomData[1].text_borderColor}
                  backgroundColor={CardBottomData[1].backgroundColor}
                  url={CardBottomData[1].url}
                />
                <CardBottom
                  key={CardBottomData[2].id}
                  imageSrc={CardBottomData[2].imageSrc}
                  text={CardBottomData[2].text}
                  text_borderColor={CardBottomData[2].text_borderColor}
                  backgroundColor={CardBottomData[2].backgroundColor}
                  url={CardBottomData[2].url}
                />
                <CardBottom
                  key={CardBottomData[3].id}
                  imageSrc={CardBottomData[3].imageSrc}
                  text={CardBottomData[3].text}
                  text_borderColor={CardBottomData[3].text_borderColor}
                  backgroundColor={CardBottomData[3].backgroundColor}
                  url={CardBottomData[3].url}
                />
              </FlexDiv>
              <FlexDiv
                style={{
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <CardBottom
                  key={CardBottomData[4].id}
                  imageSrc={CardBottomData[4].imageSrc}
                  text={CardBottomData[4].text}
                  text_borderColor={CardBottomData[4].text_borderColor}
                  backgroundColor={CardBottomData[4].backgroundColor}
                  url={CardBottomData[4].url}
                />
                <CardBottom
                  key={CardBottomData[5].id}
                  imageSrc={CardBottomData[5].imageSrc}
                  text={CardBottomData[5].text}
                  text_borderColor={CardBottomData[5].text_borderColor}
                  backgroundColor={CardBottomData[5].backgroundColor}
                  url={CardBottomData[5].url}
                />
                <CardBottom
                  key={CardBottomData[6].id}
                  imageSrc={CardBottomData[6].imageSrc}
                  text={CardBottomData[6].text}
                  text_borderColor={CardBottomData[6].text_borderColor}
                  backgroundColor={CardBottomData[6].backgroundColor}
                  url={CardBottomData[6].url}
                />
                <CardBottom
                  key={CardBottomData[7].id}
                  imageSrc={CardBottomData[7].imageSrc}
                  text={CardBottomData[7].text}
                  text_borderColor={CardBottomData[7].text_borderColor}
                  backgroundColor={CardBottomData[7].backgroundColor}
                  url={CardBottomData[7].url}
                />
              </FlexDiv>
            </FlexDiv>
          </>
        ) : (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            {questionsAnalysis && analyticsCard1Data.map((data, index) => (
              <AnalyticsCard1
                key={data.id}
                count={data.count}
                attempted={data.attempted}
                TextColor={data.TextColor}
                percentage={data.percentage}
                percentageBackgroundColor={data.percentageBackgroundColor}
                Question={data.Question}
                totalProgress={data.totalProgress}
                chunkCount={data.chunkCount}
                borderRadius={data.borderRadius}
                marginBottom={data.marginBottom}
              />
            ))}

          </div>
        )}
      </MainDiv>
      {isTab && (
        <>
          {isRefreshLoading && <LoadingModal />}
          <FlexDiv
            style={{
              marginTop: "20px",
              flexDirection: "column",
              gap: "10px",
              width: "95%",
            }}
          >
            {Object.values(analyticsStaticData).map((data, index) => (
              <AnalyticsCard2
                key={index}
                imageSrc={data.imageSrc}
                titleText={data.titleText}
                titleTextColor={data.titleTextColor}
                marksTextColor={data.marksTextColor}
                barBgColor={data.barBgColor}
                categoriesData={data.categoriesData}
                totalProgress={data.totalProgress}
                chunkCount={data.chunkCount}
              />
            ))}

            {analyticsMockTestData && Object.keys(analyticsMockTestData).length > 0 && (
              <AnalyticsCard2
                key={analyticsMockTestData.id}
                imageSrc={analyticsMockTestData.imageSrc}
                titleText={analyticsMockTestData.titleText}
                titleTextColor={analyticsMockTestData.titleTextColor}
                marksTextColor={analyticsMockTestData.marksTextColor}
                barBgColor={analyticsMockTestData.barBgColor}
                categoriesData={analyticsMockTestData.categoriesData}
                totalProgress={analyticsMockTestData.categoriesData[0].totalProgress}
                chunkCount={analyticsMockTestData.categoriesData[0].chunkCount}
              />
            )}
          </FlexDiv>
          <FlexDiv
            style={{
              marginTop: "20px",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              display: userId ? "none" : "flex",
            }}
          >
            <FlexDiv
              style={{
                gap: "1rem",
                width: "100%",
              }}
            >
              <CardBottom
                key={CardBottomData[0].id}
                imageSrc={CardBottomData[0].imageSrc}
                text={CardBottomData[0].text}
                text_borderColor={CardBottomData[0].text_borderColor}
                backgroundColor={CardBottomData[0].backgroundColor}
                url={CardBottomData[0].url}
              />
              <CardBottom
                key={CardBottomData[1].id}
                imageSrc={CardBottomData[1].imageSrc}
                text={CardBottomData[1].text}
                text_borderColor={CardBottomData[1].text_borderColor}
                backgroundColor={CardBottomData[1].backgroundColor}
                url={CardBottomData[1].url}
              />
            </FlexDiv>
            <FlexDiv
              style={{
                width: "100%",
                gap: "1rem",
              }}
            >
              <CardBottom
                key={CardBottomData[2].id}
                imageSrc={CardBottomData[2].imageSrc}
                text={CardBottomData[2].text}
                text_borderColor={CardBottomData[2].text_borderColor}
                backgroundColor={CardBottomData[2].backgroundColor}
                url={CardBottomData[2].url}
              />
              <CardBottom
                key={CardBottomData[3].id}
                imageSrc={CardBottomData[3].imageSrc}
                text={CardBottomData[3].text}
                text_borderColor={CardBottomData[3].text_borderColor}
                backgroundColor={CardBottomData[3].backgroundColor}
                url={CardBottomData[3].url}
              />
            </FlexDiv>
            <FlexDiv
              style={{
                width: "100%",
                gap: "1rem",
              }}
            >
              <CardBottom
                key={CardBottomData[4].id}
                imageSrc={CardBottomData[4].imageSrc}
                text={CardBottomData[4].text}
                text_borderColor={CardBottomData[4].text_borderColor}
                backgroundColor={CardBottomData[4].backgroundColor}
                url={CardBottomData[4].url}
              />
              <CardBottom
                key={CardBottomData[5].id}
                imageSrc={CardBottomData[5].imageSrc}
                text={CardBottomData[5].text}
                text_borderColor={CardBottomData[5].text_borderColor}
                backgroundColor={CardBottomData[5].backgroundColor}
                url={CardBottomData[5].url}
              />
            </FlexDiv>
            <FlexDiv
              style={{
                width: "100%",
                gap: "1rem",
              }}
            >
              <CardBottom
                key={CardBottomData[6].id}
                imageSrc={CardBottomData[6].imageSrc}
                text={CardBottomData[6].text}
                text_borderColor={CardBottomData[6].text_borderColor}
                backgroundColor={CardBottomData[6].backgroundColor}
                url={CardBottomData[6].url}
              />
              <CardBottom
                key={CardBottomData[7].id}
                imageSrc={CardBottomData[7].imageSrc}
                text={CardBottomData[7].text}
                text_borderColor={CardBottomData[7].text_borderColor}
                backgroundColor={CardBottomData[7].backgroundColor}
                url={CardBottomData[7].url}
              />
            </FlexDiv>
          </FlexDiv>
        </>
      )}
    </FlexDiv>
  );
};

export default TestProgress;
