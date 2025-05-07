import React, { useState } from "react";
import {
  CommentPopupCard,
  CommentSubBtn,
  PopupHeader,
  PopupHeaderText,
  PopupTextArea,
  PopupWhiteDiv,
} from "./Style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import SnackbarAlert from "../Login/SnackbarAlert";

const AddCommentPopupSH = ({ 
  close,
  setComment,
  onSubmit,
}) => {
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
      <CommentPopupCard id="comment-popup">
        <PopupHeader>
          <FlexDiv style={{ width: "95%", justifyContent: "flex-end" }}>
            <img
              src={CancelIcon}
              alt=""
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              onClick={() => close(false)}
            />
          </FlexDiv>
          <PopupHeaderText>Comment</PopupHeaderText>
        </PopupHeader>
        <PopupWhiteDiv style={{paddingTop:"1rem"}}> 
          <PopupTextArea
            required
            placeholder="Enter comment..."
            onChange={(e) => setComment(e.target.value)}
          />

          <FlexDiv style={{ width: "100%", gap: "0.62rem" }}>
            <CommentSubBtn onClick={onSubmit}>Submit</CommentSubBtn>
          </FlexDiv>
        </PopupWhiteDiv>
      </CommentPopupCard>
    </>
  );
};

export default AddCommentPopupSH;
