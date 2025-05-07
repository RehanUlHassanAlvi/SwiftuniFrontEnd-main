import React, { useState, useEffect } from "react";
import {
  SortByText,
  TopicsCard,
  TopicText,
  TopicTextDiv,
  TopicsBoxesDiv,
  TopicsDiv,
  BookMarkImg,
  AnimatedOrderByImg,
  AnimatedFrequentImg,
  ResetPracticeBtn,
  TopicIdText,
  TestsDiv,
  NoRecordText,
  NoRecordText1,
  NoRecordText2,
} from "./Style";
import { Btn, FlexDiv } from "../../assets/styles/style";
import orderByImg from "../../assets/images/bi_sort-down.svg";
import sortByClickedImg from "../../assets/images/sortByClicked.svg";
import getFrequentImg from "../../assets/images/octicon_graph-16.svg";
import BookmarkUnfilled from "../../assets/images/Bookmark.svg";
import BookmarkFilled from "../../assets/images/save-icon.svg";
import { Typography, useMediaQuery } from "@mui/material";
import SureToResetPopup from "./SureToResetPopup";
import SnackbarAlert from "../Login/SnackbarAlert";
import Modal from "react-modal";
import Select from "react-select";
import { Base_URL } from "../../Client/apiURL";
import { DifficultyOptionsAllTests, DifficultyOptionsWriteEssay, DifficultyOptionsDescribeImage, easyHardOptions } from "./Data";

