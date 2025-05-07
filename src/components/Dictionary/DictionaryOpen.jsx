import React, { useState, useEffect } from "react";
import { ToolTipText } from "../notes/style";
import { Tooltip } from "@mui/material";
import Modal from "react-modal";
import DictionaryImg from "../../assets/images/Dictionary.svg";
import DictionaryPopup from "./DictionaryPopup";
import { SmallImgs } from "../Common/Style";

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

const DictionaryOpen = ({ paragraphText, arrayText }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("dictionary");
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
        <DictionaryPopup
          close={setOpen}
          paragraphText={paragraphText}
          arrayText={arrayText}
        />
      </Modal>
      <Tooltip title={<ToolTipText>Dictionary</ToolTipText>} arrow>
        <SmallImgs alt="" src={DictionaryImg} onClick={() => setOpen(true)} />
      </Tooltip>
    </>
  );
};

export default DictionaryOpen;
