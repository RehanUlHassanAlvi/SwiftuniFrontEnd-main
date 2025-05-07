import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TodayTaskDiv,
  TitleText,
  ToolTipText,
  ToolTipImg,
  RemarksTitleDiv,
  TransitionDiv,
} from "./style";
import { FlexDiv } from "../../assets/styles/style";
import { AiStudyPlanData, TodayTaskCardData } from "./data";
import { useMediaQuery, Tooltip } from "@mui/material";
import InfoIcon from "../../assets/images/ph_info.svg";
import TodayTaskImg1 from "../../assets/todaytaskcard/todaytaskimg1.svg";
import TodayTaskImg2 from "../../assets/todaytaskcard/todaytaskimg2.svg";
import TodayTaskImg3 from "../../assets/todaytaskcard/todaytaskimg3.svg";
import TodayTaskImg4 from "../../assets/todaytaskcard/todaytaskimg4.svg";

import AiStudyPlanCard from "./AiStudyPlanCard";
import ExamCountdownCard from "./ExamCountdownCard";
import TodayTaskCard from "./TodayTaskCard";
import AnalyticsCard2 from "./AnalyticsCard2";
import TextField from "./TextField";
import { styled } from "@mui/material/styles";
import CustomCalendar from "./CustomCalendar";
import dayjs from "dayjs";
import SnackbarAlert from "../Login/SnackbarAlert";
import LoadingModal from "../Common/LoadingModal";
import { useAuth } from "../../authentication/Auth";
import { Base_URL } from "../../Client/apiURL";

const OuterDiv = styled("div")(({ theme }) => ({
  width: "96%",
  // maxWidth: "1620px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "2% 2% 0.5%",
  gap: "2%",
  borderRadius: "16px",
  background: "#fff",
  "@media screen and (max-width: 1000px)": {
    flexDirection: "column",
  },
  "@media screen and (max-width: 700px)": {
    width: "80%",
    padding: "10%",
  },
}));

const generateStudyPlan = (numDays) => {
  // Base plan for 5 days
  const basePlan = {
    1: {
      Speaking: {
        ReadAloud: 3,
        RepeatSentence: 3,
        DescribeImage: 2,
        AnswerShortQuestion: 2,
      },
      Writing: { SummarizeWrittenText: 2, Essay: 1 },
    },
    2: {
      Reading: {
        ReadingWritingFillBlanks: 3,
        MultipleChoiceSingle: 2,
        ReorderParagraphs: 2,
      },
      Listening: { SummarizeSpokenText: 2, FillBlanks: 3, HighlightSummary: 2 },
    },
    3: {
      Speaking: { ReTellLecture: 2, ReadAloud: 3 },
      Reading: { ReadingFillBlanks: 3, MultipleChoiceMultiple: 2 },
      Listening: { MultipleChoiceMultiple: 2, WriteDictation: 3 },
    },
    4: {
      Speaking: { RepeatSentence: 3, DescribeImage: 2 },
      Writing: { SummarizeWrittenText: 2 },
      Reading: { ReorderParagraphs: 3, MultipleChoiceSingle: 2 },
      Listening: { HighlightIncorrectWords: 3, SelectMissingWord: 2 },
    },
    5: {
      Speaking: {
        ReadAloud: 3,
        RepeatSentence: 3,
        DescribeImage: 2,
        ReTellLecture: 2,
        AnswerShortQuestion: 3,
      },
      Writing: { SummarizeWrittenText: 1, Essay: 1 },
      Reading: {
        ReadingWritingFillBlanks: 2,
        MultipleChoiceSingle: 1,
        ReorderParagraphs: 2,
        ReadingFillBlanks: 2,
        MultipleChoiceMultiple: 1,
      },
      Listening: {
        SummarizeSpokenText: 1,
        MultipleChoiceMultiple: 1,
        FillBlanks: 2,
        HighlightSummary: 1,
        MultipleChoiceSingle: 1,
        SelectMissingWord: 1,
        HighlightIncorrectWords: 2,
        WriteDictation: 3,
      },
    },
  };

  const studyPlan = {};

  for (let i = 1; i <= numDays; i++) {
    if (i === numDays) {
      studyPlan[i] = JSON.parse(JSON.stringify(basePlan[5])); // Ensure the last day always uses Day 5 plan
    } else {
      const day = ((i - 1) % 4) + 1; // Cycle through Day 1 to Day 4
      studyPlan[i] = JSON.parse(JSON.stringify(basePlan[day])); // Deep copy to avoid reference issues
    }
  }

  return studyPlan;
};

