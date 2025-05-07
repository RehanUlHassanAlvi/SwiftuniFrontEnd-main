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

const SureToResetPopup = ({ close, onSubmit, heading }) => {
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
          <PopupTitleText>Are you sure?</PopupTitleText>
          <AreYouSureText color="#131313">
          This will permanently erase all your practice history for{" "}<span style={{color: '#996cfe'}}>{heading}</span>{" "} all questions.{" "}This action cannot be undone.
          </AreYouSureText>
          <FlexDiv style={{ gap: "1.25rem" }}>
            <DeleteNoBtn onClick={() => close(false)}>Cancel</DeleteNoBtn>
            <DeleteYesBtn
              onClick={() => {
                onSubmit();
                // close(false);
              }}
            >
              Submit
            </DeleteYesBtn>
          </FlexDiv>
        </PopupWhiteDiv>
      </div>
    </>
  );
};

export default SureToResetPopup;
