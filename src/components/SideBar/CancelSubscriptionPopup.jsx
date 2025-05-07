import React, { useState } from "react";
import {
  CancelInfoText,
  CancelSubscriptionBtn,
  CancelSubscriptionPopupCard,
  CommentPopupCard,
  CommentSubBtn,
  PopupHeader,
  PopupHeaderText,
  PopupTextArea,
  PopupWhiteDiv,
  ReasonText,
  SubscriptionPopupHeader,
} from "../Common/Style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import InfoIcon from "../../assets/images/info-blue.svg";
import { FlexDiv } from "../../assets/styles/style";
import SnackbarAlert from "../Login/SnackbarAlert";

const CancelSubscriptionPopup = ({ close, setReason, onSubmit }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");

  return (
    <>
      <SnackbarAlert
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        variant={snackbarVariant}
        color={snackbarColor}
      />
      <CancelSubscriptionPopupCard id="sure-to-cancel">
        <SubscriptionPopupHeader>
          <FlexDiv style={{ width: "95%", justifyContent: "flex-end" }}>
            <img
              src={CancelIcon}
              alt=""
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => close(false)}
            />
          </FlexDiv>
          <PopupHeaderText>Cancel my subscription</PopupHeaderText>
        </SubscriptionPopupHeader>
        <PopupWhiteDiv>
          <ReasonText>Reason for cancelation</ReasonText>
          <PopupTextArea
            required
            placeholder="Reason"
            onChange={(e) => setReason(e.target.value)}
          />

          <FlexDiv
            style={{
              alignSelf: "flex-start",
              margin: "1rem 0rem 0rem 0.85rem",
              gap: "0.31rem",
            }}
          >
            <img src={InfoIcon} alt="Info" />
            <CancelInfoText>
              Cancellation can only be initiate within 30 minutes of purchase.
            </CancelInfoText>
          </FlexDiv>

          <FlexDiv style={{ width: "100%", gap: "0.62rem" }}>
            <CancelSubscriptionBtn onClick={onSubmit}>
              Submit
            </CancelSubscriptionBtn>
          </FlexDiv>
        </PopupWhiteDiv>
      </CancelSubscriptionPopupCard>
    </>
  );
};

export default CancelSubscriptionPopup;