const AiStudyPlan = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isTab = useMediaQuery("(max-width:1000px)");
  const isMobile = useMediaQuery("(max-width:700px)");
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [analyticsData, setAnalyticsData] = useState();
  const [dataList, setDataList] = useState([]);
  const [attemptedTestCounts, setAttemptedTestCounts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [examDate, setExamDate] = useState("");
  const [examTarget, setExamTarget] = useState({});
  const [examTargetRange, setExamTargetRange] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [studyPlan, setStudyPlan] = useState({});
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [examCreatedDate, setExamCreatedDate] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");

  const updateCurrentDayTasks = (dayTasks) => {
    if (!dayTasks) return;

    const currentDayTasks = [];

    const countsMap = attemptedTestCounts.reduce((acc, item) => {
      acc[item.test_name] = item.count;
      return acc;
    }, {});

    const getAttemptedCount = (taskName) => {
      return countsMap[taskName] || "0";
    };

    const allCategories = {
      Speaking: {
        id: 3,
        imageSrc: TodayTaskImg4,
        titleText: "Speaking",
        titleTextColor: "#49D7F2",
        marksTextColor: "#66E0F7CC",
        barBgColor: "rgba(73, 215, 242, 0.2)",
      },
      Writing: {
        id: 2,
        imageSrc: TodayTaskImg3,
        titleText: "Writing",
        titleTextColor: "#FF5D5D",
        marksTextColor: "#FF5D5DCC",
        barBgColor: "rgba(255, 93, 93, 0.2)",
      },
      Reading: {
        id: 0,
        imageSrc: TodayTaskImg1,
        titleText: "Reading",
        titleTextColor: "#AD826E",
        marksTextColor: "#AD826ECC",
        barBgColor: "rgba(173, 130, 110, 0.2)",
      },
      Listening: {
        id: 1,
        imageSrc: TodayTaskImg2,
        titleText: "Listening",
        titleTextColor: "#868EAF",
        marksTextColor: "#868EAFCC",
        barBgColor: "rgba(134, 142, 175, 0.2)",
      },
    };

    Object.entries(allCategories).forEach(([key, props]) => {
      const tasks = dayTasks[key];
      let categoriesData = [];

      if (tasks) {
        categoriesData = Object.entries(tasks).map(([taskKey, value]) => ({
          CategoryName: taskKey.replace(/([A-Z])/g, " $1").trim(),
          TotalCount: value.toString(),
          attemptedcount: getAttemptedCount(taskKey),
          totalProgress: "0",
          chunkCount: "10",
        }));
      }

      currentDayTasks.push({
        ...props,
        categoriesData: categoriesData,
      });
    });

    const firstNonEmptyTask = currentDayTasks.find(
      (task) => task.categoriesData.length > 0
    );
    if (firstNonEmptyTask) {
      setSelectedCardId(firstNonEmptyTask.id);
    } else {
      setSelectedCardId(null);
    }

    setDataList(currentDayTasks);
  };

  const handleOpen = (event) => {
    event.stopPropagation();
    setIsOpen(true);
  };
  const handleClose = (event) => {
    getExamDate();
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedCardId !== null) {
      const data = dataList.find((data) => data.id === selectedCardId);
      setIsVisible(false);
      setTimeout(() => {
        setAnalyticsData(data);
        setIsVisible(true);
      }, 200);
    }
  }, [selectedCardId]);

  const handleCardSelect = (id) => {
    setSelectedCardId(id);
  };

  useEffect(() => {
    if (dataList.length > 0) {
      setAnalyticsData(dataList[0]);
    }
  }, [dataList]);

  useEffect(() => {
    getExamDate();
  }, []);

  const getExamDate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${Base_URL}/app/users/get-examdate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.response && data.response.ExamDate && data.response.ExamTarget) {
        const { ExamDate, ExamCreatedDate, ExamTarget, AttemptedTestCounts } =
          data.response;
        setExamDate(ExamDate);
        setExamCreatedDate(ExamCreatedDate);
        setAttemptedTestCounts(AttemptedTestCounts || []);
        setExamTarget(JSON.parse(ExamTarget));

        const startDate = dayjs(ExamCreatedDate);
        const endDate = dayjs(ExamDate);
        const dayDifference = endDate.diff(startDate, "day");
        setStudyPlan(generateStudyPlan(dayDifference));
      } else if (data.responseCode === 501) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to fetch exam date:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newCurrentDate = dayjs();
      if (!newCurrentDate.isSame(currentDate, "day")) {
        setCurrentDate(newCurrentDate);
      }
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(timer);
  }, [currentDate]);

  useEffect(() => {
    if (studyPlan && Object.keys(studyPlan).length > 0 && examCreatedDate) {
      const currentDate = dayjs();
      const startDate = dayjs(examCreatedDate);

      const daysFromStart = currentDate.diff(startDate, "day");

      const planLength = 5;
      const planDay = (daysFromStart % planLength) + 1;

      updateCurrentDayTasks(studyPlan[planDay]);
    }
  }, [currentDate, studyPlan, examCreatedDate]);

  useEffect(() => {
    const selectedData = dataList.find((data) => data.id === selectedCardId);
    setAnalyticsData(selectedData || null);
  }, [selectedCardId, dataList]);

  // useEffect(() => {
  //   if (attemptedTestCounts && attemptedTestCounts.length > 0 && studyPlan[1]) {
  //     updateCurrentDayTasks(studyPlan[1]);
  //   }
  // }, [attemptedTestCounts, studyPlan]);

  const handleSubmit = async () => {
    if (
      examDate &&
      dayjs(examDate).isValid() &&
      examTarget.overall.trim() !== ""
    ) {
      const formattedDate = dayjs(examDate).format("MM-DD-YYYY");

      setIsLoading(true);
      try {
        const payload = {
          exam_date: formattedDate,
          exam_target: JSON.stringify({
            examTargetRange: examTargetRange,
            overall: examTarget.overall,
            speaking: examTarget.speaking,
            writing: examTarget.writing,
            reading: examTarget.reading,
            listening: examTarget.listening,
          }),
        };

        const response = await fetch(
          `${Base_URL}/app/users/update-examdate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "include",
          }
        );
        const data = await response.json();

        if (
          data.response &&
          data.response.ExamDate &&
          data.response.ExamTarget
        ) {
          const isoExamDate = data.response.ExamDate;
          // const formattedDate = dayjs(isoExamDate).format("MM-DD-YYYY");
          setExamDate(isoExamDate);
          setExamTarget(JSON.parse(data.response.ExamTarget));
          handleClose();
        } else if (data.responseCode === 501) {
          logout();
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to submit exam date:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      toast.success("You have successfully logged in!");
      localStorage.removeItem("loggedIn");
    }
  }, []);

  return (
    <FlexDiv style={{ width: "100%", maxWidth: "1680px" }}>
      <>
        {isLoading && <LoadingModal />}
        <SnackbarAlert
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          message={snackbarMessage}
          variant={snackbarVariant}
          color={snackbarColor}
        />

        <OuterDiv>
          {!isTab || isMobile ? (
            <>
              <FlexDiv
                style={{
                  width: "100%",
                  flexDirection: "column",
                  marginBottom: isMobile ? "25px" : "",
                }}
              >
                {examTarget && (
                  <AiStudyPlanCard
                    number={examTarget.overall}
                    text={AiStudyPlanData[0].text}
                    setExamDate={setExamDate}
                    setExamTarget={setExamTarget}
                    setExamTargetRange={setExamTargetRange}
                    onSubmit={handleSubmit}
                    open={isOpen}
                    onClose={handleClose}
                    onOpen={handleOpen}
                  />
                )}

                {examDate ? (
                  <ExamCountdownCard examDate={examDate} />
                ) : (
                  <ExamCountdownCard />
                )}
              </FlexDiv>
              <FlexDiv
                style={{ width: "100%", marginBottom: isMobile ? "5%" : "" }}
              >
                {/* <Calendar />         */}
                <CustomCalendar />
              </FlexDiv>
              <FlexDiv
                style={{
                  width: "100%",
                  flexDirection: "column",
                  marginBottom: isMobile ? "25px" : "",
                }}
              >
                <TodayTaskDiv>
                  <TitleText>Today Task</TitleText>
                  <Tooltip
                    title={
                      <ToolTipText>
                        These are the tasks you have to complete today.
                      </ToolTipText>
                    }
                    arrow
                  >
                    <ToolTipImg src={InfoIcon} alt="" />
                  </Tooltip>
                </TodayTaskDiv>
                <FlexDiv
                  style={{ width: "100%", gap: "3%", marginTop: "15px" }}
                >
                  <TodayTaskCard
                    //Speaking TodayTaskCard
                    // key={`task-${TodayTaskCardData[3].id}`}
                    key={TodayTaskCardData[3].id}
                    borderColor={TodayTaskCardData[3].borderColor}
                    imageSrc={TodayTaskCardData[3].imageSrc}
                    text={TodayTaskCardData[3].text}
                    textColor={TodayTaskCardData[3].textColor}
                    isSelected={selectedCardId === 3}
                    onClick={() => handleCardSelect(3)}
                  />
                  <TodayTaskCard
                    //Writing TodayTaskCard
                    // key={`task-${TodayTaskCardData[2].id}`}
                    key={TodayTaskCardData[2].id}
                    borderColor={TodayTaskCardData[2].borderColor}
                    imageSrc={TodayTaskCardData[2].imageSrc}
                    text={TodayTaskCardData[2].text}
                    textColor={TodayTaskCardData[2].textColor}
                    isSelected={selectedCardId === 2}
                    onClick={() => handleCardSelect(2)}
                  />
                </FlexDiv>
                <FlexDiv
                  style={{ width: "100%", gap: "3%", marginTop: "10px" }}
                >
                  <TodayTaskCard
                    //Reading TodayTaskCard
                    // key={`task-${TodayTaskCardData[0].id}`}
                    key={TodayTaskCardData[0].id}
                    borderColor={TodayTaskCardData[0].borderColor}
                    imageSrc={TodayTaskCardData[0].imageSrc}
                    text={TodayTaskCardData[0].text}
                    textColor={TodayTaskCardData[0].textColor}
                    isSelected={selectedCardId === 0}
                    onClick={() => handleCardSelect(0)}
                  />
                  <TodayTaskCard
                    //Listening TodayTaskCard
                    // key={`task-${TodayTaskCardData[1].id}`}
                    key={TodayTaskCardData[1].id}
                    borderColor={TodayTaskCardData[1].borderColor}
                    imageSrc={TodayTaskCardData[1].imageSrc}
                    text={TodayTaskCardData[1].text}
                    textColor={TodayTaskCardData[1].textColor}
                    isSelected={selectedCardId === 1}
                    onClick={() => handleCardSelect(1)}
                  />
                </FlexDiv>
              </FlexDiv>

              <FlexDiv
                style={{
                  width: "100%",
                  marginTop: !isMobile ? "-0.5rem" : "",
                  marginBottom: isMobile ? "25px" : "",
                }}
              >
                {analyticsData && (
                  <TransitionDiv isVisible={isVisible}>
                    <AnalyticsCard2
                      key={analyticsData.id}
                      imageSrc={analyticsData.imageSrc}
                      titleText={analyticsData.titleText}
                      titleTextColor={analyticsData.titleTextColor}
                      marksTextColor={analyticsData.marksTextColor}
                      barBgColor={analyticsData.barBgColor}
                      categoriesData={analyticsData.categoriesData}
                      totalProgress={analyticsData.totalProgress}
                      chunkCount={analyticsData.chunkCount}
                      render_one={true}
                      haveRowGap={true}
                      // width={"131px"}
                      // havePadding={isMobile?true:false}
                      // padding="20px 0px"
                    />
                  </TransitionDiv>
                )}
              </FlexDiv>

              <FlexDiv style={{ width: "100%", flexDirection: "column" }}>
                <RemarksTitleDiv>
                  <TitleText>Remarks</TitleText>
                  <Tooltip title={<ToolTipText>Ai remarks</ToolTipText>} arrow>
                    <ToolTipImg src={InfoIcon} alt="" />
                  </Tooltip>
                </RemarksTitleDiv>
                <TextField />
              </FlexDiv>
            </>
          ) : (
            <>
              <FlexDiv
                style={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  gap: "2%",
                  alignItems: "flex-start",
                }}
              >
                <FlexDiv style={{ width: "100%", flexDirection: "column" }}>
                  {examTarget && (
                    <AiStudyPlanCard
                      number={examTarget.overall}
                      text={AiStudyPlanData[0].text}
                      setExamDate={setExamDate}
                      setExamTarget={setExamTarget}
                      setExamTargetRange={setExamTargetRange}
                      onSubmit={handleSubmit}
                      open={isOpen}
                      onClose={handleClose}
                      onOpen={handleOpen}
                    />
                  )}

                  {examDate ? (
                    <ExamCountdownCard examDate={examDate} />
                  ) : (
                    <ExamCountdownCard />
                  )}
                </FlexDiv>
                <FlexDiv style={{ width: "100%" }}>
                  {/* <Calendar />         */}
                  <CustomCalendar />
                </FlexDiv>
                <FlexDiv style={{ width: "100%", flexDirection: "column" }}>
                  <TodayTaskDiv>
                    <TitleText>Today Task</TitleText>
                    <Tooltip
                      title={
                        <ToolTipText>
                          These are the tasks you have to complete today.
                        </ToolTipText>
                      }
                      arrow
                    >
                      <ToolTipImg src={InfoIcon} alt="" />
                    </Tooltip>
                  </TodayTaskDiv>
                  <FlexDiv
                    style={{ width: "100%", gap: "3%", marginTop: "15px" }}
                  >
                    <TodayTaskCard
                      // key={`task-${TodayTaskCardData[0].id}`}
                      key={TodayTaskCardData[0].id}
                      borderColor={TodayTaskCardData[0].borderColor}
                      imageSrc={TodayTaskCardData[0].imageSrc}
                      text={TodayTaskCardData[0].text}
                      textColor={TodayTaskCardData[0].textColor}
                      isSelected={selectedCardId === 0}
                      onClick={() => handleCardSelect(0)}
                    />
                    <TodayTaskCard
                      // key={`task-${TodayTaskCardData[1].id}`}
                      key={TodayTaskCardData[1].id}
                      borderColor={TodayTaskCardData[1].borderColor}
                      imageSrc={TodayTaskCardData[1].imageSrc}
                      text={TodayTaskCardData[1].text}
                      textColor={TodayTaskCardData[1].textColor}
                      isSelected={selectedCardId === 1}
                      onClick={() => handleCardSelect(1)}
                    />
                  </FlexDiv>
                  <FlexDiv
                    style={{ width: "100%", gap: "3%", marginTop: "10px" }}
                  >
                    <TodayTaskCard
                      // key={`task-${TodayTaskCardData[2].id}`}
                      key={TodayTaskCardData[2].id}
                      borderColor={TodayTaskCardData[2].borderColor}
                      imageSrc={TodayTaskCardData[2].imageSrc}
                      text={TodayTaskCardData[2].text}
                      textColor={TodayTaskCardData[2].textColor}
                      isSelected={selectedCardId === 2}
                      onClick={() => handleCardSelect(2)}
                    />
                    <TodayTaskCard
                      // key={`task-${TodayTaskCardData[3].id}`}
                      key={TodayTaskCardData[3].id}
                      borderColor={TodayTaskCardData[3].borderColor}
                      imageSrc={TodayTaskCardData[3].imageSrc}
                      text={TodayTaskCardData[3].text}
                      textColor={TodayTaskCardData[3].textColor}
                      isSelected={selectedCardId === 3}
                      onClick={() => handleCardSelect(3)}
                    />
                  </FlexDiv>
                </FlexDiv>

                <FlexDiv style={{ width: "100%", marginTop: "-0.2rem" }}>
                  <TransitionDiv isVisible={isVisible}>
                    {analyticsData && (
                      <AnalyticsCard2
                        key={analyticsData.id}
                        imageSrc={analyticsData.imageSrc}
                        titleText={analyticsData.titleText}
                        titleTextColor={analyticsData.titleTextColor}
                        marksTextColor={analyticsData.marksTextColor}
                        barBgColor={analyticsData.barBgColor}
                        categoriesData={analyticsData.categoriesData}
                        totalProgress={analyticsData.totalProgress}
                        chunkCount={analyticsData.chunkCount}
                        render_one={true}
                        haveRowGap={true}
                        // width={"131px"}
                        // havePadding={isMobile?true:false}
                        // padding="20px 0px"
                      />
                    )}
                  </TransitionDiv>
                </FlexDiv>
              </FlexDiv>
              <FlexDiv style={{ width: "100%", flexDirection: "column" }}>
                <RemarksTitleDiv>
                  <TitleText>Remarks</TitleText>
                  <Tooltip
                    title={<ToolTipText>Add yours remakrs</ToolTipText>}
                    arrow
                  >
                    <ToolTipImg src={InfoIcon} alt="" />
                  </Tooltip>
                </RemarksTitleDiv>
                <TextField />
              </FlexDiv>
            </>
          )}
        </OuterDiv>
      </>
    </FlexDiv>
  );
};

export default AiStudyPlan;
