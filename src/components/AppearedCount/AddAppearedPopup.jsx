import React, { useState, useEffect } from "react";
import {
  CancelBtn,
  Input,
  InputHeader,
  PopupHeader,
  PopupHeaderText,
  PopupWhiteDiv,
  SaveBtn,
  TextArea,
  WhiteDivText,
} from "./style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SnackbarAlert from "../Login/SnackbarAlert";
import { Base_URL } from "../../Client/apiURL";

const AppearedPopup = ({ close, questionId }) => {
  const [examDate, setExamDate] = useState(dayjs());
  const [examVenue, setExamVenue] = useState("");
  const [examMemory, setExamMemory] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");

  const AddAppearedQuestion = async () => {
    if (!examDate) {
      alert("Exam date is required!");
      return;
    }

    const payload = {
      question_id: questionId,
      exam_date: examDate.format("MM-DD-YYYY"),
    };

    if (examVenue.trim() !== "") {
      payload.exam_venue = examVenue;
    }

    if (examMemory.trim() !== "") {
      payload.exam_memory = examMemory;
    }

    try {
      const response = await fetch(
        `${Base_URL}/app/users/appeared-questions`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();
      if (responseData.responseCode === 200) {
        setSnackbarMessage(
          responseData.message || "Question Appearance added successfully"
        );
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          close(false);
        }, 1000);
      } else {
        throw new Error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error.message);
      setSnackbarMessage(error.message);
      setSnackbarVariant("filled");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div id='popup-card'>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <PopupHeader>
        <FlexDiv style={{ width: "95%", justifyContent: "flex-end" }}>
          <img
            src={CancelIcon}
            alt=""
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            onClick={() => close(false)}
          />
        </FlexDiv>
        <PopupHeaderText>This question has appered in my exam</PopupHeaderText>
      </PopupHeader>
      <PopupWhiteDiv>
        <WhiteDivText>
          By confirming this, you can help other test-takers in getting an
          accurate prediction for their exam.
        </WhiteDivText>
        <FlexDiv
          style={{
            gap: "0.25rem",
            flexDirection: "column",
            width: "90%",
            alignItems: "flex-start",
            margin: "1.25rem 0rem 0rem",
          }}
        >
          <InputHeader>
            Exam Date <span style={{ color: "#E8352B" }}>(Required)</span>
          </InputHeader>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={examDate}
              onChange={setExamDate}
              renderInput={(params) => <Input {...params} />}
              defaultValue={dayjs("2022-04-17")}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </FlexDiv>
        <FlexDiv
          style={{
            gap: "0.25rem",
            flexDirection: "column",
            width: "90%",
            alignItems: "flex-start",
            margin: "0.75rem 0rem",
          }}
        >
          <InputHeader>Exam Venue (optional)</InputHeader>
          <Input
            value={examVenue}
            onChange={(e) => setExamVenue(e.target.value)}
          />
        </FlexDiv>
        <FlexDiv
          style={{
            gap: "0.25rem",
            flexDirection: "column",
            width: "90%",
            alignItems: "flex-start",
            marginBottom: "1.25rem",
          }}
        >
          <InputHeader>Exam Venue (optional)</InputHeader>
          <TextArea
            value={examMemory}
            onChange={(e) => setExamMemory(e.target.value)}
          />
        </FlexDiv>
        <FlexDiv style={{ gap: "1.5rem", width: "100%", alignItems: "center" }}>
          <CancelBtn onClick={() => close(false)}>Cancel</CancelBtn>
          <SaveBtn onClick={AddAppearedQuestion}>Save</SaveBtn>
        </FlexDiv>
      </PopupWhiteDiv>
    </div>
  );
};

export default AppearedPopup;
