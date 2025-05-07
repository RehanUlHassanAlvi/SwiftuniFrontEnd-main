import React, { useEffect, useState } from "react";
import { Base_URL } from "../../Client/apiURL";
import axios from "axios";
import CalculateMockTestsCategoryWiseScores from "./CalculateMockTestsCategoryWiseScores";

const fetchMockTestScore = async ({
    url,
    setIsLoading,
    withCredentials,
}) => {
    setIsLoading(true);

    try {
        const response = await axios.get(url, { withCredentials: withCredentials });

        if (response.data.responseCode === 200 && response.data.message === "Average Score") {
            const parsedResponses = response.data.response.map((item) => {
                let parsedUserResponse = null;
                if (item.UserResponse) {
                    try {
                        const firstParse = JSON.parse(item.UserResponse);
                        parsedUserResponse = typeof firstParse === "string" ? JSON.parse(firstParse) : firstParse;
                    } catch (parseError) {
                        console.error("Error parsing UserResponse:", parseError);
                        parsedUserResponse = null;
                    }
                }
                return {
                    ...item,
                    UserResponse: parsedUserResponse,
                };
            });

            const hasScore = parsedResponses.some((item) => item.UserResponse !== null);

            if (hasScore) {
                return { success: true, message: "Score fetched successfully", data: parsedResponses };
            } else {
                return { success: false, message: "No score available" };
            }

        } else if (response.data.responseCode === 300 && response.data.message === "Something went wrong while getting Average Score") {
            return { success: false, message: "No Mock Test Data available in record." };
        } else {
            return { success: false, message: "Unexpected response from the server." };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { success: false, message: "Failed to fetch mock test scores." };
    }
};

const LastFourMockTestsAverageScore = ({ setIsLoading, setAverageScores }) => {
    const [mockTestData, setMockTestData] = useState({});
    const [mockTestScores, setMockTestScores] = useState({});

    useEffect(() => {
        const fetchAndHandleScoreData = async () => {
            const result = await fetchMockTestScore({
                url: `${Base_URL}/app/users/average-score`,
                setIsLoading,
                withCredentials: true,
            });

            if (result.success) {
                processMockTests(result.data);
            } else {
              console.error(result.message);
            }
        };

        fetchAndHandleScoreData();
    }, []);

    const processMockTests = (data) => {
        const groupedTests = {};

        data.forEach((test) => {
            const MockTestAttemptId = test.MockTestAttemptId;
            if (!groupedTests[MockTestAttemptId]) {
                groupedTests[MockTestAttemptId] = [];
            }
            groupedTests[MockTestAttemptId].push(test);
        });

        setMockTestData(groupedTests);
    };

    const updateScores = (MockTestAttemptId, scores) => {
      setMockTestScores((prevScores) => ({
          ...prevScores,
          [MockTestAttemptId]: scores,
      }));
  };

  useEffect(() => {
      if (Object.keys(mockTestScores).length === Object.keys(mockTestData).length) {
          calculateAverages();
      }
  }, [mockTestScores]);

  const calculateAverages = () => {
      const allSpeakingScores = [];
      const allWritingScores = [];
      const allReadingScores = [];
      const allListeningScores = [];
      const allOverallScores = [];

      Object.values(mockTestScores).forEach((testScores) => {
        allSpeakingScores.push(testScores?.speaking || 0);
        allWritingScores.push(testScores?.writing || 0);
        allReadingScores.push(testScores?.reading || 0);
        allListeningScores.push(testScores?.listening || 0);

        const overall = (testScores?.speaking + testScores?.writing + testScores?.reading + testScores?.listening) / 4;
        allOverallScores.push(overall);
      });

      const averageSpeaking = averageScore(allSpeakingScores);
      const averageWriting = averageScore(allWritingScores);
      const averageReading = averageScore(allReadingScores);
      const averageListening = averageScore(allListeningScores);
      const averageOverall = averageScore(allOverallScores);

      setAverageScores({
        speakingAverage: Math.round(averageSpeaking),
        writingAverage: Math.round(averageWriting),
        readingAverage: Math.round(averageReading),
        listeningAverage: Math.round(averageListening),
        overallAverage: Math.round(averageOverall),
      });

      setIsLoading(false);
  };

  const averageScore = (scores) => {
      const sum = scores.reduce((acc, score) => acc + score, 0);
      return sum / scores.length;
  };

    return (
        <div>
            {Object.keys(mockTestData).map((MockTestAttemptId) => (
              <CalculateMockTestsCategoryWiseScores
                key={MockTestAttemptId}
                singleMockTestData={mockTestData[MockTestAttemptId]}
                updateScores={(scores) => updateScores(MockTestAttemptId, scores)}
              />
            ))}
        </div>
    );
};

export default LastFourMockTestsAverageScore;
