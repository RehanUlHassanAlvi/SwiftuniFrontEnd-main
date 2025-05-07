import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { FlexDiv } from "../../assets/styles/style";
import { Input, InputDivSearch, WhiteDiv, WhiteDivText } from "../VocabBank/Style";
import Magnify from "../../assets/images/magnify.svg";
import ReadAloudSvg from "../../assets/images/readaloudsvg.svg";
import ReadingSvg from "../../assets/images/reading.svg";
import WritingSvg from "../../assets/images/writing.svg";
import ListenSvg from "../../assets/images/listening.svg";
import { v4 as uuidv4 } from 'uuid';
import { Base_URL } from "../../Client/apiURL";
import LoadingModal from "./LoadingModal";
import { useAuth } from "../../authentication/Auth";
import SeperatingHeader from "./SeperatingHeader";
import MegaMenu from "../Navbar/MegaMenu";
import { TopicsBoxesDiv, TopicTextDiv } from "./Style";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { EndScoreIdText, EndScoreImgDiv2, EndScoreQuestionText, EndScoreScoresDiv, FlexDivForBlueDivsOnly, SearchedQuestionsCard } from "../MT_Score/style";
import { SpeakingTests, WritingTests, ReadingTests, ListeningTests } from "../Navbar/data";
import StatementBox from "./StatementBox";