const modalStyle = {
  overlay: {
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    background: "none",
    zIndex: 2000,
  },
  content: {
    border: "none",
    background: "transparent",
    inset: "0px",
    padding: "20px 1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const isMobile = window.innerWidth <= 600;
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: isMobile ? "118px" : "130px",
    height: "30px",
    minHeight: "30px",
    borderRadius: "0.25rem",
    backgroundColor: "#F2F3F7",
    border: state.isFocused ? "1px solid #ccc" : "1px solid #ddd",
    boxShadow: state.isFocused ? "0 0 0 1px #ddd" : "none",
    cursor: "pointer",
    "&:hover": {},
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 13000,
    backgroundColor: "white",
    padding: "0px 3px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    marginTop: "4px",
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: "0.25rem",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#996cfe" : "white",

    color: state.isSelected ? "#FFF" : "#333",
    "&:hover": {
      backgroundColor: "#996cfe",
      color: "#FFF",
    },
    padding: "4px 6px",
    marginBottom: "2px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "30px",
    padding: "0 8px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#9A9AAF",
    fontFamily: '"Noto Sans"',
    fontSize: "14px",
    fontWeight: 400,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9A9AAF",
    fontFamily: '"Noto Sans"',
    fontSize: "14px",
    fontWeight: 400,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#666",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    height: "30px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const SPTopicsCard = ({
  testQuestions,
  // questionId,
  setQuestionId,
  toggleSidePanel,
  setTriggerReset,
  setTestQuestionTableId,
  setWantToSortDesc,
  wantToSortDesc,
  setHighFrequency,
  highFrequency,
  setDifficulty,
  difficulty,
  setIsPracticed,
  isPracticed,
  heading,
  updateLocalQuestionBookmark,
  setAutoStartRecording,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleFiltersAndFetch,
  setIsEasy,
  isEasy,
  storeQuestionInSession
}) => {
  const isTab = useMediaQuery("(max-width:800px)");
  const [openPopup, setOpenPopup] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [selectedOption, setSelectedOption] = useState({value: "all", label: "All"});
  const [selectedOptionEasyHard, setSelectedOptionEasyHard] = useState(null);
  const [selectedDifficultyOption, setSelectedDifficultyOption] = useState(null);
  const options = [
    { value: "all", label: "All" },
    { value: "practiced", label: "Practiced" },
    { value: "not-practiced", label: "Not Practiced" },
  ];

  let DifficultyOptions;
  if (heading === "Write Essay") {
    DifficultyOptions = DifficultyOptionsWriteEssay;
  } else if (heading === "Describe Image") {
    DifficultyOptions = DifficultyOptionsDescribeImage;
  } else {
    DifficultyOptions = DifficultyOptionsAllTests;
  }

  useEffect(() => {
    const practicedOption = options.find(option => option.value === isPracticed);
    if (practicedOption) {
      setSelectedOption(practicedOption);
    }

    if (difficulty) {
      const difficultyOption = DifficultyOptions.find(option => option.value === difficulty);
      if (difficultyOption) {
        setSelectedDifficultyOption(difficultyOption);
      }
    }

    if (isEasy !== undefined && isEasy !== null) {
      const easyHardOption = easyHardOptions.find(option => option.value === isEasy);
      if (easyHardOption) {
        setSelectedOptionEasyHard(easyHardOption);
      }
    }
  }, [isPracticed, difficulty, isEasy]);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    setIsPracticed(selected?.value || 'all');
  };

  const handleSelectDifficulty = (selectedOption) => {
    if (selectedOption) {
      setSelectedDifficultyOption(selectedOption);
      setDifficulty(selectedOption.value);
    } else {
      setSelectedDifficultyOption(null);
      setDifficulty(null);
    }
  };

  const handleSelectEasyHard = (selectedOption) => {
    if (selectedOption) {
      setSelectedOptionEasyHard(selectedOption);
      setIsEasy(selectedOption.value);
    } else {
      setSelectedOptionEasyHard(null);
      setIsEasy(null);
    }
  };

  const handleBookmarkClick = async (
    testQuestionTableId,
    isBookmarked,
    bookmarkId
  ) => {
    const endpoint = isBookmarked
      ? `${Base_URL}/app/users/bookmarks?bookmark_id=${bookmarkId}`
      : `${Base_URL}/app/users/bookmarks?test_question_id=${testQuestionTableId}`;

    const method = isBookmarked ? "DELETE" : "GET";

    try {
      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.responseCode === 200) {
        const newBookmarkStatus = !isBookmarked;
        const newBookmarkId = isBookmarked ? null : responseData.response;
        updateLocalQuestionBookmark(
          testQuestionTableId,
          !isBookmarked,
          newBookmarkId
        );
      } else {
        throw new Error("Failed to update bookmark");
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const toggleSortOrder = () => {
    if (highFrequency) {
      setHighFrequency(false);
    }
    setWantToSortDesc((prev) => !prev);
  };

  const toggleHighFrequency = () => {
    setHighFrequency((prev) => !prev);
  };

  const openSureToResetPopup = () => {
    setOpenPopup(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("popup-card");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpenPopup(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleResetPracticed = async () => {
    try {
      const response = await fetch(`${Base_URL}/app/users/test-questions/reset-attempted-test-questions?test_name=${heading}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      const responseData = await response.json();
  
      if (responseData.responseCode === 200) {
        setSnackbarMessage("All practiced questions reset successfully.");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        handleFiltersAndFetch(heading);
      } else if (responseData.responseCode === 300 && responseData.message === "Something went wrong while resetting Attempted Test Questions") {
        setSnackbarMessage("No questions have been practiced yet.");
        setSnackbarVariant("filled");
        setSnackbarColor("success");
      } else {
        throw new Error(responseData.message || "Failed to reset practiced questions.");
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarVariant("outlined");
      setSnackbarColor("danger");
    } finally {
      setSnackbarOpen(true);
      setOpenPopup(false);
    }
  };
  
  const calculateDaysDifference = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = currentDate - createdDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  return (
    <div>
      <FlexDiv
        style={{
          justifyContent: "space-between",
        }}
      >
        <SnackbarAlert
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          message={snackbarMessage}
          variant={snackbarVariant}
          color={snackbarColor}
        />
        <Modal isOpen={openPopup} style={modalStyle}>
          <SureToResetPopup
            close={setOpenPopup}
            onSubmit={handleResetPracticed}
            heading={heading}
          />
        </Modal>
        <FlexDiv
          style={{
            justifyContent: "space-start",
            gap: isTab ? "0.5rem" : "1.2rem",
            zIndex: 13000,
            flexDirection: isTab ? "column-reverse" : "",
          }}
        >
          <div>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={options}
              isSearchable={false}
              styles={customStyles}
              placeholder="All"
            />
          </div>

          {heading !== "Read Aloud" && heading !== "Respond to a situation" && heading !== "Re-tell Lecture" && heading !== "Write from Dictation" && heading !== "Repeat Sentence" &&
            (
            <>
              <div>
                <Select
                  value={selectedDifficultyOption}
                  onChange={handleSelectDifficulty}
                  options={DifficultyOptions}
                  isSearchable={false}
                  styles={customStyles}
                  placeholder= {heading === "Describe Image" || heading === "Write Essay" ? "Type" : "Difficulty"}
                  isClearable={true}
                />
              </div>
            </>
          )}

          {(heading === "Write from Dictation" || heading === "Repeat Sentence") && (
            <>
              <div>
                <Select
                  value={selectedOptionEasyHard}
                  onChange={handleSelectEasyHard}
                  options={easyHardOptions}
                  isSearchable={false}
                  styles={customStyles}
                  placeholder="Difficulty"
                  isClearable={true}
                />
              </div>
            </>
          )}

          <ResetPracticeBtn onClick={openSureToResetPopup}>
            Reset-Practice
          </ResetPracticeBtn>
        </FlexDiv>
        <FlexDiv
          style={{
            gap: "16px",
            alignSelf: isTab ? "flex-start" : "",
            marginTop: isTab ? "-0.3rem" : "",
          }}
        >
          <SortByText>
            {" "}
            {highFrequency
              ? "High Frequency"
              : wantToSortDesc
              ? "(Old to New)"
              : "(New to Old)"}
          </SortByText>
          <AnimatedOrderByImg
            src={wantToSortDesc ? sortByClickedImg : orderByImg}
            active={wantToSortDesc}
            alt="Sort Order"
            onClick={toggleSortOrder}
          />

          <AnimatedFrequentImg
            src={getFrequentImg}
            active={highFrequency}
            alt="Toggle High Frequency"
            onClick={toggleHighFrequency}
          />
        </FlexDiv>
      </FlexDiv>

      <TestsDiv>
        {testQuestions?.length === 0 ? (
          <FlexDiv style={{flexDirection: 'column'}}>
             <NoRecordText1>No questions have been added yet.</NoRecordText1>
             <NoRecordText2>Try by changing filter.</NoRecordText2>
          </FlexDiv>
        ) : (
          <>
            {testQuestions?.map((topic, index) => (
              <Btn
                key={topic.QuestionId}
                onClick={() => {
                  toggleSidePanel();

                  if (setAutoStartRecording) {
                    setAutoStartRecording(false);
                  }

                  if (setTriggerReset) {
                    setTriggerReset((prevState) => !prevState);
                  }

                  setQuestionId(topic.QuestionId);
                  setTestQuestionTableId(topic.TestQuestionTableId);
                  setCurrentQuestionIndex(index);
                  storeQuestionInSession(topic, index);
                }}
              >
                <TopicsCard isSelected={index === currentQuestionIndex}>
                  <TopicsDiv>
                    <TopicIdText>{`#${topic.QuestionId}`}</TopicIdText>
                    <TopicText>{topic.QuestionName}</TopicText>
                  </TopicsDiv>
                  <TopicsBoxesDiv>
                    {topic.Difficuty && heading !== "Read Aloud" && heading !== "Respond to a situation" && heading !== "Re-tell Lecture" && heading !== "Write from Dictation" && heading !== "Repeat Sentence" &&  (
                      <TopicTextDiv
                        color={
                          heading === "Write Essay"
                            ? "#FFA500"
                            : heading === "Describe Image"
                            ? "#FFA500"
                            : topic.Difficuty === "Easy"
                            ? "#4fb54f"
                            : topic.Difficuty === "Medium"
                            ? "#FFA500"
                            : "#FF0000"
                        }
                        background={
                          heading === "Write Essay"
                            ? "rgba(255, 165, 0, 0.10)"
                            : heading === "Describe Image"
                            ? "rgba(255, 165, 0, 0.10)"
                            : topic.Difficuty === "Easy"
                            ? "rgba(144, 238, 144, 0.2)"
                            : topic.Difficuty === "Medium"
                            ? "rgba(255, 165, 0, 0.10)"
                            : "rgba(255, 0, 0, 0.10)"
                        }
                      >
                        {topic.Difficuty}
                      </TopicTextDiv>
                    )}

                    {calculateDaysDifference(topic.CreatedAt) < 60 && (
                      <TopicTextDiv
                        color="#00E6C3"
                        background="rgba(0, 230, 195, 0.10)"
                      >
                        New
                      </TopicTextDiv>
                    )}

                    {topic.Prediction && (
                      <TopicTextDiv
                        color="#FD3C65"
                        background="rgba(253, 60, 101, 0.10)"
                      >
                        Prediction
                      </TopicTextDiv>
                    )}

                    <TopicTextDiv
                      color="#996CFE"
                      background="rgba(153, 108, 254, 0.10)"
                    >
                      Practiced ({topic.TestAttemptedCount})
                    </TopicTextDiv>
                    <TopicTextDiv
                      color="#9A9AAF"
                      border="1px solid var(--White-Theme-Gray---3, #C6CBD9)"
                    >
                      Appeared ({topic.AppearedCount})
                    </TopicTextDiv>
                    <BookMarkImg
                      alt="Bookmark"
                      src={
                        topic.IsBookMarked ? BookmarkFilled : BookmarkUnfilled
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(
                          topic.TestQuestionTableId,
                          topic.IsBookMarked,
                          topic.BookMarkedId
                        );
                      }}
                    />
                  </TopicsBoxesDiv>
                </TopicsCard>
              </Btn>
            ))}
          </>
        )}
      </TestsDiv>
    </div>
  );
};

export default SPTopicsCard;