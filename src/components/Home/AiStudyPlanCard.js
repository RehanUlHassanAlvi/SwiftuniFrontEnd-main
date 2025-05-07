import React, { useEffect } from "react";
import SettingsIcon from "../../assets/images/ep_setting.svg";
import SetTargetCard from "./SetTargetCard";
import {
  AiSPCard,
  AiSPCardTitle,
  AiSPCardBox,
  AiSPCardText1,
  AiSPCardText2,
  AiSPCardSettingsIconDiv,
  AiSPCardIcon,
  StyledSettingsIcon,
} from "./style";
import Modal from "react-modal";


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

const AiStudyPlanCard = ({
  number,
  text,
  setExamDate,
  setExamTarget,
  setExamTargetRange,
  onSubmit,
  open,
  onClose,
  onOpen,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const scorecardElement = document.getElementById("target-card");
      if (scorecardElement && !scorecardElement.contains(event.target)) {
        // onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {open && (
        <Modal isOpen={open} style={modalStyle}>
          <SetTargetCard
            setExamDate={setExamDate}
            setExamTarget={setExamTarget}
            setExamTargetRange={setExamTargetRange}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </Modal>
      )}

      <AiSPCard>
        <AiSPCardTitle>AI Study Plan</AiSPCardTitle>
        <AiSPCardBox>
          <AiSPCardText1>{number?number:'00'}</AiSPCardText1>
          <AiSPCardText2>{text}</AiSPCardText2>
          <AiSPCardSettingsIconDiv>
            <StyledSettingsIcon
              // src={SettingsIcon}
              alt=""
              onClick={(e) => onOpen(e)}
            />
            
          </AiSPCardSettingsIconDiv>
        </AiSPCardBox>
      </AiSPCard>
    </>
  );
};

export default AiStudyPlanCard;
