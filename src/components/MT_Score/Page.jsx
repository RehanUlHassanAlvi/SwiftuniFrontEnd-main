import React, { useState, useEffect } from "react";
import { Btn, FlexDiv } from "../../assets/styles/style";
import { MockTestEmpty, MockTextBtn } from "./style";
import { OptionText } from "../../components/StrategyVideos/Style";
import { useMediaQuery } from "@mui/material";
import MT_Card from "./MT_Card";
import axios from "axios";
import LoadingModal from "../Common/LoadingModal";
import { Base_URL } from "../../Client/apiURL";

const Options = [
  {
    id: "1",
    text: "Speaking",
  },
  {
    id: "2",
    text: "Writing",
  },
  {
    id: "3",
    text: "Reading",
  },
  {
    id: "4",
    text: "Listening",
  },
];

const changeDate = (dateStr) => {
  const date = new Date(dateStr);
  const dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(date);
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

  return `${formattedDate}, ${formattedTime}`;
};


const Page = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const [loading, setLoading] = useState(true);
  const [mockTests, setMockTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("Full Mock Test");
  const [selectedOption, setSelectedOption] = useState("Speaking");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const isPteCore = localStorage.getItem("pte-type") === "pte core";

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_URL}/app/users/mock-test-attempts/get`, { withCredentials: true });
      if (response.status === 200 && response.data.message === "Attempted Mock Tests:") {
        var sortedTests = (response?.data?.response || []).sort((a, b) => 
          new Date(b.DateTaken) - new Date(a.DateTaken)
        );

        if (isPteCore) {
          sortedTests = sortedTests.filter(test => test.Core === true);
        } else {
          sortedTests = sortedTests.filter(test => test.Core === false);
        }
  
        setMockTests(sortedTests);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // setLoading(true);
    try {
      const response = await axios.delete(
        `${Base_URL}/app/users/mock-test-attempts/delete?mock_test_attempted_id=${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMockTests(mockTests.filter((test) => test.MockTestAttemptId !== id));
      }
    } catch (error) {
      console.error("Error deleting mock test:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (testType) => {
    setSelectedTest(testType);
  };

  const filteredTests = mockTests.filter((test) => {
    if (selectedTest === "Full Mock Test") {
      return test.TestType === "Full";
    } else if (selectedTest === "Sectional Mock Test") {
      return test.TestType === selectedOption;
    }
    return false;
  }).map((test, index, array) => ({
    ...test,
    show: userData.IsSubscribed || index === 0 || array.length === 1
  }));


  return (
    <>
      {loading ? (
        <FlexDiv style={{ height: "100vh" }}>
          <LoadingModal />
        </FlexDiv>
      ) : (
        <FlexDiv
          style={{
            flexDirection: "column",
            padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
          }}
        >
          <FlexDiv style={{ gap: "1.25rem", marginBottom: "1.5rem" }}>
            <Btn>
              <MockTextBtn
                isSelected={selectedTest === "Full Mock Test"}
                onClick={() => handleButtonClick("Full Mock Test")}
              >
                Full Mock Test
              </MockTextBtn>
            </Btn>
            <Btn>
              <MockTextBtn
                isSelected={selectedTest === "Sectional Mock Test"}
                onClick={() => handleButtonClick("Sectional Mock Test")}
              >
                Sectional Mock Test
              </MockTextBtn>
            </Btn>
          </FlexDiv>

          {selectedTest === "Sectional Mock Test" && (
            <>
              <FlexDiv
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "1.63rem",
                }}
              >
                <FlexDiv style={{ gap: isTab ? "1rem" : "2rem" }}>
                  {Options.map((option) => (
                    <Btn
                      key={option.id}
                      onClick={() => {
                        setSelectedOption(option.text);
                      }}
                    >
                      <OptionText
                        style={{
                          color:
                            option.text === selectedOption
                              ? "var(--Brand-Purple, #996CFE)"
                              : "",
                          borderBottom:
                            option.text === selectedOption
                              ? "1px solid var(--Brand-Purple, #996CFE)"
                              : "",
                        }}
                      >
                        {option.text}
                      </OptionText>
                    </Btn>
                  ))}
                </FlexDiv>
              </FlexDiv>
            </>
          )}

          {/* {mockTests.map((data, index) => (
            <MT_Card
              key={index}
              headerText={data.MockTestName}
              dateText={"Date Taken: " + changeDate(data.DateTaken)}
              onDelete={() => handleDelete(data.MockTestAttemptId)}
              id={data.MockTestAttemptId}
            />
          ))} */}
{/* 
          {filteredTests.map((data, index) => {
            const analyticsPath =
              selectedTest === "Full Mock Test"
                ? `/mt-score-analytics/${data.MockTestAttemptId}`
                : `/mt-score-analytics-sectional/${data.MockTestAttemptId}`;
            const feedbackPath =
              selectedTest === "Full Mock Test"
                ? `/mt-score-feedback/${data.MockTestAttemptId}`
                : `/mt-score-feedback-sectional/${data.MockTestAttemptId}`;
            const viewScorePath =
              selectedTest === "Full Mock Test"
                ? `/mt-score-viewscore/${data.MockTestAttemptId}`
                : `/mt-score-viewscore-sectional/${data.MockTestAttemptId}`;

            return (
              <MT_Card
                key={index}
                headerText={data.MockTestName}
                dateText={"Date Taken: " + changeDate(data.DateTaken)}
                onDelete={() => handleDelete(data.MockTestAttemptId)}
                analyticsPath={analyticsPath}
                feedbackPath={feedbackPath}
                viewScorePath={viewScorePath}
              />
            );
          })} */}


          {filteredTests.map((data, index) => (
            <MT_Card
              key={index}
              headerText={data.MockTestName}
              dateText={"Date Taken: " + changeDate(data.DateTaken)}
              onDelete={() => handleDelete(data.MockTestAttemptId)}
              analyticsPath={selectedTest === "Full Mock Test" ? `/mt-score-analytics/${data.MockTestAttemptId}` : `/mt-score-analytics-sectional/${data.MockTestAttemptId}`}
              feedbackPath={selectedTest === "Full Mock Test" ? `/mt-score-feedback/${data.MockTestAttemptId}` : `/mt-score-feedback-sectional/${data.MockTestAttemptId}`}
              viewScorePath={selectedTest === "Full Mock Test" ? `/mt-score-viewscore/${data.MockTestAttemptId}` : `/mt-score-viewscore-sectional/${data.MockTestAttemptId}`}
              show={data.show}
            />
          ))}


          {filteredTests.length === 0 && (
            <FlexDiv>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "#999",
                  padding: "20px",
                  fontWeight: "500",
                }}
              >
                <div>
                  No{' '}
                  <span style={{ color: 'rgb(171 144 233)' }}>
                    {isPteCore ? 'Core' : 'Academic'}
                  </span>{' '}
                  Mock Test Attempted.
                </div>
              </div>
            </FlexDiv>
          )}
          {/* <Btn><MockTextBtn>View More</MockTextBtn></Btn>      */}
        </FlexDiv>
      )}
    </>
  );
};

export default Page;
