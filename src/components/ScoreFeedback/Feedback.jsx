import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, useMediaQuery } from "@mui/material";
import { Btn, FlexDiv } from "../../assets/styles/style";
import SeperatingHeader from "../Common/SeperatingHeader";
import {
  ExamBottomDiv,
  ExamInnerDiv,
  ExamUpperDiv,
  PurpleHeaderDiv,
  SubmitBtn,
  WhiteDiv,
} from "./Style";
import ScoreCards from "./ScoreCards";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import LoadingModal from "../Common/LoadingModal";
import { TextField } from "@mui/material";

const Feedback = () => {
  const [category, setCategory] = useState(true);
  const [overall, setOverall] = useState(0);
  const [speaking, setSpeaking] = useState(0);
  const [writing, setWriting] = useState(0);
  const [reading, setReading] = useState(0);
  const [listening, setListening] = useState(0);
  const [targetRange, setTargetRange] = useState("79-90");
  const isTab = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [examDate, setExamDate] = useState(null);
  const [dateError, setDateError] = useState("");

  const handleScoreSubmit = () => {
    if (!examDate) {
      setDateError("Please select the exam date");
      return;
    }

    if (
      overall === 0 ||
      speaking === 0 ||
      writing === 0 ||
      reading === 0 ||
      listening === 0
    ) {
      console.log("One or more scores are not set");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/score-feedback-result", {
        state: { overall, speaking, writing, reading, listening, targetRange },
      });
    }, 1000);
  };

  return (
    <FlexDiv
      style={{
        flexDirection: "column",
        padding: isTab ? "1.5rem 2% 2rem" : "6.5rem 3% 2rem",
      }}
    >
      {loading && <LoadingModal />}
      <SeperatingHeader
        title="Score Feedback"
        displayText={true}
        text={
          "Score Feedback will provide you with analyzed feedback on your previous score (real exam or mock test) depicting the areas where you need to focus on to achieve your required score."
        }
      />
      <PurpleHeaderDiv>Score</PurpleHeaderDiv>
      <WhiteDiv>
        <FlexDiv
          style={{
            width: "95%",
            justifyContent: "space-between",
            marginBottom: "1.25rem",
            flexDirection: isTab ? "column" : "",
            gap: isTab ? "1.25rem" : "",
          }}
        >
          <div style={{ width: isTab ? "100%" : "38%" }}>
            <ExamUpperDiv>Exam Category</ExamUpperDiv>
            <ExamBottomDiv>
              <Btn onClick={() => setCategory(true)}>
                <ExamInnerDiv
                  style={{
                    background: category ? "" : "#fff",
                    color: category ? "" : "var(--Brand-Purple, #996CFE)",
                  }}
                >
                  Real Exam
                </ExamInnerDiv>
              </Btn>
              <Btn onClick={() => setCategory(false)}>
                <ExamInnerDiv
                  style={{
                    background: !category ? "" : "#fff",
                    color: !category ? "" : "var(--Brand-Purple, #996CFE)",
                  }}
                >
                  Mock Test
                </ExamInnerDiv>
              </Btn>
            </ExamBottomDiv>
          </div>
          <div style={{ width: isTab ? "100%" : "38%" }}>
            <ExamUpperDiv>Exam Details</ExamUpperDiv>
            <ExamBottomDiv>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FlexDiv style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    value={examDate}
                    onChange={(newValue) => {
                      setExamDate(newValue);
                      setDateError("");
                    }}
                    maxDate={dayjs()}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "90%" }}
                  />
                  {dateError && (
                    <Typography
                      color="error"
                      variant="caption"
                      sx={{
                        mt: 1,
                        display: "block",
                        position: "absolute",
                        left: "2rem",
                        bottom: "-1.5rem",
                        fontFamily: "Noto Sans",
                        fontWeight: "500",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                      }}
                    >
                      {dateError}
                    </Typography>
                  )}
                </FlexDiv>
              </LocalizationProvider>
            </ExamBottomDiv>
          </div>
          <ScoreCards
            score="65"
            text="Target Score"
            width={isTab ? "100%" : "20%"}
            setTargetRange={setTargetRange}
            targetPopup={true}
          />
        </FlexDiv>
        <FlexDiv
          style={{
            width: "95%",
            gap: "1rem",
            marginBottom: "1.25rem",
            flexDirection: isTab ? "column" : "",
          }}
        >
          {!isTab ? (
            <>
              <ScoreCards text="Overall" setScore={setOverall} />
              <ScoreCards text="Speaking" bg="#49D7F2" setScore={setSpeaking} />
              <ScoreCards text="Writing" bg="#FF5D5D" setScore={setWriting} />
              <ScoreCards text="Reading" bg="#AD826E" setScore={setReading} />
              <ScoreCards
                text="Listening"
                bg="#868EAF"
                setScore={setListening}
              />
            </>
          ) : (
            <>
              <ScoreCards text="Overall" setScore={setOverall} />
              <FlexDiv style={{ width: "100%", gap: "1rem" }}>
                <ScoreCards
                  text="Speaking"
                  bg="#49D7F2"
                  setScore={setSpeaking}
                />
                <ScoreCards text="Writing" bg="#FF5D5D" setScore={setWriting} />
              </FlexDiv>
              <FlexDiv style={{ width: "100%", gap: "1rem" }}>
                <ScoreCards text="Reading" bg="#AD826E" setScore={setReading} />
                <ScoreCards
                  text="Listening"
                  bg="#868EAF"
                  setScore={setListening}
                />
              </FlexDiv>
            </>
          )}
        </FlexDiv>
        <Btn>
          <SubmitBtn onClick={handleScoreSubmit}>Submit</SubmitBtn>
        </Btn>
      </WhiteDiv>
    </FlexDiv>
  );
};

export default Feedback;
