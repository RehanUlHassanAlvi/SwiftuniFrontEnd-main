import React, { useState, useEffect } from "react";
import Notes from "../../assets/images/Notes.svg";
import { NoteImgs, ToolTipText } from "./style";
import { Tooltip } from "@mui/material";
import Modal from "react-modal";
import NotePopup from "./NotePopup";

const modalStyle = {
  overlay: {
    zIndex: 1002,
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: 'blur(5px)',
    background: "none",
  },
  content: {
    border: "none",
    background: "transparent",
    inset: "0px",
    padding: "20px 1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Note = ({ testQuestionTableId }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("popup-card");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Modal isOpen={open} style={modalStyle}>
        <NotePopup close={setOpen} testQuestionTableId={testQuestionTableId} />
      </Modal>
      <Tooltip title={<ToolTipText>Notes</ToolTipText>} arrow>
        <NoteImgs alt="" src={Notes} onClick={() => setOpen(true)} />
      </Tooltip>
    </>
  );
};

export default Note;