const SearchAllTests = () => {
  const isTab = useMediaQuery("(max-width:1000px)");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchInputDivRef = useRef(null);
  const [selectedText, setSelectedText] = useState(true);
  const [onlySelectTestName] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchApplied, setSearchApplied] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchText, setSearchText] = useState("");
  const [selectedTestForSearch, setSelectedTestForSearch] = useState({testName: 'Read Aloud', category: 'Speaking'})

  useEffect(() => {
     handleSearch();
  }, [selectedTestForSearch]);

  const handleSearch = async () => {

    if (!searchText.trim()) {
      searchInputRef.current.focus();
      searchInputDivRef.current.style.border = "1px solid red";
      setTimeout(() => {
        searchInputDivRef.current.style.border = "";
      }, 2000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${Base_URL}/app/users/test-questions/dashboard-search?page=${page}&test_name=${encodeURIComponent(selectedTestForSearch.testName)}&search_text=${encodeURIComponent(searchText)}`,
        {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.responseCode === 501) {
        logout();
        navigate("/login");
        return;
      }

      if (data.responseCode === 200 && data.response) {
        setTestQuestions(data?.response.response);

        const totalQuestions = data.totalQuestions || 1;
        const questionsPerPage = 8;
        setTotalPages(Math.ceil(totalQuestions / questionsPerPage));

      } else if (data.responseCode === 300) {
        console.error("No search data found:", error);
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setSearchApplied(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {handleSearch()},[page])
  
  useEffect(() => {
    const item = localStorage.getItem("pte-type");
    if (item === "pte academic") {
      setSelectedText(true);
      // setActive(0);
    } else {
      setSelectedText(false);
      // setActive(1);
    }
  }, []);

  const getType = (color = false) => {
    const typeMap = {
      reading: { color: '#AD826E', svg: ReadingSvg },
      writing: { color: '#FF5D5D', svg: WritingSvg },
      listening: { color: '#868EAF', svg: ListenSvg },
      default: { color: '#49d7f2', svg: ReadAloudSvg }
    };
  
    const typeData = typeMap[selectedTestForSearch.category.toLowerCase()] || typeMap.default;
    return color ? typeData.color : typeData.svg;
  };

  const handleNavigation = (test) => {
    let testData;
    let testNameToCompare = selectedTestForSearch.testName;

    if (selectedTestForSearch.category === "Listening" && testNameToCompare.startsWith("Listening: ")) {
        testNameToCompare = testNameToCompare.replace("Listening: ", "");
    }

    switch (selectedTestForSearch.category) {
        case "Speaking":
            testData = SpeakingTests[selectedText ? 0 : 1].find((t) => t.title === testNameToCompare);
            break;
        case "Writing":
            testData = WritingTests[selectedText ? 0 : 1].find((t) => t.title === testNameToCompare);
            break;
        case "Reading":
            testData = ReadingTests.find((t) => t.title === testNameToCompare);
            break;
        case "Listening":
            testData = ListeningTests[selectedText ? 0 : 1].find((t) => t.title === testNameToCompare);
            break;
        default:
            testData = null;
    }

    if (testData) {
        sessionStorage.setItem("SearchedQuestion_QuestionId", test.QuestionId);
        window.open(testData.link, "_blank");
    } else {
        console.error("Test not found in data.");
    }
};


  return (
    <>
      <FlexDiv style={{ width: "100%" }}>
        <FlexDiv
          style={{
            flexDirection: "column",
            padding: isTab ? "1.5rem 2% 0rem" : "6.5rem 3% 0rem",
            maxWidth: "1680px",
            width: "100%",
          }}
        >
          <SeperatingHeader title="Select a Test and Search" />

          <FlexDiv style={{ width: "100%", marginBottom: "2rem" }}>
            <InputDivSearch ref={searchInputDivRef}>
              <Input
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText} 
                ref={searchInputRef}
              />
              <img alt="" src={Magnify} onClick={handleSearch} style={{cursor: "pointer"}}/>
            </InputDivSearch>
          </FlexDiv>

          <MegaMenu selectedText={selectedText} onlySelectTestName={onlySelectTestName} setSelectedTestForSearch={setSelectedTestForSearch}/>

          {isLoading ? (
            <LoadingModal />
          ) : (
            searchApplied && (
              <WhiteDiv style={{ alignItems: "flex-start", gap: "1rem", marginTop: "1.5rem", minHeight: 'auto' }}>
                {testQuestions.length === 0 ? (
                  <FlexDiv
                    style={{
                      alignSelf: "center",
                      flexDirection: "column",
                      justifySelf: "center",
                      width: "100%",
                    }}
                  >
                    <WhiteDivText style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                      No Records Found
                    </WhiteDivText>
                    <WhiteDivText>
                      Try searching with different keywords or select a different test.
                    </WhiteDivText>
                  </FlexDiv>
                ) : (
                  <>
                    <FlexDiv style={{flexDirection: 'column', width: '100%'}}>
                      <WhiteDivText style={{ fontWeight: "bold", fontSize: "1.25rem", color: '#4e4d4d' }}>
                        {selectedTestForSearch.testName} Search Results
                      </WhiteDivText>
                      {testQuestions && testQuestions.map((test) => (
                        <FlexDiv style={{width: "100%", flexDirection: "column"}}>
                            <SearchedQuestionsCard key={uuidv4()}>
                              <EndScoreImgDiv2>
                                <FlexDiv style={{ flexDirection: "row", alignItems: "flex-start" }}>
                                  <EndScoreIdText style={{color: getType(true), fontWeight: '500'}}>
                                    {test ? '#' + test.QuestionId : '0'}
                                    </EndScoreIdText>
                                  <FlexDiv style={{ flexDirection: isTab ? "column" : "row" , alignItems: "flex-start", gap: isTab ? "0rem" : "0.5rem" }}>
                                  <EndScoreQuestionText style={{cursor: 'pointer', fontWeight: '500', color: getType(true)}} onClick={() => handleNavigation(test)}>
                                    {test ? test.QuestionName : 'loading'}
                                  </EndScoreQuestionText>
                                  </FlexDiv>
                                </FlexDiv>
                              </EndScoreImgDiv2>

                              <EndScoreScoresDiv>     
                                <FlexDivForBlueDivsOnly>  
                                  <TopicsBoxesDiv>
                                    {test.Difficuty && selectedTestForSearch.testName !== "Read Aloud" && selectedTestForSearch.testName !== "Respond to a Situation" && selectedTestForSearch.testName !== "Re-Tell Lecture" && (
                                      <TopicTextDiv
                                        color={
                                          selectedTestForSearch.testName === "Write Essay"
                                            ? "#FFA500"
                                            : selectedTestForSearch.testName === "Describe Image"
                                            ? "#FFA500"
                                            : test.Difficuty === "Easy"
                                            ? "#4fb54f"
                                            : test.Difficuty === "Medium"
                                            ? "#FFA500"
                                            : "#FF0000"
                                        }
                                        background={
                                          selectedTestForSearch.testName === "Write Essay"
                                            ? "rgba(255, 165, 0, 0.10)"
                                            : selectedTestForSearch.testName === "Describe Image"
                                            ? "rgba(255, 165, 0, 0.10)"
                                            : test.Difficuty === "Easy"
                                            ? "rgba(144, 238, 144, 0.2)"
                                            : test.Difficuty === "Medium"
                                            ? "rgba(255, 165, 0, 0.10)"
                                            : "rgba(255, 0, 0, 0.10)"
                                        }
                                      >
                                        {test.Difficuty}
                                      </TopicTextDiv>
                                    )}
                                    <TopicTextDiv color="#996CFE" background="rgba(153, 108, 254, 0.10)" onClick={() => handleNavigation(test)} 
                                      style={{cursor: 'pointer'}}
                                    >
                                      Practiced ({test.TestAttemptedCount})
                                    </TopicTextDiv>
                                    <TopicTextDiv color="#9A9AAF" border="1px solid var(--White-Theme-Gray---3, #C6CBD9)">
                                      Appeared ({test.AppearedCount})
                                    </TopicTextDiv>
                                  </TopicsBoxesDiv>
                                </FlexDivForBlueDivsOnly>
                              </EndScoreScoresDiv>
                            </SearchedQuestionsCard>
                            {test.Statement && (
                              <StatementBox
                                answerText={test.Statement}
                                searchText={searchText}
                              />
                            )}
                        </FlexDiv>
                      ))}
                    </FlexDiv>
                    <FlexDiv style={{marginTop: '1.3rem', marginBottom: '1.3rem', width: '100%'}}>
                      <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                      />
                    </FlexDiv>
                  </>
                )}
            </WhiteDiv>
            )
          )}
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default SearchAllTests;
