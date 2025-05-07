import React from "react";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import {
  DeleteNoBtn,
  DeleteYesBtn,
  PopupHeader,
  PopupTitleText,
  PopupWhiteDiv,
} from "../SideBar/style";
import { AreYouSureText } from "./Style";
import CircularProgress from "../Login/CircularLoader";

const AreYouSurePopup = ({
  close,
  onSubmit,
  isLoading,
  title = "Are you sure you want to confirm payment submission?",
  subTitle = "You can undo this action within 30 minutes of the payment by sending an email to support team.",
}) => {
  return (
    <>
      <div id="popup-card">
        <PopupHeader>
          <FlexDiv style={{ width: "95%", justifyContent: "flex-end" }}>
            <img
              src={CancelIcon}
              alt=""
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => close(false)}
            />
          </FlexDiv>
        </PopupHeader>
        <PopupWhiteDiv>
          <PopupTitleText>{title}</PopupTitleText>
          <AreYouSureText color="#131313">{subTitle}</AreYouSureText>
          <FlexDiv style={{ gap: "1.25rem" }}>
            <DeleteNoBtn onClick={() => close(false)}>Cancel</DeleteNoBtn>
            <DeleteYesBtn
              onClick={() => {
                onSubmit();
                // close(false);
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress color={"white"} /> : "Confirm"}
            </DeleteYesBtn>
          </FlexDiv>
        </PopupWhiteDiv>
      </div>
    </>
  );
};

export default AreYouSurePopup;
