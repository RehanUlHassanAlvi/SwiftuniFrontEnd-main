import React from "react";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import {
  DeleteNoBtn,
  DeleteYesBtn,
  PopupHeader,
  PopupTitleText,
  PopupWhiteDiv,
  WarningText, // Import the new WarningText style
} from "./style";

const SureToDeletePopup = ({ close, onDelete, subscription }) => {
  console.log("subscription,,,,,,,,", subscription);
  return (
    <>
      <div id="sure-to-delete">
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
          {subscription && (
            <WarningText>
              ⚠️ Warning: You have an active subscription. Deleting will result
              in loss of subscription & this account permanently.
            </WarningText>
          )}

          <PopupTitleText>Do you want to delete your account?</PopupTitleText>

          <FlexDiv style={{ gap: "1.25rem" }}>
            <DeleteNoBtn onClick={() => close(false)}>No</DeleteNoBtn>
            <DeleteYesBtn
              onClick={() => {
                onDelete();
              }}
            >
              Yes
            </DeleteYesBtn>
          </FlexDiv>
        </PopupWhiteDiv>
      </div>
    </>
  );
};

export default SureToDeletePopup;
