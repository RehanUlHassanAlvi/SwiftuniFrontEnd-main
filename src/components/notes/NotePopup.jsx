import React, { useState, useEffect } from "react";
import {
  PopupBtn,
  PopupHeader,
  PopupHeaderText,
  PopupTextArea,
  PopupWhiteDiv,
} from "./style";
import CancelIcon from "../../assets/images/carbon_close-filled.svg";
import { FlexDiv } from "../../assets/styles/style";
import SnackbarAlert from "../Login/SnackbarAlert";
import { Base_URL } from "../../Client/apiURL";

const NotePopup = ({ testQuestionTableId, close }) => {
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState("outlined");
  const [snackbarColor, setSnackbarColor] = useState("neutral");

  useEffect(() => {
    fetchNote();
  }, []); 

  const fetchNote = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/app/users/test-question-notes?test_question_id=${testQuestionTableId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200 && data.response) {
        setNoteId(data.response.Id);
        setNote(data.response.Note);
        setShowDeleteBtn(true);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  }; 

  const saveNote = async () => {
    try {
      if (!note.trim()) {
        console.error("Note cannot be empty.");
        setSnackbarMessage("Note cannot be empty.");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
        return;
      }

      const response = await fetch(
        `${Base_URL}/app/users/test-question-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            test_question_id: testQuestionTableId,
            note: note,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        fetchNote();
        setSnackbarMessage(data.message || "Note Saved Successfully");
        setSnackbarVariant("soft");
        setSnackbarColor("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const deleteNote = async () => {
    try {
      // if (!note.trim() || !noteId) {
      //   setSnackbarMessage("No Note to delete.");
      //   setSnackbarVariant("outlined");
      //   setSnackbarColor("danger");
      //   setSnackbarOpen(true);
      //   return;
      // }
      const response = await fetch(
        `${Base_URL}/app/users/test-question-notes?note_id=${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            test_question_id: testQuestionTableId,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.responseCode === 200) {
        setNote("");
        setSnackbarMessage(data.message || "Note Deleted Successfully");
        setSnackbarVariant("outlined");
        setSnackbarColor("danger");
        setSnackbarOpen(true);
        setShowDeleteBtn(false);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
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
        <PopupHeaderText>Note</PopupHeaderText>
      </PopupHeader>
      <PopupWhiteDiv>
        <PopupTextArea value={note} onChange={(e) => setNote(e.target.value)} />
        <PopupBtn onClick={saveNote}>Save</PopupBtn>
        {showDeleteBtn && noteId && (
          <PopupBtn backgroundColor={"#FF5D5D"} onClick={deleteNote}>
            Delete
          </PopupBtn>
        )}
      </PopupWhiteDiv>
    </div>
  );
};

export default NotePopup;
