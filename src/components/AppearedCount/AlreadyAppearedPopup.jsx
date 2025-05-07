import React, { useState, useEffect } from "react";
import {
  AppearedText,
  CancelBtn,
  PopupHeader,
  PopupHeaderText,
  PopupWhiteDiv,
} from "./style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import Delete from "../../assets/images/Delete.svg";
import { FlexDiv } from "../../assets/styles/style";
import SnackbarAlert from "../Login/SnackbarAlert";
import { ActionBtn } from "../Common/Style";
import { Base_URL } from "../../Client/apiURL";

const AlreadyAppearedPopup = ({
  close,
  appearedData,
  openAddPopup,
  removeAppearance,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [appearanceData, setAppearanceData] = useState(appearedData);

  useEffect(() => {
    setAppearanceData(appearedData);
  }, [appearedData]);

  const appearanceCount = appearanceData?.length;
  const countText = appearanceCount === 1 ? "time" : "times";

  const handleDelete = async (appearedQuestionId) => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/appeared-questions?appeared_question_id=${appearedQuestionId}`,
        {
          method: "DELETE",

          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        removeAppearance(appearedQuestionId);
        setSnackbarMessage(data.message || "Appeard Deleted Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
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
        <PopupHeaderText>
          This question has appeared in my exam {appearanceCount} {countText}
        </PopupHeaderText>
      </PopupHeader>

      <PopupWhiteDiv
        style={{
          gap: "10px",
          paddingTop: "20px",
        }}
      >
        <CancelBtn onClick={openAddPopup} variant="contained" color="primary">
          Appear Again
        </CancelBtn>

        <FlexDiv
          style={{
            flexDirection: "column",
            width: "100%",
            marginTop: "10px",

            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          {appearanceData &&
            appearanceData.map((appearance) => (
              <FlexDiv
                key={appearance.AppearedQuestionId}
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "90%",
                  flexDirection: "column",
                }}
              >
                <FlexDiv
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <AppearedText>
                    Date: {new Date(appearance.ExamDate).toLocaleDateString()}
                  </AppearedText>
                  <AppearedText>
                    Venue: {appearance.ExamVenue || "Not specified"}
                  </AppearedText>
                  <ActionBtn
                    alt=""
                    src={Delete}
                    onClick={() => handleDelete(appearance.AppearedQuestionId)}
                  />
                </FlexDiv>

                <AppearedText>
                  Memory: {appearance.ExamMemory || "Not specified"}
                </AppearedText>
              </FlexDiv>
            ))}
        </FlexDiv>
      </PopupWhiteDiv>
    </>
  );
};

export default AlreadyAppearedPopup;
