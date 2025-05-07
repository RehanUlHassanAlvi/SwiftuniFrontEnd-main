import React, { useState, useEffect } from "react";
import {
  AttachFileDiv,
  CategoryButton,
  CategoryDiv,
  CategoryText,
  CommentPopupCard,
  CommentPreviewDiv,
  CommentPreviewImg,
  CommentSubBtn,
  PopupHeader,
  PopupHeaderText,
  PopupTextArea,
  PopupWhiteDiv,
  RemoveFileImg,
} from "./Style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import SnackbarAlert from "../Login/SnackbarAlert";
import Attachment from "../../assets/images/attachment.svg";
import FileRemove from "../../assets/images/file-remove.svg";

const AddCommentPopup = ({
  close,
  setComment,
  setCommentFile,
  setCommentCategory,
  onSubmit,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");
  const [imgPreview, setImgPreview] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("Forum");
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCommentCategory(category);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCommentFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCancel = () => {
    setImgPreview(null);
    setCommentFile(null);
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
        <PopupWhiteDiv>
          <PopupTextArea
            required
            placeholder="Enter comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <CategoryDiv>
            <CategoryText>Category :</CategoryText>
            <CategoryButton
              color={{ default: "#996cfe", active: "#7a4cfe" }}
              selected={selectedCategory === "Forum"}
              onClick={() => handleCategorySelect("Forum")}
            >
              Forum
            </CategoryButton>
            <CategoryButton
              color={{ default: "#fd3c65", active: "#fc2043" }}
              selected={selectedCategory === "Error"}
              onClick={() => handleCategorySelect("Error")}
            >
              Error
            </CategoryButton>
            <CategoryButton
              color={{ default: "#f66", active: "#f44" }}
              selected={selectedCategory === "New Ques"}
              onClick={() => handleCategorySelect("New Ques")}
            >
              New Ques
            </CategoryButton>
          </CategoryDiv>
          <FlexDiv style={{ width: "100%", gap: "0.62rem" }}>
            <AttachFileDiv
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img src={Attachment} alt="Attachment" />
              <CategoryText>Attach File</CategoryText>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </AttachFileDiv>
            <CommentSubBtn onClick={onSubmit}>Submit</CommentSubBtn>
          </FlexDiv>
          {imgPreview && (
            <CommentPreviewDiv>
              <CommentPreviewImg
                src={imgPreview}
                alt="Comment Attached Image"
              />
              <RemoveFileImg
                src={FileRemove}
                alt="Cancel"
                onClick={handleImageCancel}
              />
            </CommentPreviewDiv>
          )}
        </PopupWhiteDiv>
      </CommentPopupCard>
    </>
  );
};

export default AddCommentPopup;
